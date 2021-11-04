import React from 'react';
import { Table } from 'react-bootstrap';

export default function Tables(props) {
  const { data } = props;

  let string = data[0].type.slice(0, data[0].type.length - 2);
  let title = string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <div
      className='left'
      style={{
        backgroundColor: '#212529',
        borderRadius: '5px',
        color: '#aaa',
      }}
    >
      <Table variant='dark'>
        <caption className='default'> {title} Prices (USD) </caption>

        <thead>
          <tr>
            <th> </th>
            <th className='default'>Exchange</th>
            <th className='default'>Price</th>
          </tr>
        </thead>
        <tbody className='default'>
          {data.map((item) => {
            return (
              <tr key={item.source}>
                <td>
                  {item.name === 'ETH' ? (
                    <img
                      alt=''
                      src='https://cryptologos.cc/logos/ethereum-eth-logo.png'
                      width='30'
                      height='30'
                      style={{ display: 'vertical-align:top' }}
                    />
                  ) : (
                    <img
                      alt=''
                      src='https://cryptologos.cc/logos/bitcoin-btc-logo.png'
                      width='30'
                      height='30'
                      style={{ display: 'vertical-align:top' }}
                    />
                  )}
                </td>
                <td>{item.source}</td>
                {item.change > 0.01 ? (
                  <td className='red'>{item.price}</td>
                ) : item.change < -0.01 ? (
                  <td className='green'>
                    {item.price} <i class='arrow up'></i>
                  </td>
                ) : (
                  <td className='default'>{item.price}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
