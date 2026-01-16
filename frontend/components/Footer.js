export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Gadgets</h3>
            <p className="text-gray-400">
              Your trusted platform for the latest tech gadgets and electronics.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/items" className="text-gray-400 hover:text-white transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-400 hover:text-white transition-colors">
                  Cart
                </a>
              </li>
              <li>
                <a href="/wishlist" className="text-gray-400 hover:text-white transition-colors">
                  Wishlist
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@gadgets.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Tech St, Silicon Valley</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gadgets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
