import { useState } from 'react';
import { ArrowLeft, Search, MapPin, Calendar, Users, Star, Wifi, Coffee, Dumbbell, Wind, UtensilsCrossed, Sparkles, ChevronDown, SlidersHorizontal, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router';

interface Hotel {
  id: string;
  name: string;
  images: string[];
  location: string;
  stars: number;
  rating: number;
  reviews: number;
  price: number;
  amenities: string[];
  propertyType: string;
  description: string;
  featured?: boolean;
}

const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'The Sukhothai Bangkok',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    ],
    location: 'Sathorn, Bangkok',
    stars: 5,
    rating: 9.2,
    reviews: 1243,
    price: 280,
    amenities: ['wifi', 'pool', 'gym', 'spa', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Luxury hotel with stunning architecture and world-class amenities',
    featured: true,
  },
  {
    id: '2',
    name: 'Mandarin Oriental Bangkok',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    ],
    location: 'Riverside, Bangkok',
    stars: 5,
    rating: 9.4,
    reviews: 2156,
    price: 350,
    amenities: ['wifi', 'pool', 'gym', 'spa', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Iconic riverside hotel with legendary service and dining',
  },
  {
    id: '3',
    name: 'Siam Kempinski Hotel',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    ],
    location: 'Siam, Bangkok',
    stars: 5,
    rating: 8.9,
    reviews: 987,
    price: 245,
    amenities: ['wifi', 'pool', 'gym', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Urban oasis in the heart of Bangkok shopping district',
  },
  {
    id: '4',
    name: 'The Peninsula Bangkok',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    ],
    location: 'Riverside, Bangkok',
    stars: 5,
    rating: 9.1,
    reviews: 1432,
    price: 320,
    amenities: ['wifi', 'pool', 'gym', 'spa', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Contemporary luxury with river views and exceptional dining',
  },
  {
    id: '5',
    name: 'SO/ Bangkok',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    ],
    location: 'Lumphini, Bangkok',
    stars: 5,
    rating: 8.7,
    reviews: 765,
    price: 195,
    amenities: ['wifi', 'pool', 'gym', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Designer hotel with avant-garde style and rooftop pool',
  },
  {
    id: '6',
    name: 'Park Hyatt Bangkok',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    ],
    location: 'Central, Bangkok',
    stars: 5,
    rating: 9.0,
    reviews: 1089,
    price: 275,
    amenities: ['wifi', 'pool', 'gym', 'spa', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Modern luxury in the city center with stunning views',
  },
  {
    id: '7',
    name: 'Anantara Siam Bangkok',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    ],
    location: 'Ratchadamri, Bangkok',
    stars: 5,
    rating: 8.8,
    reviews: 892,
    price: 230,
    amenities: ['wifi', 'pool', 'gym', 'spa', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Colonial-style elegance with exceptional hospitality',
  },
  {
    id: '8',
    name: 'Bangkok Marriott Marquis',
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    ],
    location: 'Sukhumvit, Bangkok',
    stars: 5,
    rating: 8.6,
    reviews: 2341,
    price: 180,
    amenities: ['wifi', 'pool', 'gym', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Contemporary hotel with convenient location and modern facilities',
  },
  {
    id: '9',
    name: 'Capella Bangkok',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    ],
    location: 'Riverside, Bangkok',
    stars: 5,
    rating: 9.3,
    reviews: 456,
    price: 420,
    amenities: ['wifi', 'pool', 'gym', 'spa', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Ultra-luxury riverside retreat with personalized service',
  },
  {
    id: '10',
    name: 'The St. Regis Bangkok',
    images: [
      'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    ],
    location: 'Ratchadamri, Bangkok',
    stars: 5,
    rating: 9.0,
    reviews: 1123,
    price: 310,
    amenities: ['wifi', 'pool', 'gym', 'spa', 'restaurant'],
    propertyType: 'Hotel',
    description: 'Timeless elegance with legendary butler service',
  },
];

export default function HotelsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [destination, setDestination] = useState(searchParams.get('destination') || 'Bangkok, Thailand');
  const [checkIn, setCheckIn] = useState('18 Jun 2024');
  const [checkOut, setCheckOut] = useState('22 Jun 2024');
  const [guests, setGuests] = useState('2 adults');
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(true);

  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (hotelId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(hotelId)) {
      newFavorites.delete(hotelId);
    } else {
      newFavorites.add(hotelId);
    }
    setFavorites(newFavorites);
  };

  const toggleStar = (star: number) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter(s => s !== star));
    } else {
      setSelectedStars([...selectedStars, star]);
    }
  };

  const togglePropertyType = (type: string) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'pool': return <Wind className="w-4 h-4" />;
      case 'gym': return <Dumbbell className="w-4 h-4" />;
      case 'spa': return <Sparkles className="w-4 h-4" />;
      case 'restaurant': return <UtensilsCrossed className="w-4 h-4" />;
      default: return <Coffee className="w-4 h-4" />;
    }
  };

  const filteredHotels = HOTELS.filter(hotel => {
    if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) return false;
    if (hotel.price < priceRange[0] || hotel.price > priceRange[1]) return false;
    if (selectedPropertyTypes.length > 0 && !selectedPropertyTypes.includes(hotel.propertyType)) return false;
    if (selectedAmenities.length > 0 && !selectedAmenities.every(a => hotel.amenities.includes(a))) return false;
    return true;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'recommended':
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <header className="border-b border-[#262B36]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/booking')}
              className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link to="/" className="text-2xl font-bold text-[#22C55E]">
              Kontour
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/trip" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              My Trips
            </Link>
            <Link to="/booking" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              Bookings
            </Link>
          </nav>
        </div>
      </header>

      {/* Search Bar */}
      <div className="border-b border-[#262B36] bg-[#171A21]">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="grid grid-cols-4 gap-4">
            {/* Destination */}
            <div className="bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 hover:border-[#374151] transition-all">
              <label className="text-xs text-[#9CA3AF] mb-1 block">Destination</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#22C55E]" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent text-[#F3F4F6] text-sm outline-none w-full"
                  placeholder="Where to?"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 hover:border-[#374151] transition-all cursor-pointer">
              <label className="text-xs text-[#9CA3AF] mb-1 block">Check-in</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#22C55E]" />
                <span className="text-[#F3F4F6] text-sm">{checkIn}</span>
              </div>
            </div>

            {/* Check-out */}
            <div className="bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 hover:border-[#374151] transition-all cursor-pointer">
              <label className="text-xs text-[#9CA3AF] mb-1 block">Check-out</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#22C55E]" />
                <span className="text-[#F3F4F6] text-sm">{checkOut}</span>
              </div>
            </div>

            {/* Guests */}
            <div className="bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 hover:border-[#374151] transition-all cursor-pointer">
              <label className="text-xs text-[#9CA3AF] mb-1 block">Guests</label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#22C55E]" />
                <span className="text-[#F3F4F6] text-sm">{guests}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#F3F4F6]">Filters</h3>
                  <button
                    onClick={() => {
                      setSelectedStars([]);
                      setSelectedPropertyTypes([]);
                      setSelectedAmenities([]);
                      setPriceRange([0, 500]);
                    }}
                    className="text-[#22C55E] text-sm hover:underline"
                  >
                    Clear all
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6 pb-6 border-b border-[#262B36]">
                  <h4 className="text-[#F3F4F6] font-semibold mb-4">Price per night</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9CA3AF]">S$ {priceRange[0]}</span>
                      <span className="text-[#9CA3AF]">S$ {priceRange[1]}+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-[#262B36] rounded-lg appearance-none cursor-pointer accent-[#22C55E]"
                    />
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-6 pb-6 border-b border-[#262B36]">
                  <h4 className="text-[#F3F4F6] font-semibold mb-4">Star rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3].map(star => (
                      <button
                        key={star}
                        onClick={() => toggleStar(star)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          selectedStars.includes(star)
                            ? 'border-[#22C55E] bg-[#22C55E]/5'
                            : 'border-[#262B36] hover:border-[#374151]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {Array.from({ length: star }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                          ))}
                        </div>
                        <div className={`w-4 h-4 rounded border-2 ${
                          selectedStars.includes(star)
                            ? 'border-[#22C55E] bg-[#22C55E]'
                            : 'border-[#262B36]'
                        }`}>
                          {selectedStars.includes(star) && (
                            <div className="w-full h-full rounded bg-[#0F1115] scale-50"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div className="mb-6 pb-6 border-b border-[#262B36]">
                  <h4 className="text-[#F3F4F6] font-semibold mb-4">Property type</h4>
                  <div className="space-y-2">
                    {['Hotel', 'Resort', 'Apartment', 'Villa'].map(type => (
                      <button
                        key={type}
                        onClick={() => togglePropertyType(type)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          selectedPropertyTypes.includes(type)
                            ? 'border-[#22C55E] bg-[#22C55E]/5'
                            : 'border-[#262B36] hover:border-[#374151]'
                        }`}
                      >
                        <span className="text-[#F3F4F6] text-sm">{type}</span>
                        <div className={`w-4 h-4 rounded border-2 ${
                          selectedPropertyTypes.includes(type)
                            ? 'border-[#22C55E] bg-[#22C55E]'
                            : 'border-[#262B36]'
                        }`}>
                          {selectedPropertyTypes.includes(type) && (
                            <div className="w-full h-full rounded bg-[#0F1115] scale-50"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-[#F3F4F6] font-semibold mb-4">Amenities</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'wifi', label: 'Free WiFi', icon: <Wifi className="w-4 h-4" /> },
                      { id: 'pool', label: 'Pool', icon: <Wind className="w-4 h-4" /> },
                      { id: 'gym', label: 'Gym', icon: <Dumbbell className="w-4 h-4" /> },
                      { id: 'spa', label: 'Spa', icon: <Sparkles className="w-4 h-4" /> },
                      { id: 'restaurant', label: 'Restaurant', icon: <UtensilsCrossed className="w-4 h-4" /> },
                    ].map(amenity => (
                      <button
                        key={amenity.id}
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          selectedAmenities.includes(amenity.id)
                            ? 'border-[#22C55E] bg-[#22C55E]/5'
                            : 'border-[#262B36] hover:border-[#374151]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-[#9CA3AF]">{amenity.icon}</div>
                          <span className="text-[#F3F4F6] text-sm">{amenity.label}</span>
                        </div>
                        <div className={`w-4 h-4 rounded border-2 ${
                          selectedAmenities.includes(amenity.id)
                            ? 'border-[#22C55E] bg-[#22C55E]'
                            : 'border-[#262B36]'
                        }`}>
                          {selectedAmenities.includes(amenity.id) && (
                            <div className="w-full h-full rounded bg-[#0F1115] scale-50"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#F3F4F6] mb-1">
                  Hotels in {destination}
                </h2>
                <p className="text-[#9CA3AF] text-sm">
                  {sortedHotels.length} properties found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#171A21] border border-[#262B36] text-[#F3F4F6] rounded-lg hover:border-[#374151] transition-all"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm">Filters</span>
                </button>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-[#171A21] border border-[#262B36] text-[#F3F4F6] rounded-lg px-4 py-2 pr-10 text-sm hover:border-[#374151] transition-all cursor-pointer outline-none"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#9CA3AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Hotel Cards */}
            <div className="space-y-4">
              {sortedHotels.map(hotel => (
                <div
                  key={hotel.id}
                  className="bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden hover:border-[#374151] transition-all group"
                >
                  <div className="flex gap-6 p-4">
                    {/* Hotel Image Carousel */}
                    <HotelImageCarousel 
                      images={hotel.images}
                      hotelName={hotel.name}
                      featured={hotel.featured}
                      isFavorite={favorites.has(hotel.id)}
                      onToggleFavorite={() => toggleFavorite(hotel.id)}
                    />

                    {/* Hotel Info */}
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-[#F3F4F6] mb-2 group-hover:text-[#22C55E] transition-colors">
                              {hotel.name}
                            </h3>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: hotel.stars }).map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                                ))}
                              </div>
                              <div className="flex items-center gap-1 text-[#9CA3AF] text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{hotel.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-2xl font-bold text-[#22C55E]">{hotel.rating}</span>
                              <div className="px-2 py-1 bg-[#22C55E] text-[#0F1115] rounded text-xs font-bold">
                                Excellent
                              </div>
                            </div>
                            <p className="text-[#9CA3AF] text-xs">{hotel.reviews.toLocaleString()} reviews</p>
                          </div>
                        </div>

                        <p className="text-[#9CA3AF] text-sm mb-4">{hotel.description}</p>

                        {/* Amenities */}
                        <div className="flex items-center gap-4 flex-wrap">
                          {hotel.amenities.slice(0, 5).map(amenity => (
                            <div key={amenity} className="flex items-center gap-1.5 text-[#9CA3AF] text-sm">
                              {getAmenityIcon(amenity)}
                              <span className="capitalize">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Starting from</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[#F3F4F6]">S$ {hotel.price}</span>
                            <span className="text-[#9CA3AF] text-sm">/ night</span>
                          </div>
                          <p className="text-[#9CA3AF] text-xs mt-1">Includes taxes & fees</p>
                        </div>
                        <button
                          onClick={() => navigate(`/hotel-details?id=${hotel.id}`)}
                          className="px-8 py-3 bg-[#22C55E] text-[#0F1115] font-bold rounded-lg hover:bg-[#16A34A] transition-all"
                        >
                          View details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedHotels.length === 0 && (
              <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-[#262B36] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#9CA3AF]" />
                </div>
                <h3 className="text-xl font-bold text-[#F3F4F6] mb-2">No hotels found</h3>
                <p className="text-[#9CA3AF] mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => {
                    setSelectedStars([]);
                    setSelectedPropertyTypes([]);
                    setSelectedAmenities([]);
                    setPriceRange([0, 500]);
                  }}
                  className="px-6 py-3 bg-[#22C55E] text-[#0F1115] font-bold rounded-lg hover:bg-[#16A34A] transition-all"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Hotel Image Carousel Component
interface HotelImageCarouselProps {
  images: string[];
  hotelName: string;
  featured?: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

function HotelImageCarousel({ images, hotelName, featured, isFavorite, onToggleFavorite }: HotelImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-80 h-56 flex-shrink-0 rounded-lg overflow-hidden group/carousel">
      <img
        src={images[currentImageIndex]}
        alt={`${hotelName} - Image ${currentImageIndex + 1}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 bg-[#22C55E] text-[#0F1115] px-3 py-1 rounded-full text-xs font-bold z-10">
          Featured
        </div>
      )}
      
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all z-10"
      >
        <Heart
          className={`w-4 h-4 ${
            isFavorite
              ? 'fill-[#EF4444] text-[#EF4444]'
              : 'text-[#0F1115]'
          }`}
        />
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-white transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5 text-[#0F1115]" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-white transition-all z-10"
          >
            <ChevronRight className="w-5 h-5 text-[#0F1115]" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`transition-all rounded-full ${
                index === currentImageIndex
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}