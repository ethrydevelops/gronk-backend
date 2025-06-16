const express = require("express");
const knex = require("../../modules/database");
const authnmiddleware = require("../../modules/authentication_middleware");

const router = express.Router();

router.get("/models/", authnmiddleware, async (req, res) => {
    const { uuid: accountId } = req.account;

    try {
        const models = await knex("models")
            .where({ account_id: accountId })
            .select("uuid", "name", "model", "url", "authorization");

        const userLastUsedModel = await knex("accounts")
            .where({ uuid: accountId })
            .select("last_used_model")
            .first();

        let lastUsedModel = null;
        if (userLastUsedModel) {
            lastUsedModel = models.find(model => model.uuid === userLastUsedModel.last_used_model);
        }

        return res.status(200).json({
            count: models.length,
            last_used_model: lastUsedModel ? lastUsedModel : null,
            models
        });
    } catch (error) {
        console.error("Error fetching models:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;