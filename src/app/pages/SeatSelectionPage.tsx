import { useState } from 'react';
import { Plane, ArrowLeft, ChevronDown, Tag, X, User } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router';

interface Seat {
  id: string;
  row: number;
  column: string;
  status: 'available' | 'selected' | 'occupied' | 'emergency' | 'premium' | 'extra-legroom';
  price?: number;
}

interface Flight {
  id: string;
  route: string;
  date: string;
  duration: string;
  airline: string;
  flightNumber: string;
}

interface Passenger {
  id: string;
  name: string;
}

const SEAT_COLUMNS = ['A', 'B', 'C', '', 'D', 'E', 'F']; // Empty string represents aisle
const ROWS = 18;

export default function SeatSelectionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const flightIdsParam = searchParams.get('flightIds');
  const flightIds = flightIdsParam ? flightIdsParam.split(',') : ['1'];

  // Passenger seat selection: passengerSeats[passengerId][flightId] = seatKey
  const [passengerSeats, setPassengerSeats] = useState<Record<string, Record<string, string>>>({});
  const [currentStep] = useState(2);
  const [activeFlightIndex, setActiveFlightIndex] = useState(0);
  const [selectedPassengerId, setSelectedPassengerId] = useState('1');

  // Mock passenger data
  const passengers: Passenger[] = [
    { id: '1', name: 'KEITH LIM' },
    { id: '2', name: 'KEITH ENG KIAT LIM' },
  ];

  // Mock flight data
  const flights: Flight[] = flightIds.map((id, index) => {
    const routes = [
      { route: 'SIN → BKK', date: 'Tue, 18 Jun', duration: '2h 45m', airline: 'Singapore Airlines', flightNumber: 'SQ 123' },
      { route: 'BKK → TPE', date: 'Wed, 19 Jun', duration: '3h 30m', airline: 'Thai Airways', flightNumber: 'TG 456' },
      { route: 'TPE → ICN', date: 'Thu, 20 Jun', duration: '2h 50m', airline: 'Eva Air', flightNumber: 'BR 789' },
    ];
    const routeIndex = parseInt(id) % routes.length;
    return { id, ...routes[routeIndex] };
  });

  // Generate seat map
  const generateSeatMap = (flightId: string): Seat[] => {
    const seats: Seat[] = [];
    for (let row = 1; row <= ROWS; row++) {
      for (const column of SEAT_COLUMNS) {
        if (column === '') continue; // Skip aisle
        
        let status: Seat['status'] = 'available';
        let price: number | undefined;
        
        // Set different seat types
        if (row === 1) {
          status = 'premium';
          price = 50;
        } else if (row === 12) {
          status = 'emergency';
          price = 25;
        } else if (row <= 3) {
          status = 'extra-legroom';
          price = 15;
        } else if (Math.random() > 0.7) {
          status = 'occupied';
        }
        
        seats.push({
          id: `${flightId}-${row}${column}`,
          row,
          column,
          status,
          price,
        });
      }
    }
    return seats;
  };

  const [seatMaps] = useState<Record<string, Seat[]>>(
    Object.fromEntries(flights.map(f => [f.id, generateSeatMap(f.id)]))
  );

  const handleSeatClick = (flightId: string, seat: Seat) => {
    if (seat.status === 'occupied') return;
    
    const seatKey = `${flightId}-${seat.row}${seat.column}`;
    const currentSeatForFlight = passengerSeats[selectedPassengerId]?.[flightId];
    
    if (currentSeatForFlight === seatKey) {
      // Deselect
      const newSeats = { ...passengerSeats };
      delete newSeats[selectedPassengerId]?.[flightId];
      setPassengerSeats(newSeats);
    } else {
      // Select new seat for this flight
      setPassengerSeats({
        ...passengerSeats,
        [selectedPassengerId]: {
          ...passengerSeats[selectedPassengerId],
          [flightId]: seatKey,
        },
      });
    }
  };

  const getSeatStatus = (flightId: string, seat: Seat): Seat['status'] => {
    const seatKey = `${flightId}-${seat.row}${seat.column}`;
    if (passengerSeats[selectedPassengerId]?.[flightId] === seatKey) return 'selected';
    return seat.status;
  };

  const getSeatColor = (status: Seat['status']) => {
    switch (status) {
      case 'available':
        return 'bg-[#171A21] border-[#262B36] hover:border-[#22C55E] text-[#F3F4F6]';
      case 'selected':
        return 'bg-[#22C55E] border-[#22C55E] text-[#0F1115]';
      case 'occupied':
        return 'bg-[#262B36] border-[#262B36] text-[#6B7280] cursor-not-allowed';
      case 'emergency':
        return 'bg-[#F59E0B]/10 border-[#F59E0B] text-[#F59E0B]';
      case 'premium':
        return 'bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#8B5CF6]';
      case 'extra-legroom':
        return 'bg-[#6366F1]/10 border-[#6366F1] text-[#6366F1]';
    }
  };

  const totalSeatPrice = Object.entries(passengerSeats[selectedPassengerId] || {}).reduce((sum, [flightId, seatKey]) => {
    const seat = seatMaps[flightId]?.find(s => `${flightId}-${s.row}${s.column}` === seatKey);
    return sum + (seat?.price || 0);
  }, 0);

  const basePrice = 2288.60;
  const totalPrice = basePrice + totalSeatPrice;

  const getFlightColor = (index: number) => {
    const colors = ['#22C55E', '#6366F1', '#F59E0B', '#EF4444', '#8B5CF6'];
    return colors[index % colors.length];
  };

  const getFlightLabel = (index: number) => {
    const totalFlights = flights.length;
    if (totalFlights === 1) return 'Outbound';
    if (totalFlights === 2) {
      return index === 0 ? 'Outbound' : 'Inbound';
    }
    if (index === 0) return 'Outbound';
    if (index === totalFlights - 1) return 'Inbound';
    return `Stop ${index}`;
  };

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <header className="border-b border-[#262B36]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
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

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-[#22C55E] text-[#0F1115]">
                ✓
              </div>
              <p className="text-xs mt-2 text-center text-[#9CA3AF]">
                Fill in your info
              </p>
            </div>

            {/* Connector Line 1 */}
            <div className="flex-1 h-0.5 -mt-6 bg-[#22C55E]"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-[#22C55E] text-[#0F1115]">
                2
              </div>
              <p className="text-xs mt-2 text-center text-[#22C55E] font-medium">
                Choose your seat
              </p>
            </div>

            {/* Connector Line 2 */}
            <div className="flex-1 h-0.5 -mt-6 bg-[#262B36]"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-[#171A21] border border-[#262B36] text-[#9CA3AF]">
                3
              </div>
              <p className="text-xs mt-2 text-center text-[#9CA3AF]">
                Personalise your trip
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#F3F4F6] mb-6">Seat selection</h1>

            {/* Seat Legend */}
            <div className="flex items-center gap-6 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-[#262B36] bg-[#171A21] rounded"></div>
                <span className="text-[#9CA3AF] text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-[#22C55E] bg-[#22C55E] rounded"></div>
                <span className="text-[#9CA3AF] text-sm">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-[#262B36] bg-[#262B36] rounded"></div>
                <span className="text-[#9CA3AF] text-sm">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-[#F59E0B] bg-[#F59E0B]/10 rounded"></div>
                <span className="text-[#9CA3AF] text-sm">Emergency exit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-[#8B5CF6] bg-[#8B5CF6]/10 rounded"></div>
                <span className="text-[#9CA3AF] text-sm">Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-[#6366F1] bg-[#6366F1]/10 rounded"></div>
                <span className="text-[#9CA3AF] text-sm">Extra legroom</span>
              </div>
            </div>

            {/* Flight Tabs */}
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden">
              {/* Tab Headers */}
              <div className="flex border-b border-[#262B36] bg-[#0F1115]">
                {flights.map((flight, index) => {
                  const flightColor = getFlightColor(index);
                  const isActive = activeFlightIndex === index;
                  const selectedSeat = passengerSeats[selectedPassengerId]?.[flight.id];
                  const selectedSeatData = seatMaps[flight.id]?.find(
                    s => `${flight.id}-${s.row}${s.column}` === selectedSeat
                  );

                  return (
                    <button
                      key={flight.id}
                      onClick={() => setActiveFlightIndex(index)}
                      className={`flex-1 px-6 py-4 text-left transition-all relative ${
                        isActive
                          ? 'bg-[#171A21] text-[#F3F4F6]'
                          : 'bg-[#0F1115] text-[#9CA3AF] hover:text-[#F3F4F6]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Plane className="w-4 h-4" style={{ color: flightColor }} />
                        <span className="font-semibold">{flight.route.replace(' → ', ' - ')}</span>
                      </div>
                      {selectedSeatData ? (
                        <p className="text-xs text-[#22C55E]">
                          {selectedSeatData.row}{selectedSeatData.column} selected
                        </p>
                      ) : (
                        <p className="text-xs text-[#9CA3AF]">--</p>
                      )}
                      {/* Active indicator */}
                      {isActive && (
                        <div
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: flightColor }}
                        ></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Flight Seat Map */}
              {flights.map((flight, flightIndex) => {
                if (flightIndex !== activeFlightIndex) return null;

                const flightColor = getFlightColor(flightIndex);
                const flightLabel = getFlightLabel(flightIndex);
                const selectedSeat = passengerSeats[selectedPassengerId]?.[flight.id];
                const selectedSeatData = seatMaps[flight.id]?.find(
                  s => `${flight.id}-${s.row}${s.column}` === selectedSeat
                );

                return (
                  <div key={flight.id} className="p-6">
                    {/* Flight Info */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: `${flightColor}1A`,
                            color: flightColor 
                          }}
                        >
                          {flightLabel}
                        </span>
                        <h3 className="text-xl font-bold text-[#F3F4F6]">{flight.route}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[#9CA3AF] text-sm">{flight.date} · {flight.duration}</p>
                        <p className="text-[#F3F4F6] text-sm font-medium">{flight.airline} {flight.flightNumber}</p>
                      </div>
                    </div>

                    {/* Passenger Selector */}
                    <div className="mb-6 space-y-3">
                      {passengers.map((passenger, passengerIndex) => {
                        const isSelected = selectedPassengerId === passenger.id;
                        const passengerSeat = passengerSeats[passenger.id]?.[flight.id];
                        const seatData = passengerSeat 
                          ? seatMaps[flight.id]?.find(s => `${flight.id}-${s.row}${s.column}` === passengerSeat)
                          : null;

                        return (
                          <button
                            key={passenger.id}
                            onClick={() => setSelectedPassengerId(passenger.id)}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              isSelected
                                ? 'border-[#22C55E] bg-[#22C55E]/5'
                                : 'border-[#262B36] bg-[#0F1115] hover:border-[#374151]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded border flex items-center justify-center font-semibold text-sm ${
                                isSelected
                                  ? 'border-[#22C55E] text-[#22C55E]'
                                  : 'border-[#9CA3AF] text-[#9CA3AF]'
                              }`}>
                                {passengerIndex + 1}
                              </div>
                              <div className="flex-1">
                                <p className={`font-semibold ${
                                  isSelected ? 'text-[#F3F4F6]' : 'text-[#9CA3AF]'
                                }`}>
                                  {passenger.name}
                                </p>
                                {seatData ? (
                                  <p className="text-sm text-[#22C55E] mt-0.5">
                                    {seatData.row}{seatData.column}
                                    {seatData.price && ` · S$ ${seatData.price.toFixed(2)}`}
                                  </p>
                                ) : (
                                  <p className="text-sm text-[#9CA3AF] mt-0.5">
                                    Seat not selected
                                  </p>
                                )}
                              </div>
                              {seatData && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newSeats = { ...passengerSeats };
                                    delete newSeats[passenger.id]?.[flight.id];
                                    setPassengerSeats(newSeats);
                                  }}
                                  className="w-6 h-6 rounded-full bg-[#262B36] hover:bg-[#374151] flex items-center justify-center transition-colors"
                                >
                                  <X className="w-3 h-3 text-[#9CA3AF]" />
                                </button>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Seat Info */}
                    {selectedSeatData && (
                      <div className="mb-4 p-3 bg-[#22C55E]/10 border border-[#22C55E] rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-[#22C55E] text-sm font-medium">
                            Selected: Seat {selectedSeatData.row}{selectedSeatData.column}
                            {selectedSeatData.price && ` (+S$ ${selectedSeatData.price.toFixed(2)})`}
                          </p>
                          <button
                            onClick={() => {
                              const newSeats = { ...passengerSeats };
                              delete newSeats[selectedPassengerId]?.[flight.id];
                              setPassengerSeats(newSeats);
                            }}
                            className="text-[#22C55E] hover:text-[#16A34A] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Seat Map */}
                    <div className="bg-[#0F1115] rounded-lg p-6 overflow-x-auto">
                      {/* Column Headers */}
                      <div className="flex justify-center mb-4">
                        <div className="flex gap-2">
                          {SEAT_COLUMNS.map((col, idx) => (
                            <div
                              key={idx}
                              className={`w-10 h-6 flex items-center justify-center text-[#9CA3AF] text-sm font-medium ${
                                col === '' ? 'w-8' : ''
                              }`}
                            >
                              {col}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Seats */}
                      <div className="space-y-2">
                        {Array.from({ length: ROWS }, (_, rowIndex) => {
                          const row = rowIndex + 1;
                          return (
                            <div key={row} className="flex items-center justify-center gap-2">
                              {/* Row Number Left */}
                              <div className="w-8 text-center text-[#9CA3AF] text-sm font-medium">
                                {row}
                              </div>

                              {/* Seats */}
                              <div className="flex gap-2">
                                {SEAT_COLUMNS.map((column, colIndex) => {
                                  if (column === '') {
                                    return <div key={colIndex} className="w-8"></div>;
                                  }

                                  const seat = seatMaps[flight.id]?.find(
                                    s => s.row === row && s.column === column
                                  );

                                  if (!seat) return null;

                                  const status = getSeatStatus(flight.id, seat);
                                  const colorClass = getSeatColor(status);

                                  return (
                                    <button
                                      key={seat.id}
                                      onClick={() => handleSeatClick(flight.id, seat)}
                                      disabled={seat.status === 'occupied'}
                                      className={`w-10 h-10 border rounded text-xs font-medium transition-all ${colorClass}`}
                                    >
                                      {column}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Row Number Right */}
                              <div className="w-8 text-center text-[#9CA3AF] text-sm font-medium">
                                {row}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-[#171A21] border border-[#262B36] text-[#F3F4F6] font-medium py-4 rounded-lg hover:border-[#374151] transition-all"
              >
                Back
              </button>
              <button
                onClick={() => navigate(`/trip-personalize?flightIds=${flightIds.join(',')}`)}
                className="flex-1 bg-[#22C55E] text-[#0F1115] font-bold py-4 rounded-lg hover:bg-[#16A34A] transition-all"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Price Details Sidebar */}
          <div className="w-96 flex-shrink-0">
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-[#F3F4F6] mb-6">Price details</h3>

              {/* Tickets */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#F3F4F6]">Tickets (2 adults)</span>
                  <span className="text-[#F3F4F6] font-semibold">S$ 2,288.60</span>
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
                </div>
              </div>

              {/* Seat Selection */}
              {totalSeatPrice > 0 && (
                <div className="mb-6 pb-6 border-b border-[#262B36]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#F3F4F6]">Seat selection</span>
                    <span className="text-[#F3F4F6] font-semibold">S$ {totalSeatPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#F3F4F6]">Total</span>
                  <span className="text-2xl font-bold text-[#22C55E]">S$ {totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-[#F59E0B] text-xs mt-2 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Trip Coins + 40 pts
                </p>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => navigate(`/trip-personalize?flightIds=${flightIds.join(',')}`)}
                className="w-full bg-[#22C55E] text-[#0F1115] font-bold py-4 rounded-lg hover:bg-[#16A34A] transition-all mb-3"
              >
                Continue
              </button>

              {/* Skip Button */}
              <button
                onClick={() => navigate(`/trip-personalize?flightIds=${flightIds.join(',')}`)}
                className="w-full bg-[#0F1115] border border-[#262B36] text-[#9CA3AF] font-medium py-3 rounded-lg hover:border-[#374151] transition-all"
              >
                Skip seat selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}