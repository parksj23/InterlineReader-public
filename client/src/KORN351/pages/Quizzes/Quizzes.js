import React, {Component} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import './Quizzes.css';

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <Grid container>
                <Grid item md={1}/>
                <Grid item xs={12} md={10}>
                    <div className="col-lg-12 context engVer" style={{paddingBottom: "48px"}} id="theHeader">
                        <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
                            <h3 style={{textAlign: 'left', width: "50%"}}>
                                Quizzes
                            </h3>
                        </div>
                        <Divider style={{marginBottom: "0.5rem"}}/>
                        <br/>
                        <h5>New Characters & 부수</h5><br/>
                        <div className="flashcard-deck-container">
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 1
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 2
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 3
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 4
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="flashcard-deck-card">
                                <CardContent >
                                    Lesson 5
                                </CardContent>
                            </Card>
                        </div>


                        <br/><br/>
                        <h5>Radicals</h5><br/>

                        <h5>Phonetics</h5><br/>

                        <h5>New Combos Vocab</h5><br/>

                        <h5>All Combos Vocab</h5><br/>

                        <h5>Practice Sentences</h5><br/>


                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        phonetics : state.okpyeon.phonetics
    };
};

export default withRouter(connect(mapStateToProps)(Quizzes));
