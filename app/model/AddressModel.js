class AddressModel {
    constructor(addressModel) {
        this.id = addressModel.id, //int
        this.id_user = addressModel.id_user, //int
        this.address = addressModel.address, //string
        this.used = addressModel.used //boolean
    }
}
  
module.exports = AddressModel;