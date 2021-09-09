import React, {useState} from "react";
import {
    Tabs,
    Tab,
    Paper,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails, makeStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function InstructorTutorial() {
    return (
        <div className="dashboard-tutorial">
            <Paper style={{padding: '0 10% 10% 10%', height: '100%', boxShadow: 'none'}}>
                    <div className="korn351-guide">
                        <br/>
                        <br/>
                        Coming soon
                    </div>
            </Paper>
        </div>
    )
}

export default InstructorTutorial;
