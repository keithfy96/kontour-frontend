import { useState } from 'react';
import { Plus, ChevronDown, ChevronRight, MoreHorizontal, Edit2, Home, Plane, Train, Car, Ship, Bike, Footprints, X, Clock, MapPin, Calendar, Play, Image as ImageIcon } from 'lucide-react';

interface IdeaCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface Activity {
  id: string;
  time: string;
  title: string;
  duration?: string;
  type: 'activity' | 'lodging' | 'transport';
  transportMode?: 'flight' | 'train' | 'car' | 'ferry' | 'bike' | 'walk' | 'taxi';
}

const ideas: IdeaCard[] = [
  {
    id: '1',
    title: 'Visit the Golden Gate Bridge',
    subtitle: 'Iconic landmark',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlJTIwc2FuJTIwZnJhbmNpc2NvfGVufDF8fHx8MTc3MzA4MzA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Golden Gate Bridge',
    subtitle: 'Photo spot',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoZXJtYW5zJTIwd2hhcmYlMjBzYW4lMjBmcmFuY2lzY28fZW58MXx8fHwxNzczMDgzMDY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: "Old Fisherman's Wharf",
    subtitle: 'Historic pier',
    image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGNhdHJheiUyMGlzbGFuZHxlbnwxfHx8fDE3NzMwODMwODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const dayActivities: Record<number, Activity[]> = {
  1: [
    { id: '1-0', time: '8:00am', title: 'Taxi to SFO Airport', duration: '45m', type: 'transport', transportMode: 'taxi' },
    { id: '1-0b', time: '9:00am', title: 'Flight SFO → JFK', duration: '5h 30m', type: 'transport', transportMode: 'flight' },
    { id: '1-1', time: '5:30pm', title: 'Arrival & Check-in at Hotel Zephyr', duration: '1h', type: 'activity' },
    { id: '1-2', time: '7:00pm', title: 'Dinner at Tartine Bakery', duration: '1h 30m', type: 'activity' },
    { id: '1-3', time: '9:00pm', title: 'Walk along Embarcadero', duration: '45m', type: 'transport', transportMode: 'walk' },
  ],
  2: [
    { id: '2-1', time: '9:00am', title: 'Golden Gate Bridge viewpoint', duration: '1h 30m', type: 'activity' },
    { id: '2-2', time: '10:30am', title: 'Bike ride across the bridge', duration: '2h', type: 'transport', transportMode: 'bike' },
    { id: '2-3', time: '1:00pm', title: 'Lunch in Sausalito', duration: '1h 30m', type: 'activity' },
    { id: '2-4', time: '3:00pm', title: 'Ferry back to SF', duration: '45m', type: 'transport', transportMode: 'ferry' },
    { id: '2-5', time: '4:00pm', title: 'Explore Mission District', duration: '2h', type: 'activity' },
    { id: '2-6', time: '6:30pm', title: 'Dinner at La Taqueria', duration: '1h 30m', type: 'activity' },
  ],
  3: [
    { id: '3-0', time: '7:00am', title: 'Checkout & Car rental pickup', duration: '1h', type: 'transport', transportMode: 'car' },
    { id: '3-1', time: '8:30am', title: 'Drive to Reno', duration: '3h 45m', type: 'transport', transportMode: 'car' },
    { id: '3-2', time: '12:30pm', title: 'Arrive Reno & Lunch', duration: '1h 30m', type: 'activity' },
    { id: '3-3', time: '2:30pm', title: 'Explore downtown Reno', duration: '2h', type: 'activity' },
  ],
};

const dayLodging: Record<number, string | null> = {
  1: 'Hotel Zephyr',
  2: 'Hotel Zephyr',
  3: 'Hotel Zephyr',
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
};

export function ItineraryPanel() {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['ideas', 'grocery']));
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    time: '',
    duration: '',
    transportMode: '' as Activity['transportMode'],
  });

  const toggleDay = (day: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getTransportIcon = (mode?: string) => {
    switch (mode) {
      case 'flight':
        return <Plane className="w-4 h-4" />;
      case 'train':
        return <Train className="w-4 h-4" />;
      case 'car':
      case 'taxi':
        return <Car className="w-4 h-4" />;
      case 'ferry':
        return <Ship className="w-4 h-4" />;
      case 'bike':
        return <Bike className="w-4 h-4" />;
      case 'walk':
        return <Footprints className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTransportColor = (mode?: string) => {
    switch (mode) {
      case 'flight':
        return '#38BDF8'; // Sky blue
      case 'train':
        return '#A78BFA'; // Purple
      case 'car':
      case 'taxi':
        return '#FBBF24'; // Yellow
      case 'ferry':
        return '#22D3EE'; // Cyan
      case 'bike':
        return '#34D399'; // Green
      case 'walk':
        return '#9CA3AF'; // Gray
      default:
        return '#9CA3AF';
    }
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setEditForm({
      title: activity.title,
      time: activity.time,
      duration: activity.duration || '',
      transportMode: activity.transportMode,
    });
  };

  const handleSaveEdit = () => {
    // In a real app, this would update the state/backend
    console.log('Saving edit:', editForm);
    setEditingActivity(null);
  };

  const handleCancelEdit = () => {
    setEditingActivity(null);
    setEditForm({
      title: '',
      time: '',
      duration: '',
      transportMode: undefined,
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#0F1115]">
      {/* Header */}
      <div className="p-6 border-b border-[#262B36]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#F3F4F6]">Itinerary</h2>
          <button className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Ideas Section */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('ideas')}
            className="flex items-center gap-2 text-[#F3F4F6] hover:text-[#22C55E] transition-colors"
          >
            {expandedSections.has('ideas') ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">Ideas</span>
            <span className="text-[#6B7280] text-xs">{ideas.length} items</span>
          </button>

          {expandedSections.has('ideas') && (
            <div className="grid grid-cols-3 gap-3">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden group cursor-pointer hover:border-[#374151] transition-all"
                >
                  <div className="aspect-video relative">
                    <img
                      src={idea.image}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-white text-sm font-medium line-clamp-1">
                        {idea.title}
                      </h4>
                      <p className="text-white/80 text-xs">{idea.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#22C55E] text-sm transition-colors pl-6">
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Grocery Section */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('grocery')}
            className="flex items-center gap-2 text-[#F3F4F6] hover:text-[#22C55E] transition-colors"
          >
            {expandedSections.has('grocery') ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span className="text-sm font-medium uppercase tracking-wide text-xs text-[#9CA3AF]">
              GROCERY
            </span>
            <span className="text-[#6B7280] text-xs">3 items</span>
          </button>

          {expandedSections.has('grocery') && (
            <div className="pl-6 space-y-2">
              <p className="text-[#9CA3AF] text-sm">No items added yet</p>
            </div>
          )}
        </div>

        {/* Days */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((day) => (
          <div key={day} className="space-y-2">
            <button
              onClick={() => toggleDay(day)}
              className="flex items-center gap-2 text-[#F3F4F6] hover:text-[#22C55E] transition-colors"
            >
              {expandedDays.has(day) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">Day {day}</span>
            </button>

            {expandedDays.has(day) && (
              <div className="pl-6 space-y-3">
                {/* Lodging Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-[#9CA3AF] text-xs uppercase tracking-wide">Lodging</span>
                  </div>
                  {dayLodging[day] ? (
                    <button className="w-full bg-[#171A21] border border-[#262B36] rounded-lg p-3 hover:border-[#374151] transition-all text-left group/lodging">
                      <div className="flex items-center justify-between">
                        <span className="text-[#F3F4F6] text-sm">{dayLodging[day]}</span>
                        <Edit2 className="w-3.5 h-3.5 text-[#9CA3AF] opacity-0 group-hover/lodging:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ) : (
                    <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#22C55E] text-sm transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>Add lodging</span>
                    </button>
                  )}
                </div>

                {/* Activities */}
                {dayActivities[day] ? (
                  <>
                    {dayActivities[day].map((activity) => (
                      <div key={activity.id} className="group">
                        <div className="flex items-start gap-3">
                          <div className="text-[#9CA3AF] text-sm w-16 flex-shrink-0 pt-1">
                            {activity.time}
                          </div>
                          <div className="flex-1">
                            <div 
                              onClick={() => handleEditActivity(activity)}
                              className={`border rounded-lg p-3 hover:border-[#374151] transition-all cursor-pointer relative group/card ${
                                activity.type === 'transport' 
                                  ? 'bg-[#0F1115] border-dashed border-[#374151]' 
                                  : 'bg-[#171A21] border-[#262B36]'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {activity.transportMode && (
                                  <div 
                                    className="flex-shrink-0"
                                    style={{ color: getTransportColor(activity.transportMode) }}
                                  >
                                    {getTransportIcon(activity.transportMode)}
                                  </div>
                                )}
                                <div className="flex-1">
                                  <span className="text-[#F3F4F6] text-sm">
                                    {activity.title}
                                  </span>
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditActivity(activity);
                                  }}
                                  className="opacity-0 group-hover/card:opacity-100 transition-opacity text-[#9CA3AF] hover:text-[#F3F4F6]"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            {activity.duration && (
                              <div className="flex justify-center mt-1 group/duration">
                                <div 
                                  className={`w-px ${
                                    activity.type === 'transport' ? 'h-8 bg-[#374151]' : 'h-6 bg-[#262B36]'
                                  }`}
                                  style={activity.type === 'transport' ? {
                                    backgroundImage: 'repeating-linear-gradient(0deg, #374151, #374151 4px, transparent 4px, transparent 8px)'
                                  } : {}}
                                ></div>
                              </div>
                            )}
                            {activity.duration && (
                              <div className="flex justify-center">
                                <button className="text-[#6B7280] text-xs hover:text-[#22C55E] transition-colors px-2 py-1 rounded hover:bg-[#171A21] flex items-center gap-1.5 group/btn">
                                  {activity.transportMode && (
                                    <div 
                                      className="flex-shrink-0 opacity-60"
                                      style={{ color: getTransportColor(activity.transportMode) }}
                                    >
                                      {getTransportIcon(activity.transportMode)}
                                    </div>
                                  )}
                                  <span>{activity.duration}</span>
                                  <Edit2 className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#22C55E] text-sm transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>Add activity</span>
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-[#6B7280] text-sm">No activities planned</p>
                    <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#22C55E] text-sm transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>Add activity</span>
                    </button>
                  </>
                )}
              </div>
            )}

            {!expandedDays.has(day) && (
              <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#22C55E] text-sm transition-colors pl-6">
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingActivity && (() => {
        // Generate relevant media based on activity title
        const getRelevantMedia = () => {
          const title = editingActivity.title.toLowerCase();
          
          if (title.includes('hotel') || title.includes('zephyr') || title.includes('lodging')) {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb218ZW58MXx8fHwxNzczMDIxMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Hotel Zephyr Room Tour' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb218ZW58MXx8fHwxNzczMDIxMTUxfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Luxury Suite View' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb218ZW58MXx8fHwxNzczMDIxMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Hotel Amenities' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb218ZW58MXx8fHwxNzczMDIxMTUxfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Waterfront Location' },
            ];
          } else if (title.includes('tartine') || title.includes('bakery') || title.includes('dinner') || title.includes('lunch')) {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1635169705517-a60f2cb18445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJ0aW5lJTIwYmFrZXJ5JTIwZm9vZHxlbnwxfHx8fDE3NzMxNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Tartine Bakery Interior' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1635169705517-a60f2cb18445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJ0aW5lJTIwYmFrZXJ5JTIwZm9vZHxlbnwxfHx8fDE3NzMxNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Signature Pastries' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1661357748296-bdc3a07d9baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW4lMjBmcmFuY2lzY28lMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MzE0MjMzNnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Menu Highlights' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1635169705517-a60f2cb18445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJ0aW5lJTIwYmFrZXJ5JTIwZm9vZHxlbnwxfHx8fDE3NzMxNDIzMzV8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Cozy Atmosphere' },
            ];
          } else if (title.includes('golden gate') || title.includes('bridge')) {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Golden Gate Bridge Views' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Best Photo Spots' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Walking Across' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Sunset Views' },
            ];
          } else if (title.includes('sausalito')) {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1657930070252-9bfe8414db7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVzYWxpdG8lMjBjYWxpZm9ybmlhJTIwd2F0ZXJmcm9udHxlbnwxfHx8fDE3NzMxNDIzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Sausalito Waterfront' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1657930070252-9bfe8414db7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVzYWxpdG8lMjBjYWxpZm9ybmlhJTIwd2F0ZXJmcm9udHxlbnwxfHx8fDE3NzMxNDIzNDB8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Harbor Views' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1661357748296-bdc3a07d9baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW4lMjBmcmFuY2lzY28lMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MzE0MjMzNnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Dining Options' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1657930070252-9bfe8414db7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVzYWxpdG8lMjBjYWxpZm9ybmlhJTIwd2F0ZXJmcm9udHxlbnwxfHx8fDE3NzMxNDIzNDB8MA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Art Galleries' },
            ];
          } else if (title.includes('flight') || title.includes('airport')) {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1574444851660-e549a835d4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhaXJwb3J0JTIwZmxpZ2h0fGVufDF8fHx8MTc3MzE0MjMzNnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Airport Guide' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1574444851660-e549a835d4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhaXJwb3J0JTIwZmxpZ2h0fGVufDF8fHx8MTc3MzE0MjMzNnww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Terminal Info' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1574444851660-e549a835d4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhaXJwb3J0JTIwZmxpZ2h0fGVufDF8fHx8MTc3MzE0MjMzNnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Flight Tips' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1574444851660-e549a835d4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhaXJwb3J0JTIwZmxpZ2h0fGVufDF8fHx8MTc3MzE0MjMzNnww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Lounge Access' },
            ];
          } else if (title.includes('bike')) {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1733304194390-b2e352a03734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWtlJTIwcmlkZSUyMGNpdHl8ZW58MXx8fHwxNzczMTQyMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Bike Route Preview' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1733304194390-b2e352a03734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWtlJTIwcmlkZSUyMGNpdHl8ZW58MXx8fHwxNzczMTQyMzM3fDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Scenic Stops' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1733304194390-b2e352a03734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWtlJTIwcmlkZSUyMGNpdHl8ZW58MXx8fHwxNzczMTQyMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Bike Rental Tips' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1733304194390-b2e352a03734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWtlJTIwcmlkZSUyMGNpdHl8ZW58MXx8fHwxNzczMTQyMzM3fDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Safety Guidelines' },
            ];
          } else if (title.includes('ferry')) {
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1548257604-5d6881820b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBiYXl8ZW58MXx8fHwxNzczMTQyMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Ferry Ride Experience' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1548257604-5d6881820b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBiYXl8ZW58MXx8fHwxNzczMTQyMzQwfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Bay Views' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1548257604-5d6881820b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBiYXl8ZW58MXx8fHwxNzczMTQyMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Boarding Guide' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1548257604-5d6881820b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBiYXl8ZW58MXx8fHwxNzczMTQyMzQwfDA&ixlib=rb-4.1.0&q=80&w=400', caption: 'Deck Views' },
            ];
          } else {
            // Default media for other activities
            return [
              { id: '1', type: 'video' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Experience Preview' },
              { id: '2', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Highlights' },
              { id: '3', type: 'video' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Local Tips' },
              { id: '4', type: 'photo' as const, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlfGVufDF8fHx8MTc3MzE0MjMzNXww&ixlib=rb-4.1.0&q=80&w=400', caption: 'Best Times to Visit' },
            ];
          }
        };

        const relevantMedia = getRelevantMedia();

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-[#171A21] border border-[#262B36] rounded-2xl w-full max-w-6xl shadow-2xl flex overflow-hidden h-[90vh]">
              {/* Left Side - Edit Form */}
              <div className="w-2/5 flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-[#262B36] flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#F3F4F6]">
                      Edit {editingActivity.type === 'transport' ? 'Transport' : 'Activity'}
                    </h3>
                    <p className="text-[#9CA3AF] text-sm mt-1">
                      Update the details for this item
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
                      Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                      placeholder="Enter activity title"
                    />
                  </div>

                  {/* Time Field */}
                  <div className="space-y-2">
                    <label className="text-[#F3F4F6] text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#22C55E]" />
                      Start Time
                    </label>
                    <input
                      type="text"
                      value={editForm.time}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                      placeholder="e.g. 9:00am"
                    />
                  </div>

                  {/* Duration Field */}
                  <div className="space-y-2">
                    <label className="text-[#F3F4F6] text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#22C55E]" />
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editForm.duration}
                      onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                      placeholder="e.g. 1h 30m"
                    />
                  </div>

                  {/* Transport Mode Field (only for transport activities) */}
                  {editingActivity.type === 'transport' && (
                    <div className="space-y-2">
                      <label className="text-[#F3F4F6] text-sm font-medium flex items-center gap-2">
                        <Car className="w-4 h-4 text-[#22C55E]" />
                        Transport Mode
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['flight', 'train', 'car', 'ferry', 'bike', 'walk'].map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setEditForm({ ...editForm, transportMode: mode as Activity['transportMode'] })}
                            className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 ${
                              editForm.transportMode === mode
                                ? 'bg-[#22C55E]/10 text-[#22C55E] border-2 border-[#22C55E]'
                                : 'bg-[#0F1115] text-[#9CA3AF] border-2 border-[#262B36] hover:border-[#374151]'
                            }`}
                          >
                            <span
                              style={{ color: editForm.transportMode === mode ? '#22C55E' : getTransportColor(mode) }}
                            >
                              {getTransportIcon(mode)}
                            </span>
                            <span className="capitalize">{mode}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-[#262B36] flex items-center justify-end gap-3">
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-2.5 bg-[#0F1115] border border-[#262B36] text-[#F3F4F6] rounded-lg hover:border-[#374151] transition-all text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-6 py-2.5 bg-[#22C55E] text-[#0F1115] rounded-lg hover:bg-[#1DB954] transition-all text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Right Side - Related Media */}
              <div className="w-3/5 bg-[#0F1115] border-l border-[#262B36] flex flex-col">
                {/* Media Header */}
                <div className="p-6 border-b border-[#262B36]">
                  <h4 className="text-lg font-semibold text-[#F3F4F6]">Related Media</h4>
                  <p className="text-[#9CA3AF] text-sm mt-1">
                    Videos and photos for {editingActivity.title}
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

                  {/* Empty State */}
                  {relevantMedia.length === 0 && (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-[#6B7280] mx-auto mb-3" />
                        <p className="text-[#6B7280] text-sm">No media available</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}