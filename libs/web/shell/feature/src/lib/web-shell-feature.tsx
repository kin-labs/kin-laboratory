import { WebHomeFeature } from '@kin-laboratory/web/home/feature';
import { WebKeypairFeature } from '@kin-laboratory/web/keypair/feature';
import { WebUiLayout } from '@kin-laboratory/web/ui/layout';
import { Redirect, Route } from 'react-router-dom';

export function WebShellFeature() {
  return (
    <WebUiLayout>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" exact component={WebHomeFeature} />
      <Route path="/keypair" exact component={WebKeypairFeature} />
    </WebUiLayout>
  );
}

export default WebShellFeature;
