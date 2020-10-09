import logo from '../../../assets/ILReader_Logo-with-tagline2.png';
import ubcLogo from '../../../assets/UbcReaderLogo.png';
import '../style/about.css';
import React from 'react';

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
                <p>(Click to contact)</p>
                <br/>
                <div><p style={{fontWeight: "700"}}>Software Development: <a href="https://www.linkedin.com/in/hee-su-kim-098044163/" target="_top">Hee Su Kim</a>, <a href="https://www.linkedin.com/in/amy-george-ubc/" target="_top">Amy George</a>, <a href="https://www.linkedin.com/in/ahong1/" target="_top">Alfred Hong</a>, <a href="https://www.linkedin.com/in/armaan-dhanji/" target="_top">Armaan Dhanji</a></p></div>
                <div><p style={{fontWeight: "700"}}>Project Co-ordinators: <a href="https://www.linkedin.com/in/amy-george-ubc/" target="_top">Amy George</a>, <a href="mailto:dawndkim@alumni.ubc.ca" target="_top">Dawn Kim</a></p></div>
                <div><p style={{fontWeight: "700"}}>Principal Investigator: <a href="https://asia.ubc.ca/profile/ross-king/" target="_top">Dr. Ross King</a></p></div>
            </div>
        </div>
    )
}

export default NewAbout