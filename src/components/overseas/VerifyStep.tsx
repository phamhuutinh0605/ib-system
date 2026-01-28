import React from 'react';
import { OverseasTransferFormData } from '@/lib/schemas/overseasTransferSchema';

type VerifyStepProps = {
  formData: OverseasTransferFormData;
  onPrev: () => void;
  onConfirm: () => void;
};

export default function VerifyStep({ formData, onPrev, onConfirm }: VerifyStepProps) {
  return (
    <div className="bg-card rounded-lg border p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Verify Overseas single transfer</h2>

      <div className="bg-muted p-4 rounded-md mb-4">
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-2 text-muted-foreground">Debit Account</td>
              <td className="py-2 text-foreground text-right">{formData.fromAccount}</td>
            </tr>
            <tr>
              <td className="py-2 text-muted-foreground">Beneficiary</td>
              <td className="py-2 text-foreground text-right">{formData.beneficiaryName}</td>
            </tr>
            <tr>
              <td className="py-2 text-muted-foreground">Account / IBAN</td>
              <td className="py-2 text-foreground text-right">{formData.beneficiaryAccount}</td>
            </tr>
            <tr>
              <td className="py-2 text-muted-foreground">Bank</td>
              <td className="py-2 text-foreground text-right">{formData.bankName}</td>
            </tr>
            <tr>
              <td className="py-2 text-muted-foreground">Amount</td>
              <td className="py-2 text-foreground text-right">
                {formData.currency} {formData.amount || '0.00'}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-muted-foreground">Purpose</td>
              <td className="py-2 text-foreground text-right">{formData.purpose}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Authentication</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">OTP / SMS</label>
            <input className="w-full rounded-md border p-2" placeholder="Enter OTP" />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="rounded-md border px-4 py-2 bg-muted text-muted-foreground"
          onClick={onPrev}
        >
          Previous
        </button>

        <button
          type="button"
          className="rounded-md px-4 py-2 bg-primary text-white"
          onClick={onConfirm}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}


