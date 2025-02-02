class ChatModel {
    constructor(chatModel) {
        this.id = chatModel.id, //int
        this.id_user = chatModel.id_user, //int
        this.id_cleaner = chatModel.id_cleaner, //int
        this.message = chatModel.message, //string
        this.vis = chatModel.vis //boolean
        this.timestamp = chatModel.timestamp
    }
}
  
module.exports = ChatModel;