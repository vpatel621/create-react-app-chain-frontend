import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import SellTable from './Components/SellTable.js';
import BuyTable from './Components/BuyTable.js';
import { Icon, InlineIcon } from '@iconify/react';
import ethIcon from '@iconify/icons-cryptocurrency/eth';
import btc from '../node_modules/cryptocurrency-icons/32/color/btc.png';
import eth from '../node_modules/cryptocurrency-icons/32/color/eth.png';
import LineGraph from './Components/HistoricalChart';

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
      setHistorical(message.history);
      const ethSell = buy.filter(
        (item) => item.name === 'ETH' && item.type === 'seller'
      );
      const ethBuy = buy
        .filter((item) => item.name === 'ETH' && item.type === 'buyer')
        .sort((a, b) => a.price - b.price);
      const bitBuy = buy
        .filter((item) => item.name === 'BTC' && item.type === 'buyer')
        .sort((a, b) => a.price - b.price);
      const bitSell = buy.filter(
        (item) => item.name === 'BTC' && item.type === 'seller'
      );
      setEthereumBuy(ethBuy);
      setEthereumSell(ethSell);
      setBitcoinBuy(bitBuy);
      setBitcoinSell(bitSell);
    };
    if (status) {
      filterMethod(filterBuy[0].name);
    }
  }, [buy]);

  function filterMethod(type) {
    setStatus(true);

    if (type === 'BTC') {
      setFilterBuy(bitcoinBuy);
      setFilterSell(bitcoinSell.sort((a, b) => b.price - a.price));
      setFilterHistorical(historical[0]);
    } else {
      setFilterBuy(ethereumBuy);
      setFilterSell(ethereumSell.sort((a, b) => b.price - a.price));
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
              <LineGraph props={filterHistorical} height={10} />
            </div>
            <SellTable buyer={filterBuy} />
            <BuyTable seller={filterSell} />
          </div>
        ) : (
          <div>Pick a currency</div>
        )}
      </div>
    </div>
  );
}
