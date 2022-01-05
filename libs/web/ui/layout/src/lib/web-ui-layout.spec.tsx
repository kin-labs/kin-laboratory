import { render } from '@testing-library/react';

import WebUiLayout from './web-ui-layout';

describe('WebUiLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiLayout />);
    expect(baseElement).toBeTruthy();
  });
});
