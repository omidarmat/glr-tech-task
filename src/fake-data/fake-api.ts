import type { Customer } from "../types/customers.types";
import type { Product } from "../types/products.types";
import { fakeData } from "./setup";

const DELAY = 2000;
const NUM_CUSTOMERS = 50;
const NUM_PRODUCTS = 100;

const CUSTMER_FETCH_ERROR_SCENARIO = false;
const PRODUCT_FETCH_ERROR_SCENARIO = false;

function getCustomers(): Promise<Customer[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (CUSTMER_FETCH_ERROR_SCENARIO) {
        reject(new Error("Failed to fetch customers"));
      } else {
        resolve(fakeData.generateCustomers(NUM_CUSTOMERS));
      }
    }, DELAY);
  });
}

function getProducts(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (PRODUCT_FETCH_ERROR_SCENARIO) {
        reject(new Error("Failed to fetch products"));
      } else {
        resolve(fakeData.generateProducts(NUM_PRODUCTS));
      }
    }, DELAY);
  });
}

export const fakeApi = {
  getCustomers,
  getProducts,
};
