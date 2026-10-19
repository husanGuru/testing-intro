function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity === 0 || quantity > product.stock) {
    throw RangeError();
  }

  const productIndex = cart.findIndex(item => item.id === product.id);
  if (productIndex === -1) {
    return [...cart, { ...product, quantity }];
  } else {
    cart[productIndex].quantity += quantity;
    return cart;
  }
}
function changeQuantity(cart, index, quantity) {
  const item = cart[index - 1];
  if (!item) {
    return cart;
  }
  if (quantity === 0 || quantity > item.stock) {
    throw RangeError();
  }
  cart[index - 1].quantity = quantity;
  return cart;
}
function removeFromCart(cart, index) {
  const item = cart[index - 1];
  if (!item) {
    return cart;
  }

  cart.splice(index - 1, 1);
  return cart;
}
function calculateCartSubtotal(cart) {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promocode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promocode === 'SAVE10' && subtotal >= 20000 ? subtotal * 0.1 : 0;
  const delivery = subtotal < 50000 ? 30000 : 0;
  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
