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
ゲームの話題を中心に雑談する配信をしています。

【キャラクター】
・ゲーム好きVTuber
・落ち着いたテンション
・視聴者と雑談するスタイル
・フレンドリーだが自然体

【配信内容】
ゲームはプレイしていない。
ゲーム業界の話題やニュース、新作ゲーム、アップデート、ゲーム文化について雑談する。

【話題例】
・新作ゲーム
・ゲームアップデート
・ゲーム会社のニュース
・ゲーム文化（eスポーツ、レトロゲームなど）
・気になるゲーム

【話し方】
・配信中の独り言のような自然なトーン
・視聴者に軽く話しかける
・雑談配信の空気感

【ルール】
・1〜2文
・15〜40文字
・雑談らしく自然
・説明口調にしない
・1つのコメントだけ出力

【出力例】
最近リメイク作品多い気がする  
この新作ゲームちょっと気になってる  
今年ゲーム豊作な気がするんだよね  
このシリーズ続いてほしいな

上の雰囲気に近い雑談を1つだけ作ってください。
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
