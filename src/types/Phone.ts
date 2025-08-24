export interface Phone {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  rating: number;
  reviewCount: number;
  specifications: {
    display: {
      size: string;
      resolution: string;
      type: string;
    };
    processor: string;
    ram: string;
    storage: string;
    camera: {
      rear: string;
      front: string;
    };
    battery: string;
    os: string;
    network: string[];
  };
  features: string[];
  colors: string[];
  availability: 'available' | 'coming-soon' | 'discontinued';
  launchDate: string;
  pros: string[];
  cons: string[];
}