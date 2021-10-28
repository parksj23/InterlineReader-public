import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import './WordPower.css';
import NavigatingButtons from "../../components/Lessons/NavigatingButtons/NavigatingButtons";
import {getNewHanja} from "../../../actions/KORN351/Lessons";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import {ButtonGroup, CircularProgress, Tab, Tabs} from "@material-ui/core";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

class WordPower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newHanja: [],
            currentLesson: this.props.match.params.lesson,
            wordPowerData: [],
            showLoading: false,
            yemunCount: 1,
        }
    }

    componentDidMount() {
        this.setState({clickedWord: {id: "null"}});
        this.setState({clickedHanja: {id: "null"}});
        this.setState({examplesTabValue: 0});

        if (this.props.newHanja.length === 0 || this.props.newHanja === undefined) {
            this.props.getNewHanja().then(() => {
                    const currLesson = this.props.match.params.lesson;

                    let temp = this.props.newHanja.filter(word => {
                        return word.lesson === parseInt(currLesson)
                    });

                    this.setState({
                        newHanja: temp
                    }, () => {
                        if (this.state.newHanja.length === 0) {
                            const currLesson = this.props.match.params.lesson;

                            let temp = this.props.newHanja.filter(word => {
                                return word.lesson === parseInt(currLesson)
                            });
                            this.setState({
                                newHanja: temp
                            });
                        }
                    })
                }
            );
        }
    }

    componentWillMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if (reloadCount < 2) {
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
    }

    getWordPowerYemunData = (id) => {
        axios({
            method: "get",
            url: '/api/wordPower/list',
            params: {lesson: this.props.match.params.lesson, clickedHanja: id}
        })
            .then((response) => {
                const data = response.data;
                console.log("The wordpower data from the backend");
                console.log(data);
                this.setState({wordPowerData: data});
                this.setState({showLoading: false});
            })
            .catch(() => {
                alert(" Error receiving wordPower data");
            });
    }

    handleOnChangeExamplesTab = (event, value) => {
        this.setState({examplesTabValue: value});
    }

    handleOnChangeHanjaTab = (event, value) => {
        this.setState({clickedHanja: event.currentTarget, clickedHanjaTab: value});
        this.setState({showLoading: true});
        this.setState({examplesTabValue: 0, yemunCount: 1});
        this.setState({clickedWord: {id: "null"}});
        this.setState({clickedWordTab: null});
        console.log("omw to get wordpower data");
        this.getWordPowerYemunData(event.currentTarget.id);
    }

    handleOnClickWord = (event, value) => {
        this.setState({clickedWord: event.currentTarget, clickedWordTab: value});
        this.setState({examplesTabValue: 0, yemunCount: 1});
        console.log(event.currentTarget);
    }

    handleClickMoreYemun = (event, value) => {
        this.setState({yemunCount: this.state.yemunCount + 1});
        console.log(this.state.yemunCount);
    }

    render() {
        const {newHanja} = this.state;

        return (
            <Grid container>
                <Grid item md={1}/>
                <Grid item xs={12} md={10}>
                    <div className="col-lg-12 context engVer" style={{paddingBottom: "48px"}} id="theHeader">
                        <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
                            <h3 style={{textAlign: 'left', width: "50%"}}>
                                Building Word Power with 漢字
                            </h3>
                        </div>
                        <div>
                            <h4 style={{textAlign: 'left', width: "50%"}}>
                                제 {this.state.currentLesson} 과
                            </h4>
                        </div>
                        <Divider style={{marginBottom: "0.5rem"}}/>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid item md={1}/>
                                <Typography color="textSecondary">
                                    Select a 漢字 tab to show words that contain that 漢字.
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
                                        wrapped
                                    >
                                        {newHanja.map((hanjaTab) => {
                                            let tabId = hanjaTab.hanja.replace(/\s/g, '').trim();
                                            return (
                                                <Tab
                                                    id={tabId}
                                                    label={
                                                        <React.Fragment>
                                                            {hanjaTab.hoonEum.split(" ")[0]} {hanjaTab.hanja}({hanjaTab.hoonEum.split(" ")[1]}) &nbsp;&nbsp;
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
                                    if (this.state.clickedHanja.id === char.hanja.replace(/\s/g, '').trim()) {
                                        return (
                                            <Grid item xs={12} className="word-power-grid-card" key={idx}>
                                                <Card variant="outlined" className="word-power-card">
                                                    <CardContent className="word-power-card-content">
                                                        <div className="word-power-card-div-1">
                                                            <Typography variant="h5" component="h2">
                                                                {char.hoonEum.split(" ")[0]} {char.hanja}({char.hoonEum.split(" ")[1]})
                                                            </Typography>
                                                            <Typography color="textSecondary" gutterBottom>
                                                                부수: {char.radical} ({char.primaryHoonMeaning}
                                                                + {char.characterStrokeCount}획
                                                            </Typography>
                                                        </div>
                                                        <br/>
                                                        <div className="word-power-card-div-2">
                                                            <Typography>
                                                                <b><i>Select a word:</i></b>
                                                            </Typography>
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
                                                                    centered
                                                                    style={{padding: '1%'}}
                                                                    orientation="vertical"
                                                                    key={"Tab" + this.state.clickedWordTab}
                                                                    wrapped
                                                                >
                                                                    {this.state.wordPowerData.filter((item) => {
                                                                        if (!item.hanqca.includes(char.hanja.replace(/\s/g, '').trim())) {
                                                                            return false;
                                                                        }
                                                                        return true;
                                                                    }).map((wordTab, idx) => {
                                                                        return (
                                                                            <Tab
                                                                                id={wordTab.hanqca + "!!!" + wordTab.hankul + "!!!" + wordTab.englishGloss}
                                                                                label={
                                                                                    <React.Fragment>
                                                                                        {wordTab.hanqca}({wordTab.hankul}) &nbsp;&nbsp;
                                                                                        {wordTab.englishGloss}
                                                                                    </React.Fragment>
                                                                                }
                                                                            />
                                                                        )
                                                                    })}
                                                                </Tabs>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <Card variant="outlined" className="word-power-card-left">
                                                    <CardContent className="word-power-card-content-left">
                                                        <div className="word-power-wordTabs">
                                                            <ButtonGroup
                                                                // value={this.state.examplesTabValue}
                                                                // onChange={this.handleOnChangeExamplesTab}
                                                                // indicatorColor="primary"
                                                                // textColor="primary"
                                                                centered
                                                                orientation="vertical"
                                                                // style={{padding: '2%'}}
                                                                // variant="contained"
                                                            >
                                                                <Button value={this.state.examplesTabValue}
                                                                        onClick={(e) => this.handleOnChangeExamplesTab(e, 0)}>간단한
                                                                    한자 예문</Button>
                                                                <Button value={this.state.examplesTabValue}
                                                                        onClick={(e) => this.handleOnChangeExamplesTab(e, 1)}>완벽한
                                                                    한자 예문</Button>
                                                                <Button value={this.state.examplesTabValue}
                                                                        onClick={(e) => this.handleOnChangeExamplesTab(e, 2)}>한글
                                                                    예문</Button>
                                                                <Button value={this.state.examplesTabValue}
                                                                        onClick={(e) => this.handleOnChangeExamplesTab(e, 3)}>영어
                                                                    번역</Button>
                                                            </ButtonGroup>
                                                            <Button style={{alignSelf: "center"}}
                                                                    onClick={this.handleClickMoreYemun}>More 예문</Button>
                                                        </div>
                                                        {this.state.examplesTabValue === 0 &&
                                                        <div className="wordTab-results-div">
                                                            {this.state.wordPowerData.filter((item) => {
                                                                if (!item.hanqca.includes(char.hanja.replace(/\s/g, '').trim())) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).filter((i) => {
                                                                let clickedWordId = this.state.clickedWord.id.split("!!!");
                                                                if (clickedWordId[0] !== i.hanqca) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).map((filteredItem, idx) => {
                                                                if (filteredItem.examples.length === 0) {
                                                                    return (
                                                                        <div className="no-data">
                                                                            <Typography>
                                                                                예문이 없습니다.
                                                                            </Typography>
                                                                        </div>
                                                                    )
                                                                }
                                                                return (
                                                                    <div key={idx}>
                                                                        <ul>
                                                                            {filteredItem.examples.map((sentence, idx, arr) => {
                                                                                    return (
                                                                                        idx === this.state.yemunCount &&
                                                                                        <div key={idx}>
                                                                                            <li>
                                                                                                {sentence.simpleHanqca}
                                                                                            </li>
                                                                                        </div>
                                                                                        // <div key={idx}>
                                                                                        //     <li>
                                                                                        //         {sentence.simpleHanqca}
                                                                                        //     </li>
                                                                                        //     <br/>
                                                                                        // </div>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        }

                                                        {this.state.examplesTabValue === 1 &&
                                                        <div className="wordTab-results-div">
                                                            {this.state.wordPowerData.filter((item) => {
                                                                if (!item.hanqca.includes(char.hanja.replace(/\s/g, '').trim())) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).filter((i) => {
                                                                let clickedWordId = this.state.clickedWord.id.split("!!!");
                                                                if (clickedWordId[0] !== i.hanqca) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).map((filteredItem, idx) => {
                                                                return (
                                                                    <div key={idx}>
                                                                        <ul>
                                                                            {filteredItem.examples.map((sentence, idx) => {
                                                                                    return (
                                                                                        idx === this.state.yemunCount &&
                                                                                        <div key={idx}>
                                                                                            <li>
                                                                                                {sentence.hanqcaizedSentence}
                                                                                            </li>
                                                                                        </div>
                                                                                        // <div key={idx}>
                                                                                        //     <li>
                                                                                        //         {sentence.hanqcaizedSentence}
                                                                                        //     </li>
                                                                                        //     <br/>
                                                                                        // </div>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        }

                                                        {this.state.examplesTabValue === 2 &&
                                                        <div className="wordTab-results-div">
                                                            {this.state.wordPowerData.filter((item) => {
                                                                if (!item.hanqca.includes(char.hanja.replace(/\s/g, '').trim())) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).filter((i) => {
                                                                let clickedWordId = this.state.clickedWord.id.split("!!!");
                                                                if (clickedWordId[1] !== i.hankul) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).map((filteredItem, idx) => {
                                                                return (
                                                                    <div key={idx}>
                                                                        <ul>
                                                                            {filteredItem.examples.map((sentence, idx) => {
                                                                                    return (
                                                                                        idx === this.state.yemunCount &&
                                                                                        <div key={idx}>
                                                                                            <li>
                                                                                                {sentence.koreanSentence}
                                                                                            </li>
                                                                                        </div>
                                                                                        // <div key={idx}>
                                                                                        //     <li>
                                                                                        //         {sentence.koreanSentence}
                                                                                        //     </li>
                                                                                        //     <br/>
                                                                                        // </div>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        }

                                                        {this.state.examplesTabValue === 3 &&
                                                        <div className="wordTab-results-div">
                                                            {this.state.wordPowerData.filter((item) => {
                                                                if (!item.hanqca.includes(char.hanja.replace(/\s/g, '').trim())) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).filter((i) => {
                                                                let clickedWordId = this.state.clickedWord.id.split("!!!");
                                                                if (clickedWordId[2] !== i.englishGloss) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).map((filteredItem, idx) => {
                                                                return (
                                                                    <div key={idx}>
                                                                        <ul>
                                                                            {filteredItem.examples.map((sentence, idx) => {
                                                                                    return (
                                                                                        <div key={idx}>
                                                                                            <li>
                                                                                                {sentence.translation}
                                                                                            </li>
                                                                                            <br/>
                                                                                        </div>
                                                                                    )
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
            newHanja: state.lessons.newHanja
        };
    };

export default withRouter(connect

    (
        mapStateToProps
        , {
            getNewHanja
        }
    )
    (WordPower)
)
;
