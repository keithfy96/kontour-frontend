import { useState } from 'react';
import { Search, Plus, MapPin, Calendar, Users, Image as ImageIcon, X, Play, Grid3x3, List, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  mediaCount: number;
  coverImage: string;
  type: 'collection' | 'trip';
  dateCreated: string;
  travelers?: number;
}

interface CollectionItem {
  id: string;
  name: string;
  location: string;
  image: string;
  mediaCount: number;
  type: 'photo' | 'video';
}

const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'Tokyo Food Spots',
    description: 'Best ramen and sushi places in Tokyo',
    itemCount: 12,
    mediaCount: 45,
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwY2l0eXxlbnwxfHx8fDE3NzMwODQ4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'collection',
    dateCreated: 'Mar 1, 2026',
  },
  {
    id: '2',
    name: 'Paris 2026',
    description: 'Spring trip to Paris with Sarah',
    itemCount: 18,
    mediaCount: 67,
    coverImage: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc3MzA4NDgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'trip',
    dateCreated: 'Feb 15, 2026',
    travelers: 2,
  },
  {
    id: '3',
    name: 'Beach Destinations',
    description: 'Dream beaches around the world',
    itemCount: 8,
    mediaCount: 32,
    coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwYmVhY2glMjBzdW5zZXR8ZW58MXx8fHwxNzczMDg0ODI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'collection',
    dateCreated: 'Jan 20, 2026',
  },
  {
    id: '4',
    name: 'NYC Weekend',
    description: 'Quick weekend getaway to New York',
    itemCount: 15,
    mediaCount: 28,
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHNreWxpbmV8ZW58MXx8fHwxNzczMDg0ODI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'trip',
    dateCreated: 'Jan 5, 2026',
    travelers: 1,
  },
  {
    id: '5',
    name: 'European Cafes',
    description: 'Cozy cafes and coffee shops',
    itemCount: 20,
    mediaCount: 54,
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMDg0ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'collection',
    dateCreated: 'Dec 10, 2025',
  },
  {
    id: '6',
    name: 'London Explorer',
    description: 'Exploring historic London',
    itemCount: 22,
    mediaCount: 89,
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBiaWclMjBiZW58ZW58MXx8fHwxNzczMDg0ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'trip',
    dateCreated: 'Nov 28, 2025',
    travelers: 3,
  },
];

const mockCollectionItems: CollectionItem[] = [
  {
    id: '1',
    name: 'Ichiran Ramen Shibuya',
    location: 'Shibuya, Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwY2l0eXxlbnwxfHx8fDE3NzMwODQ4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    mediaCount: 8,
    type: 'photo',
  },
  {
    id: '2',
    name: 'Tsukiji Fish Market',
    location: 'Chuo, Tokyo',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwZm9vZCUyMHBhc3RhfGVufDF8fHx8MTc3MzA4NDgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    mediaCount: 12,
    type: 'video',
  },
  {
    id: '3',
    name: 'Sushi Dai',
    location: 'Toyosu, Tokyo',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwYmVhY2glMjBzdW5zZXR8ZW58MXx8fHwxNzczMDg0ODI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    mediaCount: 6,
    type: 'photo',
  },
  {
    id: '4',
    name: 'Afuri Ramen Harajuku',
    location: 'Harajuku, Tokyo',
    image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBtb3VudGFpbnMlMjBuYXR1cmV8ZW58MXx8fHwxNzczMDg0ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    mediaCount: 4,
    type: 'photo',
  },
  {
    id: '5',
    name: 'Ginza Kyubey',
    location: 'Ginza, Tokyo',
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHRyb3BpY2FsJTIwb2NlYW58ZW58MXx8fHwxNzczMDg0ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    mediaCount: 9,
    type: 'video',
  },
  {
    id: '6',
    name: 'Tonki Tonkatsu',
    location: 'Meguro, Tokyo',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMDg0ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    mediaCount: 6,
    type: 'photo',
  },
];

export default function CollectionsPage() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'collections' | 'trips'>('collections');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');

  const filteredCollections = mockCollections.filter((collection) => {
    const matchesType = viewType === 'collections' 
      ? collection.type === 'collection' 
      : collection.type === 'trip';
    const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCreateCollection = () => {
    // Handle collection creation
    console.log('Creating collection:', { name: newCollectionName, description: newCollectionDescription });
    setShowCreateModal(false);
    setNewCollectionName('');
    setNewCollectionDescription('');
  };

  return (
    <div className="min-h-screen bg-[#0F1115] flex flex-col">
      {/* Header */}
      <div className="border-b border-[#262B36] bg-[#0F1115] px-8 py-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-semibold text-[#F3F4F6]">
                My {viewType === 'collections' ? 'Collections' : 'Trips'}
              </h1>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-4 py-2 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Create {viewType === 'collections' ? 'Collection' : 'Trip'}
            </button>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-4">
            {/* Toggle and Search */}
            <div className="flex items-center gap-4 flex-1">
              {/* Collections/Trips Toggle */}
              <div className="flex items-center gap-2 bg-[#171A21] border border-[#262B36] rounded-lg p-1">
                <button
                  onClick={() => setViewType('collections')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewType === 'collections'
                      ? 'bg-[#22C55E] text-white'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                  }`}
                >
                  Collections
                </button>
                <button
                  onClick={() => setViewType('trips')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewType === 'trips'
                      ? 'bg-[#22C55E] text-white'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                  }`}
                >
                  Trips
                </button>
              </div>

              {/* Search */}
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${viewType}...`}
                  className="w-full bg-[#171A21] border border-[#262B36] rounded-lg pl-10 pr-4 py-2 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#374151]"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-[#171A21] border border-[#262B36] rounded-lg p-1">
              <button
                onClick={() => setLayoutView('grid')}
                className={`p-2 rounded-md transition-all ${
                  layoutView === 'grid'
                    ? 'bg-[#22C55E]/10 text-[#22C55E]'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutView('list')}
                className={`p-2 rounded-md transition-all ${
                  layoutView === 'list'
                    ? 'bg-[#22C55E]/10 text-[#22C55E]'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-[1400px] mx-auto">
          {filteredCollections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-[#171A21] border border-[#262B36] rounded-xl flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-[#6B7280]" />
              </div>
              <h3 className="text-[#F3F4F6] font-medium text-lg mb-2">
                No {viewType} found
              </h3>
              <p className="text-[#6B7280] text-sm mb-6">
                Create your first {viewType === 'collections' ? 'collection' : 'trip'} to get started
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-lg px-4 py-2 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Create {viewType === 'collections' ? 'Collection' : 'Trip'}
              </button>
            </div>
          ) : (
            <>
              {layoutView === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCollections.map((collection) => (
                    <div
                      key={collection.id}
                      onClick={() => setSelectedCollection(collection)}
                      className="bg-[#171A21] border border-[#262B36] rounded-xl overflow-hidden hover:border-[#374151] transition-all cursor-pointer group"
                    >
                      {/* Cover Image */}
                      <div className="aspect-video relative overflow-hidden bg-[#0F1115]">
                        <img
                          src={collection.coverImage}
                          alt={collection.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                            <MapPin className="w-3 h-3 text-white" />
                            <span className="text-white text-xs font-medium">{collection.itemCount} places</span>
                          </div>
                          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                            <ImageIcon className="w-3 h-3 text-white" />
                            <span className="text-white text-xs font-medium">{collection.mediaCount}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-[#F3F4F6] font-semibold mb-1">{collection.name}</h3>
                        <p className="text-[#9CA3AF] text-sm mb-3 line-clamp-2">{collection.description}</p>
                        <div className="flex items-center justify-between text-xs text-[#6B7280]">
                          <span>{collection.dateCreated}</span>
                          {collection.travelers && (
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{collection.travelers} {collection.travelers === 1 ? 'traveler' : 'travelers'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredCollections.map((collection) => (
                    <div
                      key={collection.id}
                      onClick={() => setSelectedCollection(collection)}
                      className="bg-[#171A21] border border-[#262B36] rounded-xl p-4 hover:border-[#374151] transition-all cursor-pointer group flex items-center gap-4"
                    >
                      {/* Thumbnail */}
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[#0F1115]">
                        <img
                          src={collection.coverImage}
                          alt={collection.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#F3F4F6] font-semibold mb-1">{collection.name}</h3>
                        <p className="text-[#9CA3AF] text-sm mb-2 line-clamp-1">{collection.description}</p>
                        <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{collection.itemCount} places</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" />
                            <span>{collection.mediaCount} media</span>
                          </div>
                          {collection.travelers && (
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{collection.travelers} {collection.travelers === 1 ? 'traveler' : 'travelers'}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="text-xs text-[#6B7280] flex-shrink-0">
                        {collection.dateCreated}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create Collection/Trip Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] w-[500px] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#262B36]">
              <h2 className="text-xl font-semibold text-[#F3F4F6]">
                Create {viewType === 'collections' ? 'Collection' : 'Trip'}
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#1F2430] flex items-center justify-center text-[#9CA3AF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#9CA3AF]">Name</label>
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder={`Enter ${viewType === 'collections' ? 'collection' : 'trip'} name`}
                  className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#374151]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#9CA3AF]">Description</label>
                <textarea
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  placeholder="Add a description (optional)"
                  rows={3}
                  className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#374151] resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#171A21] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCollection}
                  disabled={!newCollectionName.trim()}
                  className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] disabled:bg-[#171A21] disabled:text-[#6B7280] text-white rounded-lg px-4 py-3 transition-colors font-medium disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collection Detail View Modal */}
      {selectedCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#171A21] border border-[#262B36] rounded-[20px] w-[90vw] h-[85vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#262B36]">
              <div>
                <h2 className="text-xl font-semibold text-[#F3F4F6] mb-1">{selectedCollection.name}</h2>
                <p className="text-sm text-[#9CA3AF]">{selectedCollection.description}</p>
              </div>
              <button
                onClick={() => setSelectedCollection(null)}
                className="w-8 h-8 rounded-lg hover:bg-[#1F2430] flex items-center justify-center text-[#9CA3AF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockCollectionItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#0F1115] border border-[#262B36] rounded-xl overflow-hidden hover:border-[#374151] transition-all group cursor-pointer"
                  >
                    {/* Image */}
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-[#0F1115] ml-1" fill="currentColor" />
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                        <ImageIcon className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-medium">{item.mediaCount}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-[#F3F4F6] font-medium mb-1 text-sm">{item.name}</h3>
                      <div className="flex items-center gap-1 text-[#6B7280] text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
