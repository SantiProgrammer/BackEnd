import faker from 'faker';

faker.locale = 'es'
const { commerce, image } = faker

const generateFakeProducts = (n) => {
    let fakeProducts = []
    for (let index = 0; index < n; index++) {
        const fakeProduct = {
            title: commerce.product(),
            price: commerce.price(10, 1000),
            thumbnail: image.animals(190, 190)
        }
        fakeProducts.push(fakeProduct)
    }
    return fakeProducts
}

export default generateFakeProducts

