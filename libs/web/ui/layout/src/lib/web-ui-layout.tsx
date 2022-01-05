import { WebUiFooter } from '@kin-laboratory/web/ui/footer';
import { WebUiHeader } from '@kin-laboratory/web/ui/header';
import { PropsWithChildren } from 'react';

export interface WebUiLayoutProps {}

export function WebUiLayout(props: PropsWithChildren<WebUiLayoutProps>) {
  return (
    <>
      <WebUiHeader />
      <main>{props.children}</main>
      <WebUiFooter />
    </>
  );
}

export default WebUiLayout;
