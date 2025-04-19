// src/components/PlaylistDetail.jsx
// Component for displaying detailed information about a playlist
// Accepts a playlist object as a prop and renders its details

import React from 'react';

// Placeholder image for playlist cover
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200x200?text=Playlist+Cover';

// Mock data for track list (replace with real data from Spotify API in future)
const MOCK_TRACKS = [
  { title: 'Track 1', artist: 'Artist A' },
  { title: 'Track 2', artist: 'Artist B' },
  { title: 'Track 3', artist: 'Artist C' }
];

function PlaylistDetail({ playlist, onBack }) {
  if (!playlist) return null;
  // Render detailed info for the selected playlist
  return (
    <div className="playlist-detail" style={{ padding: '1em', border: '1px solid #ccc', borderRadius: '8px', background: '#fafafa' }}>
      {/* Back button to return to playlist list */}
      <button onClick={onBack} style={{ marginBottom: '1em' }}>Back to Previews</button>
      {/* Playlist name */}
      <h2>{playlist.label || 'Playlist Name'}</h2>
      {/* Playlist cover image */}
      <img src={PLACEHOLDER_IMAGE} alt="Playlist Cover" style={{ width: 200, height: 200, borderRadius: '8px', marginBottom: '1em' }} />
      {/* Track list (mock data for now) */}
      <h3>Track List</h3>
      <ul>
        {MOCK_TRACKS.map((track, idx) => (
          <li key={idx}>{track.title} – {track.artist}</li>
        ))}
      </ul>
      {/* Link to listen on Spotify */}
      <div style={{ marginTop: '1em' }}>
        <a href={playlist.link || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#1db954', fontWeight: 'bold' }}>
          Listen on Spotify
        </a>
      </div>
      {/*
        This component receives a playlist object as a prop and renders its details.
        In the future, the track list and cover image can be replaced with real Spotify API data.
        Integrates with ChatPlaylistBuilder by being shown when a user clicks a playlist preview.
      */}
    </div>
  );
}

export default PlaylistDetail;
