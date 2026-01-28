import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { OverseasTransferFormData, defaultOverseasTransferValues } from '@/lib/schemas/overseasTransferSchema';

type ConfirmationSectionProps = {
  form: UseFormReturn<OverseasTransferFormData>;
  onNext: () => void;
  disableNext: boolean;
};

export default function ConfirmationSection({ form, onNext, disableNext }: ConfirmationSectionProps) {
  const {
    register,
    reset,
    formState: { errors },
    watch,
  } = form;

  const confirmPurpose = watch('confirmPurpose');

  const handleReset = () => {
    reset(defaultOverseasTransferValues);
  };

  return (
    <div className="mb-6">
      <section className="mb-4">
        <div className="flex items-start gap-3">
          <input
            {...register('confirmPurpose')}
            id="confirmPurpose"
            type="checkbox"
            className="mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-invalid={!!errors.confirmPurpose}
          />
          <label htmlFor="confirmPurpose" className="text-sm text-muted-foreground">
            I hereby confirm that the purpose of transaction given above is true.
          </label>
        </div>
        {errors.confirmPurpose && (
          <p className="text-sm text-destructive mt-1" role="alert">
            {errors.confirmPurpose.message}
          </p>
        )}
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded-md border px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={disableNext || !confirmPurpose}
          className="rounded-md px-4 py-2 bg-primary text-white disabled:opacity-50 hover:bg-primary/90 transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}


