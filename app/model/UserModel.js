class UserModel {
    constructor(user) {
        this.id = user.id, //int
        this.name = user.name, //string
        this.tell = user.tell, //string
        this.email = user.email, //string
        this.adress = user.adress, //string
        this.password = user.password, //string
        this.about = user.about, //string null
        this.rooms = user.rooms //string null
    }
  }
  
  module.exports = UserModel;