import React from 'react';
import { render } from '@testing-library/react';
import App from './Welcome';

test('renders API Platform title', () => {
  const { getByText } = render(<App />);
  const strongElement = getByText(/Database Archive/i);
  expect(strongElement).toBeInTheDocument();
});
