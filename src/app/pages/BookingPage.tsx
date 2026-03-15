import { useState } from 'react';
import { Plane, Hotel, Car, MapPin, UtensilsCrossed, ArrowLeftRight, Calendar, Users, Search, ChevronDown, Check, Plus, X, Briefcase } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { DatePickerModal } from '../components/DatePickerModal';

type BookingType = 'flights' | 'hotels' | 'cars' | 'experiences' | 'food';

interface TabConfig {
  id: BookingType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabConfig[] = [
  { id: 'flights', label: 'Flights', icon: <Plane className="w-5 h-5" /> },
  { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-5 h-5" /> },
  { id: 'cars', label: 'Car Rental', icon: <Car className="w-5 h-5" /> },
  { id: 'experiences', label: 'Experiences', icon: <MapPin className="w-5 h-5" /> },
  { id: 'food', label: 'Dining', icon: <UtensilsCrossed className="w-5 h-5" /> },
];

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<BookingType>('flights');
  const [tripType, setTripType] = useState<'return' | 'one-way' | 'multi-city'>('return');
  const [selectedTrip, setSelectedTrip] = useState<string | null>(
    searchParams.get('trip') || null
  );
  const [showTripSelector, setShowTripSelector] = useState(false);

  // Mock trip data
  const trips = [
    { id: '1', name: 'San Francisco Adventure', dates: 'Mar 15-22, 2026', destination: 'San Francisco, CA' },
    { id: '2', name: 'NYC Getaway', dates: 'Apr 10-15, 2026', destination: 'New York, NY' },
    { id: '3', name: 'European Tour', dates: 'May 20-Jun 5, 2026', destination: 'Europe' },
  ];

  const currentTrip = selectedTrip ? trips.find(t => t.id === selectedTrip) : null;

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <header className="border-b border-[#262B36]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#22C55E]">
            Kontour
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/trip" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              My Trips
            </Link>
            <Link to="/collections" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              Collections
            </Link>
            <Link to="/settings" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#22C55E]/20 via-[#171A21] to-[#0F1115] border-b border-[#262B36]">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-[#F3F4F6] mb-4">
            Book Your Next Adventure
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Flights, hotels, cars, experiences, and dining—all in one place
          </p>
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-[#22C55E] text-sm">
              <Check className="w-5 h-5" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-2 text-[#22C55E] text-sm">
              <Check className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-[#22C55E] text-sm">
              <Check className="w-5 h-5" />
              <span>Best price guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Trip Selector Banner */}
        <div className="mb-6">
          {currentTrip ? (
            <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#22C55E]/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#22C55E]" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-xs mb-1">Adding bookings to trip:</p>
                  <h3 className="text-[#F3F4F6] font-semibold">{currentTrip.name}</h3>
                  <p className="text-[#22C55E] text-xs mt-0.5">{currentTrip.dates} • {currentTrip.destination}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTripSelector(true)}
                  className="px-4 py-2 bg-[#0F1115] border border-[#262B36] text-[#F3F4F6] rounded-lg hover:border-[#374151] transition-all text-sm font-medium"
                >
                  Change Trip
                </button>
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="p-2 bg-[#0F1115] border border-[#262B36] text-[#9CA3AF] rounded-lg hover:border-[#374151] hover:text-[#F3F4F6] transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#262B36] rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#6B7280]" />
                </div>
                <div>
                  <h3 className="text-[#F3F4F6] font-medium">Add bookings to a trip</h3>
                  <p className="text-[#9CA3AF] text-sm">Organize all your bookings in one place</p>
                </div>
              </div>
              <button
                onClick={() => setShowTripSelector(true)}
                className="px-6 py-2.5 bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] rounded-lg hover:bg-[#22C55E]/20 transition-all text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Select Trip</span>
              </button>
            </div>
          )}
        </div>

        {/* Booking Card */}
        <div className="bg-[#171A21] border border-[#262B36] rounded-2xl overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="border-b border-[#262B36]">
            <div className="flex items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'text-[#22C55E] border-[#22C55E] bg-[#22C55E]/5'
                      : 'text-[#9CA3AF] border-transparent hover:text-[#F3F4F6] hover:bg-[#0F1115]/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'flights' && <FlightsForm tripType={tripType} setTripType={setTripType} />}
            {activeTab === 'hotels' && <HotelsForm />}
            {activeTab === 'cars' && <CarsForm />}
            {activeTab === 'experiences' && <ExperiencesForm />}
            {activeTab === 'food' && <FoodForm />}
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#F3F4F6] mb-8">
            {activeTab === 'flights' && 'Popular Destinations'}
            {activeTab === 'hotels' && 'Featured Hotels'}
            {activeTab === 'cars' && 'Popular Vehicles'}
            {activeTab === 'experiences' && 'Top Experiences'}
            {activeTab === 'food' && 'Must-Try Restaurants'}
          </h2>
          <FeaturedItems type={activeTab} />
        </div>
      </div>

      {/* Trip Selector Modal */}
      {showTripSelector && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#171A21] border border-[#262B36] rounded-2xl w-full max-w-2xl shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#262B36] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#F3F4F6]">Select Trip</h3>
                <p className="text-[#9CA3AF] text-sm mt-1">Choose which trip to add bookings to</p>
              </div>
              <button
                onClick={() => setShowTripSelector(false)}
                className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
              {trips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => {
                    setSelectedTrip(trip.id);
                    setShowTripSelector(false);
                  }}
                  className={`w-full bg-[#0F1115] border rounded-xl p-4 flex items-center gap-4 transition-all text-left ${
                    selectedTrip === trip.id
                      ? 'border-[#22C55E] bg-[#22C55E]/5'
                      : 'border-[#262B36] hover:border-[#374151]'
                  }`}
                >
                  <div className="w-12 h-12 bg-[#262B36] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#F3F4F6] font-medium">{trip.name}</h4>
                    <p className="text-[#9CA3AF] text-sm mt-0.5">
                      {trip.dates} • {trip.destination}
                    </p>
                  </div>
                  {selectedTrip === trip.id && (
                    <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                  )}
                </button>
              ))}

              {/* Create New Trip Button */}
              <button className="w-full bg-[#0F1115] border border-dashed border-[#262B36] rounded-xl p-4 flex items-center justify-center gap-2 hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all">
                <Plus className="w-5 h-5 text-[#22C55E]" />
                <span className="text-[#F3F4F6] font-medium">Create New Trip</span>
              </button>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#262B36]">
              <button
                onClick={() => setShowTripSelector(false)}
                className="w-full px-6 py-2.5 bg-[#0F1115] border border-[#262B36] text-[#F3F4F6] rounded-lg hover:border-[#374151] transition-all text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Flights Form Component
function FlightsForm({ tripType, setTripType }: { tripType: string; setTripType: (type: 'return' | 'one-way' | 'multi-city') => void }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [outboundDate, setOutboundDate] = useState<Date | null>(new Date(2026, 2, 2)); // Mar 2, 2026
  const [inboundDate, setInboundDate] = useState<Date | null>(new Date(2026, 2, 4)); // Mar 4, 2026

  const formatDateDisplay = () => {
    if (!outboundDate) return '';
    const outStr = outboundDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    if (tripType === 'one-way' || !inboundDate) return outStr;
    const inStr = inboundDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return `${outStr} — ${inStr}`;
  };

  return (
    <div className="space-y-6">
      {/* Trip Type Selector */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            checked={tripType === 'return'}
            onChange={() => setTripType('return')}
            className="w-4 h-4 text-[#22C55E] bg-[#0F1115] border-[#262B36] focus:ring-[#22C55E]"
          />
          <span className="text-[#F3F4F6] text-sm">Return</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            checked={tripType === 'one-way'}
            onChange={() => setTripType('one-way')}
            className="w-4 h-4 text-[#22C55E] bg-[#0F1115] border-[#262B36] focus:ring-[#22C55E]"
          />
          <span className="text-[#F3F4F6] text-sm">One-way</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            checked={tripType === 'multi-city'}
            onChange={() => setTripType('multi-city')}
            className="w-4 h-4 text-[#22C55E] bg-[#0F1115] border-[#262B36] focus:ring-[#22C55E]"
          />
          <span className="text-[#F3F4F6] text-sm">Multi-city</span>
        </label>
      </div>

      {/* Flight Search Fields */}
      <div className="grid grid-cols-12 gap-4">
        {/* From */}
        <div className="col-span-3 relative">
          <label className="block text-[#9CA3AF] text-xs mb-2">From</label>
          <div className="relative">
            <input
              type="text"
              placeholder="San Francisco (SFO)"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Plane className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
          <p className="text-xs text-[#6B7280] mt-1">All airports</p>
        </div>

        {/* Swap Button */}
        <div className="col-span-1 flex items-end pb-3">
          <button className="w-full aspect-square bg-[#171A21] border border-[#262B36] rounded-lg flex items-center justify-center hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all">
            <ArrowLeftRight className="w-5 h-5 text-[#22C55E]" />
          </button>
        </div>

        {/* To */}
        <div className="col-span-3 relative">
          <label className="block text-[#9CA3AF] text-xs mb-2">To</label>
          <div className="relative">
            <input
              type="text"
              placeholder="New York (JFK)"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Plane className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
          <p className="text-xs text-[#6B7280] mt-1">All airports</p>
        </div>

        {/* Dates */}
        <div className="col-span-3">
          <label className="block text-[#9CA3AF] text-xs mb-2">Departure - Return</label>
          <div className="relative">
            <input
              type="text"
              value={formatDateDisplay()}
              placeholder="Mon, Mar 2 — Wed, Mar 4"
              onClick={() => setShowDatePicker(true)}
              readOnly
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors cursor-pointer"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Passengers */}
        <div className="col-span-2">
          <label className="block text-[#9CA3AF] text-xs mb-2">Passengers</label>
          <div className="relative">
            <input
              type="text"
              placeholder="1 adult"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <Link to="/flights" className="w-full bg-[#22C55E] text-[#0F1115] font-semibold py-4 rounded-lg hover:bg-[#1DB954] transition-all flex items-center justify-center gap-2">
        <Search className="w-5 h-5" />
        <span>Search Flights</span>
      </Link>

      {/* Date Picker Modal */}
      <DatePickerModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(outbound, inbound) => {
          setOutboundDate(outbound);
          setInboundDate(inbound);
        }}
        tripType={tripType as 'return' | 'one-way' | 'multi-city'}
        initialOutbound={outboundDate}
        initialInbound={inboundDate}
      />
    </div>
  );
}

// Hotels Form Component
function HotelsForm() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  
  const handleSearch = () => {
    navigate(`/hotels?destination=${encodeURIComponent(destination || 'Bangkok, Thailand')}`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Destination */}
        <div className="col-span-4">
          <label className="block text-[#9CA3AF] text-xs mb-2">Destination</label>
          <div className="relative">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Check-in */}
        <div className="col-span-3">
          <label className="block text-[#9CA3AF] text-xs mb-2">Check-in</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Mon, Mar 2"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Check-out */}
        <div className="col-span-3">
          <label className="block text-[#9CA3AF] text-xs mb-2">Check-out</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Wed, Mar 4"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Guests */}
        <div className="col-span-2">
          <label className="block text-[#9CA3AF] text-xs mb-2">Guests</label>
          <div className="relative">
            <input
              type="text"
              placeholder="2 guests"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-[#22C55E] text-[#0F1115] font-semibold py-4 rounded-lg hover:bg-[#1DB954] transition-all flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        <span>Search Hotels</span>
      </button>
    </div>
  );
}

// Cars Form Component
function CarsForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Pick-up Location */}
        <div className="col-span-4">
          <label className="block text-[#9CA3AF] text-xs mb-2">Pick-up Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="San Francisco, CA"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Pick-up Date */}
        <div className="col-span-3">
          <label className="block text-[#9CA3AF] text-xs mb-2">Pick-up Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Mon, Mar 2"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Drop-off Date */}
        <div className="col-span-3">
          <label className="block text-[#9CA3AF] text-xs mb-2">Drop-off Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Wed, Mar 4"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Driver Age */}
        <div className="col-span-2">
          <label className="block text-[#9CA3AF] text-xs mb-2">Driver Age</label>
          <div className="relative">
            <input
              type="text"
              placeholder="30"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
          </div>
        </div>
      </div>

      <button className="w-full bg-[#22C55E] text-[#0F1115] font-semibold py-4 rounded-lg hover:bg-[#1DB954] transition-all flex items-center justify-center gap-2">
        <Search className="w-5 h-5" />
        <span>Search Cars</span>
      </button>
    </div>
  );
}

// Experiences Form Component
function ExperiencesForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Destination */}
        <div className="col-span-5">
          <label className="block text-[#9CA3AF] text-xs mb-2">Destination</label>
          <div className="relative">
            <input
              type="text"
              placeholder="San Francisco, CA"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Date */}
        <div className="col-span-4">
          <label className="block text-[#9CA3AF] text-xs mb-2">Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Select date"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Guests */}
        <div className="col-span-3">
          <label className="block text-[#9CA3AF] text-xs mb-2">Guests</label>
          <div className="relative">
            <input
              type="text"
              placeholder="2 guests"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>
      </div>

      <button className="w-full bg-[#22C55E] text-[#0F1115] font-semibold py-4 rounded-lg hover:bg-[#1DB954] transition-all flex items-center justify-center gap-2">
        <Search className="w-5 h-5" />
        <span>Search Experiences</span>
      </button>
    </div>
  );
}

// Food Form Component
function FoodForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Location */}
        <div className="col-span-4">
          <label className="block text-[#9CA3AF] text-xs mb-2">Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="San Francisco, CA"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Date */}
        <div className="col-span-3">
          <label className="block text-[#9CA3AF] text-xs mb-2">Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Mon, Mar 2"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Time */}
        <div className="col-span-2">
          <label className="block text-[#9CA3AF] text-xs mb-2">Time</label>
          <div className="relative">
            <input
              type="text"
              placeholder="7:00 PM"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
          </div>
        </div>

        {/* Party Size */}
        <div className="col-span-3">
          <label className="block text-[#9CA3AF] text-xs mb-2">Party Size</label>
          <div className="relative">
            <input
              type="text"
              placeholder="2 people"
              className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
            <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          </div>
        </div>
      </div>

      <button className="w-full bg-[#22C55E] text-[#0F1115] font-semibold py-4 rounded-lg hover:bg-[#1DB954] transition-all flex items-center justify-center gap-2">
        <Search className="w-5 h-5" />
        <span>Search Restaurants</span>
      </button>
    </div>
  );
}

// Featured Items Component
function FeaturedItems({ type }: { type: BookingType }) {
  const items = {
    flights: [
      { title: 'New York', subtitle: 'From $299', image: 'https://images.unsplash.com/photo-1565444007614-6b38c78224df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmRvdyUyMGZsaWdodHxlbnwxfHx8fDE3NzMyOTU0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'London', subtitle: 'From $549', image: 'https://images.unsplash.com/photo-1565444007614-6b38c78224df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmRvdyUyMGZsaWdodHxlbnwxfHx8fDE3NzMyOTU0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Tokyo', subtitle: 'From $799', image: 'https://images.unsplash.com/photo-1565444007614-6b38c78224df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmRvdyUyMGZsaWdodHxlbnwxfHx8fDE3NzMyOTU0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Paris', subtitle: 'From $629', image: 'https://images.unsplash.com/photo-1565444007614-6b38c78224df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmRvdyUyMGZsaWdodHxlbnwxfHx8fDE3NzMyOTU0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
    hotels: [
      { title: 'Luxury Suites SF', subtitle: '$299 / night', image: 'https://images.unsplash.com/photo-1737807478491-6e258b44bd04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDF8fHx8MTc3MzI1MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Boutique Hotel Downtown', subtitle: '$199 / night', image: 'https://images.unsplash.com/photo-1737807478491-6e258b44bd04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDF8fHx8MTc3MzI1MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Waterfront Resort', subtitle: '$449 / night', image: 'https://images.unsplash.com/photo-1737807478491-6e258b44bd04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDF8fHx8MTc3MzI1MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Historic Inn', subtitle: '$149 / night', image: 'https://images.unsplash.com/photo-1737807478491-6e258b44bd04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDF8fHx8MTc3MzI1MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
    cars: [
      { title: 'Luxury Sedan', subtitle: '$89 / day', image: 'https://images.unsplash.com/photo-1760976396211-5546ce83a400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBsdXh1cnl8ZW58MXx8fHwxNzczMjk1NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'SUV 4x4', subtitle: '$129 / day', image: 'https://images.unsplash.com/photo-1760976396211-5546ce83a400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBsdXh1cnl8ZW58MXx8fHwxNzczMjk1NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Convertible', subtitle: '$149 / day', image: 'https://images.unsplash.com/photo-1760976396211-5546ce83a400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBsdXh1cnl8ZW58MXx8fHwxNzczMjk1NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Economy Car', subtitle: '$39 / day', image: 'https://images.unsplash.com/photo-1760976396211-5546ce83a400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBsdXh1cnl8ZW58MXx8fHwxNzczMjk1NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
    experiences: [
      { title: 'Golden Gate Tour', subtitle: 'From $49', image: 'https://images.unsplash.com/photo-1652080947399-bf7a7c62a24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwZ3VpZGUlMjBleHBlcmllbmNlfGVufDF8fHx8MTc3MzI5NTQwNXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Wine Country Day Trip', subtitle: 'From $129', image: 'https://images.unsplash.com/photo-1652080947399-bf7a7c62a24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwZ3VpZGUlMjBleHBlcmllbmNlfGVufDF8fHx8MTc3MzI5NTQwNXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Alcatraz Night Tour', subtitle: 'From $79', image: 'https://images.unsplash.com/photo-1652080947399-bf7a7c62a24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwZ3VpZGUlMjBleHBlcmllbmNlfGVufDF8fHx8MTc3MzI5NTQwNXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Bay Cruise', subtitle: 'From $39', image: 'https://images.unsplash.com/photo-1652080947399-bf7a7c62a24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwZ3VpZGUlMjBleHBlcmllbmNlfGVufDF8fHx8MTc3MzI5NTQwNXww&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
    food: [
      { title: 'The French Laundry', subtitle: '$$$$', image: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzMyNDUzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'State Bird Provisions', subtitle: '$$$', image: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzMyNDUzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Tartine Bakery', subtitle: '$$', image: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzMyNDUzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { title: 'Swan Oyster Depot', subtitle: '$$', image: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzMyNDUzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
  };

  const currentItems = items[type];

  return (
    <div className="grid grid-cols-4 gap-6">
      {currentItems.map((item, index) => (
        <div
          key={index}
          className="bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden group cursor-pointer hover:border-[#22C55E] hover:shadow-xl hover:shadow-[#22C55E]/10 transition-all"
        >
          <div className="aspect-video relative overflow-hidden">
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-4">
            <h3 className="text-[#F3F4F6] font-semibold mb-1">{item.title}</h3>
            <p className="text-[#22C55E] text-sm font-medium">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}