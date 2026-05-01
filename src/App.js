import React, { useState } from 'react';
import './App.css';

function App() {
  // Define grid size
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  // Hardcode some booked seats to demonstrate functionality
  const bookedSeats = ['A4', 'A5', 'C3', 'C4', 'E8', 'B1'];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    // Prevent clicking on booked seats
    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      // Select seat
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="cinema-container">
      <h1> Cinema Booking Demo</h1>
      <p style={{ color: '#aaaaaa', marginBottom: '30px' }}>Select your seats for 'The Dark Knight' - VIP 1</p>
      
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
              <button
                key={seatId}
                className={seatClass}
                onClick={() => handleSeatClick(seatId)}
                disabled={isBooked}
              >
                {seatId}
              </button>
            );
          })
        ))}
      </div>

      <div className="legend-container">
        <div className="legend-item">
          <div className="legend-box available"></div> Available
        </div>
        <div className="legend-item">
          <div className="legend-box selected"></div> Selected
        </div>
        <div className="legend-item">
          <div className="legend-box booked"></div> Booked
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="checkout-panel">
          <p><strong>Tickets Selected:</strong> {selectedSeats.length}</p>
          <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
          <button className="checkout-btn">Proceed to Demo Payment</button>
        </div>
      )}
    </div>
  );
}

export default App;