import type { ReactNode } from 'react';
import BrandLink from '../molecules/BrandLink';

export default function AuthShell({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#F7F8F6] blueprint-overlay"><header className="relative z-10 px-6 py-6"><div className="mx-auto flex max-w-7xl items-center justify-between"><BrandLink />{action}</div></header><main className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">{children}</main><footer className="relative z-10 border-t border-[#DDE2DD] px-6 py-6 text-center text-sm text-[#66706A]">© 2026 Qurasion. All rights reserved.</footer></div>;
}
