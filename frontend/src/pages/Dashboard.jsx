import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Dashboard.css';

const DetailsView = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="details-overlay"
    >
      <button className="close-btn" onClick={onClose}>BACK TO FEED [ESC]</button>

      <div className="details-content">
        <div className="details-header">
          <span className={`status-tag tag-${item.status.replace(/, /g, '-').toLowerCase()}`}>{item.status}</span>
          <span className="details-id">ITEM ID: {item.id}</span>
        </div>

        <h1 className="details-title">{item.name}</h1>

        {item.image && (
          <div className="details-image-container">
            <img src={item.image} alt={item.name} />
          </div>
        )}

        <div className="details-section">
          <h3>DESCRIPTION</h3>
          <p>{item.description}</p>
        </div>

        <div className="details-grid">
          <div className="details-section">
            <h3>POSTER INFO</h3>
            <p><strong>Username:</strong> @{item.postedBy}</p>
            <p><strong>User ID:</strong> UID-{item.id.split('-')[1]}</p>
          </div>
          <div className="details-section">
            <h3>CONTACT</h3>
            <p><strong>Email:</strong> {item.postedBy}@university.edu</p>
            <p><strong>Phone:</strong> +1 (555) 000-0000</p>
          </div>
        </div>

        <button className="claim-btn">CLAIM THIS ITEM</button>
      </div>
    </motion.div>
  );
};

const CustomDropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="custom-dropdown-container">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{selected ? `${label}: ${selected}` : label}</span>
        <span className={`arrow ${isOpen ? 'up' : ''}`}>▼</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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

const ItemCard = ({ item, viewMode, onClick }) => {
  return (
    <motion.div
      layout
      onClick={() => onClick(item)}
      className={`item-card ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
    >
      {item.image && (
        <div className="card-image-wrapper">
          <img src={item.image} alt={item.name} className="card-image" />
        </div>
      )}
      <div className="card-info">
        <div className="card-top">
          <span className={`status-tag tag-${item.status.replace(/, /g, '-').toLowerCase()}`}>{item.status}</span>
          <span className="item-id">#{item.id}</span>
        </div>
        <h3 className="item-name">{item.name}</h3>
        <p className="item-desc">{item.description}</p>
        <div className="item-details">
          <p><strong>OWNER:</strong> {item.owner || "UNIDENTIFIED"}</p>
          <p><strong>POSTED BY:</strong> @{item.postedBy}</p>
        </div>
      </div>
    </motion.div>
  );
};

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState('LATEST');
  const [tag, setTag] = useState('ALL TAGS');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchTerm !== debouncedSearch) setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setIsSearching(false);
    }, 600);
    return () => clearTimeout(handler);
  }, [searchTerm, debouncedSearch]);

  const items = [
    { id: "LF-9021", name: "Airpods Pro", owner: "Sainash Sahoo", status: "LOST", description: "Left on the library table near the window.", location: "Main Library", image: "https://images.unsplash.com/photo-1588423770574-91993ca52ff6?q=80&w=500", postedBy: "pranavdesai", distance: 2, date: new Date('2026-01-28') },
    { id: "LF-4420", name: "Water Bottle", owner: null, status: "FOUND, NOT TAKEN", description: "Blue Hydroflask found near the gym entrance.", location: "Student Gym", image: null, postedBy: "shriker_p", distance: 8, date: new Date('2026-02-01') },
    { id: "LF-1102", name: "Car Keys", owner: "Pranav Desai", status: "FOUND", description: "Tesla keychain found in the parking lot.", location: "Zone C Parking", image: "https://images.unsplash.com/photo-1549194388-2469d59ec64c?q=80&w=500", postedBy: "gate_security", distance: 4, date: new Date('2026-01-15') }
  ];

  const filteredItems = items.filter((item) => {
    const cleanSearch = debouncedSearch.toLowerCase().replace(/poster:\S+/, '').replace(/distance:\d+(km)?/, '').trim();
    const matchesText = !cleanSearch || item.name.toLowerCase().includes(cleanSearch);
    const matchesTag = tag === 'ALL TAGS' || item.status === tag;
    return matchesText && matchesTag;
  });

  return (
    <div className="dashboard-wrapper">
      <header className="dash-header">
        <div className="dash-logo">?!</div>
        <div className="header-right">
          <div className="view-toggle">
            <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>GRID</button>
            <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>LIST</button>
          </div>
          <div className="user-profile">USER</div>
        </div>
      </header>

      <main className="dash-content">
        <div className="filter-section">
          <div className={`search-container ${isSearching ? 'searching' : ''}`}>
            <input type="text" className="search-bar" placeholder="SEARCH..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <CustomDropdown label="SORT" options={['LATEST', 'OLDEST']} selected={sortBy} onSelect={setSortBy} />
          <CustomDropdown label="TAGS" options={['ALL TAGS', 'LOST', 'FOUND']} selected={tag} onSelect={setTag} />
        </div>

        <div className={`item-grid ${viewMode === 'list' ? 'list-layout' : ''}`}>
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} viewMode={viewMode} onClick={setSelectedItem} />
            ))}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <DetailsView item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;