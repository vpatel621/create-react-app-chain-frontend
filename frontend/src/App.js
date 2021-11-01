import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const ws = useRef(null);
  const [buy, setBuy] = useState([]);
  const [sell, setSell] = useState([]);

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
      console.log('presort', message.buyer);
      message.buyer.sort((a, b) => a.price - b.price);
      console.log('postsort', message.buyer);
      setBuy(() => message.buyer);
      setSell(() => message.seller);

      console.log('state', sell);
    };
  }, [buy, sell]);

  return (
    <div className='container'>
      HI Selling:
      {sell.map((ele) => {
        {
          console.log('outside return', ele);
        }
        return (
          <div>
            {ele.name}: {ele.price}
          </div>
        );
      })}
      HI Buying:
      {buy.map((ele) => {
        {
          console.log('outside return', ele);
        }
        return (
          <div>
            {ele.name}: {ele.price}
          </div>
        );
      })}
    </div>
  );
}
