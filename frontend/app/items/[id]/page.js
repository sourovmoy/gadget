'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { itemsAPI } from '@/lib/api';
import { addToCart, addToWishlist, isInWishlist, removeFromWishlist } from '@/lib/storage';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inWishlist, setInWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchItem();
    }
  }, [params.id]);

  useEffect(() => {
    if (item) {
      setInWishlist(isInWishlist(item.id));
    }
  }, [item]);

  const fetchItem = async () => {
    try {
      const response = await itemsAPI.getById(params.id);
      setItem(response.item);
    } catch (error) {
      console.error('Error fetching item:', error);
      setError('Item not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (item) {
      addToCart(item);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleToggleWishlist = () => {
    if (item) {
      if (inWishlist) {
        removeFromWishlist(item.id);
        setInWishlist(false);
        setAddedToWishlist(false);
      } else {
        addToWishlist(item);
        setInWishlist(true);
        setAddedToWishlist(true);
        setTimeout(() => setAddedToWishlist(false), 2000);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Item not found'}</p>
          <Link
            href="/items"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Back to Items
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/items"
        className="inline-flex items-center text-primary hover:text-blue-600 mb-8"
      >
        ← Back to Items
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative h-96 md:h-full bg-gray-200">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Details Section */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {item.name}
            </h1>

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {item.createdBy && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Added by:</span> {item.createdBy}
                </p>
                {item.createdAt && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Date:</span>{' '}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  addedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary text-white hover:bg-blue-600'
                }`}
              >
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button 
                onClick={handleToggleWishlist}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  inWishlist
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {addedToWishlist && !inWishlist ? '✓ Added to Wishlist!' : 
                 inWishlist ? '❤️ In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">High quality materials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Fast shipping available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">30-day return policy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">1-year warranty included</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
