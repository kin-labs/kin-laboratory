import { WebUiFooter } from '@kin-laboratory/web/ui/footer';
import { WebUiHeader } from '@kin-laboratory/web/ui/header';
import { PropsWithChildren } from 'react';

export interface WebUiLayoutProps {}

export function WebUiLayout(props: PropsWithChildren<WebUiLayoutProps>) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <WebUiHeader />
      <main className="flex-grow">{props.children}</main>
      <WebUiFooter />
    </div>
  );
}

export default WebUiLayout;
