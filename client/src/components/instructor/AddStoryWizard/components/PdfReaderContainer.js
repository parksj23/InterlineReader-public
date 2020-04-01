import React, {Component} from 'react';
import {Grid, MenuItem, TextField, Button} from '@material-ui/core'
import { Document , Page} from 'react-pdf/dist/entry.webpack';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

class PdfReaderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagesSelected: [],
      numPages: null,
      pageNumber: 1
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  handlePrevPage = () => {
    let {pageNumber} = this.state
    this.setState({
      pageNumber: pageNumber > 1 ? pageNumber - 1 : pageNumber
    })
  }

  handleNextPage = () => {
    let {pageNumber} = this.state
    this.setState({
      pageNumber: pageNumber < this.state.numPages ? pageNumber + 1 : pageNumber
    })
  }

  render() {
    const { pageNumber, numPages } = this.state;
    return(
      <Grid container style={{height: "800px"}}>
        <Grid item xs={12}>
          PDF Reader
          <TextField
            id="story-class"
            select
            label="Class"
            value={this.props.pdfUrl}
            onChange={this.props.handleOnChangeField('pdfUrl')}
            margin="normal"
            style={{width: "100%"}}
          >
            {this.props.pdfList.map(option => (
              <MenuItem key={option.value} value={option.url}>
                {option.fileName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}/>
        <Grid item xs={8}>
          <Document
            file={this.props.pdfUrl}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <Grid container>
            <Grid item xs={3}>
              <NavigateBeforeIcon onClick={this.handlePrevPage}/>
            </Grid>
            <Grid item xs={6}>
              <p>Page {pageNumber} of {numPages}</p>
            </Grid>
            <Grid item xs={3}>
              <NavigateNextIcon onClick={this.handleNextPage}/>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}/>
            <Grid item xs={6}>
              <Button onClick={() => this.props.addPage(this.state.pageNumber)}> Select page </Button>
              <Button onClick={() => this.props.removePage(this.state.pageNumber)}> Unselect page </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default PdfReaderContainer;