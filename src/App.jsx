import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<div className='p-6'>Transactions</div>} />
        <Route path="payment-links" element={<div className='p-6'>Liens de paiement</div>} />
        <Route path="payouts" element={<div className='p-6'>Pay-Outs</div>} />
        <Route path="api-keys" element={<div className='p-6'>API Keys</div>} />
        <Route path="account" element={<div className='p-6'>Mon compte</div>} />
      </Route>
    </Routes>
  )
}

export default App
