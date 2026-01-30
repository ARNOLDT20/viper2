const { ezra } = require('../fredi/ezra')

ezra({ nomCom: 'creategroup', categorie: 'Fredi-Mods' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, superUser, msgRepondu, auteurMsgRepondu, auteurMessage } = commandeOptions

    if (!superUser) {
        repondre('Only Mods can use this command')
        return
    }

    if (!arg || !arg[0]) {
        repondre('Usage: creategroup <Group Name> (reply to a user to include them)')
        return
    }

    const groupName = Array.isArray(arg) ? arg.join(' ') : String(arg)

    const participants = []
    try {
        participants.push(auteurMessage)
        if (msgRepondu && auteurMsgRepondu) participants.push(auteurMsgRepondu)

        const res = await zk.groupCreate(groupName, participants)
        const gid = (res && (res.id || res.gid)) ? (res.id || res.gid) : res

        let inviteCode = null
        try {
            inviteCode = await zk.groupInviteCode(gid)
        } catch (e) {
            inviteCode = null
        }

        const link = inviteCode ? `https://chat.whatsapp.com/${inviteCode}` : `Group created: ${gid}`

        try {
            await zk.sendMessage(gid, { text: `Group *${groupName}* created.\n${link}` })
        } catch (e) {
            // ignore send into new group
        }

        repondre(`Created group *${groupName}*\n${link}`)
    } catch (err) {
        repondre('Error creating group: ' + (err.message || String(err)))
    }
})
