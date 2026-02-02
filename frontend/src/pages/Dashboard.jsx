import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../context/ItemContext';
import Button from '../components/Button';
import ReportForm from './ReportForm';
import Dropdown from './Dropdown';
import './Dashboard.css';

const DetailsView = ({ item, onClose }) => {
  if (!item) return null;

  // Safe formatting for CSS classes: handles nulls and different naming conventions
  const formatStatusClass = (status) => {
    if (!status) return 'unknown';
    return status.toLowerCase().replace(/_/g, '-').replace(/, /g, '-');
  };

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="details-overlay"
    >
      <Button text="BACK TO FEED [ESC]" variant="primary" onClick={onClose} />
      <div className="details-content">
        <div className="details-header">
          <span className={`status-tag tag-${formatStatusClass(item.status)}`}>
            {item.status?.replace(/_/g, ' ')}
          </span>
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
          <p>{item.description || "No description provided."}</p>
        </div>

        <div className="details-grid">
          <div className="details-section">
            <h3>POSTER INFO</h3>
            <p><strong>Username:</strong> @{item.postedBy}</p>
            {/* FIXED: Removed .split() which caused the white screen crash */}
            <p><strong>Reference:</strong> DB-REF-{item.id}</p>
          </div>
          <div className="details-section">
            <h3>CONTACT</h3>
            <p><strong>Email:</strong> {item.postedBy}@university.edu</p>
          </div>
        </div>
        <Button text="CLAIM THIS ITEM" onClick={() => console.log("Claiming...", item.id)} />
      </div>
    </motion.div>
  );
};

const ItemCard = ({ item, viewMode, onClick }) => {
  const formatStatusClass = (status) => {
    if (!status) return 'unknown';
    return status.toLowerCase().replace(/_/g, '-').replace(/, /g, '-');
  };

  return (
    <motion.div
      layout
      onClick={() => onClick(item)}
      className={`item-card ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
      style={{ cursor: 'pointer' }}
    >
      {item.image && (
        <div className="card-image-wrapper">
          <img src={item.image} alt={item.name} className="card-image" />
        </div>
      )}
      <div className="card-info">
        <div className="card-top">
          <span className={`status-tag tag-${formatStatusClass(item.status)}`}>
            {item.status?.replace(/_/g, ' ')}
          </span>
          <span className="item-id">#{item.id}</span>
        </div>
        <h3 className="item-name">{item.name}</h3>
        <p className="item-desc">{item.description}</p>
        <div className="item-details">
          <p><strong>BY:</strong> @{item.postedBy}</p>
        </div>
      </div>
    </motion.div>
  );
};

function Dashboard() {
  const navigate = useNavigate();
  const { items, loading, error } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState('LATEST');
  const [tag, setTag] = useState('ALL TAGS');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isReporting, setIsReporting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
        setIsReporting(false);
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

  const filteredItems = items?.filter((item) => {
    const lowerSearch = debouncedSearch.toLowerCase();
    const posterMatch = lowerSearch.match(/poster:(\S+)/);
    const cleanSearch = lowerSearch.replace(/poster:\S+/, '').trim();

    const matchesText = !cleanSearch ||
      item.name?.toLowerCase().includes(cleanSearch) ||
      item.description?.toLowerCase().includes(cleanSearch);

    // Exact match for tags (handling underscore from Java)
    const matchesTag = tag === 'ALL TAGS' || item.status === tag;

    const matchesPoster = !posterMatch || item.postedBy?.toLowerCase().includes(posterMatch[1]);

    return matchesText && matchesTag && matchesPoster;
  }) || [];

  if (loading) return <div className="loading-state">SYNCING_DATABASE...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="dashboard-wrapper">
      <header className="dash-header">
        <div className="dash-logo" onClick={() => navigate('/home')} style={{cursor: 'pointer'}}>?!</div>
        <div className="header-right">
          <div style={{ width: '220px' }}>
            <Button text="+ REPORT ITEM" onClick={() => setIsReporting(true)} />
          </div>
          <div className="view-toggle">
            <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>GRID</button>
            <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>LIST</button>
          </div>
          <div style={{ width: '120px' }}>
            <Button text="USER" onClick={() => navigate('/profile')} />
          </div>
        </div>
      </header>

      <main className="dash-content">
        <div className="filter-section">
          <div className={`search-container ${isSearching ? 'searching' : ''}`}>
            <input
              type="text"
              className="search-bar"
              placeholder="SEARCH (poster:name)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dropdown label="SORT" options={['LATEST', 'OLDEST']} selected={sortBy} onSelect={setSortBy} />
          <Dropdown label="TAGS" options={['ALL TAGS', 'LOST', 'FOUND', 'FOUND_NOT_TAKEN']} selected={tag} onSelect={setTag} />
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
        {selectedItem && <DetailsView item={selectedItem} onClose={() => setSelectedItem(null)} />}
        {isReporting && <ReportForm onClose={() => setIsReporting(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;