import React from 'react';
import { OverseasTransferFormData } from '@/lib/schemas/overseasTransferSchema';

type CompleteStepProps = {
  formData: OverseasTransferFormData;
  onContinue: () => void;
  onNext: () => void;
};

export default function CompleteStep({ formData, onContinue, onNext }: CompleteStepProps) {
  return (
    <div className="bg-card rounded-lg border p-6 mb-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center rounded-full bg-success-100 w-14 h-14 mx-auto mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Successful Transaction</h2>
      </div>

      <div className="mb-6">
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-2 text-muted-foreground">Beneficiary Account/Bank</td>
              <td className="py-2 text-foreground text-right">{formData.beneficiaryName} / {formData.bankName}</td>
            </tr>
            <tr>
              <td className="py-2 text-muted-foreground">Amount</td>
              <td className="py-2 text-foreground text-right">{formData.currency} {formData.amount || '0.00'}</td>
            </tr>
            <tr>
              <td className="py-2 text-muted-foreground">Transaction Fee</td>
              <td className="py-2 text-foreground text-right">USD 2.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded-md border px-4 py-2 bg-muted text-muted-foreground"
          onClick={onContinue}
        >
          Continue Transaction
        </button>

        <button
          type="button"
          className="rounded-md px-4 py-2 bg-primary text-white"
          onClick={onNext}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}


