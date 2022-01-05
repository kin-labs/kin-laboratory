import { WebHomeFeature } from '@kin-laboratory/web/home/feature';
import { WebKeypairFeature } from '@kin-laboratory/web/keypair/feature';
import { WebUiLayout } from '@kin-laboratory/web/ui/layout';
import { Route } from 'react-router-dom';

export function WebShellFeature() {
  return (
    <WebUiLayout>
      <Route path="/" exact component={WebHomeFeature} />
      <Route path="/keypair" exact component={WebKeypairFeature} />
    </WebUiLayout>
  );
}

export default WebShellFeature;
