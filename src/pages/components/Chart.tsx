import React from 'react';


// Chart.tsx: components that hold individual charts; built with intention to size charts specifically 
// May now be refactored into one single chart component, as they are properly auto-sized by Grafana


export function LongChart({ source }) {
    return <div className="flex max-w-s flex-col gap-4 rounded-xl p-4">
        {/* Flex container with max width, columns, gap between elements, rounded corners, and padding */}
        <iframe
            src={source}
            width="fill"
            height="fill"
            frameBorder="0"
            scrolling="no"
            style={{ display: 'block' }}
        />
    </div>
}

export function TallChart({ source }) {
    return <div className="flex max-w-s flex-col gap-4 rounded-xl p-4 ">
        {/* Flex container with max width, columns, gap between elements, rounded corners, and padding */}
        <iframe
            src={source}
            width="fill"
            height="fill"
            frameBorder="0"
            scrolling="no"
            style={{ display: 'block' }}
        />
    </div>
}

export function BoxChart({ source }) {
    return <div className="flex max-w-s flex-col gap-4 rounded-xl p-4 ">
        {/* Flex container with max width, columns, gap between elements, rounded corners, and padding */}
        <iframe
            src={source}
            // title={title}
            width="fill"
            height="fill"
            frameBorder="0"
            scrolling="no"
            style={{ display: 'block' }}
        />
    </div>
}