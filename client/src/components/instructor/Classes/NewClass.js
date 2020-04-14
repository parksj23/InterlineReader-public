import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select';

const statusMenu = [
  {
    label: 'active',
    value: 'active'
  },
  {
    label: 'pending',
    value: 'pending'
  },
  {
    label: 'archived',
    value: 'archived'
  }
]

class NewClass extends Component {
  constructor() {
    super()
    this.state = {
      className: "",
      classDesc: "",
      status: "",
      storyList: []
    }
  }

  componentDidMount() {
    const {classInfo, storyLists} = this.props;
    if(classInfo && storyLists.allStories) {
      let newStoryList = []
      storyLists.allStories.forEach(aStory => {
        if(classInfo.storyList.indexOf(aStory._id) > -1) {
          newStoryList.push(aStory.storyName)
        }
      })
      this.setState({
        className: classInfo.className,
        classDesc: classInfo.classDesc,
        status: classInfo.status,
        storyList: newStoryList,
        _id: classInfo._id
      })
    }
  }

  handleOnChangeField = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const {classInfo, storyLists, isEdit} = this.props;
    return (
      <Grid container>
        <Grid item xs={1}/>
        <Grid item xs={10} justify={'center'}>
          <h2 className={'new-class-form-title'}>{classInfo ? "Edit Class" : "New Class"}</h2>
        </Grid>
        <Grid item xs={1}/>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-grammar-form-label'}>Class Name</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="className"
                  margin="normal"
                  onChange={this.handleOnChangeField("className")}
                  style={{whiteSpace: "noWrap"}}
                  value={this.state.className}
                  fullWidth
                  multiline
                  disabled={isEdit}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-grammar-form-label'}>Class Description</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="pattern"
                  margin="normal"
                  onChange={this.handleOnChangeField("classDesc")}
                  style={{whiteSpace: "noWrap"}}
                  value={this.state.classDesc}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-grammar-form-label'}>Status</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="status"
                  select
                  value={this.state.status}
                  onChange={this.handleOnChangeField('status')}
                  margin="normal"
                  style={{width: "100%"}}
                >
                  {statusMenu.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span className={'edit-grammar-form-label'}>Story List</span>
              </Grid>
              <Grid item xs={8}>
                <Select
                  multiple
                  displayEmpty
                  value={this.state.storyList}
                  onChange={this.handleOnChangeField('storyList')}
                  inputProps={{
                    id: 'select-multiple-native',
                  }}
                >
                  {storyLists.allStories && storyLists.allStories.map(name => (
                    <MenuItem key={name.storyName} value={name.storyName}>
                      {name.storyName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}/>
          <Grid item xs={5}>
            <Button style={{marginRight: '4px'}}
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.handleAddNewClass(this.state)}
            >Save</Button>
            <Button style={{marginLeft: '4px'}}
                    variant="contained"
                    color="secondary"
                    onClick={this.props.handleCancel}
            >Cancel</Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default NewClass;


