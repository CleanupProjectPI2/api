class CleaningModel {
    constructor(cleaningModel) {
        this.id = cleaningModel.id, //int
        this.id_user = cleaningModel.id_user, //int
        this.id_cleaner = cleaningModel.id_cleaner, //int
        this.typeClear = cleaningModel.typeClear, //string
        this.date = cleaningModel.date, //string
        this.qtyHour = cleaningModel.qtyHour, //int
        this.initHour = cleaningModel.initHour, //string
        this.description = cleaningModel.description, //string
        this.price = cleaningModel.price, //double
        this.status = cleaningModel.status,//string
        this.rooms = cleaningModel.rooms, //string
        this.address = cleaningModel.address //string
    }
}
  
module.exports = CleaningModel;