import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Wifi, Coffee, Dumbbell, Wind, UtensilsCrossed, Sparkles, Users, Calendar, ChevronLeft, ChevronRight, X, Check, Clock, CreditCard, Bed, Maximize2, User } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router';

interface RoomType {
  id: string;
  name: string;
  image: string;
  size: number;
  beds: string;
  capacity: number;
  amenities: string[];
  price: number;
  discount?: number;
  cancellation: string;
  breakfast: boolean;
}

const ROOM_TYPES: RoomType[] = [
  {
    id: '1',
    name: 'Deluxe King Room',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    size: 35,
    beds: '1 King Bed',
    capacity: 2,
    amenities: ['wifi', 'minibar', 'safe', 'bathtub'],
    price: 280,
    cancellation: 'Free cancellation until 24 hours before check-in',
    breakfast: true,
  },
  {
    id: '2',
    name: 'Deluxe Twin Room',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    size: 35,
    beds: '2 Single Beds',
    capacity: 2,
    amenities: ['wifi', 'minibar', 'safe', 'bathtub'],
    price: 280,
    cancellation: 'Free cancellation until 24 hours before check-in',
    breakfast: true,
  },
  {
    id: '3',
    name: 'Premier Suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    size: 55,
    beds: '1 King Bed + Sofa Bed',
    capacity: 3,
    amenities: ['wifi', 'minibar', 'safe', 'bathtub', 'living-room'],
    price: 450,
    discount: 15,
    cancellation: 'Free cancellation until 48 hours before check-in',
    breakfast: true,
  },
  {
    id: '4',
    name: 'Executive Suite',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    size: 65,
    beds: '1 King Bed + Sofa Bed',
    capacity: 3,
    amenities: ['wifi', 'minibar', 'safe', 'bathtub', 'living-room', 'balcony'],
    price: 520,
    discount: 10,
    cancellation: 'Free cancellation until 72 hours before check-in',
    breakfast: true,
  },
];

const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
];

const FACILITIES = [
  { icon: <Wifi className="w-5 h-5" />, label: 'Free WiFi' },
  { icon: <Wind className="w-5 h-5" />, label: 'Swimming Pool' },
  { icon: <Dumbbell className="w-5 h-5" />, label: 'Fitness Center' },
  { icon: <Sparkles className="w-5 h-5" />, label: 'Spa & Wellness' },
  { icon: <UtensilsCrossed className="w-5 h-5" />, label: 'Restaurant' },
  { icon: <Coffee className="w-5 h-5" />, label: 'Bar & Lounge' },
  { icon: <CreditCard className="w-5 h-5" />, label: 'Room Service' },
  { icon: <Clock className="w-5 h-5" />, label: '24/7 Front Desk' },
];

export default function HotelDetailsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get('id');

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [checkIn, setCheckIn] = useState('18 Jun 2024');
  const [checkOut, setCheckOut] = useState('22 Jun 2024');
  const [guests, setGuests] = useState('2 adults');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? HOTEL_IMAGES.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === HOTEL_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const handleBookRoom = (roomId: string) => {
    setSelectedRoom(roomId);
    // Navigate to booking confirmation or similar
    navigate(`/hotel-booking?hotelId=${hotelId}&roomId=${roomId}`);
  };

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <header className="border-b border-[#262B36] sticky top-0 bg-[#0F1115] z-40">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/hotels')}
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

      {/* Hero Image Gallery */}
      <div className="relative h-[500px] bg-[#171A21]">
        <div className="max-w-[1400px] mx-auto h-full">
          <div className="flex gap-2 h-full p-2">
            {/* Left: Image Grid */}
            <div className="flex-1 grid grid-cols-2 gap-2">
              {/* Main large image */}
              <div className="col-span-2 relative rounded-lg overflow-hidden group cursor-pointer" onClick={() => setShowGallery(true)}>
                <img
                  src={HOTEL_IMAGES[0]}
                  alt="Hotel main view"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Smaller images */}
              {HOTEL_IMAGES.slice(1, 3).map((img, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden group cursor-pointer" onClick={() => setShowGallery(true)}>
                  <img
                    src={img}
                    alt={`Hotel view ${idx + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {idx === 1 && (
                    <div className="absolute inset-0 bg-[#0F1115]/80 flex items-center justify-center">
                      <button className="text-[#F3F4F6] text-lg font-semibold">
                        +{HOTEL_IMAGES.length - 3} Photos
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Scrollable Video Feed */}
            <div 
              className="w-80 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer group relative"
              onClick={() => setShowVideoModal(true)}
            >
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80"
                alt="Hotel videos preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115]/90 via-[#0F1115]/40 to-transparent flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#0F1115] border-b-[12px] border-b-transparent ml-1"></div>
                </div>
                <p className="text-[#F3F4F6] text-lg font-bold mb-1">Watch Hotel Videos</p>
                <p className="text-[#9CA3AF] text-sm">5 videos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Hotel Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-[#F3F4F6] mb-3">
                    The Sukhothai Bangkok
                  </h1>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 bg-[#22C55E] text-[#0F1115] rounded text-sm font-bold">
                        9.2
                      </div>
                      <span className="text-[#F3F4F6] font-semibold">Excellent</span>
                      <span className="text-[#9CA3AF] text-sm">(1,243 reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#9CA3AF]">
                    <MapPin className="w-5 h-5" />
                    <span>13/3 South Sathorn Road, Sathorn, Bangkok, 10120, Thailand</span>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                {FACILITIES.map((facility, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#9CA3AF]">
                    <div className="text-[#22C55E]">{facility.icon}</div>
                    <span className="text-sm">{facility.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-8 pb-8 border-b border-[#262B36]">
              <h2 className="text-2xl font-bold text-[#F3F4F6] mb-4">About this hotel</h2>
              <p className="text-[#9CA3AF] leading-relaxed">
                The Sukhothai Bangkok is a luxury hotel that seamlessly blends traditional Thai architecture with contemporary design. 
                Set in 6 acres of landscaped gardens, the hotel offers a tranquil oasis in the heart of Bangkok's bustling business district. 
                The hotel features elegantly appointed rooms and suites, world-class dining options, and exceptional wellness facilities. 
                With its commitment to refined service and attention to detail, The Sukhothai Bangkok provides an unforgettable stay experience.
              </p>
            </div>

            {/* Room Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#F3F4F6] mb-6">Available Rooms</h2>
              <div className="space-y-4">
                {ROOM_TYPES.map((room) => (
                  <div
                    key={room.id}
                    className="bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden hover:border-[#374151] transition-all"
                  >
                    <div className="flex gap-6 p-4">
                      {/* Room Image */}
                      <div className="w-64 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Room Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#F3F4F6] mb-2">{room.name}</h3>
                          
                          {/* Room Details */}
                          <div className="flex items-center gap-6 mb-4 text-sm text-[#9CA3AF]">
                            <div className="flex items-center gap-1.5">
                              <Maximize2 className="w-4 h-4" />
                              <span>{room.size} m²</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Bed className="w-4 h-4" />
                              <span>{room.beds}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <User className="w-4 h-4" />
                              <span>{room.capacity} guests</span>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="flex items-center gap-4 flex-wrap mb-4">
                            <div className="flex items-center gap-1.5 text-[#22C55E] text-sm">
                              <Check className="w-4 h-4" />
                              <span>Free WiFi</span>
                            </div>
                            {room.breakfast && (
                              <div className="flex items-center gap-1.5 text-[#22C55E] text-sm">
                                <Check className="w-4 h-4" />
                                <span>Breakfast included</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 text-[#22C55E] text-sm">
                              <Check className="w-4 h-4" />
                              <span>{room.cancellation}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price and Book */}
                        <div className="flex items-end justify-between">
                          <div>
                            {room.discount && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#9CA3AF] line-through text-sm">
                                  S$ {room.price}
                                </span>
                                <span className="px-2 py-0.5 bg-[#EF4444] text-white text-xs font-bold rounded">
                                  {room.discount}% OFF
                                </span>
                              </div>
                            )}
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-[#F3F4F6]">
                                S$ {room.discount ? Math.round(room.price * (1 - room.discount / 100)) : room.price}
                              </span>
                              <span className="text-[#9CA3AF] text-sm">/ night</span>
                            </div>
                            <p className="text-[#9CA3AF] text-xs mt-1">4 nights • Includes taxes & fees</p>
                          </div>
                          <button
                            onClick={() => handleBookRoom(room.id)}
                            className="px-8 py-3 bg-[#22C55E] text-[#0F1115] font-bold rounded-lg hover:bg-[#16A34A] transition-all"
                          >
                            Book now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Policies */}
            <div className="mb-8 pb-8 border-b border-[#262B36]">
              <h2 className="text-2xl font-bold text-[#F3F4F6] mb-6">Hotel Policies</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[#F3F4F6] font-semibold mb-3">Check-in / Check-out</h3>
                  <div className="space-y-2 text-sm text-[#9CA3AF]">
                    <p>Check-in: From 15:00</p>
                    <p>Check-out: Until 12:00</p>
                    <p>Early check-in/late check-out subject to availability</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#F3F4F6] font-semibold mb-3">Cancellation Policy</h3>
                  <div className="space-y-2 text-sm text-[#9CA3AF]">
                    <p>Free cancellation varies by room type</p>
                    <p>Please check room details for specific policies</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#F3F4F6] font-semibold mb-3">Children & Extra Beds</h3>
                  <div className="space-y-2 text-sm text-[#9CA3AF]">
                    <p>Children of all ages are welcome</p>
                    <p>Extra bed upon request (charges apply)</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#F3F4F6] font-semibold mb-3">Pets</h3>
                  <div className="space-y-2 text-sm text-[#9CA3AF]">
                    <p>Pets are not allowed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#F3F4F6] mb-6">Guest Reviews</h2>
              <div className="space-y-4">
                {[
                  {
                    name: 'Sarah Johnson',
                    rating: 9.5,
                    date: 'March 10, 2026',
                    comment: 'Absolutely stunning hotel with exceptional service. The rooms are spacious and beautifully designed. The breakfast buffet was incredible with a wide variety of options.',
                  },
                  {
                    name: 'Michael Chen',
                    rating: 9.0,
                    date: 'March 8, 2026',
                    comment: 'Great location and facilities. The pool area is peaceful and the spa treatments are top-notch. Staff went above and beyond to make our stay memorable.',
                  },
                  {
                    name: 'Emma Williams',
                    rating: 9.8,
                    date: 'March 5, 2026',
                    comment: 'One of the best hotels I\'ve stayed at in Bangkok. The attention to detail is remarkable, from the room amenities to the dining experience. Highly recommend!',
                  },
                ].map((review, idx) => (
                  <div key={idx} className="bg-[#171A21] border border-[#262B36] rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-[#F3F4F6] font-semibold">{review.name}</h4>
                        <p className="text-[#9CA3AF] text-sm">{review.date}</p>
                      </div>
                      <div className="px-3 py-1 bg-[#22C55E] text-[#0F1115] rounded font-bold">
                        {review.rating}
                      </div>
                    </div>
                    <p className="text-[#9CA3AF] leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="w-96 flex-shrink-0">
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-[#F3F4F6]">S$ 280</span>
                  <span className="text-[#9CA3AF] text-sm">/ night</span>
                </div>
                <p className="text-[#9CA3AF] text-sm">Includes taxes & fees</p>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[#9CA3AF] text-xs mb-2">Check-in</label>
                  <div className="bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-[#F3F4F6] text-sm">{checkIn}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[#9CA3AF] text-xs mb-2">Check-out</label>
                  <div className="bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-[#F3F4F6] text-sm">{checkOut}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[#9CA3AF] text-xs mb-2">Guests</label>
                  <div className="bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-[#F3F4F6] text-sm">{guests}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-[#262B36]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9CA3AF]">S$ 280 × 4 nights</span>
                  <span className="text-[#F3F4F6]">S$ 1,120</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9CA3AF]">Taxes & fees</span>
                  <span className="text-[#F3F4F6]">S$ 168</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-[#F3F4F6] font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#F3F4F6]">S$ 1,288</span>
              </div>

              <button className="w-full bg-[#22C55E] text-[#0F1115] font-bold py-4 rounded-lg hover:bg-[#16A34A] transition-all mb-4">
                Reserve
              </button>

              <p className="text-center text-[#9CA3AF] text-xs">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-[#0F1115] z-50 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-6 right-6 w-10 h-10 bg-[#171A21] border border-[#262B36] rounded-full flex items-center justify-center hover:bg-[#262B36] transition-all z-10"
          >
            <X className="w-5 h-5 text-[#F3F4F6]" />
          </button>

          <div className="max-w-6xl w-full px-6">
            <div className="relative">
              <img
                src={HOTEL_IMAGES[currentImageIndex]}
                alt={`Hotel view ${currentImageIndex + 1}`}
                className="w-full h-[600px] object-contain rounded-lg"
              />

              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-[#0F1115]" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
              >
                <ChevronRight className="w-6 h-6 text-[#0F1115]" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#0F1115]/80 backdrop-blur-sm rounded-full text-[#F3F4F6] text-sm">
                {currentImageIndex + 1} / {HOTEL_IMAGES.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 mt-4 justify-center">
              {HOTEL_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex
                      ? 'border-[#22C55E]'
                      : 'border-[#262B36] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal - TikTok Style */}
      {showVideoModal && <VideoFeedModal onClose={() => setShowVideoModal(false)} />}
    </div>
  );
}

// Video Feed Modal Component
interface VideoFeedModalProps {
  onClose: () => void;
}

const HOTEL_VIDEOS = [
  {
    id: '1',
    title: 'Luxury Hotel Tour',
    description: 'Experience the stunning architecture and elegant interiors of The Sukhothai Bangkok',
    thumbnail: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    duration: '2:45',
  },
  {
    id: '2',
    title: 'Deluxe Room Walkthrough',
    description: 'Step inside our beautifully appointed deluxe rooms with modern amenities',
    thumbnail: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    duration: '1:30',
  },
  {
    id: '3',
    title: 'Pool & Spa Facilities',
    description: 'Relax and unwind at our world-class pool and spa facilities',
    thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    duration: '1:15',
  },
  {
    id: '4',
    title: 'Restaurant & Dining',
    description: 'Discover our award-winning restaurants and culinary experiences',
    thumbnail: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    duration: '1:50',
  },
  {
    id: '5',
    title: 'Gym & Wellness Center',
    description: 'Stay fit with our state-of-the-art gym and wellness facilities',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    duration: '1:05',
  },
];

function VideoFeedModal({ onClose }: VideoFeedModalProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 50 && currentVideoIndex < HOTEL_VIDEOS.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else if (e.deltaY < -50 && currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-[#0F1115] z-50 overflow-hidden"
      onWheel={handleScroll}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-[#171A21]/80 backdrop-blur-sm border border-[#262B36] rounded-full flex items-center justify-center hover:bg-[#262B36] transition-all z-20"
      >
        <X className="w-6 h-6 text-[#F3F4F6]" />
      </button>

      {/* Video Counter */}
      <div className="absolute top-6 left-6 px-4 py-2 bg-[#0F1115]/80 backdrop-blur-sm rounded-full text-[#F3F4F6] text-sm font-semibold z-20">
        {currentVideoIndex + 1} / {HOTEL_VIDEOS.length}
      </div>

      {/* Video Container with Snap Scroll */}
      <div 
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollBehavior: 'smooth',
          transform: `translateY(-${currentVideoIndex * 100}vh)`,
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {HOTEL_VIDEOS.map((video, idx) => (
          <div
            key={video.id}
            className="h-screen w-full snap-start flex items-center justify-center relative"
          >
            {/* Video/Image */}
            <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-contain"
              />
              
              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#0F1115]/20">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[24px] border-l-[#0F1115] border-b-[16px] border-b-transparent ml-2"></div>
                </div>
              </div>

              {/* Video Info Overlay - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/80 to-transparent">
                <h3 className="text-2xl font-bold text-[#F3F4F6] mb-2">{video.title}</h3>
                <p className="text-[#9CA3AF] mb-4">{video.description}</p>
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-[#171A21]/80 backdrop-blur-sm rounded-full text-[#F3F4F6] text-sm">
                    {video.duration}
                  </div>
                  <button className="px-6 py-2 bg-[#22C55E] text-[#0F1115] font-bold rounded-lg hover:bg-[#16A34A] transition-all">
                    Watch Full Video
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Hints */}
            {idx > 0 && (
              <button
                onClick={() => setCurrentVideoIndex(idx - 1)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60vh] opacity-50 hover:opacity-100 transition-opacity"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 border-2 border-[#F3F4F6] rounded-full flex items-center justify-center animate-bounce">
                    <ChevronLeft className="w-6 h-6 text-[#F3F4F6] rotate-90" />
                  </div>
                  <span className="text-[#9CA3AF] text-sm">Previous</span>
                </div>
              </button>
            )}
            {idx < HOTEL_VIDEOS.length - 1 && (
              <button
                onClick={() => setCurrentVideoIndex(idx + 1)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[50vh] opacity-50 hover:opacity-100 transition-opacity"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[#9CA3AF] text-sm">Scroll for next</span>
                  <div className="w-10 h-10 border-2 border-[#F3F4F6] rounded-full flex items-center justify-center animate-bounce">
                    <ChevronRight className="w-6 h-6 text-[#F3F4F6] rotate-90" />
                  </div>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}