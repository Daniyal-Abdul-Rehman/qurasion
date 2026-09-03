'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ROISimulatorProps {
  isVisible: boolean;
}

export default function ROISimulator({ isVisible }: ROISimulatorProps) {
  const [capRate, setCapRate] = useState(6.5);
  const [cashOnCash, setCashOnCash] = useState(12);
  const [holdPeriod, setHoldPeriod] = useState(5);
  const [purchasePrice, setPurchasePrice] = useState(2400000);

  const calculateMetrics = () => {
    const noi = purchasePrice * (capRate / 100);
    const equityMultiple = 1 + (cashOnCash / 100) * holdPeriod;
    const irr = Math.pow(equityMultiple, 1 / holdPeriod) - 1;
    const totalReturn = purchasePrice * (equityMultiple - 1);
    
    return {
      projectedIRR: (irr * 100).toFixed(1),
      equityMultiple: equityMultiple.toFixed(1),
      noiYear1: Math.round(noi).toLocaleString(),
      totalReturn: Math.round(totalReturn).toLocaleString(),
      riskScore: capRate > 7 ? 'A+' : capRate > 5 ? 'B+' : 'C+',
      sensitivity: 'Moderate'
    };
  };

  const metrics = calculateMetrics();

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 max-w-2xl mx-auto mt-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-display font-semibold text-white">
          UNDERWRITING & ROI SIMULATOR
        </h3>
        <button className="text-xs text-cyan-400 hover:text-cyan-300">
          [RESET]
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Property Input */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono text-cyan-400 mb-2">PROPERTY INPUT</h4>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Asset Class</label>
              <select className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:border-cyan-400 focus:outline-none">
                <option>Multifamily</option>
                <option>Industrial</option>
                <option>Retail</option>
                <option>Office</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-gray-400 block mb-1">Market</label>
              <select className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:border-cyan-400 focus:outline-none">
                <option>Phoenix, AZ</option>
                <option>Dallas, TX</option>
                <option>Atlanta, GA</option>
                <option>Tampa, FL</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-gray-400 block mb-1">Purchase Price</label>
              <div className="text-sm text-gray-300">${purchasePrice.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Scenario Adjustments */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono text-cyan-400 mb-2">SCENARIO ADJUSTMENTS</h4>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Cap Rate: {capRate}%
              </label>
              <input
                type="range"
                min="3"
                max="12"
                step="0.1"
                value={capRate}
                onChange={(e) => setCapRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Cash-on-Cash: {cashOnCash}%
              </label>
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={cashOnCash}
                onChange={(e) => setCashOnCash(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Hold Period: {holdPeriod} yrs
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={holdPeriod}
                onChange={(e) => setHoldPeriod(parseInt(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Output */}
      <div className="border-t border-gray-700 pt-4">
        <h4 className="text-xs font-mono text-cyan-400 mb-3">REAL-TIME OUTPUT</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/30 rounded p-3">
            <div className="text-xs text-gray-400 mb-1">Projected IRR</div>
            <div className="text-lg font-semibold text-green-400">{metrics.projectedIRR}%</div>
          </div>
          
          <div className="bg-black/30 rounded p-3">
            <div className="text-xs text-gray-400 mb-1">Equity Multiple</div>
            <div className="text-lg font-semibold text-white">{metrics.equityMultiple}x</div>
          </div>
          
          <div className="bg-black/30 rounded p-3">
            <div className="text-xs text-gray-400 mb-1">NOI Year 1</div>
            <div className="text-lg font-semibold text-white">${metrics.noiYear1}</div>
          </div>
          
          <div className="bg-black/30 rounded p-3">
            <div className="text-xs text-gray-400 mb-1">Total Return</div>
            <div className="text-lg font-semibold text-white">${metrics.totalReturn}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="bg-black/30 rounded p-3">
            <div className="text-xs text-gray-400 mb-1">Risk Score</div>
            <div className="text-sm font-semibold text-yellow-400">{metrics.riskScore}</div>
          </div>
          
          <div className="bg-black/30 rounded p-3">
            <div className="text-xs text-gray-400 mb-1">Sensitivity</div>
            <div className="text-sm font-semibold text-gray-300">{metrics.sensitivity}</div>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 py-3 border border-cyan-400 text-cyan-400 text-sm font-semibold rounded hover:bg-cyan-400 hover:text-black transition-all">
        VIEW DETAILED UNDERWRITING
      </button>
    </motion.div>
  );
}