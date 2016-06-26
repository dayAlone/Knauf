import co from 'co'
//const request = require('koa-request')
//import { uploadFile as transload } from 'imgur'

function UserAuthError(message) {
    this.message = message
}

function* mergeProfile(user, profile) {
    if (!user.photo && profile.photos && profile.photos.length && profile.photos[0].type !== 'default') {
        // assign an avatar unless it's default
        //var photoUrl = profile.photos[0].value
        //var photoInfo = yield* transload(photoUrl)
        user.photo = profile.photos[0].value
    }

    if (!user.email && profile.emails && profile.emails.length) {
        user.email = profile.emails[0].value
    }

    if (!user.displayName && profile.displayName) {
        user.displayName = profile.displayName
    }

    if (!user.realName && profile.realName) {
        user.realName = profile.realName
    }

    if (!user.gender && profile.gender) {
        user.gender = profile.gender
    }

    if (profile._json.home_phone || profile._json.mobile_phone) {
        user.phone = profile._json.home_phone || profile._json.mobile_phone
    }

    if (!user.providers) user.providers = []
    // remove previous profile from the same provider, replace by the new one
    const nameId = makeProviderId(profile)
    user.providers = user.providers.filter(provider => provider.nameId !== nameId)

    user.providers.push({
        name: profile.provider,
        nameId: makeProviderId(profile),
        profile
    })

    user.verifiedEmail = true

}

function makeProviderId(profile) {
    return `${profile.provider}:${profile.id}`
}

export default function (models, req, profile, done) {
    // profile = the data returned by the facebook graph api

    co(function*() {
        let user = false

        try {
            const providerNameId = makeProviderId(profile)

            const userToConnect = req.user

            // TODO!!!!!!
            if (userToConnect) {
                const alreadyConnectedUser = yield models.User.findOne({
                    where: {
                        'providers.nameId': providerNameId,
                        id: { $ne: userToConnect.id }
                    }
                })
                if (alreadyConnectedUser) {
                    alreadyConnectedUser.providers = alreadyConnectedUser.providers.filter(provider => provider.nameId !== providerNameId)
                    yield alreadyConnectedUser.save()
                }

                console.log(userToConnect.id)

                user = userToConnect
            } else {
                user = yield models.User.findOne({ where: { 'providers.nameId': providerNameId } })

                if (!user) {
                    // if we have user with same email, assume it's exactly the same person as the new man
                    user = yield models.User.findOne({ where: { email: profile.emails[0].value } })

                    if (!user) {
                        // auto-register
                        user = models.User.build()
                    }
                } else {
                    if (!user.verifiedEmail) throw new UserAuthError('Ваш email не подтверждён, проверьте почту.')
                }
            }

            user.auid = req.cookies.get('auid')

            try {
                yield* mergeProfile(user, profile)
            } catch (e) {
                if (e.name === 'BadImageError') { // image too big or kind of
                    throw new UserAuthError(e.message)
                } else {
                    throw e
                }
            }

            yield user.save()

        } catch (e) {
            console.error(e)
            throw new UserAuthError(e)
        }

        return user

    })
    .then(user => {
        done(null, user)
    }, err => {
        if (err instanceof UserAuthError) {
            done(null, false, { message: err.message })
        } else {
            done(err)
        }
    })

}
