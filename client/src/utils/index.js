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
};
