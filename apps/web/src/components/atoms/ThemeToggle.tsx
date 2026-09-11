'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-[var(--text-secondary)]" />
      ) : (
        <Sun size={18} className="text-[var(--text-secondary)]" />
      )}
    </button>
  );
}
