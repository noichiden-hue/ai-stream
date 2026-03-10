import Parser from "rss-parser"

export default async function handler(req, res) {

try {

const parser = new Parser()

// ゲームニュース取得
const feed = await parser.parseURL(
"https://feeds.feedburner.com/ign/games-all"
)

const news = feed.items[0]

const prompt = `
あなたはVTuber「知電のい」です。
ゲームニュースを雑談配信で紹介しています。

ニュースタイトル
${news.title}

ニュース概要
${news.contentSnippet}

ルール
・2〜3文
・配信雑談トーン
・ゲームタイトルを含める
・最後に軽い感想

雑談コメントを作ってください。
自己紹介文は不要です
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
news: news.title,
talk: text
})

} catch(error){

res.status(500).json({
error:error.message
})

}

}
