import { useState } from 'react';
import { ChevronDown, Play, ArrowLeft, ChevronUp, User } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  author: string;
  activity?: string;
  isFriend: boolean;
}

const mediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBnYXRlJTIwYnJpZGdlJTIwc2VsZmllfGVufDF8fHx8MTc3MzA4NDA5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Sarah Chen',
    activity: 'Golden Gate Bridge viewpoint',
    isFriend: true,
  },
  {
    id: '2',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW4lMjBmcmFuY2lzY28lMjBjaXR5JTIwdmlld3xlbnwxfHx8fDE3NzMwODQxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Mike Johnson',
    activity: 'Breakfast at Tartine Bakery',
    isFriend: false,
  },
  {
    id: '3',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWVyJTIwMzklMjBzZWElMjBsaW9uc3xlbnwxfHx8fDE3NzMwODQxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Emma Davis',
    activity: 'Visit Pier 39',
    isFriend: true,
  },
  {
    id: '4',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGNhdHJheiUyMGlzbGFuZCUyMHRvdXJ8ZW58MXx8fHwxNzczMDg0MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'James Lee',
    activity: 'Ferry to Alcatraz Island',
    isFriend: false,
  },
  {
    id: '5',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW4lMjBmcmFuY2lzY28lMjBmb29kfGVufDF8fHx8MTc3MzA4NDE1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Lisa Park',
    activity: 'Lunch at Boudin Bakery',
    isFriend: true,
  },
  {
    id: '6',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoZXJtYW5zJTIwd2hhcmYlMjBzZWFmb29kfGVufDF8fHx8MTc3MzA4NDE3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Tom Wilson',
    activity: 'Walk to Fishermans Wharf',
    isFriend: false,
  },
  {
    id: '7',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW9uJTIwZGlzdHJpY3QlMjBtdXJhbHN8ZW58MXx8fHwxNzczMDg0MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Maya Rodriguez',
    activity: 'Explore Mission District',
    isFriend: true,
  },
  {
    id: '8',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVzYWxpdG8lMjBjYWxpZm9ybmlhJTIwYmF5fGVufDF8fHx8MTc3MzA4NDIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Alex Kim',
    activity: 'Lunch in Sausalito',
    isFriend: false,
  },
  {
    id: '9',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJsZSUyMGNhciUyMHNhbiUyMGZyYW5jaXNjb3xlbnwxfHx8fDE3NzMwODQyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Rachel Green',
    activity: 'Cable Car ride',
    isFriend: true,
  },
];

export function MediaPanel() {
  const [filterType, setFilterType] = useState<'all' | 'friends' | 'activity'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showVideoViewer, setShowVideoViewer] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Get all videos for the viewer
  const allVideos = mediaItems.filter(item => item.type === 'video');

  const filteredMedia = mediaItems.filter((item) => {
    if (filterType === 'friends') return item.isFriend;
    if (filterType === 'activity') return item.activity;
    return true;
  });

  const handleItemClick = (item: MediaItem) => {
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
            <span className="text-sm font-medium">Back to Media</span>
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
                  alt={currentVideo.activity || `Video by ${currentVideo.author}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-[#0F1115] ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Friend Badge */}
                {currentVideo.isFriend && (
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#22C55E]/80 backdrop-blur-md flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      <span>Friend</span>
                    </div>
                  </div>
                )}

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                  <p className="text-white text-lg font-semibold mb-2">{currentVideo.author}</p>
                  {currentVideo.activity && (
                    <p className="text-white/80 text-sm">{currentVideo.activity}</p>
                  )}
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
        <h2 className="text-xl font-semibold text-[#F3F4F6]">Media</h2>

        {/* Sort and Filter Controls */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 bg-[#171A21] border border-[#262B36] rounded-lg px-3 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm"
            >
              <span>Sort</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-[#171A21] border border-[#262B36] rounded-lg shadow-xl z-10 overflow-hidden">
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
              </div>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                filterType === 'all'
                  ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]'
                  : 'bg-[#171A21] text-[#9CA3AF] border border-[#262B36] hover:text-[#F3F4F6]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('activity')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                filterType === 'activity'
                  ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]'
                  : 'bg-[#171A21] text-[#9CA3AF] border border-[#262B36] hover:text-[#F3F4F6]'
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => setFilterType('friends')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                filterType === 'friends'
                  ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]'
                  : 'bg-[#171A21] text-[#9CA3AF] border border-[#262B36] hover:text-[#F3F4F6]'
              }`}
            >
              Friends
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="aspect-square bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden group cursor-pointer hover:border-[#374151] transition-all relative"
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.url}
                alt={`Media by ${item.author}`}
                className="w-full h-full object-cover"
              />

              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#0F1115] ml-1" fill="currentColor" />
                  </div>
                </div>
              )}

              {/* Overlay info on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-white text-sm font-medium">{item.author}</p>
                {item.activity && (
                  <p className="text-white/80 text-xs line-clamp-1">{item.activity}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-[#6B7280] text-sm">No media found</p>
          </div>
        )}
      </div>
    </div>
  );
}