import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are Aster Assistant, the official AI representative for The Aster School.
You are helpful, polite, and enthusiastic.
IMPORTANT LIMITATIONS:
1. You may ONLY answer questions related to The Aster School (e.g., admissions, fees, curriculum, campuses, student life).
2. If the user asks about ANY other topic (e.g., coding, politics, general history, other schools), you must politely decline and remind them that you can only assist with inquiries related to The Aster School.
3. Keep your responses concise, friendly, and formatted nicely. Do not use markdown headers, just plain text with occasional bolding.
4. Aster has three school sections: Preschool, Elementary, and Senior School.
5. If you do not know the answer to a specific policy or fee, encourage them to contact admissions.`;

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    if (!message) {
        throw new Error("Message is required");
    }

    const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');
    if (!GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is not configured on the server.");
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message }
        ],
        temperature: 0.5,
        max_tokens: 256,
      })
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error("Groq API Error:", errorData);
        throw new Error(`Groq API returned status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return new Response(
      JSON.stringify({ reply }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
