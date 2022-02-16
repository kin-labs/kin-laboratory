import { render } from '@testing-library/react';

import { WebMemoFeature } from './web-memo-feature';

describe('WebMemoFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebMemoFeature />);
    expect(baseElement).toBeTruthy();
  });
});
