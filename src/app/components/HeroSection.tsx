import { Link } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function HeroSection() {
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (videoUrl.trim()) {
      navigate('/analysis');
    }
  };

  return (
    <section className="pt-[120px] pb-24 px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Hero content */}
          <div className="space-y-8">
            <h1 className="text-[56px] font-semibold leading-[1.1] tracking-[-1px] text-[#F3F4F6]">
              Plan your trip through videos
            </h1>
            
            <p className="text-[#9CA3AF] text-base max-w-[560px]">
              Drop an Instagram / TikTok link to get your video analyzed and discover amazing places for your next adventure
            </p>

            {/* Video URL Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-[#171A21] border border-[#374151] rounded-xl px-4 py-3.5">
                <Link className="w-5 h-5 text-[#6B7280]" />
                <input 
                  type="text" 
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste Instagram or TikTok video link..."
                  className="bg-transparent border-none outline-none text-[#F3F4F6] text-sm flex-1 placeholder:text-[#6B7280]"
                />
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleAnalyze}
                  className="bg-[#22C55E] hover:bg-[#16A34A] text-[#0F1115] px-6 py-3.5 rounded-lg font-medium transition-colors flex-1"
                >
                  Analyze Video
                </button>
                <button className="bg-[#1F2430] hover:bg-[#262B36] border border-[#374151] text-[#E5E7EB] px-6 py-3.5 rounded-lg font-medium transition-colors">
                  Browse Examples
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Video preview placeholder */}
          <div className="relative">
            <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] overflow-hidden aspect-[9/16] max-w-[300px] mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="w-full h-full bg-gradient-to-br from-[#1F2430] to-[#171A21] flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#22C55E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-[#9CA3AF] text-sm text-center">
                  Video preview will appear here
                </p>
                <p className="text-[#6B7280] text-xs text-center mt-2">
                  Paste a link to see the magic
                </p>
              </div>
            </div>
            
            {/* Floating accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#22C55E]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}