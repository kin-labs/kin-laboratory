import { WebUiPage } from '@kin-laboratory/web/ui/page';

export interface WebHomeFeatureProps {}

export function WebHomeFeature(props: WebHomeFeatureProps) {
  return (
    <WebUiPage>
      <h1>
        <span className="mt-2 block text-3xl text-left leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          The Kin Laboratory
        </span>
      </h1>
      <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <p>
          The Kin Laboratory is a set of tools that enables people to try out
          and learn about the Kin network.
        </p>
        <br />
        <p>
          For more information about how to incorporate Kin into your
          Application, check out{' '}
          <a href="https://developer.kin.org/" target="_blank" rel="noreferrer">
            our docs
          </a>
          .
        </p>
        <p>
          To request additional features, visit our{' '}
          <a
            href="https://discord.com/channels/808859554997469244/"
            target="_blank"
            rel="noreferrer"
          >
            Kin Developer Community Discord
          </a>{' '}
          and put a request in the{' '}
          <a
            href="https://discord.com/channels/808859554997469244/866647819913396224"
            target="_blank"
            rel="noreferrer"
          >
            kin-labs-requests
          </a>{' '}
          channel.
        </p>
      </div>
    </WebUiPage>
  );
}

export default WebHomeFeature;
