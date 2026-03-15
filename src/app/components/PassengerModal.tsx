import { useState, useEffect } from 'react';
import { X, User, Edit2, Plus, Check, HelpCircle, ShoppingBag, Package, ChevronRight, Plane } from 'lucide-react';

interface PassengerData {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
}

interface PassengerModalProps {
  isOpen: boolean;
  onClose: () => void;
  passengers: PassengerData[];
  selectedPassengerIds: string[];
  onPassengerSelect: (ids: string[]) => void;
  onPassengerAdd: () => void;
  onPassengerEdit: (passenger: PassengerData | undefined) => void;
  onPassengerSave: (passenger: PassengerData) => void;
  onPassengerDelete: (id: string) => void;
  editingPassenger?: PassengerData;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  countryCode: string;
  onContactNameChange: (value: string) => void;
  onContactEmailChange: (value: string) => void;
  onContactPhoneChange: (value: string) => void;
  onCountryCodeChange: (value: string) => void;
}

export function PassengerModal({
  isOpen,
  onClose,
  passengers,
  selectedPassengerIds,
  onPassengerSelect,
  onPassengerAdd,
  onPassengerEdit,
  onPassengerSave,
  editingPassenger,
  contactName,
  contactEmail,
  contactPhone,
  countryCode,
  onContactNameChange,
  onContactEmailChange,
  onContactPhoneChange,
  onCountryCodeChange,
}: PassengerModalProps) {
  const [expandedPassengerId, setExpandedPassengerId] = useState<string | null>(null);
  const [localPassenger, setLocalPassenger] = useState<PassengerData | null>(null);

  // Update local state when editing passenger changes
  useEffect(() => {
    if (editingPassenger) {
      setLocalPassenger({ ...editingPassenger });
    } else {
      setLocalPassenger(null);
    }
  }, [editingPassenger]);

  const togglePassenger = (id: string) => {
    if (selectedPassengerIds.includes(id)) {
      onPassengerSelect(selectedPassengerIds.filter(pid => pid !== id));
    } else {
      onPassengerSelect([...selectedPassengerIds, id]);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedPassengerId(expandedPassengerId === id ? null : id);
  };

  const handleSave = () => {
    if (localPassenger) {
      onPassengerSave(localPassenger);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#171A21] border border-[#262B36] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#171A21] border-b border-[#262B36] px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-[#F3F4F6]">
            {editingPassenger ? 'Edit passenger' : "Who's travelling?"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#0F1115] border border-[#262B36] rounded-lg flex items-center justify-center hover:border-[#374151] transition-all"
          >
            <X className="w-4 h-4 text-[#9CA3AF]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {editingPassenger ? (
            /* Editing Form */
            <div className="space-y-6">
              {/* Contact Details */}
              <div>
                <h3 className="text-[#F3F4F6] font-semibold mb-4">Contact details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#9CA3AF] text-sm mb-2 block">First name *</label>
                    <input
                      type="text"
                      value={localPassenger?.firstName || ''}
                      onChange={(e) => setLocalPassenger({ ...localPassenger!, firstName: e.target.value })}
                      placeholder="Enter first name"
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                  <div>
                    <label className="text-[#9CA3AF] text-sm mb-2 block">Last name *</label>
                    <input
                      type="text"
                      value={localPassenger?.lastName || ''}
                      onChange={(e) => setLocalPassenger({ ...localPassenger!, lastName: e.target.value })}
                      placeholder="Enter last name"
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[#9CA3AF] text-sm mb-2 block">Email *</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => onContactEmailChange(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[#9CA3AF] text-sm mb-2 block">Mobile phone *</label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => onCountryCodeChange(e.target.value)}
                        className="w-24 bg-[#0F1115] border border-[#262B36] rounded-lg px-3 py-3 text-[#F3F4F6] text-sm focus:outline-none focus:border-[#22C55E]"
                      >
                        <option value="+65">+65</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+86">+86</option>
                      </select>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => onContactPhoneChange(e.target.value)}
                        placeholder="Enter phone number"
                        className="flex-1 bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#22C55E]"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[#9CA3AF] text-sm mb-2 block">Gender *</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={localPassenger?.gender === 'Male'}
                          onChange={() => setLocalPassenger({ ...localPassenger!, gender: 'Male' })}
                          className="w-4 h-4 text-[#22C55E] border-[#262B36] bg-[#0F1115] focus:ring-[#22C55E] focus:ring-offset-0"
                        />
                        <span className="text-[#F3F4F6]">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={localPassenger?.gender === 'Female'}
                          onChange={() => setLocalPassenger({ ...localPassenger!, gender: 'Female' })}
                          className="w-4 h-4 text-[#22C55E] border-[#262B36] bg-[#0F1115] focus:ring-[#22C55E] focus:ring-offset-0"
                        />
                        <span className="text-[#F3F4F6]">Female</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[#9CA3AF] text-sm mb-2 block">Date of birth *</label>
                    <input
                      type="date"
                      value={localPassenger?.dateOfBirth || ''}
                      onChange={(e) => setLocalPassenger({ ...localPassenger!, dateOfBirth: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                  <div>
                    <label className="text-[#9CA3AF] text-sm mb-2 block">Passport number *</label>
                    <input
                      type="text"
                      value={localPassenger?.passportNumber || ''}
                      onChange={(e) => setLocalPassenger({ ...localPassenger!, passportNumber: e.target.value })}
                      placeholder="Enter passport number"
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                  <div>
                    <label className="text-[#9CA3AF] text-sm mb-2 block">Passport expiry *</label>
                    <input
                      type="date"
                      value={localPassenger?.passportExpiry || ''}
                      onChange={(e) => setLocalPassenger({ ...localPassenger!, passportExpiry: e.target.value })}
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[#9CA3AF] text-sm mb-2 block">Nationality *</label>
                    <input
                      type="text"
                      value={localPassenger?.nationality || ''}
                      onChange={(e) => setLocalPassenger({ ...localPassenger!, nationality: e.target.value })}
                      placeholder="Enter nationality"
                      className="w-full bg-[#0F1115] border border-[#262B36] rounded-lg px-4 py-3 text-[#F3F4F6] text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262B36]">
                <button
                  onClick={() => onPassengerEdit(undefined)}
                  className="px-6 py-3 bg-[#0F1115] border border-[#262B36] text-[#F3F4F6] rounded-lg hover:border-[#374151] transition-all font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-[#22C55E] text-[#0F1115] rounded-lg hover:bg-[#16A34A] transition-all font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            /* Passengers List */
            <>
              <div>
                <h3 className="text-[#F3F4F6] font-semibold mb-4">Passenger</h3>
                <div className="space-y-3">
                  {passengers.map((passenger) => {
                    const isSelected = selectedPassengerIds.includes(passenger.id);
                    const hasAllInfo = passenger.firstName && passenger.lastName && passenger.passportNumber;
                    const needsInfo = !hasAllInfo;

                    return (
                      <div
                        key={passenger.id}
                        className={`bg-[#0F1115] border rounded-lg transition-all ${
                          isSelected
                            ? 'border-[#22C55E] bg-[#22C55E]/5'
                            : 'border-[#262B36] hover:border-[#374151]'
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => togglePassenger(passenger.id)}
                                className="w-5 h-5 mt-0.5 rounded border-[#262B36] bg-[#171A21] text-[#22C55E] focus:ring-[#22C55E] focus:ring-offset-0"
                              />
                              <div className="flex-1">
                                {hasAllInfo ? (
                                  <>
                                    <p className="text-[#F3F4F6] font-semibold text-base">
                                      {passenger.firstName} {passenger.lastName}
                                    </p>
                                    <p className="text-[#9CA3AF] text-sm mt-0.5">
                                      Adult / Passport {passenger.passportNumber} / {passenger.gender} / {passenger.nationality}
                                    </p>
                                    
                                    {/* Add frequent flyer details */}
                                    <button className="text-[#22C55E] text-sm mt-2 flex items-center gap-1 hover:underline">
                                      <span>Add frequent flyer details</span>
                                      <ChevronRight className="w-4 h-4" />
                                      <Plane className="w-4 h-4" />
                                      <span className="ml-1">456 miles</span>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-[#F3F4F6] font-semibold text-base">New Passenger</p>
                                    <p className="text-[#EF4444] text-sm mt-1">
                                      Please provide the passenger's ID information{' '}
                                      <button
                                        onClick={() => onPassengerEdit(passenger)}
                                        className="underline hover:text-[#F87171] transition-colors"
                                      >
                                        Edit
                                      </button>
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                            {hasAllInfo && (
                              <button
                                onClick={() => onPassengerEdit(passenger)}
                                className="w-8 h-8 bg-[#171A21] border border-[#262B36] rounded-lg flex items-center justify-center hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all flex-shrink-0"
                              >
                                <Edit2 className="w-4 h-4 text-[#9CA3AF]" />
                              </button>
                            )}
                          </div>

                          {/* Expandable visa requirements section */}
                          {hasAllInfo && expandedPassengerId === passenger.id && (
                            <div className="mt-4 pl-8 pr-4 py-3 bg-[#171A21]/50 rounded-lg border-l-2 border-[#22C55E]">
                              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                                <span className="font-semibold text-[#F3F4F6]">Visa requirements</span> Passengers holding foreign passports don't need a visa or other travel documents to enter the destination country (or region). For details, consult the embassies, consulates or immigration authorities to ensure you have all required documents and information for entry. Passengers aged 13 years and older departing Singapore for more than 3 months must hold an Exit Permit obtained from the Singapore National Service. Failure to comply with visa requirements in your country of transit may lead to denied boarding, financial losses, and travel delays. Please confirm transit procedures before booking.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Add Passenger Button */}
                  <button
                    onClick={onPassengerAdd}
                    className="w-full bg-[#0F1115] border-2 border-dashed border-[#262B36] rounded-lg py-3 text-[#22C55E] hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all flex items-center justify-center gap-2 font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add passengers</span>
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262B36]">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#22C55E] text-[#0F1115] rounded-lg hover:bg-[#16A34A] transition-all font-medium"
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}