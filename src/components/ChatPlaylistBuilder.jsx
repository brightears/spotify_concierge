import React from 'react';
import UpgradeOptions from './UpgradeOptions';
import PlaylistDetail from './PlaylistDetail';
import { getSpotifyPlaylistPreviews } from '../api/spotify';
import LoadingSpinner from './LoadingSpinner';
import { useChatState } from '../hooks/useChatState';

// ChatPlaylistBuilder
// This component manages the chat-based flow for collecting user inputs
// and generating Spotify playlist previews. It follows the modular architecture
// and naming conventions outlined in our project documentation.

const questions = [
  {
    key: 'businessType',
    prompt: 'What type of business are you curating music for? (e.g., café, hotel, spa)'
  },
  {
    key: 'targetAudience',
    prompt: 'Who is your target audience? (Describe demographics or the customer vibe)'
  },
  {
    key: 'brandMood',
    prompt: 'What brand mood would you like to create? (e.g., chill, energetic, upscale)'
  },
  {
    key: 'timeSlots',
    prompt: 'Which time slots do you want playlists for? (e.g., morning, afternoon, evening, weekends)'
  },
  {
    key: 'genrePrefs',
    prompt: 'Any music genres to include or avoid? (List preferences/exclusions)'
  }
];

function ChatPlaylistBuilder() {
  // Use the custom hook to manage and persist chat state
  const {
    answers, setAnswers,
    step, setStep,
    input, setInput,
    showReview, setShowReview,
    playlistPreviews, setPlaylistPreviews,
    showPreviews, setShowPreviews,
    loadingPreviews, setLoadingPreviews,
    previewError, setPreviewError,
    userType, setUserType
  } = useChatState();

  // State for the currently selected playlist (for detailed view)
  const [selectedPlaylist, setSelectedPlaylist] = React.useState(null);

  // Helper function to fetch playlist previews (used for initial fetch and retry)
  const fetchPlaylistPreviews = (finalAnswers) => {
    setLoadingPreviews(true); // Set loading state
    setPreviewError(null);    // Reset error state
    getSpotifyPlaylistPreviews(finalAnswers)
      .then((data) => {
        setPlaylistPreviews(data);
      })
      .catch((err) => {
        // Log error to console for debugging
        console.error('Error fetching playlist previews:', err);
        setPreviewError('Failed to load playlist previews.');
      })
      .finally(() => {
        setLoadingPreviews(false);
      });
  };

  // Handle input submission for each question
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the answer for the current question
    setAnswers(prev => ({ ...prev, [questions[step].key]: input }));
    setInput('');
    // Move to next question or show review/confirmation screen
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // All questions answered: show review/confirmation screen instead of fetching previews
      setShowReview(true);
      // The user will see a summary of their answers and can confirm or edit
    }
  };

  // Handler for confirming the review screen
  const handleConfirmReview = () => {
    // When user confirms, fetch playlist previews and show them
    setShowPreviews(true);
    setShowReview(false);
    fetchPlaylistPreviews(answers);
  };

  // Handler for editing answers from the review screen
  const handleEditReview = () => {
    // Allow user to go back to the chat flow to modify answers
    setShowReview(false);
    setStep(0); // Optionally, you could set this to the first unanswered question
  };

  // Handler to reset the chat flow to its initial state, with confirmation prompt
  const handleResetChat = () => {
    // Confirmation step: ask the user if they're sure before resetting
    // window.confirm() returns true if the user clicks 'OK', false if 'Cancel'
    const confirmed = window.confirm('Are you sure you want to reset the chat? All your answers will be lost.');
    if (!confirmed) return; // If user cancels, do nothing
    // If confirmed, proceed with reset
    setAnswers({});             // Clear all collected answers
    setStep(0);                 // Reset to the first question
    setInput('');               // Clear the input field
    setShowPreviews(false);     // Hide the playlist previews
    setPlaylistPreviews([]);    // Clear any loaded playlist previews
    setPreviewError(null);      // Clear any error messages
    setShowReview(false);       // Hide review/confirmation screen
    setSelectedPlaylist(null);  // Reset selected playlist
    // The UI now reflects a fresh start, as if the user just opened the chat
  };

  return (
    <div className="chat-playlist-builder">
      <h2>Spotify Concierge: Playlist Builder</h2>
      {/* User Type Toggle: lets user pick between BMAsia Client and External User */}
      <div style={{ marginBottom: '1em' }}>
        <span style={{ fontWeight: 'bold', marginRight: '1em' }}>I am a:</span>
        <label style={{ marginRight: '1em' }}>
          <input
            type="radio"
            name="userType"
            value="BMAsia Client"
            checked={userType === 'BMAsia Client'}
            onChange={() => setUserType('BMAsia Client')}
          />
          BMAsia Client
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="External User"
            checked={userType === 'External User'}
            onChange={() => setUserType('External User')}
          />
          External User
        </label>
      </div>
      {/* Progress Indicator: shows user's progress through the chat questions */}
      {/* Calculated as (current step + 1) out of total questions, since step is 0-based */}
      {/* Displaying progress helps users understand how many steps are left, improving UX */}
      {!showReview && !showPreviews && (
        <div style={{ marginBottom: '1em', fontWeight: 'bold', color: '#1db954' }}>
          Question {step + 1} of {questions.length}
        </div>
      )}
      {/* Chat flow: ask questions one by one */}
      {!showReview ? (
        <form onSubmit={handleSubmit}>
          <label>{questions[step].prompt}</label>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            required
            autoFocus
          />
          {/* Back Button: only visible if not on the first question (step > 0) */}
          {step > 0 && (
            <button
              type="button"
              style={{ marginRight: '1em' }}
              onClick={() => {
                // Decrement the step to go back to the previous question
                setStep(prev => {
                  const newStep = prev - 1;
                  // Pre-fill the input with the answer to the previous question, if available
                  setInput(answers[questions[newStep].key] || '');
                  // Optionally, clear any error messages here if needed
                  // setPreviewError && setPreviewError(null);
                  return newStep;
                });
                /*
                  The Back button allows users to navigate to previous questions,
                  making the chat flow more forgiving and flexible.
                  Pre-filling the input helps users easily review or modify their previous answers.
                  This improves the user experience in multi-step forms.
                */
              }}
            >
              Back
            </button>
          )}
          <button type="submit">Next</button>
        </form>
      ) : (
        <div>
          <h3>Review Your Answers</h3>
          {/* Show each question with its answer for confirmation */}
          <ul>
            {questions.map((q, idx) => (
              <li
                key={q.key}
                style={{ marginBottom: '0.5em', cursor: 'pointer', background: '#f6f6f6', borderRadius: '4px', padding: '0.5em' }}
                title="Click to edit this answer"
                onClick={() => {
                  // Jump to the selected question for targeted editing
                  // We set the step to the index of the clicked question and hide the review screen
                  setStep(idx);
                  setShowReview(false);
                  // The chat flow will now display the selected question with the current answer pre-filled
                }}
              >
                <strong>{q.prompt}</strong><br />
                <span style={{ textDecoration: 'underline dotted' }}>{answers[q.key] || <em>No answer</em>}</span>
                {/*
                  Clicking on a question/answer pair lets the user jump directly to that question for editing.
                  This improves usability by allowing targeted revisions without restarting the whole flow.
                */}
              </li>
            ))}
          </ul>
          {/* Confirm and Edit buttons */}
          <button onClick={handleConfirmReview} style={{ marginRight: '1em' }}>Confirm</button>
          <button onClick={handleEditReview}>Edit</button>
          {/*
            The review/confirmation screen lets users double-check their answers before generating playlist previews.
            Confirm triggers the API call and shows previews; Edit lets them return to the chat flow to make changes.
          */}
        </div>
      )}
      {showPreviews ? (
        <div>
          {/* If a playlist is selected, show PlaylistDetail; otherwise, show previews list */}
          {selectedPlaylist ? (
            <PlaylistDetail
              playlist={selectedPlaylist}
              onBack={() => setSelectedPlaylist(null)}
            />
          ) : (
            <>
              <h3>Your Playlist Previews</h3>
              {/* Show loading or error states */}
              {loadingPreviews && (
                // Show a loading spinner while playlist previews are being fetched
                // The spinner provides a visual indication that an async API call is in progress
                // and improves user experience during waiting times
                <LoadingSpinner />
              )}
              {previewError && (
                <div>
                  <p style={{ color: 'red' }}>{previewError}</p>
                  {/* Retry button for API errors */}
                  <button
                    onClick={() => {
                      // Retry: reset loading and error states, and re-call the API with current answers
                      fetchPlaylistPreviews(answers);
                    }}
                    style={{ marginTop: '0.5em' }}
                  >
                    Retry
                  </button>
                </div>
              )}
              <ul>
                {/* Render playlist previews from state */}
                {playlistPreviews.map((pl, idx) => (
                  <li
                    key={idx}
                    style={{ cursor: 'pointer', textDecoration: 'underline', color: '#1db954' }}
                    onClick={() => {
                      // When a playlist preview is clicked, show the PlaylistDetail component
                      setSelectedPlaylist(pl);
                      /*
                        This allows users to view more details about a playlist.
                        The selected playlist object is passed as a prop to PlaylistDetail.
                      */
                    }}
                    title="Click to view details"
                  >
                    {pl.label} <a href={pl.link} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer">Listen</a>
                  </li>
                ))}
              </ul>
              {/* Reset Chat button to start over */}
              <button
                onClick={handleResetChat}
                style={{ marginTop: '1em' }}
              >
                Reset Chat
              </button>
              <UpgradeOptions
                userType={userType}
                onNotifyBMAsia={() => {
                  console.log('Notify BMAsia: Internal notification should be triggered.');
                }}
                onPaidUpgrade={() => {
                  console.log('Paid Upgrade: Payment process should start.');
                }}
              />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ChatPlaylistBuilder;
