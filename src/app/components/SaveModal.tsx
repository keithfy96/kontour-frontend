import { useState } from 'react';
import { X, Plus, FolderOpen, Map, Check } from 'lucide-react';

interface SaveModalProps {
  selectedCount: number;
  onClose: () => void;
}

interface Collection {
  id: string;
  name: string;
  count: number;
}

interface Trip {
  id: string;
  name: string;
  dates: string;
  destinations: number;
}

const mockCollections: Collection[] = [
  { id: '1', name: 'Japan Inspiration', count: 12 },
  { id: '2', name: 'Summer 2026', count: 8 },
  { id: '3', name: 'Beach Destinations', count: 15 },
];

const mockTrips: Trip[] = [
  { id: '1', name: 'Tokyo Adventure', dates: 'May 2026', destinations: 5 },
  { id: '2', name: 'Europe Tour', dates: 'Jul 2026', destinations: 8 },
];

export function SaveModal({ selectedCount, onClose }: SaveModalProps) {
  const [activeTab, setActiveTab] = useState<'collections' | 'trips'>('collections');
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(new Set());
  const [selectedTrips, setSelectedTrips] = useState<Set<string>>(new Set());
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newTripName, setNewTripName] = useState('');

  const toggleCollection = (id: string) => {
    const newSelected = new Set(selectedCollections);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCollections(newSelected);
  };

  const toggleTrip = (id: string) => {
    const newSelected = new Set(selectedTrips);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTrips(newSelected);
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving to collections:', Array.from(selectedCollections));
    console.log('Saving to trips:', Array.from(selectedTrips));
    onClose();
  };

  const createNewCollection = () => {
    if (newCollectionName.trim()) {
      console.log('Creating new collection:', newCollectionName);
      setNewCollectionName('');
      setShowNewCollection(false);
    }
  };

  const createNewTrip = () => {
    if (newTripName.trim()) {
      console.log('Creating new trip:', newTripName);
      setNewTripName('');
      setShowNewTrip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] w-full max-w-[600px] max-h-[80vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#262B36]">
          <div>
            <h2 className="text-xl font-semibold text-[#F3F4F6]">
              Save Locations
            </h2>
            <p className="text-[#6B7280] text-sm mt-1">
              {selectedCount} location{selectedCount !== 1 ? 's' : ''} selected
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#1F2430] flex items-center justify-center text-[#9CA3AF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#262B36] px-6">
          <button
            onClick={() => setActiveTab('collections')}
            className={`px-4 py-3 text-sm font-medium transition-all relative ${
              activeTab === 'collections'
                ? 'text-[#22C55E]'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            Collections
            {activeTab === 'collections' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22C55E]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('trips')}
            className={`px-4 py-3 text-sm font-medium transition-all relative ${
              activeTab === 'trips'
                ? 'text-[#22C55E]'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            Trips
            {activeTab === 'trips' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22C55E]" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {activeTab === 'collections' && (
            <>
              {/* Create New Collection */}
              {showNewCollection ? (
                <div className="bg-[#1F2430] border border-[#374151] rounded-xl p-4 space-y-3">
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="Collection name..."
                    className="w-full bg-[#171A21] border border-[#374151] rounded-lg px-4 py-2.5 text-[#F3F4F6] text-sm outline-none focus:border-[#22C55E] transition-colors placeholder:text-[#6B7280]"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={createNewCollection}
                      className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-[#0F1115] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setShowNewCollection(false);
                        setNewCollectionName('');
                      }}
                      className="px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewCollection(true)}
                  className="w-full bg-[#1F2430] hover:bg-[#252B3A] border border-[#374151] rounded-xl p-4 flex items-center gap-3 text-[#9CA3AF] hover:text-[#F3F4F6] transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <span className="font-medium">Create new collection</span>
                </button>
              )}

              {/* Existing Collections */}
              {mockCollections.map((collection) => {
                const isSelected = selectedCollections.has(collection.id);
                return (
                  <button
                    key={collection.id}
                    onClick={() => toggleCollection(collection.id)}
                    className={`w-full border rounded-xl p-4 flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-[#22C55E]/10 border-[#22C55E]'
                        : 'bg-[#1F2430] border-[#262B36] hover:border-[#374151] hover:bg-[#252B3A]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#22C55E]' : 'bg-[#171A21]'
                    }`}>
                      {isSelected ? (
                        <Check className="w-5 h-5 text-[#0F1115]" />
                      ) : (
                        <FolderOpen className="w-5 h-5 text-[#9CA3AF]" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-[#F3F4F6] font-medium">
                        {collection.name}
                      </div>
                      <div className="text-[#6B7280] text-sm">
                        {collection.count} locations
                      </div>
                    </div>
                  </button>
                );
              })}
            </>
          )}

          {activeTab === 'trips' && (
            <>
              {/* Create New Trip */}
              {showNewTrip ? (
                <div className="bg-[#1F2430] border border-[#374151] rounded-xl p-4 space-y-3">
                  <input
                    type="text"
                    value={newTripName}
                    onChange={(e) => setNewTripName(e.target.value)}
                    placeholder="Trip name..."
                    className="w-full bg-[#171A21] border border-[#374151] rounded-lg px-4 py-2.5 text-[#F3F4F6] text-sm outline-none focus:border-[#22C55E] transition-colors placeholder:text-[#6B7280]"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={createNewTrip}
                      className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-[#0F1115] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setShowNewTrip(false);
                        setNewTripName('');
                      }}
                      className="px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewTrip(true)}
                  className="w-full bg-[#1F2430] hover:bg-[#252B3A] border border-[#374151] rounded-xl p-4 flex items-center gap-3 text-[#9CA3AF] hover:text-[#F3F4F6] transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <span className="font-medium">Create new trip</span>
                </button>
              )}

              {/* Existing Trips */}
              {mockTrips.map((trip) => {
                const isSelected = selectedTrips.has(trip.id);
                return (
                  <button
                    key={trip.id}
                    onClick={() => toggleTrip(trip.id)}
                    className={`w-full border rounded-xl p-4 flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-[#22C55E]/10 border-[#22C55E]'
                        : 'bg-[#1F2430] border-[#262B36] hover:border-[#374151] hover:bg-[#252B3A]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#22C55E]' : 'bg-[#171A21]'
                    }`}>
                      {isSelected ? (
                        <Check className="w-5 h-5 text-[#0F1115]" />
                      ) : (
                        <Map className="w-5 h-5 text-[#9CA3AF]" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-[#F3F4F6] font-medium">
                        {trip.name}
                      </div>
                      <div className="text-[#6B7280] text-sm">
                        {trip.dates} • {trip.destinations} destinations
                      </div>
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#262B36] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[#1F2430] hover:bg-[#252B3A] border border-[#374151] text-[#E5E7EB] px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedCollections.size === 0 && selectedTrips.size === 0}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
              selectedCollections.size > 0 || selectedTrips.size > 0
                ? 'bg-[#22C55E] hover:bg-[#16A34A] text-[#0F1115]'
                : 'bg-[#1F2430] text-[#6B7280] cursor-not-allowed'
            }`}
          >
            Save to {selectedCollections.size + selectedTrips.size} item{selectedCollections.size + selectedTrips.size !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
