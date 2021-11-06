import React, { useState, useEffect } from 'react';
import Tables from './Components/Tables.js';
import { filterAndSort } from './utility.js';

import btc from '../node_modules/cryptocurrency-icons/32/color/btc.png';
import eth from '../node_modules/cryptocurrency-icons/32/color/eth.png';
import LineGraph from './Components/HistoricalChart';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export default function App() {
  const [allCoinPrices, setAllCoinPrices] = useState([]);
  const [historical, setHistorical] = useState([]);
  const [filterHistorical, setFilterHistorical] = useState([]);
  const [filterSell, setFilterSell] = useState([]);
  const [filterBuy, setFilterBuy] = useState([]);
  const [bitcoinBuy, setBitcoinBuy] = useState([]);
  const [bitcoinSell, setBitcoinSell] = useState([]);
  const [ethereumBuy, setEthereumBuy] = useState([]);
  const [ethereumSell, setEthereumSell] = useState([]);
  const [coinSelect, setcoinSelect] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const url = process.env.REACT_APP_URL || 'http://localhost:3030/';

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 4000);

    const sseClient = new EventSource(url);
    sseClient.addEventListener('CACHE_UPDATE', (message) => {
      getRealtimeData(JSON.parse(message.data));
    });

    function getRealtimeData(res) {
      const { data, history } = res;

      setAllCoinPrices(data);
      setHistorical(history);
      setEthereumBuy(filterAndSort(allCoinPrices, 'ETH', 'buyer'));
      setEthereumSell(filterAndSort(allCoinPrices, 'ETH', 'seller'));
      setBitcoinBuy(filterAndSort(allCoinPrices, 'BTC', 'buyer'));
      setBitcoinSell(filterAndSort(allCoinPrices, 'BTC', 'seller'));
      if (coinSelect) {
        filterMethod(filterBuy[0].name);
      }
    }

    sseClient.onerror = () => {
      sseClient.close();
    };
    return () => {
      sseClient.close();
    };
  }, [allCoinPrices, filterBuy, coinSelect, filterSell, filterMethod, url]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function filterMethod(type) {
    setcoinSelect(true);

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
      {isLoading ? (
        <Loader
          type='Puff'
          color='#00BFFF'
          height={100}
          width={100}
          timeout={4000} //3 secs
        />
      ) : (
        <div>
          <h2>Cryptocurrencies</h2>
          <div>
            <img src={btc} alt='' onClick={() => filterMethod('BTC')} />
            <span> </span>
            <img src={eth} alt='' onClick={() => filterMethod('ETH')} />
          </div>
          <div>
            {coinSelect ? (
              <div>
                <div id='graph'>
                  <LineGraph props={filterHistorical} />
                </div>
                <Tables data={filterBuy} />
                <Tables data={filterSell} />
                <div
                  style={{
                    textAlign: 'right',
                    marginRight: '5%',
                    fontSize: 'x-small',
                  }}
                >
                  *Best price
                </div>
              </div>
            ) : (
              <div>Choose a currency</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
