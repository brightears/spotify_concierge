import React from 'react';
import { simulatePayment } from '../api/payment';

// UpgradeOptions
// This component renders the upgrade options for users after playlist previews are shown.
// It follows our modular architecture and naming conventions.
// Props:
//   - userType: string, either 'BMAsia Client' or 'External User', determines which button to show
//   - onNotifyBMAsia: function to call when the 'Notify BMAsia' button is clicked
//   - onPaidUpgrade: function to call when the 'Paid Upgrade' button is clicked

const UpgradeOptions = ({ userType, onNotifyBMAsia, onPaidUpgrade }) => {
  // State to track the status of the payment process
  const [paymentStatus, setPaymentStatus] = React.useState('idle'); // 'idle', 'processing', 'success', 'error'
  const [paymentError, setPaymentError] = React.useState(null);

  // Handler for Paid Upgrade button
  const handlePaidUpgrade = async () => {
    setPaymentStatus('processing'); // Set status to processing
    setPaymentError(null); // Clear any previous error
    try {
      await simulatePayment(); // Simulate payment process (returns a promise)
      setPaymentStatus('success'); // On success, update status
    } catch (err) {
      setPaymentStatus('error'); // On error, update status
      setPaymentError(err.message);
    }
    /*
      The simulatePayment function mimics a real payment gateway (like Stripe),
      allowing us to test the upgrade flow and UI feedback before real integration.
      The paymentStatus state is used to display feedback and control UI state.
    */
  };

  return (
    <div className="upgrade-options">
      {/* Section header */}
      <h4>Upgrade Options</h4>
      {/*
        Conditionally render the upgrade buttons based on userType:
        - If userType is 'BMAsia Client', show only the 'Notify BMAsia' button.
        - If userType is 'External User', show only the 'Paid Upgrade' button.
      */}
      {userType === 'BMAsia Client' && (
        <button
          onClick={onNotifyBMAsia}
        >
          Notify BMAsia
        </button>
      )}
      {userType === 'External User' && (
        <div style={{ marginTop: '1em' }}>
          <button
            onClick={handlePaidUpgrade}
            disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
          >
            Paid Upgrade
          </button>
          {/* Show status messages based on paymentStatus */}
          {paymentStatus === 'processing' && (
            <span style={{ marginLeft: '1em', color: '#888' }}>Processing payment...</span>
          )}
          {paymentStatus === 'success' && (
            <span style={{ marginLeft: '1em', color: 'green' }}>Payment successful! Your playlist upgrade is being processed.</span>
          )}
          {paymentStatus === 'error' && (
            <span style={{ marginLeft: '1em', color: 'red' }}>{paymentError}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default UpgradeOptions;
