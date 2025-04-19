// src/components/PlaylistDetail.test.jsx
// Unit tests for PlaylistDetail component
// Uses Jest and React Testing Library

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaylistDetail from './PlaylistDetail';

const MOCK_PLAYLIST = {
  label: 'Morning Vibes',
  link: 'https://open.spotify.com/playlist/mock123',
  // The cover image is a placeholder inside the component, so we don't need to pass it here
};

const MOCK_TRACKS = [
  'Track 1 – Artist A',
  'Track 2 – Artist B',
  'Track 3 – Artist C'
];

// Helper: Render PlaylistDetail with a mock playlist and onBack handler
function renderPlaylistDetail(playlist = MOCK_PLAYLIST, onBack = jest.fn()) {
  return render(<PlaylistDetail playlist={playlist} onBack={onBack} />);
}

describe('PlaylistDetail', () => {
  test('Basic Rendering: displays playlist details from prop', () => {
    renderPlaylistDetail();
    // The playlist name should be rendered
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Morning Vibes');
    // The cover image should be rendered (alt text: Playlist Cover)
    const img = screen.getByAltText(/playlist cover/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/placeholder/);
    // The mock track list should be rendered (from component mock, not from prop)
    expect(screen.getByText(/track 1/i)).toBeInTheDocument();
    expect(screen.getByText(/track 2/i)).toBeInTheDocument();
    expect(screen.getByText(/track 3/i)).toBeInTheDocument();
    // The Spotify link should be present and correct
    const link = screen.getByRole('link', { name: /listen on spotify/i });
    expect(link).toHaveAttribute('href', MOCK_PLAYLIST.link);
    /*
      This test checks that PlaylistDetail receives the playlist prop and displays
      the name, cover image, track list, and Spotify link as expected.
    */
  });

  test('Back Button Functionality: calls onBack when clicked', () => {
    const onBack = jest.fn();
    renderPlaylistDetail(MOCK_PLAYLIST, onBack);
    const backBtn = screen.getByRole('button', { name: /back to previews/i });
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalledTimes(1);
    /*
      This test ensures that clicking the Back button calls the provided onBack callback,
      allowing users to exit the detail view and return to the previews list.
    */
  });

  test('Edge Case Handling: handles missing fields gracefully', () => {
    // Pass an incomplete playlist object (missing label and link)
    renderPlaylistDetail({});
    // Should show the default label
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/playlist name/i);
    // Should show the placeholder image
    const img = screen.getByAltText(/playlist cover/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/placeholder/);
    // Should show the default link ("#")
    const link = screen.getByRole('link', { name: /listen on spotify/i });
    expect(link).toHaveAttribute('href', '#');
    /*
      This test checks that the component handles missing or incomplete playlist data gracefully,
      which is important for robustness and user experience.
    */
  });
});
