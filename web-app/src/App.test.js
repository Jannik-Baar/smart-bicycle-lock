import React from 'react';
import {createRoot} from 'react-dom/client';
import { render, screen, act } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
    const root = createRoot(document.createElement('div'));
    act(() => {
        root.render(<App/>);
    });
});

test('renders "NFC ist nicht verfügbar!" text', () => {
  render(<App />);
  expect(screen.getByText(/NFC ist nicht verfügbar!/i)).toBeInTheDocument();
});