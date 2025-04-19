// src/hooks/useChatState.test.js
// Unit tests for the useChatState custom hook
// Uses Jest and React Hooks Testing Library

import { renderHook, act } from '@testing-library/react-hooks';
import { useChatState } from './useChatState';

// Use jest-localstorage-mock to mock localStorage
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('useChatState hook', () => {
  test('Default State Loading: initializes with default values when no localStorage', () => {
    // Render the hook with no saved state
    const { result } = renderHook(() => useChatState());
    // Check default state values
    expect(result.current.answers).toEqual({});
    expect(result.current.step).toBe(0);
    expect(result.current.input).toBe('');
    expect(result.current.showReview).toBe(false);
    expect(result.current.playlistPreviews).toEqual([]);
    /*
      This test checks that the hook uses default values if nothing is saved,
      ensuring a predictable experience for first-time users.
    */
  });

  test('State Restoration from localStorage: loads saved state into hook', () => {
    // Simulate saved state in localStorage
    const savedState = {
      answers: { businessType: 'cafe' },
      step: 2,
      input: 'chill',
      showReview: true,
      playlistPreviews: [{ label: 'Morning Vibes', link: '#' }]
    };
    localStorage.setItem('playlistBuilderState', JSON.stringify(savedState));
    // Render the hook, should restore state from localStorage
    const { result } = renderHook(() => useChatState());
    expect(result.current.answers).toEqual(savedState.answers);
    expect(result.current.step).toBe(savedState.step);
    expect(result.current.input).toBe(savedState.input);
    expect(result.current.showReview).toBe(savedState.showReview);
    expect(result.current.playlistPreviews).toEqual(savedState.playlistPreviews);
    /*
      This test checks that saved progress is restored on reload,
      which is critical for a seamless user experience.
    */
  });

  test('State Saving: updates localStorage when state changes', () => {
    // Render the hook
    const { result } = renderHook(() => useChatState());
    // Update some state variables
    act(() => {
      result.current.setAnswers({ businessType: 'hotel' });
      result.current.setStep(1);
      result.current.setInput('chill');
      result.current.setShowReview(true);
      result.current.setPlaylistPreviews([{ label: 'Evening Energy', link: '#' }]);
    });
    // Check that localStorage was updated with new state
    const saved = JSON.parse(localStorage.getItem('playlistBuilderState'));
    expect(saved.answers).toEqual({ businessType: 'hotel' });
    expect(saved.step).toBe(1);
    expect(saved.input).toBe('chill');
    expect(saved.showReview).toBe(true);
    expect(saved.playlistPreviews).toEqual([{ label: 'Evening Energy', link: '#' }]);
    /*
      This test checks that any progress is saved as state changes,
      so user progress isn't lost if the page is refreshed.
    */
  });
});
