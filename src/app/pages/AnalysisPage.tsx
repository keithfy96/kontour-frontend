import { useState } from 'react';
import { ArrowLeft, MapPin, Star, Check, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { SaveModal } from '../components/SaveModal';

interface DetectedLocation {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  timestamp: string;
}

const mockLocations: DetectedLocation[] = [
  {
    id: '1',
    name: 'Shibuya Crossing',
    location: 'Tokyo, Japan',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1629020818550-166029f996c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldCUyMGphcGFufGVufDF8fHx8MTc3MzAzNDI5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '0:23'
  },
  {
    id: '2',
    name: 'Fushimi Inari Shrine',
    location: 'Kyoto, Japan',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1717496376319-ee3d354ac2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMHRlbXBsZSUyMGphcGFufGVufDF8fHx8MTc3MzA2OTIxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '1:45'
  },
  {
    id: '3',
    name: 'Eiffel Tower',
    location: 'Paris, France',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc3MzAxMzAxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '2:10'
  },
  {
    id: '4',
    name: 'Santorini Sunset',
    location: 'Santorini, Greece',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1656677476420-7159cac2366a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzczMDIzODU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '3:42'
  }
];

export default function AnalysisPage() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showSaveModal, setShowSaveModal] = useState(false);

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSave = () => {
    if (selectedIds.size > 0) {
      setShowSaveModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <div className="border-b border-[#262B36] bg-[#0F1115]">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="text-[#F3F4F6]">
            <span className="text-[#6B7280]">Analyzing:</span> instagram.com/reel/xyz123
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Video Player */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#F3F4F6]">Video Analysis</h2>
            <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] overflow-hidden aspect-[9/16] max-w-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="w-full h-full bg-gradient-to-br from-[#1F2430] to-[#171A21] flex flex-col items-center justify-center p-8">
                <div className="w-20 h-20 rounded-full bg-[#22C55E]/10 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-[#22C55E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-[#F3F4F6] font-medium mb-2">
                  Travel Video
                </p>
                <p className="text-[#6B7280] text-sm text-center">
                  Click detected locations to jump to timestamp
                </p>
              </div>
            </div>
          </div>

          {/* Detected Locations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#F3F4F6]">
                Detected Locations
              </h2>
              <span className="text-[#6B7280] text-sm">
                {selectedIds.size} selected
              </span>
            </div>

            {/* Locations List */}
            <div className="space-y-3">
              {mockLocations.map((location) => {
                const isSelected = selectedIds.has(location.id);
                return (
                  <div
                    key={location.id}
                    onClick={() => toggleSelection(location.id)}
                    className={`relative bg-[#171A21] border rounded-xl overflow-hidden cursor-pointer transition-all group ${
                      isSelected 
                        ? 'border-[#22C55E] shadow-[0_0_0_2px_rgba(34,197,94,0.2)]' 
                        : 'border-[#262B36] hover:border-[#374151] hover:bg-[#1F2430]'
                    }`}
                  >
                    {/* Selection Indicator */}
                    <div className={`absolute top-3 right-3 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-[#22C55E] border-[#22C55E]' 
                        : 'bg-[#171A21] border-[#374151] group-hover:border-[#6B7280]'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-[#0F1115]" />}
                    </div>

                    <div className="flex gap-4 p-4">
                      {/* Thumbnail */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={location.image} 
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <h3 className="text-[#F3F4F6] font-medium truncate">
                          {location.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{location.location}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-[#FBBF24]">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm text-[#F3F4F6]">{location.rating}</span>
                          </div>
                          <span className="text-[#6B7280] text-sm">
                            @ {location.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={selectedIds.size === 0}
              className={`w-full py-3.5 rounded-xl font-medium transition-all ${
                selectedIds.size > 0
                  ? 'bg-[#22C55E] hover:bg-[#16A34A] text-[#0F1115] shadow-[0_10px_30px_rgba(34,197,94,0.25)]'
                  : 'bg-[#1F2430] text-[#6B7280] cursor-not-allowed'
              }`}
            >
              Save Selected ({selectedIds.size})
            </button>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <SaveModal 
          selectedCount={selectedIds.size}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}