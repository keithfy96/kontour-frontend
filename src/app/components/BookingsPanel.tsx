import { useState } from 'react';
import { Plane, Train, Ship, UtensilsCrossed, Ticket, Clock, MapPin, Calendar, ExternalLink, CheckCircle2, AlertCircle, MoreHorizontal, X, Users, Play, Image as ImageIcon, Hotel, Search } from 'lucide-react';
import { Link } from 'react-router';

interface Booking {
  id: string;
  type: 'flight' | 'train' | 'ferry' | 'restaurant' | 'experience';
  title: string;
  status: 'confirmed' | 'pending' | 'needsBooking';
  date: string;
  time?: string;
  location?: string;
  details?: string;
  confirmationCode?: string;
  provider?: string;
}

const bookings: Booking[] = [
  // Flights
  {
    id: 'f1',
    type: 'flight',
    title: 'SFO → JFK',
    status: 'confirmed',
    date: 'Mar 15, 2026',
    time: '9:00 AM - 5:30 PM',
    location: 'San Francisco Int\'l → JFK Int\'l',
    details: 'United Airlines UA 123',
    confirmationCode: 'UA83KL',
    provider: 'United Airlines',
  },
  {
    id: 'f2',
    type: 'flight',
    title: 'JFK → SFO',
    status: 'needsBooking',
    date: 'Mar 22, 2026',
    time: '2:00 PM - 5:30 PM',
    location: 'JFK Int\'l → San Francisco Int\'l',
    details: 'Return flight',
  },
  
  // Trains
  {
    id: 't1',
    type: 'train',
    title: 'Amtrak California Zephyr',
    status: 'pending',
    date: 'Mar 17, 2026',
    time: '9:15 AM',
    location: 'Emeryville → Reno',
    details: 'Coach class, 2 passengers',
    provider: 'Amtrak',
  },
  
  // Ferries
  {
    id: 'fe1',
    type: 'ferry',
    title: 'Sausalito Ferry',
    status: 'needsBooking',
    date: 'Mar 16, 2026',
    time: '3:00 PM',
    location: 'Sausalito → San Francisco',
    details: 'Blue & Gold Fleet',
    provider: 'Blue & Gold Fleet',
  },
  
  // Restaurants
  {
    id: 'r1',
    type: 'restaurant',
    title: 'La Taqueria',
    status: 'confirmed',
    date: 'Mar 16, 2026',
    time: '6:30 PM',
    location: 'Mission District',
    details: 'Table for 2',
    confirmationCode: 'RES9234',
  },
  {
    id: 'r2',
    type: 'restaurant',
    title: 'Tartine Bakery',
    status: 'needsBooking',
    date: 'Mar 15, 2026',
    time: '7:00 PM',
    location: 'Mission District',
    details: 'Dinner reservation needed',
  },
  
  // Experiences
  {
    id: 'e1',
    type: 'experience',
    title: 'Alcatraz Island Tour',
    status: 'confirmed',
    date: 'Mar 15, 2026',
    time: '2:30 PM',
    location: 'Pier 33',
    details: 'Audio tour included, 2 tickets',
    confirmationCode: 'ALC4521',
    provider: 'Alcatraz Cruises',
  },
  {
    id: 'e2',
    type: 'experience',
    title: 'Golden Gate Bridge Bike Tour',
    status: 'pending',
    date: 'Mar 16, 2026',
    time: '10:30 AM',
    location: 'Fisherman\'s Wharf',
    details: 'Full day bike rental, 2 bikes',
    provider: 'Bay City Bike',
  },
  {
    id: 'e3',
    type: 'experience',
    title: 'Wine Tasting in Napa',
    status: 'needsBooking',
    date: 'Mar 18, 2026',
    time: '1:00 PM',
    location: 'Napa Valley',
    details: 'Private tour, 2 people',
  },
];

export function BookingsPanel() {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'needsBooking'>('all');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    details: '',
    guests: '',
  });

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setEditForm({
      title: booking.title,
      date: booking.date,
      time: booking.time || '',
      location: booking.location || '',
      details: booking.details || '',
      guests: '2',
    });
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
  };

  const handleSaveEdit = () => {
    // Save logic would go here
    console.log('Saving booking:', editForm);
    setEditingBooking(null);
  };

  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-4 h-4" />;
      case 'train':
        return <Train className="w-4 h-4" />;
      case 'ferry':
        return <Ship className="w-4 h-4" />;
      case 'restaurant':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'experience':
        return <Ticket className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getBookingColor = (type: string) => {
    switch (type) {
      case 'flight':
        return '#38BDF8'; // Sky blue
      case 'train':
        return '#A78BFA'; // Purple
      case 'ferry':
        return '#22D3EE'; // Cyan
      case 'restaurant':
        return '#F59E0B'; // Amber
      case 'experience':
        return '#EC4899'; // Pink
      default:
        return '#9CA3AF';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-md">
            <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
            <span className="text-[#22C55E] text-xs font-medium">Confirmed</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#FBBF24]/10 border border-[#FBBF24]/30 rounded-md">
            <Clock className="w-3 h-3 text-[#FBBF24]" />
            <span className="text-[#FBBF24] text-xs font-medium">Pending</span>
          </div>
        );
      case 'needsBooking':
        return (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-md">
            <AlertCircle className="w-3 h-3 text-[#EF4444]" />
            <span className="text-[#EF4444] text-xs font-medium">Needs Booking</span>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const counts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    needsBooking: bookings.filter(b => b.status === 'needsBooking').length,
  };

  return (
    <div className="h-full flex flex-col bg-[#0F1115]">
      {/* Header */}
      <div className="p-6 border-b border-[#262B36]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#F3F4F6]">Bookings</h2>
          <button className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filter === 'all'
                ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30'
                : 'bg-[#171A21] text-[#9CA3AF] border border-[#262B36] hover:bg-[#1F2430]'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filter === 'confirmed'
                ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30'
                : 'bg-[#171A21] text-[#9CA3AF] border border-[#262B36] hover:bg-[#1F2430]'
            }`}
          >
            Confirmed ({counts.confirmed})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filter === 'pending'
                ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30'
                : 'bg-[#171A21] text-[#9CA3AF] border border-[#262B36] hover:bg-[#1F2430]'
            }`}
          >
            Pending ({counts.pending})
          </button>
          <button
            onClick={() => setFilter('needsBooking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filter === 'needsBooking'
                ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30'
                : 'bg-[#171A21] text-[#9CA3AF] border border-[#262B36] hover:bg-[#1F2430]'
            }`}
          >
            Needs Booking ({counts.needsBooking})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            onClick={() => handleEditBooking(booking)}
            className="bg-[#171A21] border border-[#262B36] rounded-xl p-4 hover:border-[#374151] transition-all cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg border border-[#262B36] flex items-center justify-center"
                style={{ backgroundColor: `${getBookingColor(booking.type)}15` }}
              >
                <div style={{ color: getBookingColor(booking.type) }}>
                  {getBookingIcon(booking.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[#F3F4F6] font-medium text-sm">{booking.title}</h3>
                  {getStatusBadge(booking.status)}
                </div>
                {booking.provider && (
                  <p className="text-[#6B7280] text-xs mt-1">{booking.provider}</p>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <span className="text-[#9CA3AF]">{booking.date}</span>
                {booking.time && (
                  <>
                    <span className="text-[#6B7280]">•</span>
                    <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    <span className="text-[#9CA3AF]">{booking.time}</span>
                  </>
                )}
              </div>
              
              {booking.location && (
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  <span className="text-[#9CA3AF]">{booking.location}</span>
                </div>
              )}
              
              {booking.details && (
                <p className="text-[#6B7280] text-xs pl-5">{booking.details}</p>
              )}
              
              {booking.confirmationCode && (
                <div className="flex items-center gap-2 pt-2 border-t border-[#262B36]">
                  <span className="text-[#6B7280] text-xs">Confirmation:</span>
                  <code className="text-[#22C55E] text-xs font-mono bg-[#22C55E]/10 px-2 py-0.5 rounded">
                    {booking.confirmationCode}
                  </code>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#262B36]">
              {booking.status === 'needsBooking' ? (
                <button className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-3 py-2 text-xs font-medium transition-colors">
                  Book Now
                </button>
              ) : (
                <button className="flex-1 bg-[#0F1115] border border-[#262B36] hover:border-[#374151] hover:bg-[#171A21] text-[#F3F4F6] rounded-lg px-3 py-2 text-xs font-medium transition-all flex items-center justify-center gap-2">
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
              
              {booking.status === 'confirmed' && (
                <button className="px-3 py-2 bg-[#0F1115] border border-[#262B36] hover:border-[#374151] hover:bg-[#171A21] text-[#9CA3AF] rounded-lg text-xs font-medium transition-all">
                  Modify
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#171A21] border border-[#262B36] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-8 h-8 text-[#6B7280]" />
            </div>
            <p className="text-[#9CA3AF] text-sm">No bookings found</p>
            <p className="text-[#6B7280] text-xs mt-1">Try changing your filter</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingBooking && (() => {
        // Generate relevant media based on booking type
        const getRelevantMedia = () => {
          const type = editingBooking.type;
          const title = editingBooking.title.toLowerCase();
          
          if (type === 'flight') {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1565444007614-6b38c78224df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmRvdyUyMGZsaWdodHxlbnwxfHx8fDE3NzMyOTU0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Flight Experience' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1565444007614-6b38c78224df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmRvdyUyMGZsaWdodHxlbnwxfHx8fDE3NzMyOTU0MDR8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Airport Terminal' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1574444851660-e549a835d4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhaXJwb3J0JTIwZmxpZ2h0fGVufDF8fHx8MTc3MzI5NTQwNnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Check-in Process' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1565444007614-6b38c78224df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmRvdyUyMGZsaWdodHxlbnwxfHx8fDE3NzMyOTU0MDR8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'In-flight Service' },
            ];
          } else if (type === 'train') {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1764185755540-cc8981a306e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXRyYWslMjB0cmFpbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MzI5NTc2NHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Amtrak Experience' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1764185755540-cc8981a306e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXRyYWslMjB0cmFpbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MzI5NTc2NHww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Coach Seating' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1764185755540-cc8981a306e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXRyYWslMjB0cmFpbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MzI5NTc2NHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Scenic Route' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1764185755540-cc8981a306e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXRyYWslMjB0cmFpbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MzI5NTc2NHww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Dining Car' },
            ];
          } else if (type === 'ferry') {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1548257604-5d6881820b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBiYXl8ZW58MXx8fHwxNzczMTQyMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Ferry Ride Experience' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1548257604-5d6881820b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBiYXl8ZW58MXx8fHwxNzczMTQyMzQwfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Bay Views' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1657930070252-9bfe8414db7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVzYWxpdG8lMjBjYWxpZm9ybmlhJTIwd2F0ZXJmcm9udHxlbnwxfHx8fDE3NzMxNDIzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Sausalito Landing' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1548257604-5d6881820b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBiYXl8ZW58MXx8fHwxNzczMTQyMzQwfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Deck Views' },
            ];
          } else if (type === 'restaurant') {
            if (title.includes('taqueria')) {
              return [
                { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1688845465690-e5ea24774fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc3MzI3NDM4Mnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Signature Tacos' },
                { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1688845465690-e5ea24774fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc3MzI3NDM4Mnww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Fresh Ingredients' },
                { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1688845465690-e5ea24774fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc3MzI3NDM4Mnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Kitchen Tour' },
                { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1688845465690-e5ea24774fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc3MzI3NDM4Mnww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Vibrant Atmosphere' },
              ];
            } else if (title.includes('tartine')) {
              return [
                { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1635169705517-a60f2cb18445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJ0aW5lJTIwYmFrZXJ5JTIwZm9vZHxlbnwxfHx8fDE3NzMxNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Tartine Bakery Interior' },
                { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1635169705517-a60f2cb18445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJ0aW5lJTIwYmFrZXJ5JTIwZm9vZHxlbnwxfHx8fDE3NzMxNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Signature Pastries' },
                { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1635169705517-a60f2cb18445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJ0aW5lJTIwYmFrZXJ5JTIwZm9vZHxlbnwxfHx8fDE3NzMxNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Menu Highlights' },
                { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1635169705517-a60f2cb18445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJ0aW5lJTIwYmFrZXJ5JTIwZm9vZHxlbnwxfHx8fDE3NzMxNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Cozy Atmosphere' },
              ];
            } else {
              return [
                { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzMyNDUzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Fine Dining Experience' },
                { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzMyNDUzOTF8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Menu Options' },
                { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzMyNDUzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Chef Specials' },
                { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzMyNDUzOTF8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Ambiance' },
              ];
            }
          } else if (type === 'experience') {
            if (title.includes('alcatraz')) {
              return [
                { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1727317017878-32755b141dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGNhdHJheiUyMGlzbGFuZCUyMHRvdXJ8ZW58MXx8fHwxNzczMjk1NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Alcatraz Island Tour' },
                { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1727317017878-32755b141dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGNhdHJheiUyMGlzbGFuZCUyMHRvdXJ8ZW58MXx8fHwxNzczMjk1NzYzfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Historic Cells' },
                { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1727317017878-32755b141dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGNhdHJheiUyMGlzbGFuZCUyMHRvdXJ8ZW58MXx8fHwxNzczMjk1NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Audio Tour' },
                { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1727317017878-32755b141dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGNhdHJheiUyMGlzbGFuZCUyMHRvdXJ8ZW58MXx8fHwxNzczMjk1NzYzfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Bay Views' },
              ];
            } else if (title.includes('napa') || title.includes('wine')) {
              return [
                { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1656873593110-58a8b76823b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXBhJTIwdmFsbGV5JTIwd2luZSUyMHRhc3Rpbmd8ZW58MXx8fHwxNzczMjk1NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Wine Tasting Experience' },
                { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1656873593110-58a8b76823b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXBhJTIwdmFsbGV5JTIwd2luZSUyMHRhc3Rpbmd8ZW58MXx8fHwxNzczMjk1NzYzfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Vineyard Views' },
                { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1656873593110-58a8b76823b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXBhJTIwdmFsbGV5JTIwd2luZSUyMHRhc3Rpbmd8ZW58MXx8fHwxNzczMjk1NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Private Tour' },
                { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1656873593110-58a8b76823b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXBhJTIwdmFsbGV5JTIwd2luZSUyMHRhc3Rpbmd8ZW58MXx8fHwxNzczMjk1NzYzfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Wine Selection' },
              ];
            } else {
              return [
                { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1652080947399-bf7a7c62a24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwZ3VpZGUlMjBleHBlcmllbmNlfGVufDF8fHx8MTc3MzI5NTQwNXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Guided Tour' },
                { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1652080947399-bf7a7c62a24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwZ3VpZGUlMjBleHBlcmllbmNlfGVufDF8fHx8MTc3MzI5NTQwNXww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Popular Spots' },
                { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1652080947399-bf7a7c62a24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwZ3VpZGUlMjBleHBlcmllbmNlfGVufDF8fHx8MTc3MzI5NTQwNXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Experience Highlights' },
                { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1652080947399-bf7a7c62a24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwZ3VpZGUlMjBleHBlcmllbmNlfGVufDF8fHx8MTc3MzI5NTQwNXww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Group Activities' },
              ];
            }
          } else {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Experience Preview' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Location' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Details' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Overview' },
            ];
          }
        };

        const relevantMedia = getRelevantMedia();
        const bookingTypeLabel = editingBooking.type.charAt(0).toUpperCase() + editingBooking.type.slice(1);

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-[#171A21] border border-[#262B36] rounded-2xl w-full max-w-6xl shadow-2xl flex overflow-hidden h-[90vh]">
              {/* Left Side - Edit Form */}
              <div className="w-2/5 flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-[#262B36] flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#F3F4F6]">
                      {bookingTypeLabel} Booking
                    </h3>
                    <p className="text-[#9CA3AF] text-sm mt-1">
                      {editingBooking.status === 'needsBooking' ? 'Complete your booking' : 'Update booking details'}
                    </p>
                  </div>
                  <button
                    onClick={handleCancelEdit}
                    className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Title Field */}
                  <div className="space-y-2">
                    <label className="text-[#F3F4F6] text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#22C55E]" />
                      {editingBooking.type === 'flight' ? 'Route' : editingBooking.type === 'restaurant' ? 'Restaurant' : 'Title'}
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                      placeholder="Enter title"
                    />
                  </div>

                  {/* Date Field */}
                  <div className="space-y-2">
                    <label className="text-[#F3F4F6] text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#22C55E]" />
                      Date
                    </label>
                    <input
                      type="text"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                      placeholder="e.g. Mar 15, 2026"
                    />
                  </div>

                  {/* Time Field */}
                  <div className="space-y-2">
                    <label className="text-[#F3F4F6] text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#22C55E]" />
                      Time
                    </label>
                    <input
                      type="text"
                      value={editForm.time}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                      placeholder="e.g. 9:00 AM"
                    />
                  </div>

                  {/* Location Field */}
                  <div className="space-y-2">
                    <label className="text-[#F3F4F6] text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#22C55E]" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                      placeholder="Enter location"
                    />
                  </div>

                  {/* Guests/Passengers Field */}
                  {(editingBooking.type === 'restaurant' || editingBooking.type === 'experience' || editingBooking.type === 'flight') && (
                    <div className="space-y-2">
                      <label className="text-[#F3F4F6] text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#22C55E]" />
                        {editingBooking.type === 'flight' ? 'Passengers' : editingBooking.type === 'restaurant' ? 'Party Size' : 'Group Size'}
                      </label>
                      <input
                        type="text"
                        value={editForm.guests}
                        onChange={(e) => setEditForm({ ...editForm, guests: e.target.value })}
                        className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                        placeholder="e.g. 2"
                      />
                    </div>
                  )}

                  {/* Details Field */}
                  <div className="space-y-2">
                    <label className="text-[#F3F4F6] text-sm font-medium">
                      Additional Details
                    </label>
                    <textarea
                      value={editForm.details}
                      onChange={(e) => setEditForm({ ...editForm, details: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors resize-none"
                      placeholder="Add any special requests or notes"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-[#262B36] flex flex-col gap-3">
                  {/* Find Booking Options Button */}
                  <Link
                    to={editingBooking.type === 'flight' || editingBooking.type === 'train' || editingBooking.type === 'ferry' ? '/flights' : '/booking'}
                    className="w-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-[#22C55E]/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Find Booking Options</span>
                  </Link>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-6 py-2.5 bg-[#0F1115] border border-[#262B36] text-[#F3F4F6] rounded-lg hover:border-[#374151] transition-all text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-6 py-2.5 bg-[#22C55E] text-[#0F1115] rounded-lg hover:bg-[#1DB954] transition-all text-sm font-medium"
                    >
                      {editingBooking.status === 'needsBooking' ? 'Complete Booking' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Related Media */}
              <div className="w-3/5 bg-[#0F1115] border-l border-[#262B36] flex flex-col">
                {/* Media Header */}
                <div className="p-6 border-b border-[#262B36]">
                  <h4 className="text-lg font-semibold text-[#F3F4F6]">Related Media</h4>
                  <p className="text-[#9CA3AF] text-sm mt-1">
                    Preview {editingBooking.title}
                  </p>
                </div>

                {/* Media Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {relevantMedia.map((media) => (
                      <div
                        key={media.id}
                        className="bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden group cursor-pointer hover:border-[#374151] transition-all"
                      >
                        <div className="aspect-video relative">
                          <img
                            src={media.url}
                            alt={media.caption}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Video Play Overlay */}
                          {media.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Play className="w-6 h-6 text-[#0F1115] ml-1" fill="currentColor" />
                              </div>
                            </div>
                          )}

                          {/* Photo Icon */}
                          {media.type === 'photo' && (
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                                <ImageIcon className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}

                          {/* Caption Overlay */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                            <p className="text-white text-sm font-medium">{media.caption}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}