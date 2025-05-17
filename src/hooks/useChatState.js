// src/hooks/useChatState.js
// Custom React hook for managing and persisting chat state for ChatPlaylistBuilder
// This hook encapsulates logic for saving/loading state to localStorage, improving modularity and maintainability.

import { useState, useEffect } from 'react';

// Key used in localStorage for persisting chat state
const STORAGE_KEY = 'playlistBuilderState';

export function useChatState() {
  // Default initial state values
  const defaultState = {
    answers: {},
    step: 0,
    input: '',
    showReview: false,
    playlistPreviews: [],
    // Additional UI state that isn't persisted to localStorage by default
    showPreviews: false,
    loadingPreviews: false,
    previewError: null,
    userType: 'BMAsia Client'
  };

  // Initialize state variables
  const [answers, setAnswers] = useState(defaultState.answers);
  const [step, setStep] = useState(defaultState.step);
  const [input, setInput] = useState(defaultState.input);
  const [showReview, setShowReview] = useState(defaultState.showReview);
  const [playlistPreviews, setPlaylistPreviews] = useState(defaultState.playlistPreviews);
  const [showPreviews, setShowPreviews] = useState(defaultState.showPreviews);
  const [loadingPreviews, setLoadingPreviews] = useState(defaultState.loadingPreviews);
  const [previewError, setPreviewError] = useState(defaultState.previewError);
  const [userType, setUserType] = useState(defaultState.userType);

  // On mount, attempt to load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.step === 'number') setStep(parsed.step);
        if (typeof parsed.input === 'string') setInput(parsed.input);
        if (typeof parsed.showReview === 'boolean') setShowReview(parsed.showReview);
        if (Array.isArray(parsed.playlistPreviews)) setPlaylistPreviews(parsed.playlistPreviews);
        if (typeof parsed.showPreviews === 'boolean') setShowPreviews(parsed.showPreviews);
        if (typeof parsed.loadingPreviews === 'boolean') setLoadingPreviews(parsed.loadingPreviews);
        if (typeof parsed.previewError === 'string' || parsed.previewError === null) setPreviewError(parsed.previewError);
        if (typeof parsed.userType === 'string') setUserType(parsed.userType);
      } catch (e) {
        // If parsing fails, ignore and use defaults
        console.error('Failed to parse saved chat state:', e);
      }
    }
    // If nothing found, use default initial state
  }, []);

  // Save state to localStorage whenever relevant variables change
  useEffect(() => {
    const stateToSave = {
      answers,
      step,
      input,
      showReview,
      playlistPreviews
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    /*
      Persisting state to localStorage ensures user progress is saved across refreshes,
      providing a seamless experience and preventing accidental data loss.
    */
  }, [answers, step, input, showReview, playlistPreviews]);

  /*
    By extracting state persistence into this custom hook, we:
    - Improve modularity: the persistence logic is reusable and testable.
    - Enhance maintainability: ChatPlaylistBuilder focuses on UI, not storage.
    - Make it easy to extend or change persistence in one place if needed.
  */

  // Return state variables and setters for use in the component
  return {
    answers, setAnswers,
    step, setStep,
    input, setInput,
    showReview, setShowReview,
    playlistPreviews, setPlaylistPreviews,
    showPreviews, setShowPreviews,
    loadingPreviews, setLoadingPreviews,
    previewError, setPreviewError,
    userType, setUserType
  };
}
