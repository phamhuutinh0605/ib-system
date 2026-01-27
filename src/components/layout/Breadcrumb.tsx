import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-secondary/50 border-b border-border"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <ol className="flex items-center gap-2 py-3 text-sm overflow-x-auto">
          <li className="flex items-center">
            <a
              href="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </a>
          </li>

          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              {item.href && !item.active ? (
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={`whitespace-nowrap ${
                    item.active
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  }`}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
