import supertest from "supertest";
const request = supertest("http://localhost:8080");
import { expect } from "chai";
import { faker } from "@faker-js/faker";

const generatePost = () => {
  return {
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(10, 1000),
    descripcion: faker.commerce.productDescription(),
    thumbnail: faker.image.cats(190, 190),
    stock: faker.commerce.price(10, 15),
  };
};

const productos = generatePost();

describe("PRODUCTS /api/products", () => {
  describe("Get product stock", () => {
    it("✅ Get product stock success!", async () => {
      const res = await request.get("/api/product/stock");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
      //   expect(res.body).to.eql({ version: '0.0.1' });
    });
  });

  /* POST PRODUCTOS */
  describe("POST ONE /api/products", () => {
    it("✅ Post product success!", async () => {
      const productos = generatePost();
      const res = await request.post("/api/product/post").send(productos);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      // expect(res.body).to.include.keys("body","id");
      // expect(productos.title).to.eql(res.body.title);
      // expect(productos.body).to.eql(res.body.body);      
      // expect(res.body[0]).to.include.keys('title', 'price', 'thumbnail');
    });
  });

  
});
