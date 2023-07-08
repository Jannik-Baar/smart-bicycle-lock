import React from 'react';
import {createRoot} from 'react-dom/client';
import { act } from '@testing-library/react';
import LegalNoticeAndPrivacyPolicy from './LegalNoticeAndPrivacyPolicy';

it('renders without crashing', () => {
    const root = createRoot(document.createElement('div'));
    act(() => {
        root.render(<LegalNoticeAndPrivacyPolicy/>);
    });
});
