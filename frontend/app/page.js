import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to MyApp
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your one-stop solution for premium products and services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/items"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Items
            </Link>
            <Link
              href="/login"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Secure Authentication',
                description: 'Firebase-powered authentication with JWT authorization for maximum security.',
                icon: '🔒',
              },
              {
                title: 'Easy Management',
                description: 'Intuitive interface for managing your items and inventory effortlessly.',
                icon: '⚡',
              },
              {
                title: 'Real-time Updates',
                description: 'Get instant updates on your items and transactions in real-time.',
                icon: '🔄',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About MyApp</h2>
              <p className="text-gray-600 mb-4">
                We are dedicated to providing the best platform for managing and showcasing your products. 
                With cutting-edge technology and user-friendly design, we make it easy for you to succeed.
              </p>
              <p className="text-gray-600">
                Our platform is built with modern technologies including Next.js, Express.js, and Firebase, 
                ensuring reliability, security, and performance.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg h-64 flex items-center justify-center text-white text-6xl">
              📱
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Item Listing', icon: '📋' },
              { name: 'Secure Storage', icon: '💾' },
              { name: 'User Management', icon: '👥' },
              { name: '24/7 Support', icon: '🎧' },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Sign Up',
                description: 'Create your account with email and password in seconds.',
              },
              {
                step: '2',
                title: 'Add Items',
                description: 'List your products with details, prices, and images.',
              },
              {
                step: '3',
                title: 'Manage & Grow',
                description: 'Track your items and grow your business effortlessly.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Fast & Reliable',
                description: 'Built with Next.js 15 for lightning-fast performance and reliability.',
              },
              {
                title: 'Secure by Default',
                description: 'Enterprise-grade security with Firebase Auth and JWT tokens.',
              },
              {
                title: 'Easy to Use',
                description: 'Intuitive interface designed for users of all skill levels.',
              },
              {
                title: 'Scalable',
                description: 'Architecture that grows with your business needs.',
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who trust MyApp for their business needs
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}
