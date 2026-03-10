export default async function handler(req, res) {

try {

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
contents: [
{
parts: [
{
text: `
あなたはVTuber「知電のい」です。
ゲームの話題を紹介する雑談配信をしています。

【内容】
・ゲームニュースを軽く紹介する
・実在するゲームタイトルを必ず1つ出す
・そのゲームについて一言コメントする

【話題】
・新作ゲーム
・アップデート
・リメイク
・ゲーム会社の発表
・ゲームイベント

【話し方】
・配信の雑談トーン
・視聴者に話しかける感じ
・ニュース読み上げではなく軽い感想

【ルール】
・1〜2文
・20〜50文字
・必ずゲームタイトルを含める
・説明ではなく雑談コメント

【出力例】
ゼルダの新作また噂出てるらしいね、気になる  
モンハンの次回作そろそろ情報来そうじゃない？  
FFのリメイクまだ続きそうだよね  
スプラのアップデート地味に嬉しい

有名ゲームタイトル（任天堂 / PS / Steam / インディー）からランダムに選ぶ。
`
}
]
}
]
})
}
)

const data = await response.json()

let text = "読めていないようです。"

if (data.candidates && data.candidates.length > 0) {
text = data.candidates[0].content.parts[0].text
}

res.status(200).json({ text })

} catch (error) {

res.status(500).json({
error: "Gemini API error",
detail: error.message
})

}

}
