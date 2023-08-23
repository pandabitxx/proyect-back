import { fakerES_MX as faker } from "@faker-js/faker";

const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.uuid(),
    price: faker.commerce.price(),
    stock: faker.datatype.number({ min: 1, max: 100 }),
  };
};

export const generateProducts = (n) => {
  const products = [];
  for (let i = 0; i < n; i++) {
    products.push(generateProduct());
  }
  return products;
};
