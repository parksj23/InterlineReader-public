import React, {Component} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import './AboutNewPhonetics.css';
import NavigatingButtons from "../../components/Lessons/NavigatingButtons/NavigatingButtons";
import {getPhonetics} from "../../../actions/KORN351/Okpyeon";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';

class AboutNewPhonetics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phonetics: [],
            currentLesson: this.props.match.params.lesson
        }
    }

    componentWillMount() {
        if (this.props.phonetics.length === 0 || this.props.phonetics === undefined) {
            this.props.getPhonetics().then(() => {
                const currLesson = this.props.match.params.lesson;

                let temp = this.props.phonetics.filter(ph => {
                    return ph.lesson === parseInt(currLesson)
                });
                this.setState({
                    phonetics: temp
                })
            }
            );
        }
    }

    componentDidMount() {
        if (this.state.phonetics.length === 0) {
            const currLesson = this.props.match.params.lesson;

            let temp = this.props.phonetics.filter(ph => {
                return ph.lesson === parseInt(currLesson)
            });
            this.setState({
                phonetics: temp
            });
        }
    }

    render() {
        const {phonetics} = this.state;

        return (
            <Grid container>
                <Grid item md={1}/>
                <Grid item xs={12} md={10}>
                    <div className="col-lg-12 context engVer" style={{paddingBottom: "48px"}} id="theHeader">
                        <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
                            <h3 style={{textAlign: 'left', width: "50%"}}>
                                About the New Phonetics
                            </h3>
                        </div>
                        <div>
                            <h4 style={{textAlign: 'left', width: "50%"}}>
                                제 {this.state.currentLesson} 과
                            </h4>
                        </div>
                        <Divider style={{marginBottom: "0.5rem"}}/>
                        <Grid container style={{overflowY: 'auto', height: '100%'}}>
                            {
                                phonetics.map( phonetic => {
                                    return phonetic ? (
                                        <Grid item xs={6} className="grid-card">
                                            <Card variant="outlined" className="phonetics-card">
                                                <CardContent  className="phonetics-card-content">
                                                    <Typography variant="h5" component="h2">
                                                        Phonetic {phonetic.phonetic} ({phonetic.pronunciation}{phonetic.sub_pronunciation? '~'+phonetic.sub_pronunciation : ''})
                                                    </Typography>
                                                    <br/>
                                                    <Typography color="textSecondary" gutterBottom>
                                                        Observe the phonetic element <b>{phonetic.phonetic} ({phonetic.pronunciation}{phonetic.sub_pronunciation? '~'+phonetic.sub_pronunciation : ''})</b> in the
                                                        following commonly used Chinese characters, all pronounced <b>{phonetic.pronunciation}</b>:
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        {(phonetic.characters || []).map(charac => {return <span><b>&nbsp;&nbsp;&nbsp;&nbsp;{charac}</b></span>})}
                                                    </Typography>
                                                    {
                                                        !phonetic.sub_pronunciation ? '' :
                                                            <Typography color="textSecondary" gutterBottom>
                                                                <br/>
                                                                Note that this phonetic can also be read as <b>{phonetic.sub_pronunciation}</b>:
                                                            </Typography>
                                                    }
                                                    {
                                                        !phonetic.sub_characters ? '' :
                                                            <Typography variant="h6">
                                                                {(phonetic.sub_characters || []).map(charac => {return <span><b>&nbsp;&nbsp;&nbsp;&nbsp;{charac}</b></span>})}
                                                            </Typography>
                                                    }
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ) : ''
                                })
                            }
                        </Grid>
                    </div>
                </Grid>
                <NavigatingButtons />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        phonetics : state.okpyeon.phonetics
    };
};

export default withRouter(connect(mapStateToProps, {getPhonetics})(AboutNewPhonetics));
