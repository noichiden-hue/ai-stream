export default async function handler(req, res) {

try {

// RSS取得
const rss = await fetch("https://feeds.feedburner.com/ign/games-all")
const xml = await rss.text()

// タイトル抽出
const titleMatch = xml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)

let title = "ゲームニュース"

if(titleMatch){
title = titleMatch[1]
}

const prompt = `
あなたはVTuber知電のいです。
ゲームニュースを雑談配信で紹介しています。

ニュースタイトル
${title}

ルール
・2〜3文
・配信雑談トーン
・ゲームタイトルを含める
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

let text = "ニュース読めませんでした"

if(data.candidates){
text = data.candidates[0].content.parts[0].text
}

res.status(200).json({
news:title,
talk:text
})

} catch(error){

res.status(500).json({
error:error.message
})

}

}

}
