import React from 'react';
// import ReactDOM from 'react-dom';


export function LongChart({source}) {
    console.log(source)
    return <iframe
    src={source}
    // title={title}
    width="fill"
    height="fill"
    frameBorder="0"
    scrolling="no"
    style={{ display: 'block' }}
/>
}

export function TallChart({source}) {
    return <iframe
    src={source}
    // title={title}
    width="fill"
    height="fill"
    frameBorder="0"
    scrolling="no"
    style={{ display: 'block' }}
/>
}

export function BoxChart({source}) {
    return <div><iframe
        src={source}
        // title={title}
        width="fill"
        height="fill"
        frameBorder="0"
        scrolling="no"
        style={{ display: 'block' }}
    /></div>
}

// module.exports = { LongChart, TallChart, BoxChart }

// ReactDOM.render(<BoxChartContainer />, app);