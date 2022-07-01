import { Field, Form, FormLayout } from '@saas-ui/react';
import { useState } from 'react';

export interface WebTransactionFormProps {
  lookup: (txId: string) => void;
}

export function WebTransactionForm(props: WebTransactionFormProps) {
  const [txId] = useState<string>();

  return (
    <Form onSubmit={() => console.log()}>
      <FormLayout>
        <Field
          size="lg"
          colorScheme="primary"
          type="text"
          name="txId"
          id="txId"
          label="Transaction ID"
          placeholder="Enter transaction ID"
          value={txId}
          onChange={(e: any) => props.lookup(e.target?.value?.toString())}
        />
      </FormLayout>
    </Form>
  );
}
