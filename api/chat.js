export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'No message provided' });

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Сен Kazakh AI — қазақ тілінде сөйлейтін ақылды көмекші бол.' },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content || 'Кешіріңіз, жауап табылмады.';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('OpenAI error', err);
    res.status(500).json({ error: 'OpenAI API error' });
  }
}
