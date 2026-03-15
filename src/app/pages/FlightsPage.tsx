import { useState } from 'react';
import { Plane, ArrowLeftRight, Calendar, Users, ChevronDown, SlidersHorizontal, ChevronLeft, ChevronRight, TrendingUp, Check, Clock, Briefcase, User, Edit2, Plus, HelpCircle, ShoppingBag, Package } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { DatePickerModal } from '../components/DatePickerModal';
import { PassengerModal } from '../components/PassengerModal';

type FlightClass = 'economy' | 'premium' | 'business' | 'first';
type TripType = 'return' | 'one-way' | 'multi-city';
type SortBy = 'recommended' | 'cheapest' | 'fastest' | 'earliest';

interface PassengerData {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
}

interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  duration: string;
  price: number;
  direct: boolean;
  stops?: number;
  checkedBaggage?: string;
  alliance?: 'skyteam' | 'oneworld' | 'star';
}

const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'United Airlines',
    airlineLogo: 'UA',
    departureTime: '09:35',
    departureAirport: 'SFO T2',
    arrivalTime: '13:55',
    arrivalAirport: 'JFK T4',
    duration: '5h 20m',
    price: 299,
    direct: true,
    checkedBaggage: '23 kg',
    alliance: 'star',
  },
  {
    id: '2',
    airline: 'Delta Airlines',
    airlineLogo: 'DL',
    departureTime: '08:05',
    departureAirport: 'SFO T2',
    arrivalTime: '12:25',
    arrivalAirport: 'JFK T3',
    duration: '5h 20m',
    price: 279,
    direct: true,
    checkedBaggage: '30 kg',
    alliance: 'skyteam',
  },
  {
    id: '3',
    airline: 'JetBlue',
    airlineLogo: 'B6',
    departureTime: '09:40',
    departureAirport: 'SFO T2',
    arrivalTime: '14:15',
    arrivalAirport: 'JFK T1',
    duration: '5h 35m',
    price: 319,
    direct: true,
    checkedBaggage: '23 kg',
  },
  {
    id: '4',
    airline: 'American Airlines',
    airlineLogo: 'AA',
    departureTime: '18:30',
    departureAirport: 'SFO T2',
    arrivalTime: '23:05',
    arrivalAirport: 'JFK',
    duration: '5h 35m',
    price: 349,
    direct: true,
    alliance: 'oneworld',
  },
  {
    id: '5',
    airline: 'Southwest',
    airlineLogo: 'WN',
    departureTime: '11:15',
    departureAirport: 'SFO T1',
    arrivalTime: '17:45',
    arrivalAirport: 'JFK T4',
    duration: '7h 30m',
    price: 199,
    direct: false,
    stops: 1,
    checkedBaggage: '23 kg',
  },
  {
    id: '6',
    airline: 'Alaska Airlines',
    airlineLogo: 'AS',
    departureTime: '14:20',
    departureAirport: 'SFO T2',
    arrivalTime: '22:50',
    arrivalAirport: 'JFK T7',
    duration: '8h 30m',
    price: 229,
    direct: false,
    stops: 1,
    alliance: 'oneworld',
  },
];

export default function FlightsPage() {
  const [searchParams] = useSearchParams();
  const [tripType, setTripType] = useState<TripType>('return');
  const [sortBy, setSortBy] = useState<SortBy>('recommended');
  const [showFilters, setShowFilters] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [outboundDate, setOutboundDate] = useState<Date | null>(new Date(2026, 2, 4)); // Mar 4, 2026
  const [inboundDate, setInboundDate] = useState<Date | null>(new Date(2026, 2, 11)); // Mar 11, 2026
  
  // Filters
  const [directOnly, setDirectOnly] = useState(false);
  const [checkedBaggageOnly, setCheckedBaggageOnly] = useState(false);
  const [selectedAlliances, setSelectedAlliances] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

  // Passenger management
  const [passengers, setPassengers] = useState<PassengerData[]>([
    {
      id: '1',
      firstName: 'KEITH ENG KIAT',
      lastName: 'LIM',
      gender: 'Male',
      dateOfBirth: '1990-05-15',
      passportNumber: 'K4205976',
      passportExpiry: '2028-12-31',
      nationality: 'Singapore',
    }
  ]);
  const [selectedPassengerIds, setSelectedPassengerIds] = useState<string[]>(['1']);
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState<PassengerData | undefined>();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+65');

  // Date navigation - mock data for date carousel
  const dates = [
    { date: 'Mon, Mar 2', price: '$289', selected: false },
    { date: 'Tue, Mar 3', price: '$279', selected: false },
    { date: 'Wed, Mar 4', price: '$299', selected: true },
    { date: 'Thu, Mar 5', price: '$319', selected: false },
    { date: 'Fri, Mar 6', price: '$359', selected: false },
    { date: 'Sat, Mar 7', price: '$399', selected: false },
    { date: 'Sun, Mar 8', price: '$329', selected: false },
  ];

  // Get unique airlines
  const airlines = Array.from(new Set(mockFlights.map(f => f.airline)));

  // Filter flights
  const filteredFlights = mockFlights.filter(flight => {
    if (directOnly && !flight.direct) return false;
    if (checkedBaggageOnly && !flight.checkedBaggage) return false;
    if (selectedAlliances.length > 0 && flight.alliance && !selectedAlliances.includes(flight.alliance)) return false;
    if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) return false;
    return true;
  });

  // Sort flights
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortBy) {
      case 'cheapest':
        return a.price - b.price;
      case 'fastest':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'earliest':
        return a.departureTime.localeCompare(b.departureTime);
      default: // recommended
        return a.direct === b.direct ? a.price - b.price : a.direct ? -1 : 1;
    }
  });

  const toggleAlliance = (alliance: string) => {
    setSelectedAlliances(prev =>
      prev.includes(alliance) ? prev.filter(a => a !== alliance) : [...prev, alliance]
    );
  };

  const toggleAirline = (airline: string) => {
    setSelectedAirlines(prev =>
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    );
  };

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <header className="border-b border-[#262B36]">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#22C55E]">
            Kontour
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/trip" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              My Trips
            </Link>
            <Link to="/booking" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              Bookings
            </Link>
            <Link to="/collections" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              Collections
            </Link>
          </nav>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-[#171A21] border-b border-[#262B36]">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          {/* Trip Type */}
          <div className="flex items-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={tripType === 'return'}
                onChange={() => setTripType('return')}
                className="w-4 h-4 text-[#22C55E] bg-[#0F1115] border-[#262B36]"
              />
              <span className="text-[#F3F4F6] text-sm">Return</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={tripType === 'one-way'}
                onChange={() => setTripType('one-way')}
                className="w-4 h-4 text-[#22C55E] bg-[#0F1115] border-[#262B36]"
              />
              <span className="text-[#F3F4F6] text-sm">One-way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={tripType === 'multi-city'}
                onChange={() => setTripType('multi-city')}
                className="w-4 h-4 text-[#22C55E] bg-[#0F1115] border-[#262B36]"
              />
              <span className="text-[#F3F4F6] text-sm">Multi-city</span>
            </label>
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-12 gap-4">
            {/* From */}
            <div className="col-span-3 relative">
              <div className="relative">
                <input
                  type="text"
                  defaultValue="San Francisco"
                  className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] focus:outline-none focus:border-[#22C55E] transition-colors"
                />
                <p className="absolute top-1 left-4 text-[#6B7280] text-xs">From</p>
                <p className="absolute bottom-1 left-4 text-[#9CA3AF] text-xs">All airports</p>
              </div>
            </div>

            {/* Swap */}
            <div className="col-span-1 flex items-center justify-center">
              <button className="w-12 h-12 bg-[#0F1115] border border-[#262B36] rounded-lg flex items-center justify-center hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all">
                <ArrowLeftRight className="w-5 h-5 text-[#22C55E]" />
              </button>
            </div>

            {/* To */}
            <div className="col-span-3 relative">
              <div className="relative">
                <input
                  type="text"
                  defaultValue="New York"
                  className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] focus:outline-none focus:border-[#22C55E] transition-colors"
                />
                <p className="absolute top-1 left-4 text-[#6B7280] text-xs">To</p>
                <p className="absolute bottom-1 left-4 text-[#9CA3AF] text-xs">All airports</p>
              </div>
            </div>

            {/* Date */}
            <div className="col-span-3 relative">
              <div className="relative">
                <input
                  type="text"
                  defaultValue={outboundDate ? outboundDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ''}
                  className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] focus:outline-none focus:border-[#22C55E] transition-colors"
                  onClick={() => setShowDatePicker(true)}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              </div>
            </div>

            {/* Passengers */}
            <div className="col-span-2 relative">
              <div className="relative">
                <input
                  type="text"
                  defaultValue="1 adult · Economy"
                  className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] focus:outline-none focus:border-[#22C55E] transition-colors"
                  onClick={() => setShowPassengerModal(true)}
                />
                <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              </div>
            </div>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="max-w-[1600px] mx-auto px-6 pb-6">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#0F1115] rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-[#9CA3AF]" />
            </button>
            <div className="flex-1 flex items-center gap-2 overflow-x-auto">
              {dates.map((date, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    date.selected
                      ? 'bg-[#22C55E]/10 border border-[#22C55E] text-[#22C55E]'
                      : 'bg-[#0F1115] border border-[#262B36] text-[#9CA3AF] hover:border-[#374151]'
                  }`}
                >
                  <div className="text-center">
                    <div>{date.date}</div>
                    <div className="text-xs mt-0.5">{date.price}</div>
                  </div>
                </button>
              ))}
            </div>
            <button className="p-2 hover:bg-[#0F1115] rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
            </button>
            <button className="px-4 py-2 bg-[#0F1115] border border-[#262B36] rounded-lg text-[#9CA3AF] hover:border-[#374151] transition-all text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Price graph</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6 space-y-6">
                {/* Recommended Filters */}
                <div>
                  <h3 className="text-[#F3F4F6] font-semibold mb-4">Recommended</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={directOnly}
                        onChange={(e) => setDirectOnly(e.target.checked)}
                        className="w-5 h-5 rounded border-[#262B36] bg-[#0F1115] text-[#22C55E] focus:ring-[#22C55E] focus:ring-offset-0"
                      />
                      <span className="text-[#F3F4F6] text-sm group-hover:text-[#22C55E] transition-colors">Direct</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={checkedBaggageOnly}
                        onChange={(e) => setCheckedBaggageOnly(e.target.checked)}
                        className="w-5 h-5 rounded border-[#262B36] bg-[#0F1115] text-[#22C55E] focus:ring-[#22C55E] focus:ring-offset-0"
                      />
                      <span className="text-[#F3F4F6] text-sm group-hover:text-[#22C55E] transition-colors">Checked baggage included</span>
                    </label>
                  </div>
                </div>

                {/* Alliance */}
                <div>
                  <h3 className="text-[#F3F4F6] font-semibold mb-4">Alliance</h3>
                  <div className="space-y-3">
                    {['skyteam', 'oneworld', 'star'].map((alliance) => (
                      <label key={alliance} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedAlliances.includes(alliance)}
                          onChange={() => toggleAlliance(alliance)}
                          className="w-5 h-5 rounded border-[#262B36] bg-[#0F1115] text-[#22C55E] focus:ring-[#22C55E] focus:ring-offset-0"
                        />
                        <span className="text-[#F3F4F6] text-sm group-hover:text-[#22C55E] transition-colors capitalize">
                          {alliance === 'star' ? 'Star Alliance' : alliance === 'skyteam' ? 'SkyTeam' : 'Oneworld'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Airlines */}
                <div>
                  <h3 className="text-[#F3F4F6] font-semibold mb-4">Airlines</h3>
                  <div className="space-y-3">
                    {airlines.map((airline) => (
                      <label key={airline} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(airline)}
                          onChange={() => toggleAirline(airline)}
                          className="w-5 h-5 rounded border-[#262B36] bg-[#0F1115] text-[#22C55E] focus:ring-[#22C55E] focus:ring-offset-0"
                        />
                        <span className="text-[#F3F4F6] text-sm group-hover:text-[#22C55E] transition-colors">{airline}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#F3F4F6]">
                  Choose your flight from San Francisco to New York
                </h2>
                <p className="text-[#9CA3AF] text-sm mt-1">
                  Searching for low-priced flights... {sortedFlights.length} flights found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-[#171A21] border border-[#262B36] text-[#F3F4F6] rounded-lg hover:border-[#374151] transition-all flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm">Filters</span>
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="px-4 py-2 bg-[#171A21] border border-[#262B36] text-[#F3F4F6] rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors text-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="cheapest">Cheapest</option>
                  <option value="fastest">Fastest</option>
                  <option value="earliest">Earliest</option>
                </select>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {sortedFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-[#171A21] border border-[#262B36] rounded-xl p-6 hover:border-[#22C55E]/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Airline & Flight Info */}
                    <div className="flex items-center gap-6 flex-1">
                      {/* Airline Logo */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#0F1115] border border-[#262B36] rounded-lg flex items-center justify-center">
                          <span className="text-[#22C55E] font-bold text-sm">{flight.airlineLogo}</span>
                        </div>
                        <div>
                          <p className="text-[#F3F4F6] font-medium">{flight.airline}</p>
                          {flight.checkedBaggage && (
                            <p className="text-[#22C55E] text-xs flex items-center gap-1 mt-1">
                              <Briefcase className="w-3 h-3" />
                              Checked baggage {flight.checkedBaggage}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Flight Details */}
                      <div className="flex items-center gap-8 flex-1">
                        {/* Departure */}
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#F3F4F6]">{flight.departureTime}</p>
                          <p className="text-[#9CA3AF] text-sm mt-1">{flight.departureAirport}</p>
                        </div>

                        {/* Duration */}
                        <div className="flex-1 flex flex-col items-center">
                          <p className="text-[#9CA3AF] text-xs mb-1">{flight.duration}</p>
                          <div className="w-full h-0.5 bg-[#262B36] relative">
                            <div className="absolute inset-0 bg-[#22C55E]" style={{ width: '100%' }}></div>
                          </div>
                          <p className="text-[#22C55E] text-xs mt-1 font-medium">
                            {flight.direct ? 'Direct' : `${flight.stops} stop${flight.stops! > 1 ? 's' : ''}`}
                          </p>
                        </div>

                        {/* Arrival */}
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#F3F4F6]">{flight.arrivalTime}</p>
                          <p className="text-[#9CA3AF] text-sm mt-1">{flight.arrivalAirport}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Price & Select */}
                    <div className="flex items-center gap-6 ml-6">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#F3F4F6]">${flight.price}</p>
                      </div>
                      <Link
                        to={`/flight-details?flightIds=${flight.id},2`}
                        className="px-6 py-3 bg-[#22C55E] text-[#0F1115] font-semibold rounded-lg hover:bg-[#1DB954] transition-all flex items-center gap-2"
                      >
                        <span>Select</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {sortedFlights.length === 0 && (
              <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-12 text-center">
                <Plane className="w-16 h-16 text-[#262B36] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#F3F4F6] mb-2">No flights found</h3>
                <p className="text-[#9CA3AF]">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Date Picker Modal */}
      <DatePickerModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(outbound, inbound) => {
          setOutboundDate(outbound);
          setInboundDate(inbound);
        }}
        tripType={tripType}
        initialOutbound={outboundDate}
        initialInbound={inboundDate}
      />

      {/* Passenger Modal */}
      <PassengerModal
        isOpen={showPassengerModal}
        onClose={() => setShowPassengerModal(false)}
        passengers={passengers}
        selectedPassengerIds={selectedPassengerIds}
        onPassengerSelect={setSelectedPassengerIds}
        onPassengerAdd={() => {
          const newPassenger: PassengerData = {
            id: (passengers.length + 1).toString(),
            firstName: '',
            lastName: '',
            gender: 'Male',
            dateOfBirth: '',
            passportNumber: '',
            passportExpiry: '',
            nationality: '',
          };
          setPassengers([...passengers, newPassenger]);
          setEditingPassenger(newPassenger);
        }}
        onPassengerEdit={setEditingPassenger}
        editingPassenger={editingPassenger}
        onPassengerSave={(updatedPassenger) => {
          setPassengers(prevPassengers =>
            prevPassengers.map(p => p.id === updatedPassenger.id ? updatedPassenger : p)
          );
          setEditingPassenger(undefined);
        }}
        onPassengerDelete={(id) => {
          setPassengers(prevPassengers => prevPassengers.filter(p => p.id !== id));
          setSelectedPassengerIds(prevIds => prevIds.filter(id => id !== id));
        }}
        contactName={contactName}
        contactEmail={contactEmail}
        contactPhone={contactPhone}
        countryCode={countryCode}
        onContactNameChange={setContactName}
        onContactEmailChange={setContactEmail}
        onContactPhoneChange={setContactPhone}
        onCountryCodeChange={setCountryCode}
      />
    </div>
  );
}