import { Eye, Sparkles, ScrollText, TrendingUp } from 'lucide-react';

export function CoreIdeas() {
  const ideas = [
    {
      icon: Eye,
      title: "Visual first platform for planning travel",
      description: "Most travel apps expect you to read a bunch of text in order to find out what to do. Kontour takes a visual first approach, allowing you to get a taste of what you will experience"
    },
    {
      icon: Sparkles,
      title: "Keep the fun parts of planning",
      description: "Everyone likes to discover things to do, no one likes arranging the logistics. Kontour handles the annoying logistics, booking the trips, optimising the itinerary so you get the most out of your trips"
    },
    {
      icon: ScrollText,
      title: "Doom scroll your next trip",
      description: "Planning your trip should be as seamless as doomscrolling Instagram. You're already doing it, why not plan your holiday while you're at it?"
    },
    {
      icon: TrendingUp,
      title: "Earn from your trips",
      description: "Post your trips and when people send us your videos to plan their trips we give you a share for recommending great places and experiences"
    }
  ];

  return (
    <section className="py-24 px-8 bg-[#171A21]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Title */}
        <h2 className="text-[96px] font-semibold text-[#F3F4F6] text-center mb-20 tracking-[-2px]">
          Our Core Ideas
        </h2>

        {/* Ideas Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {ideas.map((idea, index) => (
            <div 
              key={index}
              className="bg-[#1F2430] border border-[#262B36] rounded-xl p-8 hover:bg-[#252B3A] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#22C55E]/20 transition-colors">
                  <idea.icon className="w-6 h-6 text-[#22C55E]" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-xl font-semibold text-[#F3F4F6]">
                    {idea.title}
                  </h3>
                  <p className="text-[#9CA3AF] leading-relaxed">
                    {idea.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
