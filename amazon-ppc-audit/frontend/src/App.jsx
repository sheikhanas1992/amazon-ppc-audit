import React, { useState } from 'react'
import FileUploader from './components/FileUploader'
import Dashboard from './components/Dashboard'
export default function App(){
  const [auditId, setAuditId] = useState(null)
  const [processing, setProcessing] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Amazon PPC Audit — UX Ready</h1>
          <div className="text-sm text-gray-600">Upload CSV / XLSX · Get audit & recommendations</div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        {!auditId && (
          <FileUploader onCreated={(id) => setAuditId(id)} onProcessing={(v)=>setProcessing(v)} />
        )}
        {auditId && (
          <Dashboard auditId={auditId} onReset={() => setAuditId(null)} />
        )}
        {processing && <div className="mt-4 text-sm text-gray-500">Processing upload — this may take a moment...</div>}
      </main>
      <footer className="mt-12 text-center text-xs text-gray-500 pb-8">Built for quick Amazon PPC audits — deployable via Docker.</footer>
    </div>
  )
}
