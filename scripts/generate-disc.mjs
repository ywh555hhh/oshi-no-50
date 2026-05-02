// 辨音词音频生成 — 只生成 discrimination 数据中的词
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'http://127.0.0.1:9880';

const SAKIKO = {
  gptWeight: "D:\\00Inbox\\0Gpt-Sovits\\GPT-SoVITS-v2pro-20250604\\GPT-SoVITS-v2pro-20250604\\GPT_weights_v2ProPlus\\Mujica_豊川祥子_白_v2pp.ckpt",
  sovitsWeight: "D:\\00Inbox\\0Gpt-Sovits\\GPT-SoVITS-v2pro-20250604\\GPT-SoVITS-v2pro-20250604\\SoVITS_weights_v2ProPlus\\Mujica_豊川祥子_白_v2pp.pth",
  refAudio: "D:\\00Inbox\\0Gpt-Sovits\\丰川祥子（白祥）\\(A)あなたと空を見上げるのは、いつも夏でしたわね.wav",
  promptText: "あなたと空を見上げるのは、いつも夏でしたわね",
  promptLang: "ja"
};

function rawFetch(urlStr, options = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const req = http.request({
      hostname: '127.0.0.1', port: u.port || 80,
      path: u.pathname + u.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 60000,
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode,
          text: async () => buf.toString('utf-8'),
          arrayBuffer: async () => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
        });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function switchModel() {
  console.log('⏳ 切换模型到丰川祥子（白祥）...');
  await rawFetch(`${BASE_URL}/set_gpt_weights?weights_path=${encodeURIComponent(SAKIKO.gptWeight)}`);
  await rawFetch(`${BASE_URL}/set_sovits_weights?weights_path=${encodeURIComponent(SAKIKO.sovitsWeight)}`);
  console.log('✅ 模型切换完成，等 3 秒...');
  await new Promise(r => setTimeout(r, 3000));
}

async function tts(text, outputPath) {
  if (fs.existsSync(outputPath)) {
    console.log(`  ⏩ 跳过: ${path.basename(outputPath)}`);
    return true;
  }
  const res = await rawFetch(`${BASE_URL}/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text, text_lang: 'ja',
      ref_audio_path: SAKIKO.refAudio,
      prompt_text: SAKIKO.promptText,
      prompt_lang: SAKIKO.promptLang,
      media_type: 'wav', streaming_mode: false,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`  ❌ 失败: ${text} → ${res.status} ${err.substring(0, 100)}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outputPath, buf);
  console.log(`  ✅ ${path.basename(outputPath)} (${(buf.length / 1024).toFixed(1)}KB)`);
  return true;
}

// 所有辨音词：[TTS文本(汉字), 输出文件名]
const words = [
  // 清浊辨析
  ['天気', 'tenki'],
  ['電気', 'denki'],
  ['機械', 'kikai-machine'],
  ['議会', 'gikai'],
  ['韓国', 'kankoku'],
  ['監獄', 'kangoku'],
  ['陶器', 'touki-pottery'],
  ['動機', 'douki'],
  ['本', 'hon-book'],
  ['盆', 'bon'],
  // 长短音辨析
  ['おばさん', 'obasan'],
  ['おばあさん', 'obaasan'],
  ['おじさん', 'ojisan'],
  ['おじいさん', 'ojiisan'],
  ['空気', 'kuuki'],
  ['茎', 'kuki'],
  ['習慣', 'shuukan'],
  ['主観', 'shukan'],
  // 拗音辨析
  ['病院', 'byouin'],
  ['美容院', 'biyouin'],
  ['今日', 'kyou'],
  ['器用', 'kiyou'],
  ['中止', 'chuushi'],
  ['調子', 'choushi'],
  // 促音辨析
  ['音', 'oto'],
  ['夫', 'otto'],
  ['先', 'saki'],
  ['さっき', 'sakki'],
  ['着て', 'kite-wear'],
  ['切手', 'kitte-stamp'],
  ['過去', 'kako'],
  ['格好', 'kakkou'],
  // 声调辨析
  ['橋', 'hashi-bridge'],
  ['箸', 'hashi-chopsticks'],
  ['雨', 'ame-rain'],
  ['飴', 'ame-candy'],
  ['紙', 'kami-paper'],
  ['髪', 'kami-hair'],
  ['花', 'hana-flower'],
  ['鼻', 'hana-nose'],
  // 同音异义
  ['機械', 'kikai-machine2'],  // 同音再生成一次其实一样，但保持独立文件
  ['機会', 'kikai-chance'],
  ['成功', 'seikou-success'],
  ['精巧', 'seikou-precision'],
  ['意志', 'ishi-will'],
  ['石', 'ishi-stone'],
  ['高層', 'kousou-tall'],
  ['構想', 'kousou-idea'],
];

async function main() {
  const outDir = path.join(__dirname, '..', 'public', 'audio', 'disc');
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n🎵 辨音词音频生成`);
  console.log(`   角色: 豊川祥子（白祥）`);
  console.log(`   总计: ${words.length} 个词\n`);

  await switchModel();

  let success = 0, fail = 0, skip = 0;
  for (const [text, id] of words) {
    const outPath = path.join(outDir, `${id}.wav`);
    if (fs.existsSync(outPath)) { skip++; continue; }
    const ok = await tts(text, outPath);
    ok ? success++ : fail++;
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n━━━ 完成 ━━━`);
  console.log(`  ✅ 生成: ${success}`);
  console.log(`  ⏩ 跳过: ${skip}`);
  console.log(`  ❌ 失败: ${fail}`);
}

main().catch(err => { console.error('致命错误:', err); process.exit(1); });
