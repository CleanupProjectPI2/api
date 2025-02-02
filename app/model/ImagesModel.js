class ImagesModel {
    constructor(imageModel) {
        this.id = imageModel.id, //int
        this.link = imageModel.link, //string
        this.profile = imageModel.profile, //boolean
        this.after = imageModel.after, //boolean 
        this.id_user = imageModel.id_user, //int null
        this.id_cleaning = imageModel.id_cleanin //int null
    }
  }
  
  module.exports = ImagesModel;