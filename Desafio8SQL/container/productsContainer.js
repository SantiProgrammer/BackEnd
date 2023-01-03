const { option } = require("../db/config/config");
const knex = require("knex")(option.mysql);

class Products {
    constructor(table) {
        this.table = table;
    }

    async getAll() {
        try {
            const productsList = await knex(this.table).select("*");
            if (productsList.length > 0) {
                return productsList;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async save(obj) {
        try {
            await knex(this.table).insert(obj);
            console.log('registro creado:', obj);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Products