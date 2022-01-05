import { render } from '@testing-library/react';

import WebCoreFeature from './web-core-feature';

describe('WebCoreFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebCoreFeature />);
    expect(baseElement).toBeTruthy();
  });
});
