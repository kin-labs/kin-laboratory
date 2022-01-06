/* eslint-disable-next-line */
export interface WebUiButtonProps {
  label: string;
  disabled?: boolean;
  onClick: (params?: unknown) => void;
}

export function WebUiButton(props: WebUiButtonProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
    >
      {props.label}
    </button>
  );
}

export default WebUiButton;
