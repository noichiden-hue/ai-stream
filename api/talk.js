export default async function handler(req, res) {

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{
text:"あなたはVTuber知電のいです。ゲーム配信中に短く雑談してください。"
}
]
}
]
})
})

const data = await response.json()

let text = "今日はゲームの話でもしましょうか。"

res.status(200).json(data)

}
