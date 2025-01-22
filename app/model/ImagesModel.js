class ImagesModel {
    constructor(imageModel) {
        this.id = imageModel.id,
        this.link = imageModel.link, 
        this.profile = imageModel.profile,
        this.after = imageModel.after,
        this.id_user = imageModel.id_user,
        this.id_cleaning = imageModel.id_cleaning
    }
  }
  
  module.exports = ImagesModel;