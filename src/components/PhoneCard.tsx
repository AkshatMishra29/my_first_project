import React from 'react';
import { Star, Heart, GitCompare as Compare, ShoppingCart } from 'lucide-react';
import { Phone } from '../types/Phone';

interface PhoneCardProps {
  phone: Phone;
  onSelect: (phone: Phone) => void;
  onAddToCompare: (phone: Phone) => void;
  isInCompare?: boolean;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({ 
  phone, 
  onSelect, 
  onAddToCompare,
  isInCompare = false 
}) => {
  return (
    <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Discount Badge */}
      {phone.price.original && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          {Math.round(((phone.price.original - phone.price.current) / phone.price.original) * 100)}% OFF
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 bg-black/70 backdrop-blur-sm rounded-full text-gray-300 hover:text-red-400 hover:bg-red-500/20 transition-all">
          <Heart className="w-4 h-4" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCompare(phone);
          }}
          className={`p-2 backdrop-blur-sm rounded-full transition-all ${
            isInCompare 
              ? 'bg-cyan-500/20 text-cyan-400' 
              : 'bg-black/70 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/20'
          }`}
        >
          <Compare className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 cursor-pointer" onClick={() => onSelect(phone)}>
        {/* Phone Image */}
        <div className="relative mb-4 mx-auto w-32 h-40 flex items-center justify-center">
          <img
            src={phone.image}
            alt={phone.name}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Phone Info */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
              {phone.name}
            </h3>
            <p className="text-sm text-gray-400">{phone.brand}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-white font-medium">{phone.rating}</span>
            </div>
            <span className="text-xs text-gray-400">({phone.reviewCount} reviews)</span>
          </div>

          {/* Key Specs */}
          <div className="space-y-1 text-xs text-gray-300">
            <div className="flex justify-between">
              <span>RAM:</span>
              <span className="text-cyan-400">{phone.specifications.ram}</span>
            </div>
            <div className="flex justify-between">
              <span>Storage:</span>
              <span className="text-cyan-400">{phone.specifications.storage}</span>
            </div>
            <div className="flex justify-between">
              <span>Display:</span>
              <span className="text-cyan-400">{phone.specifications.display.size}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-white">
                  {phone.price.currency}{phone.price.current.toLocaleString()}
                </span>
                {phone.price.original && (
                  <span className="text-sm text-gray-400 line-through">
                    {phone.price.currency}{phone.price.original.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              phone.availability === 'available' 
                ? 'bg-green-500/20 text-green-400'
                : phone.availability === 'coming-soon'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {phone.availability === 'available' && 'Available'}
              {phone.availability === 'coming-soon' && 'Coming Soon'}
              {phone.availability === 'discontinued' && 'Discontinued'}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-600 to-purple-600 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center justify-between">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(phone);
            }}
            className="flex-1 bg-white/10 backdrop-blur-sm text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-colors mr-2"
          >
            View Details
          </button>
          <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};