import { render } from '@testing-library/react';

import WebUiFooter from './web-ui-footer';

describe('WebUiFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiFooter />);
    expect(baseElement).toBeTruthy();
  });
});
