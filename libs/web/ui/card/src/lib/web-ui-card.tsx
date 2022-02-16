import { PropsWithChildren } from 'react';

export interface WebUiCardProps {
  title?: string;
}

export function WebUiCard(props: PropsWithChildren<WebUiCardProps>) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
      {props?.title && (
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {props.title}
          </h3>
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">{props.children}</div>
    </div>
  );
}

