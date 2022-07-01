import { render } from '@testing-library/react';

import { WebAirdropUiCard } from './web-airdrop-ui-card';

describe('WebAirdropUiCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebAirdropUiCard keypairs={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
