import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Instructor from "./component/Instructor";
import InstructorMenu from "./component/InstructorMenu";
import "./style/instructor.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {disableSideBarButton} from "../../../actions/KORN410/dashboard";
import {changeSelectedMenu} from "../../../actions/KORN410/instructor";
import LessonList from "./Common/StoryList/LessonList";
import EditLesson from "../../components/InstructorPanel/EditLesson";
import EditOkpyeon from "../../components/InstructorPanel/EditOkpyeon";


class Instructor351Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldName: null
        };
    }

    componentWillMount() {
        //this.props.initInstructor(this.props.storyList);
        this.props.disableSideBarButton();
        this.props.changeSelectedMenu("Edit Lesson")
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        return (
            <div className="instructorContainer">
                <Paper>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className="instructor-heading">
                                <h2 style={{fontWeight: 'bold'}}>{this.props.headerName}</h2>
                            </div>
                        </Grid>
                        <Grid container style={{height: "100vh", overflowY: 'scroll'}}>
                            <Grid item xs={2}>
                                <InstructorMenu
                                    history={this.props.history}
                                    changeSelectedMenu={this.props.changeSelectedMenu}
                                    isLoading={this.props.isLoading}
                                />
                                <Grid/>
                            </Grid>
                            <Grid item xs={10}>
                                <Instructor>
                                    <Switch>
                                        <Route
                                            exact
                                            path="/instructor351"
                                            component={LessonList}
                                        />
                                        <Route
                                            exact
                                            path="/instructor351/editLesson"
                                            component={LessonList}
                                        />
                                        <Route path="/instructor351/editLesson/:id"
                                        component={EditLesson}/>
                                        <Route
                                            exact
                                            path="/instructor351/editOkpyeon"
                                            component={LessonList}
                                        />
                                        <Route path="/instructor351/editOkpyeon/:id"
                                               component={EditOkpyeon}/>

                                    </Switch>
                                </Instructor>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selected: state.instructor.selectedMenu,
    headerName: state.instructor.headerName,
    storyList: state.app.storyList,
    isLoading: state.instructor.isLoading
});

const mapDispatchToProps = {
    changeSelectedMenu,
    //initInstructor,
    disableSideBarButton
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Instructor351Container);

//If need to rename collection, add this
/* <TextField
  id="standard-name"
  label="Name"
  value={this.state.oldName}
  onChange={this.handleChange('oldName')}
  margin="normal"
/>
<Button onClick={this.renameCollections}> RENAME </Button>*/
