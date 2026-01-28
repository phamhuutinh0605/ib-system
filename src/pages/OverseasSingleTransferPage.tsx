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
import { useOverseasTransferForm } from '@/hooks/useOverseasTransferForm';
import { useState } from 'react';

const BREADCRUMB_ITEMS = [
  { label: 'Remit', href: '/remit' },
  { label: 'Overseas Transfer', href: '/remit/overseas' },
  { label: 'Overseas Single Transfer', active: true },
];

export function OverseasSingleTransferPage() {
  const { form, formData, isValid, handleSubmit } = useOverseasTransferForm();
  const [step, setStep] = useState<number>(1);

  const handleFormSubmit = async () => {
    setStep(2);
  };

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
          <form
            className="bg-card rounded-lg border p-6 mb-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(handleFormSubmit);
            }}
          >
            <FromSection form={form} />

            <ToSection form={form} />

            <AmountSection form={form} />

            <InformationSection form={form} />

            <ConfirmationSection
              form={form}
              onNext={() => setStep(2)}
              disableNext={!isValid}
            />
          </form>
        )}

        {step === 2 && (
          <VerifyStep
            formData={formData}
            onPrev={() => setStep(1)}
            onConfirm={() => {
              // In a real application, this would trigger the actual transfer
              // For now, simulate processing then go to complete
              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <CompleteStep
            formData={formData}
            onContinue={() => {
              // Reset form and go back to step 1
              form.reset();
              setStep(1);
            }}
            onNext={() => {
              // Placeholder for next actions (e.g., navigate to transaction history)
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


