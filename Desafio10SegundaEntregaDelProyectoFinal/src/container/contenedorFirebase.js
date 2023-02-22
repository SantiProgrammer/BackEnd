const query = require("express");
const admin = require("firebase-admin");
const config = require("../config/config.js");

admin.initializeApp({
    credential: admin.credential.cert(config.option.firebase)
})

const db = admin.firestore();


class ContenedorFirebase {
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion);
        this.id = 1;
    }


    getAll = async () => {
        try {
            const querySnapshot = await this.coleccion.get();
            let docs = querySnapshot.docs;
            console.log(docs);
            return docs;

        } catch (e) {
            console.log(e);

        }
    }


    save = async (nuevoElem) => {
        try {
            const objects = await this.getAll();
            const lastElement = objects[objects.length - 1];

            const lastId = parseInt(lastElement.id) + 1;

            let doc = this.coleccion.doc(lastId);

            const object = {
                ...nuevoElem,
                date: new Date().toLocaleDateString(),
                id: parseInt(lastId),
            };

            await doc.create(object);

        } catch (e) {
            console.log(e);
        }
    }

    getById = async (id) => {
        try {
            const doc = this.coleccion.doc(id)
            const object = await doc.get();
            const response = object.data();
            console.log(response);
            return response;

        } catch (e) {
            console.log(e);
        }
    }

    updateById = async (nuevoElem, id) => {
        try {
            const doc = this.colection.doc(id);
            const object = await doc.update({ ...nuevoElem });
            console.log(object);
            console.log(`Se actualizo el objeto con el id: ${id}`);
            return object;

        } catch (e) {
            console.log(e);
        }
    }

    deleteById = async (id) => {
        try {
            const doc = this.coleccion.doc(id);
            const object = await doc.delete();
            console.log(`Se borro el documento con el id: ${id}`);
            return object;

        } catch (e) {
            console.log(e);
        }
    }

    deleteAll = async () => {
        try {
            const doc = this.coleccion.doc();
            const object = await doc.delete();
            return object;

        } catch (e) {
            console.log(e);
        }
    }


    async desconectar() { }
}

export default ContenedorFirebase;
