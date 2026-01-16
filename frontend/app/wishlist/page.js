'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getWishlist, removeFromWishlist, addToCart, clearWishlist } from '@/lib/storage';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    setIsClient(true);
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    setWishlist(getWishlist());
  };

  const handleRemove = (itemId) => {
    removeFromWishlist(itemId);
    loadWishlist();
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedToCart({ ...addedToCart, [item.id]: true });
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [item.id]: false });
    }, 2000);
  };

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist();
      loadWishlist();
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❤️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Save items you love to your wishlist!</p>
          <Link
            href="/items"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Items
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
        <button
          onClick={handleClearWishlist}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <Link href={`/items/${item.id}`}>
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
            
            <div className="p-6">
              <Link href={`/items/${item.id}`} className="hover:text-primary">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    addedToCart[item.id]
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-white hover:bg-blue-600'
                  }`}
                >
                  {addedToCart[item.id] ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
