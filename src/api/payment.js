// src/api/payment.js
// Simulates a payment process for the Paid Upgrade flow
// Returns a promise that resolves after a delay, optionally simulating errors

/**
 * Simulates a payment process.
 * Returns a promise that resolves after 1.5 seconds to mimic real payment latency.
 * Randomly fails 20% of the time to simulate payment errors (for testing).
 * Logs a message when payment is processed.
 *
 * This simulation is beneficial for testing the upgrade flow and UI feedback
 * before integrating with a real payment gateway (e.g., Stripe or PayPal).
 */
export function simulatePayment() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random error (20% chance)
      if (Math.random() < 0.2) {
        reject(new Error('Payment failed. Please try again.'));
      } else {
        console.log('Payment processed (simulated)');
        resolve();
      }
    }, 1500); // 1.5 sec delay to mimic payment latency
  });
}
