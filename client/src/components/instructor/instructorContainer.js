import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Instructor from "./component/Instructor";
import {changeSelectedMenu, initInstructor} from "../../actions/KORN410/instructor";
import {disableSideBarButton} from "../../actions/KORN410/dashboard";
import EditGrammarContainer from "./EditGrammar/EditGrammarContainer";
import EditStoryContainer from './EditStory/EditStoryContainer';
import EditVocabContainer from "./EditVocab/EditVocabContainer";
import addMidKRGramContainer from "./AddMidKRGram/AddMidKRGramContainer";
import addMidKRVocContainer from "./AddMidKRVoc/AddMidKRVocContainer"
import ClassesContainer from './Classes/ClassesContainer';
import Stories from "./stories/Stories";
import InstructorMenu from "./component/InstructorMenu";
import FilesContainer from './Files/FilesContainer'
import AddStoryWizardContainer from "./AddStoryWizard/AddStoryWizardContainer";
import "./style/instructor.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class InstructorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldName: null
        };
    }

    componentWillMount() {
        this.props.initInstructor(this.props.storyList);
        this.props.disableSideBarButton();
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
                                            path="/instructor"
                                            component={Stories}
                                        />
                                        <Route path="/instructor/classes" component={ClassesContainer}/>
                                        <Route
                                            path="/instructor/addStory"
                                            component={AddStoryWizardContainer}
                                        />
                                        <Route
                                            path="/instructor/editStory"
                                            component={EditStoryContainer}
                                        />
                                        <Route
                                            path="/instructor/editGrammar"
                                            component={EditGrammarContainer}
                                        />
                                        <Route
                                            path="/instructor/editVocab"
                                            component={EditVocabContainer}
                                        />
                                        <Route
                                            path="/instructor/addMidKRGram"
                                            component={addMidKRGramContainer}
                                        />
                                        <Route
                                            path="/instructor/addMidKRVocab"
                                            component={addMidKRVocContainer}
                                        />
                                        <Route
                                            path="/instructor/files"
                                            component={FilesContainer} />
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
    initInstructor,
    disableSideBarButton
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstructorContainer);

//If need to rename collection, add this
/* <TextField
  id="standard-name"
  label="Name"
  value={this.state.oldName}
  onChange={this.handleChange('oldName')}
  margin="normal"
/>
<Button onClick={this.renameCollections}> RENAME </Button>*/
