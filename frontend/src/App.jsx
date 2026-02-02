import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ItemProvider } from './context/ItemContext'; // Make sure this path is correct
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import UserPage from './pages/User';
import './App.css';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{ width: '100%', height: '100%' }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  // Internal theme logic remains the same
  const isInternal = location.pathname === '/home' || location.pathname === '/profile';

  return (
    <div className={`global-bg-wrapper ${isInternal ? 'dashboard-theme' : ''}`}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
          <Route path="/auth" element={<PageWrapper><AuthPage /></PageWrapper>} />
          {/* We removed the items prop here because components now use useItems() */}
          <Route path="/home" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><UserPage /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ItemProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </ItemProvider>
  );
}

export default App;