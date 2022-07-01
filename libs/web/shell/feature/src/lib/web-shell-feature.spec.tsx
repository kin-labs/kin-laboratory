import { render } from '@testing-library/react';

import { WebShellFeature } from './web-shell-feature';

describe('WebShellFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebShellFeature />);
    expect(baseElement).toBeTruthy();
  });
});
