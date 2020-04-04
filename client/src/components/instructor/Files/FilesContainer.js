import React, { Component, useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Grid, Button} from '@material-ui/core';
import {useDropzone} from 'react-dropzone';
import {uploadDroppedFiles, getFiles} from "../../../actions/instructor"
import TablePaginationWrapper from './common/TablePaginationWrapper'
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#e8e8e8',
  color: '#3c3c3c',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  marginTop: "36px",
  cursor: 'pointer'
};
const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const tableHeaders = [
  "filesName",
  "fileType",
  "created Date",
  "actions"
]


function Previews(props) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject} = useDropzone({
    accept: 'image/*, application/pdf',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      props.handleDrops(acceptedFiles)
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);


  const thumbs = files.map(file => (
    <Grid item xs={3}>
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
              alt={""}
            />
          </div>
        </div>
      <div>
        <p style={{overflowWrap: "break-word"}}>Name: {file.name}</p>
        <p>Type: {file.type}</p>
      </div>
    </Grid>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        <Grid container>
          {thumbs}
        </Grid>
      </aside>
    </section>
  );
}

class FilesContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      acceptedFiles: null
    }
  }
  componentWillMount(){
    this.props.getFiles(this.props.user)
  }

  handleDrops = (acceptedFiles) => {
    this.setState({
      acceptedFiles
    })
  }

  handleClickUpload = () => {
    this.props.uploadDroppedFiles(this.state.acceptedFiles, this.props.user)
    this.setState({
      acceptedFiles: null
    })
  }

  render() {
    let list = []
    this.props.instructor.files.forEach(aFile => {
      list.push({
        fileName: <a href={aFile.url} target="_blank">{aFile.fileName}</a>,
        fileType: aFile.fileType,
        createdDate: aFile.createdDate,
        action: <div><i className="material-icons">search</i><i className="material-icons">delete</i></div>
      })
    })

    return (
      <div className="classes-container">
        <Grid container>
          <Grid item xs={11}>
            <Previews handleDrops={this.handleDrops}/>
          </Grid>
          <Grid item xs={10}/>
          <Grid item xs={2}>
            <Button onClick={this.handleClickUpload}>UPLOAD</Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}> <h3>Files in database</h3></Grid>
          <Grid item xs={12}>
            <TablePaginationWrapper
              tableHeaders={tableHeaders}
              list={list}
            />

          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.auth.user,
  instructor: state.instructor
});

const mapDispatchToProps = ({
  uploadDroppedFiles, getFiles
})

export default connect(mapStateToProps, mapDispatchToProps)(FilesContainer);
//this.props.uploadDroppedFiles(acceptedFiles)