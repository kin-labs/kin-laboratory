import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';
import { TransactionType } from '@kin-tools/kin-memo';
import {
  parseKinTransaction,
  validateKinTransaction,
} from '@kin-tools/kin-transaction';

import { ParsedInstruction, ParsedTransactionWithMeta } from '@solana/web3.js';
import { useState } from 'react';

export interface WebTransactionCardProps {
  tx: ParsedTransactionWithMeta;
  mint?: string;
}

export function WebTransactionCard(props: WebTransactionCardProps) {
  const [showRaw, setShowRaw] = useState(false);
  const parsed = parseKinTransaction(props.tx);
  const valid = validateKinTransaction(parsed, props?.mint);

  const instructions = props.tx?.transaction?.message
    ?.instructions as ParsedInstruction[];

  const transfer = instructions.find(
    (item) => item.program === 'system' && item.parsed?.type === 'transfer'
  );

  return (
    <div className="flex flex-col space-y-6">
      <WebUiPre>
        {valid?.mint ? '✅' : '❌'} Valid KIN Transaction
        <br />
        {valid?.memo ? '✅' : '❌'} Valid KIN Memo
        <br />
        {valid?.isSolTransfer ? '✅' : '❌'} SOL Transfer
        <br />
        {valid?.isTokenTransfer ? '✅' : '❌'} Token Transfer
      </WebUiPre>

      {transfer && (
        <WebUiPre>
          SOL Transfer {JSON.stringify(transfer?.parsed?.info, null, 2)}
        </WebUiPre>
      )}

      {parsed?.tokenTransfer && (
        <WebUiPre>
          Mint: {parsed?.mint}
          <br />
          Token {parsed?.tokenTransfer?.parsed?.type}{' '}
          {JSON.stringify(parsed?.tokenTransfer?.parsed?.info, null, 2)}
        </WebUiPre>
      )}

      {parsed?.memoParsed && (
        <WebUiPre>
          {JSON.stringify(
            {
              appIndex: parsed?.memoParsed?.appIndex(),
              transactionType:
                TransactionType[parsed?.memoParsed?.transactionType()!],
              version: parsed?.memoParsed?.version(),
            },
            null,
            2
          )}
        </WebUiPre>
      )}
      <div>
        <WebUiButton
          label={(showRaw ? 'Hide' : 'Show') + ' raw transaction'}
          onClick={() => setShowRaw((val) => !val)}
        />
      </div>
      {showRaw && (
        <WebUiPre>Transaction: {JSON.stringify(props.tx, null, 2)}</WebUiPre>
      )}
    </div>
  );
}
