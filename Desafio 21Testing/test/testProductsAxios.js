import axios from "axios";

await axios
    .get("http://localhost:8080/api/product/stock")
    .then((res) => {
        console.log("✅ Axios products get success!");
    })
    .catch((err) => {
        console.log(err);
        throw "⚠️ Axios cant get products";
    });

await axios
    .post("http://localhost:8080/api/product/post", {
        id: "axiosId",
        nombre: 'AxiosProduct',
        precio: 1000,
        descripcion: 'Axios product description',
        thumbnail: 'Axios image',
        stock: 100
    })
    .then((res) => {
        console.log("✅ Axios product posted successfully!");
    })
    .catch((err) => {
        console.log(err);
        throw "⚠️ Axios cant post product";
    });



// let idToDelete = "axiosId";

// await axios
//     .delete("http://localhost:8080/api/product/delete" + idToDelete)
//     .then((res) => {
//         console.log("✅ Axios product deleted successfully!");
//     })
//     .catch((err) => {
//         console.log(err);
//         throw "⚠️ Axios cant delete product";
//     });

//  await axios
//     .get("http://localhost:8080/api/product/delete")
//     .then((res) => {
//         // console.log(res.data);
//         if (res.data.length == length + 1) {
//             console.log("GENIAL SALIO TODO BIEN PUDE CHEQUEAR EL POST EN EL ARRAY");
//             length++;
//             idToDelete = res.data[ 0 ].id;
//             console.log("idtoelete", idToDelete);
//         } else {
//             console.log(
//                 "todo mal el get me informa que no se agrego el post en el paso anterior"
//             );
//             throw "get no funciona";
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//         throw "⚠️ Axios cant delete product";
//     });
 

/* await axios
    .get("http://localhost:8080/api/product/")
    .then((res) => {
        const checkDeleted = res.data.find((item) => item.id == idToDelete);
        // console.log(res.data);
        console.log("lo elimino bien!!! " + idToDelete);
    })
    .catch((err) => console.log(err)); * / */
