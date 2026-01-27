import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/common/FormField';
import { useAccountInquiryForm } from '@/hooks/useAccountInquiryForm';
import { AccountInquiryFormData } from '@/lib/schemas/accountInquirySchema';
import { Calendar } from 'lucide-react';

interface AccountInquiryFormProps {
  onSubmit: (data: AccountInquiryFormData) => void;
}

export function AccountInquiryForm({ onSubmit }: AccountInquiryFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useAccountInquiryForm();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <FormField
        label="Account Type"
        htmlFor="accountType"
        error={errors.accountType}
      >
        <Select
          value={formData.accountType}
          onValueChange={(value) => handleChange('accountType', value)}
        >
          <SelectTrigger id="accountType" className="w-full md:w-80">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inquiry-account">Inquiry account</SelectItem>
            <SelectItem value="savings">Savings Account</SelectItem>
            <SelectItem value="checking">Checking Account</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField
        label="Account Number"
        required
        htmlFor="accountNumber"
        error={errors.accountNumber}
      >
        <Select
          value={formData.accountNumber}
          onValueChange={(value) => handleChange('accountNumber', value)}
        >
          <SelectTrigger id="accountNumber" className="w-full md:w-80">
            <SelectValue placeholder="Select inquiry account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12345-00-12345">12345-00-12345</SelectItem>
            <SelectItem value="67890-00-67890">67890-00-67890</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField
        label="Inquiry Period"
        required
        error={errors.inquiryPeriodStart || errors.inquiryPeriodEnd}
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm">
              Today
            </Button>
            <Button type="button" variant="outline" size="sm">
              This week
            </Button>
            <Button type="button" variant="outline" size="sm">
              1 month
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                type="date"
                value={formData.inquiryPeriodStart}
                onChange={(e) =>
                  handleChange('inquiryPeriodStart', e.target.value)
                }
                className="w-36 pr-8"
                aria-label="Start date"
              />
              <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            <span className="text-muted-foreground">~</span>
            <div className="relative">
              <Input
                type="date"
                value={formData.inquiryPeriodEnd}
                onChange={(e) =>
                  handleChange('inquiryPeriodEnd', e.target.value)
                }
                className="w-36 pr-8"
                aria-label="End date"
              />
              <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </FormField>

      <FormField label="Transaction Type" error={errors.transactionType}>
        <RadioGroup
          value={formData.transactionType}
          onValueChange={(value) =>
            handleChange('transactionType', value as 'all' | 'debit' | 'credit')
          }
          className="flex items-center gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="type-all" />
            <Label htmlFor="type-all" className="cursor-pointer">
              All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="debit" id="type-debit" />
            <Label htmlFor="type-debit" className="cursor-pointer">
              Debit
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit" id="type-credit" />
            <Label htmlFor="type-credit" className="cursor-pointer">
              Credit
            </Label>
          </div>
        </RadioGroup>
      </FormField>

      <FormField label="Sorting Condition" error={errors.sortingCondition}>
        <RadioGroup
          value={formData.sortingCondition}
          onValueChange={(value) =>
            handleChange('sortingCondition', value as 'recent' | 'oldest')
          }
          className="flex items-center gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="recent" id="sort-recent" />
            <Label htmlFor="sort-recent" className="cursor-pointer">
              From recent
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oldest" id="sort-oldest" />
            <Label htmlFor="sort-oldest" className="cursor-pointer">
              From past
            </Label>
          </div>
        </RadioGroup>
      </FormField>

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          className="min-w-32"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Inquiry'}
        </Button>
      </div>
    </form>
  );
}
