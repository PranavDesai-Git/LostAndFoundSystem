import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Dropdown = ({ label, options, selected, onSelect, fullWidth = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown-container" style={{ width: fullWidth ? '100%' : 'auto' }}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{selected ? `${label}: ${selected}` : label}</span>
        <span className={`arrow ${isOpen ? 'up' : ''}`}>▼</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="dropdown-list"
          >
            {options.map((opt) => (
              <li key={opt} onClick={() => { onSelect(opt); setIsOpen(false); }}>{opt}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;