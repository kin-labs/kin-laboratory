import { Button } from '@saas-ui/react';

export interface WebUiButtonProps {
  label: string;
  disabled?: boolean;
  onClick: (params?: unknown) => void;
  size?: string;
}

export function WebUiButton({
  disabled,
  label,
  onClick,
  size,
}: WebUiButtonProps) {
  return (
    <Button
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
