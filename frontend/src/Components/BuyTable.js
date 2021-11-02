import React from 'react';
import { Table } from 'react-bootstrap';

export default function BuyTable(props) {
  const { seller } = props;

  return (
    <div className='right'>
      <Table variant='dark'>
        <caption> Looking to Sell? </caption>

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
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
