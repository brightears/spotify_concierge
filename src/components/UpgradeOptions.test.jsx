import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import UpgradeOptions from './UpgradeOptions';
import { simulatePayment } from '../api/payment';

jest.mock('../api/payment', () => ({
  simulatePayment: jest.fn(),
}));

describe('UpgradeOptions component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Notify BMAsia button appears only for BMAsia clients', () => {
    const { rerender } = render(
      <UpgradeOptions userType="BMAsia Client" onNotifyBMAsia={() => {}} onPaidUpgrade={() => {}} />
    );
    expect(screen.getByRole('button', { name: /notify bmasia/i })).toBeInTheDocument();

    // Re-render for External User
    rerender(
      <UpgradeOptions userType="External User" onNotifyBMAsia={() => {}} onPaidUpgrade={() => {}} />
    );
    expect(screen.queryByRole('button', { name: /notify bmasia/i })).not.toBeInTheDocument();
    // Paid Upgrade button should be visible for external users
    expect(screen.getByRole('button', { name: /paid upgrade/i })).toBeInTheDocument();
  });

  test('Paid Upgrade success flow shows processing then success message', async () => {
    let resolvePayment;
    simulatePayment.mockImplementation(() => new Promise(res => { resolvePayment = res; }));
    render(
      <UpgradeOptions userType="External User" onNotifyBMAsia={() => {}} onPaidUpgrade={() => {}} />
    );
    const button = screen.getByRole('button', { name: /paid upgrade/i });

    fireEvent.click(button);
    // Should show processing message immediately after click
    expect(screen.getByText(/processing payment/i)).toBeInTheDocument();

    await act(async () => {
      resolvePayment();
    });

    expect(simulatePayment).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/processing payment/i)).not.toBeInTheDocument();
    expect(screen.getByText(/payment successful/i)).toBeInTheDocument();
  });

  test('Paid Upgrade error flow displays error message', async () => {
    let rejectPayment;
    simulatePayment.mockImplementation(() => new Promise((_, rej) => { rejectPayment = rej; }));
    render(
      <UpgradeOptions userType="External User" onNotifyBMAsia={() => {}} onPaidUpgrade={() => {}} />
    );
    const button = screen.getByRole('button', { name: /paid upgrade/i });

    fireEvent.click(button);
    // Should show processing message immediately after click
    expect(screen.getByText(/processing payment/i)).toBeInTheDocument();

    await act(async () => {
      rejectPayment(new Error('Payment failed. Please try again.'));
    });

    expect(simulatePayment).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/processing payment/i)).not.toBeInTheDocument();
    expect(screen.getByText(/payment failed/i)).toBeInTheDocument();
  });
});
