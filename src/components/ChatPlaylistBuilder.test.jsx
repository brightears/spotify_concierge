// src/components/ChatPlaylistBuilder.test.jsx
// Unit tests for ChatPlaylistBuilder state persistence
// Uses Jest and React Testing Library

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ChatPlaylistBuilder from './ChatPlaylistBuilder';

// Use jest-localstorage-mock to mock localStorage
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('ChatPlaylistBuilder state persistence', () => {
  test('Default State Loading: initializes with default values when no localStorage', () => {
    // Render component with no saved state
    render(<ChatPlaylistBuilder />);
    // Check for initial UI elements (first question prompt, empty input, etc.)
    expect(screen.getByLabelText(/what type of business/i)).toBeInTheDocument();
    // Default state checks (not directly visible, but implied by UI)
    // answers should be empty, step should be 0, input empty, showReview false, playlistPreviews empty
    // (UI shows first question, no previews, no review screen)
    expect(screen.queryByText(/review your answers/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/your playlist previews/i)).not.toBeInTheDocument();
  });

  test('State Restoration from localStorage: loads saved state into component', () => {
    // Simulate saved state in localStorage
    const savedState = {
      answers: { businessType: 'cafe' },
      step: 2,
      input: 'chill',
      showReview: true,
      playlistPreviews: [{ label: 'Morning Vibes', link: '#' }]
    };
    localStorage.setItem('playlistBuilderState', JSON.stringify(savedState));
    // Render component, should restore state from localStorage
    render(<ChatPlaylistBuilder />);
    // UI should reflect restored state (review screen shown)
    expect(screen.getByText(/review your answers/i)).toBeInTheDocument();
    expect(screen.getByText(/cafe/i)).toBeInTheDocument();
    // Playlist previews should not show yet (since showPreviews is false)
    expect(screen.queryByText(/your playlist previews/i)).not.toBeInTheDocument();
  });

  test('State Saving: updates localStorage when state changes', () => {
    // Render component
    render(<ChatPlaylistBuilder />);
    // Simulate answering the first question
    const input = screen.getByLabelText(/what type of business/i);
    act(() => {
      input.value = 'hotel';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    // Submit the answer
    act(() => {
      screen.getByRole('button', { name: /next|submit/i }).click();
    });
    // Check that localStorage was updated with new answers and step
    const saved = JSON.parse(localStorage.getItem('playlistBuilderState'));
    expect(saved.answers.businessType).toBe('hotel');
    expect(saved.step).toBe(1);
    // Other state variables should still have their default values
    expect(saved.input).toBe('');
    expect(saved.showReview).toBe(false);
    expect(Array.isArray(saved.playlistPreviews)).toBe(true);
  });
});

// --- Reset Chat Functionality Tests ---
describe('Reset Chat functionality', () => {
  let originalConfirm;
  beforeEach(() => {
    // Save the original window.confirm
    originalConfirm = window.confirm;
  });
  afterEach(() => {
    // Restore window.confirm
    window.confirm = originalConfirm;
  });

  test('Resets all state variables when user confirms reset', () => {
    // Mock window.confirm to return true (user confirms reset)
    window.confirm = jest.fn(() => true);
    // Set up initial state in localStorage
    const initialState = {
      answers: { businessType: 'hotel' },
      step: 2,
      input: 'chill',
      showReview: true,
      playlistPreviews: [{ label: 'Morning Vibes', link: '#' }],
      previewError: 'Some error'
    };
    localStorage.setItem('playlistBuilderState', JSON.stringify(initialState));
    // Render component
    render(<ChatPlaylistBuilder />);
    // Find and click the Reset Chat button
    act(() => {
      screen.getByRole('button', { name: /reset chat/i }).click();
    });
    // After confirming, all state variables should be reset to defaults
    const saved = JSON.parse(localStorage.getItem('playlistBuilderState'));
    expect(saved.answers).toEqual({});
    expect(saved.step).toBe(0);
    expect(saved.input).toBe('');
    expect(saved.showReview).toBe(false);
    expect(saved.playlistPreviews).toEqual([]);
    // previewError is not saved in localStorage, but UI should reflect no error
    expect(screen.queryByText(/some error/i)).not.toBeInTheDocument();
    /*
      This test verifies that clicking Reset Chat and confirming resets all state variables,
      ensuring the user gets a fresh start. This is important for user experience and reliability.
    */
  });

  test('Does not reset state variables when user cancels reset', () => {
    // Mock window.confirm to return false (user cancels reset)
    window.confirm = jest.fn(() => false);
    // Set up initial state in localStorage
    const initialState = {
      answers: { businessType: 'hotel' },
      step: 2,
      input: 'chill',
      showReview: true,
      playlistPreviews: [{ label: 'Morning Vibes', link: '#' }],
      previewError: 'Some error'
    };
    localStorage.setItem('playlistBuilderState', JSON.stringify(initialState));
    // Render component
    render(<ChatPlaylistBuilder />);
    // Find and click the Reset Chat button
    act(() => {
      screen.getByRole('button', { name: /reset chat/i }).click();
    });
    // After canceling, state variables should remain unchanged
    const saved = JSON.parse(localStorage.getItem('playlistBuilderState'));
    expect(saved.answers).toEqual(initialState.answers);
    expect(saved.step).toBe(initialState.step);
    expect(saved.input).toBe(initialState.input);
    expect(saved.showReview).toBe(initialState.showReview);
    expect(saved.playlistPreviews).toEqual(initialState.playlistPreviews);
    /*
      This test verifies that if the user cancels the reset confirmation,
      their progress is preserved and nothing is lost. This prevents accidental data loss.
    */
  });
});

// --- Review/Confirmation Screen Tests ---
describe('Review/Confirmation Screen', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Confirm Flow: clicking Confirm hides review, shows previews, and updates playlistPreviews', async () => {
    // Prepare mock API response for playlist previews
    const mockPreviews = [
      { label: 'Mock Playlist 1', link: '#' },
      { label: 'Mock Playlist 2', link: '#' }
    ];
    // Spy on the API function
    const api = require('./ChatPlaylistBuilder');
    // Mock getSpotifyPlaylistPreviews to resolve with mockPreviews
    jest.spyOn(api, 'getSpotifyPlaylistPreviews').mockImplementation(() => Promise.resolve(mockPreviews));

    // Simulate saved state: all questions answered, review is visible
    const answers = {
      businessType: 'hotel',
      targetAudience: 'tourists',
      brandMood: 'chill',
      timeSlots: 'morning',
      genrePrefs: 'jazz'
    };
    const savedState = {
      answers,
      step: 5,
      input: '',
      showReview: true,
      playlistPreviews: []
    };
    localStorage.setItem('playlistBuilderState', JSON.stringify(savedState));
    // Render component
    render(<ChatPlaylistBuilder />);
    // Confirm review screen is visible
    expect(screen.getByText(/review your answers/i)).toBeInTheDocument();
    // Click Confirm
    await act(async () => {
      screen.getByRole('button', { name: /confirm/i }).click();
    });
    // After confirming, review screen should be hidden
    expect(screen.queryByText(/review your answers/i)).not.toBeInTheDocument();
    // Playlist previews should be shown
    expect(screen.getByText(/your playlist previews/i)).toBeInTheDocument();
    // The playlist previews state should be updated with mock API response
    expect(screen.getByText(/mock playlist 1/i)).toBeInTheDocument();
    expect(screen.getByText(/mock playlist 2/i)).toBeInTheDocument();
    /*
      This test verifies:
      - Confirm hides the review screen (showReview false)
      - Previews are shown (showPreviews true)
      - API is called and playlistPreviews is updated
    */
  });

  test('Edit Flow: clicking Edit hides review and allows editing', () => {
    // Simulate saved state: review is visible with pre-filled answers
    const answers = {
      businessType: 'cafe',
      targetAudience: 'locals',
      brandMood: 'energetic',
      timeSlots: 'evening',
      genrePrefs: 'pop'
    };
    const savedState = {
      answers,
      step: 5,
      input: '',
      showReview: true,
      playlistPreviews: []
    };
    localStorage.setItem('playlistBuilderState', JSON.stringify(savedState));
    // Render component
    render(<ChatPlaylistBuilder />);
    // Confirm review screen is visible
    expect(screen.getByText(/review your answers/i)).toBeInTheDocument();
    // Click Edit
    act(() => {
      screen.getByRole('button', { name: /edit/i }).click();
    });
    // Review screen should be hidden
    expect(screen.queryByText(/review your answers/i)).not.toBeInTheDocument();
    // The chat flow should be visible (first question prompt)
    expect(screen.getByLabelText(/what type of business/i)).toBeInTheDocument();
    // Step should be reset to 0 (editing allowed from beginning)
    // Answers should remain unchanged
    const saved = JSON.parse(localStorage.getItem('playlistBuilderState'));
    expect(saved.answers).toEqual(answers);
    /*
      This test verifies:
      - Edit hides the review screen (showReview false)
      - Step is set to 0 (user can edit answers)
      - Answers remain unchanged
    */
  });
});

// --- Jump-to-Question Functionality Test ---
describe('Jump-to-Question functionality', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Clicking a question/answer pair in review jumps to that question for editing', () => {
    // Simulate saved state: review is visible with pre-filled answers
    const answers = {
      businessType: 'cafe',
      targetAudience: 'locals',
      brandMood: 'energetic',
      timeSlots: 'evening',
      genrePrefs: 'pop'
    };
    const savedState = {
      answers,
      step: 5,
      input: '',
      showReview: true,
      playlistPreviews: []
    };
    localStorage.setItem('playlistBuilderState', JSON.stringify(savedState));
    // Render component
    render(<ChatPlaylistBuilder />);
    // Confirm review screen is visible
    expect(screen.getByText(/review your answers/i)).toBeInTheDocument();
    // Find the list item for the third question (brandMood)
    const brandMoodItem = screen.getByText(/what brand mood/i).closest('li');
    // Simulate user clicking the brandMood question/answer pair
    act(() => {
      brandMoodItem.click();
    });
    // Review screen should be hidden
    expect(screen.queryByText(/review your answers/i)).not.toBeInTheDocument();
    // The chat flow should now be showing the brandMood question prompt
    expect(screen.getByLabelText(/what brand mood/i)).toBeInTheDocument();
    // Optionally, check if the input field is pre-filled with the previous answer
    const input = screen.getByLabelText(/what brand mood/i);
    // The input value should be 'energetic' (the answer for brandMood)
    expect(input.value).toBe('energetic');
    /*
      This test verifies:
      - Clicking a question/answer pair hides the review screen (showReview false)
      - Sets the step to the index of the clicked question (brandMood)
      - The input field is pre-filled with the corresponding answer
      This improves UX by enabling targeted editing, letting users revise any answer directly from the review screen.
    */
  });
});

/*
Each test checks a key scenario for state persistence:
- Default State Loading: Ensures the component uses default values if nothing is saved (important for first-time users).
- State Restoration: Ensures saved progress is restored on reload (critical for user experience).
- State Saving: Ensures any progress is saved as state changes (so progress isn't lost).
*/
