class Usuario {

    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = { libros };
        this.mascotas = mascotas;
    }

    getFullName = () => `Nombre completo: ${this.nombre} ${this.apellido}`;

    addMascota = (mascota) => {
        this.mascotas.push(mascota);
        return console.log(`Se agrego ${mascota} a tus mascotas`)
    }

    countMascotas = () => {
        return console.log(`${this.nombre} tiene ${this.mascotas.length} mascotas: ${this.mascotas}.`)
    }

    addBook = (titulo, autor) => {
        this.libros.push({
            titulo: titulo,
            autor: autor
        });
        return console.log(`el libro ${titulo} se agrego a tus biblioteca`);
    }
    getBookNames = () => {
        return console.log(`Los libros son: ${JSON.stringify(this.libros)}`);
    }
}


const usuario = new Usuario("Santiago", "Morera", [{ titulo: 'El señor de los anillos', autor: 'JKR' }], ['Yago', 'Zazu', 'Morris']);


console.log(usuario.addBook())
