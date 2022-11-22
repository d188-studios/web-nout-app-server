require("dotenv").config();
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { pagesService } = require("../../services");

const router = express.Router();

module.exports = function pages(app) {
  app.use("/pages", router);
  router.get("/", verifyToken, async (req, res) => {
    const pages = await pagesService.getPages(req.user.uuid);

    res.json(pages);
  });

  router.post("/", verifyToken, async (req, res) => {
    try {
      const page = await pagesService.createPage(
        req.user.uuid,
        req.body.title,
        req.body.parent
      );

      res.json(page);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  });

  router.put("/:id", verifyToken, async (req, res) => {
    try {
      const page = await pagesService.updatePage(
        req.params.id,
        req.body.title,
        req.body.expanded
      );

      res.json(page);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  });

  router.delete("/:id", verifyToken, async (req, res) => {
    try {
      await pagesService.deletePage(req.params.id);


      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  });

  router.post("/copy", verifyToken, async (req, res) => {
    try {
      const page = await pagesService.copyPage(req.body.id, req.body.title);
      res.send(page);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  });
};
