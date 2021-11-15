import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './Constants'
import { BigNumber } from 'bignumber.js'
import axios from 'axios'
import config from  '@/config'

import { Conflux } from 'js-conflux-sdk';
const ERC20_ABI = require('./abis/erc20.json');

export class Erc20Reader {
	constructor(address, symbol, decimals) {
		this.address = address;
		this.symbol = symbol;
		this.decimals = decimals;
		this.web3 = new Conflux({
			url: config.web3Provider,
			networkId:  config.networkId
		  });
		this.contract = new this.web3.Contract(ERC20_ABI, this.address)
	}
	
	async balanceOf(user) {
		let balance = await this.contract.balanceOf(user);
		return new BigNumber(balance).shiftedBy(-this.decimals);
	}
}

export default Erc20Reader;