import React from 'react';
// import ReactDOM from 'react-dom';


export function LongChart({source}) {
    return <div className="flex max-w-s flex-col gap-4 rounded-xl p-4"><iframe
    src={source}
    // title={title}
    width="fill"
    height="fill"
    frameBorder="0"
    scrolling="no"
    style={{ display: 'block' }}
/></div>
}

export function TallChart({source}) {
    return <div className="flex max-w-s flex-col gap-4 rounded-xl p-4 "><iframe
    src={source}
    // title={title}
    width="fill"
    height="fill"
    frameBorder="0"
    scrolling="no"
    style={{ display: 'block' }}
/></div>
}

export function BoxChart({source}) {
    return <div className="flex max-w-s flex-col gap-4 rounded-xl p-4 "><iframe
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