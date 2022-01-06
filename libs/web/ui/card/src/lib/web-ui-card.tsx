import { PropsWithChildren } from 'react';

export interface WebUiCardProps {}

export function WebUiCard(props: PropsWithChildren<WebUiCardProps>) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
      <div className="px-4 py-5 sm:p-6">{props.children}</div>
    </div>
  );
}

export default WebUiCard;
