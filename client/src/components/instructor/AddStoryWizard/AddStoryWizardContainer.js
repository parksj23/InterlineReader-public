/*TODO: disable save button if story already exist in database
  TODO: Extend preview screen to fit entire window
  TODO: Create another preview tab so user cans witch between english and korean previews
  TODO: Cleanly unmount componeont
*/
import React, {Component} from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style/AddStoryWizard.css';
import {Link, Route, Switch} from "react-router-dom";
import AddStoryWizard from "./AddStoryWizard";
import {connect} from "react-redux";
import {Grid, Button} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClassCard from "./components/classCard";


class AddStoryWizardContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabValue: 0,
            openStatus: false,
            statusMessage: "",
            saveDisabled: true,
            numOfSections: 1
        };

        this.renderAddStoryWizard.bind(this)
        this.renderClassStories.bind(this)
    }

    componentWillMount() {
    }

    checkDisabled = (storyForm) => {
        let keys = ["authorKorn", "authorRom", "titleKorn", "titleRom", "titleEng", "storyName", "language"]
        for (let aKey of keys) {
            if (!storyForm[aKey]) {
                return true
            }
        }
        return false
    }

    handleOnChangeTab = (event, value) => {
        this.setState({tabValue: value});
    }

    handleOnChangeField = name => event => {
        let storyForm = this.state.storyForm;
        storyForm[name] = event.target.value
        if (name === "titleRom") {
            storyForm["storyName"] = event.target.value.toLowerCase();
        }
        this.setState({
            storyForm,
            saveDisabled: this.checkDisabled(storyForm),
        })
    }
    handleStatusClose = () => {
        this.setState({
            openStatus: false
        })
    }
    renderClassStories = () => {
        console.log('renderClassStories')
        let {storyLists} = this.props;
        let classCards = [];
        if(storyLists && storyLists.allStories) {
            storyLists.allStories.forEach((aStory, index) => {
                classCards.push(
                    <Grid item xs={4} key={'story_badge' + aStory._id} style={{padding: '12px'}}>
                        {<Link to={`/instructor/addStory/${aStory._id}`} className={'card-link'}>
                            <ClassCard story={aStory} style={{width: "100%"}}/>
                        </Link>}
                    </Grid>
                )
            })
        }
        return (
            <Grid container style={{width: '100%', display: 'flex'}}>
                {classCards}
                <Grid item xs={4} key={'add_story'} style={{padding: '12px'}} className='add-new-button'>
                    <Link to={`/instructor/addStory/new`} className='add-button-link'>

                        <Button key={this.props.key}
                                disabled={this.props.saveDisabled}
                                variant="contained"
                                style={{backgroundColor: '#00284d', color: 'white', fontWeight: 'bold'}}
                        >
                            <AddCircleIcon className='add-icon' style={{ fontSize: 60}}/>
                            Create New Story
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        )
    }

    renderAddStoryWizard = (storyId) => {
        let {storyLists} = this.props
        let storyInfo = []
        if(storyLists && storyLists.allStories){
            storyInfo = this.props.storyLists.allStories.filter(aStory => {
                return aStory._id === storyId
            })
        }
        return (
            <AddStoryWizard storyInfo={storyInfo[0]} user={this.props.user.id}/>
        )
    }

    render() {
        return (
            <div className={'addStoryContainer'}>
                <Switch>
                    <Route exact path="/instructor/addStory" component={() => this.renderClassStories()}/>
                    <Route exact path="/instructor/addStory" component={() => this.renderAddStoryWizard()}/>
                    <Route path="/instructor/addStory/:id" component={(routerProps) => this.renderAddStoryWizard(routerProps.match.params.id)}/>
                </Switch>
            </div>
        )
    }

}


const mapStateToProps = state => ({
    instructor: state.instructor,
    user: state.auth.user,
    dashboard: state.dashboard,
    storyLists: state.app.storyLists
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AddStoryWizardContainer);