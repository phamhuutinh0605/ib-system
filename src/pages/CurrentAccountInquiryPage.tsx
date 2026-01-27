import { AccountCard } from '@/components/account/AccountCard';
import { AccountInquiryForm } from '@/components/account/AccountInquiryForm';
import { TransactionTable } from '@/components/account/TransactionTable';
import { InfoBox } from '@/components/common/InfoBox';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { mockAccount, mockTransactions } from '@/lib/mockData';
import { AccountInquiryFormData } from '@/lib/schemas/accountInquirySchema';
import { Star } from 'lucide-react';
import { useCallback, useState } from 'react';

const BREADCRUMB_ITEMS = [
  { label: 'Account', href: '/account' },
  { label: 'Current Account', href: '/account/current' },
  { label: 'Current Account Inquiry', active: true },
];

export function CurrentAccountInquiryPage() {
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const handleFormSubmit = useCallback((data: AccountInquiryFormData) => {
    console.log('Form submitted:', data);
    setShowResults(true);
  }, []);

  const handleAccountToggle = useCallback(() => {
    setIsAccountExpanded((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <main className="flex-1 container mx-auto px-4 lg:px-6 py-6">
        {/* Page Title */}
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Current Account Inquiry
          </h1>
          <Star className="h-5 w-5 text-warning fill-warning" />
        </div>

        {/* Info Box */}
        <div className="mb-6">
          <InfoBox title="Information & Note" faqLink="#faq">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Inquiry the Account Details of the account you want.</li>
              <li>
                The default search period is from today to the last 30 days.
              </li>
            </ul>
          </InfoBox>
        </div>

        {/* Inquiry Form */}
        <div className="bg-card rounded-lg border p-6 mb-6">
          <div className="text-right text-xs text-muted-foreground mb-4">
            <span className="text-destructive">*</span> Required Field
          </div>
          <AccountInquiryForm onSubmit={handleFormSubmit} />
        </div>

        {showResults && (
          <>
            {/* Account Card */}
            <div className="mb-6">
              <AccountCard
                account={mockAccount}
                isExpanded={isAccountExpanded}
                onToggle={handleAccountToggle}
              />
            </div>

            {/* Transaction Table */}
            <TransactionTable
              transactions={mockTransactions}
              totalCount={mockTransactions.length}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CurrentAccountInquiryPage;
