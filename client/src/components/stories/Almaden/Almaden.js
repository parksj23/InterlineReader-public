import React, {Component} from 'react';
import Divider from "@material-ui/core/Divider";
import "./styles/Almaden.css";


var Highlight = require('react-highlighter');


export default class Almaden extends Component {

  renderStory = () => {
    if (this.props.language === 'korean') {
      return (
        <div className="col-lg-12 context korVer" id="theHeader">
          <div className={'storyHeader'} style={{display: "flex", width: "100%", whiteSpace: 'noWrap', paddingTop: "25px"}}>
          <span style={{textAlign:'left', width: "50%"}}>
            <h3> 알마덴 </h3>
          </span>
            <span style={{textAlign:'Right', width: "50%"}}>
            <h3>김지원</h3>
          </span>
          </div>

          <Divider style={{marginTop: "18px", marginBottom: "18px", paddingLeft: "15px", paddingRight: "15px"}}/>

          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그 젊은 남자는 대개 저녁 다섯시경 여자의 가게에 들러 알마덴 샤부리만 한병씩 사갔다. 가게는 뉴욕 만하탄 서부에 위치하고 있었다. 하루종일 한가하다가도 바로 그때가 퇴근길의 손님이 밀리는
            때이므로 거의 매일같이 들르는 그 남자를 다른 단골손님들을 거의 익힐 때까지도 여자는 특별히 구분해내지 못하였다. 가게를 시작한 지 얼마 안된때여서 술병의 위치와 가격 같은 것을 파악하지 못하고
            있던 때라 거의 매일 남자는 술병을 집어다 카운터에 놓건만 여자는 번번히 가격표를 들여다보고 세금 계산을 하였다. 늘 한가지를 사는 경우 대개는 손님편에서 가격을 말해주기도 하는데 이 남자는
            그러는 법도 없었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>남자는 얼굴과 몸이 아울러 탄탄하였다. 굽슬 굽이진 녹슨 빛깔의 머리털,</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>단단히 빛나는 이마, 완강히 뻗은 코, 힘찬 입술의 윤곽, 크지 않은 키, 딱 벌어진</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>가슴, 그런 그의 용모는 여자의 눈에 깨끗한 멋쟁이로 비쳤다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여자가 처음 그를 의식하던 날 남자는 포도주 진열대 앞에 서서</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"여기 알마덴 다 나갔읍니까?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>좀 높고 딱딱한 목소리였다. 장부를 들여다보던 여자가 고개를 들었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"자리를 바꿔 진열했어요. 이쪽으로요, 알마덴은 전부 그쪽으로 모았어요."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여자의 손끝을 따라 방황하던 남자의 눈길이 알마덴 병을 찾아내었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>남자의 행동에는 꼭 필요한 만큼의 동작만을 정확하게 해내는 긴장감이 있었다.&nbsp;</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>사내가 술병을 여자 앞에 딱 놓을 때 여자는 검은 공단 쟈켓을 입은 남자의 팔목에</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>세 줄의 가느다란 금사슬이 채워져 있었으며 배꼽까지 단추를 풀어 헤친 털이 부얼</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>부얼한 가슴에도 한 줄의 금사슬이 늘어져 있는 것을 보았다. 배우인가, 여자는 생각했다. 근처에는 극장이 많이 있었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여자는 그날도 가격표를 보고 세금을 붙여 계산을 하였다. 무심한 눈길이겠지만 남자가 조금도 움직이지 않고 딱 마주 서서 여자를 보고 있으므로 여자는 행동의 불편함을 느꼈다. 그래서 돈을 내고
            남자가 뚜벅뚜벅 일정한 박자의 걸음으로 걸어 나갔을 때 여자는 자신도 의식하지 못하는 새 큰숨을 쉬었다. 그 이후로 여자는 그 남자가 오직 알마덴만을 사가며 그 가격은 세금 포함해서 이 불
            삼십이 전이라는 것을 저절로 외우게 되었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>가게일이라는 것은 겉으로 보면 그냥 서서 손님에게 물건이나 내주고 돈이나 받는 것 같지만 그 이면에는 여러 가지 물건을 골고루 주문하고 그것의 수량을</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>검사해서 받고 청구서를 지불하고 세금을 내야하고 면허증 갱신을 해야하고...</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>한가지라도 실수로 잘못하면 리쿼오소리티에 보고가 되었다. 밤에 누워 생각하면 그 모든 일들은 공포에 가까운 근심으로만 여자에게 다가왔다. 그 무서운</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>리쿼오소리티라는 곳은 몇 사람이 앉아서 어떤 형벌을 준비하고 있는가 오히려 그렇게 생각해보면 마음이 좀 가벼워졌다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"이 계산서 좀 보세요. 이거 전에 우리가 냈다고 수표번호가 여기 적혀 있는데 또 청구서가 왔어요."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>남편은 다가와 여자의 어깨 너머로 들여다보고</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"이건 딴 거야, 이거봐. 여기 번호가 틀리잖아."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>번호가 틀리는 게 자신에게 이로울 게 없건마는 남편은 의기양양히 여자에게 말했다. 어머 그럼 이상해요 하다가 여자는 남편의 말이 맞는 것을 알고 입을</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>다물었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>청구서를 서류철 속에 집어넣으며 여자는 왜 남편과는 늘 얘기가 되지 않는가 생각했다. 생각나는 재미난 얘기가 있어 해보려 해도 남편은 집에 가서 찌게나 좀 끓여놓지 말을 잘랐다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>가끔 여자는 다정한 남자와 나뭇잎이 거칠게 설레이는 숲속을 걸어가는 공상을 했다. 아름다운 풍경 사진 속의 한 장면과 같이 공상 속에 나타난 숲길은 짧았다. 그길의 끝에 무엇이 있으며 그 길의
            입구는 어떠했던가 여자는 그것이 자기 머리속에서 지어낸 공상임에도 생각을 해볼 수가 없었다. 어떤 남자와 오로지 그 장면에 나타나 있는 그길 위에 서보는 것이었다. 꿈조차 메말라간다고 여자는
            생각했다. 배려 깊고 신중한 남편은 나이 차이가 많이 지고 감자같이 생긴 용모 때문이었을까 바로 그런 사람으로 보였다. 오로지 그런 점에 유의하여 결혼한 남편이 그런 사람이 아닌 것을 이제와서
            여자는 이상히 여겼다. 착각인가 아니면 남편이 그런 남자로 된 것은 내가 그를 그렇게 만든 것인가, 가끔 남편이 다른 사람과 얘기할 때 여자는 귀 기울여 남편의 음성을 들었다. 자기에게는 늘
            갈라지는 목소리로 말을 반쯤만 내뱉는 남편이 다른 사람에게도 그런 목소리로 얘기하는가. 미간 언저리에 지는 구름짱 같은 신경질이나 입 근처에 서리는 못마땅의 표정은 오로지 나에게만 보이는
            얼굴인가. 여자는 전혀 모르는 낯선 사람을 보듯 다른 사람들과 앉아 있는 남편의 모습을 냉정히 살폈다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여자가 자기 시중을 잘 안들어 준다고 남편은 남들에게도 여자에게도 말하고 있었다. 여자가 먹고 사는 얘기 아닌 다른 얘기를 하면 남편은 고개를 외로 꼬았다. 남편 가슴 속 깊숙이에는 째그장대는
            거지가 하나 들어가 있는 것 같다고 여자는 생각했다. 남편에게는 무엇으로도 채울 수없는 굶주림이 있어 보였다. 어느 날인가는 헤어진다고 생각하기 때문에 오늘을 산다고 여자는 생각했다. 우리는
            서로 받기만을 바라는 거지 부부인가 해보면 해답을 찾은 기분이 들었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여름철이 되었다. 근처의 대학도 방학에 들어가고 가게의 단골 고객들은</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>휴가를 떠나 거리가 비는가 싶더니 다른 나라 다른 지방에서 온 관광객들이 까페와</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>거리를 채웠다. 레스토랑이나 기념품 가게가 아닌 여자의 가게는 불경기 시즌으로</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>접어들었다. 갈론짜리 포도주를 사가던 매일매일의 손님들은 현저히 줄고 그대신</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>데이트 나온 연인들이 저녁이면 레스토랑에 들고가서 마실 포도주를 샀다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그 밤의 데이트 남자가 선사한 한송이 장미꽃을 들고 여자들은 연애하기 때문에 황홀히들 빛났다. 여자가 거스름돈을 셈하는 동안에 그들은 키스도 했다. 여자는 거스름돈을 손에 쥐고 시선을 피하여
            여자손님 손에서 시들어가는 꽃송이에 눈을 주었다. 저같이 아름다운 사람이 이제 술까지 사가지고 나가니 얼마나 재미있을까. 멀건이 서서 여자는 자신과 남편을 열등하게 느꼈다. 피부빛깔 같은 것이
            어느 순간은 종이 한장 차이도 나는 것 같지 않다가 거리낌없는 애정 표현이라든가 검지만 않아도 되는 유리 구슬 눈알, 검지만 않아도 되는 머리털에서 그들이 선남선녀로 느껴지는 순간이었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>공원이나 지하철 같은 데서 포옹하는 연인을 보면 애정을 반드시 저와같이</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>전시해야만 할까 생각했던 때도 있었건만 이제 여자는 그들의 그런 행동을 자유롭고 정직하게 보았다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>날씨가 더우므로 알마덴을 사가는 남자는 공단 쟈켓을 벗고, 배꼽까지 단추를 풀었던 샤쓰도 벗고, 그 벗은 웃통에 아무것도 걸치지 않고 여자의 가게에 같은</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>시간대에 들렀다. 머리털 빛과 같은 곱슬곱슬한 녹슨 털이 그의 근육 좋은 가슴을</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>덮고 있었다. 그의 젖은 카운터에 선 여자의 젖과 거의 크기가 같았다. 뽀루퉁한</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>남자의 젖꼭지가 눈에 들어오면 여자는 가슴속이 간질간질해졌다. 육체의</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>아름다움을 주무기로 삼고 있는 듯한 그같은 타입의 남자를 여자는 경멸해 왔었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>남자의 가슴털이라든가 젖꼭지 같은 육체 자체에서 성적 매력을 느껴본 일도 없었다. 진지한 음성이라든가 시계를 찬 팔목, 웃깃, 공부하는 손, 싱긋한 미소, 유모어</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>센스 같은 데서 스쳐가는 이성의 매력을 느껴 보았었다. 전에는 보이지도 않던</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>알마덴의 육체 같은 것이 눈에 들어오면 가슴 크고 둔부 큰 여자를 핀업걸로 바라보는 남자들과 나는 다름없지 않은가 여자는 부끄러움을 느끼고 시선을 밑으로 향했다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>알마덴 값이 이 불 삼십이 전에서 이불 오십사 전으로 올라갔다. 그것을 사가는 남자와 파는 여자 사이에 말없는 긴장이 날로 깊어갔다. 서로 마주섰을 때의 긴장 자체를 그가 떠난 후에 여자는
            가끔 이상하게 느꼈다. 공상 속 오솔길의 시작과 끝을 알 수 없듯 여자는 그가 없을 때 그를 생각해 본 일이 없었으며 눈에서 멀어지면 마음에서 멀어진다는 속담처럼 여자에게 있어서 그는 없는
            사람이었다. 저녁때가 되어 이제 그가 올 시간하고 생각해 보는 일조차 없었다. 그러다가 그의 검은 덮개 노란 빛깔 차가 가게 앞에 머물고 그가 뚜벅뚜벽 걸어들어와 알마덴을 진열대에서 뽑아가지고
            와서 카운터에 딱 놓으면 여자는 갑자기 어찌해야 좋을지 몰라지는 것이었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>어느날 가게에 왔던 어떤 고객의 아이가 마미하고 저의 엄마를 불렀다. 이</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여자에게 아이가 있었던가 하듯 그때 알마덴을 짚던 남자의 시선이 재빨리 아이에게로 돌려지던 것을 여자는 놓치지 않았다. 그 아이 엄마되는 여자가 얼굴이 강파른 포르투갈 여인이라는 것을 알고
            알마덴의 안도하는 듯한 기색도 여자는 느꼈다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그 다음날 알마덴을 사는 남자는 여자가 다른 손님을 대하고 있으므로 여자의 남편 쪽에 가서 섰다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"왜 냉동해 놓은 것으로 가져가지 않으십니까?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>남편은 물었다. 남편은 아직도 그가 매일매일의 단골손님이라는 것을 모르는 듯했다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"요리할꺼니까요. 찰 필요도 없고 비쌀 필요도 없읍니다."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여자에게는 단한마디 말도 않던 알마덴은 남편에게는 수월히 대답했다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"아, 뭘 요리하십니까?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"오늘 저녁은 닭요리, 음식에다 집어넣고 나머지는 마십니다."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>알마덴은 말하고 때마침 잔돈을 계산기에 넣는 여자쪽에 힐끗 시선을 주며</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"참 좋은 누이동생을 두었읍니다."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그의 어조는 반드시 누이동생이라고 생각하지 않으며 나이 차이가 좀 많아</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>보이기는 하지만 저 여자는 당신 마누라요? 궁금해 묻는 기가 있었다. 더운 피가</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>얼굴로 몰림을 여자는 느꼈다. 잔돈통에 넣은 손을 여자는 움직일 수 없었다. 정말</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>알마덴의 말처럼 자기가 남편의 여동생이 아닌 것이 여자는 유감스러웠다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>낮에 고단하게 일하건만 여자에게는 불면의 밤이 잦았다. 그런 밤이면 포도주를 한잔쯤 마시고 누워 여자는 알마덴과 함께 식탁에 촛불을 켜고 그가 만든 음식을 먹는 공상을 했다. 배가 고프면
            와이프란 건 제길 뭐하는 거야 하고 제까닥 와이프에게 불평이 가는 남편과 달리 알마덴은 아, 내 배가 고프구나, 뭘 먹어야겠다 그러겠지. 오솔길의 공상처럼 알마덴과의 공상도 어떤 경로를 거쳐
            여자는 빨간 촛불을 켠 그의 식탁에 마주 앉을건지 전혀 생각이 없었다. 여자의 추측에 의하면 알마덴은 비교적 싼 술을 사는 것으로 보아 돈이 많지 않으며 혼자 사는 남자였다. 요리를 손수 한다는
            것도 그러려니와 장보기도 손수하고 세탁물도 손수 찾아가지고 갔다. 아름다운 여자들이 그의 아파트에 드나들리라. 여자는 알마덴의 약간 몽탕한 손가락이 여자의 살을 쓰다듬는 것을 생각했다. 공상의
            사이사이에 돈걱정, 날쌘 도둑들, 남편의 냉대 같은 것이 여자를 괴롭혔다. 도깨비와 씨름하듯 생각의 갈피를 헤매느라 베개 위에서 머리를 뒤척이는 동안 불면의 밤은 허옇게 밝아지고는 하였다.
            아침이면 자신에게 성을 내며 여자는 일어났다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>어느덧 가을이었다. 낮이 짧아져 저녁 여섯 시만 되면 어두웠다. 여자는</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>빨래감이 든 세탁자루를 안고 세탁집으로 가고 있었다. 가로등이 저녁 어스름 속에</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>빛났다. 열쇠꾸러미와 기계에 넣기 위해 가져온 동전으로 여자의 스웨터 주머니가</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>처졌다. 길을 건너기 위하여 여자는 길 모퉁이에서 신호등을 기다렸다. 그때 알마덴이 차를 몰고 오다가 여자를 발견하고 깊이 허리를 꺾어 여자를 내다보았다. 신호등이 깜박깜박 신호를 보내었다.
            여자가 길을 건너갈 때까지 알마덴은 움직이지 않고 차 속에 앉아 있었다. 나를 태워다 줄까 망서린다고 여자는 기쁘게 생각했다. 그날 스무 대의 빨래기계가 무섭게 돌아가는 세탁집의 소음 속에 서서
            여자는 그가 혹시 어디서 만나자고 하면 뭐라고 대답해야 할까 생각해 보았다. 내일 당장이라도 그는 그런 제안을 할 것 같아서 급류 앞에 선 듯 어찔어찔했다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여자의 가게는 신문 와인 난(欄)에 실린 포도주들을 사고 선물 포장지와 리본, 카드 같은 것을 준비하고 오색의 깜박 전구로 쇼원도우를 장식하는 것으로 크리스마스 준비를 마치었다. 스프레이로
            쇼원도우에 뿌린 인공 눈(雪)으로 해서 가게는 술병을 가슴에 안고 포근히 서 있는 듯했다. 눈이 오면 여자는 마음이 설레어 라디오 음악을 크게 틀어 놓았다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>이제 여자는 알마덴이 올 시간쯤이면 가끔 거리 쪽을 바라보기도 하였다. 그날 그가 내리는 눈발 사이로 차를 몰고 나타나 찬눈을 맞으면서 여느날과 다름없이 뚜벅뚜벅 걸어들어 왔을 때 여자는 그를
            향해 처음으로 웃었다. 용감할 수 있었던 것은 굵은 눈발 때문이었다. 자연은 인간과 인간을 더욱 가깝게 만들었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>늘 하듯 그는 병을 집어다 여자 앞 카운터에 딱 놓았다. 털이 무성한 그의</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>가슴은 회색 터틀넥 스웨터로 깊이 감추어져 있었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"날 믿을 수 있겠읍니까?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>대답 대신 여자는 말라붙은 입술로 애매하게 웃었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"내가 마침 지금 돈이 없는데, 이 술을 가져가도 됩니까? 내일 지불할께요."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>네, 여자는 간신히 대답했다. 그의 주소도 이름도 모르므로 그가 떠난 다음</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>여자는 외상 공책에다가 알마덴 2.54하고 적어넣었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>그 겨울 몇 십 인치씩 쌓이도록 눈이 내리고 가게 앞에 제설용 소금을 푸대로 사다가 뿌리고, 날이 풀리는가 하더니 다시 눈이 오고 강추위가 몰아치고, 마침내 훈훈한 바람이 불고 봄이 왔다. 눈
            내리던 그날 이후 남자는 여자의 가게에 모습을 나타내지 않고 있었다. 그 작은 돈을 위해 그가 계획적이었다고 여자는 믿고 싶지 않았다. 알마덴은 이제 이 불 육십구 전이 되었다.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>외상공책을 들칠 때마다 알마덴 2.54라고 적힌 곳에 눈이 머물면 아무리 그의 모습이 생생하고 그의 자동차가 낯익어도 그가 가게에 나타나지 않는 한 그를 볼 길이 없음을 여자는 느꼈다.
            이세상은 한없이 넓고 인간들은 한없이 많았다.</Highlight></p>

        </div>
      )
    }
    else if (this.props.language === 'english') {
      return (
        <div className="col-lg-12 context engVer" id="theHeader">
          <div className="col-lg-12 context engVer" style={{"fontFamily":'Georgia', paddingBottom: "1em"}} id="theHeader">
            <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
          <span style={{textAlign:'left', width: "50%"}}>
            <h3> Almaden </h3>
          </span>
              <span style={{textAlign:'Right', width: "50%"}}>
            <h3>Kim Chi-w&ocirc;n</h3>
          </span>
            </div>

            <Divider/>

          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The young man usually dropped by the woman's West Side wine and spirit shop around five p.m. for a bottle
            of Almaden chablis. He arrived with a throng of rush-hour customers after a slow day, and the woman
            hadn&rsquo;t yet recognized him as one of the regulars. A newcomer to the business, she was still learning
            such basics as the shelf location and prices of the wines, and although the man brought the same item to the
            counter every day, she invariably checked the price and looked up the tax. Some customers who stuck to one
            brand would tell her the price, but not this man.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>His face and body were a solid match for each other. The curly, rust-colored hair, the firm, glistening
            forehead, the stubbornly protruding nose, the forceful line of the lips, the broad chest, and his moderate
            height combined to make him look trim and fresh.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>One day she noticed him standing in front of the wine display.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"Are you all out of Almaden?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The voice was calm and impersonal.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"We moved it--it's over there now."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The man's gaze settled on the bottles she indicated. His movements were precise, with no wasted motion.
            When he thumped the wine down on the counter, the woman saw the thin gold chains, three of them, circling
            his wrist; another was draped over the lush chest hair showing through his black satin jacket and the shirt
            unbuttoned to the navel. There were several theaters in the neighborhood, and she wondered if he was an
            actor.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>That day, while the woman checked the price as usual and added the tax, he stood stock-still looking at
            her, eyes intent. She felt extremely uncomfortable. After he paid and marched off, the woman unconsciously
            heaved a sigh. Sometime later she realized she had memorized the price of the man's bottle of Almaden--two
            dollars and thirty-two cents, tax included.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>In the beginning the woman had thought there wasn't much to tending a wine and spirit shop: you stand
            behind the counter, you bag the customers' purchases, you take their money. But a closer look revealed much
            more--ordering the right amount of the various brands, making sure you get what you order, paying the bills
            and the taxes, renewing your liquor license...and at the least little mistake you find yourself reported to
            the New York State Liquor Authority, or so she&rsquo;d been told. When the woman lay in bed at night, all of
            these complexities would grow in her mind, blossoming from concern into borderline terror.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"Oh-oh, look at this," she said to her husband one day. "We already paid it--there's the check number in
            the account book--but they're billing us again."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>Her husband drew near and looked over her shoulder.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"No, it's not the same one. The invoice number's different, see?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>He sounded confident, as if he appreciated the paying of another bill.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"Well, that's odd," said the woman, but when she realized her husband was right she fell silent.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>As she filed the invoice, she wondered why she and her husband were never in sync when they talked. Even
            when she mentioned something she thought interesting, he would cut her short: "Go on home and get the stew
            going, will you?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>Once in a while the woman daydreamed that she was walking in the woods with an affectionate man while the
            leaves danced in wild abandon. The forest path like a beautiful scene in a photograph was short. Despite
            being part of her own imagination, she couldn&rsquo;t imagine what the path&rsquo;s entrance or ending was.
            She thought only of standing on the path with the man. Even my dreams are drying up, she thought. The
            considerate and serious husband seemed to be that man due to his masculine appearance and large age gap. She
            thought it to be strange that the man she married infact turned out not to be like this.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>&nbsp;</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>Was this a misunderstanding, or was I the one who made him like this? Sometimes she paid attention to his
            voice when he talked to other people. Did he speak to them the way he spoke to her, in a scratchy tone of
            voice, in half-sentences? The layers of irritation that clouded the rims of his brow, the dissatisfaction
            that encircled his lips--did he reveal them only to her? She calmly examined her husband&rsquo;s behavior as
            though he were a complete stranger while he sat and talked with others.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The husband was talking to others of how he wasn&rsquo;t attended to by his wife. If it wasn&rsquo;t a
            conversation about women, the husband would twist and coil the back of his head. The woman thought that her
            husband had the soul of a beggar, always seeming hungry and never satisfied. The woman felt a desire to find
            a solution come up if their license were to get revoked and they ended up as a beggar couple.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>Summer arrived, and school was out at the university nearby. Many of the woman's regulars went on holidays.
            She noticed that at one moment the streets were nearly empty, and the next moment the streets are lined with
            full of tourists, local and abroad filling the neighborhood&rsquo;s roads and cafes. The season of
            tough-times had set in for her, but not for the restaurants and souvenir shops. Fewer regulars came
            periodically for a jug of wine, choosing instead to get a bottle from a restaurant.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>&nbsp;</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The women&rsquo;s faces had an ecstatic shine as they held flower blossoms in hand gifted by their lover.
            Sometimes a couple kissed as the woman gathered up the change. Money in hand, she averted her eyes; eyeing
            the flowers which were now starting to shrivel, in the other woman's hand. How fun it would be to live out a
            beautiful life like that thought the woman. Standing their blankly, she felt herself and husband inferior to
            them. She felt these were the people whose eyes didn't have to shy away, whose hair shined with live, pious
            people who weren't afraid to express their affection with no restraints.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>In Korea, lovers didn&rsquo;t embrace in parks, subways, or other public places like here. She had
            sometimes considered this to be just for show, but now saw these actions as free, honest displays of their
            feelings.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The days grew hot and the man who bought the Almaden appeared without his satin jacket or the shirt
            unbuttoned to the navel. His muscular chest was covered with the same curly, rust-colored hair as his head.
            His chest looked almost as fleshy as hers. And when she saw his protruding nipples, she felt a warm prickle
            in her bosom. In the past, the woman had disdained this type of man, who seemed to use physical beauty as
            his main weapon. She had never felt any sexual attraction to the body itself--chest hair, nipples, and the
            rest. The fleeting attraction the opposite sex had held for her came from such things as a sincere voice, a
            wrist with a large watch, a neatly tailored coat collar, a graceful hand holding a pen, a gentle smile, a
            sense of humor. Now, the impact of this man's bare torso seen close up made her realize she was no different
            from men who looked at a woman with large breasts and buttocks as if she were a pinup girl. She lowered her
            eyes in shame.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The price of Almaden rose from $2.32 to $2.54, and the unspoken tension between the man who bought it and
            the woman who sold it also rose. After the man had left, the woman sometimes felt peculiar about the tension
            of their encounters. As with the narrow woodland path of her imagination, the path whose beginning and end
            she didn't know, she never thought of the man when he wasn't at the store. When evening approached, she
            didn't stop to think that this was the time he would soon appear. But then his yellow convertible with the
            black top would pull up and he would stride inside, take his Almaden from the shelf, and plop it down on the
            counter. Once again she would feel at a loss.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>One day a little girl in the shop called out "Mommy!" The woman saw the man, as he was picking out his
            bottle of Almaden, quickly turn toward the girl and then toward her, as if wondering whether it was her
            daughter. When a sharp-featured Latina answered, she thought he seemed relieved.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The next day, when the man brought his Almaden to the counter the woman was busy with another customer, and
            so her husband waited on him.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"We have some in the cooler, you know." Her husband didn't seem aware that the man was a regular
            customer.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"I use it for cooking, so it doesn't have to be expensive and I don't need it chilled," the other readily
            replied.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"And what do you cook with it?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"Tonight it's chicken. I'll add some of the wine and drink what's left." And then, with a glance at the
            woman, who was just then dropping some change in the till, "Nice sister you got there."</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>Hearing this, the woman felt warm blood gather in her face. She couldn't move. The woman felt sorry for
            herself. If only she <em>were</em> her husband's sister, as Almaden had said.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The woman put in tiring days but often went sleepless at night. When she couldn't fall asleep she drank a
            glass of wine, went back to bed, and imagined herself sitting across a candlelit table from Almaden sharing
            a meal he had prepared. When her husband was hungry he complained, "What the hell is a wife for, anyway?"
            Almaden, though, would probably say, "I'd better fix myself something." As in her daydreams of the forest
            path, the woman had no idea how she had come to be sitting across from Almaden at his table lit with a red
            candle. Judging from the relatively cheap brand of wine he bought, he probably wasn't very rich, probably
            lived alone. He said he cooked for himself, and she knew he bought his own groceries and did his own
            laundry. Beautiful women likely frequented his apartment. She imagined Almaden's large-knuckled fingers
            stroking her skin. In between these fantasies the woman was bothered by money concerns, shoplifters, her
            husband's disdain. As if she were wrestling with a goblin, her head flipped back and forth on the pillow
            while she let her mind wander, and finally her sleepless night would yield to a gray dawn. She would rise in
            the morning tired and angry with herself.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>Before the woman knew it, autumn had arrived. The days grew shorter and by six o'clock it was dark. One day
            the woman left for the laundromat with a sack of laundry. The streetlights shone in the dusk. Her sweater
            pocket drooped under the weight of her key ring and change for the washer and dryer. The woman stopped at a
            corner, waiting for the light to turn. Just then Almaden drove up. Discovering the woman, he stopped and
            leaned out the window to look at her. The crosswalk light changed to a flickering walk signal. While the
            woman crossed the street, Almaden remained motionless at the wheel of his car. Is he wondering whether to
            offer me a ride? the woman thought in delight. Later, amid the noise of twenty whirling washers, she tried
            to think what to say if Almaden were to ask her out. She felt giddy, as if standing at the edge of a
            swirling rapid.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>As the holiday season approached, the woman and her husband stocked their shop with the brands recommended
            in the newspaper wine columns. They arranged gift wrap, ribbons, greeting cards. Colored lights twinkled in
            the display windows. The storefront looked inviting with the artificial snow sprayed on the windows and the
            bottles nestled within. When it snowed, the woman's heart thrilled and she would turn up the music on the
            radio.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The woman began to take an occasional peek toward the street around the time of Almaden's arrival. One
            evening, in the midst of a snowstorm, he pulled up in his car and marched inside, speckled with white.
            Encouraged by the sight of the fluffy snow, she smiled at him for the first time. Nature, it seemed, brought
            humans closer to each other.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>He selected his Almaden and plunked it down in front of her. His lush chest hair, displayed so proudly on
            warmer days, was hidden deep inside a gray turtleneck sweater.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"Can you trust me?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>His voice shook. It sounded distinctly higher than usual.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The woman looked at him, jolted by his words, wondering what he meant. The snow on his hair was melting.
            She noticed the color of his eyes--green bordering on ash-gray.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"Do you think you can trust me?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>She didn't know what to say.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>"I'm out of money, but I'll pay you tomorrow--all right?"</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>The woman barely managed to say yes. She didn't know the man's name or address, so after he left she simply
            wrote "Almaden--$2.54" in her account book.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>That winter the snow piled up a foot or two at a time. The woman and her husband bought rock salt to
            sprinkle on the sidewalk. Then there would be a warm spell, soon followed by more snow and a cold snap.
            Finally the breezes turned warm and spring arrived. Ever since that snowy day, the man hadn't returned. The
            woman didn't want to believe it had all been planned, just for the sake of a few dollars. A bottle of
            Almaden now cost $2.69.</Highlight></p>
          <p><Highlight search={this.props.searchWord} matchStyle={{color: 'red'}}>Whenever she took up her account book and her eye came to rest on "Almaden--$2.54," she realized she had no
            way of seeing this man again if he didn&rsquo;t return--no matter how vivid her image of him and his car.
            She was left trying to reassure herself: The world was an endless expanse, its people an infinite
            multitude.</Highlight></p>
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

