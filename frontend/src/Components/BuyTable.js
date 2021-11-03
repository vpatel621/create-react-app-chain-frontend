import React from 'react';
import { Table } from 'react-bootstrap';

export default function BuyTable(props) {
  const { seller } = props;

  return (
    <div
      className='right'
      style={{ border: '2px solid red', borderRadius: '5px' }}
    >
      <Table variant='dark'>
        <caption> Sell Table </caption>

        <thead>
          <tr>
            <th> </th>
            <th>Exchange</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {seller.map((item) => {
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
                  <td className='green'>{item.price}</td>
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
