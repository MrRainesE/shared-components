import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the matchers

import CustomDialog2 from '../CustomDialog2';
import React from 'react';

describe('CustomDialog2', () => {
  it('renders with title, content, and buttons', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    render(
      <CustomDialog2
        id='testDialog'
        title="Test Dialog"
        content={<div>Test Content</div>}
        open={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        defaultButtons={[{ label: 'Close', isPrimary: true }]}
      />
    );

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    render(
      <CustomDialog2
        id='testDialog'
        title="Test Dialog"
        content={<div>Test Content</div>}
        open={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        defaultButtons={[{ label: 'close', isPrimary: false },{ label: 'add', isPrimary: true }]}
      />
    );

    fireEvent.click(screen.getByText('close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls handleSubmit when submit button is clicked', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    render(
      <CustomDialog2
        id='testDialog'
        title="Test Dialog"
        content={<div>Test Content</div>}
        open={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        defaultButtons={[{ label: 'submit', isPrimary: true }]}
      />
    );

    fireEvent.click(screen.getByText('submit'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders close icon when closeWithIcon is true', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    render(
      <CustomDialog2
        id='testDialog'
        title="Test Dialog"
        content={<div>Test Content</div>}
        open={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        defaultButtons={[{ label: 'close', isPrimary: true }]}
        closeWithIcon={true}
      />
    );

    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });
});
