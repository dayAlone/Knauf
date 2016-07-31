export default (name) => {
    switch (name) {
    case 'vkontakte':
        return 'vk'
    case 'twitter':
        return 'tw'
    case 'odnoklassniki':
        return 'ok'
    case 'google':
        return 'gp'
    default:
    case 'facebook':
        return 'fb'
    }
}
