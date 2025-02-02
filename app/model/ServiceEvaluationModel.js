class ServiceEvaluationModel {
    constructor(se) {
        this.id = se.id, //int
        this.id_user = se.id_user, //int 
        this.id_cleaner = se.id_cleaner, //int
        this.id_cleaning = se.id_cleaning, //int
        this.coment = se.coment, //string null
        this.qtyStar =  se.qtyStar //int
    }
}
  
module.exports = ServiceEvaluationModel;