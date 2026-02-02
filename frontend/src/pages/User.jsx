import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useItems } from '../context/ItemContext';
import Button from '../components/Button';
import EditForm from './EditForm';
import './User.css';

const UserPage = () => {
  const navigate = useNavigate();
  const { items, deleteItem, loading } = useItems(); // Context Hook
  const [editingItem, setEditingItem] = useState(null);

  const [userData] = useState({
    username: 'pranavdesai',
    fullName: 'Pranav Desai',
    email: 'pranav.d@university.edu',
    phone: '+1 (555) 892-0021',
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setEditingItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const myPosts = items?.filter(item => item.postedBy === userData.username) || [];
  const ownedItems = items?.filter(item => item.owner === userData.fullName) || [];

  if (loading) return <div className="loading-state">SYNCING_PROFILE...</div>;

  return (
    <div className="user-page-wrapper">
      <nav className="user-nav">
        <div className="nav-btn-limit">
          <Button text="← BACK TO FEED" variant="outline" onClick={() => navigate('/home')} />
        </div>
      </nav>

      <header className="user-header">
        <h1 className="user-title">USER_DASHBOARD</h1>
        <div className="user-stats">
          <div className="stat-box">
            <span className="stat-value">{myPosts.length}</span>
            <span className="stat-label">REPORTS</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{ownedItems.length}</span>
            <span className="stat-label">OWNED</span>
          </div>
        </div>
      </header>

      <div className="user-layout">
        <aside className="user-settings-aside">
          <div className="settings-section">
            <h3>ACCOUNT INFO</h3>
            <div className="input-group">
              <label>USERNAME</label>
              <input type="text" value={userData.username} readOnly className="locked-input" />
            </div>
            <div className="input-group">
              <label>FULL NAME</label>
              <input type="text" defaultValue={userData.fullName} />
            </div>
            <div className="input-group">
              <label>EMAIL</label>
              <input type="email" defaultValue={userData.email} />
            </div>
            <Button text="UPDATE PROFILE" onClick={() => console.log("Profile updated")} />
          </div>
          <div className="logout-wrapper">
            <Button text="LOGOUT SESSION" variant="outline" onClick={() => navigate('/')} />
          </div>
        </aside>

        <main className="user-main-content">
          <section className="content-block">
            <h2 className="section-subtitle">ACTIVE_REPORTS</h2>
            <div className="user-items-grid">
              <AnimatePresence mode="popLayout">
                {myPosts.map((item) => (
                  <motion.div
                    layout key={item.id} className="user-item-card"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  >
                    <div className="u-card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span className="u-card-id">#{item.id}</span>
                      <span className={`status-tag tag-${item.status.replace(/, /g, '-').toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 style={{ marginBottom: '15px' }}>{item.name}</h3>
                    <div className="u-card-actions">
                      <Button text="EDIT" variant="outline" onClick={() => setEditingItem(item)} />
                      <Button
                        text="REMOVE"
                        variant="outline"
                        onClick={() => { if(window.confirm("DELETE RECORD?")) deleteItem(item.id); }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section className="content-block">
            <h2 className="section-subtitle">OWNED_INVENTORY</h2>
            <div className="owned-table-container">
              <table className="owned-table">
                <thead>
                  <tr>
                    <th>ITEM ID</th>
                    <th>ITEM NAME</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {ownedItems.map((item) => (
                    <tr key={item.id}>
                      <td className="t-id">{item.id}</td>
                      <td className="t-name">{item.name}</td>
                      <td>
                        <span className={`status-tag tag-${item.status.replace(/, /g, '-').toLowerCase()}`}>{item.status}</span>
                      </td>
                      <td className="t-btn-cell">
                        <Button text="MANAGE" variant="outline" onClick={() => setEditingItem(item)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      <AnimatePresence>
        {editingItem && <EditForm item={editingItem} onClose={() => setEditingItem(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default UserPage;