'use client';

import { type ReactNode } from 'react';

type IllustrationVariant = 'city' | 'network' | 'property' | 'graph' | 'timeline';

interface Scene3DProps {
  children: ReactNode;
  variant?: IllustrationVariant;
}

function Frame({ variant, children }: { variant: IllustrationVariant; children: ReactNode }) {
  const labels = {
    city: 'LIVE MARKET INTELLIGENCE',
    network: 'SOURCE RECORD NETWORK',
    property: 'PROPERTY INTELLIGENCE',
    graph: 'RETURNS SCENARIO MODEL',
    timeline: 'DEAL PROGRESS MONITOR',
  };

  return (
    <div className={`property-illustration illustration-${variant}`} aria-hidden="true">
      <div className="illustration-label illustration-label-top">{labels[variant]}</div>
      {children}
    </div>
  );
}

function CityIllustration() {
  return (
    <Frame variant="city">
      <div className="illustration-sun" />
      <div className="illustration-city-grid" />
      <svg className="illustration-map" viewBox="0 0 900 620" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="illustration-road" d="M-30 500C130 420 190 540 330 455C475 366 550 445 690 335C755 284 835 290 930 235" />
        <path className="illustration-road illustration-road-secondary" d="M80 120C220 210 290 170 385 260C470 340 555 290 690 410C755 466 830 470 940 530" />
        <path className="illustration-flow" d="M120 440C250 350 315 420 405 325C500 225 590 330 760 175" />
        <g className="illustration-building illustration-building-one"><path d="M170 370h75v68h-75zM180 350h55v20h-55z" fill="#fff" stroke="#173D2B" strokeWidth="4" /><path d="M185 382h12v12h-12zM207 382h12v12h-12z" fill="#B7D83D" /></g>
        <g className="illustration-building illustration-building-two"><path d="M600 242h74v58h-74zM608 220h58v22h-58z" fill="#fff" stroke="#173D2B" strokeWidth="4" /><path d="M614 253h12v12h-12zM636 253h12v12h-12z" fill="#B7D83D" /></g>
        <g className="illustration-node"><circle cx="120" cy="440" r="10" /><circle cx="120" cy="440" r="22" /></g><g className="illustration-node"><circle cx="405" cy="325" r="10" /><circle cx="405" cy="325" r="22" /></g><g className="illustration-node"><circle cx="760" cy="175" r="10" /><circle cx="760" cy="175" r="22" /></g>
      </svg>
      <div className="illustration-panel illustration-panel-score"><span className="illustration-panel-kicker">MARKET SIGNAL</span><strong>86.4</strong><span className="illustration-status">North Dallas / Active</span></div>
      <div className="illustration-chip">3,842 ACTIVE LISTINGS <span /></div>
    </Frame>
  );
}

function NetworkIllustration() {
  return (
    <Frame variant="network">
      <svg className="illustration-network-graphic" viewBox="0 0 900 620" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="network-line" d="M170 170L390 310L690 145M390 310L270 500M390 310L650 485M690 145L790 350M170 170L110 390M270 500L650 485" />
        <circle className="network-ring" cx="390" cy="310" r="70" /><circle className="network-core" cx="390" cy="310" r="28" />
        <g className="network-node"><circle cx="170" cy="170" r="18" /><path d="M160 170h20M170 160v20" /></g><g className="network-node"><circle cx="690" cy="145" r="18" /><path d="M680 145h20M690 135v20" /></g><g className="network-node"><circle cx="270" cy="500" r="18" /><path d="M260 500h20" /></g><g className="network-node"><circle cx="650" cy="485" r="18" /><path d="M640 485h20" /></g><g className="network-node"><circle cx="110" cy="390" r="18" /><path d="M100 390h20" /></g><g className="network-node"><circle cx="790" cy="350" r="18" /><path d="M780 350h20" /></g>
      </svg>
      <div className="illustration-panel illustration-panel-score"><span className="illustration-panel-kicker">RECORDS RESOLVED</span><strong>2.4M</strong><span className="illustration-status">14 source streams active</span></div>
      <div className="illustration-chip">ENTITY RESOLUTION <span /></div>
    </Frame>
  );
}

function PropertyIllustration() {
  return (
    <Frame variant="property">
      <div className="floorplan-card"><div className="floorplan-roof" /><div className="floorplan-room floorplan-room-large"><span>Living</span></div><div className="floorplan-room floorplan-room-small"><span>Bed</span></div><div className="floorplan-room floorplan-room-small floorplan-room-two"><span>Bath</span></div><div className="floorplan-door" /><div className="floorplan-compass">N</div></div>
      <div className="illustration-panel illustration-panel-score"><span className="illustration-panel-kicker">VALUATION RANGE</span><strong>$435K</strong><span className="illustration-status">Confidence 92%</span></div>
      <div className="illustration-chip">PROPERTY VERIFIED <span /></div>
    </Frame>
  );
}

function GraphIllustration() {
  return (
    <Frame variant="graph">
      <svg className="illustration-chart" viewBox="0 0 900 620" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="chart-axis" d="M130 500H790M130 500V110" /><path className="chart-gridline" d="M130 400H790M130 300H790M130 200H790" /><path className="chart-area" d="M130 500L220 430L310 450L400 320L490 350L580 210L670 250L790 135V500H130Z" /><path className="chart-line" d="M130 500L220 430L310 450L400 320L490 350L580 210L670 250L790 135" /><circle className="chart-point" cx="580" cy="210" r="10" /><circle className="chart-point" cx="790" cy="135" r="10" />
      </svg>
      <div className="illustration-panel illustration-panel-score"><span className="illustration-panel-kicker">PROJECTED IRR</span><strong>21.8%</strong><span className="illustration-status">Base case / Stable</span></div>
      <div className="illustration-chip">BASE CASE <span /></div>
    </Frame>
  );
}

function TimelineIllustration() {
  return (
    <Frame variant="timeline">
      <div className="timeline-track"><div className="timeline-progress" /><div className="timeline-step timeline-step-one"><b>01</b><span>Source</span></div><div className="timeline-step timeline-step-two"><b>02</b><span>Review</span></div><div className="timeline-step timeline-step-three"><b>03</b><span>Diligence</span></div><div className="timeline-step timeline-step-four"><b>04</b><span>Close</span></div></div>
      <div className="illustration-panel illustration-panel-score"><span className="illustration-panel-kicker">DEAL COMPLETION</span><strong>68%</strong><span className="illustration-status">Diligence in progress</span></div>
      <div className="illustration-chip">OFFER ACCEPTED <span /></div>
    </Frame>
  );
}

export default function Scene3D({ variant = 'city' }: Scene3DProps) {
  if (variant === 'network') return <NetworkIllustration />;
  if (variant === 'property') return <PropertyIllustration />;
  if (variant === 'graph') return <GraphIllustration />;
  if (variant === 'timeline') return <TimelineIllustration />;
  return <CityIllustration />;
}
