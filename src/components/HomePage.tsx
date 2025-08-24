import React from 'react';
import { TrendingUp, Zap, Award, Smartphone, ArrowRight, Star, Siren as Fire, Shield } from 'lucide-react';
import { PhoneCard } from './PhoneCard';
import { Phone } from '../types/Phone';

interface HomePageProps {
  phones: Phone[];
  onPhoneSelect: (phone: Phone) => void;
  onAddToCompare: (phone: Phone) => void;
  onNavigate: (page: string) => void;
  compareList: Phone[];
}

export const HomePage: React.FC<HomePageProps> = ({ 
  phones, 
  onPhoneSelect, 
  onAddToCompare, 
  onNavigate,
  compareList 
}) => {
  const featuredPhones = phones.slice(0, 3);
  const trendingPhones = phones.slice(0, 6);

  const categories = [
    { name: 'Flagship', icon: Award, count: '50+', color: 'from-purple-500 to-pink-500' },
    { name: 'Gaming', icon: Zap, count: '30+', color: 'from-cyan-500 to-blue-500' },
    { name: 'Budget', icon: Smartphone, count: '100+', color: 'from-green-500 to-emerald-500' },
    { name: 'Camera', icon: Star, count: '40+', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Discover Your
            </span>
            <br />
            <span className="text-white">Perfect Mobile</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Compare specs, read reviews, and find the best deals on the latest smartphones from top brands.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => onNavigate('phones')}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Smartphone className="w-5 h-5" />
              <span>Explore Mobiles</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('compare')}
              className="w-full sm:w-auto bg-gray-800/50 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold border border-gray-700 hover:bg-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              Compare Phones
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Browse by Category</h2>
            <p className="text-gray-400">Find phones that match your specific needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(({ name, icon: Icon, count, color }) => (
              <div 
                key={name}
                onClick={() => onNavigate('phones')}
                className="group cursor-pointer"
              >
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 text-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
                  <p className="text-gray-400">{count} phones</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Phones */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-2">
                <Fire className="w-8 h-8 text-orange-500" />
                <span>Featured Phones</span>
              </h2>
              <p className="text-gray-400">Editor's choice for this month</p>
            </div>
            <button 
              onClick={() => onNavigate('phones')}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-2 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPhones.map(phone => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onSelect={onPhoneSelect}
                onAddToCompare={onAddToCompare}
                isInCompare={compareList.some(p => p.id === phone.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Mobile Phones', icon: Smartphone },
              { number: '50K+', label: 'Happy Users', icon: Star },
              { number: '25+', label: 'Top Brands', icon: Award },
              { number: '99.9%', label: 'Uptime', icon: Shield }
            ].map(({ number, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{number}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest News Preview */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-cyan-500" />
                <span>Latest News</span>
              </h2>
              <p className="text-gray-400">Stay updated with mobile technology</p>
            </div>
            <button 
              onClick={() => onNavigate('news')}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-2 transition-colors"
            >
              <span>Read More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'iPhone 15 Pro Max Review: The Ultimate Flagship Experience',
                excerpt: 'Deep dive into Apple\'s latest flagship with titanium build and A17 Pro chip.',
                date: '2 hours ago',
                category: 'Review'
              },
              {
                title: 'Samsung Galaxy S24 Ultra Launches with AI Features',
                excerpt: 'Samsung introduces advanced AI capabilities in their latest flagship smartphone.',
                date: '5 hours ago',
                category: 'Launch'
              },
              {
                title: 'Best Budget Phones Under ₹30,000 in 2024',
                excerpt: 'Comprehensive guide to the best value smartphones available this year.',
                date: '1 day ago',
                category: 'Guide'
              }
            ].map((article, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-r from-cyan-500/20 to-purple-500/20" />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-400">{article.date}</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};