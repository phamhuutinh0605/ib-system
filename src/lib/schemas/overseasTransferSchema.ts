import { z } from 'zod';

// Account number validation regex (allows numbers, hyphens, spaces)
const accountNumberRegex = /^[0-9\s\-]+$/;

// Currency codes for overseas transfers
const validCurrencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'SGD',
  'KRW', 'THB', 'VND', 'IDR', 'MYR', 'PHP', 'INR', 'NZD', 'ZAR', 'BRL'
] as const;

// Amount validation (positive numbers with up to 2 decimal places)
const amountRegex = /^\d+(\.\d{1,2})?$/;

export const overseasTransferSchema = z.object({
  fromAccount: z
    .string()
    .min(1, 'From account is required')
    .regex(accountNumberRegex, 'Invalid account number format')
    .max(50, 'Account number is too long'),

  beneficiaryName: z
    .string()
    .min(1, 'Beneficiary name is required')
    .min(2, 'Beneficiary name must be at least 2 characters')
    .max(100, 'Beneficiary name is too long')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Beneficiary name contains invalid characters'),

  beneficiaryAccount: z
    .string()
    .min(1, 'Beneficiary account is required')
    .regex(accountNumberRegex, 'Invalid account number format')
    .max(50, 'Account number is too long'),

  bankName: z
    .string()
    .min(1, 'Bank name is required')
    .min(2, 'Bank name must be at least 2 characters')
    .max(100, 'Bank name is too long')
    .regex(/^[a-zA-Z\s\-&\.,]+$/, 'Bank name contains invalid characters'),

  amount: z
    .string()
    .min(1, 'Amount is required')
    .regex(amountRegex, 'Amount must be a valid number with up to 2 decimal places')
    .refine((val) => {
      const num = parseFloat(val);
      return num > 0 && num <= 10000000; // Max 10M for security
    }, 'Amount must be greater than 0 and not exceed 10,000,000'),

  currency: z
    .enum(validCurrencies, {
      required_error: 'Currency is required',
      invalid_type_error: 'Invalid currency selected',
    }),

  purpose: z
    .string()
    .min(1, 'Purpose is required')
    .min(3, 'Purpose must be at least 3 characters')
    .max(500, 'Purpose description is too long'),

  instruction: z
    .string()
    .max(1000, 'Instructions are too long')
    .optional(),

  confirmPurpose: z
    .boolean()
    .refine((val) => val === true, 'You must confirm the purpose of the transfer'),
});

export type OverseasTransferFormData = z.infer<typeof overseasTransferSchema>;

export const defaultOverseasTransferValues: OverseasTransferFormData = {
  fromAccount: '123-456-7890',
  beneficiaryName: '',
  beneficiaryAccount: '',
  bankName: '',
  amount: '',
  currency: 'USD',
  purpose: '',
  instruction: '',
  confirmPurpose: false,
};
