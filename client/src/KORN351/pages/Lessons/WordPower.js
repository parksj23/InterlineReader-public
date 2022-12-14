import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import './WordPower.css';
import NavigatingButtons from "../../components/Lessons/NavigatingButtons/NavigatingButtons";
import {getNewHanja} from "../../../actions/KORN351/Lessons";
import {getNewHanjaCombos} from "../../../actions/KORN351/Lessons";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import {CircularProgress, FormControlLabel, Radio, RadioGroup, Switch, Tab, Tabs} from "@material-ui/core";
import axios from "axios";
import Button from "@material-ui/core/Button";

class WordPower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newHanja: [],
            newHanjaCombos: [],
            currentLesson: this.props.match.params.lesson,
            wordPowerData: [],
            showLoading: false,
            yemunCount: 1,
            examplesTabValue: "simple",
            clickedWordTab: 0,
            clickedHanjaTab: 0,
            showTranslation: false,
            engChecked: false,
            showNewHanjaComboWords: true,
            newHanjaComboWordsChecked: true,
            showAllWords: false,
            showAllWordsChecked: false
        }
    }

    componentDidMount() {
        this.setState({clickedWord: {id: "null"}});
        this.setState({clickedHanja: {id: "null"}});

        if (this.props.newHanja.length === 0 || this.props.newHanja === undefined) {
            this.props.getNewHanja().then(() => {
                    const currLesson = this.props.match.params.lesson;

                    this.setState({
                        newHanja: this.props.newHanja.filter(word => {
                            return word.lesson === parseInt(currLesson)
                        })
                    });
                }
            );
        }

        if (this.props.newHanjaCombos.length === 0 || this.props.newHanjaCombos === undefined) {
            this.props.getNewHanjaCombos().then(() => {
                    const currLesson = this.props.match.params.lesson;

                    let temp = this.props.newHanjaCombos.filter(combo => {
                        return combo.lesson === currLesson
                    });
                    this.setState({
                        newHanjaCombos: temp
                    })
                }
            );
        }
    }

    componentWillMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if (reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }

        if (this.state.newHanja.length === 0) {
            const currLesson = this.props.match.params.lesson;

            let temp = this.props.newHanja.filter(char => {
                return char.lesson === currLesson
            });
            this.setState({
                newHanja: temp
            });
        }

        if (this.state.newHanjaCombos.length === 0) {
            const currLesson = this.props.match.params.lesson;

            let temp = this.props.newHanjaCombos.filter(combo => {
                return combo.lesson === currLesson
            });
            this.setState({
                newHanjaCombos: temp
            });
        }
    }

    getWordPowerYemunData = (id) => {
        axios({
            method: "get",
            url: '/api/wordPower/list',
            params: {lesson: this.props.match.params.lesson, clickedHanja: id}
        })
            .then((response) => {
                const data = response.data;
                // console.log("the data");
                // console.log(data);
                this.setState({wordPowerData: data.wordPowerList});
                this.setState({showLoading: false});
            })
            .catch(() => {
                alert(" Error receiving wordPower data");
            });
    }

    handleOnChangeExamplesTab = (event, value) => {
        this.setState({examplesTabValue: value});
    }

    handleOnClickShowTranslation = () => {
        this.setState({showTranslation: !this.state.showTranslation});
        this.setState({engChecked: !this.state.engChecked});
    }

    handleOnChangeHanjaTab = (event, value) => {
        this.setState({clickedHanja: event.currentTarget, clickedHanjaTab: value});
        this.setState({showLoading: true});
        this.setState({examplesTabValue: "simple", yemunCount: 1});
        this.setState({showTranslation: false, engChecked: false});
        this.setState({clickedWord: {id: "null"}});
        this.setState({clickedWordTab: 0});
        this.getWordPowerYemunData(event.currentTarget.id);
    }

    handleOnClickWord = (event, value) => {
        this.setState({clickedWord: event.currentTarget, clickedWordTab: value});
        this.setState({examplesTabValue: "simple", yemunCount: 1});
        this.setState({showTranslation: false, engChecked: false});
    }

    handleClickMoreYemun = () => {
        this.setState({yemunCount: this.state.yemunCount + 1});
        this.setState({showTranslation: false, engChecked: false});
    }

    filterWordPowerData = (clickedWordIdPosition, char) => {
        return this.state.wordPowerData.filter((item) => {
            if (!item.hanqca.trim().normalize('NFC').includes(char.hanja.replace(/\s/g, '').trim().normalize('NFC'))) {
                return false;
            }
            return true;
        }).filter((i) => {
            let clickedWordId = this.state.clickedWord.id.split("!!!");
            if (clickedWordIdPosition === 0) {
                if (clickedWordId[clickedWordIdPosition].trim().normalize('NFC') !== i.hanqca.trim().normalize('NFC')) {
                    return false;
                }
                return true;
            } else if (clickedWordIdPosition === 1) {
                if (clickedWordId[clickedWordIdPosition] !== i.hankul) {
                    return false;
                }
                return true;
            } else if (clickedWordIdPosition === 2) {
                if (clickedWordId[clickedWordIdPosition] !== i.englishGloss) {
                    return false;
                }
                return true;
            } else {
                return
            }
        })
    }

    handleToggleNewHanjaCombos = () => {
        this.setState({
            showNewHanjaComboWords: !this.state.showNewHanjaComboWords,
            newHanjaComboWordsChecked: !this.state.newHanjaComboWordsChecked
        });
        this.setState({showAllWords: false, showAllWordsChecked: false});
        this.setState({clickedWord: {id: "null"}});
        this.setState({clickedWordTab: 0});
    }

    handleToggleShowAllWords = () => {
        this.setState({
            showAllWords: !this.state.showAllWords,
            showAllWordsChecked: !this.state.showAllWordsChecked
        });
        this.setState({showNewHanjaComboWords: false, newHanjaComboWordsChecked: false});
        this.setState({clickedWord: {id: "null"}});
        this.setState({clickedWordTab: 0});
    }

    render() {
        const {newHanja} = this.state;
        const {newHanjaCombos} = this.state;

        return (
            <Grid container>
                <Grid item md={1}/>
                <Grid item xs={12} md={10}>
                    <div className="col-lg-12 context engVer" style={{paddingBottom: "48px"}} id="theHeader">
                        <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
                            <h3 style={{textAlign: 'left', width: "50%"}}>
                                Building Word Power with ??????
                            </h3>
                        </div>
                        <div>
                            <h4 style={{textAlign: 'left', width: "50%"}}>
                                ??? {this.state.currentLesson} ???
                            </h4>
                        </div>
                        <Divider style={{marginBottom: "0.5rem"}}/>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid item md={1}/>
                                <Typography color="textSecondary">
                                    Select a ?????? tab to show words that contain that ??????.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <Tabs
                                        value={this.state.clickedHanjaTab}
                                        onChange={this.handleOnChangeHanjaTab}
                                        indicatorColor="secondary"
                                        textColor="primary"
                                        variant="scrollable"
                                        scrollbuttons="auto"
                                        style={{padding: '2%'}}
                                        wrapped="true"
                                    >
                                        {newHanja.map((hanjaTab, idx) => {
                                            let tabId = hanjaTab.hanja.replace(/\s/g, '').trim().normalize('NFC');
                                            return (
                                                <Tab
                                                    id={tabId}
                                                    key={idx}
                                                    label={
                                                        <React.Fragment>
                                                            {hanjaTab.hoonEum.split(" ")[0]} {hanjaTab.hanja.trim().normalize('NFC')}({hanjaTab.hoonEum.split(" ")[1]}) &nbsp;&nbsp;
                                                        </React.Fragment>
                                                    }
                                                />
                                            )
                                        })}
                                    </Tabs>
                                </div>
                            </Grid>
                            {this.state.showLoading ? (
                                <Grid item xs={12}>
                                    <CircularProgress/>
                                    <Typography>
                                        Fetching data, please wait.
                                    </Typography>
                                </Grid>
                            ) : (
                                newHanja.map((char, idx) => {
                                    if (this.state.clickedHanja.id.trim().normalize('NFC') === char.hanja.replace(/\s/g, '').trim().normalize('NFC')) {
                                        return (
                                            <Grid item xs={12} className="word-power-grid-card" key={idx}>
                                                <Card variant="outlined" className="word-power-card">
                                                    <CardContent className="word-power-card-content">
                                                        <div className="word-power-card-div-1">
                                                            <Typography variant="h5" component="h2">
                                                                {char.hoonEum.split(" ")[0]} {char.hanja.trim().normalize('NFC')}({char.hoonEum.split(" ")[1]})
                                                            </Typography>
                                                            <Typography color="textSecondary" gutterBottom>
                                                                ??????: {char.radical} &nbsp; ({char.radicalHangul})
                                                                + {char.characterStrokeCount}???
                                                            </Typography>
                                                        </div>
                                                        <Divider style={{marginBottom: "0.5rem"}}/>
                                                        <div className="word-power-card-div-1.5-combo-toggle">
                                                            <FormControlLabel
                                                                onChange={this.handleToggleNewHanjaCombos}
                                                                checked={this.state.newHanjaComboWordsChecked}
                                                                value="combos"
                                                                control={<Switch/>}
                                                                label="?????? combos only"/>
                                                            <br/>
                                                            <FormControlLabel
                                                                onChange={this.handleToggleShowAllWords}
                                                                checked={this.state.showAllWordsChecked}
                                                                value="all-words"
                                                                control={<Switch/>}
                                                                label="All words"/>
                                                        </div>
                                                        <Divider style={{marginBottom: "0.5rem"}}/>
                                                        <div className="word-power-card-div-2">
                                                            {this.state.wordPowerData.length === 0 ? (
                                                                <Grid item xs={12}>
                                                                    <br/>
                                                                    <br/>
                                                                    <Typography className="no-data">
                                                                        No data available.
                                                                    </Typography>
                                                                </Grid>
                                                            ) : (
                                                                <Tabs
                                                                    value={this.state.clickedWordTab}
                                                                    onChange={this.handleOnClickWord}
                                                                    indicatorColor="secondary"
                                                                    textColor="primary"
                                                                    style={{padding: '1%', width: '100%'}}
                                                                    orientation="vertical"
                                                                    key={"Tab" + this.state.clickedWordTab}
                                                                    wrapped="true"
                                                                >

                                                                    {this.state.showAllWords === true &&
                                                                    this.state.wordPowerData.filter((item) => {
                                                                        if (!item.hanqca.trim().normalize('NFC').includes(char.hanja.replace(/\s/g, '').trim().normalize('NFC'))) {
                                                                            return false;
                                                                        }
                                                                        return true;
                                                                    }).map((wordTab, idx) => {
                                                                        return (
                                                                            <Tab
                                                                                id={wordTab.hanqca.trim().normalize('NFC') + "!!!" + wordTab.hankul + "!!!" + wordTab.englishGloss}
                                                                                key={idx}
                                                                                label={
                                                                                    <div
                                                                                        className="wordTab-label-flexbox">
                                                                                        <div
                                                                                            className="wordTab-label-flexbox-1">
                                                                                            <React.Fragment>
                                                                                                {wordTab.hanqca.trim().normalize('NFC')}({wordTab.hankul})
                                                                                            </React.Fragment>
                                                                                        </div>
                                                                                        <div
                                                                                            className="wordTab-label-flexbox-2">
                                                                                            <React.Fragment>
                                                                                                {wordTab.englishGloss}
                                                                                            </React.Fragment>
                                                                                        </div>
                                                                                    </div>
                                                                                }
                                                                            />
                                                                        )
                                                                    })}

                                                                    {this.state.showNewHanjaComboWords === true &&
                                                                    this.state.wordPowerData.reduce((filteredResult, item) => {
                                                                        newHanjaCombos.forEach(combo => {
                                                                            if (item.hanqca.trim().normalize('NFC').includes(combo.hanja.replace(/\s/g, '').trim().normalize('NFC'))) {
                                                                                if (filteredResult.indexOf(item) === -1) {
                                                                                    filteredResult.push(item);
                                                                                }
                                                                            }
                                                                        });
                                                                        return filteredResult;
                                                                    }, []).map((wordTab, idx) => {
                                                                            return (
                                                                                <Tab
                                                                                    id={wordTab.hanqca.trim().normalize('NFC') + "!!!" + wordTab.hankul + "!!!" + wordTab.englishGloss}
                                                                                    key={idx}
                                                                                    label={
                                                                                        <div
                                                                                            className="wordTab-label-flexbox">
                                                                                            <div
                                                                                                className="wordTab-label-flexbox-1">
                                                                                                <React.Fragment>
                                                                                                    {wordTab.hanqca.trim().normalize('NFC')}({wordTab.hankul})
                                                                                                </React.Fragment>
                                                                                            </div>
                                                                                            <div
                                                                                                className="wordTab-label-flexbox-2">
                                                                                                <React.Fragment>
                                                                                                    {wordTab.englishGloss}
                                                                                                </React.Fragment>
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                />
                                                                            )
                                                                        })
                                                                    }
                                                                </Tabs>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <Card variant="outlined" className="word-power-card-left">
                                                    <CardContent className="word-power-card-content-left">
                                                        <div className="word-power-wordTabs">
                                                            <RadioGroup
                                                                value={this.state.examplesTabValue}
                                                                onChange={this.handleOnChangeExamplesTab}
                                                            >
                                                                <FormControlLabel value="simple" control={<Radio/>}
                                                                                  label="????????? ?????? ??????"/>
                                                                <FormControlLabel value="complete" control={<Radio/>}
                                                                                  label="????????? ?????? ??????"/>
                                                                <FormControlLabel value="hangul" control={<Radio/>}
                                                                                  label="??????"/>
                                                            </RadioGroup>
                                                            <FormControlLabel
                                                                onChange={this.handleOnClickShowTranslation}
                                                                checked={this.state.engChecked}
                                                                value="english"
                                                                control={<Switch/>}
                                                                label="??????"/>
                                                            <br/>
                                                            <Button
                                                                variant="contained"
                                                                onClick={this.handleClickMoreYemun}>?????? ??????
                                                            </Button>
                                                        </div>
                                                        {this.state.examplesTabValue === "simple" &&
                                                        <div className="wordTab-results-div">
                                                            {this.state.clickedWord.id === "null" &&
                                                            <div className="no-data">
                                                                <Typography>
                                                                    Please select a word from the list.
                                                                </Typography>
                                                            </div>
                                                            }
                                                            {this.filterWordPowerData(0, char)
                                                                .map((filteredItem, idx) => {
                                                                    if (filteredItem.examples.length === 0) {
                                                                        return (
                                                                            <div className="no-data">
                                                                                <Typography>
                                                                                    ????????? ????????????.
                                                                                </Typography>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <div key={idx}>
                                                                            <ul style={{"listStyleType": "none"}}>
                                                                                {filteredItem.examples.map((sentence, idx, arr) => {
                                                                                        if (idx + 1 < arr.length) {
                                                                                            return (
                                                                                                (idx === this.state.yemunCount - 1) &&
                                                                                                <div key={idx}>
                                                                                                    <li className="wordTab-results-yemun">
                                                                                                        {sentence.simpleHanqca}
                                                                                                    </li>
                                                                                                    {this.state.showTranslation === true &&
                                                                                                    <li>
                                                                                                        {sentence.translation}
                                                                                                    </li>
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        }

                                                                                        if (idx + 1 === arr.length) {
                                                                                            return (
                                                                                                (idx === this.state.yemunCount - 1) &&
                                                                                                <div key={idx}>
                                                                                                    <li className="wordTab-results-yemun">
                                                                                                        {sentence.simpleHanqca}
                                                                                                    </li>
                                                                                                    {this.state.showTranslation === true &&
                                                                                                    <li>
                                                                                                        {sentence.translation}
                                                                                                    </li>
                                                                                                    }
                                                                                                    <li className="no-more-yemun-msg">
                                                                                                        ***????????? ???????????????.***
                                                                                                    </li>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    }
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )
                                                                })}
                                                        </div>
                                                        }

                                                        {this.state.examplesTabValue === "complete" &&
                                                        <div className="wordTab-results-div">
                                                            {this.state.clickedWord.id === "null" &&
                                                            <div className="no-data">
                                                                <Typography>
                                                                    Please select a word from the list.
                                                                </Typography>
                                                            </div>
                                                            }
                                                            {this.filterWordPowerData(0, char)
                                                                .map((filteredItem, idx) => {
                                                                    if (filteredItem.examples.length === 0) {
                                                                        return (
                                                                            <div className="no-data">
                                                                                <Typography>
                                                                                    ????????? ????????????.
                                                                                </Typography>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <div key={idx}>
                                                                            <ul style={{"listStyleType": "none"}}>
                                                                                {filteredItem.examples.map((sentence, idx, arr) => {
                                                                                        if (idx + 1 < arr.length) {
                                                                                            return (
                                                                                                (idx === this.state.yemunCount - 1) &&
                                                                                                <div key={idx}>
                                                                                                    <li className="wordTab-results-yemun">
                                                                                                        {sentence.hanqcaizedSentence}
                                                                                                    </li>
                                                                                                    {this.state.showTranslation === true &&
                                                                                                    <li>
                                                                                                        {sentence.translation}
                                                                                                    </li>
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        }

                                                                                        if (idx + 1 === arr.length) {
                                                                                            return (
                                                                                                (idx === this.state.yemunCount - 1) &&
                                                                                                <div key={idx}>
                                                                                                    <li className="wordTab-results-yemun">
                                                                                                        {sentence.hanqcaizedSentence}
                                                                                                    </li>
                                                                                                    {this.state.showTranslation === true &&
                                                                                                    <li>
                                                                                                        {sentence.translation}
                                                                                                    </li>
                                                                                                    }
                                                                                                    <li className="no-more-yemun-msg">
                                                                                                        ***????????? ???????????????.***
                                                                                                    </li>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    }
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )
                                                                })}
                                                        </div>
                                                        }

                                                        {this.state.examplesTabValue === "hangul" &&
                                                        <div className="wordTab-results-div">
                                                            {this.state.clickedWord.id === "null" &&
                                                            <div className="no-data">
                                                                <Typography>
                                                                    Please select a word from the list.
                                                                </Typography>
                                                            </div>
                                                            }
                                                            {this.filterWordPowerData(1, char)
                                                                .map((filteredItem, idx) => {
                                                                    if (filteredItem.examples.length === 0) {
                                                                        return (
                                                                            <div className="no-data">
                                                                                <Typography>
                                                                                    ????????? ????????????.
                                                                                </Typography>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <div key={idx}>
                                                                            <ul style={{"listStyleType": "none"}}>
                                                                                {filteredItem.examples.map((sentence, idx, arr) => {
                                                                                        if (idx + 1 < arr.length) {
                                                                                            return (
                                                                                                (idx === this.state.yemunCount - 1) &&
                                                                                                <div key={idx}>
                                                                                                    <li className="wordTab-results-yemun">
                                                                                                        {sentence.koreanSentence}
                                                                                                    </li>
                                                                                                    {this.state.showTranslation === true &&
                                                                                                    <li>
                                                                                                        {sentence.translation}
                                                                                                    </li>
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        }

                                                                                        if (idx + 1 === arr.length) {
                                                                                            return (
                                                                                                (idx === this.state.yemunCount - 1) &&
                                                                                                <div key={idx}>
                                                                                                    <li className="wordTab-results-yemun">
                                                                                                        {sentence.koreanSentence}
                                                                                                    </li>
                                                                                                    {this.state.showTranslation === true &&
                                                                                                    <li>
                                                                                                        {sentence.translation}
                                                                                                    </li>
                                                                                                    }
                                                                                                    <li className="no-more-yemun-msg">
                                                                                                        ***????????? ???????????????.***
                                                                                                    </li>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    }
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )
                                                                })}
                                                        </div>
                                                        }
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )
                                    }
                                })
                            )}
                        </Grid>
                    </div>
                </Grid>
                <NavigatingButtons/>
            </Grid>
        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            newHanja: state.lessons.newHanja,
            newHanjaCombos: state.lessons.newHanjaCombos
        };
    };

export default withRouter(connect(mapStateToProps, {getNewHanja, getNewHanjaCombos})(WordPower));
