import { Stack } from '@chakra-ui/react';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';

import { KinMemo, TransactionType } from '@kin-tools/kin-memo';
import { Field, Form, FormLayout } from '@saas-ui/react';
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
      <Stack spacing={6}>
        <Form onSubmit={() => console.log()}>
          <FormLayout>
            <Field
              size="lg"
              type="text"
              name="memo"
              colorScheme="primary"
              placeholder="Enter the memo"
              label="Memo"
              value={memo}
              onChange={(e: any) => setMemo(e.target?.value)}
            />
          </FormLayout>
        </Form>
        {result && <WebUiPre>{result}</WebUiPre>}
      </Stack>
    </WebUiCard>
  );
}
