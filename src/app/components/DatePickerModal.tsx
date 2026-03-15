import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (outbound: Date | null, inbound: Date | null) => void;
  tripType: 'return' | 'one-way' | 'multi-city';
  initialOutbound?: Date | null;
  initialInbound?: Date | null;
}

export function DatePickerModal({
  isOpen,
  onClose,
  onSelect,
  tripType,
  initialOutbound = null,
  initialInbound = null,
}: DatePickerModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedOutbound, setSelectedOutbound] = useState<Date | null>(initialOutbound);
  const [selectedInbound, setSelectedInbound] = useState<Date | null>(initialInbound);
  const [isSelectingInbound, setIsSelectingInbound] = useState(false);

  if (!isOpen) return null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Don't allow selecting past dates
    if (selectedDate < today) return;

    if (!selectedOutbound || isSelectingInbound) {
      if (isSelectingInbound) {
        // Selecting inbound date
        if (selectedOutbound && selectedDate <= selectedOutbound) {
          // If inbound is before or same as outbound, reset and start over
          setSelectedOutbound(selectedDate);
          setSelectedInbound(null);
          setIsSelectingInbound(false);
        } else {
          setSelectedInbound(selectedDate);
          setIsSelectingInbound(false);
        }
      } else {
        // Selecting outbound date
        setSelectedOutbound(selectedDate);
        setSelectedInbound(null);
        if (tripType === 'return') {
          setIsSelectingInbound(true);
        }
      }
    } else {
      // Already have outbound, selecting inbound
      if (selectedDate <= selectedOutbound) {
        // If clicking a date before outbound, reset and start over
        setSelectedOutbound(selectedDate);
        setSelectedInbound(null);
        if (tripType === 'return') {
          setIsSelectingInbound(true);
        }
      } else if (tripType === 'return') {
        setSelectedInbound(selectedDate);
        setIsSelectingInbound(false);
      }
    }
  };

  const handleConfirm = () => {
    if (tripType === 'one-way' && selectedOutbound) {
      onSelect(selectedOutbound, null);
      onClose();
    } else if (tripType === 'return' && selectedOutbound && selectedInbound) {
      onSelect(selectedOutbound, selectedInbound);
      onClose();
    }
  };

  const isDateInRange = (day: number) => {
    if (!selectedOutbound || !selectedInbound) return false;
    const date = new Date(year, month, day);
    return date > selectedOutbound && date < selectedInbound;
  };

  const isDateSelected = (day: number) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    
    const outboundMatch = selectedOutbound && 
      date.getTime() === new Date(selectedOutbound.getFullYear(), selectedOutbound.getMonth(), selectedOutbound.getDate()).getTime();
    const inboundMatch = selectedInbound && 
      date.getTime() === new Date(selectedInbound.getFullYear(), selectedInbound.getMonth(), selectedInbound.getDate()).getTime();
    
    return outboundMatch || inboundMatch;
  };

  const isOutboundDate = (day: number) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return selectedOutbound && 
      date.getTime() === new Date(selectedOutbound.getFullYear(), selectedOutbound.getMonth(), selectedOutbound.getDate()).getTime();
  };

  const isInboundDate = (day: number) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return selectedInbound && 
      date.getTime() === new Date(selectedInbound.getFullYear(), selectedInbound.getMonth(), selectedInbound.getDate()).getTime();
  };

  const isPastDate = (day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const canConfirm = tripType === 'one-way' 
    ? selectedOutbound !== null 
    : selectedOutbound !== null && selectedInbound !== null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
      <div className="bg-[#171A21] border border-[#262B36] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#262B36] flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#F3F4F6]">Select dates</h2>
            <p className="text-[#9CA3AF] text-sm mt-1">
              {tripType === 'return' ? 'Choose your departure and return dates' : 'Choose your departure date'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#262B36] rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#9CA3AF]" />
          </button>
        </div>

        {/* Selected Dates Display */}
        <div className="p-6 border-b border-[#262B36] bg-[#0F1115]">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#171A21] border border-[#262B36] rounded-lg p-4">
              <p className="text-[#9CA3AF] text-xs mb-2">Outbound</p>
              {selectedOutbound ? (
                <p className="text-[#22C55E] font-semibold">{formatDate(selectedOutbound)}</p>
              ) : (
                <p className="text-[#6B7280]">Select date</p>
              )}
            </div>
            {tripType === 'return' && (
              <div className="bg-[#171A21] border border-[#262B36] rounded-lg p-4">
                <p className="text-[#9CA3AF] text-xs mb-2">Inbound</p>
                {selectedInbound ? (
                  <p className="text-[#6366F1] font-semibold">{formatDate(selectedInbound)}</p>
                ) : (
                  <p className="text-[#6B7280]">Select date</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Calendar */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="grid grid-cols-2 gap-8">
            {/* Current Month */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-[#262B36] rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-[#9CA3AF]" />
                </button>
                <h3 className="text-[#F3F4F6] font-semibold">
                  {monthNames[month]} {year}
                </h3>
                <div className="w-9" /> {/* Spacer */}
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-center text-[#6B7280] text-xs font-medium py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isSelected = isDateSelected(day);
                  const isOutbound = isOutboundDate(day);
                  const isInbound = isInboundDate(day);
                  const inRange = isDateInRange(day);
                  const isPast = isPastDate(day);

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      disabled={isPast}
                      className={`
                        aspect-square rounded-lg text-sm font-medium transition-all relative
                        ${isPast ? 'text-[#374151] cursor-not-allowed' : 'text-[#F3F4F6] hover:bg-[#262B36]'}
                        ${isSelected && isOutbound ? 'bg-[#22C55E] text-[#0F1115] hover:bg-[#16A34A]' : ''}
                        ${isSelected && isInbound ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]' : ''}
                        ${inRange ? 'bg-[#22C55E]/10' : ''}
                      `}
                    >
                      {day}
                      {isSelected && isOutbound && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-[#0F1115] font-semibold">
                          OUT
                        </span>
                      )}
                      {isSelected && isInbound && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-white font-semibold">
                          IN
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Month */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9" /> {/* Spacer */}
                <h3 className="text-[#F3F4F6] font-semibold">
                  {monthNames[(month + 1) % 12]} {month === 11 ? year + 1 : year}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-[#262B36] rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-center text-[#6B7280] text-xs font-medium py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days - Next Month */}
              <div className="grid grid-cols-7 gap-2">
                {(() => {
                  const nextMonthDate = new Date(year, month + 1, 1);
                  const nextMonthData = getDaysInMonth(nextMonthDate);
                  
                  return (
                    <>
                      {Array.from({ length: nextMonthData.startingDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: nextMonthData.daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const date = new Date(nextMonthData.year, nextMonthData.month, day);
                        date.setHours(0, 0, 0, 0);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isPast = date < today;

                        const outboundMatch = selectedOutbound && 
                          date.getTime() === new Date(selectedOutbound.getFullYear(), selectedOutbound.getMonth(), selectedOutbound.getDate()).getTime();
                        const inboundMatch = selectedInbound && 
                          date.getTime() === new Date(selectedInbound.getFullYear(), selectedInbound.getMonth(), selectedInbound.getDate()).getTime();
                        const isSelected = outboundMatch || inboundMatch;
                        const isOutbound = outboundMatch;
                        const isInbound = inboundMatch;

                        const inRange = selectedOutbound && selectedInbound && date > selectedOutbound && date < selectedInbound;

                        return (
                          <button
                            key={day}
                            onClick={() => {
                              if (isPast) return;
                              const selectedDate = new Date(nextMonthData.year, nextMonthData.month, day);
                              
                              if (!selectedOutbound || isSelectingInbound) {
                                if (isSelectingInbound) {
                                  if (selectedOutbound && selectedDate <= selectedOutbound) {
                                    setSelectedOutbound(selectedDate);
                                    setSelectedInbound(null);
                                    setIsSelectingInbound(false);
                                  } else {
                                    setSelectedInbound(selectedDate);
                                    setIsSelectingInbound(false);
                                  }
                                } else {
                                  setSelectedOutbound(selectedDate);
                                  setSelectedInbound(null);
                                  if (tripType === 'return') {
                                    setIsSelectingInbound(true);
                                  }
                                }
                              } else {
                                if (selectedDate <= selectedOutbound) {
                                  setSelectedOutbound(selectedDate);
                                  setSelectedInbound(null);
                                  if (tripType === 'return') {
                                    setIsSelectingInbound(true);
                                  }
                                } else if (tripType === 'return') {
                                  setSelectedInbound(selectedDate);
                                  setIsSelectingInbound(false);
                                }
                              }
                            }}
                            disabled={isPast}
                            className={`
                              aspect-square rounded-lg text-sm font-medium transition-all relative
                              ${isPast ? 'text-[#374151] cursor-not-allowed' : 'text-[#F3F4F6] hover:bg-[#262B36]'}
                              ${isSelected && isOutbound ? 'bg-[#22C55E] text-[#0F1115] hover:bg-[#16A34A]' : ''}
                              ${isSelected && isInbound ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]' : ''}
                              ${inRange ? 'bg-[#22C55E]/10' : ''}
                            `}
                          >
                            {day}
                            {isSelected && isOutbound && (
                              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-[#0F1115] font-semibold">
                                OUT
                              </span>
                            )}
                            {isSelected && isInbound && (
                              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-white font-semibold">
                                IN
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-[#262B36] flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
                <span className="text-[#0F1115] text-xs font-semibold">OUT</span>
              </div>
              <span className="text-[#9CA3AF]">Outbound date</span>
            </div>
            {tripType === 'return' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">IN</span>
                  </div>
                  <span className="text-[#9CA3AF]">Inbound date</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#22C55E]/10 rounded-lg"></div>
                  <span className="text-[#9CA3AF]">Date range</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#262B36] flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedOutbound(null);
              setSelectedInbound(null);
              setIsSelectingInbound(false);
            }}
            className="px-4 py-2 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm"
          >
            Clear dates
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#0F1115] border border-[#262B36] text-[#F3F4F6] rounded-lg hover:border-[#374151] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                canConfirm
                  ? 'bg-[#22C55E] text-[#0F1115] hover:bg-[#16A34A]'
                  : 'bg-[#262B36] text-[#6B7280] cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
