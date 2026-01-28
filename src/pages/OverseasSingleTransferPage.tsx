import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { InfoBox } from '@/components/common/InfoBox';
import VerifyStep from '@/components/overseas/VerifyStep';
import CompleteStep from '@/components/overseas/CompleteStep';
import FromSection from '@/components/overseas/FromSection';
import ToSection from '@/components/overseas/ToSection';
import AmountSection from '@/components/overseas/AmountSection';
import InformationSection from '@/components/overseas/InformationSection';
import ConfirmationSection from '@/components/overseas/ConfirmationSection';
import { useCallback, useState } from 'react';

const BREADCRUMB_ITEMS = [
  { label: 'Remit', href: '/remit' },
  { label: 'Overseas Transfer', href: '/remit/overseas' },
  { label: 'Overseas Single Transfer', active: true },
];

type TransferFormState = {
  fromAccount: string;
  beneficiaryName: string;
  beneficiaryAccount: string;
  bankName: string;
  amount: string;
  currency: string;
  purpose: string;
  instruction: string;
  confirmPurpose: boolean;
};

export function OverseasSingleTransferPage() {
  const [form, setForm] = useState<TransferFormState>({
    fromAccount: '123-456-7890',
    beneficiaryName: '',
    beneficiaryAccount: '',
    bankName: '',
    amount: '',
    currency: 'USD',
    purpose: '',
    instruction: '',
    confirmPurpose: false,
  });
  const [step, setStep] = useState<number>(1);

  const handleChange = useCallback(
    (field: keyof TransferFormState, value: string | boolean) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Move to verification step
    setStep(2);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Breadcrumb items={BREADCRUMB_ITEMS} />

      <main className="flex-1 container mx-auto px-4 lg:px-6 py-6">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Overseas Single Transfer
          </h1>
        </div>

        <div className="mb-6">
          <InfoBox title="Information & Notice" faqLink="#faq">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                The available balance must be verified with the bank before the
                transaction is processed.
              </li>
              <li>
                Some recipient banks may require additional information. Please
                confirm details before submitting.
              </li>
            </ul>
          </InfoBox>
        </div>
        {step === 1 && (
          <form className="bg-card rounded-lg border p-6 mb-6" onSubmit={handleSubmit}>
            <FromSection
              fromAccount={form.fromAccount}
              onChange={(field, value) => handleChange(field, value)}
            />

            <ToSection
              beneficiaryName={form.beneficiaryName}
              beneficiaryAccount={form.beneficiaryAccount}
              bankName={form.bankName}
              onChange={(field, value) => handleChange(field, value)}
            />

            <AmountSection
              currency={form.currency}
              amount={form.amount}
              onChange={(field, value) => handleChange(field, value)}
            />

            <InformationSection
              purpose={form.purpose}
              instruction={form.instruction}
              onChange={(field, value) => handleChange(field, value)}
            />

            <ConfirmationSection
              confirmPurpose={form.confirmPurpose}
              onChange={(field, value) => handleChange(field, value)}
              onReset={() =>
                setForm((prev) => ({
                  ...prev,
                  beneficiaryName: '',
                  beneficiaryAccount: '',
                  bankName: '',
                  amount: '',
                  purpose: '',
                  instruction: '',
                  confirmPurpose: false,
                }))
              }
              onNext={() => setStep(2)}
              disableNext={!form.confirmPurpose}
            />
          </form>
        )}

        {step === 2 && (
          <VerifyStep
            form={form}
            onPrev={() => setStep(1)}
            onConfirm={() => {
              // simulate processing then go to complete
              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <CompleteStep
            form={form}
            onContinue={() => {
              // reset and go back to step 1
              setForm({
                fromAccount: form.fromAccount,
                beneficiaryName: '',
                beneficiaryAccount: '',
                bankName: '',
                amount: '',
                currency: form.currency,
                purpose: '',
                instruction: '',
                confirmPurpose: false,
              });
              setStep(1);
            }}
            onNext={() => {
              // placeholder for next actions
              alert('Next step clicked (mock)');
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default OverseasSingleTransferPage;


