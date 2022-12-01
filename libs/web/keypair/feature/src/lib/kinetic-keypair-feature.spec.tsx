import { render } from '@testing-library/react';

import { KineticKeypairFeature } from './kinetic-keypair-feature';

describe('KineticKeypairFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KineticKeypairFeature />);
    expect(baseElement).toBeTruthy();
  });
});
