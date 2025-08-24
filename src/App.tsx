import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PhoneList } from './components/PhoneList';
import { PhoneDetail } from './components/PhoneDetail';
import { ComparePhones } from './components/ComparePhones';
import { phones } from './data/phones';
import { Phone } from './types/Phone';

type Page = 'home' | 'phones' | 'compare' | 'reviews' | 'news' | 'phone-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [compareList, setCompareList] = useState<Phone[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    if (page !== 'phone-detail') {
      setSelectedPhone(null);
    }
  }, []);

  const handlePhoneSelect = useCallback((phone: Phone) => {
    setSelectedPhone(phone);
    setCurrentPage('phone-detail');
  }, []);

  const handleAddToCompare = useCallback((phone: Phone) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === phone.id)) {
        return prev.filter(p => p.id !== phone.id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), phone];
      }
      return [...prev, phone];
    });
  }, []);

  const handleRemoveFromCompare = useCallback((phoneId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== phoneId));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            phones={phones}
            onPhoneSelect={handlePhoneSelect}
            onAddToCompare={handleAddToCompare}
            onNavigate={handleNavigate}
            compareList={compareList}
          />
        );
      
      case 'phones':
        return (
          <PhoneList
            phones={phones}
            onPhoneSelect={handlePhoneSelect}
            onAddToCompare={handleAddToCompare}
            compareList={compareList}
            searchQuery={searchQuery}
          />
        );
      
      case 'phone-detail':
        return selectedPhone ? (
          <PhoneDetail
            phone={selectedPhone}
            onBack={() => handleNavigate('phones')}
            onAddToCompare={handleAddToCompare}
            isInCompare={compareList.some(p => p.id === selectedPhone.id)}
          />
        ) : null;
      
      case 'compare':
        return (
          <ComparePhones
            compareList={compareList}
            onRemoveFromCompare={handleRemoveFromCompare}
            onNavigateToPhones={() => handleNavigate('phones')}
            allPhones={phones}
            onAddToCompare={handleAddToCompare}
          />
        );
      
      case 'reviews':
        return (
          <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Reviews Coming Soon</h2>
              <p className="text-gray-400 mb-8">We're working on bringing you detailed reviews.</p>
              <button 
                onClick={() => handleNavigate('home')}
                className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      case 'news':
        return (
          <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Latest News Coming Soon</h2>
              <p className="text-gray-400 mb-8">Stay tuned for the latest mobile technology news.</p>
              <button 
                onClick={() => handleNavigate('home')}
                className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header 
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        currentPage={currentPage}
      />
      {renderPage()}
      
      {/* Compare Notification */}
      {compareList.length > 0 && currentPage !== 'compare' && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => handleNavigate('compare')}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-2xl hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Compare ({compareList.length})</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;