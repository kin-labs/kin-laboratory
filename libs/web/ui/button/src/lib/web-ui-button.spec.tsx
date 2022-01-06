import { render } from '@testing-library/react';

import WebUiButton from './web-ui-button';

describe('WebUiButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiButton />);
    expect(baseElement).toBeTruthy();
  });
});
