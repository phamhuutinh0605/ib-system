import { Info } from 'lucide-react';
import { ReactNode } from 'react';

interface InfoBoxProps {
  title: string;
  children: ReactNode;
  faqLink?: string;
}

export function InfoBox({ title, children, faqLink }: InfoBoxProps) {
  return (
    <div className="info-box">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-2">{title}</h3>
          <div className="text-sm">{children}</div>
        </div>
        {faqLink && (
          <a
            href={faqLink}
            className="text-sm text-primary hover:underline flex-shrink-0"
          >
            FAQ
          </a>
        )}
      </div>
    </div>
  );
}
