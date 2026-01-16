// Local Storage utility functions for Cart and Wishlist

const CART_KEY = 'shopping_cart';
const WISHLIST_KEY = 'wishlist';

// Cart Functions
export const getCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart:', error);
    return [];
  }
};

export const addToCart = (item) => {
  try {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // Increase quantity if item already exists
      existingItem.quantity += 1;
    } else {
      // Add new item with quantity 1
      cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return getCart();
  }
};

export const removeFromCart = (itemId) => {
  try {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return getCart();
  }
};

export const updateCartQuantity = (itemId, quantity) => {
  try {
    const cart = getCart();
    const item = cart.find(cartItem => cartItem.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        return removeFromCart(itemId);
      }
      item.quantity = quantity;
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
    
    return cart;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return getCart();
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem(CART_KEY);
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    return [];
  }
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Wishlist Functions
export const getWishlist = () => {
  if (typeof window === 'undefined') return [];
  try {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error reading wishlist:', error);
    return [];
  }
};

export const addToWishlist = (item) => {
  try {
    const wishlist = getWishlist();
    const exists = wishlist.find(wishlistItem => wishlistItem.id === item.id);
    
    if (!exists) {
      wishlist.push(item);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
    
    return wishlist;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return getWishlist();
  }
};

export const removeFromWishlist = (itemId) => {
  try {
    const wishlist = getWishlist();
    const updatedWishlist = wishlist.filter(item => item.id !== itemId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
    return updatedWishlist;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return getWishlist();
  }
};

export const isInWishlist = (itemId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === itemId);
};

export const clearWishlist = () => {
  try {
    localStorage.removeItem(WISHLIST_KEY);
    return [];
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    return [];
  }
};
