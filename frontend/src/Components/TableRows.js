import React from 'react';

export default function TableRows(props) {
  const { change, price } = props.props.item;
  const { idx } = props.props;
  if (change > 0.01) {
    return (
      <td className='green'>
        {price}
        {idx === 0 ? '*' : null}
      </td>
    );
  } else if (change < -0.01) {
    return (
      <td className='red'>
        {price}
        {idx === 0 ? '*' : null}
      </td>
    );
  } else {
    return (
      <td className='default'>
        {price}
        {idx === 0 ? '*' : null}
      </td>
    );
  }
}
