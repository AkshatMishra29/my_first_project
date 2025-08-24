import React, { useState } from 'react';
import { Search, Menu, X, Smartphone, Zap, Shield, GitCompare as Compare, Star } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onSearch, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onNavigate('phones');
  };

  const navigation = [
    { name: 'Home', key: 'home', icon: Smartphone },
    { name: 'Mobiles', key: 'phones', icon: Smartphone },
    { name: 'Compare', key: 'compare', icon: Compare },
    { name: 'Reviews', key: 'reviews', icon: Star },
    { name: 'Latest', key: 'news', icon: Zap }
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:from-purple-500 group-hover:to-cyan-500 transition-all duration-300">
              <Smartphone className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              91Neon
            </span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mobiles, brands, features..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map(({ name, key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 relative group ${
                  currentPage === key
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
                {currentPage === key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mobiles..."
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </form>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800">
          <div className="px-4 py-2 space-y-1">
            {navigation.map(({ name, key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  onNavigate(key);
                  setIsMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-300 flex items-center space-x-3 ${
                  currentPage === key
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};