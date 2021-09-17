import React from 'react';
import PropTypes from 'prop-types';

import { Box, Tab, Tabs } from '@material-ui/core';
import './Profile.css';


function Profile({ type }) {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <div className="ir-Profile">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs className="ir-Profile-tabs" value={value} onChange={handleChange} aria-label="profile tabs">
                        <Tab label={`In Progress ${type}`} {...a11yProps(0)} />
                        <Tab label={`Saved ${type}`} {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Coming Soon...
                </TabPanel>
            </Box>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <h3>{children}</h3>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

Profile.propTypes = {
    type: PropTypes.oneOf(['Quizzes', 'Flashcards'])
}

Profile.defaultProps = {
    type: 'Quizzes'
};

export default Profile;
