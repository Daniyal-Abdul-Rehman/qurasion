import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

export default function IconButton({ label, children, className = '', ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE2DD] bg-white text-[#66706A] transition hover:border-[#173D2B] hover:text-[#173D2B] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
