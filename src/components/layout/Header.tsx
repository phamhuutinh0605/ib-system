import { Search, User, Menu, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '../common/Logo';

const NAV_ITEMS = [
  { id: 'account', label: 'ACCOUNT', active: true },
  { id: 'transfer', label: 'TRANSFER', active: false },
  { id: 'payment', label: 'PAYMENT', active: false },
  { id: 'card', label: 'CARD', active: false },
  { id: 'loan', label: 'LOAN', active: false },
  { id: 'trade', label: 'TRADE', active: false },
  { id: 'setting', label: 'SETTING', active: false },
] as const;

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card border-header-border">
      {/* Top Header */}
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Logo/>
            <span className="font-semibold text-foreground text-lg hidden sm:inline">
              Shinhan Bank
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 ml-4">
            <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
              CORPORATE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span>09:35</span>
          </div>

          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="User profile">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-nav">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <ul className="flex items-center overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`nav-item whitespace-nowrap ${
                    item.active ? 'active' : ''
                  }`}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-nav-foreground hover:bg-nav-hover"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-nav-foreground hover:bg-nav-hover"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
