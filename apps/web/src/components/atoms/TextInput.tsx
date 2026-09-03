import type { InputHTMLAttributes } from 'react';

export default function TextInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`input w-full ${className}`} {...props} />;
}
