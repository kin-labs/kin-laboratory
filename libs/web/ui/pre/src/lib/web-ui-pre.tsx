import { PropsWithChildren } from 'react';

export interface WebUiPreProps {}

export function WebUiPre(props: PropsWithChildren<WebUiPreProps>) {
  return (
    <pre className="p-4 text-sm bg-gray-50 rounded rounded-md border border-gray-200">
      {props.children}
    </pre>
  );
}

export default WebUiPre;
