// 拟声词・拟态词 (オノマトペ) — 带本地 TTS 音频
// audio 字段指向 /public/audio/ 下的 wav 文件

export const onomatopoeia = [
  // ===== 心理・感情 =====
  { word: 'ドキドキ', reading: 'dokidoki', meaning: '心跳加速', category: '心理', example: '胸がドキドキする', exReading: 'mune ga dokidoki suru', exMeaning: '心跳得很快', audio: '/audio/onomatopoeia/dokidoki.wav' },
  { word: 'ワクワク', reading: 'wakuwaku', meaning: '兴奋期待', category: '心理', example: '旅行がワクワクする', exReading: 'ryokō ga wakuwaku suru', exMeaning: '对旅行感到兴奋', audio: '/audio/onomatopoeia/wakuwaku.wav' },
  { word: 'ゾッと', reading: 'zotto', meaning: '毛骨悚然', category: '心理', example: 'ゾッとする話', exReading: 'zotto suru hanashi', exMeaning: '令人毛骨悚然的故事', audio: '/audio/onomatopoeia/zotto.wav' },
  { word: 'スッキリ', reading: 'sukkiri', meaning: '舒畅清爽', category: '心理', example: 'スッキリした気分', exReading: 'sukkiri shita kibun', exMeaning: '舒畅的心情', audio: '/audio/onomatopoeia/sukkiri.wav' },
  { word: 'ウキウキ', reading: 'ukiuki', meaning: '欢天喜地', category: '心理', example: 'ウキウキして帰る', exReading: 'ukiuki shite kaeru', exMeaning: '欢天喜地地回家', audio: '/audio/onomatopoeia/ukiuki.wav' },
  { word: 'イライラ', reading: 'iraira', meaning: '焦躁不安', category: '心理', example: 'イライラする', exReading: 'iraira suru', exMeaning: '焦躁不安', audio: '/audio/onomatopoeia/iraira.wav' },
  { word: 'ハラハラ', reading: 'harahara', meaning: '提心吊胆', category: '心理', example: 'ハラハラする展開', exReading: 'harahara suru tenkai', exMeaning: '令人提心吊胆的剧情', audio: '/audio/onomatopoeia/harahara.wav' },
  { word: 'ルンルン', reading: 'runrun', meaning: '心情愉快', category: '心理', example: 'ルンルン気分', exReading: 'runrun kibun', exMeaning: '愉快的心情', audio: '/audio/onomatopoeia/runrun.wav' },
  { word: 'ホッと', reading: 'hotto', meaning: '松了口气', category: '心理', example: 'ホッとした', exReading: 'hotto shita', exMeaning: '松了口气', audio: '/audio/onomatopoeia/hotto.wav' },
  { word: 'ムカムカ', reading: 'mukamuka', meaning: '怒火中烧', category: '心理', example: 'ムカムカする', exReading: 'mukamuka suru', exMeaning: '气死了', audio: '/audio/onomatopoeia/mukamuka.wav' },
  { word: 'クヨクヨ', reading: 'kuyokuyo', meaning: '闷闷不乐', category: '心理', example: 'クヨクヨしないで', exReading: 'kuyokuyo shinaide', exMeaning: '别闷闷不乐的', audio: '/audio/onomatopoeia/kuyokuyo.wav' },
  { word: 'ソワソワ', reading: 'sowasowa', meaning: '坐立不安', category: '心理', example: 'ソワソワする', exReading: 'sowasowa suru', exMeaning: '坐立不安', audio: '/audio/onomatopoeia/sowasowa.wav' },

  // ===== 自然・天気 =====
  { word: 'ザーザー', reading: 'zāzā', meaning: '大雨倾盆', category: '自然', example: '雨がザーザー降る', exReading: 'ame ga zāzā furu', exMeaning: '大雨哗哗地下', audio: '/audio/onomatopoeia/zaazaa.wav' },
  { word: 'ゴロゴロ', reading: 'gorogoro', meaning: '雷声隆隆', category: '自然', example: '雷がゴロゴロ鳴る', exReading: 'kaminari ga gorogoro naru', exMeaning: '雷声隆隆地响', audio: '/audio/onomatopoeia/gorogoro-thunder.wav' },
  { word: 'ヒューヒュー', reading: 'hyūhyū', meaning: '寒风呼啸', category: '自然', example: '風がヒューヒュー吹く', exReading: 'kaze ga hyūhyū fuku', exMeaning: '风呼呼地吹', audio: '/audio/onomatopoeia/hyuuhyuu.wav' },
  { word: 'パラパラ', reading: 'parapara', meaning: '零星雨点', category: '自然', example: 'パラパラと雨が降る', exReading: 'parapara to ame ga furu', exMeaning: '零星地下雨', audio: '/audio/onomatopoeia/parapara.wav' },
  { word: 'サラサラ', reading: 'sarasara', meaning: '潺潺流水', category: '自然', example: 'サラサラした川の水', exReading: 'sarasara shita kawa no mizu', exMeaning: '潺潺流动的河水', audio: '/audio/onomatopoeia/sarasara.wav' },
  { word: 'ポツポツ', reading: 'potupotsu', meaning: '淅淅沥沥', category: '自然', example: '雨がポツポツ降ってきた', exReading: 'ame ga potupotsu futtekita', exMeaning: '开始淅淅沥沥地下雨了', audio: '/audio/onomatopoeia/potupotsu.wav' },
  { word: 'コツコツ', reading: 'kotsukotsu', meaning: '滴水/敲击', category: '自然', example: 'コツコツ勉強する', exReading: 'kotsukotsu benkyō suru', exMeaning: '孜孜不倦地学习', audio: '/audio/onomatopoeia/kotsukotsu.wav' },

  // ===== 動物 =====
  { word: 'ワンワン', reading: 'wanwan', meaning: '汪汪（狗）', category: '動物', example: '犬がワンワン吠える', exReading: 'inu ga wanwan hoeru', exMeaning: '狗汪汪叫', audio: '/audio/onomatopoeia/wanwan.wav' },
  { word: 'ニャーニャー', reading: 'nyānyā', meaning: '喵喵（猫）', category: '動物', example: '猫がニャーニャー鳴く', exReading: 'neko ga nyānyā naku', exMeaning: '猫喵喵叫', audio: '/audio/onomatopoeia/nyaanyaa.wav' },
  { word: 'ブーブー', reading: 'būbū', meaning: '哼哼（猪）', category: '動物', example: '豚がブーブー鳴く', exReading: 'buta ga būbū naku', exMeaning: '猪哼哼叫', audio: '/audio/onomatopoeia/buubuu.wav' },
  { word: 'モーモー', reading: 'mōmō', meaning: '哞哞（牛）', category: '動物', example: '牛がモーモー鳴く', exReading: 'ushi ga mōmō naku', exMeaning: '牛哞哞叫', audio: '/audio/onomatopoeia/moomoo.wav' },

  // ===== 食べる =====
  { word: 'パクパク', reading: 'pakupaku', meaning: '大口大口吃', category: '食べる', example: 'パクパク食べる', exReading: 'pakupaku taberu', exMeaning: '大口大口地吃', audio: '/audio/onomatopoeia/pakupaku.wav' },
  { word: 'ゴクゴク', reading: 'gokugoku', meaning: '咕嘟咕嘟喝', category: '食べる', example: '水をゴクゴク飲む', exReading: 'mizu o gokugoku nomu', exMeaning: '咕嘟咕嘟地喝水', audio: '/audio/onomatopoeia/gokugoku.wav' },
  { word: 'ガツガツ', reading: 'gatsugatsu', meaning: '狼吞虎咽', category: '食べる', example: 'ガツガツ食べる', exReading: 'gatsugatsu taberu', exMeaning: '狼吞虎咽地吃', audio: '/audio/onomatopoeia/gatsugatsu.wav' },
  { word: 'カリカリ', reading: 'karikari', meaning: '咔嚓咔嚓（脆）', category: '食べる', example: 'カリカリのクッキー', exReading: 'karikari no kukkī', exMeaning: '脆脆的饼干', audio: '/audio/onomatopoeia/karikari.wav' },

  // ===== 視覚 =====
  { word: 'ピカピカ', reading: 'pikapika', meaning: '闪闪发光', category: '視覚', example: 'ピカピカに磨く', exReading: 'pikapika ni migaku', exMeaning: '擦得闪闪发亮', audio: '/audio/onomatopoeia/pikapika.wav' },
  { word: 'キラキラ', reading: 'kirakira', meaning: '闪耀璀璨', category: '視覚', example: '星がキラキラ光る', exReading: 'hoshi ga kirakira hikaru', exMeaning: '星星闪闪发光', audio: '/audio/onomatopoeia/kirakira.wav' },
  { word: 'メラメラ', reading: 'meramera', meaning: '熊熊燃烧', category: '視覚', example: '火がメラメラ燃える', exReading: 'hi ga meramera moeru', exMeaning: '火熊熊燃烧', audio: '/audio/onomatopoeia/meramera.wav' },

  // ===== 触感 =====
  { word: 'ふわふわ', reading: 'fuwafuwa', meaning: '松软蓬松', category: '触感', example: 'ふわふわのパン', exReading: 'fuwafuwa no pan', exMeaning: '松软的面包', audio: '/audio/onomatopoeia/fuwafuwa.wav' },
  { word: 'つるつる', reading: 'tsurutsuru', meaning: '光滑溜溜', category: '触感', example: 'つるつるの床', exReading: 'tsurutsuru no yuka', exMeaning: '光滑的地板', audio: '/audio/onomatopoeia/tsurutsuru.wav' },
  { word: 'ねばねば', reading: 'nebaneba', meaning: '黏黏糊糊', category: '触感', example: 'ねばねばした納豆', exReading: 'nebaneba shita nattō', exMeaning: '黏糊糊的纳豆', audio: '/audio/onomatopoeia/nebaneba.wav' },
  { word: 'カチカチ', reading: 'kachikachi', meaning: '硬邦邦', category: '触感', example: 'カチカチに凍る', exReading: 'kachikachi ni kōru', exMeaning: '冻得硬邦邦的', audio: '/audio/onomatopoeia/kachikachi.wav' },

  // ===== 動作 =====
  { word: 'テクテク', reading: 'tekuteku', meaning: '一步一步走', category: '動作', example: 'テクテク歩く', exReading: 'tekuteku aruku', exMeaning: '一步步走着', audio: '/audio/onomatopoeia/tekuteku.wav' },
  { word: 'ダラダラ', reading: 'daradara', meaning: '磨磨蹭蹭', category: '動作', example: 'ダラダラ過ごす', exReading: 'daradara sugosu', exMeaning: '懒散地度过', audio: '/audio/onomatopoeia/daradara.wav' },
  { word: 'ブラブラ', reading: 'burabura', meaning: '溜达闲逛', category: '動作', example: 'ブラブラする', exReading: 'burabura suru', exMeaning: '闲逛', audio: '/audio/onomatopoeia/burabura.wav' },

  // ===== 音 =====
  { word: 'ガチャガチャ', reading: 'gachagacha', meaning: '哗啦哗啦', category: '音', example: 'ガチャガチャと音がする', exReading: 'gachagacha to oto ga suru', exMeaning: '发出哗啦哗啦的声音', audio: '/audio/onomatopoeia/gachagacha.wav' },
  { word: 'ドンドン', reading: 'dondon', meaning: '咚咚/不断地', category: '音', example: 'ドンドン上達する', exReading: 'dondon jōtatsu suru', exMeaning: '不断进步', audio: '/audio/onomatopoeia/dondon.wav' },
  { word: 'カンカン', reading: 'kankan', meaning: '当当响/大发雷霆', category: '音', example: 'カンカンに怒る', exReading: 'kankan ni okoru', exMeaning: '大发雷霆', audio: '/audio/onomatopoeia/kankan.wav' },
  { word: 'パチパチ', reading: 'pachipachi', meaning: '啪啪/拍手声', category: '音', example: 'パチパチと拍手する', exReading: 'pachipachi to hakushu suru', exMeaning: '啪啪地鼓掌', audio: '/audio/onomatopoeia/pachipachi.wav' },
  { word: 'ビリビリ', reading: 'biribiri', meaning: '刺啦/噼里啪啦', category: '音', example: 'ビリビリに破る', exReading: 'biribiri ni yaburu', exMeaning: '撕得粉碎', audio: '/audio/onomatopoeia/biribiri.wav' },

  // ===== 感覚 =====
  { word: 'ズキズキ', reading: 'zukizuki', meaning: '阵痛跳痛', category: '感覚', example: '頭がズキズキ痛む', exReading: 'atama ga zukizuki itamu', exMeaning: '头一阵阵疼', audio: '/audio/onomatopoeia/zukizuki.wav' },
  { word: 'チクチク', reading: 'chikuchiku', meaning: '刺痛', category: '感覚', example: 'チクチク痛い', exReading: 'chikuchiku itai', exMeaning: '刺痛', audio: '/audio/onomatopoeia/chikuchiku.wav' },
  { word: 'ヒリヒリ', reading: 'hirihiri', meaning: '火辣辣地痛', category: '感覚', example: 'ヒリヒリする', exReading: 'hirihiri suru', exMeaning: '火辣辣地疼', audio: '/audio/onomatopoeia/hirihiri.wav' },
  { word: 'ポカポカ', reading: 'pokapoka', meaning: '暖洋洋', category: '感覚', example: 'ポカポカ陽気', exReading: 'pokapoka yōki', exMeaning: '暖洋洋的天气', audio: '/audio/onomatopoeia/pokapoka.wav' },

  // ===== 表情 =====
  { word: 'ニコニコ', reading: 'nikoniko', meaning: '笑眯眯', category: '表情', example: 'ニコニコ笑う', exReading: 'nikoniko warau', exMeaning: '笑眯眯地笑', audio: '/audio/onomatopoeia/nikoniko.wav' },
  { word: 'ゲラゲラ', reading: 'geragera', meaning: '哈哈大笑', category: '表情', example: 'ゲラゲラ笑う', exReading: 'geragera warau', exMeaning: '哈哈大笑', audio: '/audio/onomatopoeia/geragera.wav' },
  { word: 'メソメソ', reading: 'mesomeso', meaning: '抽抽噎噎', category: '表情', example: 'メソメソ泣く', exReading: 'mesomeso naku', exMeaning: '抽抽噎噎地哭', audio: '/audio/onomatopoeia/mesomeso.wav' },

  // ===== 状態 =====
  { word: 'ボロボロ', reading: 'boroboro', meaning: '破破烂烂', category: '状態', example: 'ボロボロの服', exReading: 'boroboro no fuku', exMeaning: '破破烂烂的衣服', audio: '/audio/onomatopoeia/boroboro.wav' },
  { word: 'フラフラ', reading: 'furafura', meaning: '摇摇晃晃', category: '状態', example: 'フラフラと歩く', exReading: 'furafura to aruku', exMeaning: '摇摇晃晃地走', audio: '/audio/onomatopoeia/furafura.wav' },
  { word: 'スイスイ', reading: 'suisui', meaning: '顺利顺畅', category: '状態', example: 'スイスイ進む', exReading: 'suisui susumu', exMeaning: '工作顺利推进', audio: '/audio/onomatopoeia/suisui.wav' },
  { word: 'ペラペラ', reading: 'perapera', meaning: '流利/喋喋不休', category: '言葉', example: '日本語がペラペラ', exReading: 'nihongo ga perapera', exMeaning: '日语说得很流利', audio: '/audio/onomatopoeia/perapera.wav' },

  // ===== 漫画拟声词 — 喘息・呻吟 =====
  { word: 'ああっ', reading: 'ā', meaning: '啊啊（呻吟/感叹）', category: '漫画・喘ぎ', example: 'ああっ、気持ちいい', exReading: 'ā, kimochi ii', exMeaning: '啊啊，好舒服', audio: '/audio/onomatopoeia/manga-aa.wav' },
  { word: 'んっ', reading: 'n', meaning: '嗯（忍住声/鼻音）', category: '漫画・喘ぎ', example: 'んっ……だめ', exReading: 'n... dame', exMeaning: '嗯……不行', audio: '/audio/onomatopoeia/manga-n.wav' },
  { word: 'はぁ', reading: 'hā', meaning: '哈（喘气/叹气）', category: '漫画・喘ぎ', example: 'はぁ……疲れた', exReading: 'hā... tsukareta', exMeaning: '哈……好累', audio: '/audio/onomatopoeia/manga-haa.wav' },
  { word: 'はぁっ', reading: 'ha\'', meaning: '哈！（急促喘息）', category: '漫画・喘ぎ', example: 'はぁっ、はぁっ', exReading: 'ha\', ha\'', exMeaning: '哈、哈（急促喘气）', audio: '/audio/onomatopoeia/manga-haa2.wav' },
  { word: 'あんっ', reading: 'an\'', meaning: '啊嗯（娇喘）', category: '漫画・喘ぎ', example: 'あんっ、そこは', exReading: 'an\', soko wa', exMeaning: '啊嗯，那里……', audio: '/audio/onomatopoeia/manga-an.wav' },
  { word: 'いやっ', reading: 'iya\'', meaning: '不要！（抗拒）', category: '漫画・喘ぎ', example: 'いやっ、やめて', exReading: 'iya\', yamete', exMeaning: '不要，停下来', audio: '/audio/onomatopoeia/manga-iya.wav' },
  { word: 'ふぅ', reading: 'fū', meaning: '呼（吐气/放松）', category: '漫画・喘ぎ', example: 'ふぅ、終わった', exReading: 'fū, owatta', exMeaning: '呼，结束了', audio: '/audio/onomatopoeia/manga-fuu.wav' },
  { word: 'くっ', reading: 'ku\'', meaning: '唔（忍耐/痛苦）', category: '漫画・喘ぎ', example: 'くっ、強い', exReading: 'ku\', tsuyoi', exMeaning: '唔，好强', audio: '/audio/onomatopoeia/manga-ku.wav' },
  { word: 'うっ', reading: 'u\'', meaning: '呜（痛苦/作呕）', category: '漫画・喘ぎ', example: 'うっ、気持ち悪い', exReading: 'u\', kimochi warui', exMeaning: '呜，好恶心', audio: '/audio/onomatopoeia/manga-u.wav' },
  { word: 'あぐっ', reading: 'agu\'', meaning: '啊咕（被堵嘴）', category: '漫画・喘ぎ', example: 'あぐっ！', exReading: 'agu\'!', exMeaning: '唔咕！（被堵住嘴）', audio: '/audio/onomatopoeia/magu.wav' },
  { word: 'はひっ', reading: 'hahi\'', meaning: '哈嘻（慌张喘）', category: '漫画・喘ぎ', example: 'はひっ、びっくりした', exReading: 'hahi\', bikkuri shita', exMeaning: '哈嘻，吓了一跳', audio: '/audio/onomatopoeia/manga-hahi.wav' },

  // ===== 漫画拟声词 — 叫声 =====
  { word: 'きゃあっ', reading: 'kyā\'', meaning: '呀啊！（尖叫）', category: '漫画・叫び', example: 'きゃあっ！こわい', exReading: 'kyā\'! kowai', exMeaning: '呀啊！好可怕', audio: '/audio/onomatopoeia/manga-kyaa.wav' },
  { word: 'うわあっ', reading: 'uwā\'', meaning: '哇啊！（惊叫）', category: '漫画・叫び', example: 'うわあっ！なにこれ', exReading: 'uwā\'! nani kore', exMeaning: '哇啊！这是什么', audio: '/audio/onomatopoeia/manga-uwaa.wav' },
  { word: 'ぎゃあ', reading: 'gyā', meaning: '嘎啊！（惨叫）', category: '漫画・叫び', example: 'ぎゃあ！助けて', exReading: 'gyā! tasukete', exMeaning: '啊啊！救命', audio: '/audio/onomatopoeia/manga-gyaa.wav' },
  { word: 'わあっ', reading: 'wā\'', meaning: '哇！（惊喜/惊吓）', category: '漫画・叫び', example: 'わあっ！すごい', exReading: 'wā\'! sugoi', exMeaning: '哇！好厉害', audio: '/audio/onomatopoeia/manga-waa.wav' },
  { word: 'ひいい', reading: 'hiii', meaning: '嘶——（恐惧）', category: '漫画・叫び', example: 'ひいい、化物だ', exReading: 'hiii, bakemono da', exMeaning: '嘶——，是怪物', audio: '/audio/onomatopoeia/manga-hiii.wav' },
  { word: 'あああ', reading: 'āāā', meaning: '啊啊啊——（怒吼）', category: '漫画・叫び', example: 'あああ！もう我慢できない', exReading: 'āāā! mō gaman dekinai', exMeaning: '啊啊啊！已经忍不了了', audio: '/audio/onomatopoeia/manga-aaa.wav' },

  // ===== 漫画拟声词 — あえぎ（喘息连续） =====
  { word: 'あぁん', reading: 'ān', meaning: '啊嗯（连续喘息）', category: '漫画・連続', example: 'あぁん、だめぇ', exReading: 'ān, damee', exMeaning: '啊嗯，不要', audio: '/audio/onomatopoeia/manga-aan.wav' },
  { word: 'はぁん', reading: 'hān', meaning: '哈嗯（带鼻音喘）', category: '漫画・連続', example: 'はぁん、もっと', exReading: 'hān, motto', exMeaning: '哈嗯，更多', audio: '/audio/onomatopoeia/manga-haan.wav' },
  { word: 'んんっ', reading: 'nn\'', meaning: '嗯嗯（忍耐/快感）', category: '漫画・連続', example: 'んんっ、いい感じ', exReading: 'nn\', ii kanji', exMeaning: '嗯嗯，感觉不错', audio: '/audio/onomatopoeia/manga-nnn.wav' },
  { word: 'あっあっ', reading: 'a\'a\'', meaning: '啊、啊（节奏喘息）', category: '漫画・連続', example: 'あっ、あっ、あっ', exReading: 'a\', a\', a\'', exMeaning: '啊、啊、啊', audio: '/audio/onomatopoeia/manga-aa2.wav' },
  { word: 'はっはっ', reading: 'ha\'ha\'', meaning: '哈、哈（急促连续）', category: '漫画・連続', example: 'はっ、はっ、はっ', exReading: 'ha\', ha\', ha\'', exMeaning: '哈、哈、哈', audio: '/audio/onomatopoeia/manga-haha.wav' },

  // ===== 漫画拟声词 — 效果音 =====
  { word: 'ドンッ', reading: 'don\'', meaning: '砰！（撞击）', category: '漫画・効果音', example: 'ドンッとぶつかる', exReading: 'don\' to butsukaru', exMeaning: '砰地撞上', audio: '/audio/onomatopoeia/manga-don.wav' },
  { word: 'バンッ', reading: 'ban\'', meaning: '砰！（拍打/关门）', category: '漫画・効果音', example: 'ドアをバンッと閉める', exReading: 'doa o ban\' to shimeru', exMeaning: '砰地关上门', audio: '/audio/onomatopoeia/manga-ban.wav' },
  { word: 'ズキューン', reading: 'zukyūn', meaning: '咻——（心动/中箭）', category: '漫画・効果音', example: 'ズキューンと胸が鳴る', exReading: 'zukyūn to mune ga naru', exMeaning: '心脏怦然一动', audio: '/audio/onomatopoeia/manga-zukyuun.wav' },
  { word: 'ポカッ', reading: 'poka\'', meaning: '啪（被打/ punching）', category: '漫画・効果音', example: 'ポカッと殴られる', exReading: 'poka\' to nagurareru', exMeaning: '啪地被打了一拳', audio: '/audio/onomatopoeia/manga-poka.wav' },
  { word: 'チュッ', reading: 'chu\'', meaning: '啾（亲吻）', category: '漫画・効果音', example: 'チュッとキスする', exReading: 'chu\' to kisu suru', exMeaning: '啾地亲了一下', audio: '/audio/onomatopoeia/manga-chu.wav' },
  { word: 'キュン', reading: 'kyun', meaning: '怦然心动', category: '漫画・効果音', example: '胸がキュンとする', exReading: 'mune ga kyun to suru', exMeaning: '心里怦怦的', audio: '/audio/onomatopoeia/manga-kyun.wav' },
  { word: 'ジーン', reading: 'jīn', meaning: '感动/热泪盈眶', category: '漫画・効果音', example: 'ジーンとくる話', exReading: 'jīn to kuru hanashi', exMeaning: '令人感动的故事', audio: '/audio/onomatopoeia/manga-jiin.wav' },
  { word: 'シクシク', reading: 'shikushiku', meaning: '抽泣', category: '漫画・効果音', example: 'シクシク泣く', exReading: 'shikushiku naku', exMeaning: '抽抽搭搭地哭', audio: '/audio/onomatopoeia/manga-shikushiku.wav' },
  { word: 'オォォ', reading: 'ōō', meaning: '哦哦——（震撼）', category: '漫画・効果音', example: 'オォォ、すげぇ', exReading: 'ōō, sugee', exMeaning: '哦哦——，厉害', audio: '/audio/onomatopoeia/manga-ooo.wav' },
]

export const onomatopoeiaCategories = [
  '心理', '自然', '動物', '食べる', '視覚', '触感', '動作', '音', '感覚', '表情', '状態', '言葉',
  '漫画・喘ぎ', '漫画・叫び', '漫画・連続', '漫画・効果音',
]
