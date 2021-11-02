import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function LineGraph(props) {
  console.log('props', props.props);
  const { prices } = props.props;

  const dates = prices.map((arr) =>
    new Date(arr[0]).toLocaleDateString('en-US')
  );
  const values = prices.map((arr) => arr[1]);
  return (
    <div>
      <Line
        data={{
          // x-axis label values
          labels: dates,
          datasets: [
            {
              label: 'Bitcoin Price',
              // y-axis data plotting values
              data: values,
              fill: false,
              borderWidth: 4,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'green',
              responsive: true,
            },
          ],
        }}
      />
    </div>
  );
}

export default LineGraph;
