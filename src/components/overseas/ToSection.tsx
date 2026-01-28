import React from 'react';

type ToSectionProps = {
  beneficiaryName: string;
  beneficiaryAccount: string;
  bankName: string;
  onChange: (field: 'beneficiaryName'|'beneficiaryAccount'|'bankName', value: string) => void;
};

export default function ToSection({ beneficiaryName, beneficiaryAccount, bankName, onChange }: ToSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">To</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Beneficiary Name
          </label>
          <input
            className="w-full rounded-md border p-2"
            value={beneficiaryName}
            onChange={(e) => onChange('beneficiaryName', e.target.value)}
            placeholder="Beneficiary name"
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Beneficiary Account / IBAN
          </label>
          <input
            className="w-full rounded-md border p-2"
            value={beneficiaryAccount}
            onChange={(e) => onChange('beneficiaryAccount', e.target.value)}
            placeholder="Account / IBAN"
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Beneficiary Bank Name
          </label>
          <input
            className="w-full rounded-md border p-2"
            value={bankName}
            onChange={(e) => onChange('bankName', e.target.value)}
            placeholder="Bank name"
          />
        </div>
      </div>
    </section>
  );
}


