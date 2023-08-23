import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

const mockProduct = {
    title: "Fanta",
    description: "Naranja",
    code: "2067",
    price: 14,
    stock: 32,
};

describe("Product API Tests", () => {
    describe("GET /api/product", () => {
        it("should retrieve products successfully", async () => {
            const response = await requester.get("/api/productos");
            expect(response.statusCode).to.equal(200);
            expect(response.body.status).to.equal("success");
            expect(response.body.payload).to.be.an('array');
        });
    });

    describe("POST /api/productos", () => {
        it("should create a new product successfully", async () => {
            const response = await requester
                .post("/api/productos")
                .send(mockProduct);

            console.log("Response:", response.body);

            expect(response.statusCode).to.equal(200);
            expect(response.ok).to.be.true;
            expect(response.body.payload).to.have.property("_id");
        });
    });
});
