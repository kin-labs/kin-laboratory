import { render } from '@testing-library/react';

import WebHomeFeature from './web-home-feature';

describe('WebHomeFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebHomeFeature />);
    expect(baseElement).toBeTruthy();
  });
});
