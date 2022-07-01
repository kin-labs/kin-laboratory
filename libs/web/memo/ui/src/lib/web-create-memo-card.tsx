import { ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';

import {
  createKinMemo,
  MAX_APP_INDEX,
  TransactionType,
} from '@kin-tools/kin-memo';
import { Field, Form, FormLayout } from '@saas-ui/react';

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
      <Stack spacing={6}>
        <Stack>
          <Heading size="md">Transaction Type</Heading>
          <ButtonGroup>
            {types.map((item: any) => (
              <WebUiButton
                size="lg"
                disabled={type === item}
                key={item}
                label={item}
                onClick={() => selectType(item)}
              />
            ))}
          </ButtonGroup>
          <Form onSubmit={() => console.log()}>
            <FormLayout>
              <Field
                size="lg"
                min={1}
                max={MAX_APP_INDEX}
                type="text"
                name="name"
                colorScheme="primary"
                placeholder="Enter your App Index"
                label="AppIndex"
                value={String(appIndex)}
                onChange={(e: any) => setAppIndex(parseInt(e.target?.value))}
              />
            </FormLayout>
          </Form>
        </Stack>
        {memo && <WebUiPre>{memo}</WebUiPre>}
      </Stack>
    </WebUiCard>
  );
}
