import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <header className="dash-header">
        <div className="dash-logo">?!</div>
        <nav className="dash-nav">
          <button className="nav-item">LOST</button>
          <button className="nav-item">FOUND</button>
          <div className="user-profile">USER</div>
        </nav>
      </header>

      <main className="dash-content">
        <h2 className="welcome-text">FEED</h2>
        {/* We'll put the grid here next */}
      </main>
    </div>
  );
}

export default Dashboard;