import { render, fireEvent } from '@testing-library/react';
import CustomDialog2 from '../CustomDialog2';
import React from 'react';

describe('CustomDialog2', () => {
  it('renders with title and content', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText } = render(
      <CustomDialog2
        title="Test Dialog"
        content={<div>Test Content</div>}
        open={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        defaultButtons={[{ label: 'Close', isPrimary: true }]}
      />
    );

    expect(getByText('Test Dialog')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText } = render(
      <CustomDialog2
        title="Test Dialog"
        content={<div>Test Content</div>}
        open={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        defaultButtons={[{ label: 'Close', isPrimary: true }]}
      />
    );

    fireEvent.click(getByText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls handleSubmit when submit button is clicked', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText } = render(
      <CustomDialog2
        title="Test Dialog"
        content={<div>Test Content</div>}
        open={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        defaultButtons={[{ label: 'Submit', isPrimary: true }]}
      />
    );

    fireEvent.click(getByText('Submit'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('does not call handleClose when close button is clicked if closeOnExit is false', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText } = render(
      <CustomDialog2
        title="Test Dialog"
        content={<div>Test Content</div>}
        open={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        defaultButtons={[{ label: 'Close', isPrimary: true }]}
        closeOnExit={false}
      />
    );

    fireEvent.click(getByText('Close'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders close icon when closeWithIcon is true', () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByTestId } = render(
      <CustomDialog2
        title="Test Dialog"
        content={<div>Test Content</div>}
        open={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        defaultButtons={[{ label: 'Close', isPrimary: true }]}
        closeWithIcon={true}
      />
    );

    expect(getByTestId('close-icon')).toBeInTheDocument();
  });
});
