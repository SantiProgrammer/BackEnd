class ContenedorMemoria {
    constructor() {
        this.elements = []
    }


    getAll = async () => this.elements;

    save = async (prod) => {
        try {
            this.elements.push({
                ...prod,
                date: new Date().toLocaleString(),
                id: this.id++
            });

        } catch (e) {
            console.log(e);
            return [];

        }
    }

    getById = async (id) => this.elements.find((element) => element.id === id);

    updateById = async (newData, id) => {
        try {
            const elementIndex = this.elements.findIndex((element) => element.id == id);
            if (elementIndex === -1) return null;
            const foundElement = this.elements[elementIndex];

            this.elements[elementIndex] = {
                ...this.elements[elementIndex],
                ...newData,
            };
            return this.elements[elementIndex];

        } catch (e) {
            console.log(e);

        }
    }

    deleteById = async (id) => {
        try {

            this.elements.filter((element) => element.id != id);
            return { success: true };


        } catch (e) {
            console.log(e);

        }
    }

    deleteAll = async () => {
        try {

            this.elements = []


        } catch (e) {
            console.log(e);

        }
    }
}