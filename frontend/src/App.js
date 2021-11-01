import React, { useState, useEffect, useRef } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import ethIcon from '@iconify/icons-cryptocurrency/eth';
import btc from '../node_modules/cryptocurrency-icons/32/color/btc.png';
import eth from '../node_modules/cryptocurrency-icons/32/color/eth.png';

export default function App() {
  const ws = useRef(null);
  const [buy, setBuy] = useState([]);
  const [filterC, setFilter] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3030');
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onclose = () => console.log('ws closed');

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (res) => {
      const message = JSON.parse(res.data);
      setBuy(() => message.buyer);
    };
  }, [buy]);

  function filterMethod(type) {
    let filteredCryptos = buy;

    const res = filteredCryptos.filter((item) => {
      return item.name === type;
    });
    setFilter(res);
    console.log('post', filterC);
  }

  return (
    <div className='container'>
      <h2>Cryptocurrencys</h2>
      <div className='row-of-crypto'>
        <img src={btc} onClick={() => filterMethod('BTC')} />
        <span> </span>
        <img src={eth} onClick={() => filterMethod('ETH')} />
      </div>
      {filterC.map((ele) => {
        {
        }
        return (
          <div>
            {ele.name === 'ETH' ? (
              <img
                src='https://cryptologos.cc/logos/ethereum-eth-logo.png'
                width='20'
                height='30'
                style={{ display: 'vertical-align:top' }}
              />
            ) : null}
            {ele.name}: {ele.price}
          </div>
        );
      })}
    </div>
  );
}
