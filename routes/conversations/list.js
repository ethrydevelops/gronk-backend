const express = require("express");
const knex = require("../../modules/database");
const authnmiddleware = require("../../modules/authentication_middleware");

const router = express.Router();

router.get("/conversations/", authnmiddleware, async (req, res) => {
    const { uuid: accountId } = req.account;

    try {
        const conversations = await knex("chats")
            .where({ account_id: accountId })
            .select("*");

        return res.status(200).json({
            count: conversations.length,
            conversations
        });
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;