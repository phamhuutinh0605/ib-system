import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { OverseasTransferFormData } from '@/lib/schemas/overseasTransferSchema';

type FromSectionProps = {
  form: UseFormReturn<OverseasTransferFormData>;
};

export default function FromSection({ form }: FromSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">From</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Debit Account
          </label>
          <select
            {...register('fromAccount')}
            className="w-full rounded-md border p-2 bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            aria-invalid={!!errors.fromAccount}
          >
            <option value="123-456-7890">Savings - 123-456-7890</option>
            <option value="987-654-3210">Checking - 987-654-3210</option>
          </select>
          {errors.fromAccount && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.fromAccount.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}


