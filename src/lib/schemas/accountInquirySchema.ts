import { z } from 'zod';

export const accountInquirySchema = z.object({
  accountType: z.string().min(1, 'Account type is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  inquiryPeriodStart: z.string().min(1, 'Start date is required'),
  inquiryPeriodEnd: z.string().min(1, 'End date is required'),
  transactionType: z.enum(['all', 'debit', 'credit'], {
    required_error: 'Transaction type is required',
  }),
  sortingCondition: z.enum(['recent', 'oldest'], {
    required_error: 'Sorting condition is required',
  }),
});

export type AccountInquiryFormData = z.infer<typeof accountInquirySchema>;

export const defaultAccountInquiryValues: AccountInquiryFormData = {
  accountType: 'inquiry-account',
  accountNumber: '',
  inquiryPeriodStart: '',
  inquiryPeriodEnd: '',
  transactionType: 'all',
  sortingCondition: 'recent',
};
