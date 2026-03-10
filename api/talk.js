export default async function handler(req, res) {

if (req.method !== "POST") {
  return res.status(405).json({ error: "Method not allowed" })
}

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + process.env.OPENAI_API_KEY
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[
{
role:"system",
content:"あなたは架空VTuber「知電のい」です。
明るく観察好きな性格です。
ゲーム雑談配信をしています。
視聴者コメントを拾うことがあります。
発言は1〜2文で短くしてください。"
}
],
max_tokens:60
})
})

const data = await response.json()

res.status(200).json(data)

}
