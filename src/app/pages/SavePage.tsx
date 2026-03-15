import { useState } from 'react';
import { ArrowLeft, MapPin, Star, Play, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import imgImg from "figma:asset/e07f581b6324e74a3f858c7d1da547ef31d3086a.png";
import imgImg1 from "figma:asset/8df04d92e4565dccfe5711ffe506463ca08704ca.png";
import imgImg2 from "figma:asset/7e2c5ceda5d40b1275ccf9709a17d82c1b166e77.png";
import imgImg3 from "figma:asset/b3d1078d53b5e6f7160af42d07356ba9b7d6e208.png";

interface DetectedLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  timestamp: string;
  image: string;
}

export default function SavePage() {
  const navigate = useNavigate();
  
  const [locations] = useState<DetectedLocation[]>([
    {
      id: '1',
      name: 'Shibuya Crossing',
      city: 'Tokyo',
      country: 'Japan',
      rating: 4.8,
      timestamp: '0:23',
      image: imgImg,
    },
    {
      id: '2',
      name: 'Fushimi Inari Shrine',
      city: 'Kyoto',
      country: 'Japan',
      rating: 4.9,
      timestamp: '1:45',
      image: imgImg1,
    },
    {
      id: '3',
      name: 'Eiffel Tower',
      city: 'Paris',
      country: 'France',
      rating: 4.7,
      timestamp: '2:10',
      image: imgImg2,
    },
    {
      id: '4',
      name: 'Santorini Sunset',
      city: 'Santorini',
      country: 'Greece',
      rating: 5.0,
      timestamp: '3:42',
      image: imgImg3,
    },
  ]);

  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set(['2', '3']));

  const toggleLocation = (id: string) => {
    const newSelected = new Set(selectedLocations);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedLocations(newSelected);
  };

  const handleSaveSelected = () => {
    console.log('Saving locations:', Array.from(selectedLocations));
    // Navigate to a save modal or next step
  };

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Top Header */}
      <div className="bg-[#0C0E11] px-24 py-4 flex items-center justify-between border-b border-[#1F2229]">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#AFA99E] hover:text-[#E1DFDB] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Back to Home</span>
        </button>
        
        <div className="text-base">
          <span className="text-[#9E9589]">Analyzing: </span>
          <span className="text-[#E1DFDB]">instagram.com/reel/xyz123</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-24 py-12">
        <div className="grid grid-cols-[500px_1fr] gap-12">
          {/* Left: Video Analysis */}
          <div>
            <h2 className="text-2xl font-semibold text-[#E1DFDB] mb-6">Video Analysis</h2>
            
            <div className="bg-[#12151A] rounded-[20px] border border-[#7D7467] p-0 overflow-hidden">
              <div className="aspect-[9/16] bg-[#1A1D24] relative flex items-center justify-center">
                {/* Video Player Placeholder */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-[#263B32] flex items-center justify-center">
                    <Play className="w-10 h-10 text-[#4AE081] fill-[#4AE081]" />
                  </div>
                  <p className="text-[#E1DFDB] text-base font-medium">Travel Video</p>
                  <p className="text-[#9E9589] text-sm text-center">
                    Click detected locations to jump to timestamp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detected Locations */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#E1DFDB]">Detected Locations</h2>
              <span className="text-sm text-[#9E9589]">{selectedLocations.size} selected</span>
            </div>

            <div className="space-y-4">
              {locations.map((location) => {
                const isSelected = selectedLocations.has(location.id);
                
                return (
                  <div
                    key={location.id}
                    onClick={() => toggleLocation(location.id)}
                    className={`
                      bg-[#12151A] rounded-[14px] border transition-all cursor-pointer
                      ${isSelected ? 'border-[#1B9E4C]' : 'border-[#7D7467] hover:border-[#AFA99E]'}
                    `}
                  >
                    <div className="p-4 flex items-start gap-4">
                      {/* Thumbnail */}
                      <div className="w-24 h-24 rounded-[10px] overflow-hidden flex-shrink-0">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-[#E1DFDB] mb-2 truncate">
                          {location.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-2 text-sm text-[#AFA99E]">
                          <MapPin className="w-4 h-4" />
                          <span>{location.city}, {location.country}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-[#FBC434] text-[#FBC434]" />
                            <span className="text-[#E1DFDB]">{location.rating}</span>
                          </div>
                          <span className="text-[#9E9589]">@ {location.timestamp}</span>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        <div
                          className={`
                            w-6 h-6 rounded-full border flex items-center justify-center transition-all
                            ${isSelected 
                              ? 'bg-[#1B9E4B] border-[#1B9E4C]' 
                              : 'bg-[#12151A] border-[#766D61]'
                            }
                          `}
                        >
                          {isSelected && <Check className="w-4 h-4 text-[#DDDAD5]" />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveSelected}
              disabled={selectedLocations.size === 0}
              className={`
                w-full mt-6 py-4 rounded-lg font-medium text-base transition-all
                ${selectedLocations.size > 0
                  ? 'bg-[#22C55E] text-white hover:bg-[#1EA952]'
                  : 'bg-[#1F2229] text-[#6B7280] cursor-not-allowed'
                }
              `}
            >
              Save Selected ({selectedLocations.size})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
