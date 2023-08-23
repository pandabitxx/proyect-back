import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

const mockCarro = {
    productos: []
};

describe("Cart API Tests", () => {
    describe("POST /api/carts/", () => {
        it("should create a new cart successfully", async () => {
            const { statusCode, ok, body } = await requester
                .post("/api/carts")
                .send(mockCarro);

            console.log("Response Body:", body);
            console.log("Response OK:", ok);
            console.log("Response Status Code:", statusCode);

            expect(body.payload).to.have.property("_id");
            expect(ok).to.be.true;
            expect(statusCode).to.equal(200);
        });
    });
});
