import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Box, Card, CardContent, Modal, Tab, Tabs } from '@material-ui/core';
import FlashCardContainer from '../../KORN351/components/FlashCard/FlashCardsContainer';
import { connect } from 'react-redux';
import { getCharacters, getPhonetics, getRadicals } from '../../actions/KORN351/Okpyeon';
import { getNewHanjaCombos, getPracticeSentences } from '../../actions/KORN351/Lessons';
import { QUIZ_TOPIC_MAP } from '../../config';
import { stringAvatar } from '../../utils';

import './Profile.css';


function Profile(props) {
    const [primaryQuestionList, setPrimaryQuestionList] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [shouldShowModal, showModal] = useState(false);
    const [quizTopic, setQuizTopic] = useState('');
    const [lesson, setLesson] = useState(null);
    const [isPracticeSentence, setIsPractiseSentence] = useState(false);

    useEffect(() => {
        if (props.characters.length === 0)
            props.getCharacters();
        if (props.phonetics.length === 0)
            props.getPhonetics();
        if (props.radicals.length === 0)
            props.getRadicals();
        if (props.newHanjaCombos.length === 0)
            props.getNewHanjaCombos();
        if (props.pracSentences.length === 0)
            props.getPracticeSentences();
    }, []);

    const openModal = (topic, _lesson, _isSaved = false) => {
        let _quizTopic = topic;
        const { characters, phonetics, radicals, newHanjaCombos, pracSentences } = props;
        let _isPractiseQuestion = false;
        let primQuestionList = [];

        if (topic === 'new-chars') {
            characters.forEach(char => {
                if (char.lesson.toString() === _lesson)
                    primQuestionList.push({
                        _id: char._id,
                        question: 'Meaning: ' + char.meaning + ' | Primary 訓 (훈) Meaning: ' + char.primaryHoonMeaning,
                        answer: char.hanja
                    })
            });
        } else if (topic === 'rad') {
            radicals.forEach(rad => {
                if (rad.lesson.toString() === _lesson)
                    primQuestionList.push({
                        _id: rad._id,
                        question: rad.radicalHangul,
                        answer: rad.radical
                    })
            });
        } else if (topic === 'phon') {
            phonetics.forEach(phon => {
                if (phon.lesson.toString() === _lesson)
                    primQuestionList.push({
                        _id: phon._id,
                        question: phon.pronunciation,
                        answer: phon.phonetic
                    })
            });
        } else if (topic === 'new-combo') {
            newHanjaCombos.forEach(combo => {
                if (_lesson === '0') {
                    // Build Cumulative
                    primQuestionList.push({
                        _id: combo._id,
                        question: combo.hanja + ': ' + combo.kor,
                        answer: combo.eng
                    })
                } else {
                    if (combo.lesson === _lesson)
                        primQuestionList.push({
                            _id: combo._id,
                            question: combo.hanja + ': ' + combo.kor,
                            answer: combo.eng
                        })
                }
            });
        } else if (topic === 'all-combo') {
            if (_lesson === '0') {
                newHanjaCombos.forEach(combo => {
                    // Build Cumulative
                    if (combo.isAllCombo)
                        primQuestionList.push({
                            _id: combo._id,
                            question: combo.hanja + ': ' + combo.kor,
                            answer: combo.eng
                        })
                });
            } else {
                newHanjaCombos.forEach(combo => {
                    if (combo.lesson === _lesson && combo.isAllCombo)
                        primQuestionList.push({
                            _id: combo._id,
                            question: combo.hanja + ': ' + combo.kor,
                            answer: combo.eng
                        })
                });
            }
        } else if (topic === 'prac-sent') {
            _isPractiseQuestion = true;
            if (_lesson === '0') {
                pracSentences.forEach(sentence => {
                    primQuestionList.push({
                        _id: sentence._id,
                        question: sentence.question,
                        answer: sentence.answer
                    })
                });
            } else {
                pracSentences.forEach(sentence => {
                    if (sentence.lesson === _lesson)
                        primQuestionList.push({
                            _id: sentence._id,
                            question: sentence.question,
                            answer: sentence.answer
                        })
                });
            }
        }

        setIsSaved(_isSaved);
        setPrimaryQuestionList(primQuestionList);
        setQuizTopic(_quizTopic);
        setLesson(_lesson);
        showModal(true);
        setIsPractiseSentence(_isPractiseQuestion);
    };

    const [value, setValue] = React.useState(0);

    function getCards(type) {
        return Object.keys(localStorage)
        .filter(key => key.includes(`${type}:`))
        .map(key => {
            const [prefix, topic, lesson] = key.split(':');

            return {
                value: localStorage[key],
                header: QUIZ_TOPIC_MAP[topic],
                topic,
                lesson: parseInt(lesson),
                label: 'Lesson ' + lesson,
                prefix
            };
        })
        .reduce((result, item) => {
            if (result[item.header]) {
                result[item.header].push(item);
                result[item.header].sort((a, b) => (a.lesson > b.lesson) ? 1 : -1);
            } else {
                result[item.header] = [item];
            }
            return result;
        }, {});
    }

    const inProgressCards = getCards('inprogress');
    const savedCards = getCards('saved');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleClose = () => {
        showModal(false);
        setPrimaryQuestionList([]);
        setQuizTopic('');
    }
    const name = props.auth.user.name;
  
    return (
        <div className="ir-Profile">
            <div className="ir-Profile-greeting">
                <Avatar {...stringAvatar(name)} />
                <h2 className="ir-Profile-username">Hello, {name}!</h2>
            </div>
            <br/>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs className="ir-Profile-tabs" value={value} onChange={handleChange} aria-label="profile tabs">
                        <Tab label={`In Progress ${props.type}`} {...a11yProps(0)} />
                        <Tab label={`Saved ${props.type}`} {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={shouldShowModal}
                >
                    <FlashCardContainer showInProgressCards={!isSaved} onClose={handleClose} primaryQuestionList={primaryQuestionList} isPracticeSentence={isPracticeSentence} quizTopic={quizTopic} lesson={lesson}/>
                </Modal>
                <TabPanel value={value} index={0}>
                    {Object.entries(inProgressCards || []).length ? Object.entries(inProgressCards || []).map(([header, value]) =>
                        <div className="ir-Profile-cardsRow" key={header}>
                            <h5>{header}</h5><br/>
                            <div className="ir-Profile-cardContainer">
                                {value.map(card => (
                                    <Card key={card.lesson} variant="outlined" className="ir-Profile-card" onClick={() => openModal(card.topic, card.lesson.toString())}>
                                        <CardContent>
                                            {card.label}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ) : <h4 className="ir-Profile-cardsRow">No quizzes in progress</h4>}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {Object.entries(savedCards || []).length ? Object.entries(savedCards || []).map(([header, value]) =>
                        <div className="ir-Profile-cardsRow" key={header}>
                            <h5>{header}</h5><br/>
                            <div className="ir-Profile-cardContainer">
                                {value.map(card => (
                                    <Card key={card.lesson} variant="outlined" className="ir-Profile-card" onClick={() => openModal(card.topic, card.lesson.toString(), true)}>
                                        <CardContent>
                                            {card.label}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ) : <h4 className="ir-Profile-cardsRow">No quizzes saved</h4>}
                </TabPanel>
            </Box>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <h3>{children}</h3>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

Profile.propTypes = {
    type: PropTypes.oneOf(['Quizzes', 'Flashcards'])
}

Profile.defaultProps = {
    type: 'Quizzes'
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        phonetics : state.okpyeon.phonetics,
        characters : state.okpyeon.characters,
        radicals : state.okpyeon.radicals,
        newHanjaCombos: state.lessons.newHanjaCombos,
        pracSentences: state.lessons.pracSentences
    };
};

export default connect(mapStateToProps, {getRadicals, getCharacters, getPhonetics, getNewHanjaCombos, getPracticeSentences})(Profile);
