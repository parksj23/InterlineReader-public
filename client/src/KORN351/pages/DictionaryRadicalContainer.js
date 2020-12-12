import React from 'react';
import './DictionaryRadicalContainer.css';
import RadicalFilterTable from '../components/RadicalFilterTable/RadicalFilterTable';

function DictionaryRadicalContainer() {

    return (
        <div style={{display: 'flex'}}>
            <div className="radical-filter-container">
                <div className="radical-first-filter">
                    <p>1) Select a radical to search by</p>
                    <RadicalFilterTable/>
                </div>
                <div className="radical-second-filter">
                    <p>2) Select a character that uses that radical</p>
                    <div>

                    </div>
                </div>
            </div>
            <div className="radical-result">
                <p>Result:</p>
            </div>
        </div>
    );
}

export default DictionaryRadicalContainer;
