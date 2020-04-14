import React, {Component} from 'react';
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { Document , Page} from 'react-pdf/dist/entry.webpack';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const OriginalTextStyle = {
  top: "2.5vh",
  left: "21vw",
  height: "92.5vh",
  width: "60%",
  position: 'absolute'
}

class OriginalTextContainer extends Component {

  constructor(){
    super()
    this.state = ({
      numPages: null,
      pageNumber: null,
      selectedPages: []
    })
  }

  componentDidMount(){
    this.setState({
      selectedPages: this.props.selectedPages,
      pageNumber: this.props.selectedPages[0]
    })
  }

  onDocumentLoadSuccess = () => {
    this.setState({ numPages: this.props.selectedPages.length });
  }

  handlePrevPage = () => {
    let {pageNumber} = this.state
    let index = this.state.selectedPages.indexOf(this.state.pageNumber)
    this.setState({
      pageNumber: index > 0 ? this.state.selectedPages[index-1] : pageNumber
    })
  }

  handleNextPage = () => {
    let {pageNumber} = this.state
    let index = this.state.selectedPages.indexOf(this.state.pageNumber)
    this.setState({
      pageNumber: index < this.state.selectedPages.length -1 ? this.state.selectedPages[index+1] : pageNumber
    })
  }

  render(){
    const { pageNumber, numPages } = this.state;

    return(
      <Card style={OriginalTextStyle}>
        <Grid container>
          <Grid item xs={1}>
            <NavigateBeforeIcon onClick={this.handlePrevPage}/>
          </Grid>
          <Grid item xs={10}>
            <div style={{textAlign: "center"}}>
              <p>Page {pageNumber} of {numPages}</p>
            </div>
          </Grid>
          <Grid item xs={1}>
            <NavigateNextIcon onClick={this.handleNextPage}/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <Document
          file={this.props.url}
          onLoadSuccess={this.onDocumentLoadSuccess}
          className={'pdf-document'}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        </Grid>
      </Card>
    )
  }
}

const mapStatetoProps = state => ({
})

export default connect(mapStatetoProps) (OriginalTextContainer)