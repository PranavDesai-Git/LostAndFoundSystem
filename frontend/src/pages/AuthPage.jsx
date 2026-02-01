import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './AuthPage.css';

function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('username'); // 'username' or 'password'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (!username) return;

    // Check if user exists
    const userExists = username === "test";

    if (userExists) {
      setStep('password');
      setError('');
    } else {
      // User doesn't exist, we move to password step to "create" it
      setError("NEW USER DETECTED. SET YOUR PASSWORD.");
      setStep('password');
    }
  };

  const handleLogin = () => {
    if (!password) return;
    // For now, we just redirect. Later we will verify with Spring Boot.
    navigate('/home');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-logo">?!</div>

        <div className="auth-card">
          {error && <div className="error-msg">{error}</div>}

          {/* Username Field - becomes disabled once we move to password */}
          <input
            type="text"
            className={`auth-input ${step === 'password' ? 'input-locked' : ''}`}
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={step === 'password'}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          />

          {/* Password Field - only shows in step 2 */}
          {step === 'password' && (
            <div className="fade-in">
              <input
                type="password"
                className="auth-input"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button text="ENTER ->" onClick={handleLogin} />
            </div>
          )}

          {/* Initial Next Button */}
          {username.length > 0 && step === 'username' && (
            <div style={{ marginBottom: '15px' }}>
              <Button text="NEXT ->" onClick={handleNext} />
            </div>
          )}

          {/* Social Buttons hide when entering password to keep it clean */}
          {step === 'username' && (
            <div className="social-container">
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