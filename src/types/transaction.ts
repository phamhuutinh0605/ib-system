export interface Transaction {
  id: number;
  date: string;
  transactionType: string;
  description: string;
  debit: number | null;
  credit: number | null;
  available: number;
  notes: string;
}

export interface AccountInfo {
  accountNumber: string;
  productName: string;
  nickName: string;
  openDate: string;
  maturityDate: string;
}
