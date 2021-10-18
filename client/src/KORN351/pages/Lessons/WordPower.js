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
import {CircularProgress, Tab, Tabs} from "@material-ui/core";
import axios from "axios";

class WordPower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newHanja: [],
            currentLesson: this.props.match.params.lesson,
            wordPowerData: [],
            showLoading: false
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
        this.setState({examplesTabValue: 0});
        this.setState({clickedWord: {id: "null"}});
        console.log("omw to get wordpower data");
        this.getWordPowerYemunData(event.currentTarget.id);
    }

    handleOnClickWord = (event, value) => {
        this.setState({clickedWord: event.currentTarget, clickedWordTab: value});
        this.setState({examplesTabValue: 0});
        console.log(event.currentTarget);
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
                                            return (
                                                <Tab
                                                    id={hanjaTab.hanja}
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
                                    if (this.state.clickedHanja.id === char.hanja) {
                                        return (
                                            <Grid item xs={12} className="word-power-grid-card" key={idx}>
                                                <Card variant="outlined" className="word-power-card">
                                                    <CardContent className="word-power-card-content">
                                                        <div className="word-power-card-div-1">
                                                            <Typography variant="h5" component="h2">
                                                                {char.hoonEum.split(" ")[0]} {char.hanja}({char.hoonEum.split(" ")[1]}) &nbsp;&nbsp; |
                                                                &nbsp;&nbsp; {char.meaning}
                                                            </Typography>
                                                            <Typography color="textSecondary" gutterBottom>
                                                                부수: {char.radical} ({char.primaryHoonMeaning} &nbsp;
                                                                <i>{char.additionalHoonMeaning}</i>)
                                                                + {char.characterStrokeCount}획
                                                            </Typography>
                                                        </div>
                                                        <br/>
                                                        <div className="word-power-card-div-2">
                                                            <Typography>
                                                                <b><i>Select a word:</i></b>
                                                            </Typography>
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
                                                                    if (!item.hanqca.includes(char.hanja)) {
                                                                        return false;
                                                                    }
                                                                    return true;
                                                                }).map((wordTab, idx) => {
                                                                    return (
                                                                        <Tab
                                                                            id={wordTab.hanqca + "---" + wordTab.hankul + "---" + wordTab.englishGloss}
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
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <Card variant="outlined" className="word-power-card">
                                                    <CardContent className="word-power-card-content">
                                                        <div>
                                                            <Tabs
                                                                value={this.state.examplesTabValue}
                                                                onChange={this.handleOnChangeExamplesTab}
                                                                indicatorColor="primary"
                                                                textColor="primary"
                                                                centered
                                                                style={{padding: '2%'}}
                                                            >
                                                                <Tab label="간단한 한자 예문"/>
                                                                <Tab label="완벽한 한자 예문"/>
                                                                <Tab label="한글 예문"/>
                                                                <Tab label="영어 번역"/>
                                                            </Tabs>
                                                        </div>
                                                        {this.state.examplesTabValue === 0 &&
                                                        <div>
                                                            {this.state.wordPowerData.filter((item) => {
                                                                if (!item.hanqca.includes(char.hanja)) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).filter((i) => {
                                                                let clickedWordId = this.state.clickedWord.id.split("---");
                                                                if (!clickedWordId.includes(i.hanqca)) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).map((filteredItem, idx) => {
                                                                console.log(filteredItem);
                                                                if (filteredItem.examples.length === 0) {
                                                                    return (
                                                                        <div>
                                                                            <Typography>
                                                                                No sample sentences available.
                                                                            </Typography>
                                                                        </div>
                                                                    )
                                                                }
                                                                return (
                                                                    <div key={idx}>
                                                                        <ol>
                                                                            {filteredItem.examples.map((sentence, idx) => {
                                                                                    return (
                                                                                        <div key={idx}>
                                                                                            <li>
                                                                                                {sentence.simpleHanqca}
                                                                                            </li>
                                                                                            <br/>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </ol>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        }

                                                        {this.state.examplesTabValue === 1 &&
                                                        <div>
                                                            {this.state.wordPowerData.filter((item) => {
                                                                if (!item.hanqca.includes(char.hanja)) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).filter((i) => {
                                                                let clickedWordId = this.state.clickedWord.id.split("---");
                                                                if (!clickedWordId.includes(i.hanqca)) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).map((filteredItem, idx) => {
                                                                return (
                                                                    <div key={idx}>
                                                                        <ol>
                                                                            {filteredItem.examples.map((sentence, idx) => {
                                                                                    return (
                                                                                        <div key={idx}>
                                                                                            <li>
                                                                                                {sentence.hanqcaizedSentence}
                                                                                            </li>
                                                                                            <br/>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </ol>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        }

                                                        {this.state.examplesTabValue === 2 &&
                                                        <div>
                                                            {this.state.wordPowerData.filter((item) => {
                                                                if (!item.hanqca.includes(char.hanja)) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).filter((i) => {
                                                                let clickedWordId = this.state.clickedWord.id.split("---");
                                                                if (!clickedWordId.includes(i.hankul)) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).map((filteredItem, idx) => {
                                                                return (
                                                                    <div key={idx}>
                                                                        <ol>
                                                                            {filteredItem.examples.map((sentence, idx) => {
                                                                                    return (
                                                                                        <div key={idx}>
                                                                                            <li>
                                                                                                {sentence.koreanSentence}
                                                                                            </li>
                                                                                            <br/>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </ol>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        }

                                                        {this.state.examplesTabValue === 3 &&
                                                        <div>
                                                            {this.state.wordPowerData.filter((item) => {
                                                                if (!item.hanqca.includes(char.hanja)) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).filter((i) => {
                                                                let clickedWordId = this.state.clickedWord.id.split("---");
                                                                if (!clickedWordId.includes(i.englishGloss)) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).map((filteredItem, idx) => {
                                                                return (
                                                                    <div key={idx}>
                                                                        <ol>
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
                                                                        </ol>
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
