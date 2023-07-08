import React from 'react';
import {createRoot} from 'react-dom/client';
import { act } from '@testing-library/react';
import NFC from './NFC';

it('renders without crashing', () => {
    const root = createRoot(document.createElement('div'));
    act(() => {
        root.render(<NFC/>);
    });
});
