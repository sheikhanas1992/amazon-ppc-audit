const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const upload = multer({ dest: 'uploads/' })

const AUDITS = {}

app.post('/api/upload', upload.single('file'), (req, res)=>{
  try{
    const file = req.file
    if(!file) return res.status(400).json({ error: 'file required' })
    const raw = fs.readFileSync(file.path, 'utf8')
    const parsed = Papa.parse(raw, { header: true, skipEmptyLines: true })
    const id = uuidv4()
    AUDITS[id] = { rows: parsed.data }
    const compute = require('./utils/compute')
    const result = compute.runAudit(parsed.data)
    AUDITS[id].result = result
    fs.writeFileSync(path.join('uploads', id + '.json'), JSON.stringify({ meta: { id, rows: parsed.data.length }, result }))
    res.json({ id, rows: parsed.data.length })
  }catch(err){
    console.error(err); res.status(500).json({ error: err.message })
  }
})

app.get('/api/audit/:id', (req,res)=>{
  const id = req.params.id
  if(AUDITS[id] && AUDITS[id].result) return res.json(AUDITS[id].result)
  const file = path.join('uploads', id + '.json')
  if(fs.existsSync(file)){
    const data = JSON.parse(fs.readFileSync(file,'utf8'))
    return res.json(data.result || data)
  }
  res.status(404).json({ error: 'not found' })
})

const port = process.env.PORT || 8080
app.listen(port, ()=> console.log('Backend running on', port))
