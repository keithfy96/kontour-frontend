import { useState } from 'react';
import imgImage43 from "../../assets/travel-analysis-step-1.jpg";
import imgImage45 from "../../assets/travel-analysis-step-2.jpg";
import imgImage46 from "../../assets/travel-analysis-step-3.jpg";

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'users' | 'creators'>('users');

  const userSteps = [
    {
      number: 1,
      title: "Drop Instagram / TikTok video",
      description: "Paste any travel video link from Instagram or TikTok",
      image: imgImage43
    },
    {
      number: 2,
      title: "Save relevant locations to a collection or to a trip",
      description: "Bookmark places you love and organize them into trips",
      image: imgImage45
    },
    {
      number: 3,
      title: "Add locations / videos to trip",
      description: "Build your perfect itinerary with discovered places",
      image: imgImage46
    },
    {
      number: 4,
      title: "Use AI to plan itinerary",
      description: "Let AI optimize your route and schedule for the best experience"
    },
    {
      number: 5,
      title: "Book trip",
      description: "Complete your booking and get ready for adventure"
    }
  ];

  return (
    <section className="py-24 px-8 bg-[#0F1115]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Title */}
        <h2 className="text-[96px] font-semibold text-[#F3F4F6] text-center mb-16 tracking-[-2px]">
          How it works
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'users' 
                ? 'bg-[#22C55E] text-[#0F1115]' 
                : 'bg-[#171A21] text-[#9CA3AF] hover:bg-[#1F2430]'
            }`}
          >
            Users
          </button>
          <button 
            onClick={() => setActiveTab('creators')}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'creators' 
                ? 'bg-[#22C55E] text-[#0F1115]' 
                : 'bg-[#171A21] text-[#9CA3AF] hover:bg-[#1F2430]'
            }`}
          >
            Creators
          </button>
        </div>

        {/* Steps */}
        {activeTab === 'users' && (
          <div className="space-y-24">
            {userSteps.map((step, index) => (
              <div 
                key={step.number}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#22C55E]/10 text-[#22C55E] font-semibold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#F3F4F6]">
                    {step.title}
                  </h3>
                  <p className="text-[#9CA3AF]">
                    {step.description}
                  </p>
                </div>

                {/* Image */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  {step.image ? (
                    <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] aspect-video flex items-center justify-center">
                      <div className="text-[#6B7280] text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                          <span className="text-2xl">{step.number}</span>
                        </div>
                        <p className="text-sm">Illustration coming soon</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'creators' && (
          <div className="text-center py-24">
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-3xl font-semibold text-[#F3F4F6]">
                Earn from your travel content
              </h3>
              <p className="text-[#9CA3AF] text-lg">
                Share your travel experiences and get rewarded when travelers use your videos to plan their trips. Turn your adventures into a revenue stream.
              </p>
              <button className="bg-[#22C55E] hover:bg-[#16A34A] text-[#0F1115] px-8 py-4 rounded-lg font-medium transition-colors mt-8">
                Join as Creator
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
