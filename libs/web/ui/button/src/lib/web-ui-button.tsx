import { Button } from '@saas-ui/react';

export interface WebUiButtonProps {
  label: string;
  disabled?: boolean;
  onClick: (params?: unknown) => void;
  size?: string;
  style?: any;
}

export function WebUiButton({
  disabled,
  label,
  onClick,
  size,
  style,
}: WebUiButtonProps) {
  return (
    <Button
      style={style}
      size={size}
      disabled={disabled}
      onClick={onClick}
      variant="outline"
      colorScheme="primary"
    >
      {label}
    </Button>
  );
}
