function imageUrl(name) {
  switch (name) {
    case 'ETH':
      return 'https://cryptologos.cc/logos/ethereum-eth-logo.png';
    case 'BTC':
      return 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
    default:
      return 'src/ethereum-eth-logo.png';
  }
}

function titleFormatter(string) {
  string = string.slice(0, string.length - 2);
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterAndSort(state, name, type) {
  if (type === 'buyer') {
    return state
      .filter((coin) => coin.name === name && coin.type === type)
      .sort((one, two) => one.price - two.price);
  } else {
    return state
      .filter((coin) => coin.name === name && coin.type === type)
      .sort((one, two) => two.price - one.price);
  }
}

module.exports = { imageUrl, titleFormatter, filterAndSort };
