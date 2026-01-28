import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  overseasTransferSchema,
  OverseasTransferFormData,
  defaultOverseasTransferValues,
} from '@/lib/schemas/overseasTransferSchema';

export interface UseOverseasTransferFormReturn {
  form: UseFormReturn<OverseasTransferFormData>;
  formData: OverseasTransferFormData;
  isSubmitting: boolean;
  isValid: boolean;
  handleSubmit: (onSuccess: (data: OverseasTransferFormData) => void) => Promise<void>;
  resetForm: () => void;
  validateField: (field: keyof OverseasTransferFormData) => void;
}

export function useOverseasTransferForm(): UseOverseasTransferFormReturn {
  const form = useForm<OverseasTransferFormData>({
    resolver: zodResolver(overseasTransferSchema),
    defaultValues: defaultOverseasTransferValues,
    mode: 'onChange', // Validate on change for better UX
  });

  const {
    handleSubmit: rhfHandleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    watch,
    trigger,
  } = form;

  // Watch form data for reactive updates
  const formData = watch();

  const handleSubmit = async (onSuccess: (data: OverseasTransferFormData) => void) => {
    await rhfHandleSubmit(async (data) => {
      // Sanitize inputs before processing
      const sanitizedData = sanitizeFormData(data);

      // Additional security checks can be added here
      await onSuccess(sanitizedData);
    })();
  };

  const resetForm = () => {
    reset(defaultOverseasTransferValues);
  };

  const validateField = (field: keyof OverseasTransferFormData) => {
    trigger(field);
  };

  return {
    form,
    formData,
    isSubmitting,
    isValid,
    handleSubmit,
    resetForm,
    validateField,
  };
}

/**
 * Sanitizes form data to prevent XSS and ensure data integrity
 * This is an additional security layer beyond Zod validation
 */
function sanitizeFormData(data: OverseasTransferFormData): OverseasTransferFormData {
  return {
    ...data,
    beneficiaryName: sanitizeText(data.beneficiaryName),
    beneficiaryAccount: sanitizeAccountNumber(data.beneficiaryAccount),
    bankName: sanitizeText(data.bankName),
    purpose: sanitizeText(data.purpose),
    instruction: data.instruction ? sanitizeText(data.instruction) : '',
  };
}

/**
 * Sanitizes text inputs by removing potentially harmful characters
 */
function sanitizeText(text: string): string {
  return text
    .trim()
    // Remove null bytes and other control characters
    .replace(/[\x00-\x1F\x7F]/g, '')
    // Remove potential script tags (additional layer beyond React's built-in XSS protection)
    .replace(/<[^>]*>/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ');
}

/**
 * Sanitizes account numbers by removing non-numeric characters except allowed separators
 */
function sanitizeAccountNumber(account: string): string {
  return account
    .trim()
    // Only allow numbers, spaces, and hyphens
    .replace(/[^0-9\s\-]/g, '')
    // Normalize multiple spaces/hyphens to single
    .replace(/[\s\-]+/g, '-');
}
