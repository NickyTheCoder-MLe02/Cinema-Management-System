import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './App.css';

// --- MOCK DATA FOR DEMO ---
const salesData = [
  { name: 'Mon', tickets: 120, revenue: 1200 },
  { name: 'Tue', tickets: 90, revenue: 900 },
  { name: 'Wed', tickets: 150, revenue: 1500 },
  { name: 'Thu', tickets: 180, revenue: 1800 },
  { name: 'Fri', tickets: 250, revenue: 2500 },
  { name: 'Sat', tickets: 350, revenue: 3500 },
  { name: 'Sun', tickets: 300, revenue: 3000 },
];

const occupancyData = [
  { room: 'Room A', rate: 85 },
  { room: 'Room B', rate: 60 },
  { room: 'Room C', rate: 92 },
  { room: 'VIP 1', rate: 100 },
  { room: 'VIP 2', rate: 45 },
];

function App() {
  const [role, setRole] = useState(null); // null, 'admin', 'clerk'

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <div className="app-container">
      {/* NAVBAR */}
      {role && (
        <nav className="navbar">
          <h2>🎬 DATCOM Cinema {role === 'admin' ? 'Management' : 'Booking'}</h2>
          <div>
            <span style={{ marginRight: '20px' }}>Logged in as: <strong>{role.toUpperCase()}</strong></span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      )}

      {/* RENDER SCREEN BASED ON ROLE */}
      {!role && <LoginScreen onLogin={handleLogin} />}
      {role === 'admin' && <AdminDashboard />}
      {role === 'clerk' && <BookingScreen />}
    </div>
  );
}

// ------------------------------------------------------------------
// 1. LOGIN SCREEN COMPONENT
// ------------------------------------------------------------------
function LoginScreen({ onLogin }) {
  return (
    <div className="login-screen">
      <h1>Welcome to DATCOM Cinema System</h1>
      <p style={{ color: '#aaa' }}>Please select your role to login</p>
      
      <div className="role-cards">
        <div className="role-card" onClick={() => onLogin('admin')}>
          <div className="role-icon">📊</div>
          <h2>System Admin</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Access Reports & Occupancy Rates</p>
        </div>
        
        <div className="role-card" onClick={() => onLogin('clerk')}>
          <div className="role-icon">🎟️</div>
          <h2>Ticket Clerk</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Access Seat Map & Booking</p>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 2. ADMIN DASHBOARD COMPONENT
// ------------------------------------------------------------------
function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <h2 style={{ marginBottom: '20px' }}>Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Weekly Revenue</h3>
          <h1>$14,400</h1>
        </div>
        <div className="stat-card">
          <h3>Tickets Sold</h3>
          <h1>1,440</h1>
        </div>
        <div className="stat-card">
          <h3>Avg. Occupancy</h3>
          <h1>76.4%</h1>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h3 style={{ marginBottom: '20px' }}>Weekly Sales & Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#2ed573" strokeWidth={3} />
              <Line type="monotone" dataKey="tickets" stroke="#4a90e2" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3 style={{ marginBottom: '20px' }}>Occupancy Rate by Room (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="room" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
              <Bar dataKey="rate" fill="#ff4757" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. BOOKING SCREEN COMPONENT (CLERK)
// ------------------------------------------------------------------
function BookingScreen() {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];
  const bookedSeats = ['A4', 'A5', 'C3', 'C4', 'E8', 'B1'];
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="cinema-container">
      <h2>Seat Selection - 'The Dark Knight' (Room A)</h2>
      <div className="screen-indicator">SCREEN</div>

      <div className="seats-grid">
        {rows.map(row => (
          cols.map(col => {
            const seatId = `${row}${col}`;
            const isBooked = bookedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);
            let seatClass = 'seat available';
            if (isBooked) seatClass = 'seat booked';
            if (isSelected) seatClass = 'seat selected';

            return (
              <button key={seatId} className={seatClass} onClick={() => handleSeatClick(seatId)} disabled={isBooked}>
                {seatId}
              </button>
            );
          })
        ))}
      </div>

      <div className="legend-container">
        <div className="legend-item"><div className="legend-box available"></div> Available</div>
        <div className="legend-item"><div className="legend-box selected"></div> Selected</div>
        <div className="legend-item"><div className="legend-box booked"></div> Booked</div>
      </div>

      {selectedSeats.length > 0 && (
        <div style={{ backgroundColor: '#1f1f1f', padding: '15px 30px', borderRadius: '8px', border: '1px solid #444' }}>
          <p><strong>Tickets:</strong> {selectedSeats.length} | <strong>Seats:</strong> {selectedSeats.join(', ')}</p>
          <button style={{ backgroundColor: '#2ed573', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}

export default App;