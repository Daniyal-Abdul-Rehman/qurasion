import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Target, Search, Filter, MapPin, DollarSign, BarChart3 } from 'lucide-react';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerProperties } from '../../../lib/broker-data';

export default function InvestorDemandPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Investor Demand"
      description="Understand investor demand for your properties and market areas."
      action={null}
    >
      {/* Market Demand Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Potential Investors</p>
          <p className="mt-2 font-display text-2xl">127</p>
          <p className="mt-1 text-xs text-[#B7D83D]">High demand</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Highly Matched</p>
          <p className="mt-2 font-display text-2xl">32</p>
          <p className="mt-1 text-xs text-[#66706A]">90%+ match score</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Recently Active</p>
          <p className="mt-2 font-display text-2xl">18</p>
          <p className="mt-1 text-xs text-[#66706A]">Last 7 days</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Currently Searching</p>
          <p className="mt-2 font-display text-2xl">7</p>
          <p className="mt-1 text-xs text-[#66706A]">Active buyers</p>
        </div>
      </section>

      {/* Property Demand Analysis */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Demand analysis</p>
            <h2 className="mt-2 font-display text-2xl">Property demand</h2>
          </div>
        </div>
        <div className="space-y-4">
          {brokerProperties.slice(0, 3).map((property) => (
            <Link
              key={property.id}
              href={`/broker/properties/${property.id}`}
              className="block rounded-lg border border-[#DDE2DD] bg-white p-5 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-lg">{property.address}</p>
                  <p className="text-sm text-[#66706A] mt-1">{property.seller}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <TrendingUp size={16} className="text-[#B7D83D]" />
                    <span className="font-display text-xl font-semibold text-[#B7D83D]">HIGH</span>
                  </div>
                  <p className="text-xs text-[#66706A] mt-1">Demand level</p>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-[#9AA8A0] mb-1">Potential Investors</p>
                  <p className="font-display text-lg">{property.investors}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9AA8A0] mb-1">Highly Matched</p>
                  <p className="font-display text-lg">{Math.floor(parseInt(property.investors) * 0.25)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9AA8A0] mb-1">Recently Active</p>
                  <p className="font-display text-lg">{Math.floor(parseInt(property.investors) * 0.14)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9AA8A0] mb-1">Currently Searching</p>
                  <p className="font-display text-lg">{Math.floor(parseInt(property.investors) * 0.05)}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#E8EBE8]">
                <p className="text-xs text-[#9AA8A0] mb-2">Investment Strategy Breakdown</p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-[#E8F5D3] rounded p-2 text-center">
                    <p className="text-xs font-semibold text-[#31551C]">Fix & Flip</p>
                    <p className="text-lg font-display text-[#31551C]">42%</p>
                  </div>
                  <div className="flex-1 bg-[#E7F0F4] rounded p-2 text-center">
                    <p className="text-xs font-semibold text-[#315A6B]">Buy & Hold</p>
                    <p className="text-lg font-display text-[#315A6B]">31%</p>
                  </div>
                  <div className="flex-1 bg-[#F3EBDD] rounded p-2 text-center">
                    <p className="text-xs font-semibold text-[#745F35]">BRRRR</p>
                    <p className="text-lg font-display text-[#745F35]">17%</p>
                  </div>
                  <div className="flex-1 bg-[#F7F8F6] rounded p-2 text-center">
                    <p className="text-xs font-semibold text-[#66706A]">Development</p>
                    <p className="text-lg font-display text-[#66706A]">10%</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Market Intelligence */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Market intelligence</p>
            <h2 className="mt-2 font-display text-2xl">Market demand by location</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { market: 'Dallas', demand: 'HIGH', investors: 45, avgReturn: '18.2%', trend: '+12%' },
            { market: 'Austin', demand: 'HIGH', investors: 38, avgReturn: '16.8%', trend: '+8%' },
            { market: 'Houston', demand: 'MEDIUM', investors: 28, avgReturn: '15.4%', trend: '+5%' },
            { market: 'Miami', demand: 'HIGH', investors: 32, avgReturn: '17.1%', trend: '+15%' },
            { market: 'Phoenix', demand: 'MEDIUM', investors: 24, avgReturn: '14.9%', trend: '+3%' },
            { market: 'Atlanta', demand: 'LOW', investors: 18, avgReturn: '13.2%', trend: '-2%' },
          ].map((market) => (
            <div key={market.market} className="rounded-lg border border-[#DDE2DD] bg-white p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#66706A]" />
                  <p className="font-semibold">{market.market}</p>
                </div>
                <span className={`text-xs font-semibold ${market.demand === 'HIGH' ? 'text-[#B7D83D]' : market.demand === 'MEDIUM' ? 'text-[#E8A838]' : 'text-[#9AA8A0]'}`}>
                  {market.demand}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#66706A]">Investors</span>
                  <span className="font-semibold">{market.investors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#66706A]">Avg. Return</span>
                  <span className="font-semibold">{market.avgReturn}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#66706A]">Trend</span>
                  <span className={`font-semibold ${market.trend.startsWith('+') ? 'text-[#B7D83D]' : 'text-[#E83838]'}`}>
                    {market.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demand Insights */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Insights</p>
            <h2 className="mt-2 font-display text-2xl">Demand breakdown</h2>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold mb-3">Target Price Range</p>
            <div className="space-y-2">
              {[
                { range: '<$400K', percentage: 12 },
                { range: '$400K-$500K', percentage: 36 },
                { range: '$500K-$600K', percentage: 38 },
                { range: '>$600K', percentage: 14 },
              ].map((item) => (
                <div key={item.range} className="flex items-center gap-3">
                  <span className="text-xs text-[#66706A] w-24">{item.range}</span>
                  <div className="flex-1 h-2 bg-[#E8EBE8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#B7D83D] rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-xs font-semibold w-8">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-3">Preferred Returns</p>
            <div className="space-y-2">
              {[
                { return: '10%+', percentage: 18 },
                { return: '15%+', percentage: 46 },
                { return: '20%+', percentage: 28 },
                { return: '25%+', percentage: 8 },
              ].map((item) => (
                <div key={item.return} className="flex items-center gap-3">
                  <span className="text-xs text-[#66706A] w-24">{item.return}</span>
                  <div className="flex-1 h-2 bg-[#E8EBE8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#E7F0F4] rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-xs font-semibold w-8">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BrokerPageShell>
  );
}