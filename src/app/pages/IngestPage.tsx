import { useState } from 'react';
import { Link as LinkIcon, Play } from 'lucide-react';
import { useNavigate } from 'react-router';

const exampleVideos = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1656677476420-7159cac2366a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzczMDIzODU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Santorini Sunset',
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1629020818550-166029f996c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldCUyMGphcGFufGVufDF8fHx8MTc3MzAzNDI5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Tokyo Streets',
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc3MzAxMzAxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Paris Views',
  },
];

export default function IngestPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (videoUrl.trim()) {
      navigate('/analysis');
    }
  };

  const handleExampleClick = () => {
    navigate('/analysis');
  };

  return (
    <div className="min-h-screen bg-[#0F1115] flex flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-[800px] space-y-16">
        {/* Input Section */}
        <div className="space-y-4">
          <p className="text-[#9CA3AF] text-sm text-center">
            Drop Instagram / TikTok link here
          </p>
          
          <div className="flex items-center gap-3 bg-[#171A21] border border-[#374151] rounded-xl px-6 py-4">
            <LinkIcon className="w-5 h-5 text-[#6B7280]" />
            <input 
              type="text" 
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="https://instagram.com/reel/..."
              className="bg-transparent border-none outline-none text-[#F3F4F6] flex-1 placeholder:text-[#6B7280]"
            />
          </div>

          {videoUrl && (
            <button
              onClick={handleAnalyze}
              className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-[#0F1115] px-6 py-3.5 rounded-xl font-medium transition-colors"
            >
              Analyze Video
            </button>
          )}
        </div>

        {/* Example Videos */}
        <div className="space-y-6">
          <p className="text-[#9CA3AF] text-sm text-center">
            explore other videos
          </p>
          
          <div className="grid grid-cols-3 gap-6">
            {exampleVideos.map((video) => (
              <button
                key={video.id}
                onClick={handleExampleClick}
                className="group relative bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden aspect-[3/4] hover:border-[#374151] transition-all"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#0F1115] fill-current ml-0.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
