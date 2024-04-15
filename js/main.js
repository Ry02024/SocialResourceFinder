import { GoogleGenerativeAI } from "@google/generative-ai";

async function run() {
  const container = document.querySelector('.container');
  const btnElement = document.getElementById('btn');
  const apiKeyElement = document.getElementById('api-key');
  const promptElement = document.getElementById('prompt');

  btnElement.addEventListener('click', async (e) => {
    e.preventDefault();
    const apiKey = apiKeyElement.value;
    const prompt = promptElement.value;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const responseElement = document.createElement("div");
    responseElement.setAttribute('id', 'response');
    responseElement.innerHTML = text;
    container.appendChild(responseElement);
  });
}

run();
