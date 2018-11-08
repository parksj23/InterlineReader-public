import React, {Component} from 'react';
import Divider from "@material-ui/core/Divider";
import "./styles/Poktekpang.css";


var Highlight = require('react-highlighter');


class Poktekpang extends Component {

  renderStory = () => {
    if (this.props.language === 'korean') {
      return (
        <div className="col-lg-12 context korVer" id="theHeader">
          <div className={'storyHeader'} style={{display: "flex", width: "100%", whiteSpace: 'noWrap', paddingTop: "25px"}}>
          <span style={{textAlign:'left', width: "50%"}}>
            <h3> 복덕방 (福德房) </h3>
          </span>
          <span style={{textAlign:'Right', width: "50%"}}>
            <h3>이 태준(INSERT HANJA HERE)</h3>
          </span>
          </div>

          
          <Divider style={{marginTop: "18px", marginBottom: "18px", paddingLeft: "15px", paddingRight: "15px"}}/>
        
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>철썩, 앞집 판장 밑에서 물 내버리는 소리가 났다. 주먹구구에 골독했던 안초시 (安初試)에게는 놀랄 만한 폭음이었던지, 다리 부러진 돋보기 너머로, 똑 모이를 쪼으려는 닭의 눈을 해 가지고 수채구멍을 내다본다. 뿌연 뜨물에 휩쓸려 나오는 것이 여러 가지다. 호박 꼭지, 계란 껍질, 거피해 버린 녹두 껍질.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>녹두 빈자떡을 부치는 게로군. 흥.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>한 오륙 년째 안초시는 말끝마다 젠장...이 아니면 흥! 하는 코웃음을 잘 붙이었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>추석이 벌써 낼 모레지! 젠장.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>안초시는 저도 모르게 입맛을 다시었다. 기름내가 코에 풍기는 듯 대뜸 입 안에 침이 흥건해지고 전에 괜찮게 지낼 때, 충치니 풍치니 하던 것은 거짓말이었던 것처럼 아래윗니가 송곳 끝같이 날카로워짐을 느끼었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>안초시는 그 날카로워진 이를 빈 입인 채 빠드득 소리가 나게 한번 물어 보고 고개를 들었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하늘은 천리같이 트였는데 조각구름들이 여기저기 널리었다. 어떤 구름은 깨끗이 바래 말린 옥양목처럼 흰빛이 눈이 부시다. 안초시는 이내 자기의 때묻은 적삼 생각이 났다. 소매를 내려다보는 그의 얼굴은 날래 들리지 않는다. 거기는 한 조박의 녹두빈자나 한 잔의 약주로써 어쩌지 못할, 더 슬픔과 더 고적함이 품겨 있는 것 같았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>혹혹 소매 끝을 불어 보고 손 끝으로 튀겨 보기도 하다가 목침을 세우고 눕고 말았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>이사는 팔 하고 사오는 이십이라 천이 되지.... 가만...... 천이라? 사로 했으니 사천이라 사천 평..... 매 평에 아주 줄여 잡아 오 환씩만 하게 돼두 사 환 칠십오 전씩이 남으니, 그럼.... 사사는 십륙 일만 육천 환하구.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>안초시가 다시 주먹구구를 거듭해서 얻어 낸 총액이 일만 구천 원, 단 천 원만 들여도 일만 구천 원이 되리라는 셈속이니, 만 원만 들이면 그게 얼만가? 그는 벌떡 일어났다. 이마가 화끈했다. 도사렸던 무릎을 얼른 곧추세우고 뒤나 보려는 사람처럼 쪼그렸다. 마코 갑이 번연히 빈 것인 줄 알면서도 다시 집어다 눌러 보았다. 주머니에는 단돈 십 전, 그도 안경다리를 고친다고 벌써 세 번짼가 네 번째 딸에게서 사오십 전씩 얻어 가지고는 번번이 담뱃값으로 다 내어보내고 말던 최후의 십 전, 안초시는 주머니에 손을 넣어 그것을 집어내었다. 백통화 한푼을 얹은 야윈 손바닥, 가만히 떨리었다. 서참위(徐參慰)의 투박한 손을 생각하면 너무나 얇고 잔망스러운 손이거니 하였다. 그러나 이따금 술잔은 얻어 먹고, 이렇게 내 방처럼 그의 복덕방에서 잠까지 빌려 자건만 한 번도, 집 거간이나 해먹는 서참위의 생활이 부럽지는 않았다. 그래도 언제든지 한 번쯤은 무슨 수가 생기어 다시 한번 내 집을 쓰게 되고, 내 밥을 먹게 되고, 내 힘과 내 낯으로 다시 한번 세상에 부딪쳐 보려니 믿어졌다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 전에 어떤 관상쟁이의 엄지손가락을 안으로 넣고 주먹을 쥐어야 재물이 나가지 않는다는 말이 생각났다. 늘 그렇게 쥐노라고는 했지만 문득 생각이 나 내려다볼 때는, 으레 엄지손가락이 얄밉도록 밖으로만 쥐어져 있었다. 그래 드팀전을 하다도 실패를 하였고, 그래 집까지 잡혀서 장전을 내었다가도 그만 화재를 보았거니 하는 것이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>이놈의 엄지손가락아, 안으로 좀 들어가아, 젠장.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 연습삼아 엄지손가락을 먼저 안으로 넣고 아프도록 두 주먹을 꽉 쥐어 보았다. 그리고 당장 내어보낼 돈이면서도 그 십전짜리를 그렇게 쥔 주먹에 단단히 넣고 담배 가게로 나갔다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>이 복덕방에는 흔히 세 늙은이가 모이었다.&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>언제 누가 와, 집 보러 가잘지 몰라, 늘 갓을 쓰고 앉아서 행길을 잘 내다보는, 얼굴 붉고 눈방울 큰 노인이 주인 서참위다. 참위로 다니다가 합병 후에는 다섯 해를 놀면서 시기를 엿보았으나 별수가 없을 것 같아서 이럭저럭 심심파적으로 갖게 된 것이 이 가옥 중개업(家屋 仲介業)이었다. 처음에는 겨우 굶지 않을 만한 수입이었으나 대정 팔구년 이후로는 시골 부자들이 세금(稅金)에 몰려, 혹은 자녀들의 교육을 위해 서울로만 몰려들고, 그런데다 돈은 흔해져서 관철동(貫鐵洞) 다옥정 (茶屋町) 같은 중앙 지대에는 그리 고옥만 아니면 만 원대를 예사로 훌훌 넘었다. 그 판에 봄 가을로 어떤 달에는 삼사백 원 수입이 있어, 그러기를 몇 해를 지나 가회동(嘉會洞)에 수십 간 집을 세웠고 또 몇 해 지나지 않아서는 창동(倉洞) 근처에 땅을 장만하기 시작하였다. 지금은 중개업자도 많이 늘었고 건양사(建陽社) 같은 큰 건축회사 (建築會社)가 생기어서 당자끼리 직접 팔고 사는 것이 원칙처럼 되어 가기 때문에 중개료의 수입은 전보다 훨씬 준 셈이다. 그러나 이십여 간 집에 학생을 치고 싶은 대로 치기 때문에 서참위의 수입이 없는 달이라고 쌀값이 밀리거나 나뭇값에 졸릴 형편은 아니다.&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>세상은 먹구 살게는 마련야...</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>서참위가 흔히 하는 말이다. 칼을 차고 훈련원에 나서 병법을 익힐 제는, 한번 호령만 하고 보면 산천이라도 물러설 것 같던, 그 기개와 오늘의 자기, 한낱 가쾌(家쾌)로 복덕방 영감으로 기생 갈보 따위가 사글셋방 한 간을 얻어 달래도 녜 녜 하고 따라나서야 하는, 만인의 심부름꾼인 것을 생각하면 서글픈 눈물이 아니 날 수도 없는 것이다. 워낙 술을 즐기기도 하지만 어떤 때는 남몰래 이런 감회(感懷)를 이기지 못해서 술집에 들어선 적도 여러 번이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러나 호반 (武人)들의 기개란 흔히 혈기 (血氣)에서 나오는 것이기 때문이지 몸에서 혈기가 줆을 따라 그런 감회를 일으킴조차 요즘은 적어지고 말았다. 하루는 집에서 점심을 먹다 듣노라니 무슨 장사치의 외는 소리인데 아무레도 귀에 익은 목청이다. 자세히 귀를 기울이니 점점 가까이 오는 소리인데 제법 무엇을 사라는 소리가 아니라 유리병이나 간장통 팔거쏘! 하는 소리이다. 그런데 그 목청이 보면 꼭 알 사람 같아, 일어서 마루 들창으로 내어다보니 이번에는 가마니나 신문 잡지나 팔거쏘 하면서 가마니 두어 개를 지고 한 손에는 저울을 들고 중노인이나 된 사나이가 지나가는데 아는 사람은 확실히 아는 사람이다. 그러나 그를 어디서 알았으며 성명이 무엇이며 애초에는 무엇을 하던 사람인지가 감감해지고 말았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>오오라! 그렇군..... 분명..... 저런!</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 그는 한참 만에 고개를 끄덕이었다. 그 유리병과 간장통을 외는 소리가 골목 안으로 사라져 갈 즈음에야 서참위는 그가 누구인 것을 깨달아낸 것이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>동관 (同官) 김참위..... 허!</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>나이는 자기보다 훨씬 연소하였으나 학식과 재기가 있는데다 호령 소리가 좋아 상관에게 늘 칭찬을 받던 청년 무관이었었다. 이십여 년 뒤에 들어도 갈데없이 그 목청이요, 그 모습이었다. 전날의 그를 생각하고 오늘의 그를 보니 저으기 감개에 사무치어 밥숟가락을 멈추고 냉수만 거듭 마시었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러나 전에 혈기 있을 때와 달라 그런 기분이 오래 가지는 않았다. 중학교 졸업반인 둘째아들이 학교에 갔다 들어서는 것을 보고, 또 싸전에서 쌀값 받으러 와 마누라가 선선히 시퍼런 지전을 내어 세는 것을 볼 때, 서참위는 이내 속으로,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>거저 살아야지 별수 있나. 저렇게 개가죽을 쓰고 돌아다니는 친구도 있는데.... 에헴.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하였을 뿐 아니라 그런 절박한 친구에다 대면 자기는 얼마나 훌륭한 지체냐 하는 자존심도 없지 않았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>지난일 그까짓 생각할 건 뭐 있나. 사는 날까지..... 허허.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여생을 웃으며 살 작정이었다. 그래 그런지 워낙 좀 실없을 티가 있은데다 요즘 와서는 누구에게나 농지거리가 늘어갔다. 그래 늘 눈이 달리고 뽀로통한 입으로는 말끝마다젠장 소리만 나오는 안초시와는 성미가 맞지 않았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>쫌보야, 술 한잔 사주랴?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>쫌보라는 말이 자기를 업수여기는 것 같아서 안초시는 이내 발끈해 가지고, 네깟놈 술 더러 안 먹는다 한다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>화투패나 밤낮 떼면 너이 어멈이 살아온다덴?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 서참위가 발끝으로 화투장들을 밀어던지면 그만 얼굴이 새빨개져서 쌔근쌔근하다가 부채면 부채, 담뱃갑이면 담뱃갑, 자기의 것을 냉큼 집어 들고 안 올 듯이 새침해 나가 버리는 것이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>조게 계집이문 천생 남의 첩 감이야.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 서참위는 껄껄 웃어버리나 안초시는 이렇게 돼서 올라가면 한 이틀씩 보이지 않았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>한번은 안초시의 딸의 무용횟(舞俑會)날 밤이었다. 안경화(安京華)라고, 한동안 토월회(土月會)에도 다니다가 대판(大阪)에 가 있느니 동경(東京)에 가 있느니 하더니 오륙 년 뒤에 무용가노라 이름을 날리며 서울에 나타났다. 바로 제일회 공연날 밤이었다. 서참위가 조르기도 했지만, 안초시도 딸의 사진과 이야기가 신문마다 나는 바람에 어깨가 으쓱해서 공표를 얻을 수 있는 대로 얻어 가지고 서참위뿐 아니라 여러 친구를 돌라줬던 것이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>허! 저기 한가운데서 지금 한창 다릿짓하는 게 자네 딸인가?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>남은 다 멍멍히 앉았는데 서참위가 해괴한 것을 보는 듯, 마땅치 않은 어조로 물었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>무용이란 건 문명국일수록 벗구 한다네그려.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>약기는 한 안초시는 미리 이런 대답으로 막았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>모르겠네 원..... 지금 총각놈들은 모두 등신인가 바......</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>왜?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 이번에는 다른 친구가 탄하였다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>우린 총각 시절에 저런 걸 보면 그냥 못 배기네.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>빌어먹을 녀석..... 나잇값을 못하구 개야 저건 개.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>벌써 안초시는 분통이 발끈거려서 나오는 소리였다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>한 가지가 끝나고 불이 환하게 켜졌을 때다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>도루 차라리 여배우 노릇을 댕기라고 그래라. 여배운 그래두 저렇게 넓적다린 내놓구 덤비지 않더라.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그 자식 오지랖 경치게 넓네. 네가 안방 건는방이 몇 칸이 요나 알았지 뭘 쥐뿔이나 안다구 그래? 보기 싫건 나가렴.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 안초시는 화를 발끈 내었다. 그러니까 서참위도 안방 건넌방 말에 화가 나서 꽤 높은 소리로,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>넌 또 뭘 아니? 요 쫌보야.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 일어서 버리었다.&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>이 일이 있은 후 안초시는 거의 달포나 서참위의 복덕방에 나오지 않았었다. 그런 걸 박희완(朴喜完) 영감이 가서 데리고 왔었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>박희완 영감이란 세 영감 중의 하나로 안초시처럼 이 복덕방에 와 자기까지는 안하나 꽤 쑬쑬히 놀러 오는 늙은이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>아니, 놀러 오기만 하는 것이 아니라 와서는 공부도 한다. 재판소에 다니는 조카가 있어 대서업 (代書嶪) 운동을 한다고 속수국어독본 (涑修國語讀本)을 노상 끼고 와 그 삼국지 (三國志) 읽던 투로,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>긴상 도꼬에 유끼이 마쑤까.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>어쩌고를 외고 있는 것이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러나 속수국어독본 뚜껑이 손때에 절고, 또 어떤 때는 목침 위에 받쳐 배고 낮잠도 자서 머리때까지 새까맣게 절어 조선총독부 편찬 (朝鮮總督府 編簒)이란 잔 글자들은 보이지 않게 되도록, 대서업 허가는 의연히 나오지 않는 모양이었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>너나 내나 다 산 것들이 업은 가져 뭘 허니. 무슨 세월에..... 흥!</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 어떤 때, 안초시는 한나절이나 화투패를 떼다 안 떨어지면 그 화풀이로 박희완 영감이 들고 중얼거리는 속수국어독본을 툭 채어 행길로 팽개치며 그랬다.&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>넌 또 무슨 재술 바라구 밤낮 화토패나 떨어지길 바라니?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>난 심심풀이지.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러나 속으로는 박희완 영감보다 더 세상에 대한 야심이 끓었다. 딸이 평양으로 대구로 다니며 지방 순회까지 하여서 제법 돈냥이나 걷힌 것 같으나 연구소를 내느라고, 집을 뜯어 고친다. 유성기를 사들인다. 교제를 하러 돌아다닌다 하느라고, 더구나 귀찮게만 아는 이 애비를 위해 쓸 돈은 예산에부터 들지 못하는 모양이었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>얘? 낡은 솜이 돼 그런지, 삯바느질이 돼 그런지 바지 솜이 모두 치어서 어떤 덴 홑옷이야. 암만해두 사쓸 한벌 사 입어야겠다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 딸의 눈치만 보아 오다 한번은 입을 열었더니,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>어련히 인제 사 드릴라구요.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 딸은 대답은 선선하였으나 샤쓰는 그 해 겨울이 다 지나도록 구경도 못하였다. 샤쓰는커녕 안경다리를 고치겠다고 돈 일 원만 달래도 일 원짜리를 굳이 바꿔다가 오십 전 한 닢만 주었다. 안경은 돈을 좀 주무르던 시절에 장만한 것이라 테만 오륙 원 먹는 것이어서 오십 전만으로 그런 다리는 어림도 없었다. 오십전짜리 다리도 있지만 살 바에는 조촐한 것을 택하던 초시의 성미라 더구나 면상에서 짝짝이로 드러나는 것을 사기가 싫었다. 차라리 종이 노끈인 채 쓰기로 하고 오십 전은 담뱃값으로 나가고 말았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>왜 안경다린 안 고치셨어요?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>딸이 그날 저녁으로 물었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>흥.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 말은 하지 않았다. 딸은 며칠 뒤에 또 오십 전을 주었다. 그러면서 어떻게 들으라고 하는 소리인지,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>아버지 보험료나 해두 한 달에 삼 원 팔십 전씩 나가요.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하였다. 보험료나 타 먹게 어서 죽어 달라는 소리로도 들리었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그게 내게 상관 있니?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>아버지 위해 들었지, 누구 위해 들었게요 그럼?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 정말 날 위해 하는 거문 살아서 한푼이라두 다우. 죽은 뒤에 내가 알 게 뭐냐 소리가 나오는 것을 억지로 참았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>오십 전이문 왜 안경다릴 못 고치세요?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 설명하지 않았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>지금 아버지가 좋구 낮은 것을 가리실 처지야요?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러나 오십 전은 또 마코 값으로 다 나갔다. 이러기를 아마 서너 번째다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>자식도 소용 없어. 더구나 딸자식..... 그저 내 수중에 돈이 있어야.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 돈의 긴요성(緊要性)을 날로 날로 더욱 심각하게 느끼었다.&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>돈만 가지면야 좀 좋은 세상인가!</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>심심해서 운동삼아 좀 나다녀 보면 거리마다 짓느니 고층건축 (高層建築)들이요, 동네마다 느느니 그림 같은 문화주택(文化住宅)들이다. 조금만 정신을 놓아도 물에서 가주 튀어나 온 메기처럼 미끈미끈한 자동차가 등덜미에서 소리를 꽥 지른다. 돌아다보면 운전수는 눈을 부릅떴고 그 뒤에는 금시곗줄이 번쩍거리는 살진 중년 신사가 빙그레 웃고 앉았는 것이었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>예순이 낼 모레..... 젠장할 것.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 늙어 가는 것이 원통하였다. 어떻게 해서나 더 늙기 전에 적게 돈 만 원이라도 붙들어 가지고 내 손으로 다시 한번 이 세상과 교섭해 보고 싶었다. 지금 이 꼴로서야 문화주택이 암만 서기로 내게 무슨 상관이며 자동차 비행기가 개미떼나 파리떼처럼 퍼지기로 나와 무슨 인연이 있는 것이냐, 세상과 자기와는 자기 손에서 돈이 떨어진, 그 즉시로 인연이 끊어진 것이라 생각되었다.&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러면 송장이나 다름없지 뭔가?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 이런 질문을 자신에게 던지는 지가 이미 오래였다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>무슨 수가 없을까?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러다도,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그래도 돈냥이나 엎질러 본 녀석이 벌기도 하는 게지.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고, 그야말로 무슨 그루터기만 만나면 꼭 벌기는 할 자신이었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러다가 박희완 영감에게서 들은 말이었다. 관변에 있는 모 유력자를 통해 비밀리에 나온 말인데 황해 연안(黃海沿岸)에 제이의 나진(羅津)이 생긴다는 말이었다. 지금은 관청에서만 알 뿐이나 축항 용지(築港用地)는 비밀리에 매수되었으므로 불원하여 당국자로부터 공표(公表)가 있으리라는 것이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그럼, 거기가 황무진가? 전답들인가?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 눈이 뻘개 물었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>밭이라데.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>밭? 그럼 매 평 얼마나 간다나?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>좀 올랐대. 관청에서 사는 바람에 아무리 시골 사람들이기루 그만 눈치 없겠나. 그래두 무슨 일루 관청서 사는진 모르거든.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그래?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그래, 그리 오르진 않았대..... 아마 평당 이십오륙 전씩이면 있다나 보데. 그러니 화중지병이지 뭘 허나 우리가....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>음!</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 관잣놀이가 욱신거리었다. 정말이기만 하면 한 시각이라도 먼저 덤비는 놈이 더 먹는 판이다. 나진도 오륙 전 하던 땅이 한번 개항된다는 소문이 나자 당년으로 오륙 전의 백배 이상이 올랐고 삼사 년 뒤에는, 땅 나름이지만 어떤 요지(要地)는 천배 이상이 오른 데가 많다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>다 산 나이에 오래 끌 건 뭐 있나. 당년으로 넘겨두 최소한도 오 원씩야 무려할 테지.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>혼자 생각한 초시는,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>대관절 어디란 말야 거기가?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 나앉으며 물었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그걸 낸들 아나?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그럼?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그 모씨라는 이만 알지. 그러게 날더러 단 만 원이라도 자본을 운동하면 자기는 거기서도 어디어디가 요지라는 걸 설계도를 복사해 낸 사람이니까, 그 요지만 산단 말이지, 그리구 많이두 바라지 않어. 비용 죄다 제치구 순이익의 이 할만 달라는 거야.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그럴 테지.... 누가 그런 자국을 일러 주구 구경만 하자겠나..... 이 할이라..... 이 할.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 생각할수록 이것이 훌륭한, 그 무슨 그루터기가 될 것 같았다. 나진의 선례도 있거니와 박희완 영감 말이 만주국이 되는 바람에 중국과의 관계가 미묘해지므로 황해 연안에도 으레 나진과 같은 사명을 갖는 큰 항구가 필요할 것은 우리 상식으로도 추측할 바이라 하였다. 초시의 상식에도 그것을 믿을 수 있었다.&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>오늘은 오래간만에 피죤을 사서, 거기서 아주 한 대를 피워 물고 왔다. 어째 박희완 영감이 종일 보이지 않는다. 다른 데로 자금 운동을 다니나 보다 하였다. 서참위는 점심 전에 나간 사람이 어디서 흥정이 한 자리 떨어지느라고인지 아직 돌아오지 않는다. 안초시는 미닫이를 위에서 낡은 화투를 꺼내었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>허, 이거 봐라!</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여간해선 잘 떨어지지 않던 거북패가 단번에 뚝 떨어진다. 누가 옆에 있어 좀 보아 줬으면 싶었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>아무래두 이게 심상치 않어..... 이제 재수가 티나 부다!</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 반도 타지 않은 담배를 행길로 내어던졌다. 출출하던 판에 담배만 몇 대를 피고 나니 목이 컬컬해진다. 집앞 수채에는 뜨물에 떠내려가다 막힌 녹두 껍질이 그저 누렇게 보인다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>오냐, 내년 추석엔.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>초시는 이날 저녁에 박희완 영감에게서 들은 이야기를 딸에게 하였다. 실패는 했을지라도 그래도 십수 년을 상업계에서 논 안초시라 출자(出資)를 권유하는 수작만은 딸이 듣기에도 딴 사람인 듯 놀라웠다. 딸은 즉석에서는 가부를 말하지 않았으나 그의 머리 속에서도 이내 잊혀지지는 않았던지 다음날 아침에는, 딸 편이 먼저 이 이야기를 다시 꺼내었고, 초시가 박희완 영감에게 묻던 이상으로 시시콜콜히 캐어물었다. 그러면 초시는 또 박희완 영감 이상으로 손가락으로 가리키듯 소상히 설명하였고, 일 년 안에 청장을 하더라도 최소한도로 오십 배 이상의 순이익이 날 것이라 장담 장담하였다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>딸은 솔깃했다. 사흘 안에 연구소 집을 어느 신탁회사(信託會社)에 넣고 삼천 원(三千圓)을 돌리기로 하였다. 초시는 금시발복이나 된 듯 뛰고 싶게 기뻤다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>서참위 이놈, 날 은근히 멸시했것다. 내 굳이 널 시켜 네 집보다 난 집을 살 테다. 네깐놈이 천생 가쾌지 별거냐....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러나 신탁회사에서 돈이 되는 날은 웬 처음 보는 청년 하나가 초시의 앞을 가리며 나타났다. 그는 딸의 청년이었다. 딸은 아버지의 손에 단 일 전도 넣지 않았고 꼭 그 청년이 나서 돈을 쓰며 처리하게 하였다. 처음에는 팩 나오는 노염을 참을 수가 없었으나 며칠 밤을 지내고 나니, 적어도 삼천 원의 순이익이 오륙만 원은 될 것이라, 만 원 하나야 어디로 가랴 하는 타협이 생기어서 안초시는 으슬으슬 그, 이를테면 사위녀석 격인 청년의 뒤를 따라나섰다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>일 년이 지났다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>모두 꿈이었다. 꿈이라도 너무 악한 꿈이었다. 삼천 원어치 땅을 사놓고 날마다 신문을 훑어보며 수소문을 하여도 거기는 축항이 된단 말이 신문에도, 소문에도 나지 않았다. 용당포(龍塘浦)와 다사도(多師島)에는 땅값이 삼십 배가 올랐느니 오십 배가 올랐느니 하고 졸부들이 생겼다는 소문이 있어도 여기는 감감소식일 뿐 아니라 나중에 역시 이것도 박희완 영감을 통해 알고 보니 그 관변 모씨에게 박희완 영감부터 속아 떨어진 것이었다. 축항 후보지로 측량까지 하기는 하였으나 무슨 결점으로인지 중지되고 마는 바람에 너무 기민하게 거기다 땅을 샀던, 그 모씨가 그 땅 처치에 곤란하여 꾸민 연극이었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>돈을 쓸 때는 일 원짜리 한 장 만져도 못 봤지만 벼락은 초시에게 떨어졌다. 서너 끼씩 굶어도 밥 먹을 정신이 나지도 않았거니와 밥을 먹으러 들어갈 수도 없었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>재물이란 친자 간의 의리도 배추 밑 도리듯 하는 건가?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>탄식할 뿐이었다. 밥보다는 술과 담배가 그리웠다. 물론 안경다리는 그저 못 고치었다. 그러니 이제는 오십전짜리는커녕 단 십전짜리도 얻어 볼 길이 없다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>추석 가까운 날씨는 해마다의 그 때와 같이 맑았다. 하늘은 천리같이 트였는데 조각구름들이 여기저기 널리었다. 어떤 구름은 깨끗이 바래 말린 옥양목처럼 흰빛이 눈이 부시다. 안초시는 이번에도 자기의 때묻은 적삼 생각이 났다. 그러나 이번에는 소매 끝을 불거나 떨지는 않았다. 고요히 흘러내리는 눈물을 그 더러운 소매로 닦았을 뿐이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여름이 극성스럽게 덥더니, 추위도 그럴 징조인지 예년보다 무서리가 일찍 내리었다. 서참위가 늘 지나다니는 식은 관사(埴銀 官舍)에들 울타리가 넘게 피었던 코스모스들이 끓는 물에 데쳐낸 것처럼 시커멓게 무르녹고 말았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>참위는 머리가 띵하였다. 요즘 와서 울기 잘하는 안초시를 한번 위로해 주려, 엊저녁에는 데리고 나와 청요리집으로, 추탕집으로 새로 두 점을 치도록 돌아다닌 때문 같았다. 조반이라고 몇 술 뜨기는 했으나 혀도 그냥 뻑뻑하다. 안초시도 그럴 것이니까 해는 벌써 오정 때지만 끌고 나와 해장술이나 먹으리라 하고 부지런히 내려와 보니, 웬일인지 복덕방이라고 쓴 베발이 아직 내어걸리지 않았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>이 사람 봐아..... 어느 땐 줄 알구 코만 고누.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그러나 코고는 소리는 들리지 않았다. 미닫이를 밀어젖힌 서참위는 정신이 번쩍 났다. 안초시의 입에는 피, 얼굴은 잿빛이다. 방 안은 움 속처럼 음습한 바람이 휭 끼친다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>아니.....?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>참위는 우선 미닫이를 닫고 눈을 비비고 초시를 들여다보았다. 안초시는 벌써 아니요, 안초시의 시체일 뿐, 둘러보니 무슨 약병인 듯한 것 하나가 굴러져 있다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>참위는 한참 만에야 이 일이 슬픈 일인 것을 깨달았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>허.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>파출소로 갈까 하다 그래도 자식한테 먼저 알려야겠다 하고 말만 듣던 그 안경화무용연구소를 찾아가서 안경화를 데리고 왔다. 딸이 한참 울고 난 뒤다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>관청에 어서 알려야지?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>아니야요. 아스세요.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>딸은 펄쩍 뛰었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>아스라니?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>저.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>저라니?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>제 명예도 좀.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 그는 애원하였다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>명예? 안될 말이지, 명옐 생각하는 사람이 애빌 저 모양으로 세상 떠나게 해?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>안경화는 엎드려 다시 울었다. 그러다가 나가려는 서참위의 다리를 끌어안고 놓지 않았다. 그리고,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>절, 살려 주세요.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>소리를 몇 번이나 거듭하였다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그럼, 비밀은 내가 지킬 테니 나 하자는 대로 할까?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>네.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>서참위는 다시 앉았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>부친 위해 보험 든 거 있지?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>네, 간이보험이야요.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>무슨 보험이던..... 얼마나 타게 되누?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>사백팔십 원요.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>부친 위해 들었으니 부친 위해 다 써야지?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그럼요.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>에헴, 그럼.... 돌아간 이가 늘 속사쓸 입구퍼 했어. 상등 털사쓰를 사다 입히구, 그 우에 진견으로 수의 일습 구색 맞춰 짓게 허구..... 선산이 있나, 묻힐 데가?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>웬걸요, 없어요.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그럼 공동묘지라도 특등지루 널찍하게 사구..... 장례식을 장하게 해야 말이지 초라하게 해버리면 내가 그저 안 있을 게야. 알아들어?</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>네에.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 안경화는 그제야 핸드백을 열고 눈물 젖은 얼굴을 닦았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>안초시의 소위 영결식(永訣式)이 그 딸의 연구소 마당에서 열리었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>서참위와 박희완 영감은 술이 거나하게 취해 갔다. 박희완 영감이 무얼 잡혀서 가져왔다는 부의(賻儀) 이 원을 서참위가,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>장례비가 넉넉하니 자네 돈 그 계집애 줄 거 없네.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 우선 술집에 들러 거나하게 곱빼기들을 한 것이다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>영결식장에는 제법 반반한 조객들이 모여들었다. 예복을 차리고 온 사람도 두엇 있었다. 모두 고인을 알아 온 것이 아니요, 무용가 안경화를 보아 온 사람들 같았다. 그 중에는 고인의 슬픔을 알아 우는 사람인지, 덩달아 기분으로 우는 사람인지 울음을 삼키느라고 끽끽하는 사람도 있었다. 안경화도 양복으로 관 앞에 나와 향불을 놓고 절하였다. 그 뒤를 따라 한 이십 명 관 앞에 와 꾸벅거리었다. 그리고 무어라고 지껄이고 나가는 사람도 있었다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그들의 분향이 거의 끝난 듯하였을 때,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>에헴!</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 얼굴이 시뻘건 서참위도 한 마디 없을 수 없다는 듯이 나섰다. 향을 한 움큼이나 집어 놓아 연기가 시커멓게 올려 솟더니 불이 일어났다. 후후 불을 끄고, 수염을 한 번 쓰다듬고 절을 했다. 그리고 다시,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>헴.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하더니 조사(조)를 하였다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>나 서참윌세, 알겠나? 흥..... 자네 참 호살세 호사야..... 잘 죽었느니. 자네 살았으문 이만 호살 해 보겠나? 인전 안경다리 고칠 걱정두 없구..... 아무튼지.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하는데 박희완 영감이 들어서더니,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>이 사람 취했네그려.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하며 서참위를 밀어냈다.&nbsp;</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>박희완 영감도 가슴이 답답하였다. 분향을 하고 무슨 소리를 한마디 했으면 속이 후련히 트일 것 같아서 잠깐 멈칫하고서 있어 보았으나,</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>으흙.....</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>하고 울음이 먼저 터져 그만 나오고 말았다.</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>서참위와 박희완 영감도 묘지까지 나갈 작정이었으나 거기 모인 사람들이 하나도 마음에 들지 않아 도로 술집으로 내려오고 말았다. (정축)</Highlight></p>
<p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>&lt;가마귀, 1937&gt; (조광 1937.3)</Highlight></p>

</div>
      )
    }
    else if (this.props.language === 'english') {
      return (
        <div>
          <div className="col-lg-12 context engVer" style={{"fontFamily":'Georgia', paddingBottom: "1em"}} id="theHeader">
            <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
          <span style={{textAlign:'left', width: "50%"}}>
            <h3> Rain Shower </h3>
          </span>
              <span style={{textAlign:'Right', width: "50%"}}>
            <h3>Hwang Sun-won</h3>
          </span>
            </div>

            <Divider/>

            <Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>As soon as the boy saw the girl beside
              the stream, he realized that she must be the great-granddaughter of Master<i> </i>Yun. She had her hands
              in the water and was splashing it about. Probably she had never seen a stream like that in
              Seoul. </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> She
            had been playing with the water in the same manner for several days now, on the way home from school. Until
            the previous day she had played at the edge of the stream, but today she is right in the middle of the
            stepping-stones.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The boy sat down
            on the bank. He decided to wait until she got out of the way. </Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> As it happened, someone came along and she made
            way.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The next
            day, he arrived at the stream a little later. This time he found her washing her face, sitting there in the
            middle of the stepping-stones. In contrast to her pink jumper with its sleeves rolled up, the nape of her
            neck was
            very white. </Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                         matchStyle={{color: 'red'}}> After washing her face for a
            while, she stares intently into the water. She must be looking at her reflection. She makes a sudden grab at
            the water. Perhaps some baby fish were swimming by. </Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> There is no knowing if the girl is aware or not
            of the boy sitting on the bank as she goes on making nimble grabs at the water. But each time to no effect.
            She simply keeps grabbing at the water as if for the sheer fun of it. It looks
            as though she will only get out of the way if there&#8217;s someone crossing the stream, as on the previous
            day. </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Then she
            plucks something from the water. It was a white pebble. After that, she stands up and goes skipping lightly
            across the stepping-stones. </Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                         matchStyle={{color: 'red'}}> Once across, she
            turns round : " Hey, you." </Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                        matchStyle={{color: 'red'}}> The white pebble
            came flying over. </Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                               matchStyle={{color: 'red'}}> The boy found himself
            standing up.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                         matchStyle={{color: 'red'}}> Shaking her bobbed hair, she goes
            running off. She took the path between the reed beds. Then there was nothing but pale reed heads shining
            bright in the clear autumn sunlight.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                 matchStyle={{color: 'red'}}> The girl
            would soon reappear on the far side of the reeds. Then he began to think she was taking a long time. Still
            she did not appear. He stood on tiptoe. And he began to think she was taking an extremely long time.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Far away on the
            other side of the patch of reeds, a bunch of reeds was moving. The girl was hugging the reeds. Now she was
            walking slowly. The exceptionally bright sunshine shone on the girl&#8217;s reed-like hair. It was as if a
            reed, not the girl, was walking across the fields.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> The boy remains standing there until that reed
            can no longer be seen. Suddenly he looked down at the pebble she had thrown at him. The moisture had dried.
            He picked it up and put it in his pocket. </Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                       matchStyle={{color: 'red'}}> Starting
            the next day, he came down to the stream a little later. There was no trace of her. A good thing,
            too.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> It was
            strange, though. As the days without a sign of her went by, somewhere in the boy&#8217;s breast a feeling of
            loneliness was growing. He got into the habit of fingering the pebble in his
            pocket.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> One day,
            the boy sat down in the middle of the stepping stones, just where the girl had sat playing with the water.
            He dipped his hand in the water. He wiped his face. He stared into the water. His darkly tanned face looked
            back at
            him. He hated it.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                              matchStyle={{color: 'red'}}> The boy grabbed at the face
            in the water with both hands. Several times he grabbed at it. Then he suddenly sprang up in surprise. Why,
            the girl is coming, walking in this direction!</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> She was hiding, watching what I was doing. The
            boy started to run. He missed his step on a stone. One foot went into the water. He ran
            faster.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> If only
            there was somewhere he could hide. On this side there are no reeds. Just buckwheat fields. He had the
            impression the perfume from the buckwheat flowers was pricking his nostrils as never before. His head was
            spinning. A salty
            fluid seeped between his lips into his mouth. His nose was bleeding.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> Blocking his bleeding nose with one hand, the
            boy went running on. He had the impression of a voice following him, repeatedly calling out, Silly boy,
            silly boy.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                       matchStyle={{color: 'red'}}> Saturday came.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> When he reached the edge of the stream, the
            girl, whom he had not seen for several days, was sitting beside the stream playing with the water. He
            started to cross the stepping stones, pretending to ignore her. A few days previously,
            he had simply made a fool of himself in front of the girl, so today he crossed the stepping stones
            cautiously, whereas before he had walked across them as if they were a
            highway.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Hey!
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> He pretended not
            to hear. He climbed up the bank and stopped.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                         matchStyle={{color: 'red'}}> Hey,
            what kind of shell is this?</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                        matchStyle={{color: 'red'}}> Unthinkingly, he
            turned round. He found himself facing the girl&#8217;s bright dark eyes. He quickly turned his gaze to the
            girl&#8217;s palm.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                               matchStyle={{color: 'red'}}> It&#8217;s a butterfly
            clam.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                  matchStyle={{color: 'red'}}> That&#8217;s a pretty
            name.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> They
            reached the point where the path divided. From here the girl has to go a mile or so downhill, the boy two or
            three miles uphill.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                matchStyle={{color: 'red'}}> The girl stopped and said,
            Have you ever been beyond that hill?</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                 matchStyle={{color: 'red'}}> She
            pointed beyond the end of the fields.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                  matchStyle={{color: 'red'}}> Never.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Why don&#8217;t
            we go? Down here in the country, it&#8217;s so boring I can&#8217;t stand it. It&#8217;s a long way,
            anyway.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> How far
            do you mean by far? Up in Seoul we used walk a long way on picnics. The girl&#8217;s eyes seemed to be
            saying, Silly boy! Silly boy!</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                          matchStyle={{color: 'red'}}> They took a path
            between two paddy fields. They passed close to where the autumn harvest was under way.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> A scarecrow was standing there. The boy shook
            its straw rope. A few sparrows go flying off. The thought comes to him that he was supposed to go home early
            today to scare the sparrows from their main paddy field.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> This is
            fun!</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The girl is
            holding the scarecrows rope and is tugging at it. The scarecrow sways, seems to be dancing. A light dimple
            appeared on the girls left cheek.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                              matchStyle={{color: 'red'}}> A bit further
            away there is another scarecrow. The girl goes running toward it. The boy is running behind her. Its as if
            hes trying to forget that today he was supposed to go home early and help with the work.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> He just runs on
            close beside the girl. Grasshoppers strike their faces and leave them stinging. The perfectly clear azure
            sky of autumn starts to turn before the boys eyes. He is dizzy. Its because that eagle up there, that eagle
            up there, that eagle up there is turning.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                      matchStyle={{color: 'red'}}> Looking
            behind, the girl is shaking the scarecrow he has just run past. It sways better than the other one. At the
            place where the rice fields ended was a ditch. The girl jumped across it
            first.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> From
            there as far as the foot of the hills was all fields.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> They passed the top of a field where millet
            stalks were stacked together.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                          matchStyle={{color: 'red'}}> Whats
            that?</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> A
            shelter.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Look,
            little yellow melons. Are they good?</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                 matchStyle={{color: 'red'}}> Sure,
            theyre alright, but water melons taste better.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> If only I could eat one . .
            .</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The boy went
            into the field where white radishes have been sown among the remains of the melon plants and came back with
            two radishes hed pulled up. They were still not fully grown. After he had twisted off and thrown aside the
            leaves,
            he handed one to the girl. Then, as if to say this is how you eat it, after taking a bite at the larger end
            he peeled away a strip of the peel with his nails and bit into the flesh beneath.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The girl followed
            suit. But before even three mouthfuls, she exclaimed, Oh, its peppery and it stinks, and hurled it from
            her.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> It tastes
            awful, I cant eat mine either.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                           matchStyle={{color: 'red'}}> The boy threw
            his even further.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                              matchStyle={{color: 'red'}}> The hills had come
            nearer.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Colored
            autumn leaves drew close to their eyes.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                    matchStyle={{color: 'red'}}> Yah!
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The girl went
            running toward the hills. Now the boy was not running behind her any more. Instead, he was picking more
            flowers than the girl had gathered.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                matchStyle={{color: 'red'}}> This is
            chrysanthemum, this is bush clover, this is bellflower . . . </Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> I never realized that bellflowers could be so
            pretty. I love purple! . . . But this flower like a sunshade, what is that?</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> Thats valerian.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> The girl pretends to be holding the valerian
            like a parasol. At the same time, the delicate dimple appears in her slightly flushed face.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> Again the boy picked a handful of flower for
            her. He selects only fresh flowers to give her.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> But the girl says: Dont throw even one of them
            away.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> They
            climbed up by way of the ridge.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                            matchStyle={{color: 'red'}}> On the slopes
            of the valley opposite, a few thatched cottages were grouped harmoniously.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> Neither said anything, but they sat down side by
            side straddling a rock. All around them seemed exceptionally quiet. The hot autumn sunshine was spreading
            the fragrance of grass drying, that was all.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                         matchStyle={{color: 'red'}}> What
            kind of flower is that?</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                    matchStyle={{color: 'red'}}> On a rather steep
            incline, the last flowers of the season&nbsp; were blooming on a tangled arrowroot creeper.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> It looks just like wisteria. There was a big
            wisteria in our school up in Seoul. Seeing those flowers makes me think of the friends I used to play with
            underneath it.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                           matchStyle={{color: 'red'}}> The girl stands up and heads for
            the slope. She seizes a creeper where there are many flowers blooming and starts to tug at it. It does not
            snap easily. Making more of an effort, she ends up slipping. She grabbed hold of an arrowroot
            vine.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The boy, alarmed,
            came running over. The girl held out a hand. As he was pulling her up by the hand, the boy apologizes that
            he would have picked it for her. Drops of blood were seeping from the girls right knee. Automatically the
            boy applied his lips to the scratch and began to suck. Then, struck by some thought, he rose and went
            running a little way off.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                      matchStyle={{color: 'red'}}> Returning a moment
            later, out of breath, the boy said: If you spread this over it, itll get
            better.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> After he
            had spread pine resin over the scratch, he went running to the place where the arrowroot vines were and bit
            off with his teeth several that had a lot of flowers; these he brought back up to her. Then he said: Theres
            a calf
            over there. Come on.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                 matchStyle={{color: 'red'}}> It was a yellowish calf.
            It had not yet had its nose pierced with a ring.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> The boy seized the bridle tightly, pretended to
            scratch its back and mounted it with a bound. The calf bucks and begins to turn in circles.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> The girls pale face, pink jumper, indigo skirt,
            together with the flowers she is holding all turn into a blur. It all looks like a great bunch of flowers.
            He feels dizzy. But hes not going to get off. He was proud. Here was something
            the girl could never imitate, that only he could do.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> What do you think youre
            doing?</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> A farmer
            was coming up through the high grass.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                  matchStyle={{color: 'red'}}> He leaped
            off the calfs back. He expects to be scolded Suppose you hurt the calfs back by riding it, what
            then?</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> But the
            long-bearded farmer merely glanced once toward the girl, grabbed the calf by the halter, and said, Youd best
            get home fast. Theres a shower coming up.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                      matchStyle={{color: 'red'}}> Indeed,
            a dark cloud is rising over their heads. They suddenly find themselves surrounded on all sides by noises.
            The wind blows past with a rustling sound. In a flash everything around them turned dark purple. As they
            make their
            way downhill, raindrops can be heard striking the oak leaves. Big raindrops. The napes of their necks felt
            cool. Then in an instant a curtain of rain bars the way ahead. Through the rain, they could see a shack
            standing in a field. They
            would have go and shelter there. But the pillars were all aslant and the roofing was in tatters. He helped
            the girl up, pointing out a spot where the roof was leaking less.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Her lips had gone
            blue. Her shoulders kept trembling.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                matchStyle={{color: 'red'}}> He took off
            his cotton jacket and wrapped it round the girls shoulders. She raised her eyes and simply looked at him;
            she remained silent, letting him do as he wished. Next, he drew from the bunch of flowers she had been
            hugging those
            with broken stems and crushed flowers, that he spread under her feet. Rain soon began to drip onto the spot
            where she was standing. They could not shelter there any longer.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> After looking outside, the boy went running
            toward the millet field, as if struck by a thought. He pushed apart one of the stacks formed by leaning the
            millet stalks together upright, then carried over another stack and added it to
            the first. Then he parted the stalks again, before waving her to come over.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> The rain did not penetrate inside the stack of
            millet. It was a dark and very narrow space. The boy sat beside the stack and let the rain soak him. Steam
            rose from&nbsp; his shoulders.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                           matchStyle={{color: 'red'}}> The girl told
            him, in a kind of whisper, that he should come and sit inside. Im alright, he replied. Again, the girl told
            him to come and sit inside.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                        matchStyle={{color: 'red'}}> He had no choice
            but to enter backwards. As he did so, he crushed the flowers the girl was still holding. But the girl
            thought it did not matter. The stench from the boys wet body filled her nostrils. But she did not turn her
            head
            aside. Rather, she felt that the trembling in her body was diminishing on account of the warmth of the boys
            body.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Abruptly
            the noise on the millet leaves stopped. It was clearing up outside.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> They emerged from among the millet stalks. Not
            far in front of them sunlight was already shining down dazzlingly. Arriving at the ditch, they found a great
            flood of water filling it. In the sunlight it shone red, a muddy torrent.
            They could not jump across it.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                           matchStyle={{color: 'red'}}> The boy turned
            his back to her. The girl obediently let him carry her. The water rose as far as the boys rolled-up
            breeches.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The
            girl cried out, and clasped the boys neck.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                       matchStyle={{color: 'red'}}> Before
            they reached the stream, the autumn sky had cleared and soon it was completely blue, cloudless, as if
            nothing had ever happened.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> After that there
            was no sign of the girl. Every day he ran to the stream to look, but she was not to be seen. At break-time
            in school he used to search the playground. He even stole a secret glance into the 5th-grade girls
            classroom.
            But she was not to be seen.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                        matchStyle={{color: 'red'}}> That day too the
            boy came out to the stream side, rubbing the white pebble in his pocket. Lo and behold, if the girl was not
            sitting there on the bank of the stream!</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                     matchStyle={{color: 'red'}}> The
            boy felt his heart begin to race.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                              matchStyle={{color: 'red'}}> I was sick
            all this while.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                            matchStyle={{color: 'red'}}> Certainly, the girls face had
            grown paler.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                         matchStyle={{color: 'red'}}> Wasnt it because you got wet that
            day, in the shower?</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                matchStyle={{color: 'red'}}> The girl nodded
            silently.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Are
            you better now?</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                            matchStyle={{color: 'red'}}> Not yet . .
            .</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Then you ought
            to be lying down.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                              matchStyle={{color: 'red'}}> It was too boring so I came
            out.&nbsp; . . .&nbsp; You know, it was fun, that day . . . only, somewhere that day this got stained and it
            wont come out.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                           matchStyle={{color: 'red'}}> She looked down at the front of
            the pink jumper. It was stained with what looked like dark red mud.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> The girl silently displayed her dimple, as she
            asked, What kind of stain could it be?</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                   matchStyle={{color: 'red'}}> The boy
            was simply staring at the front of the jumper.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> You know, Ive figured it out. That day, when we
            crossed the ditch, I rode on your back, didnt I? This stain came off your back
            then.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The boy
            felt his face flush. At the parting of the ways, the girl added: Here, we picked the jujubes up at our house
            this morning . . . . for the ancestral rites tomorrow . . . She offers him a handful of jujubes. The boy
            hesitates.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Taste
            one. My great-grandfather planted the tree, he says. Theyre very sweet. The boy held out his hands cupped
            together, saying: Why, theyre really big!</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                      matchStyle={{color: 'red'}}> &nbsp;Then
            this time, after the ancestral rites, theres something more. Were vacating the house. Before the girls folk
            had moved down here, the boy had already heard his parents talking; he knew how <i>Master</i> Yuns grandsons
            business
            in Seoul had failed, so that he was unable to return to his home. It looked as though their family house was
            going to pass into other hands now.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                matchStyle={{color: 'red'}}> For some
            reason, I hate the thought of moving house. Its the parents decision, of course, so theres nothing I can do
            . . . For the first time, a sorrowful look came into the girls dark eyes.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> On his way home after parting from the girl, the
            boy found himself repeating countless times to himself, The girl is moving house. He did not feel
            particularly regretful or sorrowful. However, the boy was unaware of the sweetness
            of the jujube he was chewing.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                          matchStyle={{color: 'red'}}> That evening, the
            boy went in secret to old Deoksois walnut orchard.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> He climbed the tree he had singled out during
            the day. Then he began to beat at the branch he had singled out with a pole. The sound of falling walnuts
            was strangely loud. His heart froze. But the next moment he was wielding the pole
            with unsuspected vigor: You big nuts, lots of you, come on, fall down, lots of you,
            fall.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> On the way
            back, he kept to the shadows cast by the nearly full moon. In two days time it would be the autumn full
            moon. It was the first time he felt grateful for shadows.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> He stroked his swollen pocket. He did not care a
            bit about the saying that peeling walnuts with bare hands often brings up a rash. All he could think was
            that he must quickly give the girl a taste of these walnuts from old Deoksois
            trees, the finest in the whole village.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                    matchStyle={{color: 'red'}}> At that
            moment an alarming thought struck him. He had failed to tell the girl that once she was better, before they
            moved away, he wanted her to come out one last time to the streamside. You fool! You
            fool!</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The next
            day, on returning home from school he found his father dressed in his best clothes, holding a
            chicken.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> He
            asked where he was going.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                      matchStyle={{color: 'red'}}> Without bothering to
            reply, his father weighed up the chicken he was holding: Will one this size
            do?</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> His mother
            handed him a mesh bag: Its already been clucking and looking for a place to lay for several days. It may not
            look very big, it must be fat. This time the boy tried asking his mother where his father was
            going.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Why, hes
            off to the house of Master Yun over in the valley by the old school. He can use it for their offerings . . .
            Then he should take a really big one. That speckled rooster . . . At those words his father laughed out loud
            and
            said, Hey, theres flesh enough on this one.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                                        matchStyle={{color: 'red'}}> The
            boy felt abashed for no real reason, so he threw his school books down, went across to the stable and gave
            the cow a good slap on the back as if he were killing a blowfly.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> The water in the stream matured
            daily.</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> The boy
            went up to the parting of the ways and turned downhill. The village round the old school looked very near
            beneath the clear blue sky.
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> His parents had
            said that the girls family was moving to Yangpyong the next day. There, they were going to run a tiny
            store.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                   matchStyle={{color: 'red'}}> Unthinkingly, the boy caressed the
            walnuts in his pocket while with the other hand he was bending and breaking off a host of reeds.</Highlight><br/><br/><Highlight
            search={this.props.searchWord} matchStyle={{color: 'red'}}> That evening the boy kept returning to the same
            idea, even after he was lying down to sleep: Tomorrow, suppose I went to see the girls family leaving. If I
            went, perhaps I might see her.</Highlight><br/><br/><Highlight search={this.props.searchWord}
                                                                           matchStyle={{color: 'red'}}> Then he must
            have drifted off to sleep, but then: Well, really, what a world we live in . .
            .</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Father must
            have come back from the village. Just look at the family of Master Yun, now. All their fields sold off, the
            house theyve lived in for generations handed over to other folk, and then the child dying before the parents
            .
            . . His mother, sitting sewing in the lamplight, replied: That great-granddaughter of his was the only
            child, wasnt she?
          </Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Yes. There were
            two boys but they lost them both when they were still small . . . How can a family be so unblessed in its
            children?</Highlight><br/><br/><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}> Thats
            a fact. The girl, now, she was sick for several days and they couldnt even afford any proper medicine. Now
            the whole family line of Master Yun is cut off. . . . But you know, that little girl, dont you think its a
            bit odd? Why,
            before she died, believe it or not it seems she said that if she died, she wanted them to bury her in the
            clothes shed been wearing every day, just as they were. . .</Highlight>
          </div>


          </div>
      )
    }
    else {
      return null;
    }
  }


  render() {
    return (
      <div>
        {this.renderStory()}
      </div>
    )
  }
}

export default Poktekpang;

