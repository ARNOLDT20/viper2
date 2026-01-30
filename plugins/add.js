const { ezra } = require('../fredi/ezra')

ezra({ nomCom: 'add', categorie: 'Fredi-Mods' }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, verifGroupe, verifAdmin, superUser, msgRepondu, auteurMsgRepondu } = commandeOptions

    if (!verifGroupe) {
        repondre('This command is only for groups')
        return
    }

    if (!(verifAdmin || superUser)) {
        repondre('Only group admins can add participants')
        return
    }

    const participants = []

    if (msgRepondu && auteurMsgRepondu) participants.push(auteurMsgRepondu)

    if (arg && arg.length) {
        for (const a of arg) {
            const num = a.replace(/[^0-9]/g, '')
            if (!num) continue
            const jid = num.includes('@') ? num : `${num}@s.whatsapp.net`
            participants.push(jid)
        }
    }

    if (participants.length === 0) {
        repondre('Provide a phone number(s) or reply to a user to add')
        return
    }

    try {
        await zk.groupParticipantsUpdate(dest, participants, 'add')
        repondre('Tried to add participants: ' + participants.map(p => p.split('@')[0]).join(', '))
    } catch (err) {
        repondre('Error adding participants: ' + (err.message || String(err)))
    }
})
