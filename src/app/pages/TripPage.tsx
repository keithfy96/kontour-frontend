import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, MoreHorizontal, Send, Sparkles, X, Route, Bookmark, Image as ImageIcon, Key, CalendarDays, Map, Share2, UserPlus, Check, Copy, Mail, Plus, Plane, Hotel, Car, Compass } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ItineraryPanel } from '../components/ItineraryPanel';
import { MediaPanel } from '../components/MediaPanel';
import { BookingsPanel } from '../components/BookingsPanel';
import { DiscoverPanel } from '../components/DiscoverPanel';

export default function TripPage() {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState('');
  const [showMapView, setShowMapView] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [suggestedFriends, setSuggestedFriends] = useState([
    { id: 4, name: 'David', initials: 'D', color: '#FF6347' },
    { id: 5, name: 'Eve', initials: 'E', color: '#4682B4' },
    { id: 6, name: 'Frank', initials: 'F', color: '#FFD700' },
  ]);

  // Preferences state
  const [travelStyles, setTravelStyles] = useState<string[]>([]);
  const [pace, setPace] = useState(50);
  const [planningStyle, setPlanningStyle] = useState(50);
  const [budgetLevel, setBudgetLevel] = useState('Mid-range');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://kontour.app/trip/sf-bay-area-2024');
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const quickActions = [
    { icon: Route, label: 'Itinerary', color: '#22C55E', key: 'itinerary' },
    { icon: Bookmark, label: 'Bookings', color: '#38BDF8', key: 'bookings' },
    { icon: Sparkles, label: 'Ideas', color: '#FBBF24', key: 'ideas' },
    { icon: ImageIcon, label: 'Media', color: '#EF4444', key: 'media' },
    { icon: Key, label: 'Key details', color: '#9CA3AF', key: 'keydetails' },
    { icon: CalendarDays, label: 'Calendar', color: '#9CA3AF', key: 'calendar' },
  ];

  const tripMembers = [
    { id: 1, name: 'Alice', initials: 'A', color: '#FF4500' },
    { id: 2, name: 'Bob', initials: 'B', color: '#00FF00' },
    { id: 3, name: 'Charlie', initials: 'C', color: '#0000FF' },
  ];

  return (
    <div className="h-screen bg-[#0F1115] flex flex-col">
      {/* Header */}
      <div className="border-b border-[#262B36] bg-[#0F1115] px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-4">
          {/* Trip Members */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {tripMembers.map((member) => (
                <div
                  key={member.id}
                  className="w-8 h-8 rounded-full border-2 border-[#0F1115] flex items-center justify-center text-xs font-medium text-white"
                  style={{ backgroundColor: member.color }}
                  title={member.name}
                >
                  {member.initials}
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowAddFriendsModal(true)}
              className="flex items-center gap-2 bg-[#171A21] border border-[#262B36] rounded-lg px-3 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2430] transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-sm font-medium">Add friends</span>
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-[#262B36]" />

          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-4 py-2 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Make Booking</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 bg-[#171A21] border border-[#262B36] rounded-lg px-3 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2430] transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>

          <button 
            onClick={() => setShowMapView(!showMapView)}
            className="flex items-center gap-2 bg-[#171A21] border border-[#262B36] rounded-lg px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2430] transition-colors"
          >
            <Map className="w-4 h-4" />
            <span className="text-sm font-medium">Toggle Map</span>
          </button>
          
          <div className="flex items-center gap-2 bg-[#171A21] border border-[#262B36] rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
            <span className="text-[#F3F4F6] text-sm font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conditionally show left sidebar when map is toggled */}
        {showMapView && (
          <div className="w-[380px] border-r border-[#262B36] bg-[#0F1115] flex flex-col">
            {/* Trip Header */}
            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-[#F3F4F6] mb-4">
                  Trip to San Francisco Bay Area and Reno
                </h1>
                
                {/* Trip Filters */}
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors">
                    Upload Status
                  </button>
                  <button className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    90 days
                  </button>
                  <button className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    2 travelers
                  </button>
                  <button className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    Budget
                  </button>
                  <button 
                    onClick={() => setShowPreferencesModal(true)}
                    className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors"
                  >
                    Customize
                  </button>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2 bg-[#171A21] border border-[#374151] rounded-xl px-4 py-3">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Add a new chat to this trip"
                  className="bg-transparent border-none outline-none text-[#F3F4F6] text-sm flex-1 placeholder:text-[#6B7280]"
                />
                <button 
                  onClick={handleSendMessage}
                  className="text-[#9CA3AF] hover:text-[#22C55E] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Smart Planning Card */}
            <div className="flex-1 px-6 pb-6 overflow-y-auto flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#171A21] border border-[#262B36] rounded-xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-[#22C55E]" />
                </div>
                <h3 className="text-[#F3F4F6] font-medium text-lg">
                  Start planning your trip
                </h3>
                <p className="text-[#6B7280] text-sm">
                  Ask questions, add locations, or use the chat to plan your perfect itinerary
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Center - Chat/Map Content Area */}
        <div className="flex-1 relative bg-[#0F1115] flex">
          {/* Main content area - shows chat content when map is off, map when map is on */}
          <div className="flex-1 flex flex-col">
            {showMapView ? (
              /* Map View */
              <div className="flex-1 relative bg-gradient-to-br from-[#1F2430] to-[#171A21]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Map style background */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#38BDF8] rounded-full blur-3xl"></div>
                      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-[#22C55E] rounded-full blur-3xl"></div>
                    </div>

                    {/* Map pins */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-10 h-10 bg-[#0F1115] border-2 border-[#22C55E] rounded-full flex items-center justify-center shadow-lg">
                          <MapPin className="w-5 h-5 text-[#22C55E] fill-current" />
                        </div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-2 shadow-lg">
                          <span className="text-[#F3F4F6] text-sm font-medium">San Francisco</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 right-1/3">
                      <div className="w-8 h-8 bg-[#0F1115] border-2 border-[#38BDF8] rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="w-4 h-4 text-[#38BDF8] fill-current" />
                      </div>
                    </div>

                    <div className="absolute bottom-1/3 left-1/3">
                      <div className="w-8 h-8 bg-[#0F1115] border-2 border-[#FBBF24] rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="w-4 h-4 text-[#FBBF24] fill-current" />
                      </div>
                    </div>

                    <div className="absolute top-2/3 right-1/4">
                      <div className="w-8 h-8 bg-[#0F1115] border-2 border-[#EF4444] rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="w-4 h-4 text-[#EF4444] fill-current" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-[#0F1115] border border-[#262B36] rounded-lg flex items-center justify-center text-[#F3F4F6] hover:bg-[#171A21] transition-colors shadow-lg">
                    +
                  </button>
                  <button className="w-10 h-10 bg-[#0F1115] border border-[#262B36] rounded-lg flex items-center justify-center text-[#F3F4F6] hover:bg-[#171A21] transition-colors shadow-lg">
                    −
                  </button>
                </div>
              </div>
            ) : (
              /* Chat View */
              <div className="flex-1 flex flex-col">
                {/* Trip Header */}
                <div className="p-6 space-y-6 border-b border-[#262B36]">
                  <div>
                    <h1 className="text-2xl font-semibold text-[#F3F4F6] mb-4">
                      Trip to San Francisco Bay Area and Reno
                    </h1>
                    
                    {/* Trip Filters */}
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors">
                        Upload Status
                      </button>
                      <button className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        90 days
                      </button>
                      <button className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        2 travelers
                      </button>
                      <button className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        Budget
                      </button>
                      <button 
                        onClick={() => setShowPreferencesModal(true)}
                        className="px-3 py-1.5 bg-[#171A21] border border-[#262B36] rounded-lg text-[#9CA3AF] text-sm hover:bg-[#1F2430] transition-colors"
                      >
                        Customize
                      </button>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="flex items-center gap-2 bg-[#171A21] border border-[#374151] rounded-xl px-4 py-3">
                    <input 
                      type="text" 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Add a new chat to this trip"
                      className="bg-transparent border-none outline-none text-[#F3F4F6] text-sm flex-1 placeholder:text-[#6B7280]"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="text-[#9CA3AF] hover:text-[#22C55E] transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Smart Planning Card */}
                <div className="flex-1 px-6 pb-6 overflow-y-auto flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-[#171A21] border border-[#262B36] rounded-xl flex items-center justify-center mx-auto">
                      <Sparkles className="w-8 h-8 text-[#22C55E]" />
                    </div>
                    <h3 className="text-[#F3F4F6] font-medium text-lg">
                      Start planning your trip
                    </h3>
                    <p className="text-[#6B7280] text-sm">
                      Ask questions, add locations, or use the chat to plan your perfect itinerary
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Conditionally rendered based on activePanel */}
          {activePanel === 'itinerary' && (
            <div className="w-[400px] border-l border-[#262B36] bg-[#0F1115]">
              <ItineraryPanel />
            </div>
          )}
          {activePanel === 'media' && (
            <div className="w-[400px] border-l border-[#262B36] bg-[#0F1115]">
              <MediaPanel />
            </div>
          )}
          {activePanel === 'bookings' && (
            <div className="w-[400px] border-l border-[#262B36] bg-[#0F1115]">
              <BookingsPanel />
            </div>
          )}
          {activePanel === 'ideas' && (
            <div className="w-[400px] border-l border-[#262B36] bg-[#0F1115]">
              <DiscoverPanel />
            </div>
          )}
        </div>

        {/* Right Sidebar - Quick Actions */}
        <div className="w-[200px] border-l border-[#262B36] bg-[#0F1115] p-4">
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => setActivePanel(activePanel === action.key ? null : action.key)}
                className={`w-full border rounded-lg p-3 flex items-center gap-3 transition-all group ${
                  activePanel === action.key
                    ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#F3F4F6]'
                    : 'bg-[#171A21] hover:bg-[#1F2430] border-[#262B36] text-[#9CA3AF] hover:text-[#F3F4F6]'
                }`}
              >
                <action.icon 
                  className="w-4 h-4 flex-shrink-0" 
                  style={{ color: activePanel === action.key ? '#22C55E' : action.color }}
                />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] w-[500px] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#262B36]">
              <h2 className="text-xl font-semibold text-[#F3F4F6]">Share Trip</h2>
              <button 
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#1F2430] flex items-center justify-center text-[#9CA3AF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Copy Link */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#9CA3AF]">Trip Link</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value="https://kontour.app/trip/sf-bay-area-2024"
                    readOnly
                    className="flex-1 bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-4 py-3 transition-colors font-medium"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Share via Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#9CA3AF]">Share via Email</label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280]"
                  />
                  <button className="flex items-center gap-2 bg-[#171A21] hover:bg-[#1F2430] border border-[#262B36] text-[#F3F4F6] rounded-lg px-4 py-3 transition-colors font-medium">
                    <Mail className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>

              {/* Current Members */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#9CA3AF]">People with access</label>
                <div className="space-y-2">
                  {tripMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3 bg-[#0F1115] border border-[#262B36] rounded-lg"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.initials}
                      </div>
                      <span className="text-[#F3F4F6] text-sm flex-1">{member.name}</span>
                      <span className="text-[#6B7280] text-xs">Can edit</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Friends Modal */}
      {showAddFriendsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] w-[500px] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#262B36]">
              <h2 className="text-xl font-semibold text-[#F3F4F6]">Add Friends to Trip</h2>
              <button 
                onClick={() => setShowAddFriendsModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#1F2430] flex items-center justify-center text-[#9CA3AF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Search friends..."
                  className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280]"
                />
              </div>

              {/* Suggested Friends */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#9CA3AF]">Suggested</label>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {suggestedFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center gap-3 p-3 bg-[#0F1115] border border-[#262B36] rounded-lg hover:bg-[#171A21] transition-colors"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white flex-shrink-0"
                        style={{ backgroundColor: friend.color }}
                      >
                        {friend.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#F3F4F6] text-sm font-medium">{friend.name}</p>
                        <p className="text-[#6B7280] text-xs truncate">{friend.email}</p>
                      </div>
                      <button className="flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-3 py-1.5 transition-colors text-sm font-medium">
                        <UserPlus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Make Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] w-[600px] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#262B36]">
              <h2 className="text-xl font-semibold text-[#F3F4F6]">Make a Booking</h2>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#1F2430] flex items-center justify-center text-[#9CA3AF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Booking Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#9CA3AF]">What would you like to book?</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center gap-3 p-6 bg-[#0F1115] border border-[#262B36] rounded-xl hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all group">
                    <div className="w-12 h-12 bg-[#171A21] border border-[#262B36] rounded-xl flex items-center justify-center group-hover:border-[#22C55E] group-hover:bg-[#22C55E]/10 transition-all">
                      <Plane className="w-6 h-6 text-[#9CA3AF] group-hover:text-[#22C55E] transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-[#F3F4F6] text-sm font-medium">Flight</p>
                      <p className="text-[#6B7280] text-xs mt-1">Book flights</p>
                    </div>
                  </button>

                  <button className="flex flex-col items-center gap-3 p-6 bg-[#0F1115] border border-[#262B36] rounded-xl hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all group">
                    <div className="w-12 h-12 bg-[#171A21] border border-[#262B36] rounded-xl flex items-center justify-center group-hover:border-[#22C55E] group-hover:bg-[#22C55E]/10 transition-all">
                      <Hotel className="w-6 h-6 text-[#9CA3AF] group-hover:text-[#22C55E] transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-[#F3F4F6] text-sm font-medium">Accommodation</p>
                      <p className="text-[#6B7280] text-xs mt-1">Hotels & stays</p>
                    </div>
                  </button>

                  <button className="flex flex-col items-center gap-3 p-6 bg-[#0F1115] border border-[#262B36] rounded-xl hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all group">
                    <div className="w-12 h-12 bg-[#171A21] border border-[#262B36] rounded-xl flex items-center justify-center group-hover:border-[#22C55E] group-hover:bg-[#22C55E]/10 transition-all">
                      <Car className="w-6 h-6 text-[#9CA3AF] group-hover:text-[#22C55E] transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-[#F3F4F6] text-sm font-medium">Car Rental</p>
                      <p className="text-[#6B7280] text-xs mt-1">Rent vehicles</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#9CA3AF]">Popular booking sites</label>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.booking.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#0F1115] border border-[#262B36] rounded-xl hover:border-[#374151] hover:bg-[#171A21] transition-all"
                  >
                    <div className="w-10 h-10 bg-[#171A21] border border-[#262B36] rounded-lg flex items-center justify-center">
                      <Hotel className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#F3F4F6] text-sm font-medium">Booking.com</p>
                      <p className="text-[#6B7280] text-xs">Hotels & more</p>
                    </div>
                  </a>

                  <a
                    href="https://www.airbnb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#0F1115] border border-[#262B36] rounded-xl hover:border-[#374151] hover:bg-[#171A21] transition-all"
                  >
                    <div className="w-10 h-10 bg-[#171A21] border border-[#262B36] rounded-lg flex items-center justify-center">
                      <Hotel className="w-5 h-5 text-[#FF5A5F]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#F3F4F6] text-sm font-medium">Airbnb</p>
                      <p className="text-[#6B7280] text-xs">Vacation rentals</p>
                    </div>
                  </a>

                  <a
                    href="https://www.expedia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#0F1115] border border-[#262B36] rounded-xl hover:border-[#374151] hover:bg-[#171A21] transition-all"
                  >
                    <div className="w-10 h-10 bg-[#171A21] border border-[#262B36] rounded-lg flex items-center justify-center">
                      <Plane className="w-5 h-5 text-[#FBBF24]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#F3F4F6] text-sm font-medium">Expedia</p>
                      <p className="text-[#6B7280] text-xs">Flights & packages</p>
                    </div>
                  </a>

                  <a
                    href="https://www.kayak.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#0F1115] border border-[#262B36] rounded-xl hover:border-[#374151] hover:bg-[#171A21] transition-all"
                  >
                    <div className="w-10 h-10 bg-[#171A21] border border-[#262B36] rounded-lg flex items-center justify-center">
                      <Plane className="w-5 h-5 text-[#FF6900]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#F3F4F6] text-sm font-medium">Kayak</p>
                      <p className="text-[#6B7280] text-xs">Compare prices</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Manual Entry */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#9CA3AF]">Or add booking manually</label>
                <button className="w-full flex items-center justify-center gap-2 p-4 bg-[#0F1115] border border-[#262B36] rounded-xl hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all text-[#9CA3AF] hover:text-[#22C55E]">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add booking details manually</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Travel Preferences Modal */}
      {showPreferencesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] w-[90vw] max-w-[1000px] max-h-[90vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#262B36]">
              <h2 className="text-2xl font-semibold text-[#F3F4F6]">Customize Trip Preferences</h2>
              <button 
                onClick={() => setShowPreferencesModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#1F2430] flex items-center justify-center text-[#9CA3AF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-8">
                {/* Travel Style Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#F3F4F6] mb-2">Travel Style</h3>
                    <p className="text-sm text-[#6B7280]">Select all that apply to personalize your trip</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Relaxation / Leisure',
                      'Adventure',
                      'Cultural exploration',
                      'Food-focused travel',
                      'Luxury travel',
                      'Budget travel',
                      'Nature / outdoors',
                      'Urban exploration',
                      'Party / nightlife',
                      'Photography / scenic travel',
                      'Slow travel',
                      'Fast-paced itinerary',
                      'Hidden gems / off-the-beaten-path',
                      'Famous landmarks',
                    ].map((style) => (
                      <button
                        key={style}
                        onClick={() => {
                          setTravelStyles(prev => 
                            prev.includes(style) 
                              ? prev.filter(s => s !== style)
                              : [...prev, style]
                          );
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          travelStyles.includes(style)
                            ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#F3F4F6]'
                            : 'bg-[#0F1115] border-[#262B36] text-[#9CA3AF] hover:border-[#374151] hover:bg-[#171A21]'
                        }`}
                      >
                        <span className="text-sm font-medium">{style}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pace and Planning Style Sliders */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pace Slider */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#F3F4F6]">Pace</label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={pace}
                        onChange={(e) => setPace(Number(e.target.value))}
                        className="w-full h-2 bg-[#262B36] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#22C55E] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#22C55E] [&::-moz-range-thumb]:border-0"
                      />
                      <div className="flex justify-between text-xs text-[#6B7280]">
                        <span>Relaxed</span>
                        <span>Packed schedule</span>
                      </div>
                    </div>
                  </div>

                  {/* Planning Style Slider */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#F3F4F6]">Planning Style</label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={planningStyle}
                        onChange={(e) => setPlanningStyle(Number(e.target.value))}
                        className="w-full h-2 bg-[#262B36] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#22C55E] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#22C55E] [&::-moz-range-thumb]:border-0"
                      />
                      <div className="flex justify-between text-xs text-[#6B7280]">
                        <span>Structured</span>
                        <span>Spontaneous</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget Level */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#F3F4F6] mb-2">Budget Level</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Budget', 'Mid-range', 'Premium', 'Luxury'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setBudgetLevel(level)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          budgetLevel === level
                            ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#F3F4F6]'
                            : 'bg-[#0F1115] border-[#262B36] text-[#9CA3AF] hover:border-[#374151] hover:bg-[#171A21]'
                        }`}
                      >
                        <span className="text-sm font-medium">{level}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Categories */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#F3F4F6] mb-2">Interests & Activities</h3>
                    <p className="text-sm text-[#6B7280]">Choose categories that interest you</p>
                  </div>

                  {/* Nature & Outdoors */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-[#F3F4F6]">Nature & Outdoors</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {['Beaches', 'Hiking', 'National parks', 'Waterfalls', 'Wildlife safaris', 'Scenic viewpoints'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setSelectedCategories(prev => 
                              prev.includes(item) 
                                ? prev.filter(i => i !== item)
                                : [...prev, item]
                            );
                          }}
                          className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                            selectedCategories.includes(item)
                              ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#F3F4F6]'
                              : 'bg-[#0F1115] border-[#262B36] text-[#9CA3AF] hover:border-[#374151]'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Adventure */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-[#F3F4F6]">Adventure</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {['Scuba diving', 'Snorkeling', 'Paragliding', 'Zip lining', 'Surfing', 'Rock climbing'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setSelectedCategories(prev => 
                              prev.includes(item) 
                                ? prev.filter(i => i !== item)
                                : [...prev, item]
                            );
                          }}
                          className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                            selectedCategories.includes(item)
                              ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#F3F4F6]'
                              : 'bg-[#0F1115] border-[#262B36] text-[#9CA3AF] hover:border-[#374151]'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Culture */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-[#F3F4F6]">Culture</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {['Museums', 'Historical sites', 'Architecture', 'Temples/churches', 'Cultural performances'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setSelectedCategories(prev => 
                              prev.includes(item) 
                                ? prev.filter(i => i !== item)
                                : [...prev, item]
                            );
                          }}
                          className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                            selectedCategories.includes(item)
                              ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#F3F4F6]'
                              : 'bg-[#0F1115] border-[#262B36] text-[#9CA3AF] hover:border-[#374151]'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lifestyle */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-[#F3F4F6]">Lifestyle</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {['Shopping', 'Nightlife', 'Bars / cocktails', 'Spa / wellness', 'Yoga retreats'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setSelectedCategories(prev => 
                              prev.includes(item) 
                                ? prev.filter(i => i !== item)
                                : [...prev, item]
                            );
                          }}
                          className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                            selectedCategories.includes(item)
                              ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#F3F4F6]'
                              : 'bg-[#0F1115] border-[#262B36] text-[#9CA3AF] hover:border-[#374151]'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experiences */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-[#F3F4F6]">Experiences</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {['Cooking classes', 'Photography tours', 'Festivals / events', 'Local markets', 'Food tours'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setSelectedCategories(prev => 
                              prev.includes(item) 
                                ? prev.filter(i => i !== item)
                                : [...prev, item]
                            );
                          }}
                          className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                            selectedCategories.includes(item)
                              ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#F3F4F6]'
                              : 'bg-[#0F1115] border-[#262B36] text-[#9CA3AF] hover:border-[#374151]'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-[#262B36]">
              <button
                onClick={() => {
                  // Reset all preferences
                  setTravelStyles([]);
                  setPace(50);
                  setPlanningStyle(50);
                  setBudgetLevel('Mid-range');
                  setSelectedCategories([]);
                }}
                className="px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] text-sm font-medium transition-colors"
              >
                Reset All
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPreferencesModal(false)}
                  className="px-6 py-2 bg-[#0F1115] border border-[#262B36] rounded-lg text-[#F3F4F6] text-sm font-medium hover:bg-[#171A21] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Save preferences logic here
                    console.log('Preferences saved:', { travelStyles, pace, planningStyle, budgetLevel, selectedCategories });
                    setShowPreferencesModal(false);
                  }}
                  className="px-6 py-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}