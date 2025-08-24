import React from 'react';
import { X, Star, Check, AlertCircle, Plus } from 'lucide-react';
import { Phone } from '../types/Phone';

interface ComparePhonesProps {
  compareList: Phone[];
  onRemoveFromCompare: (phoneId: string) => void;
  onNavigateToPhones: () => void;
  allPhones: Phone[];
  onAddToCompare: (phone: Phone) => void;
}

export const ComparePhones: React.FC<ComparePhonesProps> = ({ 
  compareList, 
  onRemoveFromCompare, 
  onNavigateToPhones,
  allPhones,
  onAddToCompare 
}) => {
  const availablePhones = allPhones.filter(phone => 
    !compareList.find(p => p.id === phone.id)
  );

  const comparisonCategories = [
    {
      title: 'Basic Info',
      fields: [
        { key: 'name', label: 'Model' },
        { key: 'brand', label: 'Brand' },
        { key: 'price.current', label: 'Price', format: (phone: Phone) => `${phone.price.currency}${phone.price.current.toLocaleString()}` },
        { key: 'rating', label: 'Rating', format: (phone: Phone) => `${phone.rating}/5` },
        { key: 'availability', label: 'Availability', format: (phone: Phone) => phone.availability.replace('-', ' ').toUpperCase() }
      ]
    },
    {
      title: 'Display',
      fields: [
        { key: 'specifications.display.size', label: 'Size', format: (phone: Phone) => phone.specifications.display.size },
        { key: 'specifications.display.resolution', label: 'Resolution', format: (phone: Phone) => phone.specifications.display.resolution },
        { key: 'specifications.display.type', label: 'Type', format: (phone: Phone) => phone.specifications.display.type }
      ]
    },
    {
      title: 'Performance',
      fields: [
        { key: 'specifications.processor', label: 'Processor', format: (phone: Phone) => phone.specifications.processor },
        { key: 'specifications.ram', label: 'RAM', format: (phone: Phone) => phone.specifications.ram },
        { key: 'specifications.storage', label: 'Storage', format: (phone: Phone) => phone.specifications.storage },
        { key: 'specifications.os', label: 'Operating System', format: (phone: Phone) => phone.specifications.os }
      ]
    },
    {
      title: 'Camera',
      fields: [
        { key: 'specifications.camera.rear', label: 'Rear Camera', format: (phone: Phone) => phone.specifications.camera.rear },
        { key: 'specifications.camera.front', label: 'Front Camera', format: (phone: Phone) => phone.specifications.camera.front }
      ]
    },
    {
      title: 'Battery & Connectivity',
      fields: [
        { key: 'specifications.battery', label: 'Battery', format: (phone: Phone) => phone.specifications.battery },
        { key: 'specifications.network', label: 'Network', format: (phone: Phone) => phone.specifications.network.join(', ') }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Compare Phones</h1>
          <p className="text-gray-400">
            Compare specifications, features, and prices side by side
          </p>
        </div>

        {compareList.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No phones to compare</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Add phones to compare their specifications, features, and prices side by side.
            </p>
            <button
              onClick={onNavigateToPhones}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300"
            >
              Browse Phones
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Phone Selection Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {/* Selected Phones */}
              {compareList.map(phone => (
                <div key={phone.id} className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
                  <button
                    onClick={() => onRemoveFromCompare(phone.id)}
                    className="absolute top-3 right-3 p-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="text-center">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="w-20 h-24 mx-auto mb-4 object-contain"
                    />
                    <h3 className="font-semibold text-white text-sm mb-1">{phone.name}</h3>
                    <p className="text-gray-400 text-xs mb-2">{phone.brand}</p>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-white">{phone.rating}</span>
                    </div>
                    <p className="text-cyan-400 font-semibold text-sm">
                      {phone.price.currency}{phone.price.current.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add More Phones */}
              {compareList.length < 4 && (
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 border-dashed p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <Plus className="w-12 h-12 text-gray-600 mb-4" />
                  <p className="text-gray-400 text-center mb-4">Add another phone to compare</p>
                  <div className="w-full max-h-32 overflow-y-auto space-y-2">
                    {availablePhones.slice(0, 3).map(phone => (
                      <button
                        key={phone.id}
                        onClick={() => onAddToCompare(phone)}
                        className="w-full text-left p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors text-sm"
                      >
                        <span className="text-white">{phone.name}</span>
                        <span className="text-gray-400 block">{phone.brand}</span>
                      </button>
                    ))}
                  </div>
                  {availablePhones.length > 3 && (
                    <button
                      onClick={onNavigateToPhones}
                      className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                    >
                      View all phones
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Comparison Table */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700/50">
                      <th className="text-left p-6 text-gray-400 font-medium sticky left-0 bg-gray-900/50 backdrop-blur-sm">
                        Specification
                      </th>
                      {compareList.map(phone => (
                        <th key={phone.id} className="text-center p-6 min-w-48">
                          <img
                            src={phone.image}
                            alt={phone.name}
                            className="w-12 h-16 mx-auto mb-2 object-contain"
                          />
                          <div className="text-white font-semibold text-sm">{phone.name}</div>
                          <div className="text-gray-400 text-xs">{phone.brand}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonCategories.map(category => (
                      <React.Fragment key={category.title}>
                        <tr className="bg-gray-800/30">
                          <td colSpan={compareList.length + 1} className="p-4 font-semibold text-cyan-400 sticky left-0 bg-gray-800/30">
                            {category.title}
                          </td>
                        </tr>
                        {category.fields.map(field => (
                          <tr key={field.key} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                            <td className="p-4 text-gray-300 sticky left-0 bg-gray-900/50 backdrop-blur-sm">
                              {field.label}
                            </td>
                            {compareList.map(phone => (
                              <td key={phone.id} className="p-4 text-center text-white">
                                {field.format ? field.format(phone) : field.key.split('.').reduce((obj, key) => obj?.[key], phone as any)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}

                    {/* Features Comparison */}
                    <tr className="bg-gray-800/30">
                      <td colSpan={compareList.length + 1} className="p-4 font-semibold text-cyan-400 sticky left-0 bg-gray-800/30">
                        Key Features
                      </td>
                    </tr>
                    {Array.from(new Set(compareList.flatMap(phone => phone.features))).map(feature => (
                      <tr key={feature} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                        <td className="p-4 text-gray-300 sticky left-0 bg-gray-900/50 backdrop-blur-sm">
                          {feature}
                        </td>
                        {compareList.map(phone => (
                          <td key={phone.id} className="p-4 text-center">
                            {phone.features.includes(feature) ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-400 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={onNavigateToPhones}
                className="px-6 py-3 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all"
              >
                Add More Phones
              </button>
              <button
                onClick={() => compareList.forEach(phone => onRemoveFromCompare(phone.id))}
                className="px-6 py-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};