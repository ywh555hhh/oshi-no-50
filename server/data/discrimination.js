// 辨音词 — 用对比词组训练耳朵区分相似发音
// 就像中文用"神人/僧人"区分 sh/s 一样

export const discrimination = [
  // ===== 清浊辨析 =====
  {
    id: 'tenki-denki',
    category: '清浊辨析',
    title: 'て vs で',
    tip: '清音 て(te) 舌不振动，浊音 で(de) 声带振动。类似中文 t/d',
    a: { word: '天気', kana: 'てんき', romaji: 'tenki', meaning: '天气', audio: '/audio/disc/tenki.wav' },
    b: { word: '電気', kana: 'でんき', romaji: 'denki', meaning: '电/电气', audio: '/audio/disc/denki.wav' },
  },
  {
    id: 'kikai-gikai',
    category: '清浊辨析',
    title: 'き vs ぎ',
    tip: '清音 き(ki) 不送气，浊音 ぎ(gi) 声带振动。类似中文 k/g',
    a: { word: '機械', kana: 'きかい', romaji: 'kikai', meaning: '机器', audio: '/audio/disc/kikai-machine.wav' },
    b: { word: '議会', kana: 'ぎかい', romaji: 'gikai', meaning: '议会', audio: '/audio/disc/gikai.wav' },
  },
  {
    id: 'kankoku-kangoku',
    category: '清浊辨析',
    title: 'こ vs ご',
    tip: '清音 こ(ko) 与浊音 ご(go)，差别在声带是否振动。类似中文 k/g',
    a: { word: '韓国', kana: 'かんこく', romaji: 'kankoku', meaning: '韩国', audio: '/audio/disc/kankoku.wav' },
    b: { word: '監獄', kana: 'かんごく', romaji: 'kangoku', meaning: '监狱', audio: '/audio/disc/kangoku.wav' },
  },
  {
    id: 'touki-douki',
    category: '清浊辨析',
    title: 'と vs ど',
    tip: '清音 と(to) 与浊音 ど(do)。注意日语的 と 比中文的 t 软',
    a: { word: '陶器', kana: 'とうき', romaji: 'tōki', meaning: '陶瓷', audio: '/audio/disc/touki-pottery.wav' },
    b: { word: '動機', kana: 'どうき', romaji: 'dōki', meaning: '动机', audio: '/audio/disc/douki.wav' },
  },
  {
    id: 'hon-bon',
    category: '清浊辨析',
    title: 'ほ vs ぼ',
    tip: '清音 ほ(ho) 与浊音 ぼ(bo)。注意 ば行爆破感更强',
    a: { word: '本', kana: 'ほん', romaji: 'hon', meaning: '书', audio: '/audio/disc/hon-book.wav' },
    b: { word: '盆', kana: 'ぼん', romaji: 'bon', meaning: '盆（盆踊り）', audio: '/audio/disc/bon.wav' },
  },

  // ===== 长短音辨析 =====
  {
    id: 'obasan-obaasan',
    category: '长短音辨析',
    title: 'ば vs ばあ（1拍 vs 2拍）',
    tip: 'おばさん（伯母）是3拍，おばあさん（祖母）是4拍。差一个长音拍，意思完全不同！这是日语中最经典的辨音对之一',
    a: { word: '伯母さん', kana: 'おばさん', romaji: 'obasan', meaning: '阿姨（ aunt）', audio: '/audio/disc/obasan.wav' },
    b: { word: 'お祖母さん', kana: 'おばあさん', romaji: 'obaasan', meaning: '奶奶/外婆', audio: '/audio/disc/obaasan.wav' },
  },
  {
    id: 'ojisan-ojiisan',
    category: '长短音辨析',
    title: 'じ vs じい（1拍 vs 2拍）',
    tip: '和 おば/おばあ 同理，おじさん 和 おじいさん 差一个长音',
    a: { word: '叔父さん', kana: 'おじさん', romaji: 'ojisan', meaning: '叔叔（uncle）', audio: '/audio/disc/ojisan.wav' },
    b: { word: 'お祖父さん', kana: 'おじいさん', romaji: 'ojiisan', meaning: '爷爷/外公', audio: '/audio/disc/ojiisan.wav' },
  },
  {
    id: 'kuuki-kuki',
    category: '长短音辨析',
    title: 'くう vs く（长音 vs 短音）',
    tip: 'くうき 有两个拍（くーう），くき 只有一拍（く）。长音不是"读慢一点"，而是多占一拍',
    a: { word: '空気', kana: 'くうき', romaji: 'kūki', meaning: '空气', audio: '/audio/disc/kuuki.wav' },
    b: { word: '茎', kana: 'くき', romaji: 'kuki', meaning: '茎', audio: '/audio/disc/kuki.wav' },
  },
  {
    id: 'shuukan-shukan',
    category: '长短音辨析',
    title: 'しゅう vs しゅ（拗音+长音 vs 拗音）',
    tip: '拗音之后也可以接长音。しゅうかん 有 しゅーう 两拍，しゅかん 只有 しゅ 一拍',
    a: { word: '習慣', kana: 'しゅうかん', romaji: 'shūkan', meaning: '习惯', audio: '/audio/disc/shuukan.wav' },
    b: { word: '主観', kana: 'しゅかん', romaji: 'shukan', meaning: '主观', audio: '/audio/disc/shukan.wav' },
  },

  // ===== 拗音辨析 =====
  {
    id: 'byouin-biyouin',
    category: '拗音辨析',
    title: 'ょ（小）vs よ（大）',
    tip: '这是日语辨音的终极 BOSS！びょういん 是拗音（1拍），びよういん 是普通音（2拍）。发音时间不同导致意思天差地别',
    a: { word: '病院', kana: 'びょういん', romaji: 'byōin', meaning: '医院', audio: '/audio/disc/byouin.wav' },
    b: { word: '美容院', kana: 'びよういん', romaji: 'biyōin', meaning: '美容院', audio: '/audio/disc/biyouin.wav' },
  },
  {
    id: 'kyou-kiyou',
    category: '拗音辨析',
    title: 'ょ（小）vs よ（大）②',
    tip: 'きょう 是1拍（拗音），きよう 是2拍。和上面的 病院/美容院 同理',
    a: { word: '今日', kana: 'きょう', romaji: 'kyō', meaning: '今天', audio: '/audio/disc/kyou.wav' },
    b: { word: '器用', kana: 'きよう', romaji: 'kiyō', meaning: '灵巧', audio: '/audio/disc/kiyou.wav' },
  },
  {
    id: 'chuushi-choushi',
    category: '拗音辨析',
    title: 'ゅ vs ょ（不同拗音）',
    tip: 'ちゅ 和 ちょ 都是拗音但方向不同：ゅ 嘴唇圆撮向前，ょ 嘴角更展开。就像中文"区"和"敲"的起音差异',
    a: { word: '中止', kana: 'ちゅうし', romaji: 'chūshi', meaning: '中止', audio: '/audio/disc/chuushi.wav' },
    b: { word: '調子', kana: 'ちょうし', romaji: 'chōshi', meaning: '状态/调子', audio: '/audio/disc/choushi.wav' },
  },

  // ===== 促音辨析 =====
  {
    id: 'oto-otto',
    category: '促音辨析',
    title: 'と vs っと（无促音 vs 有促音）',
    tip: 'おと 是2拍，おっと 是3拍（お→停顿→と）。促音的停顿是真实的时间空隙，不是"读快"',
    a: { word: '音', kana: 'おと', romaji: 'oto', meaning: '声音', audio: '/audio/disc/oto.wav' },
    b: { word: '夫', kana: 'おっと', romaji: 'otto', meaning: '丈夫', audio: '/audio/disc/otto.wav' },
  },
  {
    id: 'saki-sakki',
    category: '促音辨析',
    title: 'き vs っき',
    tip: 'さき 是2拍，さっき 是3拍。同一个汉字"先"，有没有促音意思变了',
    a: { word: '先', kana: 'さき', romaji: 'saki', meaning: '前方/之前', audio: '/audio/disc/saki.wav' },
    b: { word: 'さっき', kana: 'さっき', romaji: 'sakki', meaning: '刚才', audio: '/audio/disc/sakki.wav' },
  },
  {
    id: 'kite-kitte',
    category: '促音辨析',
    title: 'て vs って',
    tip: 'きて 是2拍（穿），きって 是3拍（切/邮票）。促音占一拍，节奏上能清楚感受到',
    a: { word: '着て', kana: 'きて', romaji: 'kite', meaning: '穿着', audio: '/audio/disc/kite-wear.wav' },
    b: { word: '切手', kana: 'きって', romaji: 'kitte', meaning: '邮票', audio: '/audio/disc/kitte-stamp.wav' },
  },
  {
    id: 'kako-kakkou',
    category: '促音辨析',
    title: 'こ vs っこ',
    tip: 'かこ 是2拍，かっこう 是4拍（か→停→こ→う）。促音后跟长音是最难分辨的组合之一',
    a: { word: '過去', kana: 'かこ', romaji: 'kako', meaning: '过去', audio: '/audio/disc/kako.wav' },
    b: { word: '格好', kana: 'かっこう', romaji: 'kakkō', meaning: '样子/姿态', audio: '/audio/disc/kakkou.wav' },
  },

  // ===== 声调辨析（Pitch Accent）=====
  {
    id: 'hashi-bridge-chopsticks',
    category: '声调辨析',
    title: 'はし：↓↗ vs ↗↓',
    tip: '橋(は↗し↘) 第二音节高后降，箸(は↘し↗) 第一个音节高后降。同音不同调，日语声调和中文四声一样重要！',
    a: { word: '橋', kana: 'はし', romaji: 'hashi', meaning: '桥（は↗し↘）', audio: '/audio/disc/hashi-bridge.wav' },
    b: { word: '箸', kana: 'はし', romaji: 'hashi', meaning: '筷子（は↘し↗）', audio: '/audio/disc/hashi-chopsticks.wav' },
  },
  {
    id: 'ame-rain-candy',
    category: '声调辨析',
    title: 'あめ：↘↗ vs ↗↘',
    tip: '雨(あ↘め↗) 第一拍高，飴(あ↗め↘) 第二拍高。假名完全相同，只有声调不同',
    a: { word: '雨', kana: 'あめ', romaji: 'ame', meaning: '雨（あ↘め↗）', audio: '/audio/disc/ame-rain.wav' },
    b: { word: '飴', kana: 'あめ', romaji: 'ame', meaning: '糖果（あ↗め↘）', audio: '/audio/disc/ame-candy.wav' },
  },
  {
    id: 'kami-paper-hair',
    category: '声调辨析',
    title: 'かみ：↘↗ vs ↗↘',
    tip: '紙(か↘み↗) 下降后平，髪(か↗み↘) 上升后降。中文母语者容易忽略日语声调',
    a: { word: '紙', kana: 'かみ', romaji: 'kami', meaning: '纸（か↘み↗）', audio: '/audio/disc/kami-paper.wav' },
    b: { word: '髪', kana: 'かみ', romaji: 'kami', meaning: '头发（か↗み↘）', audio: '/audio/disc/kami-hair.wav' },
  },
  {
    id: 'hana-flower-nose',
    category: '声调辨析',
    title: 'はな：↘↗ vs ↗↘',
    tip: '花(は↘な↗) 和 鼻(は↗な↘)。和上面三组一样的声调对立模式',
    a: { word: '花', kana: 'はな', romaji: 'hana', meaning: '花（は↘な↗）', audio: '/audio/disc/hana-flower.wav' },
    b: { word: '鼻', kana: 'はな', romaji: 'hana', meaning: '鼻子（は↗な↘）', audio: '/audio/disc/hana-nose.wav' },
  },

  // ===== 同音异义 =====
  {
    id: 'kikai-machine-chance',
    category: '同音异义',
    title: 'きかい：完全同音',
    tip: '機械 和 機会 读音完全相同（きかい），只能靠语境和汉字区分。日语中这种同音词极多',
    a: { word: '機械', kana: 'きかい', romaji: 'kikai', meaning: '机器', audio: '/audio/disc/kikai-machine2.wav' },
    b: { word: '機会', kana: 'きかい', romaji: 'kikai', meaning: '机会', audio: '/audio/disc/kikai-chance.wav' },
  },
  {
    id: 'seikou',
    category: '同音异义',
    title: 'せいこう：完全同音',
    tip: '成功 和 精巧 同音。日语汉字读音种类少（只有约50种音节），导致同音词泛滥',
    a: { word: '成功', kana: 'せいこう', romaji: 'seikō', meaning: '成功', audio: '/audio/disc/seikou-success.wav' },
    b: { word: '精巧', kana: 'せいこう', romaji: 'seikō', meaning: '精致', audio: '/audio/disc/seikou-precision.wav' },
  },
  {
    id: 'ishi',
    category: '同音异义',
    title: 'いし：完全同音',
    tip: '意志 和 石 同音。日语中不同汉字读音一样的情况非常多，所以书面语必须写汉字',
    a: { word: '意志', kana: 'いし', romaji: 'ishi', meaning: '意志', audio: '/audio/disc/ishi-will.wav' },
    b: { word: '石', kana: 'いし', romaji: 'ishi', meaning: '石头', audio: '/audio/disc/ishi-stone.wav' },
  },
  {
    id: 'kousou',
    category: '同音异义',
    title: 'こうそう：完全同音',
    tip: '同音词在实际对话中靠上下文区分，孤立的词很难判断意思',
    a: { word: '高層', kana: 'こうそう', romaji: 'kōsō', meaning: '高层（高層ビル）', audio: '/audio/disc/kousou-tall.wav' },
    b: { word: '構想', kana: 'こうそう', romaji: 'kōsō', meaning: '构想（構想を練る）', audio: '/audio/disc/kousou-idea.wav' },
  },
]

export const discCategories = [
  { id: '清浊辨析', label: '清浊辨析', tip: '清音 vs 浊音', color: 'blue' },
  { id: '长短音辨析', label: '长短音辨析', tip: '1拍 vs 2拍', color: 'teal' },
  { id: '拗音辨析', label: '拗音辨析', tip: '小字 vs 大字', color: 'purple' },
  { id: '促音辨析', label: '促音辨析', tip: '有停顿 vs 无停顿', color: 'amber' },
  { id: '声调辨析', label: '声调辨析', tip: '同音不同调', color: 'rose' },
  { id: '同音异义', label: '同音异义', tip: '完全同音不同义', color: 'green' },
]
