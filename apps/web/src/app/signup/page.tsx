import Link from 'next/link';

const accountTypes = [
  { role: 'investor', title: 'Investor', description: 'Discover opportunities and build a focused portfolio.' },
  { role: 'acquisitions', title: 'Acquisitions team', description: 'Source, qualify, and move deals toward close.' },
  { role: 'analyst', title: 'Analyst', description: 'Research markets and turn property data into conviction.' },
  { role: 'data-operations', title: 'Data operations', description: 'Keep source data clean, traceable, and actionable.' },
  { role: 'administrator', title: 'Administrator', description: 'Govern access, configuration, and platform operations.' },
];

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay flex flex-col">
      <header className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#173D2B]"><span className="text-lg font-bold text-white">Q</span></div>
            <span className="font-display text-xl font-semibold text-[#172019]">Qurasion</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#66706A]">Create your workspace</p>
            <h1 className="mb-4 font-display text-4xl font-light text-[#172019] md:text-5xl">Choose your Qurasion workspace</h1>
            <p className="font-light leading-7 text-[#66706A]">Start with the tools and workflows that fit the way you work in real estate.</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accountTypes.map((accountType) => (
              <Link key={accountType.role} href={`/signup/${accountType.role}`} className="card group bg-white hover:border-[#173D2B]">
                <h2 className="font-display text-2xl text-[#172019]">{accountType.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#66706A]">{accountType.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#173D2B]">Create account <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-[#66706A]">Already have an account? <Link href="/login" className="font-medium text-[#173D2B] hover:underline">Sign in</Link></p>
        </div>
      </main>

      <footer className="border-t border-[#DDE2DD] px-6 py-6 text-center text-sm text-[#66706A]">© 2026 Qurasion. All rights reserved.</footer>
    </div>
  );
}
