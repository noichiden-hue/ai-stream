module.exports = async function handler(req, res) {

try {

const rss = await fetch("https://feeds.feedburner.com/ign/games-all")
const xml = await rss.text()

const itemMatch = xml.match(/<item>[\s\S]*?<title>(.*?)<\/title>/)

let title = "ゲームニュース"

if(itemMatch){
title = itemMatch[1]
}

const prompt = `
あなたはVTuber知電のいです。
ゲームニュースを雑談配信で紹介しています。

ニュース
${title}

ルール
・2〜3文
・配信雑談トーン
・軽い感想

雑談コメントを作ってください。
`

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{text:prompt}
]
}
],
generationConfig:{
temperature:1.1
}
})
}
)

const data = await response.json()

let text = "読めていないようです"

// 安全に取り出す
if(
data &&
data.candidates &&
data.candidates[0] &&
data.candidates[0].content &&
data.candidates[0].content.parts &&
data.candidates[0].content.parts[0] &&
data.candidates[0].content.parts[0].text
){
text = data.candidates[0].content.parts[0].text
}

res.status(200).json({
news:title,
talk:text,
debug:data
})

} catch(error){

res.status(500).json({
error:error.message
})

}

}
