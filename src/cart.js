function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  const existing = cart.find(item => item.id === product.id);
  const total = (existing ? existing.quantity : 0) + quantity;
  if (quantity < 1 || total > product.stock) {
    throw new RangeError(`Доступно не больше ${product.stock} шт.`);
  }

  if (!existing) {
    return [...cart, { ...product, quantity }];
  }
  return cart.map(item => (item.id === product.id ? { ...item, quantity: total } : item));
}
function changeQuantity(cart, productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (!item) {
    return cart;
  }
  if (quantity < 1 || quantity > item.stock) {
    throw new RangeError(`Количество должно быть от 1 до ${item.stock}`);
  }
  return cart.map(item => (item.id === productId ? { ...item, quantity } : item));
}
function removeFromCart(cart, productId) {
  return cart.filter(item => item.id !== productId);
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
