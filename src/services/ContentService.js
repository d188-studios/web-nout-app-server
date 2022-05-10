class ContentService {
  constructor(contentModel, pageModel) {
    this.contentModel = contentModel;
    this.pageModel = pageModel;
  }

  async getPageContent(pageId) {
    const pageContent = await this.contentModel.findOne({
      where: {
        pageId,
      },
    });

    if (!pageContent) {
      const page = await this.pageModel.findOne({
        where: {
          id: pageId,
        },
      });

      const blankPage = await this.contentModel.create({
        pageId,
        content: [
          {
            type: "header",
            data: {
              text: page.title,
              level: 1,
            },
          },
        ],
      });
      return blankPage.dataValues;
    }

    return pageContent.dataValues;
  }

  async updatePageContent(pageId, content) {
    const pageContent = await this.contentModel.findOne({
      where: {
        pageId,
      },
    });

    if (!pageContent) {
      throw new Error("Page not found");
    }

    await pageContent.update({
      content,
    });

    return pageContent.dataValues;
  }
}

module.exports = ContentService;
