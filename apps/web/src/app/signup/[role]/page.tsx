import { notFound } from 'next/navigation';
import { AccountCreationPage, roleConfigs, type AccountRole } from '../../../components/auth/AccountCreationPage';

export function generateStaticParams() {
  return Object.keys(roleConfigs).map((role) => ({ role }));
}

export default async function RoleSignupPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;

  if (!Object.prototype.hasOwnProperty.call(roleConfigs, role)) {
    notFound();
  }

  return <AccountCreationPage role={role as AccountRole} />;
}
