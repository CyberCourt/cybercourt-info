import {toBN, BN, isBN} from 'web3-utils'
import {MAX_UINT256} from './Constants'
import {BigNumber} from 'bignumber.js'
import config from '@/config'
import utils from "@/utils/utils";
import GraphClient from "./GraphClient.js";
import Web3 from "web3";
import { gql } from '@apollo/client';

BigNumber.set({ROUNDING_MODE: 1})
const {abi, bytecode} = require('./abis/MainContract.json');

export class MainContract {
    constructor(address) {
        
        this.web3 = new Web3(Web3.givenProvider);
        this.web3Reader = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
        this.address = address;
        if (this.web3 != null)
            this.contract = new this.web3.eth.Contract(abi, address);
        this.contractReader = new this.web3Reader.eth.Contract(abi, address);

        this.defaultGasPrice = 30000000000;
        this.decimals = 18;
    }

    
    async judgerMapNum() {
        let result = await this.contractReader.methods.judgerMapNum().call();
        return result ;
    }
    async getProposalAssignBalance(isJudgerProposal,proposalOrder,user,decimals) {
        let result = await this.contractReader.methods.getProposalAssignBalance(isJudgerProposal,proposalOrder,user).call();
        return new BigNumber(result).div(
            BigNumber(10).pow(BigNumber(decimals)));
    }
    async getProposalAssignAddr(isJudgerProposal,proposalOrder,order) {
        let result = await this.contractReader.methods.getProposalAssignAddr(isJudgerProposal,proposalOrder,order).call();
        return result ;
    }
    async getProposalSignInfo(isJudgerProposal,proposalOrder,user) {
        let result = await this.contractReader.methods.getProposalSignInfo(isJudgerProposal,proposalOrder,user).call();
        return result ;
    }
    async judgerProposalMap(order) {
        let result = await this.contractReader.methods.judgerProposalMap(order).call();
        return result ;
    }
    async conPersonProposalMap(order) {
        let result = await this.contractReader.methods.conPersonProposalMap(order).call();
        return result ;
    }
    async getContractSignInfo(contractOrder,user) {
        let result = await this.contractReader.methods.getContractSignInfo(contractOrder,user).call();
        return result ;
    }
    
}

export default MainContract;
