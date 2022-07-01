import { Stack, Text } from '@chakra-ui/react';
import {
  WebCreateMemoCard,
  WebParseMemoCard,
} from '@kin-laboratory/web/memo/ui';
import { WebUiExternalLink } from '@kin-laboratory/web/ui/layout';
import { WebUiPage } from '@kin-laboratory/web/ui/page';

export function WebMemoFeature() {
  return (
    <WebUiPage
      title="Kin Memo"
      subtitle={
        <Text>
          The Kin Memo format is used to track KIN transactions on the
          blockchain. The format is described{' '}
          <WebUiExternalLink
            label="here"
            href="https://github.com/kinecosystem/agora-api/blob/master/spec/memo.md"
          />
          .
        </Text>
      }
    >
      <WebCreateMemoCard />
      <WebParseMemoCard />
    </WebUiPage>
  );
}
