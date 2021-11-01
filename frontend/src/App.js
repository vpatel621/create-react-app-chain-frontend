import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { Icon, InlineIcon } from '@iconify/react';
import ethIcon from '@iconify/icons-cryptocurrency/eth';
import btc from '../node_modules/cryptocurrency-icons/32/color/btc.png';
import eth from '../node_modules/cryptocurrency-icons/32/color/eth.png';

export default function App() {
  const ws = useRef(null);
  const [buy, setBuy] = useState([]);
  const [filterSell, setFilterSell] = useState([]);
  const [filterBuy, setFilterBuy] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3030');
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onclose = () => console.log('ws closed');

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = (res) => {
      const message = JSON.parse(res.data);
      setBuy(message.data);
    };
  }, [buy]);

  function filterMethod(type) {
    setStatus(true);
    let filteredCryptos = buy;

    const seller = filteredCryptos.filter((item) => {
      return item.name === type && item.type === 'seller';
    });
    const buyer = filteredCryptos.filter((item) => {
      return item.name === type && item.type === 'buyer';
    });
    setFilterBuy(buyer);
    seller.sort((a, b) => b.price - a.price);
    setFilterSell(seller);
  }

  return (
    <div className='container'>
      <h2>Cryptocurrencys</h2>
      <div className='row-of-crypto'>
        <img src={btc} onClick={() => filterMethod('BTC')} />
        <span> </span>
        <img src={eth} onClick={() => filterMethod('ETH')} />
      </div>
      {status ? (
        <div>
          <Table variant='dark'>
            <caption> Looking to Buy? </caption>

            <thead>
              <tr>
                <th> </th>
                <th>Exchange</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filterBuy.map((item) => {
                return (
                  <tr>
                    <td>
                      <img
                        alt=''
                        src='https://cryptologos.cc/logos/ethereum-eth-logo.png'
                        width='20'
                        height='30'
                        style={{ display: 'vertical-align:top' }}
                      />
                    </td>
                    <td>{item.source}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <span>
            <Table variant='dark'>
              <caption> Looking to Sell?</caption>

              <thead>
                <tr>
                  <th> </th>
                  <th>Exchange</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {filterSell.map((item) => {
                  return (
                    <tr>
                      <td>
                        <img
                          alt=''
                          src='https://cryptologos.cc/logos/ethereum-eth-logo.png'
                          width='20'
                          height='30'
                          style={{ display: 'vertical-align:top' }}
                        />
                      </td>
                      <td>{item.source}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </span>
        </div>
      ) : (
        <div> Choose a currency</div>
      )}
    </div>
  );
}
