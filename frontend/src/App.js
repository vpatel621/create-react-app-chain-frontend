import React, { useState, useEffect, useRef } from 'react';
import Tables from './Components/Tables.js';
import { filterAndSort } from './utility.js';

import btc from '../node_modules/cryptocurrency-icons/32/color/btc.png';
import eth from '../node_modules/cryptocurrency-icons/32/color/eth.png';
import LineGraph from './Components/HistoricalChart';
import initializeWebSocketConnection from './websocket.js';

export default function App() {
  const ws = useRef(null);
  const [buy, setBuy] = useState([]);
  const [historical, setHistorical] = useState([]);
  const [filterHistorical, setFilterHistorical] = useState([]);
  const [filterSell, setFilterSell] = useState([]);
  const [filterBuy, setFilterBuy] = useState([]);
  const [bitcoinBuy, setBitcoinBuy] = useState([]);
  const [bitcoinSell, setBitcoinSell] = useState([]);
  const [ethereumBuy, setEthereumBuy] = useState([]);
  const [ethereumSell, setEthereumSell] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const url = process.env.ReactURL || 'ws://localhost:3030';

    initializeWebSocketConnection(ws, url);
  }, []);

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = (res) => {
      const message = JSON.parse(res.data);
      setBuy(message.data);
      setHistorical(message.history);
      setEthereumBuy(filterAndSort(buy, 'ETH', 'seller'));
      setEthereumSell(filterAndSort(buy, 'ETH', 'buyer'));
      setBitcoinBuy(filterAndSort(buy, 'BTC', 'buyer'));
      setBitcoinSell(filterAndSort(buy, 'BTC', 'seller'));
    };
    if (status) {
      filterMethod(filterBuy[0].name);
    }
  }, [buy, filterBuy, status, filterSell, filterMethod]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function filterMethod(type) {
    setStatus(true);

    if (type === 'BTC') {
      setFilterBuy(bitcoinBuy);
      setFilterSell(bitcoinSell);
      setFilterHistorical(historical[0]);
    } else {
      setFilterBuy(ethereumBuy);
      setFilterSell(ethereumSell);
      setFilterHistorical(historical[1]);
    }
  }

  return (
    <div className='container'>
      <h2>Cryptocurrencies</h2>
      <div className='row-of-crypto'>
        <img src={btc} alt='' onClick={() => filterMethod('BTC')} />
        <span> </span>
        <img src={eth} alt='' onClick={() => filterMethod('ETH')} />
      </div>

      <div>
        {status ? (
          <div>
            <div id='graph'>
              <LineGraph props={filterHistorical} />
            </div>
            <Tables data={filterBuy} />
            <Tables data={filterSell} />
          </div>
        ) : (
          <div>Choose a currency</div>
        )}
      </div>
    </div>
  );
}
