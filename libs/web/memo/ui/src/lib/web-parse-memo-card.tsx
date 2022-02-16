import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';

import { KinMemo, TransactionType } from '@kin-tools/kin-memo';
import { useEffect, useState } from 'react';

export interface WebMemoUiProps {
  memo?: string;
}
const types = Object.values(TransactionType);

function formatMemo(memo: KinMemo) {
  let transactionType =
    typeof memo?.transactionType() !== 'undefined'
      ? TransactionType[memo?.transactionType()]
      : 0;

  return {
    appIndex: memo?.appIndex(),
    transactionType,
    version: memo?.version(),
  };
}

export function WebParseMemoCard(props: WebMemoUiProps) {
  const [memo, setMemo] = useState<string>(props.memo || '');
  const [result, setResult] = useState<string>();

  useEffect(() => {
    if (!memo || !memo?.length) {
      setResult('');
      return;
    }
    try {
      const parsed = KinMemo.fromB64String(memo);
      if (parsed) {
        setResult(JSON.stringify(formatMemo(parsed), null, 2));
      }
    } catch (e) {
      setResult(`Error parsing memo: ${e}`);
    }
  }, [memo]);

  return (
    <WebUiCard title="Parse Kin Memo">
      <div className="flex flex-col space-y-6">
        <div>
          <label
            htmlFor="memo"
            className="block text-sm font-medium text-gray-700"
          >
            Memo
          </label>
          <div className="mt-1">
            <input
              value={memo}
              onChange={(e) => setMemo(e.target?.value)}
              type="text"
              name="memo"
              id="memo"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter the memo"
            />
          </div>
        </div>
        {result && <WebUiPre>{result}</WebUiPre>}
      </div>
    </WebUiCard>
  );
}
