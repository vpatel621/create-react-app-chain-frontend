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
  const [status, setStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const url = process.env.ReactURL || 'http://localhost:3030/';

  useEffect(() => {
    setTimeout(function () {
      //Start the timer
      setLoading(false); //After 1 second, set render to true
    }, 3000);
    const sse = new EventSource(url);
    function getRealtimeData(res) {
      const { data, history } = res;
      if (data.length === 8) {
        setAllCoinPrices(data);
        setHistorical(history);
        setEthereumBuy(filterAndSort(allCoinPrices, 'ETH', 'buyer'));
        setEthereumSell(filterAndSort(allCoinPrices, 'ETH', 'seller'));
        setBitcoinBuy(filterAndSort(allCoinPrices, 'BTC', 'buyer'));
        setBitcoinSell(filterAndSort(allCoinPrices, 'BTC', 'seller'));
        if (status) {
          filterMethod(filterBuy[0].name);
        }
      }
    }
    sse.onmessage = (message) => getRealtimeData(JSON.parse(message.data));
    sse.onerror = () => {
      sse.close();
    };
    return () => {
      sse.close();
    };
  }, [allCoinPrices, filterBuy, status, filterSell, filterMethod, url]);

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
      {isLoading ? (
        <Loader
          type='Puff'
          color='#00BFFF'
          height={100}
          width={100}
          timeout={3000} //3 secs
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
            {status ? (
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
