import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDocuments, embedFn} from './apiFunctions.js'; // apiFunctions.jsからgetDocumentsをインポート

// DOMが読み込まれたら実行される関数
//document.addEventListener('DOMContentLoaded', () => {
//  displayDocuments();
//});

async function displayDocuments(apiKey) {
  const documents = getDocuments();
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = ''; // 既存の内容をクリア

  for (let doc of documents) {
    try {
      const embedding = await embedFn(doc, 'models/embedding-001', apiKey); // モデル名とAPIキーを渡す
      const vectorDisplay = embedding.join(', '); // ベクトルデータを文字列に変換
      outputElement.innerHTML += `<p>${vectorDisplay}</p>`; // 文字列をHTMLに挿入
    } catch (error) {
      outputElement.innerHTML += `<p>Error: ${error.message}</p>`; // エラーを表示
    }
  }
}

// ページが読み込まれたら displayDocuments を呼び出す
document.addEventListener('DOMContentLoaded', async () => {
  const apiKeyElement = document.getElementById('api-key');
  if (apiKeyElement) {
    const apiKey = apiKeyElement.value; // APIキーを取得
    await displayDocuments(apiKey); // APIキーを使って文書データを表示
  }
});

// サブミットボタンのクリックイベントリスナー
document.getElementById('btn').addEventListener('click', async (e) => {
  e.preventDefault();
  const apiKey = document.getElementById('api-key').value; // フォームからAPIキーを取得
  await displayDocuments(apiKey); // displayDocuments 関数を呼び出す
});

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
