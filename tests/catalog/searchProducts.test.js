const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  test("'Наушники' возвращает товар с ID 1", () => {
    const foundProductIds = searchProducts(products, 'Наушники').map(product => product.id);
    expect(foundProductIds).toEqual([1]);
  });
  test("'Чистый код' возвращает товар с ID 6", () => {
    const foundProductIds = searchProducts(products, 'Чистый код').map(product => product.id);
    expect(foundProductIds).toEqual([6]);
  });
  test("'Настольная лампа' возвращает товар с ID 4", () => {
    const foundProductIds = searchProducts(products, 'Настольная лампа').map(product => product.id);
    expect(foundProductIds).toEqual([4]);
  });
  test("'javascript' возвращает товар с ID 3", () => {
    const foundProductIds = searchProducts(products, 'javascript').map(product => product.id);
    expect(foundProductIds).toEqual([3]);
  });
  test("'ЧЕХОЛ' возвращает товар с ID 5", () => {
    const foundProductIds = searchProducts(products, 'ЧЕХОЛ').map(product => product.id);
    expect(foundProductIds).toEqual([5]);
  });
  test("'наушники' возвращает товар с ID 1", () => {
    const foundProductIds = searchProducts(products, 'наушники').map(product => product.id);
    expect(foundProductIds).toEqual([1]);
  });
  test("пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    const foundProductIds = searchProducts(products, '').map(product => product.id);
    expect(foundProductIds).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    const foundProductIds = searchProducts(products, '  ').map(product => product.id);
    expect(foundProductIds).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    const foundProductIds = searchProducts(products, "\t\n").map(product => product.id);
    expect(foundProductIds).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
