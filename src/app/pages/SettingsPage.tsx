import { useState } from 'react';
import { ArrowLeft, User, Lock, Bell, CreditCard, FileText, Instagram, Music, Check, X, Upload, Shield, Eye, EyeOff, ChevronRight, ExternalLink, TrendingUp, DollarSign, Video, Bookmark, Plane, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'profile' | 'booking' | 'connected' | 'analytics' | 'notifications'>('profile');
  
  // Profile state
  const [fullName, setFullName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@email.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [bio, setBio] = useState('Travel enthusiast exploring the world one city at a time');
  
  // Booking info state
  const [passportNumber, setPassportNumber] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [nationality, setNationality] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [frequentFlyerNumber, setFrequentFlyerNumber] = useState('');
  
  // Connected accounts state
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [instagramUsername, setInstagramUsername] = useState('');
  const [tiktokUsername, setTiktokUsername] = useState('');
  
  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [tripUpdates, setTripUpdates] = useState(true);
  const [friendActivity, setFriendActivity] = useState(true);

  const handleConnectInstagram = () => {
    // Simulate Instagram OAuth
    setInstagramConnected(true);
    setInstagramUsername('@alexj_travels');
  };

  const handleConnectTikTok = () => {
    // Simulate TikTok OAuth
    setTiktokConnected(true);
    setTiktokUsername('@alexj.travel');
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'booking', label: 'Booking Information', icon: FileText },
    { id: 'connected', label: 'Connected Accounts', icon: ExternalLink },
    { id: 'analytics', label: 'Analytics & Earnings', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0F1115] flex flex-col">
      {/* Header */}
      <div className="border-b border-[#262B36] bg-[#0F1115] px-8 py-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-semibold text-[#F3F4F6]">Account Settings</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-[1400px] mx-auto h-full flex gap-6 p-8">
          {/* Sidebar Navigation */}
          <div className="w-[280px] flex-shrink-0">
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-[#22C55E]/10 text-[#22C55E]'
                        : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2430]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#F3F4F6] mb-1">Profile Information</h2>
                    <p className="text-sm text-[#9CA3AF]">Update your personal information and profile details</p>
                  </div>

                  {/* Profile Picture */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#9CA3AF]">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                        AJ
                      </div>
                      <button className="flex items-center gap-2 bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#171A21] transition-colors text-sm font-medium">
                        <Upload className="w-4 h-4" />
                        Change Photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#9CA3AF]">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm focus:outline-none focus:border-[#374151]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#9CA3AF]">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm focus:outline-none focus:border-[#374151]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#9CA3AF]">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm focus:outline-none focus:border-[#374151]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#9CA3AF]">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm focus:outline-none focus:border-[#374151] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#262B36]">
                    <button className="bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#171A21] transition-colors text-sm font-medium">
                      Cancel
                    </button>
                    <button className="bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-6 py-2 transition-colors text-sm font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Booking Information Section */}
              {activeSection === 'booking' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#F3F4F6] mb-1">Booking Information</h2>
                    <p className="text-sm text-[#9CA3AF]">Save your travel details for faster bookings</p>
                  </div>

                  {/* Passport Information */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#F3F4F6] font-medium">
                      <FileText className="w-4 h-4" />
                      <span>Passport Details</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#9CA3AF]">Passport Number</label>
                        <input
                          type="text"
                          value={passportNumber}
                          onChange={(e) => setPassportNumber(e.target.value)}
                          placeholder="Enter passport number"
                          className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#374151]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#9CA3AF]">Expiry Date</label>
                        <input
                          type="date"
                          value={passportExpiry}
                          onChange={(e) => setPassportExpiry(e.target.value)}
                          className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm focus:outline-none focus:border-[#374151]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#9CA3AF]">Nationality</label>
                        <input
                          type="text"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          placeholder="Enter nationality"
                          className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#374151]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#9CA3AF]">Date of Birth</label>
                        <input
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm focus:outline-none focus:border-[#374151]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Frequent Flyer */}
                  <div className="space-y-4 pt-4 border-t border-[#262B36]">
                    <div className="flex items-center gap-2 text-[#F3F4F6] font-medium">
                      <CreditCard className="w-4 h-4" />
                      <span>Frequent Flyer Programs</span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#9CA3AF]">Frequent Flyer Number</label>
                      <input
                        type="text"
                        value={frequentFlyerNumber}
                        onChange={(e) => setFrequentFlyerNumber(e.target.value)}
                        placeholder="Enter frequent flyer number"
                        className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#374151]"
                      />
                    </div>

                    <div className="bg-[#0F1115] border border-[#262B36] rounded-lg p-4 flex items-start gap-3">
                      <Shield className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#F3F4F6] text-sm font-medium mb-1">Your data is secure</p>
                        <p className="text-[#9CA3AF] text-xs">All personal information is encrypted and stored securely. We never share your data with third parties.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#262B36]">
                    <button className="bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#171A21] transition-colors text-sm font-medium">
                      Cancel
                    </button>
                    <button className="bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-6 py-2 transition-colors text-sm font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Connected Accounts Section */}
              {activeSection === 'connected' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#F3F4F6] mb-1">Connected Accounts</h2>
                    <p className="text-sm text-[#9CA3AF]">Link your social media accounts to import travel content</p>
                  </div>

                  {/* Instagram */}
                  <div className="bg-[#0F1115] border border-[#262B36] rounded-xl p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Instagram className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[#F3F4F6] font-medium">Instagram</h3>
                          {instagramConnected && (
                            <div className="flex items-center gap-1 bg-[#22C55E]/10 border border-[#22C55E] rounded-full px-2 py-0.5">
                              <Check className="w-3 h-3 text-[#22C55E]" />
                              <span className="text-[#22C55E] text-xs font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                        <p className="text-[#9CA3AF] text-sm mb-3">
                          {instagramConnected 
                            ? `Connected as ${instagramUsername}` 
                            : 'Connect your Instagram to import travel posts and reels'}
                        </p>
                        {instagramConnected ? (
                          <div className="flex items-center gap-2">
                            <button className="bg-[#171A21] border border-[#262B36] rounded-lg px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2430] transition-colors text-sm font-medium">
                              Sync Content
                            </button>
                            <button 
                              onClick={() => setInstagramConnected(false)}
                              className="bg-[#171A21] border border-[#EF4444] rounded-lg px-4 py-2 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors text-sm font-medium"
                            >
                              Disconnect
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={handleConnectInstagram}
                            className="bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-4 py-2 transition-colors text-sm font-medium"
                          >
                            Connect Instagram
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* TikTok */}
                  <div className="bg-[#0F1115] border border-[#262B36] rounded-xl p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00F2EA] to-[#FF0050] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[#F3F4F6] font-medium">TikTok</h3>
                          {tiktokConnected && (
                            <div className="flex items-center gap-1 bg-[#22C55E]/10 border border-[#22C55E] rounded-full px-2 py-0.5">
                              <Check className="w-3 h-3 text-[#22C55E]" />
                              <span className="text-[#22C55E] text-xs font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                        <p className="text-[#9CA3AF] text-sm mb-3">
                          {tiktokConnected 
                            ? `Connected as ${tiktokUsername}` 
                            : 'Connect your TikTok to import travel videos'}
                        </p>
                        {tiktokConnected ? (
                          <div className="flex items-center gap-2">
                            <button className="bg-[#171A21] border border-[#262B36] rounded-lg px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2430] transition-colors text-sm font-medium">
                              Sync Content
                            </button>
                            <button 
                              onClick={() => setTiktokConnected(false)}
                              className="bg-[#171A21] border border-[#EF4444] rounded-lg px-4 py-2 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors text-sm font-medium"
                            >
                              Disconnect
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={handleConnectTikTok}
                            className="bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-4 py-2 transition-colors text-sm font-medium"
                          >
                            Connect TikTok
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-[#0F1115] border border-[#262B36] rounded-lg p-4 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#F3F4F6] text-sm font-medium mb-1">Why connect your accounts?</p>
                      <p className="text-[#9CA3AF] text-xs">Automatically detect locations from your posts and videos to build your travel collections and discover new destinations.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics & Earnings Section */}
              {activeSection === 'analytics' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#F3F4F6] mb-1">Analytics & Earnings</h2>
                    <p className="text-sm text-[#9CA3AF]">Track your content performance and earnings</p>
                  </div>

                  {/* Total Earnings Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#16A34A]/5 border border-[#22C55E]/20 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-[#22C55E]" />
                        <span className="text-[#9CA3AF] text-sm font-medium">Total Earnings</span>
                      </div>
                      <p className="text-[#F3F4F6] text-3xl font-semibold mb-1">$2,847</p>
                      <div className="flex items-center gap-1 text-[#22C55E] text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>+12% from last month</span>
                      </div>
                    </div>

                    <div className="bg-[#0F1115] border border-[#262B36] rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="w-5 h-5 text-[#38BDF8]" />
                        <span className="text-[#9CA3AF] text-sm font-medium">Total Videos</span>
                      </div>
                      <p className="text-[#F3F4F6] text-3xl font-semibold mb-1">47</p>
                      <div className="flex items-center gap-1 text-[#9CA3AF] text-xs">
                        <span>Content uploaded</span>
                      </div>
                    </div>

                    <div className="bg-[#0F1115] border border-[#262B36] rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Bookmark className="w-5 h-5 text-[#FBBF24]" />
                        <span className="text-[#9CA3AF] text-sm font-medium">Total Saves</span>
                      </div>
                      <p className="text-[#F3F4F6] text-3xl font-semibold mb-1">1,234</p>
                      <div className="flex items-center gap-1 text-[#9CA3AF] text-xs">
                        <span>Across all content</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Performance */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#F3F4F6] font-medium">
                      <Video className="w-4 h-4" />
                      <span>Top Performing Videos</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: 'Tokyo Street Food Tour', saves: 456, collections: 189, trips: 87, earnings: 342 },
                        { title: 'Hidden Gems in Paris', saves: 398, collections: 156, trips: 72, earnings: 289 },
                        { title: 'Bali Beach Hopping Guide', saves: 367, collections: 134, trips: 61, earnings: 256 },
                        { title: 'NYC Coffee Shops', saves: 289, collections: 98, trips: 45, earnings: 198 },
                      ].map((video, index) => (
                        <div
                          key={index}
                          className="bg-[#0F1115] border border-[#262B36] rounded-xl p-4 hover:border-[#374151] transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#22C55E]/20 to-[#16A34A]/10 border border-[#22C55E]/20 rounded-lg flex items-center justify-center">
                                <Video className="w-5 h-5 text-[#22C55E]" />
                              </div>
                              <div>
                                <h4 className="text-[#F3F4F6] font-medium text-sm mb-1">{video.title}</h4>
                                <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                                  <span>{video.saves} total saves</span>
                                  <span>•</span>
                                  <span className="text-[#22C55E]">${video.earnings} earned</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-[#171A21] border border-[#262B36] rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Bookmark className="w-3 h-3 text-[#9CA3AF]" />
                                <span className="text-[#9CA3AF] text-xs">Collections</span>
                              </div>
                              <p className="text-[#F3F4F6] font-semibold">{video.collections}</p>
                            </div>

                            <div className="bg-[#171A21] border border-[#262B36] rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Plane className="w-3 h-3 text-[#9CA3AF]" />
                                <span className="text-[#9CA3AF] text-xs">Trips</span>
                              </div>
                              <p className="text-[#F3F4F6] font-semibold">{video.trips}</p>
                            </div>

                            <div className="bg-[#171A21] border border-[#262B36] rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <DollarSign className="w-3 h-3 text-[#22C55E]" />
                                <span className="text-[#9CA3AF] text-xs">Earnings</span>
                              </div>
                              <p className="text-[#22C55E] font-semibold">${video.earnings}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Earnings Breakdown */}
                  <div className="space-y-4 pt-4 border-t border-[#262B36]">
                    <div className="flex items-center gap-2 text-[#F3F4F6] font-medium">
                      <BarChart3 className="w-4 h-4" />
                      <span>Earnings Breakdown</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#0F1115] border border-[#262B36] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[#9CA3AF] text-sm font-medium">Collection Saves</span>
                          <span className="text-[#F3F4F6] font-semibold">$1,687</span>
                        </div>
                        <div className="relative h-2 bg-[#171A21] rounded-full overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full" style={{ width: '59%' }}></div>
                        </div>
                        <p className="text-[#9CA3AF] text-xs mt-2">59% of total earnings</p>
                      </div>

                      <div className="bg-[#0F1115] border border-[#262B36] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[#9CA3AF] text-sm font-medium">Trip Saves</span>
                          <span className="text-[#F3F4F6] font-semibold">$1,160</span>
                        </div>
                        <div className="relative h-2 bg-[#171A21] rounded-full overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] rounded-full" style={{ width: '41%' }}></div>
                        </div>
                        <p className="text-[#9CA3AF] text-xs mt-2">41% of total earnings</p>
                      </div>
                    </div>
                  </div>

                  {/* Payout Info */}
                  <div className="bg-[#0F1115] border border-[#262B36] rounded-lg p-4 flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#F3F4F6] text-sm font-medium mb-1">Next Payout</p>
                      <p className="text-[#9CA3AF] text-xs">Your next payout of $847 is scheduled for April 1, 2026. Earnings are processed on the 1st of each month.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#F3F4F6] mb-1">Notification Preferences</h2>
                    <p className="text-sm text-[#9CA3AF]">Choose what notifications you want to receive</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#0F1115] border border-[#262B36] rounded-lg">
                      <div>
                        <p className="text-[#F3F4F6] text-sm font-medium">Email Notifications</p>
                        <p className="text-[#9CA3AF] text-xs">Receive updates via email</p>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          emailNotifications ? 'bg-[#22C55E]' : 'bg-[#374151]'
                        }`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          emailNotifications ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#0F1115] border border-[#262B36] rounded-lg">
                      <div>
                        <p className="text-[#F3F4F6] text-sm font-medium">Push Notifications</p>
                        <p className="text-[#9CA3AF] text-xs">Receive push notifications on your device</p>
                      </div>
                      <button
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          pushNotifications ? 'bg-[#22C55E]' : 'bg-[#374151]'
                        }`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          pushNotifications ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#0F1115] border border-[#262B36] rounded-lg">
                      <div>
                        <p className="text-[#F3F4F6] text-sm font-medium">Trip Updates</p>
                        <p className="text-[#9CA3AF] text-xs">Get notified about changes to your trips</p>
                      </div>
                      <button
                        onClick={() => setTripUpdates(!tripUpdates)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          tripUpdates ? 'bg-[#22C55E]' : 'bg-[#374151]'
                        }`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          tripUpdates ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#0F1115] border border-[#262B36] rounded-lg">
                      <div>
                        <p className="text-[#F3F4F6] text-sm font-medium">Friend Activity</p>
                        <p className="text-[#9CA3AF] text-xs">Get updates when friends share new trips</p>
                      </div>
                      <button
                        onClick={() => setFriendActivity(!friendActivity)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          friendActivity ? 'bg-[#22C55E]' : 'bg-[#374151]'
                        }`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          friendActivity ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}