import { useState } from 'react';
import { Transaction } from '@/types/transaction';
import { Button } from '@/components/ui/button';
import { Download, ChevronLeft, ChevronRight, Printer } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  totalCount: number;
}

const formatCurrency = (value: number | null): string => {
  if (value === null) return '';
  return new Intl.NumberFormat('ko-KR').format(value);
};

export function TransactionTable({
  transactions,
  totalCount,
}: TransactionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="bg-card rounded-lg border">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Transaction Details</h3>
          <span className="text-sm text-muted-foreground">({totalCount})</span>
          <span className="text-xs text-muted-foreground ml-2">
            2025.06.01~2025.07.01
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-12 text-center">#</th>
              <th>Date</th>
              <th>Transaction Type</th>
              <th>Description</th>
              <th className="text-right">Debit</th>
              <th className="text-right">Credit</th>
              <th className="text-right">Available</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="text-center text-muted-foreground">
                  {transaction.id}
                </td>
                <td className="whitespace-nowrap">{transaction.date}</td>
                <td>{transaction.transactionType}</td>
                <td className="text-primary">{transaction.description}</td>
                <td className="text-right font-mono">
                  {transaction.debit !== null && (
                    <span className="text-destructive">
                      {formatCurrency(transaction.debit)}
                    </span>
                  )}
                </td>
                <td className="text-right font-mono">
                  {transaction.credit !== null && (
                    <span className="text-success">
                      {formatCurrency(transaction.credit)}
                    </span>
                  )}
                </td>
                <td className="text-right font-mono">
                  {formatCurrency(transaction.available)}
                </td>
                <td className="text-muted-foreground text-xs max-w-[200px] truncate">
                  {transaction.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{' '}
          entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm px-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
