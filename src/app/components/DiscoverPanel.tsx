import { useState } from 'react';
import { ChevronDown, Play, MapPin, Heart, Share2, Bookmark, ArrowLeft, ChevronUp } from 'lucide-react';

interface DiscoverItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  title: string;
  location: string;
  category: 'food' | 'nature' | 'adventure' | 'culture' | 'nightlife' | 'hidden-gems';
  likes: number;
  isLiked: boolean;
}

const discoverItems: DiscoverItem[] = [
  {
    id: '1',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlJTIwc3Vuc2V0fGVufDF8fHx8MTc3MzA4NDA5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Golden Gate Bridge at Sunset',
    location: 'San Francisco, CA',
    category: 'nature',
    likes: 1243,
    isLiked: false,
  },
  {
    id: '2',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc3MzA4NDExMHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Best Burgers in the Bay',
    location: 'Mission District',
    category: 'food',
    likes: 892,
    isLiked: true,
  },
  {
    id: '3',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NzMwODQxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Hiking Trail at Mount Tamalpais',
    location: 'Marin County, CA',
    category: 'adventure',
    likes: 567,
    isLiked: false,
  },
  {
    id: '4',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2cgcGF0Y2glMjBzYW4lMjBmcmFuY2lzY288ZW58MXx8fHwxNzczMDg0MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Colorful Street Art',
    location: 'Clarion Alley',
    category: 'culture',
    likes: 2104,
    isLiked: true,
  },
  {
    id: '5',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhcnxlbnwxfHx8fDE3NzMwODQxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Hidden Speakeasy Bar',
    location: 'North Beach',
    category: 'nightlife',
    likes: 734,
    isLiked: false,
  },
  {
    id: '6',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGxhdHRlcnxlbnwxfHx8fDE3NzMwODQxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Fresh Seafood at the Wharf',
    location: 'Fisherman\'s Wharf',
    category: 'food',
    likes: 1523,
    isLiked: false,
  },
  {
    id: '7',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc3MzA4NDE4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Secret Coffee Roastery',
    location: 'Dogpatch',
    category: 'hidden-gems',
    likes: 412,
    isLiked: true,
  },
  {
    id: '8',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1552083974-186346191183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW4lMjBmcmFuY2lzY28lMjBwYXJrfGVufDF8fHx8MTc3MzA4NDIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Hidden Gardens of Presidio',
    location: 'Presidio',
    category: 'hidden-gems',
    likes: 298,
    isLiked: false,
  },
  {
    id: '9',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW4lMjBmcmFuY2lzY28lMjBtdXNldW18ZW58MXx8fHwxNzczMDg0MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Modern Art Museum',
    location: 'SFMOMA',
    category: 'culture',
    likes: 1876,
    isLiked: false,
  },
  {
    id: '10',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwdmlld3xlbnwxfHx8fDE3NzMwODQyMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Lands End Coastal Trail',
    location: 'Lands End',
    category: 'nature',
    likes: 945,
    isLiked: true,
  },
  {
    id: '11',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGlubmVyfGVufDF8fHx8MTc3MzA4NDI0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Michelin Star Dining',
    location: 'Nob Hill',
    category: 'food',
    likes: 2341,
    isLiked: false,
  },
  {
    id: '12',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXlha2luZyUyMHdhdGVyfGVufDF8fHx8MTc3MzA4NDI1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Kayaking on the Bay',
    location: 'McCovey Cove',
    category: 'adventure',
    likes: 687,
    isLiked: false,
  },
  {
    id: '13',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGNsdWIlMjBsaWdodHN8ZW58MXx8fHwxNzczMDg0MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Electronic Music Nightclub',
    location: 'SoMa',
    category: 'nightlife',
    likes: 1456,
    isLiked: true,
  },
  {
    id: '14',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXJrZXR8ZW58MXx8fHwxNzczMDg0Mjg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Ferry Plaza Farmers Market',
    location: 'Embarcadero',
    category: 'food',
    likes: 823,
    isLiked: false,
  },
  {
    id: '15',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBhbm9yYW1hfGVufDF8fHx8MTc3MzA4NDMwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Twin Peaks Panorama View',
    location: 'Twin Peaks',
    category: 'nature',
    likes: 2765,
    isLiked: true,
  },
];

export function DiscoverPanel() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'food' | 'nature' | 'adventure' | 'culture' | 'nightlife' | 'hidden-gems'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(
    new Set(discoverItems.filter(item => item.isLiked).map(item => item.id))
  );
  const [showVideoViewer, setShowVideoViewer] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Get all videos for the viewer
  const allVideos = discoverItems.filter(item => item.type === 'video');

  const filteredItems = discoverItems.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    return 0; // For 'recent', keep original order
  });

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedItems(newLiked);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food':
        return '#F59E0B'; // Amber
      case 'nature':
        return '#22C55E'; // Green
      case 'adventure':
        return '#EF4444'; // Red
      case 'culture':
        return '#A78BFA'; // Purple
      case 'nightlife':
        return '#EC4899'; // Pink
      case 'hidden-gems':
        return '#38BDF8'; // Sky blue
      default:
        return '#9CA3AF';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'hidden-gems':
        return 'Hidden Gems';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const handleItemClick = (item: DiscoverItem) => {
    if (item.type === 'video') {
      // Find the index of this video in the allVideos array
      const videoIndex = allVideos.findIndex(v => v.id === item.id);
      setCurrentVideoIndex(videoIndex);
      setShowVideoViewer(true);
    }
  };

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!showVideoViewer) return;
    
    e.preventDefault();
    
    if (e.deltaY > 0) {
      // Scroll down - next video
      setCurrentVideoIndex(prev => (prev < allVideos.length - 1 ? prev + 1 : prev));
    } else {
      // Scroll up - previous video
      setCurrentVideoIndex(prev => (prev > 0 ? prev - 1 : prev));
    }
  };

  // If video viewer is open, show it instead of the grid
  if (showVideoViewer) {
    const currentVideo = allVideos[currentVideoIndex];
    
    return (
      <div className="h-full flex flex-col bg-[#0F1115]" onWheel={handleScroll}>
        {/* Video Viewer Header */}
        <div className="p-4 border-b border-[#262B36] flex items-center justify-between">
          <button
            onClick={() => setShowVideoViewer(false)}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Discover</span>
          </button>
          <span className="text-[#6B7280] text-sm">
            {currentVideoIndex + 1} / {allVideos.length}
          </span>
        </div>

        {/* Video Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="h-full flex flex-col items-center justify-center p-6 space-y-6">
            {/* Video Card */}
            <div className="w-full max-w-sm">
              <div className="aspect-[9/16] bg-[#171A21] border border-[#262B36] rounded-2xl overflow-hidden relative group">
                <img
                  src={currentVideo.url}
                  alt={currentVideo.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-[#0F1115] ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white backdrop-blur-md"
                    style={{
                      backgroundColor: `${getCategoryColor(currentVideo.category)}DD`,
                    }}
                  >
                    {getCategoryLabel(currentVideo.category)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button
                    onClick={() => toggleLike(currentVideo.id)}
                    className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex flex-col items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        likedItems.has(currentVideo.id) ? 'text-[#EF4444] fill-current' : 'text-white'
                      }`}
                    />
                    <span className="text-white text-[10px] font-medium mt-0.5">
                      {currentVideo.likes > 999 ? `${(currentVideo.likes / 1000).toFixed(1)}K` : currentVideo.likes}
                    </span>
                  </button>
                  
                  <button className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Bookmark className="w-6 h-6 text-white" />
                  </button>
                  
                  <button className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                  <h3 className="text-white text-lg font-semibold mb-2">{currentVideo.title}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{currentVideo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Instructions */}
            <div className="flex flex-col items-center gap-2 text-[#6B7280] text-sm">
              <ChevronUp className="w-5 h-5 animate-bounce" />
              <p>Scroll to view more videos</p>
            </div>

            {/* Video Navigation Indicators */}
            <div className="flex items-center gap-2">
              {allVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentVideoIndex
                      ? 'bg-[#22C55E] w-6'
                      : 'bg-[#262B36] hover:bg-[#374151]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0F1115]">
      {/* Header */}
      <div className="p-6 border-b border-[#262B36] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#F3F4F6]">Discover</h2>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 bg-[#171A21] border border-[#262B36] rounded-lg px-3 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm"
            >
              <span>Sort</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSortDropdown && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-[#171A21] border border-[#262B36] rounded-lg shadow-xl z-10 overflow-hidden">
                <button
                  onClick={() => {
                    setSortBy('popular');
                    setShowSortDropdown(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                    sortBy === 'popular'
                      ? 'bg-[#22C55E]/10 text-[#22C55E]'
                      : 'text-[#9CA3AF] hover:bg-[#1F2430]'
                  }`}
                >
                  Most Popular
                </button>
                <button
                  onClick={() => {
                    setSortBy('recent');
                    setShowSortDropdown(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                    sortBy === 'recent'
                      ? 'bg-[#22C55E]/10 text-[#22C55E]'
                      : 'text-[#9CA3AF] hover:bg-[#1F2430]'
                  }`}
                >
                  Most Recent
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filterCategory === 'all'
                ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]'
                : 'bg-[#171A21] text-[#9CA3AF] border border-[#262B36] hover:text-[#F3F4F6]'
            }`}
          >
            All
          </button>
          {['food', 'nature', 'adventure', 'culture', 'nightlife', 'hidden-gems'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat as any)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]'
                  : 'bg-[#171A21] text-[#9CA3AF] border border-[#262B36] hover:text-[#F3F4F6]'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden group cursor-pointer hover:border-[#374151] transition-all relative"
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#0F1115] ml-1" fill="currentColor" />
                  </div>
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <div
                  className="px-2 py-1 rounded-md text-xs font-medium text-white backdrop-blur-sm"
                  style={{
                    backgroundColor: `${getCategoryColor(item.category)}CC`,
                  }}
                >
                  {getCategoryLabel(item.category)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedItems.has(item.id) ? 'text-[#EF4444] fill-current' : 'text-white'
                    }`}
                  />
                </button>
                <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                  <Bookmark className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white text-sm font-semibold mb-1">{item.title}</h3>
                <div className="flex items-center gap-1 text-white/80 text-xs mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <Heart className="w-3 h-3" />
                  <span>{item.likes.toLocaleString()} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-[#6B7280] text-sm">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
}