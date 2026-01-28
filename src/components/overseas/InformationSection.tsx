import React from 'react';

type InformationSectionProps = {
  purpose: string;
  instruction: string;
  onChange: (field: 'purpose'|'instruction', value: string) => void;
};

export default function InformationSection({ purpose, instruction, onChange }: InformationSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Information</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Transaction Description / Purpose
          </label>
          <input
            className="w-full rounded-md border p-2"
            value={purpose}
            onChange={(e) => onChange('purpose', e.target.value)}
            placeholder="Purpose of transfer"
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Instruction / Additional Information
          </label>
          <textarea
            className="w-full rounded-md border p-2"
            rows={3}
            value={instruction}
            onChange={(e) => onChange('instruction', e.target.value)}
            placeholder="Optional instruction"
          />
        </div>
      </div>
    </section>
  );
}


