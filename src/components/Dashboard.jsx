import { useEffect, useState } from 'react'
import { ArrowUpRight, Activity, Wallet, Percent } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function MetricCard({ title, value, subtitle, color = 'emerald' }) {
  const colorMap = {
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600'
  }
  return (
    <div className="bg-white border border-emerald-100 rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <div className={`text-2xl font-semibold mt-1 ${colorMap[color]}`}>{value}</div>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    failed: 'bg-red-50 text-red-700 border-red-200'
  }
  return <span className={`px-2 py-1 text-xs rounded-full border ${map[status]}`}>{status}</span>
}

function TypeBadge({ type }) {
  const map = {
    payin: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    payout: 'bg-amber-50 text-amber-700 border-amber-200'
  }
  return <span className={`px-2 py-1 text-xs rounded-full border ${map[type]}`}>{type === 'payin' ? 'Pay-In' : 'Pay-Out'}</span>
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [weekly, setWeekly] = useState([])

  useEffect(() => {
    fetchMetrics()
    fetchTransactions()
    fetchWeekly()
  }, [])

  const fetchMetrics = async () => {
    const r = await fetch(`${baseUrl}/api/metrics`)
    const data = await r.json()
    setMetrics(data)
  }
  const fetchTransactions = async () => {
    const r = await fetch(`${baseUrl}/api/transactions?limit=5`)
    const data = await r.json()
    setTransactions(data)
  }
  const fetchWeekly = async () => {
    const r = await fetch(`${baseUrl}/api/transactions/weekly`)
    const data = await r.json()
    setWeekly(data)
  }

  return (
    <div className="space-y-6">
      {/* Cover section */}
      <div className="relative h-52 rounded-xl overflow-hidden border border-emerald-100 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-emerald-800/30 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <h2 className="text-white text-2xl font-semibold drop-shadow">Vue d'ensemble</h2>
            <p className="text-emerald-50/80 text-sm">Suivi en temps réel de l'activité de la plateforme</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Solde disponible" value={metrics ? `${metrics.available_balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}` : '...'} color="emerald" />
        <MetricCard title="Transactions aujourd'hui" value={metrics ? `${metrics.today.count} • ${metrics.today.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}` : '...'} color="blue" />
        <MetricCard title="Pay-outs en attente" value={metrics ? `${metrics.payouts_pending.count} • ${metrics.payouts_pending.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}` : '...'} color="amber" />
        <div className="bg-white border border-emerald-100 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Taux de réussite</p>
          <div className="flex items-center gap-3 mt-1">
            <div className="text-2xl font-semibold text-emerald-600">{metrics ? `${Math.round(metrics.success_rate * 100)}%` : '...'}</div>
          </div>
          <div className="w-full h-2 bg-emerald-50 rounded-full mt-3">
            <div className="h-2 bg-emerald-500 rounded-full" style={{ width: metrics ? `${Math.round(metrics.success_rate * 100)}%` : '0%' }}></div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-emerald-100 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral">Évolution des transactions (7 jours)</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weekly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#10b98122" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#10B981" fillOpacity={1} fill="url(#colorAmt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-emerald-100 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral">Dernières transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Date/heure</th>
                <th>Type</th>
                <th>Montant</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-t border-emerald-50">
                  <td className="py-2 text-gray-700">{t.occurred_at ? new Date(t.occurred_at).toLocaleString('fr-FR') : '-'}</td>
                  <td><TypeBadge type={t.type} /></td>
                  <td className="font-medium">{t.amount.toLocaleString('fr-FR', { style: 'currency', currency: t.currency || 'EUR' })}</td>
                  <td><StatusBadge status={t.status} /></td>
                  <td>
                    <button className="text-emerald-700 hover:text-emerald-800 text-xs font-medium inline-flex items-center gap-1">
                      Voir détails <ArrowUpRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
