import { render } from '@testing-library/react';

import { WebKeypairFeature } from './web-keypair-feature';

describe('WebKeypairFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebKeypairFeature />);
    expect(baseElement).toBeTruthy();
  });
});
