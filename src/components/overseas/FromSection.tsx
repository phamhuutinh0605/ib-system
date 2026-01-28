import React from 'react';

type FromSectionProps = {
  fromAccount: string;
  onChange: (field: 'fromAccount', value: string) => void;
};

export default function FromSection({ fromAccount, onChange }: FromSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">From</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Debit Account
          </label>
          <select
            className="w-full rounded-md border p-2 bg-input"
            value={fromAccount}
            onChange={(e) => onChange('fromAccount', e.target.value)}
          >
            <option value="123-456-7890">Savings - 123-456-7890</option>
            <option value="987-654-3210">Checking - 987-654-3210</option>
          </select>
        </div>
      </div>
    </section>
  );
}


