import { render } from '@testing-library/react';

import WebCoreDataAccess from './web-core-data-access';

describe('WebCoreDataAccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebCoreDataAccess />);
    expect(baseElement).toBeTruthy();
  });
});
