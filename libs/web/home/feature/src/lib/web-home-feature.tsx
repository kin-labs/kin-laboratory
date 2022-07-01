import { Text } from '@chakra-ui/react';
import { WebUiExternalLink } from '@kin-laboratory/web/ui/layout';
import { WebUiPage } from '@kin-laboratory/web/ui/page';

export function WebHomeFeature() {
  return (
    <WebUiPage
      title="The Kin Laboratory"
      subtitle="The Kin Laboratory is a set of tools that enables people to try out and learn about the Kin network."
    >
      <Text>
        For more information about how to incorporate Kin into your Application,
        check out{' '}
        <WebUiExternalLink href="https://developer.kin.org/" label="our docs" />
        .
      </Text>
      <Text>
        To request additional features, visit our{' '}
        <WebUiExternalLink
          href="https://discord.gg/kdRyUNmHDn"
          label="Kin Developer Community Discord"
        />
        and put a request in the{' '}
        <WebUiExternalLink
          href="https://discord.com/channels/808859554997469244/934134681237073980"
          label="kin-laboratory"
        />
        channel.
      </Text>
    </WebUiPage>
  );
}
