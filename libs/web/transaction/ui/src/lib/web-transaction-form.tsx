import { MAX_APP_INDEX } from '@kin-tools/kin-memo';
import { useState } from 'react';

export interface WebTransactionFormProps {
  lookup: (txId: string) => void;
}

export function WebTransactionForm(props: WebTransactionFormProps) {
  const [txId] = useState<string>();

  return (
    <div>
      <div>
        <label
          htmlFor="txId"
          className="block text-sm font-medium text-gray-700"
        >
          Transaction ID
        </label>
        <div className="mt-1">
          <input
            value={txId}
            onChange={(e) => props.lookup(e.target?.value?.toString())}
            type="text"
            name="txId"
            id="txId"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter transaction ID"
          />
        </div>
      </div>
    </div>
  );
}
