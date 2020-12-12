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

                <Card className="card">
                    <Link to="/dashboard/KORN351/dictionary/radical">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Dictionary: Radical
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Dictionary By Radical
                            </Typography>
                            <Typography variant="body2" component="p">
                                Search characters by radical
                            </Typography>
                        </CardContent>
                    </Link>
                </Card>

                <Card className="card">
                    <Link to="/">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Dictionary: Hangul
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Dictionary By Hangul
                            </Typography>
                            <Typography variant="body2" component="p">
                                Search characters by Hangul
                            </Typography>
                        </CardContent>
                    </Link>
                </Card>
                <Card className="card">
                    <Link to="/">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Dictionary: Lesson
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Dictionary By Lesson
                            </Typography>
                            <Typography variant="body2" component="p">
                                Characters categorized by lessons
                            </Typography>
                        </CardContent>
                    </Link>
                </Card>
                <Card className="card">
                    <Link to="/">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                KORN 351: Lessons
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                KORN 351 Lessons
                            </Typography>
                            <Typography variant="body2" component="p">
                                View each lesson
                            </Typography>
                        </CardContent>
                    </Link>
                </Card>
            </div>
        </div>
    );
}

export default withRouter(Dashboard);
