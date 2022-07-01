import { render } from '@testing-library/react';

import WebCalculatorUi from './web-calculator-ui';

describe('WebCalculatorUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebCalculatorUi />);
    expect(baseElement).toBeTruthy();
  });
});
