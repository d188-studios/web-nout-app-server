const { formatTree } = require("../utils/");

class PagesService {
  constructor(pagesModel, contentModel) {
    this.pagesModel = pagesModel;
    this.contentModel = contentModel;
  }

  async getPages(owner) {
    const pages = await this.pagesModel.findAll({
      where: {
        owner,
      },
    });

    return formatTree(pages.map((page) => page.dataValues));
  }

  async createPage(owner, title, parent) {
    const page = await this.pagesModel.create({
      owner,
      title,
      parent,
    });

    return page.dataValues;
  }

  async updatePage(id, title, expanded) {
    const page = await this.pagesModel.findOne({
      where: {
        id,
      },
    });

    if (!page) {
      throw new Error("Page not found");
    }

    await page.update({
      title,
      expanded,
    });

    return page.dataValues;
  }

  async deletePage(id) {
    const page = await this.pagesModel.findOne({
      where: {
        id,
      },
    });

    const content = await this.contentModel.findOne({
      where: {
        pageId: id,
      },
    });

    const movimientos = await this.movimientosModel.findOne({
      where: {
        id_pagina: id,
      },
    });

    if (!page) {
      throw new Error("Page not found");
    }

    await page.destroy();
    await content.destroy();
  }

  async copyPage(id, title) {
    const page = await this.pagesModel.findOne({
      where: {
        id,
      },
    });

    if (!page) {
      throw new Error("Page not found");
    }

    const content = await this.contentModel.findOne({
      where: {
        pageId: id,
      },
    });

    if (!content) {
      throw new Error("Content not found");
    }

    const newPage = await this.pagesModel.create({
      owner: page.owner,
      title,
      parent: page.parent,
    });

    await this.contentModel.create({
      pageId: newPage.id,
      content: content.content,
    });

    return newPage.dataValues;
  }
}

module.exports = PagesService;
