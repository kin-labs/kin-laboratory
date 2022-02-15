import { WebAirdropFeature } from '@kin-laboratory/web/airdrop/feature';
import { WebLegacyFeature } from '@kin-laboratory/web/legacy/feature';
import { WebHomeFeature } from '@kin-laboratory/web/home/feature';
import { WebKeypairFeature } from '@kin-laboratory/web/keypair/feature';
import { WebMemoFeature } from '@kin-laboratory/web/memo/feature';
import { WebUiLayout } from '@kin-laboratory/web/ui/layout';
import { Redirect, Route } from 'react-router-dom';

export function WebShellFeature() {
  return (
    <WebUiLayout>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/airdrop" exact component={WebAirdropFeature} />
      <Route path="/home" exact component={WebHomeFeature} />
      <Route path="/keypair" exact component={WebKeypairFeature} />
      <Route path="/legacy" exact component={WebLegacyFeature} />
      <Route path="/memo" exact component={WebMemoFeature} />
    </WebUiLayout>
  );
}

export default WebShellFeature;
