import React from 'react';
import { Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

function LineGraph(props) {
  const { prices, name } = props.props;

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
              label: `${name} Price (USD)`,
              // y-axis data plotting values
              data: values,
              fill: false,
              borderWidth: 4,
              // backgroundColor: 'rgb(255, 99, 132)',
              backgroundColor: '#1ed760',
              // borderColor: '#3BD16F',
              borderColor: '#1ed760',
              responsive: true,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                boxWidth: 0,
                font: {
                  size: 38,
                },
                color: '#aaa',
              },

              display: true,
            },
            backgroundColor: '#3BD16F',
          },
        }}
      />
    </div>
  );
}

export default LineGraph;
