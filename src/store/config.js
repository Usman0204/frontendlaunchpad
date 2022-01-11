// import io from 'socket.io-client';

/* -- set app title --*/
const AppTitle = 'Leo Corn';

/* -- set app mode -- */
const AppMode = [''];

// const AppMode = ['development'];

// console.log(`***************Mode = `, AppMode[0]);

/* -- set API URLs --*/
const testing = '';
const production = '';
const development = '';

let SocketUrl;
let env = AppMode[0], networkId = '', message = '', explorer = '';

switch (AppMode[0]) {
  case 'development':
    networkId = 4;
    message = 'Please switch your network to Rinkeby testnet';
    SocketUrl = development;
    explorer = 'https://rinkeby.etherscan.io'
    break;
  case 'production':
    networkId = 56;
    SocketUrl = production;
    message = 'Please switch your network to BSC Mainnet';
    explorer = 'https://bscscan.com'
    break;
  case 'testing':
    networkId = 4;
    SocketUrl = testing;
    message = 'Please switch your network to Rinkeby testnet';
    explorer = 'https://rinkeby.etherscan.io'
    break;
  default:
    networkId = 4;
    SocketUrl = 'http://192.168.18.41:4002';
    message = 'Please switch your network to Rinkeby testnet';
    explorer = 'https://rinkeby.etherscan.io'
}
// let socket = io(SocketUrl);
let ApiUrl = `${SocketUrl}/api`;
export { AppTitle, ApiUrl, SocketUrl, networkId, message, explorer, env };

