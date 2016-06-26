import request from 'request-promise'
export default async (phone, text) => {
    const params = {
        login: 'driveadv',
        password: 'drivepass',
        sender: 'TeploKnauf',
        phone,
        sms_test: text
    }
    const json = await request
        .post({ url: 'http://217.168.75.3/stat/cpa/send_remote_sms_utf8.php'})
        .form(params)

    return json
}
