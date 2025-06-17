const express = require("express");
const knex = require("../../modules/database");
const authnmiddleware = require("../../modules/authentication_middleware");
const crypto = require("crypto");

const router = express.Router();

router.post("/conversations/:uuid/rename", authnmiddleware, async (req, res) => {
    const { uuid: conversationUuid } = req.params;
    const { uuid: accountId } = req.account;

    const { title } = req.body;

    try {
        const conversation = await knex("chats")
            .where({ uuid: conversationUuid, account_id: accountId })
            .first();

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        if(title && title.trim() < 2 && title.length > 100) {
            return res.status(400).json({ error: "Title must be between 2 and 100 characters" });
        }

        await knex("chats")
            .where({ uuid: conversationUuid })
            .update({ title });

        return res.status(200).json({
            message: "Conversation renamed successfully",
            uuid: conversationUuid,
            title
        });
    } catch (error) {
        console.error("Error renaming conversation:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;