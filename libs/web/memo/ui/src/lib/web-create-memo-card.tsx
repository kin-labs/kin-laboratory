import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';

import {
  createKinMemo,
  MAX_APP_INDEX,
  TransactionType,
} from '@kin-tools/kin-memo';

import { useEffect, useState } from 'react';

export interface WebCreateMemoUiProps {
  appIndex?: number;
}

export function WebCreateMemoCard(props: WebCreateMemoUiProps) {
  const [appIndex, setAppIndex] = useState<number>(props.appIndex || 0);
  const [memo, setMemo] = useState<string>();
  const [type, setType] = useState<string>('None');
  const types = ['None', 'Earn', 'Spend', 'P2P'];

  const selectType = (txType: string) => setType(txType);

  useEffect(() => {
    setMemo(
      createKinMemo({
        appIndex,
        type: TransactionType[type as any] as any,
      })
    );
  }, [type, appIndex]);

  return (
    <WebUiCard title="Create Kin Memo">
      <div className="flex flex-col space-y-6">
        <div>
          <div className="block text-sm font-medium text-gray-700">
            Transaction Type
          </div>
          <div className="pt-2 pb-4 flex space-x-2">
            {types.map((item: any) => (
              <WebUiButton
                disabled={type === item}
                key={item}
                label={item}
                onClick={() => selectType(item)}
              />
            ))}
          </div>

          <label
            htmlFor="appIndex"
            className="block text-sm font-medium text-gray-700"
          >
            AppIndex
          </label>
          <div className="mt-1">
            <input
              value={appIndex}
              onChange={(e) => setAppIndex(parseInt(e.target?.value))}
              type="number"
              min={1}
              max={MAX_APP_INDEX}
              name="appIndex"
              id="appIndex"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter your App Index"
            />
          </div>
        </div>
        {memo && <WebUiPre>{memo}</WebUiPre>}
      </div>
    </WebUiCard>
  );
}
