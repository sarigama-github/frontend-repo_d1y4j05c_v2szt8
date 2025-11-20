import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Home, CreditCard, Link as LinkIcon, Wallet, KeyRound, User, ChevronDown } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/transactions', label: 'Transactions', icon: CreditCard },
  { to: '/payment-links', label: 'Liens de paiement', icon: LinkIcon },
  { to: '/payouts', label: 'Pay-Outs', icon: Wallet },
  { to: '/api-keys', label: 'API Keys', icon: KeyRound },
  { to: '/account', label: 'Mon compte', icon: User },
]

function ModeToggle({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-emerald-100 rounded-full px-2 py-1 shadow-sm">
      <button
        onClick={() => onChange('test')}
        className={`px-3 py-1 text-sm rounded-full transition ${value === 'test' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:text-gray-700'}`}
      >Test</button>
      <button
        onClick={() => onChange('live')}
        className={`px-3 py-1 text-sm rounded-full transition ${value === 'live' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
      >Live</button>
    </div>
  )
}

export default function Layout() {
  const [mode, setMode] = useState('test')
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800">
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-emerald-100 shadow-sm">
        <div className="px-6 py-5 border-b border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-soft">AZ</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-neutral">AZ54</span>
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-xs text-gray-500 -mt-0.5">Healthcare Payments</p>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition border ${isActive ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'border-transparent hover:bg-emerald-50/60 text-gray-700'} `}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="ml-64">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ModeToggle value={mode} onChange={setMode} />
            </div>
            <div className="relative">
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-100 hover:border-emerald-200 bg-white shadow-sm">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">A</div>
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-emerald-100 rounded-lg shadow-lg p-1">
                  <button className="w-full text-left text-sm px-3 py-2 rounded-md hover:bg-emerald-50">Mon compte</button>
                  <button className="w-full text-left text-sm px-3 py-2 rounded-md hover:bg-emerald-50 text-red-600">Déconnexion</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Hero Spline cover behind sidebar/header on landing route only via CSS layering from child */}
      <div className="fixed top-0 left-64 right-0 h-52 pointer-events-none">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}
