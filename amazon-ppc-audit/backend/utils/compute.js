function parseNumber(v){
  if(v===undefined || v===null || v==='') return 0
  const cleaned = String(v).replace(/[$,%]/g,'').replace(/,/g,'')
  const n = Number(cleaned)
  return Number.isNaN(n) ? 0 : n
}

function runAudit(data){
  let spend=0, impressions=0, clicks=0, orders=0, sales=0
  const keywordMap = {}
  data.forEach(row => {
    const s = parseNumber(row['Spend']||row['Cost']||row['Spend (USD)'])
    const imp = parseNumber(row['Impressions']||row['Impr'])
    const clk = parseNumber(row['Clicks']||row['Click'])
    const ord = parseNumber(row['Orders']||row['Units Ordered']||row['Ordered Product Sales'])
    const sale = parseNumber(row['Sales']||row['Product Sales']||row['7 Day Total Sales'])
    spend += s; impressions += imp; clicks += clk; orders += ord; sales += sale
    const kw = (row['Search Term']||row['keyword']||row['Keyword']||row['Targeting']||'').toString().toLowerCase()
    if(!keywordMap[kw]) keywordMap[kw] = { spend:0, impressions:0, clicks:0, orders:0, sales:0, example:row }
    keywordMap[kw].spend += s; keywordMap[kw].impressions += imp; keywordMap[kw].clicks += clk; keywordMap[kw].orders += ord; keywordMap[kw].sales += sale
  })

  const CPC = clicks? spend/clicks : 0
  const CTR = impressions? clicks/impressions : 0
  const CVR = clicks? orders/clicks : 0
  const ACOS = sales? spend/sales : 0
  const ROAS = spend? sales/spend : 0

  const kList = Object.entries(keywordMap).map(([k,v])=> ({ keyword:k, ...v, ctr: v.impressions? v.clicks/v.impressions:0, cpc: v.clicks? v.spend/v.clicks:0, cvr: v.clicks? v.orders/v.clicks:0, acos: v.sales? v.spend/v.sales:0 }))
  kList.sort((a,b)=> b.spend - a.spend)

  const negCandidates = kList.filter(k=> k.spend > 20 && k.cvr < 0.02 && k.clicks > 20).slice(0,20)
  const scaleCandidates = kList.filter(k=> k.cvr > 0.08 && k.spend < 100).slice(0,20)

  return { metrics: { spend, impressions, clicks, orders, sales, CPC, CTR, CVR, ACOS, ROAS }, topKeywords: kList.slice(0,100), negCandidates, scaleCandidates }
}

module.exports = { runAudit }
