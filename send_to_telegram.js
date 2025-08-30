export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const token = "8302933612:AAFvows2LPMl-PMLHtuq9fpv5gaAiXmPMlw";
  const chat_id = "1688309804";
  const { text } = req.body;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id,
        text,
      }),
    });
    const data = await tgRes.json();
    // Возвращаем ответ Telegram (например, сообщение, которое ушло)
    res.status(200).json({
      ok: data.ok,
      result: data.result,
      text: data.result ? data.result.text : "",
      error: data.description || "",
    });
  } catch (err) {
    res.status(500).json({ error: "Telegram API error", details: err.message });
  }
}
