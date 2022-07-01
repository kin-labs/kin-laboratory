import { render } from '@testing-library/react';

import { WebLegacyFeature } from './web-legacy-feature';

describe('WebLegacyFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebLegacyFeature />);
    expect(baseElement).toBeTruthy();
  });
});
