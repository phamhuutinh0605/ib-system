import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { OverseasTransferFormData } from '@/lib/schemas/overseasTransferSchema';

type InformationSectionProps = {
  form: UseFormReturn<OverseasTransferFormData>;
};

export default function InformationSection({ form }: InformationSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Information</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Transaction Description / Purpose
          </label>
          <input
            {...register('purpose')}
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Purpose of transfer"
            aria-invalid={!!errors.purpose}
          />
          {errors.purpose && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.purpose.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Instruction / Additional Information
          </label>
          <textarea
            {...register('instruction')}
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
            placeholder="Optional instruction"
            aria-invalid={!!errors.instruction}
          />
          {errors.instruction && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.instruction.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}


