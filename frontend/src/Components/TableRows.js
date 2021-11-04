import React from 'react';

export default function TableRows(props) {
  const { change, price } = props.props;
  if (change > 0.01) {
    return <td className='green'>{price}</td>;
  } else if (change < -0.01) {
    return <td className='red'>{price}</td>;
  } else {
    return <td className='default'>{price}</td>;
  }
}
