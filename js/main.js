import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDocuments, embedFn} from './apiFunctions.js'; // apiFunctions.jsからgetDocumentsをインポート

// DOMが読み込まれたら実行される関数
document.addEventListener('DOMContentLoaded', () => {
  displayDocuments();
});

// 文書データを画面に表示する関数
async function displayDocuments() {
  const documents = getDocuments();
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = ''; // 既存の内容をクリア

  for (let doc of documents) {
    const embedding = await embedFn(doc, 'your-model-name', 'your-api-key'); // ベクトルデータを取得
    const vectorDisplay = embedding.join(', '); // ベクトルデータを文字列に変換
    outputElement.innerHTML += `<p>${vectorDisplay}</p>`; // 文字列をHTMLに挿入
  }
}

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
