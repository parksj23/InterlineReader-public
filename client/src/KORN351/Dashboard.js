import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import './Dashboard.css';

const useStyles = makeStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function Dashboard() {

    const classes = useStyles();

    return (
        <div className="dashboard">
            <div className="instructor-heading" style={{marginBottom: '1%'}}>
                <h2 style={{fontWeight: 'bold'}}>KORN 351 : Dashboard</h2>
                <p>Click on any of the boxes below to navigate to the corresponding material.</p>
            </div>
            <div className="card-container">

                <Card className="card" onClick={() => {document.getElementById("lessonModal").style.display="block"}}>
                    <h1>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Lessons
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Main Texts & Practice Sentences
                            </Typography>
                            <Typography variant="body2" component="p">
                                View each lesson
                            </Typography>
                        </CardContent>
                    </h1>
                </Card>
                <Card className="card">
                    <h1>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Quizzes
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Quiz yourself with various flash card decks
                            </Typography>
                            <Typography variant="body2" component="p">
                                View flash card decks
                            </Typography>
                        </CardContent>
                    </h1>
                </Card>
                <Card className="card" onClick={() => {document.getElementById("dictionaryModal").style.display="block"}}>
                    <h1>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                옥편
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Search for a character easily by Radical, Hangul or Lesson
                            </Typography>
                            <Typography variant="body2" component="p">
                                Search characters
                            </Typography>
                        </CardContent>
                    </h1>
                </Card>
                <Card className="card">
                    <h1>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                From 한자 to 한문
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                After learning 한자 (漢字), try learning 한문 (漢文)
                            </Typography>
                            <Typography variant="body2" component="p">
                                View various 사자성어 (四字成語)
                            </Typography>
                        </CardContent>
                    </h1>
                </Card>
            </div>
            <div id="dictionaryModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => {document.getElementById("dictionaryModal").style.display="none"}}>&times;</span>
                    <Typography variant="h5" component="h2">Choose how you would like to search . . .</Typography>
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <Link to="/dashboard/KORN351/dictionary/radical">
                            <div className="modal-options">By Radical</div>
                        </Link>
                        <Link to="/dashboard/KORN351/dictionary/radical">
                            <div className="modal-options">By Hangul</div>
                        </Link>
                        <Link to="/dashboard/KORN351/dictionary/radical">
                            <div className="modal-options">By Lesson</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div id="lessonModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => {document.getElementById("lessonModal").style.display="none"}}>&times;</span>
                    <Typography variant="h5" component="h2">Choose a lesson . . .</Typography>
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <Link to="/dashboard/KORN351/lesson/1">
                            <div className="modal-options">Lesson 1</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/2">
                            <div className="modal-options">Lesson 2</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/3">
                            <div className="modal-options">Lesson 3</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/4">
                            <div className="modal-options">Lesson 4</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/5">
                            <div className="modal-options">Lesson 5</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/6">
                            <div className="modal-options">Lesson 6</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/7">
                            <div className="modal-options">Lesson 7</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/8">
                            <div className="modal-options">Lesson 8</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/9">
                            <div className="modal-options">Lesson 9</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/10">
                            <div className="modal-options">Lesson 10</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/11">
                            <div className="modal-options">Lesson 11</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/12">
                            <div className="modal-options">Lesson 12</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/13">
                            <div className="modal-options">Lesson 13</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/14">
                            <div className="modal-options">Lesson 14</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/15">
                            <div className="modal-options">Lesson 15</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/16">
                            <div className="modal-options">Lesson 16</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/17">
                            <div className="modal-options">Lesson 17</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/18">
                            <div className="modal-options">Lesson 18</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/19">
                            <div className="modal-options">Lesson 19</div>
                        </Link>
                        <Link to="/dashboard/KORN351/lesson/20">
                            <div className="modal-options">Lesson 20</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Dashboard);
