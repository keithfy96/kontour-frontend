import { Search } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F1115] border-b border-[#262B36]">
      <div className="max-w-[1280px] mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
            <span className="font-semibold text-[#0F1115]">K</span>
          </div>
          <span className="text-[#F3F4F6] font-semibold text-lg">Kontour</span>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center gap-3 bg-[#171A21] border border-[#374151] rounded-xl px-4 py-2.5 w-[400px]">
          <Search className="w-4 h-4 text-[#6B7280]" />
          <input 
            type="text" 
            placeholder="Search destinations..."
            className="bg-transparent border-none outline-none text-[#F3F4F6] text-sm flex-1 placeholder:text-[#6B7280]"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
            Login
          </button>
          <button className="bg-[#22C55E] hover:bg-[#16A34A] text-[#0F1115] px-5 py-2.5 rounded-lg font-medium text-sm transition-colors">
            Plan a trip
          </button>
        </div>
      </div>
    </nav>
  );
}
