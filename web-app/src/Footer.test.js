import React from 'react';
import {createRoot} from 'react-dom/client';
import { render, screen, act } from '@testing-library/react';
import Footer from './Footer';

it('renders without crashing', () => {
    const root = createRoot(document.createElement('div'));
    act(() => {
        root.render(<Footer/>);
    });
});

test('renders "Impressum und Datenschutzerklärung" text', () => {
    render(<Footer />);
    expect(screen.getByText(/Impressum und Datenschutzerklärung/i)).toBeInTheDocument();
});