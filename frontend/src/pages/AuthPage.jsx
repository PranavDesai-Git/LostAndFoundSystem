import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './AuthPage.css';

function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('username');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!username) return;
    username === "test" ? setStep('password') : setError(true);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-logo">?!</div>
        <div className="auth-card">
          <input
            type="text"
            className={`auth-input ${step === 'password' ? 'input-locked' : ''} ${error ? 'input-error' : ''}`}
            placeholder="USERNAME"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(false); }}
            disabled={step === 'password'}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          />
          {step === 'password' && (
            <div className="fade-in">
              <input type="password" className="auth-input" placeholder="PASSWORD"
                     value={password} onChange={(e) => setPassword(e.target.value)}
                     autoFocus onKeyDown={(e) => e.key === 'Enter' && navigate('/home')} />
              <Button text="ENTER ->" onClick={() => navigate('/home')} />
            </div>
          )}
          {username.length > 0 && step === 'username' && !error && <Button text="NEXT ->" onClick={handleNext} />}
          {error && (
            <div className="fade-in">
              <p className="error-text">USER NOT FOUND</p>
              <Button text="CREATE ACCOUNT?" onClick={() => setStep('password')} />
            </div>
          )}
          {step === 'username' && (
            <div className="social-container" style={{ marginTop: '15px' }}>
              <Button text="GOOGLE" variant="outline" />
              <Button text="APPLE" variant="outline" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;