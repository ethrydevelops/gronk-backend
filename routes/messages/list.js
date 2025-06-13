const express = require("express");
const knex = require("../../modules/database");
const authnmiddleware = require("../../modules/authentication_middleware");

const router = express.Router();

router.get("/conversations/:uuid/messages", authnmiddleware, async (req, res) => {
    const { uuid: conversationUuid } = req.params;
    const { uuid: accountId } = req.account;

    try {
        // check if user has access to conversation first
        
        const conversation = await knex("chats")
            .where({ uuid: conversationUuid, account_id: accountId })
            .first();

        if (!conversation) return res.status(404).json({ error: "Conversation not found" });

        // fetch messages in conversation

        const messages = await knex("messages")
            .where({ chat_uuid: conversationUuid })
            .select("*");

        return res.status(200).json({
            count: messages.length,
            messages
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;