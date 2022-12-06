import { WebAirdropFeature } from '@kin-laboratory/web/airdrop/feature';
import { WebCalculatorFeature } from '@kin-laboratory/web/calculator/feature';
import { WebHomeFeature } from '@kin-laboratory/web/home/feature';
import { KineticKeypairFeature } from '@kin-laboratory/web/keypair/feature';
import { WebKeypairFeature } from '@kin-laboratory/web/legacy/feature';
import { WebMemoFeature } from '@kin-laboratory/web/memo/feature';
import { WebTransactionFeature } from '@kin-laboratory/web/transaction/feature';
import { WebUiLayout, WebUiLinks } from '@kin-laboratory/web/ui/layout';
import { Navigate, Route, Routes } from 'react-router-dom';

const copyright = <p>Kin Foundation &copy; {new Date().getUTCFullYear()}</p>;
const name = 'Laboratory';
const links: WebUiLinks = [
  { label: 'Keypairs', path: '/keypairs' },
  { label: 'Airdrop', path: '/airdrop' },
  { label: 'Memo', path: '/memo' },
  { label: 'Transaction', path: '/transaction' },
  { label: 'Fee Calculator', path: '/calculator' },
  { label: 'Legacy', path: '/legacy' },
];

export function WebShellFeature() {
  return (
    <WebUiLayout name={name} copyright={copyright} links={links}>
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<WebHomeFeature />} />
        <Route path="/keypairs" element={<KineticKeypairFeature />} />
        <Route path="/airdrop" element={<WebAirdropFeature />} />
        <Route path="/memo" element={<WebMemoFeature />} />
        <Route path="/transaction" element={<WebTransactionFeature />} />
        <Route path="/calculator" element={<WebCalculatorFeature />} />
        <Route path="/legacy" element={<WebKeypairFeature />} />
        <Route path="/keypair" element={<Navigate to="/legacy" />} />
      </Routes>
    </WebUiLayout>
  );
}
