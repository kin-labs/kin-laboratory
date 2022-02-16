import { render } from '@testing-library/react';

import WebUiPre from './web-ui-pre';

describe('WebUiPre', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiPre />);
    expect(baseElement).toBeTruthy();
  });
});
