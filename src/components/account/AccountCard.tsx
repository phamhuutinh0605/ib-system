import { ChevronDown, User } from 'lucide-react';
import { AccountInfo } from '@/types/transaction';

interface AccountCardProps {
  account: AccountInfo;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function AccountCard({
  account,
  isExpanded = false,
  onToggle,
}: AccountCardProps) {
  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium text-foreground">
                {account.accountNumber}
              </span>
              <span className="font-semibold text-foreground">
                {account.productName}
              </span>
              <span className="text-muted-foreground">{account.nickName}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              <span>Open Date: {account.openDate}</span>
              {account.maturityDate && (
                <>
                  <span className="mx-2">|</span>
                  <span>Maturity Date: {account.maturityDate}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="border-t p-4 bg-muted/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Account Type</span>
              <p className="font-medium mt-1">Corporate Account</p>
            </div>
            <div>
              <span className="text-muted-foreground">Currency</span>
              <p className="font-medium mt-1">KRW</p>
            </div>
            <div>
              <span className="text-muted-foreground">Branch</span>
              <p className="font-medium mt-1">Seoul Main Branch</p>
            </div>
            <div>
              <span className="text-muted-foreground">Status</span>
              <p className="font-medium mt-1 text-success">Active</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
