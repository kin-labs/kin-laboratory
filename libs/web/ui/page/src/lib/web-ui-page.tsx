import { PropsWithChildren } from 'react';

export interface WebUiPageProps {}

export function WebUiPage(props: PropsWithChildren<WebUiPageProps>) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-3 md:py-6">{props.children}</div>
    </div>
  );
}

export default WebUiPage;
