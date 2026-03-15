import { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle2, X, Leaf, Award, Clock, Gift } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router';

type InsuranceOption = 'none' | 'international';

export default function TripPersonalizePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const flightIdsParam = searchParams.get('flightIds');
  const flightIds = flightIdsParam ? flightIdsParam.split(',') : ['1'];

  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceOption>('none');
  const [carbonOffsetAdded, setCarbonOffsetAdded] = useState(false);
  const [showMoreInsurance, setShowMoreInsurance] = useState(false);

  const basePrice = 2288.60;
  const insurancePrice = selectedInsurance === 'international' ? 60 : 0;
  const carbonOffsetPrice = carbonOffsetAdded ? 12.10 : 0;
  const totalPrice = basePrice + insurancePrice + carbonOffsetPrice;

  const handleContinue = () => {
    // Add to trip and navigate to trip page
    navigate('/trip');
  };

  const handleBack = () => {
    navigate(`/seat-selection?flightIds=${flightIds.join(',')}`);
  };

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <header className="border-b border-[#262B36]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link to="/" className="text-2xl font-bold text-[#22C55E]">
              Kontour
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/trip" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              My Trips
            </Link>
            <Link to="/booking" className="text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors text-sm">
              Bookings
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-[#22C55E] text-[#0F1115]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs mt-2 text-center text-[#9CA3AF]">
                Fill in your info
              </p>
            </div>

            {/* Connector Line 1 */}
            <div className="flex-1 h-0.5 -mt-6 bg-[#22C55E]"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-[#22C55E] text-[#0F1115]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs mt-2 text-center text-[#9CA3AF]">
                Choose your seat
              </p>
            </div>

            {/* Connector Line 2 */}
            <div className="flex-1 h-0.5 -mt-6 bg-[#22C55E]"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-[#22C55E] text-[#0F1115]">
                3
              </div>
              <p className="text-xs mt-2 text-center text-[#22C55E] font-medium">
                Personalise your trip
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Travel Insurance Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-6">Travel insurance</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-4">
              {/* No Protection Option */}
              <button
                onClick={() => setSelectedInsurance('none')}
                className={`bg-[#171A21] border-2 rounded-xl p-6 text-center transition-all ${
                  selectedInsurance === 'none'
                    ? 'border-[#22C55E] bg-[#22C55E]/5'
                    : 'border-[#262B36] hover:border-[#374151]'
                }`}
              >
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#262B36] flex items-center justify-center mb-4">
                      <X className="w-6 h-6 text-[#9CA3AF]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#F3F4F6] mb-6">
                      I'm okay with no protection
                    </h3>
                    
                    <div className="space-y-2 mb-8">
                      <X className="w-5 h-5 text-[#6B7280] mx-auto" />
                      <X className="w-5 h-5 text-[#6B7280] mx-auto" />
                      <X className="w-5 h-5 text-[#6B7280] mx-auto" />
                      <X className="w-5 h-5 text-[#6B7280] mx-auto" />
                    </div>
                  </div>
                  
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                    selectedInsurance === 'none'
                      ? 'border-[#22C55E] bg-[#22C55E]'
                      : 'border-[#262B36]'
                  }`}>
                    {selectedInsurance === 'none' && (
                      <div className="w-full h-full rounded-full bg-[#0F1115] scale-50"></div>
                    )}
                  </div>
                </div>
              </button>

              {/* International Travel Insurance Option */}
              <button
                onClick={() => setSelectedInsurance('international')}
                className={`bg-[#171A21] border-2 rounded-xl p-6 text-left transition-all ${
                  selectedInsurance === 'international'
                    ? 'border-[#22C55E] bg-[#22C55E]/5'
                    : 'border-[#262B36] hover:border-[#374151]'
                }`}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-[#22C55E]" />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#F3F4F6] mb-2 text-center">
                      International Travel Insurance
                    </h3>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreInsurance(!showMoreInsurance);
                      }}
                      className="text-[#22C55E] text-sm mb-4 hover:underline mx-auto block"
                    >
                      See more details of benefits &gt;
                    </button>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#F3F4F6]">
                          <span className="font-semibold">SGD350,000</span> Medical Expenses
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#F3F4F6]">
                          Trip Cancellation Cover up to <span className="font-semibold text-[#22C55E]">SGD10,000</span>
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#F3F4F6]">
                          Covers Trip Delay, Baggage Delay, Personal Money & Document Loss
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#F3F4F6]">
                          24-hours Global Emergency Assistance Services
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-center mb-4">
                      <span className="text-2xl font-bold text-[#22C55E]">S$ 60</span>
                      <span className="text-[#9CA3AF] text-sm">/person</span>
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      selectedInsurance === 'international'
                        ? 'border-[#22C55E] bg-[#22C55E]'
                        : 'border-[#262B36]'
                    }`}>
                      {selectedInsurance === 'international' && (
                        <div className="w-full h-full rounded-full bg-[#0F1115] scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Insurance Agreement Text */}
            <div className="border-t border-[#262B36] pt-4">
              <p className="text-[#9CA3AF] text-sm">
                I agree to the{' '}
                <button className="text-[#22C55E] hover:underline">
                  Insurance Policy and Declaration
                </button>
                . This insurance product is distributed in Singapore. All claims shall be arranged in Singapore and settled in Singapore dollars. This insurance product is...{' '}
                <button 
                  onClick={() => setShowMoreInsurance(!showMoreInsurance)}
                  className="text-[#22C55E] hover:underline"
                >
                  Show More
                </button>
              </p>
            </div>
          </div>

          {/* You Might Also Like Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-6">You might also like</h2>
            
            <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#F3F4F6] mb-1">
                      Offset CO<sub>2</sub> emissions
                    </h3>
                    <p className="text-[#9CA3AF] text-sm mb-2">
                      Your trip's CO<sub>2</sub> footprint: 814 kg. Reduce your climate impact now!
                    </p>
                    <button className="text-[#22C55E] text-sm hover:underline">
                      Learn more
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 flex-shrink-0 ml-6">
                  <p className="text-right">
                    <span className="text-xl font-bold text-[#F3F4F6]">S$ 12.10</span>
                    <span className="text-[#9CA3AF] text-sm">/person</span>
                  </p>
                  
                  {carbonOffsetAdded ? (
                    <button
                      onClick={() => setCarbonOffsetAdded(false)}
                      className="px-6 py-2 bg-[#0F1115] border border-[#262B36] text-[#9CA3AF] rounded-lg hover:border-[#374151] transition-all font-medium"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => setCarbonOffsetAdded(true)}
                      className="px-6 py-2 bg-[#22C55E] text-[#0F1115] rounded-lg hover:bg-[#16A34A] transition-all font-bold"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Total and Actions */}
          <div className="bg-[#171A21] border border-[#262B36] rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#F3F4F6]">Total</h3>
              <p className="text-3xl font-bold text-[#22C55E]">S$ {totalPrice.toFixed(2)}</p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-[#0F1115] border border-[#262B36] text-[#F3F4F6] font-medium py-4 rounded-lg hover:border-[#374151] transition-all"
              >
                Back
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 bg-[#22C55E] text-[#0F1115] font-bold py-4 rounded-lg hover:bg-[#16A34A] transition-all"
              >
                Add to trip
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 text-[#9CA3AF] text-sm">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#F59E0B]" />
              <span>Award-winning</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#22C55E]" />
              <span>We're here 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#6366F1]" />
              <span>Rewards for booking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}