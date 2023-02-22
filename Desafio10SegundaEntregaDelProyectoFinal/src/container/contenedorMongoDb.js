const mongoose = require("mongoose");


class ContenedorMongoDB {
    constructor(name, schema) {
        this.model = mongoose.model(name, schema);
    }


    getAll = async () => await this.model.find();

    save = async (element) => await this.model.create(element);

    getById = async (id) => await this.model.findById(id);

    updateById = async (id, newData) => await this.model.findByIdAndUpdate(id, newData, { new: true });

    deleteById = async (id) => await this.collection.findByIdAndDelete(id);

    /* deleteAll = async (a) => {
        try {


        } catch (e) {
            console.log(e);

        }
    } */
}

export { ContenedorMongoDB };