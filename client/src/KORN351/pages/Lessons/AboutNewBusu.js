import React, {Component} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import './AboutNewPhonetics.css';
import NavigatingButtons from "../../components/Lessons/NavigatingButtons/NavigatingButtons";
import {getAboutNewBusu} from "../../../actions/KORN351/Lessons";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';

class AboutNewBusu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutNewBusu: []
        }
    }

    componentWillMount() {
        if (this.props.aboutNewBusu.length === 0 || this.props.aboutNewBusu === undefined) {
            this.props.getAboutNewBusu().then(() => {
                    const currLesson = this.props.match.params.lesson;

                    let temp = this.props.aboutNewBusu.filter(word => {
                        return word.lesson === currLesson
                    });
                    this.setState({
                        aboutNewBusu: temp
                    })
                }
            );
        }
    }

    componentDidMount() {
        if (this.state.aboutNewBusu.length === 0) {
            const currLesson = this.props.match.params.lesson;

            let temp = this.props.aboutNewBusu.filter(word => {
                return word.lesson === currLesson
            });
            this.setState({
                aboutNewBusu: temp
            });
        }
    }

    render() {
        const {aboutNewBusu} = this.state;

        return (
            <Grid container>
                <Grid item md={1}/>
                <Grid item xs={12} md={10}>
                    <div className="col-lg-12 context engVer" style={{paddingBottom: "48px"}} id="theHeader">
                        <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
                            <h3 style={{textAlign: 'left', width: "50%"}}>
                                새 부수에 대하여
                            </h3>
                        </div>
                        <Divider style={{marginBottom: "0.5rem"}}/>
                        <Grid container>
                            {
                                aboutNewBusu.map( busu => {
                                    return (
                                        <Grid item xs={6} className="grid-card">
                                            <Card variant="outlined" style={{padding: '2%'}}>
                                                <CardContent  className="phonetics-card-content" style={{maxHeight: '350px', overflowY: 'auto'}}>
                                                    <Typography variant="h5" component="h2">
                                                        {busu.word} &nbsp;&nbsp; | &nbsp;&nbsp; {busu.def}
                                                    </Typography>
                                                    <Typography color="textSecondary" gutterBottom>
                                                        부수: {busu.busu}
                                                    </Typography>
                                                    <br/>
                                                    <Typography variant="p">
                                                        {busu.description}
                                                    </Typography>
                                                    <br/><br/>
                                                    {
                                                        busu.examples.map(b => {
                                                            return <div style={{margin: '2%'}}>{b.word} :   {b.def}</div>
                                                        })
                                                    }
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
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
        aboutNewBusu : state.lessons.aboutNewBusu
    };
};

export default withRouter(connect(mapStateToProps, {getAboutNewBusu})(AboutNewBusu));
