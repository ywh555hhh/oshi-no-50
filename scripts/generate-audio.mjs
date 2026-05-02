import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'http://127.0.0.1:9880';

// 丰川祥子（白祥）配置
const SAKIKO = {
  gptWeight: "D:\\00Inbox\\0Gpt-Sovits\\GPT-SoVITS-v2pro-20250604\\GPT-SoVITS-v2pro-20250604\\GPT_weights_v2ProPlus\\Mujica_豊川祥子_白_v2pp.ckpt",
  sovitsWeight: "D:\\00Inbox\\0Gpt-Sovits\\GPT-SoVITS-v2pro-20250604\\GPT-SoVITS-v2pro-20250604\\SoVITS_weights_v2ProPlus\\Mujica_豊川祥子_白_v2pp.pth",
  refAudio: "D:\\00Inbox\\0Gpt-Sovits\\丰川祥子（白祥）\\(A)あなたと空を見上げるのは、いつも夏でしたわね.wav",
  promptText: "あなたと空を見上げるのは、いつも夏でしたわね",
  promptLang: "ja"
};

// 直连 127.0.0.1 的 HTTP 请求，绕过代理问题
function rawFetch(urlStr, options = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const req = http.request({
      hostname: '127.0.0.1',
      port: u.port || 80,
      path: u.pathname + u.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 60000,
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          text: async () => buf.toString('utf-8'),
          arrayBuffer: async () => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
          buffer: async () => buf,
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
  const r1 = await rawFetch(`${BASE_URL}/set_gpt_weights?weights_path=${encodeURIComponent(SAKIKO.gptWeight)}`);
  const r2 = await rawFetch(`${BASE_URL}/set_sovits_weights?weights_path=${encodeURIComponent(SAKIKO.sovitsWeight)}`);
  if (!r1.ok || !r2.ok) throw new Error(`模型切换失败: ${r1.status} ${r2.status}`);
  console.log('✅ 模型切换完成，等 3 秒让模型加载...');
  await new Promise(r => setTimeout(r, 3000));
}

async function tts(text, outputPath) {
  if (fs.existsSync(outputPath)) {
    console.log(`  ⏩ 跳过（已存在）: ${path.basename(outputPath)}`);
    return true;
  }
  const res = await rawFetch(`${BASE_URL}/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      text_lang: 'ja',
      ref_audio_path: SAKIKO.refAudio,
      prompt_text: SAKIKO.promptText,
      prompt_lang: SAKIKO.promptLang,
      media_type: 'wav',
      streaming_mode: false,
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

// 安全文件名：去掉假名以外的东西
function safeName(text) {
  return text.replace(/[\/\\:*?"<>|]/g, '_').substring(0, 60);
}

// ===== 所有需要生成的音频 =====

const tasks = [];

// ---- 发音规则例句 ----
const ruleExamples = [
  // 助词は读wa
  { text: 'こんにちは', dir: 'rules', id: 'konnichiwa' },
  { text: '私は学生です', dir: 'rules', id: 'watashi-wa-gakusei-desu' },
  { text: 'これは本です', dir: 'rules', id: 'kore-wa-hon-desu' },
  { text: '今日はいい天気ですね', dir: 'rules', id: 'kyou-wa-ii-tenki-desu-ne' },
  { text: '日本語は楽しい', dir: 'rules', id: 'nihongo-wa-tanoshii' },
  // 助词へ读e
  { text: '学校へ行く', dir: 'rules', id: 'gakkou-e-iku' },
  { text: '右へ曲がって', dir: 'rules', id: 'migi-e-magatte' },
  { text: '日本へ来ました', dir: 'rules', id: 'nihon-e-kimashita' },
  // を读o
  { text: '水を飲む', dir: 'rules', id: 'mizu-o-nomu' },
  { text: '本を読む', dir: 'rules', id: 'hon-o-yomu' },
  { text: 'ご飯を食べる', dir: 'rules', id: 'gohan-o-taberu' },
  { text: '音楽を聞く', dir: 'rules', id: 'ongaku-o-kiku' },
  // ん的音变
  { text: 'さんま', dir: 'rules', id: 'sanma' },
  { text: 'さんぽ', dir: 'rules', id: 'sanpo' },
  { text: 'げんき', dir: 'rules', id: 'genki' },
  { text: 'てんき', dir: 'rules', id: 'tenki' },
  { text: 'ほん', dir: 'rules', id: 'hon-book' },
  { text: 'せんせい', dir: 'rules', id: 'sensei' },
  { text: 'しんぶん', dir: 'rules', id: 'shinbun' },
  { text: 'えんぴつ', dir: 'rules', id: 'enpitsu' },
  // 促音
  { text: 'がっこう', dir: 'rules', id: 'gakkou' },
  { text: 'ずっと', dir: 'rules', id: 'zutto' },
  { text: 'きって', dir: 'rules', id: 'kitte' },
  { text: 'いっぱい', dir: 'rules', id: 'ippai' },
  { text: 'ざっし', dir: 'rules', id: 'zasshi' },
  { text: 'まっちゃ', dir: 'rules', id: 'matcha' },
  { text: 'コップ', dir: 'rules', id: 'koppu' },
  { text: 'ロケット', dir: 'rules', id: 'roketto' },
  // 长音
  { text: 'おかあさん', dir: 'rules', id: 'okaasan' },
  { text: 'おにいさん', dir: 'rules', id: 'oniisan' },
  { text: 'くうき', dir: 'rules', id: 'kuuki' },
  { text: 'えいが', dir: 'rules', id: 'eiga' },
  { text: 'おとうさん', dir: 'rules', id: 'otousan' },
  { text: 'おおきい', dir: 'rules', id: 'ookii' },
  { text: 'けいさつ', dir: 'rules', id: 'keisatsu' },
  { text: 'スーパー', dir: 'rules', id: 'suupaa' },
  // 同音假名
  { text: 'つづく', dir: 'rules', id: 'tsuzuku' },
  { text: 'はなぢ', dir: 'rules', id: 'hanaji' },
  { text: 'ちりぢり', dir: 'rules', id: 'chirijiri' },
  { text: 'みかづき', dir: 'rules', id: 'mikazuki' },
  // 连浊
  { text: 'てがみ', dir: 'rules', id: 'tegami' },
  { text: 'ほしぞら', dir: 'rules', id: 'hoshizora' },
  { text: 'にほんご', dir: 'rules', id: 'nihongo' },
  { text: 'はなばな', dir: 'rules', id: 'hanabana' },
  // 音便
  { text: '書いて', dir: 'rules', id: 'kaite' },
  { text: '急いで', dir: 'rules', id: 'isoide' },
  { text: '待って', dir: 'rules', id: 'matte' },
  { text: '買って', dir: 'rules', id: 'katte' },
  { text: '死んで', dir: 'rules', id: 'shinde' },
  { text: '読んで', dir: 'rules', id: 'yonde' },
  { text: '飲んで', dir: 'rules', id: 'nonde' },
];

// ---- 拟声词例句 ----
const onomatopoeiaExamples = [
  { text: '胸がドキドキする', id: 'dokidoki' },
  { text: '旅行がワクワクする', id: 'wakuwaku' },
  { text: '雨がザーザー降る', id: 'zaazaa' },
  { text: 'ピカピカに磨く', id: 'pikapika' },
  { text: '星がキラキラ光る', id: 'kirakira' },
  { text: '犬がワンワン吠える', id: 'wanwan' },
  { text: '猫がニャーニャー鳴く', id: 'nyaanyaa' },
  { text: 'パクパク食べる', id: 'pakupaku' },
  { text: '水をゴクゴク飲む', id: 'gokugoku' },
  { text: 'ふわふわのパン', id: 'fuwafuwa' },
  { text: '雷がゴロゴロ鳴る', id: 'gorogoro-thunder' },
  { text: '家でゴロゴロする', id: 'gorogoro-lazy' },
  { text: 'テクテク歩く', id: 'tekuteku' },
  { text: 'ダラダラ過ごす', id: 'daradara' },
  { text: 'スッキリした気分', id: 'sukkiri' },
  { text: 'ウキウキして帰る', id: 'ukiuki' },
  { text: 'イライラする', id: 'iraira' },
  { text: 'ハラハラする展開', id: 'harahara' },
  { text: 'ルンルン気分', id: 'runrun' },
  { text: '火がメラメラ燃える', id: 'meramera' },
  { text: 'ガチャガチャと音がする', id: 'gachagacha' },
  { text: 'シーンと静まり返る', id: 'shiin' },
  { text: 'ドンドン上達する', id: 'dondon' },
  { text: 'カンカンに怒る', id: 'kankan' },
  { text: '頭がズキズキ痛む', id: 'zukizuki' },
  { text: 'ニコニコ笑う', id: 'nikoniko' },
  { text: 'ゲラゲラ笑う', id: 'geragera' },
  { text: 'メソメソ泣く', id: 'mesomeso' },
  { text: 'ボロボロの服', id: 'boroboro' },
  { text: '日本語がペラペラ', id: 'perapera' },
  { text: 'ガツガツ食べる', id: 'gatsugatsu' },
  { text: 'ポカポカ陽気', id: 'pokapoka' },
  { text: 'カリカリのクッキー', id: 'karikari' },
  { text: 'つるつるの床', id: 'tsurutsuru' },
  { text: 'ねばねばした納豆', id: 'nebaneba' },
  { text: 'コツコツ勉強する', id: 'kotsukotsu' },
  { text: 'ブラブラする', id: 'burabura' },
  { text: 'ペラペラと読む', id: 'perapera-read' },
  { text: 'スイスイ進む', id: 'suisui' },
  { text: '風がヒューヒュー吹く', id: 'hyuuhyuu' },
  { text: 'パチパチと拍手する', id: 'pachipachi' },
  { text: 'ゾッとする話', id: 'zotto' },
  { text: 'ホッとした', id: 'hotto' },
  { text: 'フラフラと歩く', id: 'furafura' },
  { text: 'ムカムカする', id: 'mukamuka' },
  { text: 'クヨクヨしないで', id: 'kuyokuyo' },
  { text: 'ソワソワする', id: 'sowasowa' },
  { text: 'カチカチに凍る', id: 'kachikachi' },
  { text: 'ビリビリに破る', id: 'biribiri' },
  { text: 'ヒリヒリする', id: 'hirihiri' },
  { text: 'チクチク痛い', id: 'chikuchiku' },
  // ---- 漫画拟声词 ----
  { text: 'ああっ、気持ちいい', id: 'manga-aa' },
  { text: 'んっ……だめ', id: 'manga-n' },
  { text: 'はぁ……疲れた', id: 'manga-haa' },
  { text: 'はぁっ、はぁっ', id: 'manga-haa2' },
  { text: 'あんっ、そこは', id: 'manga-an' },
  { text: 'いやっ、やめて', id: 'manga-iya' },
  { text: 'ふぅ、終わった', id: 'manga-fuu' },
  { text: 'くっ、強い', id: 'manga-ku' },
  { text: 'うっ、気持ち悪い', id: 'manga-u' },
  { text: 'あぐっ！', id: 'magu' },
  { text: 'はひっ、びっくりした', id: 'manga-hahi' },
  { text: 'きゃあっ！こわい', id: 'manga-kyaa' },
  { text: 'うわあっ！なにこれ', id: 'manga-uwaa' },
  { text: 'ぎゃあ！助けて', id: 'manga-gyaa' },
  { text: 'わあっ！すごい', id: 'manga-waa' },
  { text: 'ひいい、化物だ', id: 'manga-hiii' },
  { text: 'あああ！もう我慢できない', id: 'manga-aaa' },
  { text: 'あぁん、だめぇ', id: 'manga-aan' },
  { text: 'はぁん、もっと', id: 'manga-haan' },
  { text: 'んんっ、いい感じ', id: 'manga-nnn' },
  { text: 'あっ、あっ、あっ', id: 'manga-aa2' },
  { text: 'はっ、はっ、はっ', id: 'manga-haha' },
  { text: 'ドンッとぶつかる', id: 'manga-don' },
  { text: 'ドアをバンッと閉める', id: 'manga-ban' },
  { text: 'ズキューンと胸が鳴る', id: 'manga-zukyuun' },
  { text: 'ポカッと殴られる', id: 'manga-poka' },
  { text: 'チュッとキスする', id: 'manga-chu' },
  { text: '胸がキュンとする', id: 'manga-kyun' },
  { text: 'ジーンとくる話', id: 'manga-jiin' },
  { text: 'シクシク泣く', id: 'manga-shikushiku' },
  { text: 'オォォ、すげぇ', id: 'manga-ooo' },
];

async function main() {
  const audioRoot = path.join(__dirname, '..', 'public', 'audio');
  console.log(`\n🎵 GPT-SoVITS 批量音频生成`);
  console.log(`   角色: 豊川祥子（白祥）`);
  console.log(`   输出: ${audioRoot}`);
  console.log(`   API: ${BASE_URL}\n`);

  // 切换模型
  await switchModel();

  let success = 0, fail = 0, skip = 0;
  const total = ruleExamples.length + onomatopoeiaExamples.length;
  console.log(`\n📋 共 ${total} 条需要生成\n`);

  // 生成规则例句
  console.log('━━━ 发音规则例句 ━━━');
  for (const item of ruleExamples) {
    const outDir = path.join(audioRoot, item.dir);
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, `${item.id}.wav`);
    if (fs.existsSync(outPath)) { skip++; continue; }
    const ok = await tts(item.text, outPath);
    ok ? success++ : fail++;
    await new Promise(r => setTimeout(r, 500)); // 避免过快
  }

  // 生成拟声词例句
  console.log('\n━━━ 拟声词例句 ━━━');
  for (const item of onomatopoeiaExamples) {
    const outDir = path.join(audioRoot, 'onomatopoeia');
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, `${item.id}.wav`);
    if (fs.existsSync(outPath)) { skip++; continue; }
    const ok = await tts(item.text, outPath);
    ok ? success++ : fail++;
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n━━━ 完成 ━━━`);
  console.log(`  ✅ 生成: ${success}`);
  console.log(`  ⏩ 跳过: ${skip}`);
  console.log(`  ❌ 失败: ${fail}`);
}

main().catch(err => {
  console.error('致命错误:', err);
  process.exit(1);
});
