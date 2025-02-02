class PaymentModel {
    constructor(paymentModel) {
        this.id = paymentModel.id
        this.id_user = paymentModel.id_user, 
        this.id_cleaning = paymentModel.id_cleaning, 
        this.transaction_id = paymentModel.transaction_id, 
        this.value = paymentModel.value, 
        this.paymentMethod = paymentModel.paymentMethod, 
        this.paymentDa = paymentModel.paymentDate
    }
}
  
module.exports = PaymentModel;