/*TODO: disable save button if story already exist in database
  TODO: Extend preview screen to fit entire window
  TODO: Create another preview tab so user cans witch between english and korean previews
  TODO: Cleanly unmount componeont
*/
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style/AddStoryWizard.css';
import {EditorState} from 'draft-js';
import {addToStory, addStoryInfo,handleStatusClose, getFiles} from '../../../actions/instructor';
import {connect} from 'react-redux';
import StorySection from './components/StorySection';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PdfReaderContainer from "./components/PdfReaderContainer";

const classes = [
  {
    value: "410A",
    label: "410A"
  },
  {
    value: "410B",
    label: "410B"
  }
]

class AddStoryWizard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
      tabValue: 0,
      storyForm: {
        authorKorn: "",
        authorRom: "",
        titleKorn: "",
        titleRom: "",
        titleEng: "",
        storyName: "",
        language: "ENGSH",
        region: "KR",
        instructor: "",
        pdfUrl: "",
        pagesSelected: []
      },
      openStatus: false,
      statusMessage: "",
      saveDisabled: true,
      numOfSections: 1
    };

    this.addPage.bind(this)
    this.removePage.bind(this)
  }

  componentWillMount(){
    this.props.getFiles(this.props.user);
  }

  onComponentDidMount = () => {
    this.setState({
      storyForm: {
        ...this.state.storyForm,
        instructor: this.props.auth.user.id
      }
    })
  }
  
  onEditorStateChange = (editorState) => {

    this.setState({
      editorState,
      saveDisabled: this.checkDisabled(this.state.storyForm) || !editorState.getCurrentContent().hasText()
    });
  };

  checkDisabled = (storyForm) => {
    let keys = ["authorKorn", "authorRom", "titleKorn", "titleRom", "titleEng", "storyName", "language"]
    for(let aKey of keys){
      console.log(aKey)
      if (!storyForm[aKey]){
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
    if(name ==="titleRom") {
      storyForm["storyName"] = event.target.value.toLowerCase();
    }
    this.setState({
      storyForm,
      saveDisabled: this.checkDisabled(storyForm),
    })
  }

  handleAddSection = () => {
    this.setState({
      numOfSections: this.state.numOfSections + 1
    })
  }

  handleSaveAll =() => {
    let sectionSaveButtons = document.getElementsByClassName('story-section-save-button');
    for(let aSection of sectionSaveButtons){
      aSection.click();
    }
  }

  doesStoryExist = (storyInfo) => {
    let {instructor} = this.props;
    if(!instructor.storyList) return false;
    return instructor.storyList.filter(aStory =>{
      return (
        storyInfo === aStory
      )
    })
  }

  handleStatusClose = () => {
    this.setState({
      openStatus: false
    })
  }

  addPage = (pageNumber) => {
    if(this.state.storyForm.pagesSelected.indexOf(pageNumber) === -1) {
      let newPagesSelected = this.state.storyForm.pagesSelected
      newPagesSelected.push(pageNumber)
      let newStoryForm = this.state.storyForm
      newStoryForm.pagesSelected = newPagesSelected
      this.setState({
        storyForm: newStoryForm
      })
    }
  }

  removePage = (pageNumber) => {
    let index = this.state.storyForm.pagesSelected.indexOf(pageNumber)
    if(index > -1) {
      let newStoryForm = this.state.storyForm
      let newPagesSelected = this.state.storyForm.pagesSelected
      newPagesSelected.splice(index,1)
      newStoryForm.pagesSelected = newPagesSelected
      this.setState({
        storyForm: newStoryForm
      })
    }
  }

  renderStorySections = () => {
    let sections = []

    for(let i = 0; i < this.state.numOfSections ; i++){
      sections.push(<StorySection isFirst={i===0}  key={`story-section-${i}`} storyForm={this.state.storyForm} instructorId={this.props.user.instructorId}/>);
    }
    return sections;
  }


  render() {
    return (
      <div className={'addStoryContainer'}>
        <div style={{paddingLeft: "12px", display: "flex", borderBottom: "solid 1px #000"}}>
          <Grid container style={{marginTop: "12px"}}>
            <Grid item xs={8}/>
            <Grid item xs={4}>
              <Button style={{float: "right"}} onClick={() => this.handleSaveAll()} disabled={this.state.saveDisabled}>Save All</Button>
              <Button style={{float: "right"}} onClick={() => this.handleAddSection()} disabled={this.state.numOfSections >= 4}>Add Section</Button>
            </Grid>
          </Grid>
        </div>
        <Grid container>
          <Grid item xs={3}>
            <TextField
              required
              id="story-name"
              label="Story Title"
              margin="normal"
              variant="outlined"
              onChange={this.handleOnChangeField("titleKorn")}
              style={{whiteSpace: "noWrap"}}
            />
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={3}>
            <TextField
              required
              id="story-author"
              label="Story Author"
              margin="normal"
              variant="outlined"
              onChange={this.handleOnChangeField("authorKorn")}
              style={{whiteSpace: "noWrap"}}
            />
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={3}>
            <TextField
              required
              id="story-name-romanization"
              label="Story Name (Romanization)"
              margin="normal"
              variant="outlined"
              onChange={this.handleOnChangeField("titleRom")}
              style={{whiteSpace: "noWrap"}}
            />
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={3}>
            <TextField
              required
              id="story-author-romanize"
              label="Story Author (Romanization)"
              margin="normal"
              variant="outlined"
              onChange={this.handleOnChangeField("authorRom")}
              style={{whiteSpace: "noWrap"}}
            />
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={3}>
            <TextField
              required
              id="story-title-english"
              label="Story Title (English)"
              margin="normal"
              variant="outlined"
              onChange={this.handleOnChangeField("titleEng")}
              style={{whiteSpace: "noWrap"}}

            />
          </Grid>
        </Grid>
        <Grid container>
        {this.renderStorySections()}
        </Grid>
        <Grid container>
          <PdfReaderContainer
            pdfList={this.props.instructor.files}
            handleOnChangeField={this.handleOnChangeField}
            pdfUrl={this.state.storyForm.pdfUrl}
            addPage={this.addPage}
            removePage={this.removePage}
            pagesSelected={this.state.storyForm.pagesSelected}
          />
        </Grid>
      </div>
    )
  }


}

const mapStateToProps = state => ({
  instructor: state.instructor,
  user: state.auth.user
});

const mapDispatchToProps = ({
  addToStory,
  addStoryInfo,
  handleStatusClose,
  getFiles
})

export default connect(mapStateToProps, mapDispatchToProps)(AddStoryWizard);