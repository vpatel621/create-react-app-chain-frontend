import React from 'react';
import { Table } from 'react-bootstrap';
import TableRows from './TableRows';
import { imageUrl, titleFormatter } from '../utility.js';

export default function Tables(props) {
  const { data } = props;

  let buyOrSell = data[0].type;
  let tableTitle = titleFormatter(buyOrSell);

  let coinName = data[0].name;
  const imgLink = imageUrl(coinName);

  return (
    <div className='currentPricesTable'>
      <Table variant='dark'>
        <caption className='default'> {tableTitle} Prices (USD) </caption>

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
                  <img alt='' src={imgLink} width='30' height='30' />
                </td>
                <td>{item.source}</td>
                <TableRows props={item} />
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
