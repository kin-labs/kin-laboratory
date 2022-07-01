import { WebShellFeature } from '@kin-laboratory/web/shell/feature';
import { SaasProvider } from '@saas-ui/react';

export function App() {
  return (
    <SaasProvider>
      <WebShellFeature />
    </SaasProvider>
  );
}
