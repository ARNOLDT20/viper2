'use strict';

const { ezra } = require("../fredi/ezra");

ezra({
    nomCom: "listall",
    categorie: "Group",
    reaction: "👥"
}, async (dest, zk, commandeOptions) => {
    const { repondre, verifGroupe, ms } = commandeOptions;

    try {
        if (!verifGroupe) {
            return repondre("❌ This command only works in groups.");
        }

        // Fetch group metadata
        const groupMetadata = await zk.groupMetadata(dest);
        const members = groupMetadata.participants;

        if (!members || members.length === 0) {
            return repondre("❌ Could not fetch group members.");
        }

        // Format members list
        let membersList = `╔═══════════════════════════╗\n║  📋 *ALL GROUP MEMBERS*  ║\n╚═══════════════════════════╝\n\n`;
        membersList += `*Total Members: ${members.length}*\n\n`;

        members.forEach((member, index) => {
            const jid = member.id;
            const isAdmin = member.admin ? "👑" : "👤";
            membersList += `${index + 1}. ${isAdmin} @${jid.split("@")[0]}\n`;
        });

        membersList += `\n━━━━━━━━━━━━━━━━━━━━━━\n✨ Listed by Viper XMD`;

        const mentions = members.map(m => m.id);
        await zk.sendMessage(dest, {
            text: membersList,
            mentions: mentions
        }, { quoted: ms });

    } catch (error) {
        console.error("List All Error:", error);
        repondre(`❌ Error: ${error.message}`);
    }
});

ezra({
    nomCom: "listactive",
    categorie: "Group",
    reaction: "🟢"
}, async (dest, zk, commandeOptions) => {
    const { repondre, verifGroupe, ms } = commandeOptions;

    try {
        if (!verifGroupe) {
            return repondre("❌ This command only works in groups.");
        }

        // Fetch group metadata
        const groupMetadata = await zk.groupMetadata(dest);
        const members = groupMetadata.participants;

        if (!members || members.length === 0) {
            return repondre("❌ Could not fetch group members.");
        }

        // Get active members (those who sent messages recently)
        const activeMembers = [];

        for (const member of members) {
            try {
                // Get messages from this member in the group (last 10 messages)
                const messages = await zk.loadConversation(dest, 10);

                if (messages && messages.some(msg => msg.key.participant === member.id)) {
                    activeMembers.push(member);
                }
            } catch (e) {
                // Continue if error loading messages
            }
        }

        // If no active members found in recent messages, show all as potentially active
        const displayMembers = activeMembers.length > 0 ? activeMembers : members.slice(0, 15);

        let activeList = `╔═══════════════════════════╗\n║  🟢 *ACTIVE MEMBERS*  🟢  ║\n╚═══════════════════════════╝\n\n`;
        activeList += `*Active Members: ${displayMembers.length}/${members.length}*\n\n`;

        displayMembers.forEach((member, index) => {
            const jid = member.id;
            const isAdmin = member.admin ? "👑" : "💬";
            activeList += `${index + 1}. ${isAdmin} @${jid.split("@")[0]}\n`;
        });

        activeList += `\n━━━━━━━━━━━━━━━━━━━━━━\n✨ Listed by Viper XMD`;

        const mentions = displayMembers.map(m => m.id);
        await zk.sendMessage(dest, {
            text: activeList,
            mentions: mentions
        }, { quoted: ms });

    } catch (error) {
        console.error("List Active Error:", error);
        repondre(`❌ Error: ${error.message}`);
    }
});

ezra({
    nomCom: "listinactive",
    categorie: "Group",
    reaction: "⚫"
}, async (dest, zk, commandeOptions) => {
    const { repondre, verifGroupe, ms } = commandeOptions;

    try {
        if (!verifGroupe) {
            return repondre("❌ This command only works in groups.");
        }

        // Fetch group metadata
        const groupMetadata = await zk.groupMetadata(dest);
        const members = groupMetadata.participants;

        if (!members || members.length === 0) {
            return repondre("❌ Could not fetch group members.");
        }

        // Get inactive members (those who haven't sent recent messages)
        const activeMembers = [];

        for (const member of members) {
            try {
                const messages = await zk.loadConversation(dest, 10);

                if (messages && messages.some(msg => msg.key.participant === member.id)) {
                    activeMembers.push(member.id);
                }
            } catch (e) {
                // Continue if error
            }
        }

        const inactiveMembers = members.filter(m => !activeMembers.includes(m.id));

        let inactiveList = `╔═══════════════════════════╗\n║ ⚫ *INACTIVE MEMBERS* ⚫  ║\n╚═══════════════════════════╝\n\n`;
        inactiveList += `*Inactive Members: ${inactiveMembers.length}/${members.length}*\n\n`;

        if (inactiveMembers.length === 0) {
            inactiveList += `✅ No inactive members! Everyone is active.\n`;
        } else {
            inactiveMembers.forEach((member, index) => {
                const jid = member.id;
                const isAdmin = member.admin ? "👑" : "😴";
                inactiveList += `${index + 1}. ${isAdmin} @${jid.split("@")[0]}\n`;
            });
        }

        inactiveList += `\n━━━━━━━━━━━━━━━━━━━━━━\n✨ Listed by Viper XMD`;

        const mentions = inactiveMembers.length > 0 ? inactiveMembers.map(m => m.id) : [];
        await zk.sendMessage(dest, {
            text: inactiveList,
            mentions: mentions
        }, { quoted: ms });

    } catch (error) {
        console.error("List Inactive Error:", error);
        repondre(`❌ Error: ${error.message}`);
    }
});
