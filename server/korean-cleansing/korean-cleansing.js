let hangulResult = [];
let notHangulResult = [];

module.exports = () => {
    let str = "Vocabulary for 복덕방\n" +
        "\n" +
        "철썩 \t\t\t\t\twith a splash, with a thud (slam, slap), splosh\n" +
        "판장 (板墻)\t\t\t\ta wooden wall, a board fence\n" +
        "내버리다 \t\t\t\tthrow away, cast away, dump\n" +
        "주먹구구 (-九九)\t\t\t1) rule of thumb 2) finger-counting\n" +
        "골독하다 (汨篤) = 골똘하다 \tbe absorbed, engrossed, lost (in); be intent, keen (on)\n" +
        "폭음 (爆音)\t\t\t\tan explosion, a detonation, an explosive sound\n" +
        "부러지다 \t\t\t\tbreak; be/get broken\n" +
        "돋보기 \t\t\t\tlong-distance glasses; a magnifying glass\n" +
        "똑 \t\t\t\t\tjust, exactly, precisely, completely\n" +
        "모이 \t\t\t\t\tfood, feed, provisions\n" +
        "쪼다 \t\t\t\t\tpick (at), pick up, peck (at)\n" +
        "수채구멍 \t\t\t\tan outfall; a sinkhole\n" +
        "뜨물 \t\t\t\t\twater in which rice has been washed\n" +
        "휩쓸리다 \t\t\t\tbe/get swept away (off); be/get involved (entangled)in or drawn into\n" +
        "꼭지 \t\t\t\t\tstem, stalk\n" +
        "거피하다 (去皮)\t\t\tskin, flay (a rabbit), rind (melons), peel (an orange)\n" +
        "녹두 (綠豆)\t\t\t\tsmall green peas\n" +
        "빈자떡 (貧者-)\t\t\ta kind of pancake made from lentil flour\n" +
        "젠장 \t\t\t\t\tDamn it!\n" +
        "코웃음 \t\t\t\ta sneer\n" +
        "추석 (秋夕) \t\t\t\tthe harvest (moon) festival (on the 15th of August by the lunar calendar)\n" +
        "낼 = 내일 \t\t\t\ttomorrow\n" +
        "저도 모르게 \t\t\tin spite of oneself, unconsciously, unintentionally\n" +
        "입맛 \t\t\t\t\tappetite, taste\n" +
        "다시다 \t\t\t\tsmack one's lips at\n" +
        "풍기다 \t\t\t\tgive out (an odor), send forth (scent)\n" +
        "대뜸 \t\t\t\t\tat once, outright, on the spot, immediately\n" +
        "흥건해지다 \t\t\t\tbe full (of water), have too much liquid in (food)\n" +
        "충치 (蟲齒)\t\t\t\ta decayed tooth\n" +
        "풍치 (風致)\t\t\t\ttaste, elegance, scenic beauty\n" +
        "송곳 \t\t\t\t\ta gimlet, an awl\n" +
        "날카롭다 (날카로워) \t\tbe sharp, pointed, keen, cutting\n" +
        "비다 \t\t\t\t\tbe/get empty\n" +
        "고개 \t\t\t\t\tthe nape (of the neck), the head\n" +
        "트이다 \t\t\t\tbe/get cleared, opened, spread (out)\n" +
        "널리다 \t\t\t\tbe/get scattered (about)\n" +
        "바래다 \t\t\t\tgo (come) off; fade (away)\n" +
        "말리다 \t\t\t\tmake dry, dry sth\n" +
        "옥양목 (玉洋木)\t\t\tcalico\n" +
        "부시다 \t\t\t\tbe dazzling, glaring, blinding\n" +
        "이내 \t\t\t\t\tsoon, presently, at once, right away\n" +
        "때(가) 묻다 \t\t\t\tget dirty (soiled)\n" +
        "적삼 \t\t\t\t\tan unlined jacket (for summer wear)\n" +
        "날래다 \t\t\t\tbe quick, fast, nimble, agile\n" +
        "조박 (糟粕)\t\t\t\tlees, draft\n" +
        "고적 (孤寂)\t\t\t\tsolitude, loneliness\n" +
        "품기다 \t\t\t\tbe/get harbored (suspicion), entertained (hope, a doubt, a feeling), held (a belief)\n" +
        "튀기다 \t\t\t\tfillip, flip, snap\n" +
        "목침 (木枕)\t\t\t\ta wooden pillow\n" +
        "줄이다 \t\t\t\treduce, decrease, diminish\n" +
        "환 (圜)\t\t\t\tKorean currency unit during the Taehan Empire period, 1897-1910 (100 전 = 1 환); also used from 1953-1962\n" +
        "거듭 \t\t\t\t\t(over) again, once again, repeatedly\n" +
        "얻다 \t\t\t\t\tget, acquire, obtain\n" +
        "총액 (總額)\t\t\t\tthe total (sum) amount, the sum (grand) total, in total\n" +
        "단 \t\t\t\t\tonly (one), single, sole\n" +
        "셈속 \t\t\t\t\t1) the real state of things 2) a hidden intention, one's intention\n" +
        "이마 \t\t\t\t\tthe forehead, the brow\n" +
        "화끈\t\t\t\t\twith a sudden flash of heat, with a throb\n" +
        "도사리다 (무릎을~)\t\t\tsit cross-legged\n" +
        "곧추세우다 \t\t\t\terect, set upright\n" +
        "뒤(를) 보다 \t\t\t\tevacuate the bowels, have a bowel movement\n" +
        "쪼그리다 = 쭈그리다 \t\tcrouch, squat, stoop\n" +
        "마코 \t\t\t\t\ta cigarette brand, \"Mako\"\n" +
        "갑 (匣)\t\t\t\ta pack , a casket, a tiny case\n" +
        "번연히 (幡然-)\t\t\tsuddenly, all of a sudden\n" +
        "단돈 \t\t\t\t\ta small amount of money\n" +
        "번번이 (番番-)\t\t\tevery (each) time, every occasion, always, whenever\n" +
        "최후 (最後)\t\t\t\tthe last (end), the conclusion\n" +
        "백통화 (-貨)\t\t\t\tnickel, cupronickel\n" +
        "한푼 \t\t\t\t\ta penny, a coin, a copper, a farthing\n" +
        "얹다 \t\t\t\t\tput on, place (lay, set) a thing on, load\n" +
        "야위다\t \t\t\tbecome thin (lean), lose (one's) weight, lose flesh\n" +
        "손바닥 [-빠닥]\t\t\tthe palm of the hand\n" +
        "참위 (參尉)\t\t\t\ta junior-level official government rank during the Taehan Cheguk period (1897-1910); some versions of the story have instead 참의(參議), which was a low-level administrative official post from the same period in the 의정부 or State Council\n" +
        "투박하다 \t\t\t\tunrefined, rustic, boorish, uncouth, rough\n" +
        "잔망하다 (孱妄)\t\t\tbe feeble and stupid (for one's age)\n" +
        "거간 (居間)\t\t\t\tbrokerage, a brocker\n" +
        "한번 (-番)\t\t\t\tonce, one time, one round\n" +
        "낯 \t\t\t\t\t1) a face, a visage, features 2) honor, prestige\n" +
        "부딪치다 \t\t\t\tcollide with, bump against (into)\n" +
        "믿다 \t\t\t\t\tbelieve, credit, give credit (credence) to, trust\n" +
        "관상쟁이 (觀相-)\t\t\ta physiognomist, a phrenologist, a reader of faces\n" +
        "엄지손가락 \t\t\t\tthe thumb\n" +
        "주먹 \t\t\t\t\ta fist\n" +
        "재물 (財物)\t\t\t\tproperty, means, goods, treasures, a fortune\n" +
        "문득 \t\t\t\t\tsuddenly, unexpectedly\n" +
        "으레 \t\t\t\t\twithout fail, habitually, customarily, as a rule, always, every time\n" +
        "얄밉다 (얄미워)\t\t\tbe offensive, mean and nasty, cheeky, hateful, detestable\n" +
        "드팀전 (-廛)\t\t\t\ta dry-goods store, a draper's shop\n" +
        "실패 (失敗)\t\t\t\ta failure, a blunder, miscarriage, an error\n" +
        "잡히다 \t\t\t\tput (a thing) in (at) pawn, have (a thing) taken as security\n" +
        "장전 (欌廛)\t\t\t\ta store that sells dressers/wardrobes and other furniture items\n" +
        "화재 (火災)\t\t\t\ta fire, a conflagration\n" +
        "이놈 \t\t\t\t\tthis (damn) guy, this man, fellow\n" +
        "연습삼아 (演習-)\t\t\tas a drill, practice, training\n" +
        "당장 (當場)\t\t\t\ton the spot, immediately, at once\n" +
        "단단히 \t\t\t\thard, solidly\n" +
        "흔히 \t\t\t\t\tusually, commonly, frequently, often\n" +
        "갓 \t\t\t\t\ta traditional cylindrical Korean hat\n" +
        "행길 \t\t\t\t\ta main road\n" +
        "눈방울 [빵울]\t\t\tan eyeball\n" +
        "합병 (合倂)\t\t\t\tcombination, union, amalgamation, consolidation, coalition\n" +
        "시기 (時機)\t\t\t\tan opportunity, a chance, the time\n" +
        "엿보다 \t\t\t\twatch for, look (out)for a chance, spy out (on)\n" +
        "별수 (別-)\t\t\t\tspecial luck, extraordinary fortune\n" +
        "이럭저럭 \t\t\t\tsomehow or other, in one way or another, somehow\n" +
        "심심파적 (-破寂)\t\t\tkilling time, whiling away the hours, beguilement\n" +
        "가옥 (家屋)\t\t\t\ta house, a building\n" +
        "중개업 (仲介業) \t\t\tthe brokerage business\n" +
        "겨우 \t\t\t\t\tbarely, narrowly, with difficulty, only, just\n" +
        "굶다 \t\t\t\t\tstarve, go hungry, famish\n" +
        "수입 (收入)\t\t\t\tan income, a revenue\n" +
        "대정 (大正) \t\t\t\tthe Taishō era (1912-1926), coinciding with the reign of Emperor Taishō\n" +
        "세금 (稅金)\t\t\t\ta tax, a duty, a charge\n" +
        "자녀 (子女)\t\t\t\tchildren, offspring, sons and daughters\n" +
        "몰려들다 \t\t\t\tcome in crowds (flocks), crowd (flock) in, be driven into\n" +
        "지대 (地帶)\t\t\t\ta zone, a region, a belt\n" +
        "고옥 (古屋)\t\t\t\tan old house, an ancient building\n" +
        "만원대 \t\t\t\tthe level of 10,000 wŏn\n" +
        "예사 (例事)\t\t\t\ta common practice, an everyday occurrence, an ordinary affair\n" +
        "훌훌 \t\t\t\t\tflying, fluttering, lightly, nimbly\n" +
        "그판에 \t\t\t\ton that occasion, at the present moment\n" +
        "장만하다 \t\t\t\tprepare, arrange, procure, acquire, buy in\n" +
        "건축회사 (建築會社)\t\ta building company, an architectural (a construction) firm\n" +
        "당자 (當者)\t\t\t\tthe person (man) himself, the person concerned (in question)\n" +
        "-끼리 \t\t\t\t\tamong ourselves (themselves), by ourselves (themselves), privately\n" +
        "원칙 (原則) \t\t\t\ta principle, a fundamental rule\n" +
        "중개료 (仲介料)\t\t\tbrokerage commission\n" +
        "-여 (餘) \t\t\t\tabove, over, more (than), beyond\n" +
        "쌀 \t\t\t\t\trice\n" +
        "졸리다 \t\t\t\tbe/get badgered, get pestered (pressed, importuned)\n" +
        "형편 (形便)\t\t\t\ta state, (a) condition, a situation, an aspect\n" +
        "마련하다 \t\t\t\tcontrive, manage, make shift, arrange\n" +
        "훈련원 (訓練院)\t\t\ta training school(station, institute, center)\n" +
        "병법 [-뻡] (兵法)\t\t\ttactics, strategy\n" +
        "익히다 \t\t\t\tmake oneself familiar with\n" +
        "호령 (號令) \t\t\t\ta (word of) command, an order\n" +
        "산천 (山川) \t\t\t\tmountains and streams (rivers), the country\n" +
        "물러서다 \t\t\t\tstep (stand) back, back, get out of the way (of)\n" +
        "기개 (氣槪)\t\t\t\tspirit, pluck, backbone, pride, self-respect\n" +
        "자기 (自己)\t\t\t\toneself, self, ego, I\n" +
        "가쾌 (家儈) = 집주름 \t\ta house broker (agent), a real-estate agent\n" +
        "사글셋방 = 삭월세방 (朔月貰房)\ta rented room\n" +
        "만인 (萬人) \t\t\t\tall people, everyone\n" +
        "심부름꾼 \t\t\t\tan errand boy, a messenger, the bearer\n" +
        "서글프다 \t\t\t\tbe lonesome, sad, forlorn\n" +
        "즐기다 \t\t\t\tenjoy oneself (over), take pleasure (delight) in\n" +
        "남몰래 \t\t\t\tunseen, unobserved, secretly, inwardly\n" +
        "감회 (感懷)\t\t\t\tsentiments, feelings, memories, reminiscences\n" +
        "호반 (虎班)\t\t\t\tthe military nobility\n" +
        "기개 (氣槪)\t\t\t\tspirit, high-mindedness, moral courage\n" +
        "혈기 (血氣)\t\t\t\tvitality, strength, stamina, hot-blood, youthful vigor\n" +
        "줆 < 줄다 \t\t\t\tdecrease; diminishment\n" +
        "조차 \t\t\t\t\teven, too, in addition, into the bargain\n" +
        "장사치 \t\t\t\ta peddler, a trader\n" +
        "귀에 익다 \t\t\t\tbe familiar to one's ears\n" +
        "목청 \t\t\t\t\tthe vocal chords, one's voice\n" +
        "기울이다 \t\t\t\ttip, tilt, lean, incline\n" +
        "제법 \t\t\t\t\tfairly, pretty, quite, considerably, rather\n" +
        "유리병 (琉璃甁)\t\t\ta glass bottle\n" +
        "간장통 (-醬桶)\t\t\ta soybean sauce bottle\n" +
        "가마니 \t\t\t\ta straw bag, a bale\n" +
        "두어개 \t\t\t\tabout two or three; a couple of\n" +
        "저울 \t\t\t\t\ta balance, (a pair of) scales, a (weighing) beam\n" +
        "중노인 (中老人)\t\t\tan elderly person, a middle aged person\n" +
        "사나이 \t\t\t\ta man, a male\n" +
        "성명 (姓名) \t\t\t\ta (full) name (surname + given name)\n" +
        "애초 (-初)\t\t\t\tat first, at the start (outset), primarily, originally\n" +
        "감감하다 \t\t\t\t1) hear nothing from (sb), be far off/from; 2) ignorant (of), have entirely forgotten\n" +
        "분명 (分明)\t\t\t\tclearly, obviously\n" +
        "저런 \t\t\t\t\tOh dear!, O my!\n" +
        "한참 \t\t\t\t\t(for) a good while, for a (long) time (while)\n" +
        "끄덕이다 \t\t\t\tnod\n" +
        "골목 \t\t\t\t\ta side street, an alley, a byway\n" +
        "사라지다 \t\t\t\tdisappear, vanish, be gone, go out of sight\n" +
        "즈음 \t\t\t\t\tthe approximate time (when)\n" +
        "깨닫다 (깨달아)\t\t\tsee, read, sense, perceive, apprehend\n" +
        "동관 (同官)\t\t\t\ta colleague, a fellow official\n" +
        "연소 (年少)\t\t\t\t(be) young (in years)\n" +
        "학식 (學識)\t\t\t\tscholarship, learning, scholarly attainments, knowledge\n" +
        "재기 (才氣)\t\t\t\t(a flash of) wit, talent\n" +
        "상관 (上官)\t\t\t\ta higher officer, a superior (senior) official, a chief\n" +
        "칭찬 (稱讚)\t\t\t\tpraise, applause, admiration, commendation\n" +
        "청년 (靑年)\t\t\t\ta young man, a youth\n" +
        "무관 (武官)\t\t\t\ta military (naval) officer\n" +
        "모습 (貌襲) \t\t\t\tfeatures, appearance, a figure, an image\n" +
        "저으기 = 적이 \t\t\tquite a bit\n" +
        "감개 (感慨)\t\t\t\tdeep emotion\n" +
        "사무치다 \t\t\t\ttouch the heart, sink into the mind, pierce\n" +
        "멈추다 \t\t\t\tstop, cease, put a stop to, bring to a stop, halt\n" +
        "싸전 (-廛)\t\t\t\ta rice store\n" +
        "마누라 \t\t\t\tone's wife\n" +
        "선선히 \t\t\t\tcandidly, frankly, openly, with (good) grace\n" +
        "시퍼렇다 (시퍼레)\t\t\tbe deep blue, deadly pale\n" +
        "지전 (紙錢)\t\t\t\tpaper money\n" +
        "거저 = 그저 \t\t\tonly, merely, simply\n" +
        "개가죽 \t\t\t\t1) dog skin 2) (deprecatory) one's \"face\", honor (=낯가죽)\n" +
        "절박하다 (切迫) \t\t\tdraw near, be near at hand, be imminent\n" +
        "지체 (肢體)\t\t\t\tthe limbs and the body\n" +
        "자존심 (自尊心)\t\t\tself-respect, pride\n" +
        "여생 (餘生)\t\t\t\tthe rest (remainder) of one's life, one's remaining years\n" +
        "작정 (作定)\t\t\t\ta decision, a determination, an intention\n" +
        "실없다 (實-)\t\t\t\tbe untrustworthy, unreliable, idle, vain, silly\n" +
        "티 \t\t\t\t\ta style (a touch, an air) of manner, way\n" +
        "요즘 \t\t\t\t\trecently, lately, (in) these days, nowadays\n" +
        "농지거리 [-찌거리] (弄-)\t\tjoking, bantering\n" +
        "뽀로통하다 \t\t\t\tbe sulky (sullen), morose(sour); pout\n" +
        "성미 (性味)\t\t\t\tnature, disposition, temperament\n" +
        "쫌보 \t\t\t\t\ta fool, a simpleton\n" +
        "업수여기다 \t\t\t\tdespise, look down upon, treat (sb) with contempt (= 업신여기다)\n" +
        "발끈 \t\t\t\t\tflying into a rage\n" +
        "화투 (花鬪)\t\t\t\tKorean playing cards, \"flower cards\"\n" +
        "어멈 \t\t\t\t\ta mother\n" +
        "쌔근거리다 \t\t\t\tbreathes hard, gasps, pants, heaves\n" +
        "부채 \t\t\t\t\ta fan, a folding fan\n" +
        "담뱃갑 (-匣)\t\t\t\ta cigarette case; pack of cigarettes\n" +
        "새침하다 \t\t\t\tbe cold, aloof, play the innocent\n" +
        "계집 \t\t\t\t\ta woman, a female\n" +
        "천생 (天生)\t\t\t\tby nature, as ever\n" +
        "첩 (妾)\t\t\t\ta concubine, a (secret) mistress\n" +
        "껄껄 \t\t\t\t\tha-ha, haw-haw\n" +
        "무용 (舞踊)\t\t\t\tdancing, a dance\n" +
        "이름(을) 날리다 \t\t\tmake a name for oneself\n" +
        "공연 (公演)\t\t\t\ta public, performance(exhibition)\n" +
        "조르다 \t\t\t\timportune, ask(sb to do), press (a person) for, urge (sb to do)\n" +
        "으쓱 \t\t\t\t\tperk oneself up, lift one's head up, be elated\n" +
        "공표 (公表)\t\t\t\tofficial (public) announcement, publication, proclamation\n" +
        "돌라주다 \t\t\t\tdistribute, share, serve round\n" +
        "한가운데 \t\t\t\tthe very middle, the center, the heart\n" +
        "한창 \t\t\t\t\tin the midst(middle, thick) of, at the height of\n" +
        "다릿짓 \t\t\t\ta leg gesture\n" +
        "멍멍히 \t\t\t\tabsentmindedly, as if stunned\n" +
        "해괴하다 (駭怪)\t\t\tbe strange, eccentric, monstrous, odd, extraordinary\n" +
        "마땅하다 \t\t\t\tbe becoming, suitable, right, appropriate, fair, proper\n" +
        "어조 (語調)\t\t\t\tthe tone (of the voice), euphony, accent, a turn of expression\n" +
        "문명국 (文明國)\t\t\ta civilized nation\n" +
        "약다 \t\t\t\t\tbe shrewd, sharp, clever, smart\n" +
        "미리 \t\t\t\t\tbeforehand, in advance, previously, in anticipation\n" +
        "등신 (等神)\t\t\t\ta fool, a dunce, a silly, a stupid person\n" +
        "탄하다 \t\t\t\tfind fault with (another's business), criticize\n" +
        "배기다 \t\t\t\tendure, stand, bear, put up with, withstand\n" +
        "빌어먹을 \t\t\t\tDamn (Hang, Darn, Confound) it! Gosh!\n" +
        "나잇값(을) 하다 \t\t\tact one’s age; behave appropriately to one's age\n" +
        "분통 (憤痛)\t\t\t\trage, fury\n" +
        "발끈거리다 \t\t\t\tbe hot-tempered, get mad easily, fly into rage\n" +
        "환하다 \t\t\t\tbright\n" +
        "켜다 \t\t\t\t\tlight, kindle, turn (switch) on\n" +
        "도루 = 도로 \t\t\tback, again\n" +
        "넓적다리 \t\t\t\tthe thigh\n" +
        "오지랖(이) 넓다 \t\t\t(lit.: the front of sb’s outer garment is wide) = idiom for nosy; always sticking one’s nose into other people’s business\n" +
        "경치게 (黥)\t\t\t\tincredibly, awfully, terribly\n" +
        "안방 [-빵] (-房)\t\t\tthe inner room, the women's quarters\n" +
        "쥐뿔같다 \t\t\t\tbe worthless\n" +
        "쓸쓸히 \t\t\t\tso-so, passably, tolerably\n" +
        "재판소 (裁判所)\t\t\ta court of justice (law), a courthouse\n" +
        "대서업 (代書業)\t\t\tscrivenery\n" +
        "국어독본 (國語讀本)\t\ta ‘national language’ reader (i.e., textbook for teaching Japanese)\n" +
        "노상 \t\t\t\t\talways, all the time, usually, habitually, constantly\n" +
        "끼다 \t\t\t\t\thold (a thing) under one’s arm\n" +
        "삼국지 (三國誌)\t\t\tthe Sanguozhi (Romance of the Three Kingdoms)\n" +
        "투 \t\t\t\t\t1) a form, a style 2) a way, a habit\n" +
        "긴상 도꼬에 유끼마쓰까\t\tJapanese: Kin-san, doko e yukimasuka (Mr. Kim, where are you going?)\n" +
        "뚜껑 \t\t\t\t\ta cover, a lid\n" +
        "손때 \t\t\t\t\tdirt from the hands, finger marks\n" +
        "받치다 \t\t\t\tsupport, prop (bolster) up, hold up\n" +
        "베다 \t\t\t\t\trest one's head on (a pillow)\n" +
        "조선총독부 (朝鮮總督府)\t\tGovernment-General of Korea\n" +
        "편찬 (編纂)\t\t\t\tcompilation, editing\n" +
        "글자 [-짜] (-字)\t\t\ta letter, a character, an ideography\n" +
        "허가 (許可)\t\t\t\tpermission, approval, grant, sanction\n" +
        "의연히 (毅然-)\t\t\tresolutely, firmly, bravely, boldly, dauntlessly\n" +
        "세월 (歲月) \t\t\t\ttime, time and tide\n" +
        "한나절 \t\t\t\thalf a day\n" +
        "화풀이 하다 (火-)\t\t\tlet off steam, vent one's wrath (on), wreak one's anger (on)\n" +
        "중얼거리다 \t\t\t\tmutter to oneself, grumble (at, over, about), murmur (at)\n" +
        "팽개치다 \t\t\t\tthrow away (aside), fling away, cast away\n" +
        "재수 (財數)\t\t\t\tluck, fortune\n" +
        "야심 (野心)\t\t\t\tambition, aspiration\n" +
        "순회 (巡廻)\t\t\t\ta round, a tour\n" +
        "돈냥 (-兩)\t\t\t\tsome money\n" +
        "걷히다 \t\t\t\tbe/get collected, gathered\n" +
        "연구소 (硏究所)\t\t\ta research institute\n" +
        "뜯어고치다 \t\t\t\tmend, repair, fix, have (something) repaired\n" +
        "유성기 (留聲機)\t\t\ta phonograph, a gramophone\n" +
        "사들이다 \t\t\t\tbuy (in)\n" +
        "교제 (交際)\t\t\t\tassociation, intercourse, friendship\n" +
        "애비 \t\t\t\t\tfather\n" +
        "예산 (豫算)\t\t\t\tan estimate, a budget\n" +
        "삯바느질 \t\t\t\tneedlework for pay\n" +
        "홑옷 \t\t\t\t\tunlined clothes\n" +
        "암만해두 \t\t\t\tin every respect, by all means, at any cost\n" +
        "사쓸 = 사쓰를/샤쓰를 \t\tshirt (nowadays 셔츠)\n" +
        "벌 \t\t\t\t\ta set (of dishes), a suit (of clothes), a copy (of documents)\n" +
        "어련히 \t\t\t\tsurely, certainly, naturally, as a matter of course\n" +
        "굳이 \t\t\t\t\tfirmly, positively, adamantly, stubbornly\n" +
        "닢 \t\t\t\t\ta piece of copper coin\n" +
        "주무르다 \t\t\t\tinveigle, cajole, coax, humor, have (a person) under one's thumb\n" +
        "어림없다 \t\t\t\tbe far from; be beyond (one); be beyond the stretch of (imagination)\n" +
        "조촐하다 \t\t\t\t(be) snug, cozy; dapper, refined, neat, tidy\n" +
        "면상 (面上)\t\t\t\tlooks, features, a countenance\n" +
        "짝짝이 \t\t\t\tan unmatched pair, a wrongly matched pair\n" +
        "드러나다 \t\t\t\tshow (display) itself, reveal itself, be expressed\n" +
        "노끈 \t\t\t\t\ta string, a small cord\n" +
        "보험료 (保險料)\t\t\tan insurance premium\n" +
        "처지 (處地)\t\t\t\ta situation, a condition, one's standing (status), one's means\n" +
        "가리다 \t\t\t\tsingle out, choose, discriminate (between), be particular (about food)\n" +
        "수중에 (手中-)\t\t\tin one’s hands, within one's power\n" +
        "긴요성 (緊要性)\t\t\timportance, burning, necessity\n" +
        "심각하다 (深刻)\t\t\tbe serious, grave, keen, acute, poignant\n" +
        "운동삼아 (運動) \t\t\tas a physical exercise\n" +
        "나다니다 \t\t\t\tgo out, gad about\n" +
        "고층 (高層)\t\t\t\thigher stories, upper floors\n" +
        "건물 (建物)\t\t\t\ta building, a structure\n" +
        "문화주택 (文化住宅)\t\ta modern house\n" +
        "정신 (精神)\t\t\t\tmind, spirit, soul, will, mentality\n" +
        "가주 (家主)\t\t\t\tthe head of a family [household]\n" +
        "튀다 \t\t\t\t\tit springs; snaps shut; bounce; spatter\n" +
        "메기 \t\t\t\t\ta catfish, a sheatfish\n" +
        "매끈매끈하다 \t\t\tbe very smooth (slimy, slippery)\n" +
        "등덜미 [-떨미]\t\t\tthe upper part of the neck\n" +
        "운전수 (運轉手)\t\t\ta driver, a chauffeur\n" +
        "부릅뜨다 \t\t\t\tglare fiercely, make (one's eyes) glare\n" +
        "금시갯줄 (金-)\t\t\ta gold watch strap\n" +
        "번쩍거리다 \t\t\t\tglitter, glisten, twinkle\n" +
        "살지다 \t\t\t\tbe fat, fleshy\n" +
        "중년 (中年)\t\t\t\tmiddle age\n" +
        "신사 (紳士) \t\t\t\ta gentleman\n" +
        "빙그레 \t\t\t\twith a beaming face, beamingly, smilingly\n" +
        "원통 (冤痛)\t\t\t\tresentment, mortification, chagrin\n" +
        "교섭하다 (交涉)\t\t\tnegotiate (with a person about a matter), treat (confer, bargain) with (a person)\n" +
        "이꼴 \t\t\t\t\tthis shape, form, appearance\n" +
        "개미 \t\t\t\t\tan ant\n" +
        "떼 \t\t\t\t\ta group, a crowd, a throng, a bunch\n" +
        "파리 \t\t\t\t\ta fly, a housefly\n" +
        "인연 (因緣)\t\t\t\ta relation; ties; affinity, bond\n" +
        "즉시 (卽時), 그 즉시로\t\tinstant, at once; right then and there, on the spot\n" +
        "송장 \t\t\t\t\ta dead body, a corpse, a cadaver\n" +
        "다름없다 \t\t\t\tbe similar, like , be as good as, be not different (from)\n" +
        "그러다도 = 그러다가도\t\teven after carrying on like this for a while...\n" +
        "엎지르다 \t\t\t\tspill, slop\n" +
        "그야말로 \t\t\t\tindeed, really, quite\n" +
        "관변 (官邊)\t\t\t\tgovernment circles, official quarters\n" +
        "유력자 (有力者)\t\t\tan influential person, a power\n" +
        "통하다 (通)\t\t\t\tgo (passes) through, get through\n" +
        "비밀리에 (秘密裡)\t\t\tin secret, in private, privately\n" +
        "연안 (沿岸)\t\t\t\tthe coast, the shore\n" +
        "나진 \t\t\t\t\tthe city of Najin (North Hamgyŏng Province)\n" +
        "관청 (官廳)\t\t\t\ta government office\n" +
        "축항 (築港)\t\t\t\tharbor construction\n" +
        "용지 (用地)\t\t\t\tland required (for works), a lot, a site\n" +
        "매수(를) 하다 (買收)\t\tpurchase\n" +
        "불원하다 (不遠)\t\t\t1) be not distant 2) be not far in the future\n" +
        "당국자 (當局者)\t\t\ta person in authority\n" +
        "황무지 (荒蕪地)\t\t\ta wasteland, a wilderness, a waste\n" +
        "전답 (田畓)\t\t\t\tfarms, fields, dry fields and paddy fields\n" +
        "뻘겋다 (뻘게)\t\t\tbe red, crimson, ruddy\n" +
        "매 (每)\t\t\t\tevery, each\n" +
        "평 (坪)\t\t\t\ta unit of area\n" +
        "시굴 = 시골 \t\t\tthe country, a rural district\n" +
        "평당 (坪當) \t\t\t\tper p’yŏng, for each p’yŏng\n" +
        "화중지병 (畵中之餠)\t\tpie in the sky, a desirable but unobtainable objects\n" +
        "관잣놀이 = 관자놀이 (貫子-) \tthe temple\n" +
        "욱신거리다 \t\t\t\t1) tingle, throb with pain, smart 2) swarm, throng, teem(with)\n" +
        "시각 (時刻)\t\t\t\tthe time of day, time, hour, a short time\n" +
        "개항 (開港) \t\t\t\tthe opening of a port\n" +
        "끌다\t\t\t\t\tdrag on, drag out, take a long time\n" +
        "당년 (當年)\t\t\t\tthe year, that year\n" +
        "땅 \t\t\t\t\tland\n" +
        "NOUN 나름이다 \t\t\tdepend on NOUN, be dependent on NOUN, rest (lie) with NOUN\n" +
        "요지 (要地)\t\t\t\tan important place, a strategic point\n" +
        "이상 (以上)\t\t\t\tmore than, over, above, beyond\n" +
        "최소 (最小)\t\t\t\tthe smallest, the fewest, the minimum, the least\n" +
        "대관절 (大關節)\t\t\tWH- on earth, WH- in the world, WH- in the name of God\n" +
        "자본 (資本)\t\t\t\tcapital, a fund\n" +
        "운동(을) 하다 (運動)\t\tmove, scare up (funds, capital)\n" +
        "설계도 (設計圖)\t\t\ta blueprint\n" +
        "복사 (複寫)\t\t\t\ta reproduction, a duplicate, a copy\n" +
        "비용 (費用)\t\t\t\texpense, cost, expenditure\n" +
        "순이익 (純利益)\t\t\tnet profit\n" +
        "할 (割)\t\t\t\t10%\n" +
        "자국 \t\t\t\t\ta mark, a print, an impression, a trace, a track, a trail\n" +
        "선례 (先例) = 전례 (前例)\t\tprecedent\n" +
        "만주 (滿洲)\t\t\t\tManchuria\n" +
        "미묘하다 (微妙)\t\t\tbe delicate, subtle, nice\n" +
        "사명 (使命)\t\t\t\ta mission; a commission, an errand\n" +
        "상식 (常識)\t\t\t\tcommon sense, good sense\n" +
        "추측 (推測)\t\t\t\tguess, conjecture, supposition, presumption\n" +
        "어째 \t\t\t\t\twhy, for what reason, how is it that\n" +
        "종일 (終日)\t\t\t\tall day, all day long, all through the day, from morning till night\n" +
        "흥정 \t\t\t\t\ta bargain, buying and selling, marketing\n" +
        "미닫이 [미다지]\t\t\ta sliding window\n" +
        "틀 \t\t\t\t\ta frame, framework\n" +
        "여간 아니다 \t\t\tbe uncommon, unusual, extraordinary, remarkable\n" +
        "거북패 (--牌)\t\t\t\tdivination by trying to match a set of 32 dominoes made in tortoise shapes with the corresponding cards\n" +
        "단번에 (單番)\t\t\timmediately, at once; only once, once and for all\n" +
        "심상하다 (尋常)\t\t\tbe ordinary, common, usual\n" +
        "담배 \t\t\t\t\ttobacco, a cigarette\n" +
        "출출하다 \t\t\t\tbe with empty stomach, be somewhat hungry; peckish\n" +
        "컬컬하다 \t\t\t\tbe thirsty, dry\n" +
        "수채 (水彩)\t\t\t\ta sewer, a drain, a ditch\n" +
        "막히다 \t\t\t\tbe/get stopped up, be clogged, be chocked\n" +
        "오냐 \t\t\t\t\tyes, yea, well, all right (in response to sb of lower status)\n" +
        "출자 (出資)\t\t\t\tinvestment, contribution\n" +
        "권유 (勸誘)\t\t\t\tinvitation, inducement, exhortation, canvass, solicitation\n" +
        "수작 (酬酌)\t\t\t\texchanging words, talk, speech, an expression, a remark, a comment\n" +
        "놀랍다 (놀라워)\t\t\tbe surprising, wonderful, amazing\n" +
        "즉석에서 (卽席)\t\t\toffhandedly, instantly, impromptu, on the spot\n" +
        "가부 (可否)\t\t\t\tright or wrong, good or bad, proper or improper\n" +
        "잊다 \t\t\t\t\t1) forget; 2) take (keep) one's mind off, dismiss (sth) from one's mind\n" +
        "시시콜콜히 \t\t\t\toccasionally, frequently\n" +
        "캐묻다 (캐물어)\t\t\task inquisitively, be inquisitive (about)\n" +
        "가리키다 \t\t\t\tpoints at(to, toward), points with one's finger\n" +
        "소상히 (昭詳-)\t\t\tminutely, circumstantially, in detail, at length\n" +
        "청장 (淸帳)\t\t\t\tbalancing books; settling (squaring) accounts\n" +
        "장담 (壯談)\t\t\t\tassurance, vouching, guarantee, assertion\n" +
        "솔깃하다 \t\t\t\tbe interested (in), enthusiastic (about)\n" +
        "신탁회사 (信託會社)\t\ta trust company\n" +
        "금시발복 (今時發福)\t\tmaking a fortune overnight, \"going from rags to riches\", sudden wealth (success)\n" +
        "네깐놈 = 네까짓놈 \t\tsuch a fellow (creature) as you\n" +
        "멸시 (蔑視)\t\t\t\tcontempt, disdain, disregard\n" +
        "팩 \t\t\t\t\tweakly, feebly\n" +
        "노염 \t\t\t\t\tanger, indignation, displeasure\n" +
        "타협 (妥協)\t\t\t\tcompromise, an amicable agreement\n" +
        "으슬으슬 \t\t\t\tshivering\n" +
        "이를테면 \t\t\t\tas one might say, so to speak, as it were, in a way\n" +
        "사위 \t\t\t\t\ta son-in-law\n" +
        "격 (格)\t\t\t\tstanding, rank, class, grade\n" +
        "악하다 (惡)\t \t\t\tis bad, evil, wicked\n" +
        "훑어보다 \t\t\t\tgive a searching glance at, look carefully for or at, scrutinize\n" +
        "수소문 (搜所聞) \t\t\tinquiring into rumors\n" +
        "졸부 (猝富)\t\t\t\tsudden riches, an overnight millionaire\n" +
        "감감(무)소식 (-(無)消息)\t\tno news (having heard nothing) for a long time\n" +
        "관변 (官邊)\t\t\t\t(in) official[government] circles[quarters], government sources\n" +
        "후보지 (候補地)\t\t\ta proposed site, a first choice (for)\n" +
        "측량 (測量)\t\t\t\tmeasurement, mensuration, survey(ing), sounding\n" +
        "결점 (缺點)\t\t\t\ta fault, a defect, a flaw, a weak point\n" +
        "중지 (中止)\t\t\t\tdiscontinuance, suspension, interruption, stoppage\n" +
        "기민 (機敏)\t\t\t\tsmartness, shrewdness, quickness, promptness, readiness\n" +
        "처치 (處置)\t\t\t\tdisposal, management, dealing, a measure, a step\n" +
        "곤란 (困難)\t\t\t\tdifficulty, trouble, suffering, hardship\n" +
        "꾸미다 \t\t\t\taffect, pretend, make a show, disguise oneself\n" +
        "연극 (演劇)\t\t\t\ta play, (the) drama, dramatics\n" +
        "벼락 \t\t\t\t\ta thunderbolt, a stroke (shaft) of lightning\n" +
        "끼 = 끼니\t\t\t\ta meal (breakfast, lunch, dinner), a regular (scheduled) meal\n" +
        "친자 (親子)\t\t\t\ta close contact with one's teacher\n" +
        "의리 (義理)\t\t\t\tthe principles of righteousness, a moral sense, a sense of duty (honor)\n" +
        "도리다 \t\t\t\tcut (out) round, gouge\n" +
        "탄식하다 (歎息)\t\t\tsigh, heave (draw) a sigh, lament, deplore\n" +
        "그립다 (그리워)\t\t\tbe (sorely)missed, be longed-for, be yearned-after, be cherished\n" +
        "고요히 \t\t\t\tquietly, still, calmly, peacefully\n" +
        "극성스럽다 (極盛-)\t\t\tbe impatient, be impetuous, be overeager, be upset\n" +
        "징조 (徵兆)\t\t\t\ta sign, an indication, an omen\n" +
        "예년 (例年)\t\t\t\tan ordinary year, a normal year, the regular year\n" +
        "무서리 \t\t\t\tthe first frost, the early frost\n" +
        "울타리 \t\t\t\ta (twig) fence, a hedge, an enclosure\n" +
        "데치다 \t\t\t\tparboil\n" +
        "무르녹다 \t\t\t\t1) get fully ripe, matures 2) (shade) is deep, (a plant) is at its best\n" +
        "띵하다 \t\t\t\thave a deep-seated (or dull) pain\n" +
        "위로 (慰勞)\t\t\t\tconsolation, solace, comfort\n" +
        "엇저녁 \t\t\t\tlast evening, last night\n" +
        "청요리집 (淸料理-)\t\t\ta Chinese restaurant\n" +
        "추탕 (鰍湯) = 추어탕 (鰍魚湯) \tloach soup\n" +
        "새로\t\t\t\t\t(when telling time) after 12\n" +
        "두 점을 치다\t\t\t(clock) strikes 2\n" +
        "조반 (朝飯)\t\t\t\tbreakfast\n" +
        "술 \t\t\t\t\ta spoonful\n" +
        "뜨다 \t\t\t\t\teat a bit of (rice)\n" +
        "혀 \t\t\t\t\ttongue\n" +
        "뻑뻑하다 \t\t\t\tdry and hard\n" +
        "오정 (午正)\t\t\t\tnoon, midday\n" +
        "해장술 (解酲-)\t\t\talcohol used as a hangover-chaser\n" +
        "부지런히\t\t\t\tdiligently, assiduously\n" +
        "베\t\t\t\t\tramie cloth\n" +
        "발\t\t\t\t\tblinds (usually made of bamboo)\n" +
        "웬일 \t\t\t\t\twhat matter, what cause\n" +
        "밀어젖히다 \t\t\t\tpush (thrust) away (aside), force (push) aside (out of the way)\n" +
        "정신 (精神)\t\t\t\tmind, spirit, soul, will\n" +
        "음습하다 (陰濕) \t\t\tbe dark and damp, shady and damp\n" +
        "끼치다 \t\t\t\tshudder, shiver, feel a chill creep (over one), feel one's flesh creep (all over)\n" +
        "시체 (屍體)\t\t\t\ta corpse, a dead body\n" +
        "약병 (藥甁)\t\t\t\ta medicine bottle, a vial\n" +
        "파출소 (派出所)\t\t\ta branch office, a police box\n" +
        "명예 (名譽)\t\t\t\thonor, fame, prestige\n" +
        "애원 (哀願)\t\t\t\tan appeal, supplication, pleading\n" +
        "엎드리다 \t\t\t\tprostrate oneself, lie on the ground\n" +
        "끌어안다 \t\t\t\thug, embrace\n" +
        "부친 (父親)\t\t\t\ta father\n" +
        "보험 (保險)\t\t\t\tinsurance, assurance\n" +
        "간이 (簡易)\t\t\t\tsimplicity, handiness, easiness\n" +
        "상등 (上等)\t\t\t\tthe first class, the best grade\n" +
        "진견\t\t\t\t\t???\n" +
        "수의 (壽衣)\t\t\t\ta shroud, garments for the dead\n" +
        "일습 (一襲)\t\t\t\tone suit (of clothes)\n" +
        "구색 (具色)\t\t\t\tassortment, an assortment of goods\n" +
        "선산 (先山)\t\t\t\tan ancestral graveyard (in the hill)\n" +
        "묻다 \t\t\t\t\tbury\n" +
        "특등지 (特等地)\t\t\ttop-grade land\n" +
        "널찍하다 \t\t\t\tbe rather wide, broad, open, roomy\n" +
        "장례식 (葬禮式)\t\t\ta funeral ceremony, a funeral service\n" +
        "초라하다 \t\t\t\tbe shabby, miserable, wretched (poor) looking\n" +
        "소위 (所謂)\t\t\t\twhat is called, the so-called\n" +
        "영결식 (永訣式)\t\t\ta funeral ceremony (services)\n" +
        "거나하다 \t\t\t\tbe tipsy, mellow, slightly intoxicated (drunk)\n" +
        "잡히다 \t\t\t\tput (a thing) in (at) pawn, have (a thing) taken as security\n" +
        "부의 (賻儀)\t\t\t\tgoods or gifts to aid in funeral\n" +
        "장례비 (葬禮費)\t\t\tfuneral expenses\n" +
        "곱빼기 \t\t\t\tdouble measure (of wine)\n" +
        "제법 \t\t\t\t\tquite, fairly, considerably, pretty\n" +
        "반반하다 \t\t\t\tbe comely, handsome\n" +
        "조객 (弔客)\t\t\t\ta caller (visitor) for condolence\n" +
        "예복 (禮服) \t\t\t\ta full dress, a ceremonial dress\n" +
        "두엇 \t\t\t\t\tabout two, a couple of\n" +
        "고인 (故人)\t\t\t\tthe deceased, the departed, the dead\n" +
        "무용가 (舞踊家)\t\t\ta dancer\n" +
        "덩달아 \t\t\t\tfollowing suit; in succession, in sympathy\n" +
        "삼키다 \t\t\t\tswallow, gulp down, gulp\n" +
        "끽끽거리다 \t\t\t\tshriek, scream\n" +
        "신식 (新式)\t\t\t\ta new style (type, method)\n" +
        "상복 (喪服)\t\t\t\tmourning clothes (dress), sables\n" +
        "향불 [-뿔] (香-)\t\t\tan incense fire, burning incense\n" +
        "절하다 \t\t\t\tbow, make an obeisance\n" +
        "꾸벅거리다 \t\t\t\trepeatedly make bows\n" +
        "지껄이다 \t\t\t\tchatter, gabble, jabber\n" +
        "분향하다 (焚香)\t\t\tburn (offer) incense\n" +
        "시뻘겋다 (시뻘게)\t\t\tbe crimson, deep red\n" +
        "향 (香) \t\t\t\tincense, perfume\n" +
        "움큼 \t\t\t\t\ta handful\n" +
        "연기 (煙氣)\t\t\t\tsmoke, fume\n" +
        "시커멓다 (시커메)\t\t\tbe jet-black, deep-black\n" +
        "불이 일어나다 \t\t\ta fire starts\n" +
        "쓰다듬다 \t\t\t\tstroke (one's beard)\n" +
        "조사 (弔辭)\t\t\t\ta funeral address, a memorial address\n" +
        "호사 (豪奢)\t\t\t\tluxury, extravagance\n" +
        "아무튼지 = 아무렇튼지 \t\tanyhow, no matter what, in any event\n" +
        "밀어내다 \t\t\t\tpush, shove, thrust away; elbow\n" +
        "후련하다 \t\t\t\tfeel relieved (better, easier), feel unburdened\n" +
        "멈칫 \t\t\t\t\tstop abruptly for a moment, flinch, wince\n" +
        "울음 \t\t\t\t\tcrying, weeping\n" +
        "먼저 \t\t\t\t\tfirst, before anything else\n" +
        "터지다 \t\t\t\texplode, burst, break out\n" +
        "도로 \t\t\t\t\tback, as ever (before), (over) again\n" +
        "\n";
    let test = isHangul(str);
    let prelim = [];
    for (let i = 0; i < str.length + 1; i++) {
        let stringResult = str[i];
        let isHangul = test[i];
        prelim.push({stringResult: stringResult,isHangul: isHangul});
    }
    for (let j of prelim) {
        if (j.isHangul === true) {
            hangulResult.push(j.stringResult);
        } else if (j.isHangul === false) {
            notHangulResult.push(j.stringResult);
        }
    }
    console.log(hangulResult);
    console.log(notHangulResult);
    return hangulResult;
}


function isHangul(str, options) {
    if (
        options !== undefined &&
        options.removeSpace
    )
        str = str.replace(/(\s*)/g, "");

    var result = [];

    for (var i = 0; i < str.length; i++) {
        var uniChar = str.charCodeAt(i);

        if (
            options !== undefined &&
            options.onlyCombined
        )
            result.push(
                uniChar >= 0xAC00 &&
                uniChar <= 0xD7A3
            );
        else
            result.push(
                (
                    uniChar >= 0x1100 &&
                    uniChar <= 0x11FF
                ) ||
                (
                    uniChar >= 0x3130 &&
                    uniChar <= 0x318F
                ) ||
                (
                    uniChar >= 0xAC00 &&
                    uniChar <= 0xD7A3
                )
            );
    }
    return result;
}