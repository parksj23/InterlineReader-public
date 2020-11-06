import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
    headerRoot: {
        backgroundColor: "#002145",
    },
    headerTitle: {
        color: "#FFFFFF"
    },
    subHeaderTitle: {
        color: "#FFFFFF"
    },
    content: {
        color: "#0f0F0F"
    }

}

const ClassCard = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);

    let storyInfo = props.story;
    const {classes} = props;

    const handleClickPreview = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePreview = () => {
        setAnchorEl(null);
    };

    const handleClickDetails = (event) => {
        setAnchorE2(event.currentTarget);
    };

    const handleCloseDetails = () => {
        setAnchorE2(null);
    };

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorE2);

    return (
        <Card style={{width: "100%"}}>
            <Link to={`/story?storyTitle=${storyInfo.storyName}`} className={'card-link'}>
                <CardHeader title={storyInfo.titleKorn} subheader={storyInfo.titleEng} classes={{root: classes.headerRoot, title: classes.headerTitle, subheader: classes.subHeaderTitle}}>
                </CardHeader>
                <CardContent classes={{root: classes.content}}>
                    <div>
                        <p>Author: {storyInfo.authorKorn} ({storyInfo.authorRom})</p>
                    </div>
                </CardContent>
                <Divider/>
            </Link>
            <CardActions>
                <Button onClick={handleClickPreview}><i className="material-icons">pageview</i></Button>
                <Popover
                    open={open}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    onClose={handleClosePreview}
                    anchorEl={anchorEl}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    style={{width: '70%'}}
                ><p style={{fontWeight: 'bold', fontSize: '18px'}}>Preview : </p>{storyInfo.preview}</Popover>
                <Button onClick={handleClickDetails}><i className="material-icons">list</i></Button>
                <Popover
                    open={open2}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    onClose={handleCloseDetails}
                    anchorEl={anchorE2}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    style={{width: '100%'}}
                >
                    <p>
                        <span style={{fontWeight: 'bold', fontSize: '18px'}}>Title: </span>
                        {storyInfo.titleRom}
                    </p>
                    <p>
                        <span style={{fontWeight: 'bold'}}>Available language(s):&nbsp;</span>
                        {storyInfo.languages.map(lang =>
                            <span>* {lang === "MODKR"? "Modern Korean" : lang === "ENGSH"? "English" : "N/A"} &nbsp;</span>)}
                    </p>
                </Popover>
            </CardActions>
        </Card>)
}


export default withStyles(styles)(ClassCard);