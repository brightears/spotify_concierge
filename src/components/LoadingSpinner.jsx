// src/components/LoadingSpinner.jsx
// A simple, reusable loading spinner component for indicating loading states.
// This spinner is used to show when an async API call is in progress.
import React from 'react';

// Inline CSS for the spinner animation
const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
};

const circleStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid #ccc',
  borderTop: '4px solid #1db954', // Spotify green for branding
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Keyframes for the spinner animation
const styleSheet = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

// LoadingSpinner component
function LoadingSpinner() {
  return (
    <div style={spinnerStyle}>
      {/* Inject keyframes for animation */}
      <style>{styleSheet}</style>
      <div style={circleStyle} aria-label="Loading" />
    </div>
  );
}

export default LoadingSpinner;
