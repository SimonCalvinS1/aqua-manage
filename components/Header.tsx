'use client';
import Link from 'next/link';

type LinkItem = { href: string; label: string };

export default function Header({
    title = 'AquaManage',
    links = [
        { href: '/', label: 'Dashboard' },
        { href: '/tanks', label: 'Tanks' },
        { href: '/schedules', label: 'Schedules' },
        { href: '/reports', label: 'Reports' },
    ],
}: {
    title?: string;
    links?: LinkItem[];
}) {
    const placeholderStyle = "text-left px-3 py-2 rounded-md text-white bg-lime-600 hover:bg-lime-100 dark:hover:bg-lime-800";
    // Initialize theme from localStorage on client (no React hooks)
    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem('theme');
            if (stored) document.documentElement.setAttribute('data-theme', stored);
        } catch {}
    }

    function toggleTheme() {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch {}
    }

    function signOutPlaceholder() {
        // placeholder for sign out action (no hooks)
        alert('Sign out (implement logic)');
    }

    return (
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-lime-700 backdrop-blur border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* Mobile toggle — using <details> so no React state required */}
                    <details className="md:hidden">
                        <summary className="list-none p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 24 24" className="text-slate-700 dark:text-slate-200">
                                <path fill="currentColor" d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" />
                            </svg>
                        </summary>

                        <nav className="mt-2 bg-white dark:bg-slate-900 rounded-md p-3 shadow md:hidden">
                            <ul className="flex flex-col gap-2">
                                {links.map((l) => (
                                    <li key={l.href}>
                                        <Link href={l.href} className="block px-3 py-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </details>

                    <Link href="/" className="inline-flex items-center gap-3 no-underline">
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{title}</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-2">
                            {links.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <form className="flex items-center gap-2 bg-transparent rounded-lg border border-slate-200 dark:border-slate-800 px-2">
                        <label htmlFor="site-search" className="sr-only">Search</label>
                        <input id="site-search" type="search" placeholder="Search tanks, sensors..." className="bg-transparent outline-none px-2 py-1 text-sm text-slate-800 dark:text-slate-100 w-48 md:w-64" />
                        <button type="submit" aria-label="Search" className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" strokeWidth="1.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" />
                            </svg>
                        </button>
                    </form>

                    <button onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme" className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <svg width="18" height="18" viewBox="0 0 24 24" className="hidden dark:block">
                            <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 24 24" className="block dark:hidden">
                            <path fill="currentColor" d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 6a6 6 0 100 12 6 6 0 000-12z" />
                        </svg>
                    </button>

                    {/* user menu using <details> to avoid refs/state */}
                    <details className="relative">
                        <div className="absolute right-0 mt-2 min-w-[160px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg rounded-lg p-2 flex flex-col gap-1">
                            <Link href="/profile" className={placeholderStyle}>Profile</Link>
                            <Link href="/settings" className={placeholderStyle}>Settings</Link>
                            <Link href="/help" className={placeholderStyle}>Help</Link>
                            <button onClick={signOutPlaceholder} className={placeholderStyle}>Sign out</button>
                        </div>
                    </details>
                </div>
            </div>
        </header>
    );
}