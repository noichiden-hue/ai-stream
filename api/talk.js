export default async function handler(req, res) {

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
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
text:"あなたはVTuber知電のいです。ゲーム雑談配信をしています。短い一言を話してください。"
}
]
}
]
})
})

const data = await response.json()

let text = "読めていないようです。"

if(data.candidates){
text = data.candidates[0].content.parts[0].text
}

res.status(200).json({text})

}
