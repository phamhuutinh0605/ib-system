import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { OverseasTransferFormData } from '@/lib/schemas/overseasTransferSchema';

type ToSectionProps = {
  form: UseFormReturn<OverseasTransferFormData>;
};

export default function ToSection({ form }: ToSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">To</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Beneficiary Name
          </label>
          <input
            {...register('beneficiaryName')}
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Beneficiary name"
            aria-invalid={!!errors.beneficiaryName}
          />
          {errors.beneficiaryName && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.beneficiaryName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Beneficiary Account / IBAN
          </label>
          <input
            {...register('beneficiaryAccount')}
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Account / IBAN"
            aria-invalid={!!errors.beneficiaryAccount}
          />
          {errors.beneficiaryAccount && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.beneficiaryAccount.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">
            Beneficiary Bank Name
          </label>
          <input
            {...register('bankName')}
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Bank name"
            aria-invalid={!!errors.bankName}
          />
          {errors.bankName && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.bankName.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}


