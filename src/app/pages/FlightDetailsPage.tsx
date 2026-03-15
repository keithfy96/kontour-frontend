import { useState } from 'react';
import { Plane, ArrowLeft, Clock, Briefcase, Package, ShoppingBag, CheckCircle2, XCircle, Calendar, Users, ChevronDown, ChevronUp, Info, Plus, Tag, X, Edit2, ChevronRight, HelpCircle, Mail, Phone, User } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router';
import { PassengerModal } from '../components/PassengerModal';

interface BaggageOption {
  id: string;
  weight: string;
  price: number;
  description: string;
}

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
  flightNumber: string;
  route: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureAirport: string;
  arrivalAirport: string;
  terminal: string;
  aircraft: string;
  basePrice: number;
  class: string;
  passengers: number;
}

const checkedBaggageOptions: BaggageOption[] = [
  { id: '1', weight: '< 20 kg', price: 24.60, description: 'Size limit per bag: 119*119*81CM' },
  { id: '2', weight: '< 30 kg', price: 36.90, description: 'Size limit per bag: 119*119*81CM' },
  { id: '3', weight: '40 kg total (2 pieces)', price: 49.10, description: 'Weight limit per bag: 25 kg' },
  { id: '4', weight: '50 kg total (2 pieces)', price: 61.20, description: 'Weight limit per bag: 25 kg' },
];

export default function FlightDetailsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Parse flight IDs from URL - ensure unique IDs
  const flightIdsParam = searchParams.get('flightIds');
  const initialFlightIds = flightIdsParam 
    ? Array.from(new Set(flightIdsParam.split(',').filter(id => id.trim())))
    : ['1'];
  
  const [flightIds, setFlightIds] = useState<string[]>(initialFlightIds);
  
  // Track next unique ID
  const [nextUniqueId, setNextUniqueId] = useState<number>(() => {
    const ids = initialFlightIds.map(id => parseInt(id) || 1);
    return Math.max(...ids, 1) + 1;
  });
  
  // Baggage state - one per flight
  const [selectedBaggage, setSelectedBaggage] = useState<Record<string, string | null>>({});
  const [showBaggageOptions, setShowBaggageOptions] = useState<Record<string, boolean>>({});
  
  const [expandedSections, setExpandedSections] = useState({
    cancellations: false,
    changes: false,
  });

  // Progress step state
  const [currentStep, setCurrentStep] = useState(1);

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
    },
    {
      id: '2',
      firstName: 'SARAH',
      lastName: 'CHEN',
      gender: 'Female',
      dateOfBirth: '1992-08-22',
      passportNumber: 'L8463921',
      passportExpiry: '2029-06-15',
      nationality: 'Singapore',
    }
  ]);
  const [selectedPassengerIds, setSelectedPassengerIds] = useState<string[]>(['1', '2']);
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState<PassengerData | undefined>();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+65');

  // Mock flight data generator
  const getMockFlight = (id: string): Flight => {
    const flightData: Record<string, Flight> = {
      '1': {
        id: '1',
        airline: 'United Airlines',
        flightNumber: 'UA 123',
        route: 'SFO → JFK',
        departureDate: 'Wed, Mar 4, 2026',
        departureTime: '09:35',
        arrivalTime: '13:55',
        duration: '5h 20m',
        departureAirport: 'San Francisco Int\'l (SFO)',
        arrivalAirport: 'John F. Kennedy Int\'l (JFK)',
        terminal: 'T2 → T4',
        aircraft: 'Boeing 737-900',
        basePrice: 299,
        class: 'Economy',
        passengers: 1,
      },
      '2': {
        id: '2',
        airline: 'United Airlines',
        flightNumber: 'UA 456',
        route: 'JFK → SFO',
        departureDate: 'Mon, Mar 16, 2026',
        departureTime: '14:25',
        arrivalTime: '17:45',
        duration: '6h 20m',
        departureAirport: 'John F. Kennedy Int\'l (JFK)',
        arrivalAirport: 'San Francisco Int\'l (SFO)',
        terminal: 'T4 → T2',
        aircraft: 'Boeing 737-800',
        basePrice: 329,
        class: 'Economy',
        passengers: 1,
      },
      '3': {
        id: '3',
        airline: 'Delta Airlines',
        flightNumber: 'DL 789',
        route: 'JFK → LAX',
        departureDate: 'Wed, Mar 18, 2026',
        departureTime: '08:15',
        arrivalTime: '11:30',
        duration: '6h 15m',
        departureAirport: 'John F. Kennedy Int\'l (JFK)',
        arrivalAirport: 'Los Angeles Int\'l (LAX)',
        terminal: 'T3 → T2',
        aircraft: 'Airbus A321',
        basePrice: 279,
        class: 'Economy',
        passengers: 1,
      },
    };
    
    // Cycle through available flight data
    const numId = parseInt(id) || 1;
    const dataId = String(((numId - 1) % 3) + 1);
    const baseFlight = flightData[dataId];
    
    // Return flight with unique ID
    return { ...baseFlight, id };
  };

  const flights = flightIds.map(id => getMockFlight(id));
  const firstFlight = flights[0] || getMockFlight('1');

  const toggleSection = (section: 'cancellations' | 'changes') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getBaggagePrice = (flightId: string) => {
    if (!selectedBaggage[flightId]) return 0;
    const option = checkedBaggageOptions.find(o => o.id === selectedBaggage[flightId]!);
    return option?.price || 0;
  };

  const totalBaggagePrice = flightIds.reduce((sum, id) => sum + getBaggagePrice(id), 0);
  const tripFlexPrice = 43.80;
  const basePrice = flights.reduce((sum, flight) => sum + flight.basePrice, 0);
  const totalPrice = basePrice + totalBaggagePrice + tripFlexPrice;

  const handleAddFlight = () => {
    // Add a new flight with a unique ID
    const newFlightId = String(nextUniqueId);
    const newFlightIds = [...flightIds, newFlightId];
    setFlightIds(newFlightIds);
    setNextUniqueId(nextUniqueId + 1);
    
    // Update URL
    const newParams = new URLSearchParams(searchParams);
    newParams.set('flightIds', newFlightIds.join(','));
    setSearchParams(newParams);
  };

  const handleRemoveFlight = (flightId: string) => {
    if (flightIds.length === 1) return; // Can't remove the last flight
    const newFlightIds = flightIds.filter(id => id !== flightId);
    setFlightIds(newFlightIds);
    
    // Update URL
    const newParams = new URLSearchParams(searchParams);
    newParams.set('flightIds', newFlightIds.join(','));
    setSearchParams(newParams);
    
    // Clean up baggage state
    const newSelectedBaggage = { ...selectedBaggage };
    delete newSelectedBaggage[flightId];
    setSelectedBaggage(newSelectedBaggage);
    
    const newShowBaggageOptions = { ...showBaggageOptions };
    delete newShowBaggageOptions[flightId];
    setShowBaggageOptions(newShowBaggageOptions);
  };

  const getFlightLabel = (index: number) => {
    const totalFlights = flightIds.length;
    
    if (totalFlights === 1) return 'Outbound';
    if (totalFlights === 2) {
      return index === 0 ? 'Outbound' : 'Inbound';
    }
    
    // For 3+ flights
    if (index === 0) return 'Outbound';
    if (index === totalFlights - 1) return 'Inbound';
    return `Stop ${index}`;
  };

  const getFlightColor = (index: number) => {
    const colors = ['#22C55E', '#6366F1', '#F59E0B', '#EF4444', '#8B5CF6'];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <header className="border-b border-[#262B36]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/flights" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
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

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <button
                onClick={() => setCurrentStep(1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep === 1
                    ? 'bg-[#22C55E] text-[#0F1115]'
                    : currentStep > 1
                    ? 'bg-[#22C55E] text-[#0F1115]'
                    : 'bg-[#171A21] border border-[#262B36] text-[#9CA3AF]'
                }`}
              >
                {currentStep > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
              </button>
              <p className={`text-xs mt-2 text-center ${currentStep === 1 ? 'text-[#22C55E] font-medium' : 'text-[#9CA3AF]'}`}>
                Fill in your info
              </p>
            </div>

            {/* Connector Line 1 */}
            <div className={`flex-1 h-0.5 -mt-6 transition-all ${currentStep > 1 ? 'bg-[#22C55E]' : 'bg-[#262B36]'}`}></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <button
                onClick={() => setCurrentStep(2)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep === 2
                    ? 'bg-[#22C55E] text-[#0F1115]'
                    : currentStep > 2
                    ? 'bg-[#22C55E] text-[#0F1115]'
                    : 'bg-[#171A21] border border-[#262B36] text-[#9CA3AF]'
                }`}
              >
                {currentStep > 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
              </button>
              <p className={`text-xs mt-2 text-center ${currentStep === 2 ? 'text-[#22C55E] font-medium' : 'text-[#9CA3AF]'}`}>
                Choose your seat
              </p>
            </div>

            {/* Connector Line 2 */}
            <div className={`flex-1 h-0.5 -mt-6 transition-all ${currentStep > 2 ? 'bg-[#22C55E]' : 'bg-[#262B36]'}`}></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <button
                onClick={() => setCurrentStep(3)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep === 3
                    ? 'bg-[#22C55E] text-[#0F1115]'
                    : 'bg-[#171A21] border border-[#262B36] text-[#9CA3AF]'
                }`}
              >
                3
              </button>
              <p className={`text-xs mt-2 text-center ${currentStep === 3 ? 'text-[#22C55E] font-medium' : 'text-[#9CA3AF]'}`}>
                Personalise your trip
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Flight Summary */}
            {flights.map((flight, index) => {
              const flightColor = getFlightColor(index);
              const flightLabel = getFlightLabel(index);
              
              return (
                <div key={flight.id} className="bg-[#171A21] border border-[#262B36] rounded-xl p-6 relative">
                  {/* Remove button - only show if more than 1 flight */}
                  {flightIds.length > 1 && (
                    <button
                      onClick={() => handleRemoveFlight(flight.id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-[#0F1115] border border-[#262B36] rounded-lg flex items-center justify-center hover:border-[#EF4444] hover:bg-[#EF4444]/10 transition-all group"
                      title="Remove flight"
                    >
                      <X className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#EF4444] transition-colors" />
                    </button>
                  )}
                  
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: `${flightColor}1A`,
                            color: flightColor 
                          }}
                        >
                          {flightLabel}
                        </span>
                        <h1 className="text-2xl font-bold text-[#F3F4F6]">{flight.route}</h1>
                      </div>
                      <p className="text-[#9CA3AF]">{flight.departureDate} · {flight.class}</p>
                    </div>
                    <div className="text-right mr-12">
                      <p className="text-[#9CA3AF] text-sm mb-1">{flight.airline}</p>
                      <p className="text-[#F3F4F6] font-semibold">{flight.flightNumber}</p>
                    </div>
                  </div>

                  {/* Flight Timeline */}
                  <div className="flex items-center gap-6">
                    <div className="text-center flex-shrink-0">
                      <p className="text-3xl font-bold text-[#F3F4F6]">{flight.departureTime}</p>
                      <p className="text-[#9CA3AF] text-sm mt-1">{flight.departureAirport}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                      <p className="text-[#9CA3AF] text-xs mb-2">{flight.duration} · Direct</p>
                      <div className="w-full h-0.5 bg-[#262B36] relative">
                        <div 
                          className="absolute inset-0"
                          style={{ backgroundColor: flightColor }}
                        ></div>
                        <Plane 
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rotate-90"
                          style={{ color: flightColor }}
                        />
                      </div>
                      <p className="text-[#9CA3AF] text-xs mt-2">{flight.aircraft}</p>
                    </div>

                    <div className="text-center flex-shrink-0">
                      <p className="text-3xl font-bold text-[#F3F4F6]">{flight.arrivalTime}</p>
                      <p className="text-[#9CA3AF] text-sm mt-1">{flight.arrivalAirport}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#262B36] flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#9CA3AF]" />
                      <span className="text-[#9CA3AF]">Terminal: {flight.terminal}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#9CA3AF]" />
                      <span className="text-[#9CA3AF]">{flight.passengers} adult</span>
                    </div>
                    <div className="flex-1"></div>
                    <Link
                      to={`/flights?changeFlight=${flight.id}`}
                      className="px-4 py-2 bg-[#0F1115] border border-[#262B36] text-[#22C55E] rounded-lg hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all flex items-center gap-2 text-sm font-medium"
                    >
                      <Plane className="w-4 h-4" />
                      <span>Change Flight</span>
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Add Another Flight Button */}
            <button
              onClick={handleAddFlight}
              className="w-full bg-[#171A21] border-2 border-dashed border-[#262B36] text-[#9CA3AF] font-medium py-6 rounded-xl hover:border-[#22C55E] hover:bg-[#22C55E]/5 hover:text-[#22C55E] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Another Flight</span>
            </button>

            {/* Who's Travelling Section */}
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#F3F4F6]">Who's travelling?</h3>
              </div>

              {/* Passengers List with Checkboxes */}
              <div className="space-y-3">
                {passengers.map((passenger) => {
                  const isSelected = selectedPassengerIds.includes(passenger.id);
                  const hasAllInfo = passenger.firstName && passenger.lastName && passenger.passportNumber;

                  return (
                    <div
                      key={passenger.id}
                      className={`bg-[#0F1115] border rounded-lg transition-all ${
                        isSelected
                          ? 'border-[#22C55E] bg-[#22C55E]/5'
                          : 'border-[#262B36] hover:border-[#374151]'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                if (isSelected) {
                                  setSelectedPassengerIds(selectedPassengerIds.filter(id => id !== passenger.id));
                                } else {
                                  setSelectedPassengerIds([...selectedPassengerIds, passenger.id]);
                                }
                              }}
                              className="w-5 h-5 mt-0.5 rounded border-[#262B36] bg-[#171A21] text-[#22C55E] focus:ring-[#22C55E] focus:ring-offset-0"
                            />
                            <div className="flex-1">
                              {hasAllInfo ? (
                                <>
                                  <p className="text-[#F3F4F6] font-semibold text-base">
                                    {passenger.firstName} {passenger.lastName}
                                  </p>
                                  <p className="text-[#9CA3AF] text-sm mt-0.5">
                                    Adult / Passport {passenger.passportNumber} / {passenger.gender} / {passenger.nationality}
                                  </p>
                                  
                                  {/* Add frequent flyer details */}
                                  <button className="text-[#22C55E] text-sm mt-2 flex items-center gap-1 hover:underline">
                                    <span>Add frequent flyer details</span>
                                    <ChevronRight className="w-4 h-4" />
                                    <Plane className="w-4 h-4" />
                                    <span className="ml-1">456 miles</span>
                                  </button>
                                </>
                              ) : (
                                <>
                                  <p className="text-[#F3F4F6] font-semibold text-base">New Passenger</p>
                                  <div className="mt-1">
                                    <span className="text-[#EF4444] text-sm">
                                      Please provide the passenger's ID information{' '}
                                    </span>
                                    <button
                                      onClick={() => {
                                        setEditingPassenger(passenger);
                                        setShowPassengerModal(true);
                                      }}
                                      className="text-[#EF4444] text-sm underline hover:text-[#F87171] transition-colors"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          {hasAllInfo && (
                            <button
                              onClick={() => {
                                setEditingPassenger(passenger);
                                setShowPassengerModal(true);
                              }}
                              className="w-8 h-8 bg-[#171A21] border border-[#262B36] rounded-lg flex items-center justify-center hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all flex-shrink-0"
                            >
                              <Edit2 className="w-4 h-4 text-[#9CA3AF]" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Add Passengers Button */}
                <button
                  onClick={() => setShowPassengerModal(true)}
                  className="w-full bg-[#0F1115] border-2 border-dashed border-[#262B36] rounded-lg py-3 text-[#22C55E] hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add passengers</span>
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Contact Details Display */}
              {(contactName || contactEmail || contactPhone) && (
                <div className="mt-4 pt-4 border-t border-[#262B36]">
                  <h4 className="text-[#F3F4F6] font-semibold text-sm mb-3">Contact details</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    {contactName && (
                      <div>
                        <p className="text-[#9CA3AF] text-xs mb-1">Name</p>
                        <p className="text-[#F3F4F6]">{contactName}</p>
                      </div>
                    )}
                    {contactEmail && (
                      <div>
                        <p className="text-[#9CA3AF] text-xs mb-1">Email</p>
                        <p className="text-[#F3F4F6]">{contactEmail}</p>
                      </div>
                    )}
                    {contactPhone && (
                      <div>
                        <p className="text-[#9CA3AF] text-xs mb-1">Phone</p>
                        <p className="text-[#F3F4F6]">{countryCode} {contactPhone}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Details Section - Editable */}
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#F3F4F6]">Contact details</h3>
                <p className="text-[#9CA3AF] text-sm mt-1">Booking confirmation will be sent to this email</p>
              </div>

              {/* Contact Form */}
              <div className="flex gap-3">
                {/* Contact Name Field */}
                <div className="flex-1">
                  <label className="text-[#9CA3AF] text-sm mb-2 block">
                    Contact name
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-all"
                  />
                </div>

                {/* Email Field */}
                <div className="flex-1">
                  <label className="text-[#9CA3AF] text-sm mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-all"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="flex-1">
                  <label className="text-[#9CA3AF] text-sm mb-2 block">
                    Mobile phone
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-[#0F1115] border border-[#262B36] rounded-lg px-3 py-3 text-[#F3F4F6] focus:outline-none focus:border-[#22C55E] transition-all"
                    >
                      <option value="+65">+65</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+86">+86</option>
                      <option value="+91">+91</option>
                    </select>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="flex-1 bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Baggage Allowance */}
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#F3F4F6] mb-2">Baggage allowance</h2>
                <p className="text-[#22C55E] text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Save more by adding baggage allowance now. Bring along everything you need for your journey.
                  <a href="#" className="underline hover:text-[#16A34A]">Baggage policies</a>
                </p>
              </div>

              {/* Baggage Types */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Personal Item */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#6366F1]/10 border border-[#6366F1]/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="w-8 h-8 text-[#6366F1]" />
                  </div>
                  <h3 className="text-[#F3F4F6] font-medium mb-1">Personal item</h3>
                  <button className="text-[#22C55E] text-xs hover:underline">View Details</button>
                </div>

                {/* Carry-on Baggage */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-8 h-8 text-[#F59E0B]" />
                  </div>
                  <h3 className="text-[#F3F4F6] font-medium mb-1">Carry-on baggage</h3>
                  <p className="text-[#9CA3AF] text-xs">(56 × 36 × 23cm)</p>
                  <button className="text-[#22C55E] text-xs hover:underline mt-1">View Details</button>
                </div>

                {/* Checked Baggage */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-[#EF4444]" />
                  </div>
                  <h3 className="text-[#F3F4F6] font-medium mb-1">Checked baggage</h3>
                  <button className="text-[#22C55E] text-xs hover:underline">View Details</button>
                </div>
              </div>

              {/* Baggage Options */}
              {flights.map((flight, index) => {
                const flightColor = getFlightColor(index);
                const flightLabel = getFlightLabel(index);
                
                return (
                  <div key={flight.id} className={index < flights.length - 1 ? 'mb-6 pb-6 border-b border-[#262B36]' : 'mb-6'}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span 
                          className="px-2 py-1 rounded font-medium text-xs"
                          style={{ 
                            backgroundColor: `${flightColor}1A`,
                            color: flightColor 
                          }}
                        >
                          {flightLabel}
                        </span>
                        <span className="text-[#F3F4F6]">{flight.route.replace(' → ', ' → ')}</span>
                      </div>
                    </div>

                    <div className="bg-[#0F1115] border border-[#262B36] rounded-lg p-4">
                      {/* Loop through selected passengers */}
                      {passengers
                        .filter(p => selectedPassengerIds.includes(p.id))
                        .map((passenger, passengerIndex) => (
                          <div key={passenger.id} className={passengerIndex > 0 ? 'mt-6 pt-6 border-t border-[#262B36]' : ''}>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-10 h-10 bg-[#171A21] border border-[#262B36] rounded-lg flex items-center justify-center"
                                >
                                  <Plane 
                                    className="w-5 h-5"
                                    style={{ color: flightColor }}
                                  />
                                </div>
                                <div>
                                  <p className="text-[#F3F4F6] font-medium text-sm">
                                    PASSENGER {passengerIndex + 1}
                                  </p>
                                  <p className="text-[#9CA3AF] text-xs">1 piece, total 7 kg including carry-on baggage</p>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-[#9CA3AF] text-xs mb-2">Personal item</p>
                                <p className="text-[#F3F4F6] text-sm">1 piece, total 7 kg including carry-on baggage</p>
                              </div>
                              <div>
                                <p className="text-[#9CA3AF] text-xs mb-2">Carry-on baggage</p>
                                <p className="text-[#F3F4F6] text-sm">1 piece, total 7 kg including personal item</p>
                              </div>
                              <div>
                                <p className="text-[#9CA3AF] text-xs mb-2">Checked baggage</p>
                                {selectedBaggage[`${flight.id}-${passenger.id}`] ? (
                                  <div className="flex items-center justify-between">
                                    <p className="text-[#22C55E] text-sm font-medium">
                                      {checkedBaggageOptions.find(o => o.id === selectedBaggage[`${flight.id}-${passenger.id}`])?.weight}
                                    </p>
                                    <button
                                      onClick={() => setShowBaggageOptions({ ...showBaggageOptions, [`${flight.id}-${passenger.id}`]: true })}
                                      className="text-[#22C55E] text-xs hover:underline"
                                    >
                                      Change
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setShowBaggageOptions({ ...showBaggageOptions, [`${flight.id}-${passenger.id}`]: true })}
                                    className="px-4 py-1.5 bg-[#171A21] border border-[#262B36] text-[#22C55E] rounded-lg hover:border-[#22C55E] transition-all text-xs font-medium flex items-center gap-1"
                                  >
                                    <Plus className="w-3 h-3" />
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Baggage Options Dropdown */}
                            {showBaggageOptions[`${flight.id}-${passenger.id}`] && (
                              <div className="mt-4 pt-4 border-t border-[#262B36] space-y-2">
                                <div className="flex items-center justify-between mb-3">
                                  <p className="text-[#F3F4F6] text-sm font-medium">Select checked baggage</p>
                                  <button
                                    onClick={() => setShowBaggageOptions({ ...showBaggageOptions, [`${flight.id}-${passenger.id}`]: false })}
                                    className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
                                  >
                                    <ChevronUp className="w-4 h-4" />
                                  </button>
                                </div>
                                {checkedBaggageOptions.map((option) => (
                                  <button
                                    key={option.id}
                                    onClick={() => {
                                      setSelectedBaggage({ ...selectedBaggage, [`${flight.id}-${passenger.id}`]: option.id });
                                      setShowBaggageOptions({ ...showBaggageOptions, [`${flight.id}-${passenger.id}`]: false });
                                    }}
                                    className={`w-full bg-[#171A21] border rounded-lg p-3 text-left hover:border-[#374151] transition-all ${
                                      selectedBaggage[`${flight.id}-${passenger.id}`] === option.id
                                        ? 'border-[#22C55E] bg-[#22C55E]/5'
                                        : 'border-[#262B36]'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-[#F3F4F6] font-medium text-sm">{option.weight}</p>
                                        <p className="text-[#9CA3AF] text-xs mt-1">{option.description}</p>
                                      </div>
                                      <p className="text-[#22C55E] font-semibold">S$ {option.price.toFixed(2)}</p>
                                    </div>
                                  </button>
                                ))}
                                <button
                                  onClick={() => {
                                    setSelectedBaggage({ ...selectedBaggage, [`${flight.id}-${passenger.id}`]: null });
                                    setShowBaggageOptions({ ...showBaggageOptions, [`${flight.id}-${passenger.id}`]: false });
                                  }}
                                  className="w-full bg-[#171A21] border border-[#262B36] rounded-lg p-3 text-[#EF4444] text-sm hover:border-[#374151] transition-all"
                                >
                                  No extra baggage
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Cancellations & Changes */}
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-[#F3F4F6]">Cancellations & changes</h2>
                <span className="px-3 py-1 bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] rounded-md text-xs font-medium flex items-center gap-1">
                  TripFlex · EasyCancel & Change
                  <Info className="w-3 h-3" />
                </span>
              </div>

              {/* Cancellations */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('cancellations')}
                  className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg p-4 hover:border-[#374151] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-[#F3F4F6] font-semibold mb-1">Cancellations</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[#22C55E] text-sm">Free cancellations</span>
                          <button className="text-[#22C55E] text-sm underline hover:text-[#16A34A]">Details</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#9CA3AF]">Included</span>
                      <ChevronDown className={`w-5 h-5 text-[#9CA3AF] transition-transform ${expandedSections.cancellations ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>

                {expandedSections.cancellations && (
                  <div className="mt-2 p-4 bg-[#0F1115] border border-[#262B36] rounded-lg">
                    <p className="text-[#9CA3AF] text-sm">
                      Cancel your booking for free up to 24 hours before departure. Full refund will be processed within 7-10 business days.
                    </p>
                  </div>
                )}
              </div>

              {/* Changes */}
              <div>
                <button
                  onClick={() => toggleSection('changes')}
                  className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg p-4 hover:border-[#374151] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-[#22C55E]" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-[#F3F4F6] font-semibold mb-1">Changes</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[#22C55E] text-sm">Free changes</span>
                          <button className="text-[#22C55E] text-sm underline hover:text-[#16A34A]">Details</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#9CA3AF]">Included</span>
                      <ChevronDown className={`w-5 h-5 text-[#9CA3AF] transition-transform ${expandedSections.changes ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>

                {expandedSections.changes && (
                  <div className="mt-2 p-4 bg-[#0F1115] border border-[#262B36] rounded-lg">
                    <p className="text-[#9CA3AF] text-sm">
                      Change your flight dates or times for free up to 24 hours before departure. Fare difference may apply.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Stay Discounts */}
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-[#F3F4F6]">Stay discounts</h2>
                <Info className="w-4 h-4 text-[#9CA3AF]" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Promo 1 */}
                <div className="bg-[#0F1115] border border-[#262B36] rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#EAB308] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Tag className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-[#9CA3AF] text-xs mb-2">New user promo code (1st booking)</p>
                  <p className="text-[#22C55E] font-semibold">10% off (up to S$ 18.00)</p>
                </div>

                {/* Promo 2 */}
                <div className="bg-[#0F1115] border border-[#262B36] rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#EAB308] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Tag className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-[#9CA3AF] text-xs mb-2">New user promo code (2nd booking)</p>
                  <p className="text-[#22C55E] font-semibold">5% off (up to S$ 11.00)</p>
                </div>

                {/* Promo 3 */}
                <div className="bg-[#0F1115] border border-[#262B36] rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-lg flex items-center justify-center mx-auto mb-3 relative">
                    <Tag className="w-8 h-8 text-white" />
                    <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-[#EF4444] text-white text-xs rounded-full">Flyer Exclusive</span>
                  </div>
                  <p className="text-[#9CA3AF] text-xs mb-2">Flyer Exclusive offer</p>
                  <p className="text-[#22C55E] font-semibold">Up to 25% Off</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Details Sidebar */}
          <div className="w-96 flex-shrink-0">
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-[#F3F4F6] mb-6">Price details</h3>

              {/* Tickets */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <button className="flex items-center gap-2 text-[#F3F4F6] hover:text-[#22C55E] transition-colors">
                    <span>Tickets ({firstFlight.passengers} adult)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="text-[#F3F4F6] font-semibold">S$ {basePrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Baggage */}
              <div className="mb-6 pb-6 border-b border-[#262B36]">
                <h4 className="text-[#F3F4F6] font-medium mb-3">Baggage</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-[#9CA3AF]">
                    <span>Personal item</span>
                    <span className="text-[#22C55E]">Free</span>
                  </div>
                  <div className="flex items-center justify-between text-[#9CA3AF]">
                    <span>Carry-on baggage</span>
                    <span className="text-[#22C55E]">Free</span>
                  </div>
                  <div className="flex items-center justify-between text-[#9CA3AF]">
                    <span>Checked baggage</span>
                    {totalBaggagePrice > 0 ? (
                      <span className="text-[#F3F4F6]">S$ {totalBaggagePrice.toFixed(2)}</span>
                    ) : (
                      <span>Not included</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-6 pb-6 border-b border-[#262B36]">
                <h4 className="text-[#F3F4F6] font-medium mb-3">Services</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9CA3AF]">TripFlex · EasyCancel & Change</span>
                  <span className="text-[#F3F4F6]">S$ {tripFlexPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#F3F4F6]">Total</span>
                  <span className="text-2xl font-bold text-[#22C55E]">S$ {totalPrice.toFixed(2)}</span>
                </div>
                {totalBaggagePrice > 0 && (
                  <p className="text-[#F59E0B] text-xs mt-2 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Trip Coins + 40 pts
                  </p>
                )}
              </div>

              {/* Book Button */}
              <button 
                onClick={() => navigate(`/seat-selection?flightIds=${flightIds.join(',')}`)}
                className="w-full bg-[#22C55E] text-[#0F1115] font-bold py-4 rounded-lg hover:bg-[#16A34A] transition-all mb-3"
              >
                Book Now
              </button>

              {/* Add to Trip */}
              <button className="w-full bg-[#0F1115] border border-[#262B36] text-[#F3F4F6] font-medium py-3 rounded-lg hover:border-[#374151] transition-all mb-3">
                Add to Trip
              </button>

              {/* Add Another Flight */}
              <button
                onClick={handleAddFlight}
                className="w-full bg-[#0F1115] border border-[#262B36] text-[#22C55E] font-medium py-3 rounded-lg hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Flight</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
          setSelectedPassengerIds(prevIds => prevIds.filter(pid => pid !== id));
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