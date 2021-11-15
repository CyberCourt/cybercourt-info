import {toBN, BN, isBN} from 'web3-utils'
import {MAX_UINT256} from './Constants'
import {BigNumber} from 'bignumber.js'
import config from '@/config'
import utils from "@/utils/utils";
import GraphClient from "./GraphClient.js";
import Web3 from "web3";
import { gql } from '@apollo/client';


BigNumber.set({ROUNDING_MODE: 1})
const {abi, bytecode} = require('./abis/Multicall2.json');

export class Multicall2 {
    constructor() {
        
        let address = "0x5ba1e12693dc8f9c48aad8770482f4739beed696";
        this.web3 = new Web3(Web3.givenProvider);
        this.web3Reader = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
        this.address = address;
        if (this.web3 != null)
            this.contract = new this.web3.eth.Contract(abi, address);
        this.contractReader = new this.web3Reader.eth.Contract(abi, address);

        this.defaultGasPrice = 30000000000;
        this.decimals = 18;
    }
    
    async getL1BlockNumber() {
        let result = await this.contractReader.methods.getL1BlockNumber().call();
        return result ;
    }
}

export default Multicall2;
