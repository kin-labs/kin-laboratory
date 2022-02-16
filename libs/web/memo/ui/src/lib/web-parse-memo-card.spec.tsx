import { render } from '@testing-library/react';

import { WebParseMemoCard } from './web-parse-memo-card';

describe('WebMemoCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebParseMemoCard />);
    expect(baseElement).toBeTruthy();
  });
});
