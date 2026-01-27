import { useState, useCallback, useMemo } from 'react';
import {
  accountInquirySchema,
  AccountInquiryFormData,
  defaultAccountInquiryValues,
} from '@/lib/schemas/accountInquirySchema';
import { z } from 'zod';

interface FieldErrors {
  [key: string]: string | undefined;
}

interface UseAccountInquiryFormReturn {
  formData: AccountInquiryFormData;
  errors: FieldErrors;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (field: keyof AccountInquiryFormData, value: string) => void;
  handleSubmit: (onSuccess: (data: AccountInquiryFormData) => void) => void;
  resetForm: () => void;
  validateField: (field: keyof AccountInquiryFormData) => void;
}

export function useAccountInquiryForm(): UseAccountInquiryFormReturn {
  const [formData, setFormData] = useState<AccountInquiryFormData>(
    defaultAccountInquiryValues
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const validateField = useCallback(
    (field: keyof AccountInquiryFormData) => {
      try {
        const fieldSchema = accountInquirySchema.shape[field];
        fieldSchema.parse(formData[field]);
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors[0]?.message;
          setErrors((prev) => ({ ...prev, [field]: fieldError }));
        }
      }
    },
    [formData]
  );

  const handleChange = useCallback(
    (field: keyof AccountInquiryFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setTouched((prev) => new Set(prev).add(field));

      // Clear error on change
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    try {
      accountInquirySchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FieldErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          if (!newErrors[field]) {
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleSubmit = useCallback(
    (onSuccess: (data: AccountInquiryFormData) => void) => {
      setIsSubmitting(true);

      const isValid = validateForm();
      if (isValid) {
        onSuccess(formData);
      }

      setIsSubmitting(false);
    },
    [formData, validateForm]
  );

  const resetForm = useCallback(() => {
    setFormData(defaultAccountInquiryValues);
    setErrors({});
    setTouched(new Set());
  }, []);

  const isValid = useMemo(() => {
    try {
      accountInquirySchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  }, [formData]);

  return {
    formData,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    handleSubmit,
    resetForm,
    validateField,
  };
}
