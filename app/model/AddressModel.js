class AddressModel {
    constructor(addressModel) {
        this.id = addressModel.id, //int
        this.id_user = addressModel.id_user, //int
        this.address = addressModel.address, //string
        this.use = addressModel.use //boolean
    }
}
  
module.exports = AddressModel;