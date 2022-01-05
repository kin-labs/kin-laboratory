import { render } from '@testing-library/react';

import WebUiPage from './web-ui-page';

describe('WebUiPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiPage />);
    expect(baseElement).toBeTruthy();
  });
});
