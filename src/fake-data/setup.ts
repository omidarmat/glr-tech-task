import { faker } from "@faker-js/faker";
import { CusotmerStatus } from "../types/customers.types";

const createFakeCustomer = () => {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    ownerName: faker.person.fullName(),
    phone: faker.phone.number(),
    city: faker.location.city(),
    status: faker.helpers.arrayElement([
      CusotmerStatus.Active,
      CusotmerStatus.Inactive,
    ]),
    lastOrderAmount: faker.commerce.price({
      symbol: "T",
    }),
  };
};

const createFakeProduct = () => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    code: faker.number.int({ min: 1000, max: 9999 }),
    category: faker.helpers.arrayElement([
      "Fruits & Vegetables",
      "Meat & Poultry",
      "Fish & Seafood",
      "Dairy & Eggs",
      "Bakery",
      "Canned Foods",
      "Frozen Foods",
      "Snacks",
      "Beverages",
      "Coffee & Tea",
      "Pasta & Rice",
      "Cereals & Breakfast",
      "Sauces & Condiments",
      "Spices & Seasonings",
      "Cooking Oils",
      "Sweets & Chocolates",
      "Baby Products",
      "Personal Care",
      "Household Cleaning",
      "Pet Supplies",
    ]),
    price: faker.commerce.price({ symbol: "T" }),
    stock: faker.number.int({ min: 0, max: 200 }),
    unit: faker.commerce.department(),
  };
};

const generateCustomers = (count: number) => {
  return faker.helpers.multiple(createFakeCustomer, { count });
};

const generateProducts = (count: number) => {
  return faker.helpers.multiple(createFakeProduct, { count });
};

export const fakeData = {
  generateCustomers,
  generateProducts,
};
