require("dotenv").config();
const express = require("express");
const { verifyToken, validateContent } = require("../middlewares/");
const { contentService } = require("../../services");

const router = express.Router();

module.exports = function content(app) {
  app.use("/content", router);
  router.get("/:pageId", verifyToken, async (req, res) => {
    try {
      const content = await contentService.getPageContent(req.params.pageId);
      return res.json(content);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  });

  router.put("/:pageId", verifyToken, validateContent, async (req, res) => {
    try {
      const content = await contentService.updatePageContent(
        req.params.pageId,
        req.body.content
      );
      return res.json(content);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  });
};
