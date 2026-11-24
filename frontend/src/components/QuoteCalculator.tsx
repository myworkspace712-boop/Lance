import React, { useState } from 'react';
import { PROJECT_TYPES, ADDONS } from '../data/mockData';
import { Calculator, Check, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface QuoteCalculatorProps {
  onApplyEstimate: (data: {
    projectType: string;
    addons: string[];
    totalPrice: number;
    estimatedDays: number;
  }) => void;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ onApplyEstimate }) => {
  const [selectedType, setSelectedType] = useState<string>(PROJECT_TYPES[1].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo-pro']);

  const currentType = PROJECT_TYPES.find(p => p.id === selectedType) || PROJECT_TYPES[0];
  
  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = ADDONS.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = currentType.basePrice + addonsTotal;
  const isRush = selectedAddons.includes('priority-delivery');
  const estimatedDays = isRush 
    ? Math.max(4, Math.round(currentType.deliveryDays * 0.6))
    : currentType.deliveryDays;

  const handleBookWithEstimate = () => {
    onApplyEstimate({
      projectType: currentType.label,
      addons: selectedAddons.map(id => ADDONS.find(a => a.id === id)?.label || id),
      totalPrice,
      estimatedDays,
    });
  };

  return (
    <section id="calculator" className="py-24 relative bg-dark-900/80 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Pricing Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Interactive Project Cost Estimator
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No guessing games or hidden fees. Select your project requirements below to see an instant, transparent estimate and delivery timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Options Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Select Type */}
            <div>
              <label className="text-sm font-semibold text-white uppercase tracking-wider block mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                Select Project Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-brand-600/10 border-brand-500 ring-1 ring-brand-500/40 text-white'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-sm text-white">{type.label}</span>
                        <span className="text-xs font-bold text-brand-400 font-mono">${type.basePrice}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{type.description}</p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>~{type.deliveryDays} business days</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Addons */}
            <div>
              <label className="text-sm font-semibold text-white uppercase tracking-wider block mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                Choose Optional Add-Ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/30'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-indigo-600 text-white' : 'border border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{addon.label}</span>
                          <span className="text-xs font-mono font-bold text-indigo-300">+${addon.price}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{addon.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estimate Summary Box */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-500/30 sticky top-28 shadow-glow">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Estimated Summary
                </span>
                <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                  Fixed-Fee Guarantee
                </span>
              </div>

              {/* Breakdown */}
              <div className="py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{currentType.label}</span>
                  <span className="font-mono text-white font-semibold">${currentType.basePrice}</span>
                </div>

                {selectedAddons.map(id => {
                  const addon = ADDONS.find(a => a.id === id);
                  if (!addon) return null;
                  return (
                    <div key={id} className="flex justify-between text-xs text-slate-400">
                      <span>+ {addon.label}</span>
                      <span className="font-mono text-slate-300">+${addon.price}</span>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-base font-medium text-white">Estimated Investment:</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-300 font-mono">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-4 h-4 text-brand-400" />
                    <span>Estimated Turnaround: <strong className="text-white">~{estimatedDays} business days</strong></span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-white/5 rounded-xl p-4 mb-6 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>30-Day Free Post-Launch Bug Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                  <span>Includes 100% full source code ownership</span>
                </div>
              </div>

              <button
                onClick={handleBookWithEstimate}
                className="w-full py-4 text-center font-bold text-white bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-brand-600/30 hover:shadow-brand-500/50 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Lock In This Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-3">
                No credit card required. Final scope confirmed during brief discovery call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
