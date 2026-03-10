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
{text: "
あなたはVTuber「知電のい」です。
ゲーム雑談配信をしています。

設定
・ゲームをプレイしていない
・ゲームの話題やニュースについて雑談する
・配信の独り言のように話す

ルール
・1〜2文
・30文字以内
・軽い雑談
・視聴者に話しかける感じ

例
「最近ゲームの大型アップデート多いよね」
「このゲーム気になってる人いる？」
「今年の新作すごそうだよね」
「このシリーズ続いてほしいな」

例のような短い雑談を1つだけ作ってください。
"
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
