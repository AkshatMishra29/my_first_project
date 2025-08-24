import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, GitCompare as Compare, Share2, ShoppingCart, Zap, Camera, Battery, Cpu, Monitor } from 'lucide-react';
import { Phone } from '../types/Phone';

interface PhoneDetailProps {
  phone: Phone;
  onBack: () => void;
  onAddToCompare: (phone: Phone) => void;
  isInCompare: boolean;
}

export const PhoneDetail: React.FC<PhoneDetailProps> = ({ phone, onBack, onAddToCompare, isInCompare }) => {
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedColor, setSelectedColor] = useState(phone.colors[0]);

  const tabs = [
    { id: 'specs', label: 'Specifications', icon: Monitor },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'gallery', label: 'Gallery', icon: Camera }
  ];

  const specCategories = [
    {
      title: 'Display',
      icon: Monitor,
      specs: [
        { label: 'Size', value: phone.specifications.display.size },
        { label: 'Resolution', value: phone.specifications.display.resolution },
        { label: 'Type', value: phone.specifications.display.type }
      ]
    },
    {
      title: 'Performance',
      icon: Cpu,
      specs: [
        { label: 'Processor', value: phone.specifications.processor },
        { label: 'RAM', value: phone.specifications.ram },
        { label: 'Storage', value: phone.specifications.storage },
        { label: 'OS', value: phone.specifications.os }
      ]
    },
    {
      title: 'Camera',
      icon: Camera,
      specs: [
        { label: 'Rear Camera', value: phone.specifications.camera.rear },
        { label: 'Front Camera', value: phone.specifications.camera.front }
      ]
    },
    {
      title: 'Battery & Connectivity',
      icon: Battery,
      specs: [
        { label: 'Battery', value: phone.specifications.battery },
        { label: 'Network', value: phone.specifications.network.join(', ') }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Phones</span>
            </button>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-gray-800/50 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-500/20 transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onAddToCompare(phone)}
                className={`p-2 rounded-lg transition-all ${
                  isInCompare 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'bg-gray-800/50 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/20'
                }`}
              >
                <Compare className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-800/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Phone Image & Gallery */}
          <div className="space-y-6">
            <div className="relative bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 text-center">
              <img
                src={phone.image}
                alt={phone.name}
                className="max-w-full max-h-80 mx-auto object-contain"
              />
              <div className="absolute top-4 right-4">
                {phone.price.original && (
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                    {Math.round(((phone.price.original - phone.price.current) / phone.price.original) * 100)}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Color Options */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Available Colors</h3>
              <div className="flex flex-wrap gap-3">
                {phone.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedColor === color
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                        : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-cyan-500/30'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Phone Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{phone.name}</h1>
              <p className="text-lg text-gray-400 mb-4">{phone.brand}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(phone.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-white">{phone.rating}</span>
                  <span className="text-gray-400">({phone.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-white">
                        {phone.price.currency}{phone.price.current.toLocaleString()}
                      </span>
                      {phone.price.original && (
                        <span className="text-lg text-gray-400 line-through">
                          {phone.price.currency}{phone.price.original.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Best price guaranteed</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    phone.availability === 'available' 
                      ? 'bg-green-500/20 text-green-400'
                      : phone.availability === 'coming-soon'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {phone.availability === 'available' && 'In Stock'}
                    {phone.availability === 'coming-soon' && 'Coming Soon'}
                    {phone.availability === 'discontinued' && 'Discontinued'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700/50">
                  <button className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Buy Now</span>
                  </button>
                  <button className="bg-gray-800/50 backdrop-blur-sm text-white py-3 px-6 rounded-lg font-semibold border border-gray-700 hover:bg-gray-700/50 hover:border-cyan-500/50 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Monitor, label: 'Display', value: phone.specifications.display.size },
                { icon: Cpu, label: 'Processor', value: phone.specifications.processor.split(' ')[0] },
                { icon: Camera, label: 'Camera', value: phone.specifications.camera.rear.split(' ')[0] },
                { icon: Battery, label: 'Battery', value: phone.specifications.battery }
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-700/30 p-4 text-center">
                  <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">{label}</div>
                  <div className="text-lg font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-500/10 backdrop-blur-sm rounded-xl border border-green-500/20 p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Pros</h3>
                <ul className="space-y-2">
                  {phone.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/20 p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Cons</h3>
                <ul className="space-y-2">
                  {phone.cons.map((con, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-cyan-500/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            {activeTab === 'specs' && (
              <div className="space-y-8">
                {specCategories.map(({ title, icon: Icon, specs }) => (
                  <div key={title} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                      <Icon className="w-6 h-6 text-cyan-400" />
                      <span>{title}</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specs.map(({ label, value }) => (
                        <div key={label} className="flex justify-between py-3 border-b border-gray-700/30">
                          <span className="text-gray-400">{label}</span>
                          <span className="text-white font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phone.features.map((feature, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        <span className="text-white font-medium">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">User Reviews</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-white">User {i}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">2 days ago</span>
                        </div>
                      </div>
                      <p className="text-gray-300">
                        Great phone with excellent build quality and camera performance. 
                        The battery life is impressive and the display is vibrant.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};