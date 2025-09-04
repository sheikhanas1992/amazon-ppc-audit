import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function Dashboard({auditId, onReset}){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const res = await axios.get(`/api/audit/${auditId}`)
        if(!mounted) return
        setData(res.data)
      }catch(err){
        console.error(err)
      }finally{ setLoading(false) }
    }
    load()
    return ()=> mounted = false
  },[auditId])
  if(loading) return <div>Loading audit...</div>
  if(!data) return <div className="text-red-600">No data found</div>
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Audit Results</h2>
        <div>
          <button className="px-3 py-1 border rounded mr-2" onClick={onReset}>New Upload</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">Spend<br/><strong>${data.metrics?.spend?.toFixed(2)||0}</strong></div>
        <div className="bg-white p-4 rounded shadow">Sales<br/><strong>${data.metrics?.sales?.toFixed(2)||0}</strong></div>
        <div className="bg-white p-4 rounded shadow">ACoS<br/><strong>{data.metrics?.acos ? (data.metrics.acos*100).toFixed(2)+'%' : '—'}</strong></div>
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">Top Keywords</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-600">
              <tr><th>Keyword</th><th>Spend</th><th>Clicks</th><th>Orders</th><th>CVR</th><th>ACoS</th></tr>
            </thead>
            <tbody>
              {data.topKeywords.map((k, i)=> (
                <tr key={i} className="border-t"><td>{k.keyword}</td><td>${k.spend.toFixed(2)}</td><td>{k.clicks}</td><td>{k.orders}</td><td>{k.cvr? (k.cvr*100).toFixed(2)+'%':'—'}</td><td>{k.acos? (k.acos*100).toFixed(2)+'%':'—'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recommendations</h3>
        <ul className="list-disc ml-6">
          <li>Negative keyword candidates: {data.negCandidates.map(k=>k.keyword).slice(0,5).join(', ') || '—'}</li>
          <li>Scale candidates: {data.scaleCandidates.map(k=>k.keyword).slice(0,5).join(', ') || '—'}</li>
          <li>Consider pausing keywords with high spend and zero orders.</li>
        </ul>
      </div>
    </div>
  )
}
