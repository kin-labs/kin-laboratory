import { render } from '@testing-library/react';

import { WebTransactionFeature } from './web-transaction-feature';

describe('WebTransactionFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebTransactionFeature />);
    expect(baseElement).toBeTruthy();
  });
});
