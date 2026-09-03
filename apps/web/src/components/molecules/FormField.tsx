import type { InputHTMLAttributes, ReactNode } from 'react';
import TextInput from '../atoms/TextInput';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  children?: ReactNode;
}

export default function FormField({ label, children, ...inputProps }: FormFieldProps) {
  return <label className="block"><span className="mb-2 block text-sm text-[#66706A]">{label}</span>{children ?? <TextInput {...inputProps} />}</label>;
}
