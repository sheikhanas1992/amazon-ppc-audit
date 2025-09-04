import React, {useState} from 'react'
import axios from 'axios'
export default function FileUploader({onCreated, onProcessing}){
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState([])
  function validateFile(f){
    const ok = f && (f.name.endsWith('.csv') || f.name.endsWith('.txt') || f.name.endsWith('.xlsx'))
    return ok
  }
  async function uploadFile(){
    if(!file) return setErrors(['No file selected'])
    onProcessing(true)
    const form = new FormData()
    form.append('file', file)
    try{
      const res = await axios.post('/api/upload', form, { headers: {'Content-Type': 'multipart/form-data'} })
      onCreated(res.data.id)
    }catch(err){
      setErrors([err?.response?.data?.error || err.message])
    }finally{ onProcessing(false) }
  }
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Upload ad report</h2>
      <p className="text-sm text-gray-600 mb-4">CSV or XLSX from Amazon (Campaign, Search Terms, Keyword reports). We auto-detect columns; you can remap before upload.</p>
      <input type="file" onChange={(e)=>{ const f = e.target.files[0]; setErrors([]); if(!validateFile(f)){ setErrors(['Invalid file type']); return } setFile(f) }} />
      {errors.length>0 && <div className="mt-2 text-red-600">{errors.join(', ')}</div>}
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={uploadFile}>Upload & Analyze</button>
      </div>
    </div>
  )
}
