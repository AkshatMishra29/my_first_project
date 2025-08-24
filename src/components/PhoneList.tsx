import React, { useState, useMemo } from 'react';
import { Filter, SortAsc, Grid, List as ListIcon } from 'lucide-react';
import { PhoneCard } from './PhoneCard';
import { FilterSidebar } from './FilterSidebar';
import { Phone } from '../types/Phone';

interface PhoneListProps {
  phones: Phone[];
  onPhoneSelect: (phone: Phone) => void;
  onAddToCompare: (phone: Phone) => void;
  compareList: Phone[];
  searchQuery?: string;
}

export const PhoneList: React.FC<PhoneListProps> = ({ 
  phones, 
  onPhoneSelect, 
  onAddToCompare, 
  compareList,
  searchQuery = ''
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    brand: [] as string[],
    priceRange: [0, 200000] as [number, number],
    ram: [] as string[],
    storage: [] as string[],
    rating: 0
  });

  const filteredAndSortedPhones = useMemo(() => {
    let filtered = phones.filter(phone => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          phone.name.toLowerCase().includes(query) ||
          phone.brand.toLowerCase().includes(query) ||
          phone.specifications.processor.toLowerCase().includes(query) ||
          phone.features.some(feature => feature.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Brand filter
      if (filters.brand.length > 0 && !filters.brand.includes(phone.brand)) {
        return false;
      }

      // Price range filter
      if (phone.price.current < filters.priceRange[0] || phone.price.current > filters.priceRange[1]) {
        return false;
      }

      // RAM filter
      if (filters.ram.length > 0 && !filters.ram.some(ram => phone.specifications.ram.includes(ram))) {
        return false;
      }

      // Storage filter
      if (filters.storage.length > 0 && !filters.storage.some(storage => phone.specifications.storage.includes(storage))) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && phone.rating < filters.rating) {
        return false;
      }

      return true;
    });

    // Sort phones
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price.current - b.price.current);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price.current - a.price.current);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime());
        break;
      default: // popularity
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  }, [phones, searchQuery, filters, sortBy]);

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-80">
          <div className="p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'All Mobile Phones'}
                </h1>
                <p className="text-gray-400">
                  {filteredAndSortedPhones.length} phone{filteredAndSortedPhones.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-gray-800">
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.brand.length > 0 || filters.ram.length > 0 || filters.storage.length > 0 || filters.rating > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-gray-400">Active filters:</span>
                {filters.brand.map(brand => (
                  <span key={brand} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                    {brand}
                  </span>
                ))}
                {filters.ram.map(ram => (
                  <span key={ram} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                    {ram} RAM
                  </span>
                ))}
                {filters.storage.map(storage => (
                  <span key={storage} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    {storage} Storage
                  </span>
                ))}
                {filters.rating > 0 && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                    {filters.rating}+ Rating
                  </span>
                )}
              </div>
            )}

            {/* Phone Grid */}
            {filteredAndSortedPhones.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredAndSortedPhones.map(phone => (
                  <PhoneCard
                    key={phone.id}
                    phone={phone}
                    onSelect={onPhoneSelect}
                    onAddToCompare={onAddToCompare}
                    isInCompare={compareList.some(p => p.id === phone.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No phones found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your filters or search query to find more phones.
                </p>
                <button
                  onClick={() => setFilters({
                    brand: [],
                    priceRange: [0, 200000],
                    ram: [],
                    storage: [],
                    rating: 0
                  })}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};