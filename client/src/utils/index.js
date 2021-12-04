import HanziWriter from "hanzi-writer";

const MISSING_CHARS = ['窓', // the only one still missing (lesson 6)
    // "金", "金", // lesson 1
    // "車", "車", "通", // lesson 2
    // '答', '國', "茶", "茶", // lesson 3
    // "旅", "旅", "窓", // lesson 4 -- window actually has no hanja in hanzi-writer demo
    // "復", "復", "飮", "飲", "來", "來", // lesson 5
    // "六", "六", "樂", "樂" // lesson 6
];

function showHanjiAnimation (hanja, target) {
  hanja = hanja.trim();
  let writer;

  if (MISSING_CHARS.includes(hanja)) {
    return document.getElementById(target).innerHTML = `<span class="missing-hanja">${hanja}</span>`;
  } else {
    writer = HanziWriter.create(target, hanja, {
      showOutline: true,
    });
  }
  writer.loopCharacterAnimation();
};

function getQuestionFontSize(question) {
    return question.length > 80 ? '20px' : '30px';
}

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
  
    return color;
  }
  
  function stringAvatar(name) {
    const splitName = name.split(' ');
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: splitName.length === 2 ? `${splitName[0][0]}${splitName[1][0]}` : splitName[0][0],
    };
  }

export {
    getQuestionFontSize,
    stringAvatar,
    stringToColor,
    showHanjiAnimation,
};
