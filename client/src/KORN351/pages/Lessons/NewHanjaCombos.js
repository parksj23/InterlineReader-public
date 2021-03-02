import React, {Component} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import './AboutNewPhonetics.css';
import NavigatingButtons from "../../components/Lessons/NavigatingButtons/NavigatingButtons";
import {getNewHanjaCombos} from "../../../actions/KORN351/Lessons";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';

class NewHanjaCombos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newHanjaCombos: []
        }
    }

    componentWillMount() {
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

    componentDidMount() {
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

    render() {
        const {newHanjaCombos} = this.state;

        return (
            <Grid container>
                <Grid item md={1}/>
                <Grid item xs={12} md={10}>
                    <div className="col-lg-12 context engVer" style={{paddingBottom: "48px"}} id="theHeader">
                        <div className={'storyHeader'} style={{display: "flex", width: "100%"}}>
                            <h3 style={{textAlign: 'left', width: "50%"}}>
                                New 한자 Combos
                            </h3>
                        </div>
                        <Divider style={{marginBottom: "0.5rem"}}/>
                        <Grid container style={{height: '100%'}}>
                            {
                                newHanjaCombos.map( combo => {
                                    return (
                                        <Grid item xs={3}>
                                            <Card variant="outlined">
                                                <CardContent  className="new-hanja-card-content">
                                                    <div style={{display: 'flex'}}>
                                                    <Typography variant="h5" component="h2">
                                                        {combo.hanja}
                                                    </Typography>
                                                    <Typography color="textSecondary" style={{marginLeft: '10%'}} gutterBottom>
                                                        {combo.kor}
                                                    </Typography>
                                                    </div>
                                                    <br/>
                                                    <Typography variant="h6">
                                                        {combo.eng}
                                                    </Typography>
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
        newHanjaCombos : state.lessons.newHanjaCombos
    };
};

export default withRouter(connect(mapStateToProps, {getNewHanjaCombos})(NewHanjaCombos));
