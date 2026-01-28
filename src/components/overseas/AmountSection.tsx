import React from 'react';

type AmountSectionProps = {
  currency: string;
  amount: string;
  onChange: (field: 'currency'|'amount', value: string) => void;
};

export default function AmountSection({ currency, amount, onChange }: AmountSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Transfer amount</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Currency
          </label>
          <select
            className="w-full rounded-md border p-2 bg-input"
            value={currency}
            onChange={(e) => onChange('currency', e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="KRW">KRW</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">
            Amount
          </label>
          <input
            className="w-full rounded-md border p-2"
            value={amount}
            onChange={(e) => onChange('amount', e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>
    </section>
  );
}


