import { render } from '@testing-library/react';

import WebUiHeader from './web-ui-header';

describe('WebUiHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiHeader />);
    expect(baseElement).toBeTruthy();
  });
});
