import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'; // Import the new component
import './LandingPage.css';

function LandingPage() {
  const [showGemini, setShowGemini] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMaskPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="landing-wrapper" style={{ '--x': `${maskPos.x}px`, '--y': `${maskPos.y}px` }}>
      <div className={`custom-cursor ${isHovering ? 'active' : ''}`} style={{ left: mousePos.x, top: mousePos.y }} />

      <div className="hero-container" ref={heroRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={() => setIsClicked(true)}>
        {!isHovering && !isClicked && <div className="hint-text">???</div>}
        <h1 className={`hero-text text-hidden ${isClicked ? 'sticky-reveal' : ''}`}>Lost?<br />Found!</h1>
        {!isClicked && (
          <h1 className={`hero-text text-reveal ${isHovering ? 'active' : ''}`}>Lost?<br />Found!</h1>
        )}
      </div>

      {/* Reusable Button applied here */}
      <div style={{ width: '250px' }}>
        <Button text="LOGIN / SIGNUP" onClick={() => navigate('/auth')} />
      </div>

      <div className="credits-container" onClick={() => setShowGemini(!showGemini)}>
        <p className="credits-text">made by Pranav Desai, Shriker Peri, Sainash Sahoo</p>
        {showGemini && <span className="gemini-text">(and a bitta gemini)</span>}
      </div>
    </div>
  );
}

export default LandingPage;