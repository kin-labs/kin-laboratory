import { render } from '@testing-library/react';

import { WebKeypairUiCard } from './web-keypair-ui-card';

describe('WebKeypairUiCard', () => {
  it('should render successfully', () => {
    const x: any = {};
    const { baseElement } = render(<WebKeypairUiCard kp={x} />);
    expect(baseElement).toBeTruthy();
  });
});
