class InfoCleaningModel {
    constructor(infoC) {
        this.id = infoC.id, //int
        this.id_cleaner = infoC.id_cleaner,//int
        this.typeCleaning = infoC.typeCleaning, //string
        this.initHourJob = infoC.initHourJob, //string
        this.endHourJob = infoC.endHourJob, //string
        this.cleanMaterial = infoC.cleanMaterial, //boolean
        this.priceDay = infoC.priceDay //double
    }
}
  
module.exports = InfoCleaningModel;