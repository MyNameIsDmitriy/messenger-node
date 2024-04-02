class PublicationsService {
  constructor(publicationDao) {
    this.publicationDao = publicationDao;
  }

  getAllPublications(userId, tokenId) {
    return this.publicationDao.getAllPublications(userId, tokenId);
  }

  async createPublication(userData, tokenId) {
    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    userData.currentDateTime = currentDateTime;

    const createdPublication = await this.publicationDao.createPublication(
      userData,
      tokenId
    );

    return createdPublication[createdPublication.length - 1];
  }

  async editPublication(userData) {
    const currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    userData.currentDateTime = currentDateTime;

    return this.publicationDao.editPublication(userData);
  }

  async deletePublication(postData, tokenId) {
    if (
      typeof tokenId !== "number" ||
      typeof postData.userId !== "number" ||
      typeof postData.publicationId !== "number"
    ) {
      return { "Error message": "number expected" };
    }

    return this.publicationDao.deletePublication(postData, tokenId);
  }
}

module.exports = PublicationsService;
