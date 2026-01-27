import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

export function FormField({
  label,
  required = false,
  error,
  children,
  htmlFor,
}: FormFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start gap-2 md:gap-4">
      <Label
        htmlFor={htmlFor}
        className="form-label flex items-center gap-1 py-2"
      >
        {required && <span className="text-destructive">*</span>}
        {label}
      </Label>
      <div className="flex-1">
        {children}
        {error && (
          <p className="text-destructive text-xs mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
