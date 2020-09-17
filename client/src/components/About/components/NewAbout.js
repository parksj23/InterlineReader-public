import React from 'react';
import logo from '../../../assets/ILReader_Logo-with-tagline2.png';
import ubcLogo from '../../../assets/UbcReaderLogo.png';
import '../style/about.css';

const NewAbout = () => {
    return(
        <div>
            <div className='logo-container'>
                <img className='about-logo' src={logo} alt='Interline Reader' />
                <img className='about-ubc-logo' src={ubcLogo} alt='UBC Reader' />
            </div>
            <p style={{ margin: '10%' }}>The Interline Reader is an interlingual reading tool being developed at the Asian Studies Department,
                University of British Columbia. Based on an interlinear approach to reading source texts, the platform
                allows for a seamless reading experience via the pre-loaded vocabulary and grammar notes. Click on a
                vocabulary word or grammar pattern located to the left of the story and the same word or pattern is
                highlighted in the context of the story. Read the original story with a little help from ‘interactive
                subtitles’. Using Hypothesis, the Interline Reader makes it easy to take notes, annotate, highlight,
                and collaborate.</p>
            <div style={{ textAlign: 'right', margin: '10%', marginTop: '0' }}>
                <h1>Contributors</h1>
                <p>(Click to contact by email)</p>
                <br/>
                <div><p style={{fontWeight: "700"}}><a href="mailto:alf.hong91@gmail.com" target="_top">Software Development: Alfred Hong</a> and <a href="mailto:dhanjiarmaan@gmail.com" target="_top">Armaan Dhanji</a></p></div>
                <div><p style={{fontWeight: "700"}}><a href="mailto:dawndkim@alumni.ubc.ca" target="_top">Site Design &amp; Project Co-ordinator: Dawn Kim</a></p></div>
                <div><p style={{fontWeight: "700"}}><a href="mailto:amy.george@ubc.ca" target="_top">Project Co-ordinator: Amy George</a></p></div>
                <div><p style={{fontWeight: "700"}}><a href="mailto:Ross.King@ubc.ca" target="_top">Principal Investigator: Dr. Ross King</a></p></div>
            </div>
        </div>
    )
}

export default NewAbout