import React from 'react';


// Chart.tsx: components that hold individual charts; built with intention to size charts specifically 
// May now be refactored into one single chart component, as they are properly auto-sized by Grafana

type ChartProps = {
    source: string;
  };

//   valid source? if no, render something else?

export function Chart({ source } : ChartProps) {
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
