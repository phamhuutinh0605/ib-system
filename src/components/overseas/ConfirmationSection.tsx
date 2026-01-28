import React from 'react';

type ConfirmationSectionProps = {
  confirmPurpose: boolean;
  onChange: (field: 'confirmPurpose', value: boolean) => void;
  onReset: () => void;
  onNext: () => void;
  disableNext: boolean;
};

export default function ConfirmationSection({ confirmPurpose, onChange, onReset, onNext, disableNext }: ConfirmationSectionProps) {
  return (
    <div className="mb-6">
      <section className="mb-4">
        <div className="flex items-start gap-3">
          <input
            id="confirmPurpose"
            type="checkbox"
            checked={confirmPurpose}
            onChange={(e) => onChange('confirmPurpose', e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="confirmPurpose" className="text-sm text-muted-foreground">
            I hereby confirm that the purpose of transaction given above is true.
          </label>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded-md border px-4 py-2 bg-muted text-muted-foreground"
          onClick={onReset}
        >
          Reset
        </button>

        <button
          type="button"
          disabled={disableNext}
          className="rounded-md px-4 py-2 bg-primary text-white disabled:opacity-50"
          onClick={onNext}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}


