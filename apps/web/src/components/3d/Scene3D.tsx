'use client';

interface Scene3DProps {
  children: React.ReactNode;
}

export default function Scene3D({ children }: Scene3DProps) {
  void children;

  return (
    <div className="property-illustration" aria-hidden="true">
      <div className="illustration-sun" />
      <div className="illustration-label illustration-label-top">LIVE PROPERTY INTELLIGENCE</div>
      <div className="illustration-grid" />
      <svg className="illustration-map" viewBox="0 0 900 620" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="illustration-road" d="M-30 500C130 420 190 540 330 455C475 366 550 445 690 335C755 284 835 290 930 235" />
        <path className="illustration-road illustration-road-secondary" d="M80 120C220 210 290 170 385 260C470 340 555 290 690 410C755 466 830 470 940 530" />
        <path className="illustration-flow" d="M120 440C250 350 315 420 405 325C500 225 590 330 760 175" />
        <path className="illustration-flow illustration-flow-delay" d="M120 440C250 350 315 420 405 325C500 225 590 330 760 175" />
        <g className="illustration-house">
          <path d="M170 368L222 323L274 368V438H170V368Z" fill="#FFFFFF" stroke="#173D2B" strokeWidth="4" />
          <path d="M158 370L222 314L286 370" stroke="#173D2B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M211 438V393H233V438" fill="#B7D83D" stroke="#173D2B" strokeWidth="4" />
          <path d="M187 382H204V399H187V382ZM240 382H257V399H240V382Z" fill="#DDEAF0" stroke="#173D2B" strokeWidth="3" />
        </g>
        <g className="illustration-house illustration-house-two">
          <path d="M600 242L642 206L684 242V300H600V242Z" fill="#FFFFFF" stroke="#173D2B" strokeWidth="4" />
          <path d="M590 244L642 195L694 244" stroke="#173D2B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M632 300V264H652V300" fill="#B7D83D" stroke="#173D2B" strokeWidth="4" />
        </g>
        <g className="illustration-node illustration-node-one"><circle cx="120" cy="440" r="10" /><circle cx="120" cy="440" r="21" /></g>
        <g className="illustration-node illustration-node-two"><circle cx="405" cy="325" r="10" /><circle cx="405" cy="325" r="21" /></g>
        <g className="illustration-node illustration-node-three"><circle cx="760" cy="175" r="10" /><circle cx="760" cy="175" r="21" /></g>
      </svg>
      <div className="illustration-panel illustration-panel-score"><span className="illustration-panel-kicker">OPPORTUNITY SCORE</span><strong>86.4</strong><span className="illustration-status">↑ 12.8% this quarter</span></div>
      <div className="illustration-panel illustration-panel-market"><span className="illustration-panel-kicker">MARKET SIGNAL</span><span className="illustration-bars"><i /><i /><i /><i /><i /></span><span className="illustration-status">North Dallas / Active</span></div>
      <div className="illustration-chip">VALUATION READY <span /></div>
    </div>
  );
}