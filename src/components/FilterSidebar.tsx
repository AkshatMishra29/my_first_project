import React from 'react';
import { Sliders, X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    brand: string[];
    priceRange: [number, number];
    ram: string[];
    storage: string[];
    rating: number;
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange 
}) => {
  const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Vivo', 'Oppo', 'Realme'];
  const ramOptions = ['4GB', '6GB', '8GB', '12GB', '16GB'];
  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    
    onFiltersChange({ ...filters, brand: newBrands });
  };

  const handleRamChange = (ram: string) => {
    const newRam = filters.ram.includes(ram)
      ? filters.ram.filter(r => r !== ram)
      : [...filters.ram, ram];
    
    onFiltersChange({ ...filters, ram: newRam });
  };

  const handleStorageChange = (storage: string) => {
    const newStorage = filters.storage.includes(storage)
      ? filters.storage.filter(s => s !== storage)
      : [...filters.storage, storage];
    
    onFiltersChange({ ...filters, storage: newStorage });
  };

  const clearFilters = () => {
    onFiltersChange({
      brand: [],
      priceRange: [0, 200000],
      ram: [],
      storage: [],
      rating: 0
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen w-80 bg-gray-900/90 backdrop-blur-md border-r border-gray-700/50 z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>Filters</span>
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  value={filters.priceRange[1]}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                  })}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>₹0</span>
                <span>₹{filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Brand</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map(brand => (
                <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-300 hover:text-white transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* RAM */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">RAM</h3>
            <div className="space-y-2">
              {ramOptions.map(ram => (
                <label key={ram} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.ram.includes(ram)}
                    onChange={() => handleRamChange(ram)}
                    className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-300 hover:text-white transition-colors">
                    {ram}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Storage</h3>
            <div className="space-y-2">
              {storageOptions.map(storage => (
                <label key={storage} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.storage.includes(storage)}
                    onChange={() => handleStorageChange(storage)}
                    className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-300 hover:text-white transition-colors">
                    {storage}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => onFiltersChange({ ...filters, rating })}
                    className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 focus:ring-cyan-500"
                  />
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-300">& above</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(to right, #00ffff, #ff00ff);
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(to right, #00ffff, #ff00ff);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};