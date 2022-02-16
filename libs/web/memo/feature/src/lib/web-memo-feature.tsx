import {
  WebCreateMemoCard,
  WebParseMemoCard,
} from '@kin-laboratory/web/memo/ui';
import { WebUiPage } from '@kin-laboratory/web/ui/page';

export function WebMemoFeature() {
  return (
    <WebUiPage>
      <div className="flex flex-col space-y-6">
        <h1 className="mt-2 block text-3xl text-left leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Kin Memo
        </h1>
        <div className="flex flex-col space-y-3 mt-6 prose prose-indigo prose-lg text-gray-500">
          <p>
            The Kin Memo format is used to track KIN transactions on the
            blockchain. The format is described{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/kinecosystem/agora-api/blob/master/spec/memo.md"
            >
              here
            </a>
            .
          </p>
        </div>
        <div>
          <WebCreateMemoCard />
        </div>
        <div>
          <WebParseMemoCard />
        </div>
      </div>
    </WebUiPage>
  );
}
