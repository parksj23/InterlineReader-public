/*TODO: disable save button if story already exist in database
  TODO: Extend preview screen to fit entire window
  TODO: Create another preview tab so user cans witch between english and korean previews
  TODO: Cleanly unmount componeont
*/
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SectionDivider from './components/SectionDivider';
import StatusMessage from '../../common/statusMessage/statusMessage';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style/AddStoryWizard.css';
import {EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {addToStory, addStoryInfo,handleStatusClose} from '../../../actions/instructor';
import {connect} from 'react-redux';
import StorySection from './components/StorySection';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



const styleProperties = {
  "text-align": "textAlign",
  "font-family": "fontFamily",
  "font-size": "fontSize"
}

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
        class: "410B",
        language: "ENGSH",
        region: "KR",
        instructor: ""
      },
      openStatus: false,
      statusMessage: "",
      saveDisabled: false,
      numOfSections: 1
    };
  }

  onComponentDidMount = () => {
    this.setState({
      storyForm: {
        ...this.state.storyForm,
        instructor: this.props.instructorId
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
    let keys = Object.keys(storyForm)
    for(let aKey of keys){
      if (!storyForm[aKey]){
        return true
      }
    }
    return false
  }

  handleOnSave = () => {
    let stringToSave = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).replace("<br/>", "\\n");
    let textToSend = [];
    let order_id = 1;
    let styleArr = []

    stringToSave = stringToSave.replace(/&lt;/ugi, "<").replace(/&gt;/ugi, ">").replace(/(&amp;|&*nbsp;)/ugi, "");

    if(this.doesStoryExist(this.state.storyForm).length > 0){
      //Warning
      console.log("Story Exist!")
    }
    else {
      if(this.state.storyForm.language !== "ENGSH") {
        stringToSave = stringToSave.replace(/(<br>)/ugi, "\\n")
        // Grab all text within <p> tags
        stringToSave.replace(/<(.+?)<\/p>/ugi, (match, ci) => {

          //Grab all styles within tag
          ci.replace(/[^p]style="(.+?);">/ugi, (match, c2) => {
            let styles = c2.split(";")
            styles.map(aStyleProp => {
              let propArr = aStyleProp.split(':');
              let prop = {};
              prop[styleProperties[propArr[0]]] = propArr[1]
              styleArr.push(prop)
            })
          })
          let cleanLine = [];
          //grab all text within <span> tag
          ci.replace(/<span\b[^>]*>(.+?)<\/span>/ugi, (match, c3) => {
            cleanLine.push(c3.replace("\\n", ""))
          })

          let styleObj = styleArr.reduce(function (acc, x) {
            for (var key in x) acc[key] = x[key];
            return acc;
          }, {});

          //join array with spaces, then capture all segments where a whtiespace from joining is not needed
          // such as a comma or period
          let finalText = cleanLine.filter(segment => segment !== " ").join(" ").replace(/([\u3131-\uD79D]\s[^\w\s|^\u3131-\uD79D])/ugi, (match, c4)=>{
            return c4.replace(/\s+/, "").trim()
          })

          // handle whitespace around quotations
          finalText = finalText.replace(/[\s]"\s/ugi, (match, c5)=>{
            return ' "'
          })

          textToSend.push({
            text: finalText,
            order_id,
            style: styleObj,
            language: this.state.storyForm.language
          })
          order_id++
        })
      }
      else{
        stringToSave.replace(/<(.+?)<\/p>/ugi, (match, ci) => {
          let lineSegment = {};
          match.replace(/[^p]style="(.+?);">/ugi, (match, c2) => {
            let styles = c2.split(";")
            styles.map(aStyleProp => {
              let propArr = aStyleProp.split(':');
              let prop = {};
              prop[styleProperties[propArr[0]]] = propArr[1]
              styleArr.push(prop)
            })
            let styleObj = styleArr.reduce(function (acc, x) {
              for (var key in x) acc[key] = x[key];
              return acc;
            }, {});
            lineSegment["style"] = styleObj
          })
          ci.replace(/>(.+)/ugi, (match, c3) => {
            lineSegment["text"] = c3.replace(/(&amp;|[&*]nbsp;)/ugi, "");
            lineSegment["order_id"] = order_id
            order_id++
          })
          textToSend.push(lineSegment)
        })
      }
  
      //this.props.addToStory(textToSend, this.state.storyForm);
      console.log(this.state.storyForm)
      //this.props.addStoryInfo(this.state.storyForm);
    }
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
      saveDisabled: this.checkDisabled(storyForm) || this.state.editorState.getCurrentContent().hasText(),
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

  renderStorySections = () => {
    let sections = []

    for(let i = 0; i < this.state.numOfSections ; i++){
      sections.push(<StorySection isFirst={i===0}  key={`story-section-${i}`} storyForm={this.state.storyForm} instructorId={this.props.instructorId}/>);
      sections.push(<SectionDivider key={i}/>);
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
              id="story-class"
              select
              label="Class"
              value={this.state.storyForm.class}
              onChange={this.handleOnChangeField('class')}
              margin="normal"
              style={{width: "100%"}}
            >
              {classes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
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
        {this.renderStorySections()}
      </div>


    )


  }


}

const mapStateToProps = state => ({
  instructor: state.instructor,
  instructorId: state.auth.user.id
});

const mapDispatchToProps = ({
  addToStory,
  addStoryInfo,
  handleStatusClose
})

export default connect(mapStateToProps, mapDispatchToProps)(AddStoryWizard);