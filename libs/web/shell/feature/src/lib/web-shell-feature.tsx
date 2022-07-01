import { WebAirdropFeature } from '@kin-laboratory/web/airdrop/feature';
import { WebHomeFeature } from '@kin-laboratory/web/home/feature';
import { WebKeypairFeature } from '@kin-laboratory/web/keypair/feature';
import { WebLegacyFeature } from '@kin-laboratory/web/legacy/feature';
import { WebMemoFeature } from '@kin-laboratory/web/memo/feature';
import { WebTransactionFeature } from '@kin-laboratory/web/transaction/feature';
import { WebUiLayout } from '@kin-laboratory/web/ui/layout';
import { Navigate, Route, Routes } from 'react-router-dom';

export function WebShellFeature() {
  return (
    <WebUiLayout>
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/airdrop" element={<WebAirdropFeature />} />
        <Route path="/home" element={<WebHomeFeature />} />
        <Route path="/keypair" element={<WebKeypairFeature />} />
        <Route path="/legacy" element={<WebLegacyFeature />} />
        <Route path="/memo" element={<WebMemoFeature />} />
        <Route path="/transaction" element={<WebTransactionFeature />} />
      </Routes>
    </WebUiLayout>
  );
}

export default WebShellFeature;
