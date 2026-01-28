import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { OverseasTransferFormData } from '@/lib/schemas/overseasTransferSchema';

type AmountSectionProps = {
  form: UseFormReturn<OverseasTransferFormData>;
};

export default function AmountSection({ form }: AmountSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Transfer amount</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Currency
          </label>
          <select
            {...register('currency')}
            className="w-full rounded-md border p-2 bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            aria-invalid={!!errors.currency}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="HKD">HKD</option>
            <option value="SGD">SGD</option>
            <option value="KRW">KRW</option>
            <option value="THB">THB</option>
            <option value="VND">VND</option>
            <option value="IDR">IDR</option>
            <option value="MYR">MYR</option>
            <option value="PHP">PHP</option>
            <option value="INR">INR</option>
            <option value="NZD">NZD</option>
            <option value="ZAR">ZAR</option>
            <option value="BRL">BRL</option>
          </select>
          {errors.currency && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.currency.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">
            Amount
          </label>
          <input
            {...register('amount')}
            type="number"
            step="0.01"
            min="0"
            max="10000000"
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
            aria-invalid={!!errors.amount}
          />
          {errors.amount && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.amount.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}


