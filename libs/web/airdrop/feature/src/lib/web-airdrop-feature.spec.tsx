import { render } from '@testing-library/react';

import WebAirdropFeature from './web-airdrop-feature';

describe('WebAirdropFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebAirdropFeature />);
    expect(baseElement).toBeTruthy();
  });
});
