import React, {Component} from 'react';
import Divider from "@material-ui/core/Divider";
import "./styles/Sonagi.css";


var Highlight = require('react-highlighter');


class Sonagi extends Component {

  renderStory = () => {
    if (this.props.language === 'korean') {
      return (
        <div className="col-lg-12 context korVer" id="theHeader">
          <div className={'storyHeader'}
               style={{display: "flex", width: "100%", whiteSpace: 'noWrap', paddingTop: "25px"}}>
          <span style={{textAlign: 'left', width: "50%"}}>
            <h3> 소나기 </h3>
          </span>
            <span style={{textAlign: 'Right', width: "50%"}}>
            <h3>황순원(黃順元)</h3>
          </span>
          </div>
          <Divider style={{marginTop: "18px", marginBottom: "18px", paddingLeft: "15px", paddingRight: "15px"}}/>
          <p>소년은 개울가에서 소녀를 보자 곧 윤 초시네 증손녀딸이라는 걸 알 수 있었다. 소녀는 개울에다 손을 잠그고 물장난을 하고 있는 것이다. 서울서는 이런 개울물을 보지 못하기나 한 듯이</p>
          <p>벌써 며칠째 소녀는 학교서 돌아오는 길에 물장난이었다. 그런데 어제까지는 개울 기슭에서 하더니 오늘은 징검다리 한가운데 앉아서 하고 있다.</p>
          <p>소년은 개울둑에 앉아 버렸다. 소녀가 비키기를 기다리자는 것이다.</p>
          <p>요행 지나가는 사람이 있어 소녀가 길을 비켜 주었다.</p>
          <p>다음날은 좀 늦게 개울가로 나왔다.</p>
          <p>이날은 소녀가 징검다리 한가운데 앉아 세수를 하고 있었다. 분홍 스웨터 소매를 걷어 올린 팔과 목덜미가 마냥 희었다.</p>
          <p>한참 세수를 하고 나더니 이번에는 물 속을 빤히 들여다본다. 얼굴이라도 비추어 보는 것이리라. 갑자기 물을 움켜 낸다. 고기새끼라도 지나가는 듯.</p>
          <p>소녀는 소년이 개울둑에 앉아 있는 걸 아는지 모르는지 그냥 날쌔게 물만 움켜 낸다. 그러나 번번이 허탕이다. 그래도 재미있는 양, 자꾸 물을 움킨다. 어제처럼 개울을 건너는 사람이 있어야 길을 비킬 모양이다.</p>
          <p>그러다가 소녀가 물 속에서 무엇을 하나 집어 낸다. 하얀 조약돌이었다. 그리고는 훌 일어나 팔짝팔짝 징검다리를 뛰어 건너간다.</p>
          <hr className="hr-text" data-content="- 1 -"/>
          <p>다 건너가더니 홱 이리로 돌아서며,</p>
          <p>&ldquo;이 바보.&rdquo;</p>
          <p>조약돌이 날아왔다.</p>
          <p>소년은 저도 모르게 벌떡 일어섰다.</p>
          <p>단발머리를 나풀거리며 소녀가 막 달린다. 갈밭 사잇길로 들어섰다.</p>
          <p>뒤에는 청량한 가을 햇살 아래 빛나는 갈꽃뿐.</p>
          <p>이제 저쯤 갈밭머리로 소녀가 나타나리라. 꽤 오랜 시간이 지났다고&nbsp;</p>
          <p>생각했다. 그런데도 소녀는 나타나지 않는다. 발돋움을 했다. 그러고도 상당한 시간이 지났다고 생각됐다.</p>
          <p>저쪽 갈밭머리에 갈꽃이 한옴큼 움직였다. 소녀가 갈꽃을 안고 있었다. 그리고 이제는 천천한 걸음이었다. 유난히 맑은 가을 햇살이 소녀의 갈꽃&nbsp;</p>
          <p>머리에서 반짝거렸다. 소녀 아닌 갈꽃이 들길을 걸어가는 것만 같았다.</p>
          <p>소년은 이 갈꽃이 아주 뵈지 않게 되기까지 그대로 서 있었다. 문득 소녀가 던진 조약돌을 내려다보았다. 물기가 걷혀 있었다. 소년은 조약돌을 집어 주머니에 넣었다.</p>
          <p>다음날부터 좀더 늦게 개울가로 나왔다. 소녀의 그림자가 뵈지 않았다.&nbsp;</p>
          <p>다행이었다.</p>
          <p>그러나 이상한 일이었다. 소녀의 그림자가 뵈지 않는 날이 계속될수록</p>
          <p>소년의 가슴 한구석에는 어딘가 허전함이 자리잡는 것이었다. 주머니 속&nbsp;</p>
          <hr className="hr-text" data-content="- 2 -"/>
          <p>조약돌을 주무르는 버릇이 생겼다.</p>
          <p>그러한 어떤 날, 소년은 전에 소녀가 앉아 물장난을 하던 징검다리</p>
          <p>한가운데에 앉아 보았다. 물 속에 손을 잠갔다. 세수를 하였다. 물 속을 들여다 보았다. 검게 탄 얼굴이 그대로 비치었다. 싫었다.</p>
          <p>소년은 두 손으로 물 속의 얼굴을 움키었다. 몇 번이고 움키었다. 그러다가 깜짝 놀라 일어나고 말았다. 소녀가 이리 건너오고 있지 않느냐.</p>
          <p>숨어서 내 하는 꼴을 엿보고 있었구나. 소년은 달리기 시작했다.</p>
          <p>디딤돌을 헛짚었다. 한 발이 물 속에 빠졌다. 더 달렸다.</p>
          <p>몸을 가릴 데가 있어 줬으면 좋겠다. 이 쪽 길에는 갈밭도 없다. 메밀밭이다. 전에 없이 메밀꽃내가 짜릿하니 코를 찌른다고 생각됐다. 미간이 아찔했다. 찝찔한 액체가 입술에 흘러들었다. 코피였다. 소년은 한 손으로 코피를 훔쳐 내면서 그냥 달렸다. 어디선가, 바보, 바보, 하는 소리가 자꾸만 뒤따라오는 것 같았다.</p>
          <p>토요일이었다.</p>
          <p>개울가에 이르니 며칠째 보이지 않던 소녀가 건너편 가에 앉아 물장난을 하고 있었다.</p>
          <p>모르는 체 징검다리를 건너기 시작했다. 얼마 전에 소녀 앞에서 한 번 실수를 했을 뿐, 여태 큰길 가듯이 건너던 징검다리를 오늘은 조심성스럽게 건넌다.</p>
          <p>&ldquo;얘.&rdquo;</p>
          <hr className="hr-text" data-content="- 3 -"/>
          <p>못 들은 체했다. 둑 위로 올라섰다.</p>
          <p>&ldquo;얘, 이게 무슨 조개지?&rdquo;</p>
          <p>자기도 모르게 돌아섰다. 소녀의 맑고 검은 눈과 마주쳤다. 얼른 소녀의</p>
          <p>손바닥으로 눈을 떨구었다.</p>
          <p>&ldquo;비단조개.&rdquo;</p>
          <p>&ldquo;이름두 참 곱다.&rdquo;</p>
          <p>갈림길에 왔다. 여기서 소녀는 아래편으로 한 삼 마장쯤, 소년은 우대로 한 십 리 가까이 길을 가야 한다.</p>
          <p>소녀가 걸음을 멈추며,</p>
          <p>&ldquo;너 저 산 너머에 가본 일 있니?&rdquo;</p>
          <p>벌 끝을 가리켰다.</p>
          <p>&ldquo;없다.&rdquo;</p>
          <p>&ldquo;우리 가보지 않을래? 시골 오니까 혼자서 심심해 못 견디겠다.&rdquo;</p>
          <p>&ldquo;저래봬두 멀다.&rdquo;</p>
          <p>&ldquo;멀믄 얼마나 멀갔게? 서울 있을 땐 아주 먼 데까지 소풍 갔었다.&rdquo;</p>
          <p>소녀의 눈이 금세, 바보, 바보, 할 것만 같았다.</p>
          <p>논 사잇길로 들어섰다. 벼 가을걷이하는 곁을 지났다.</p>
          <p>허수아비가 서 있었다. 소년이 새끼줄을 흔들었다. 참새가 몇 마리</p>
          <p>날아간다. 참 오늘은 일찍 집으로 돌아가 텃논의 참새를 봐야 할 걸 하는</p>
          <p>생각이 든다.</p>
          <hr className="hr-text" data-content="- 4 -"/>
          <p>&ldquo;아이 재밌다!&rdquo;</p>
          <p>소녀가 허수아비 줄을 잡더니 흔들어 댄다. 허수아비가 대고 우쭐거리며&nbsp;</p>
          <p>춤을 춘다. 소녀의 왼쪽 볼에 살포시 보조개가 패었다.</p>
          <p>저만치 허수아비가 또 서 있다. 소녀가 그리로 달려간다. 그 뒤를 소년도 달렸다. 오늘 같은 날은 일찌감치 집으로 돌아가 집안일을 도와야 한다는 생각을 잊어버리기라도 하려는 듯이.</p>
          <p>소녀의 곁을 스쳐 그냥 달린다. 메뚜기가 따끔따끔 얼굴에 와 부딪친다. 쪽빛으로 한껏 갠 가을 하늘이 소년의 눈앞에서 맴을 돈다. 어지럽다. 저놈의</p>
          <p>독수리, 저놈의 독수리, 저놈의 독수리가 맴을 돌고 있기 때문이다.</p>
          <p>돌아다보니, 소녀는 지금 자기가 지나쳐 온 허수아비를 흔들고 있다. 좀전 허수아비보다 더 우쭐거린다.</p>
          <p>논이 끝난 곳에 도랑이 하나 있었다. 소녀가 먼저 뛰어 건넜다.</p>
          <p>거기서부터 산 밑까지는 밭이었다.</p>
          <p>수숫단을 세워 놓은 밭머리를 지났다.</p>
          <p>&ldquo;저게 뭐니?&rdquo;</p>
          <p>&ldquo;원두막.&rdquo;</p>
          <p>&ldquo;여기 차미 맛있니?&rdquo;</p>
          <p>&ldquo;그럼. 차미맛두 좋지만 수박맛은 더 좋다.&rdquo;</p>
          <p>&ldquo;하나 먹어 봤으면.&rdquo;</p>
          <hr className="hr-text" data-content="- 5 -"/>
          <p>소년이 참외 그루에 심은 무밭으로 들어가, 무 두 밑을 뽑아 왔다. 아직 밑이 덜 들어 있었다. 잎을 비틀어 팽개친 후 소녀에게 한 밑 건넨다. 그리고는 이렇게 먹어야 한다는 듯이 먼저 대강이를 한 입 베물어 낸 다음 손톱으로 한 돌이 껍질을 벗겨 우적 깨문다.</p>
          <p>소녀도 따라 했다. 그러나 세 입도 못 먹고,</p>
          <p>&ldquo;아, 맵고 지려.&rdquo;</p>
          <p>하며 집어던지고 만다.</p>
          <p>&ldquo;참 맛없어 못 먹겠다.&rdquo;</p>
          <p>소년이 더 멀리 팽개쳐 버렸다.</p>
          <p>산이 가까와졌다.</p>
          <p>단풍잎이 눈에 따가왔다.</p>
          <p>&ldquo;야아!&rdquo;</p>
          <p>소녀가 산을 향해 달려갔다. 이번은 소년이 뒤따라 달리지 않았다.&nbsp;</p>
          <p>그러고도 곧 소녀보다 더 많은 꽃을 꺾었다.</p>
          <p>&ldquo;이게 들국화, 이게 싸리꽃, 이게 도라지꽃 ......&rdquo;</p>
          <p>&ldquo;도라지꽃이 이렇게 예쁜 줄은 몰랐네. 난 보라빛이 좋아! ...... 근데, 이</p>
          <p>양산같이 생긴 노란 꽃이 뭐지?&ldquo;</p>
          <p>[마타리꽃.]</p>
          <p>소녀는 마타리꽃을 양산 받듯이 해보인다. 약간 상기된 얼굴에 살폿한 보조개를 떠올리며.</p>
          <hr className="hr-text" data-content="- 6 -"/>
          <p>다시 소년은 꽃 한옴큼을 꺾어 왔다. 싱싱한 꽃가지만 골라 소녀에게 건넨다.</p>
          <p>그러나 소녀는,</p>
          <p>&ldquo;하나두 버리지 말어.&rdquo;</p>
          <p>산마루께로 올라갔다.</p>
          <p>맞은편 골짜기에 오손도손 초가집이 몇 모여 있었다.</p>
          <p>누가 말한 것도 아닌데 바위에 나란히 걸터앉았다. 볼로 주위가 조용해진 것 같았다. 따가운 가을 햇살만이 말라 가는 풀 냄새를 퍼뜨리고 있었다.</p>
          <p>&ldquo;저건 또 무슨 꽃이지?&rdquo;</p>
          <p>적잖이 비탈진 곳에 칡덩굴이 엉키어 끝물꽃을 달고 있었다.</p>
          <p>&ldquo;꼭 등꽃 같네. 서울 우리 학교에 큰 등나무가 있었단다. 저 꽃을 보니까 등나무 밑에서 놀던 동무들 생각이 난다.&rdquo;</p>
          <p>소녀가 조용히 일어나 비탈진 곳으로 간다. 꽃송이가 달린 줄기를 잡고 끊기 시작한다. 좀처럼 끊어지지 않는다. 안간힘을 쓰다가 그만 미끄러지고 만다. 칡덩굴을 그러쥐었다.</p>
          <p>소년이 놀라 달려갔다. 소녀가 손을 내밀었다. 손을 잡아 이끌어 올리며, 소년은 제가 꺾어다 줄 것을 잘못했다고 뉘우친다.</p>
          <p>소녀의 오른쪽 무릎에 핏방울이 내맺혔다. 소년은 저도 모르게 상채기에 입술을 가져다 대고 빨기 시작했다. 그러다가 무슨 생각을 했는지 홱 일어나 저 쪽으로 달려간다.</p>
          <hr className="hr-text" data-content="- 7 -"/>
          <p>좀 만에 숨이 차 돌아온 소년은,</p>
          <p>&ldquo;이걸 바르면 낫는다.&rdquo;</p>
          <p>송진을 생채기에다 문질러 바르고는 그 달음으로 칡덩굴 있는 데로 내려가 꽃 많이 달린 줄기를 이빨로 끊어 가지고 올라온다. 그리고는,</p>
          <p>&ldquo;저기 송아지가 있다. 그리 가 보자.&rdquo;</p>
          <p>누렁송아지였다. 아직 코뚜레도 꿰지 않았다.</p>
          <p>소년이 고삐를 바투잡아 쥐고 등을 긁어 주는 척 훌딱 올라탔다. 송아지가 껑충거리며 돌아간다.</p>
          <p>소녀의 흰 얼굴이, 분홍 스웨터가, 남색 스커어트가, 안고 있는 꽃과 함께 범벅이 된다. 모두가 하나의 큰 꽃묶음 같다. 어지럽다. 그러나 내리지 않으리라. 자랑스러웠다. 이것만은 소녀가 흉내내지 못할 자기 혼자만이 할 수 있는 일인 것이다.</p>
          <p>&ldquo;너희 예서 뭣들 하느냐?&rdquo;</p>
          <p>농부 하나가 억새풀 사이로 올라왔다.</p>
          <p>송아지 등에서 뛰어내렸다. 어린 송아지를 타서 허리가 상하면 어쩌느냐고 꾸지람을 들을 것만 같다.</p>
          <p>그런데 나룻이 긴 농부는 소녀 편을 한 번 훑어 보고는 그저 송아지</p>
          <p>고삐를 풀어 내면서,</p>
          <p>&ldquo;어서들 집으로 가거라. 소내기가 올라.&rdquo;</p>
          <p>참 먹장구름 한 장이 머리 위에 와 있다. 갑자기 사면이 소란스러워진 것 같다. 바람이 우수수 소리를 내며 지나간다. 삽시간에 주위가 보랏빛으로 변했다.</p>
          <hr className="hr-text" data-content="- 8 -"/>
          <p>산을 내려오는데 떡갈나뭇잎에서 빗방울 듣는 소리가 난다. 굵은 빗방울이었다. 목덜미가 선뜩선뜩했다. 그러자 대번에 눈앞을 가로막는 빗줄기.</p>
          <p>비안개 속에 원두막이 보였다. 그리로 가 비를 그을 수밖에.</p>
          <p>그러나 원두막은 기둥이 기울고 지붕도 갈래갈래 찢어져 있었다. 그런대로 비가 덜 새는 곳을 가려 소녀를 들어서게 했다. 소녀는 입술이 파랗게 질려 있었다. 어깨를 자꾸 떨었다.</p>
          <p>무명 겹저고리를 벗어 소녀의 어깨를 싸주었다. 소녀는 비에 젖은 눈을 들어</p>
          <p>한번 쳐다보았을 뿐, 소년이 하는 대로 잠자코 있었다. 그러면서 안고 온 꽃묶음 속에서 가지가 꺾이고 꽃이 일그러진 송이를 골라 발밑에 버린다.</p>
          <p>소녀가 들어선 곳도 비가 새기 시작했다. 더 거기서 비를 그을 수 없었다.</p>
          <p>밖을 내다보던 소년이 무엇을 생각했는지 수수밭 쪽으로 달려간다. 세워 놓은 수숫단 속을 비집어 보더니 옆의 수숫단을 날라다 덧세운다. 다시 속을 비집어 본다. 그리고는 소녀 쪽을 향해 손짓을 한다.</p>
          <p>수숫단 속은 비는 안 새었다. 그저 어둡고 좁은 게 안 됐다. 앞에 나앉은 소년은 그냥 비를 맞아야만 했다. 그런 소년의 어깨에서 김이 올랐다.</p>
          <p>소녀가 속삭이듯이, 이리 들어와 앉으라고 했다. 괜찮다고 했다. 소녀가 다시 들어와 앉으라고 했다. 할 수 없이 뒷걸음을 쳤다. 그 바람에 소녀가 안고 있는 꽃묶음이 우그러들었다. 그러나 소녀는 상관 없다고 생각했다. 비에 젖은 소년의 몸내음새가 확 코에 끼얹혀졌다. 그러나 고개를 돌리지 않았다. 도리어 소년의 몸기운으로 해서 떨리던 몸이 적이 누그러지는 느낌이었다.</p>
          <hr className="hr-text" data-content="- 9 -"/>
          <p>소란하던 수숫잎 소리가 뚝 그쳤다. 밖이 멀개졌다.</p>
          <p>수숫단 속을 벗어나왔다. 멀지 않은 앞쪽에 햇빛이 눈부시게 내리붓고</p>
          <p>있었다.</p>
          <p>도랑 있는 곳까지 와보니, 엄청나게 물이 불어 있었다. 빛마저&nbsp;</p>
          <p>제법 붉은 흙탕물이었다. 뛰어 건널 수가 없었다.</p>
          <p>소년이 등을 돌려 댔다. 소녀가 순순히 업히었다. 걷어 올린 소년의 잠방이까지 물이 올라왔다. 소녀는, 어머나 소리를 지르며 소년의 목을 그러안었다.</p>
          <p>개울가에 다다르기 전에 가을 하늘은 언제 그랬는가 싶게 구름 한 점 없이 쪽빛으로 개어 있었다.</p>
          <p>그 다음날은 소녀의 모양이 뵈지 않았다. 다음날도, 다음날도. 매일같이 개울가로 달려와 봐도 뵈지 않았다.</p>
          <p>학교에서 쉬는 시간에 운동장을 살피기도 했다. 남몰래 오학년 여자반을 엿보기도 했다. 그러나 뵈지 않았다.</p>
          <p>그날도 소년은 주머니 속 흰 조약돌만 만지작거리며 개울가로 나왔다. 그랬더니 이쪽 개울둑에 소녀가 앉아 있는게 아닌가.</p>
          <p>소년은 가슴부터 두근거렸다.</p>
          <p>&ldquo;그 동안 앓았다.&rdquo;</p>
          <hr className="hr-text" data-content="- 10 -"/>
          <p>알아보게 소녀의 얼굴이 해쓱해져 있었다.</p>
          <p>&ldquo;그날 소나기 맞은 것 뗌에?&rdquo;</p>
          <p>소녀가 가만히 고개를 끄덕이었다.</p>
          <p>&ldquo;인제 다 낫냐?&rdquo;</p>
          <p>&ldquo;아직두......&rdquo;</p>
          <p>&ldquo;그럼 누워 있어야지.&rdquo;</p>
          <p>&ldquo;너무 갑갑해서 나왔다. ...... 그날 참 재밌었어. ...... 근데 그날 어디서 이런 물이 들었는지 잘 지지 않는다.&rdquo;</p>
          <p>소녀가 분홍 스웨터 앞자락을 내려다본다. 거기에 검붉은 진흙물 같은 게 들어 있었다.</p>
          <p>소녀가 가만히 보조개를 떠올리며,</p>
          <p>&ldquo;이게 무슨 물 같니?&rdquo;</p>
          <p>소년은 스웨터 앞자락만 바라다보고 있었다.</p>
          <p>&ldquo;내 생각해 냈다. 그날 도랑 건늘 때 내가 업힌 일이 있지? 그 때 네&nbsp;</p>
          <p>등에서 옮은 물이다.&rdquo;</p>
          <p>소년은 얼굴이 확 달아오름을 느꼈다.</p>
          <p>갈림길에서 소녀는,</p>
          <p>&ldquo;저 오늘 아침에 우리집에서 대추를 땄다. 낼 제사 지낼려구...&rdquo;</p>
          <p>대추 한줌을 내어 준다.&nbsp;</p>
          <p>소년은 주춤한다.</p>
          <hr className="hr-text" data-content="- 11 -"/>
          <p>&ldquo;맛봐라, 우리 증조할아버지가 심었다는데 아주 달다.&rdquo;</p>
          <p>소년은 두 손을 오그려 내밀며,</p>
          <p>&ldquo;참 알두 굵다!&rdquo;</p>
          <p>&ldquo;그리구 저, 우리 이번에 제사 지내구 나서 좀 있다 집을 내주게 됐다.&rdquo;</p>
          <p>소년은 소녀네가 이사해 오기 전에 벌써 어른들의 이야기를 들어서 윤초시 손자가 서울서 사업에 실패해 가지고 고향에 돌아오지 않을 수 없게 됐다는 걸</p>
          <p>알고 있었다. 그것이 이번에는 고향 집마저 남의 손에 넘기게 된 모양이었다.</p>
          <p>&ldquo;왜 그런지 난 이사 가는 게 싫어졌다. 어른들이 하는 일이니 어쩔 수</p>
          <p>없지만.......&rdquo;</p>
          <p>전에 없이 소녀의 까만 눈에 쓸쓸한 빛이 떠돌았다.</p>
          <p>소녀와 헤어져 돌아오는 길에 소년은 혼자 속으로 소녀가 이사를 간다는 말을 수없이 되뇌어 보았다. 무어 그리 안타까울 것도 서러울 것도 없었다. 그렇건만 소년은 지금 자기가 씹고 있는 대추알의 단맛을 모르고 있었다.</p>
          <p>이날 밤, 소년은 몰래 덕쇠 할아버지네 호두밭으로 갔다.</p>
          <p>낮에 봐두었던 나무로 올라갔다. 그리고 봐두었던 가지를 향해 작대기를 내리쳤다. 호두송이 떨어지는 소리가 별나게 크게 들렸다. 가슴이 선뜻했다. 그러나 다음 순간, 굵은 호두야 많이 떨어져라, 많이 떨어져라, 저도 모를 힘에 이끌려 마구 작대기를 내리치는 것이었다.</p>
          <p>돌아오는 길에는 열이틀 달이 지우는 그늘만 골라 짚었다. 그늘의</p>
          <p>고마움을 처음 느꼈다.</p>
          <hr className="hr-text" data-content="- 12 -"/>
          <p>불룩한 주머니를 어루만졌다. 호두송이를 맨손으로 깠다가는 옴이 오르기 쉽다는 말 같은 건 아무렇지도 않았다. 그저 근동에서 제일 가는 이 덕쇠 할아버지네 호두를 어서 소녀에게 맛보여야 한다는 생각만이 앞섰다.</p>
          <p>그러다, 아차, 하는 생각이 들었다. 소녀더러 병이 좀 낫거들랑 이사 가기 전에 한번 개울가로 나와 달라는 말을 못 해둔 것이었다. 바보 같은 것, 바보 같은 것.</p>
          <p>이틀날, 소년이 학교에서 돌아오니 아버지가 나들이옷을 갈아입고 닭 한 마리를 안고 있었다.</p>
          <p>어디 가시느냐고 물었다.</p>
          <p>그 말에는 대꾸도 없이 아버지는 안고 있는 닭의 무게를 겨냥해 보면서,</p>
          <p>&ldquo;이만하면 될까?&rdquo;</p>
          <p>어머니가 망태기를 내주며,</p>
          <p>&ldquo;벌써 며칠째 걀걀하고 알 날 자리를 보든데요. 크진 않아두 살은 쪘을</p>
          <p>거에요.&rdquo;</p>
          <p>소년이 이번에는 어머니한테 아버지가 어디 가시느냐고 물어 보았다.</p>
          <p>&ldquo;저, 서당골 윤초시댁에 가신다. 제삿상에라도 놓으시라구......&rdquo;</p>
          <p>&ldquo;그럼 큰 놈으로 하나 가져가지. 저 얼룩수탉으로......&rdquo;</p>
          <p>이 말에 아버지는 허허 웃고 나서,</p>
          <p>&ldquo;임마, 그래두 이게 실속이 있다.&rdquo;</p>
          <hr className="hr-text" data-content="- 13 -"/>
          <p>소년은 공연히 열적어, 책보를 집어던지고는 외양간으로 가, 소 잔등을&nbsp;</p>
          <p>한번 철썩 갈겼다. 쇠파리라도 잡는 척.</p>
          <p>개울물은 날로 여물어 갔다.</p>
          <p>소년은 갈림길에서 아래쪽으로 가보았다. 갈밭머리에서 바라보는 서당골</p>
          <p>마을은 쪽빛 하늘 아래 한결 가까워 보였다.</p>
          <p>어른들의 말이, 내일 소녀네가 양평읍으로 이사 간다는 것이었다. 거기 가서는 조그마한 가겟방을 보게 되리라는 것이었다.</p>
          <p>소년은 저도 모르게 주머니 속 호두알을 만지작거리며, 한 손으로는 수없이 갈꽃을 휘어 꺾고 있었다.</p>
          <p>그날 밤, 소년은 자리에 누워서도 같은 생각뿐이었다. 내일 소녀네가 이사하는 걸 가보나 어쩌나, 가면 소녀를 보게 될까 어떨까.</p>
          <p>그러다가 까무룩 잠이 들었는가 하는데,</p>
          <p>&ldquo;허, 참, 세상일두......&rdquo;</p>
          <p>마을 갔던 아버지가 언제 돌아왔는지,</p>
          <p>&ldquo;윤초시댁두 말이 아니어. 그 많든 전답을 다 팔아 버리구, 대대루 살아 오던 집마저 남의 손에 넘기드니, 또 악상꺼지 당하는 걸 보면...&rdquo;</p>
          <p>남폿불 밑에서 바느질감을 안고 있던 어머니가,</p>
          <p>&ldquo;증손이라곤 기집애 그 애 하나뿐이었지요?&rdquo;</p>
          <p>&ldquo;그렇지. 사내애 둘 있든 건 어려서 잃구......&rdquo;</p>
          <hr className="hr-text" data-content="- 14 -"/>
          <p>&ldquo;어쩌믄 그렇게 자식복이 없을까.&rdquo;</p>
          <p>&ldquo;글쎄 말이지. 이번 앤 꽤 여러 날 앓는 걸 약두 변변히 못 써봤다드군. 지금 같애서는 윤초시네두 대가 끊긴 셈이지. .....그런데 참 이번 기집애는 어린것이 여간 잔망스럽지가 않어. 글쎄 죽기 전에 이런 말을 했다지 않어? 자기가 죽거든 자기 입든 옷을 꼭 그대로 입혀서 묻어 달라구......&rdquo;</p>
        </div>
      )
    }
    else if (this.props.language === 'english') {
      return (
        <div>
          <div className="col-lg-12 context engVer" style={{"fontFamily": 'Georgia', paddingBottom: "1em"}}
               id="theHeader">
            <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
          <span style={{textAlign: 'left', width: "50%"}}>
            <h3> Rain Shower </h3>
          </span>
              <span style={{textAlign: 'Right', width: "50%"}}>
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

export default Sonagi;

