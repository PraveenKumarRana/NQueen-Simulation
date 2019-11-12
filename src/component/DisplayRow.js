import React from 'react';

const DisplayRow = ({content}) => {
    const Row = content.map(item => {
        return (
            <div id={item.position} key={item.position} style={{backgroundColor:item.color}} className="square-box">
            </div>
        );
    });
    return (
        <div className="row-container">
            {Row}
        </div>
    )
};

export default DisplayRow;