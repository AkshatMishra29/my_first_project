import { Phone } from '../types/Phone';

export const phones: Phone[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: {
      current: 159900,
      original: 169900,
      currency: '₹'
    },
    rating: 4.8,
    reviewCount: 2847,
    specifications: {
      display: {
        size: '6.7"',
        resolution: '2796 x 1290',
        type: 'Super Retina XDR OLED'
      },
      processor: 'A17 Pro Bionic',
      ram: '8GB',
      storage: '256GB',
      camera: {
        rear: '48MP + 12MP + 12MP',
        front: '12MP'
      },
      battery: '4441 mAh',
      os: 'iOS 17',
      network: ['5G', '4G LTE', 'Wi-Fi 6E']
    },
    features: ['Face ID', 'Wireless Charging', 'Water Resistant', 'Titanium Build'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    availability: 'available',
    launchDate: '2023-09-22',
    pros: ['Excellent camera quality', 'Premium titanium build', 'Outstanding performance'],
    cons: ['Expensive', 'No charger in box', 'Lightning to USB-C transition']
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: {
      current: 129999,
      currency: '₹'
    },
    rating: 4.7,
    reviewCount: 1932,
    specifications: {
      display: {
        size: '6.8"',
        resolution: '3120 x 1440',
        type: 'Dynamic AMOLED 2X'
      },
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: {
        rear: '200MP + 50MP + 12MP + 10MP',
        front: '12MP'
      },
      battery: '5000 mAh',
      os: 'Android 14',
      network: ['5G', '4G LTE', 'Wi-Fi 7']
    },
    features: ['S Pen', 'Wireless Charging', 'Reverse Charging', 'Water Resistant'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    availability: 'available',
    launchDate: '2024-01-24',
    pros: ['S Pen functionality', 'Excellent camera zoom', 'Large battery'],
    cons: ['Heavy device', 'Expensive', 'Bloatware']
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: {
      current: 106999,
      currency: '₹'
    },
    rating: 4.6,
    reviewCount: 1456,
    specifications: {
      display: {
        size: '6.7"',
        resolution: '2992 x 1344',
        type: 'LTPO OLED'
      },
      processor: 'Google Tensor G3',
      ram: '12GB',
      storage: '128GB',
      camera: {
        rear: '50MP + 48MP + 48MP',
        front: '10.5MP'
      },
      battery: '5050 mAh',
      os: 'Android 14',
      network: ['5G', '4G LTE', 'Wi-Fi 6E']
    },
    features: ['Magic Eraser', 'Live Translate', 'Car Crash Detection', 'Wireless Charging'],
    colors: ['Bay', 'Obsidian', 'Porcelain'],
    availability: 'available',
    launchDate: '2023-10-12',
    pros: ['Best Android camera', 'Pure Android experience', 'AI features'],
    cons: ['Average battery life', 'Limited availability', 'Tensor heating']
  },
  {
    id: '4',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    image: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: {
      current: 64999,
      currency: '₹'
    },
    rating: 4.5,
    reviewCount: 892,
    specifications: {
      display: {
        size: '6.82"',
        resolution: '3168 x 1440',
        type: 'LTPO AMOLED'
      },
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: {
        rear: '50MP + 64MP + 48MP',
        front: '32MP'
      },
      battery: '5400 mAh',
      os: 'OxygenOS 14',
      network: ['5G', '4G LTE', 'Wi-Fi 7']
    },
    features: ['100W Fast Charging', 'Wireless Charging', 'Alert Slider', 'Gaming Mode'],
    colors: ['Flowy Emerald', 'Silky Black'],
    availability: 'available',
    launchDate: '2024-01-23',
    pros: ['Ultra-fast charging', 'Smooth performance', 'Great value'],
    cons: ['Average camera', 'No IP rating', 'Limited color options']
  },
  {
    id: '5',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: {
      current: 99999,
      currency: '₹'
    },
    rating: 4.4,
    reviewCount: 567,
    specifications: {
      display: {
        size: '6.73"',
        resolution: '3200 x 1440',
        type: 'LTPO AMOLED'
      },
      processor: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      storage: '512GB',
      camera: {
        rear: '50MP + 50MP + 50MP + 50MP',
        front: '32MP'
      },
      battery: '5300 mAh',
      os: 'HyperOS',
      network: ['5G', '4G LTE', 'Wi-Fi 7']
    },
    features: ['Leica Camera', '90W Fast Charging', 'Wireless Charging', 'IP68'],
    colors: ['Black', 'White'],
    availability: 'available',
    launchDate: '2024-02-25',
    pros: ['Excellent cameras', 'Premium build', 'Fast performance'],
    cons: ['Heavy MIUI', 'Expensive', 'Limited global availability']
  },
  {
    id: '6',
    name: 'Vivo X100 Pro',
    brand: 'Vivo',
    image: 'https://images.pexels.com/photos/1660990/pexels-photo-1660990.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: {
      current: 89999,
      currency: '₹'
    },
    rating: 4.3,
    reviewCount: 432,
    specifications: {
      display: {
        size: '6.78"',
        resolution: '2800 x 1260',
        type: 'LTPO AMOLED'
      },
      processor: 'MediaTek Dimensity 9300',
      ram: '16GB',
      storage: '512GB',
      camera: {
        rear: '50MP + 50MP + 50MP',
        front: '32MP'
      },
      battery: '5400 mAh',
      os: 'Funtouch OS 14',
      network: ['5G', '4G LTE', 'Wi-Fi 7']
    },
    features: ['Zeiss Optics', '120W Fast Charging', 'Wireless Charging', 'IP68'],
    colors: ['Asteroid Black', 'Meteor Silver'],
    availability: 'available',
    launchDate: '2024-01-04',
    pros: ['Excellent camera performance', 'Fast charging', 'Premium design'],
    cons: ['Heavy software', 'Expensive', 'Average gaming performance']
  }
];