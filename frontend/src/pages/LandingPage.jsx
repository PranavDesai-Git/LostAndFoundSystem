import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './LandingPage.css';

function LandingPage() {
  const [showGemini, setShowGemini] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e) => {
      if (isMobile) return;
      setMousePos({ x: e.clientX, y: e.clientY });

      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMaskPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <div className="landing-wrapper">
      {!isMobile && (
        <div
          className={`custom-cursor ${isHovering ? 'active' : ''}`}
          style={{ left: mousePos.x, top: mousePos.y }}
        />
      )}

      <div
        className="hero-container"
        ref={heroRef}
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
        onClick={() => setIsClicked(true)}
        style={{ '--x': `${maskPos.x}px`, '--y': `${maskPos.y}px` }}
      >
        {!isHovering && !isClicked && !isMobile && <div className="hint-text">???</div>}

        <h1 className={`hero-text ${!isMobile && !isClicked ? 'text-hidden' : 'sticky-reveal'}`}>
          Lost?<br />Found!
        </h1>

        {!isClicked && !isMobile && (
          <h1 className={`hero-text text-reveal ${isHovering ? 'active' : ''}`}>
            Lost?<br />Found!
          </h1>
        )}
      </div>

      <div className="button-box">
        <Button text="LOGIN / SIGNUP" onClick={() => navigate('/auth')} />
      </div>

      <div className="credits-container" onClick={() => setShowGemini(!showGemini)}>
        <p className="credits-text">
          made by Pranav Desai, Shriker Peri, Sainash Sahoo
        </p>
        {showGemini && (
          <span className="gemini-text">(and a bitta gemini)</span>
        )}
      </div>
    </div>
  );
}

export default LandingPage;