import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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'
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a helpful assistant." }]
  });

  console.log(completion.data.choices[0].message);
}

main();
