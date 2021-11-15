import {toBN, BN, isBN} from 'web3-utils'
import {MAX_UINT256} from './Constants'
import {BigNumber} from 'bignumber.js'
import config from '@/config'
import utils from "@/utils/utils";
import GraphClient from "./GraphClient.js";
import Web3 from "web3";
import { gql } from '@apollo/client';

BigNumber.set({ROUNDING_MODE: 1})
const {abi, bytecode} = require('./abis/JudgerOrg.json');

export class JudgerOrg {
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

    async contactMap(addr) {
        let result = await this.contractReader.methods.contactMap(addr).call();
        return result ;
    }
    async balances(addr) {
        let result = await this.contractReader.methods.balances(addr).call();
        return result ;
    }
    async caseNum(addr) {
        let result = await this.contractReader.methods.caseNum(addr).call();
        return result ;
    }
    async isIdle(addr) {
        let result = await this.contractReader.methods.isIdle(addr).call();
        return result ;
    }
    async delegates(addr) {
        let result = await this.contractReader.methods.delegates(addr).call();
        return result ;
    }
    async idleJudgerSupply() {
        let result = await this.contractReader.methods.idleJudgerSupply().call();
        return result ;
    }
    async totalSupply() {
        let result = await this.contractReader.methods.totalSupply().call();
        return result ;
    }
    
    async url() {
        let result = await this.contractReader.methods.url().call();
        return result ;
    }
    async contact() {
        let result = await this.contractReader.methods.contact().call();
        return result ;
    }
    async remark() {
        let result = await this.contractReader.methods.remark().call();
        return result ;
    }
    async maxCaseNum() {
        let result = await this.contractReader.methods.maxCaseNum().call();
        return result ;
    }
    async assignJudgerNum() {
        let result = await this.contractReader.methods.assignJudgerNum().call();
        return result ;
    }
    async rateMantissa() {
        let result = await this.contractReader.methods.rateMantissa().call();
        return BigNumber(result).div( BigNumber(10).pow(BigNumber(18)));
    }
    async name() {
        let result = await this.contractReader.methods.name().call();
        return result ;
    }
    async setIdleStatus(sender,idleStatus) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.setIdleStatus(idleStatus);
                let gasLimit = 40000
                gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address })
                

                return tx.send({
                    from: sender,
                    gasPrice: gasPrice,
                    gas: Math.round(gasLimit * 1.1)
                },(err, result) => {
                    if(err) {
                        resolve(utils.contractResult(false,err))
                    }else {
                        // this.transactions.push(result)
                        let timer = setInterval(()=>{
                            that.web3Reader.eth.getTransactionReceipt(result, (err, receipt)=>{
                            if(receipt) {
                                clearInterval(timer);
                                resolve(utils.contractResult(true,receipt))
                            }
                          })
                        }, 2000)
                    }
                })
            } catch (e) {
                try{
                    console.log(e);
                    var str = e.toString();
                    var start = str.indexOf('{');
                    var over = str.indexOf('}');
                    var jsonstr = str.substr(start,over);
                    var jsonObject = JSON.parse(jsonstr)
                    resolve(utils.contractResult(false,jsonObject));
                }catch(e2){
                    resolve(utils.contractResult(false,e));
                }
            }
        })
    }
    async setContactMap(sender,contact) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.setContactMap(contact);
                let gasLimit = 40000
                gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address })
                

                return tx.send({
                    from: sender,
                    gasPrice: gasPrice,
                    gas: Math.round(gasLimit * 1.1)
                },(err, result) => {
                    if(err) {
                        resolve(utils.contractResult(false,err))
                    }else {
                        // this.transactions.push(result)
                        let timer = setInterval(()=>{
                            that.web3Reader.eth.getTransactionReceipt(result, (err, receipt)=>{
                            if(receipt) {
                                clearInterval(timer);
                                resolve(utils.contractResult(true,receipt))
                            }
                          })
                        }, 2000)
                    }
                })
            } catch (e) {
                try{
                    console.log(e);
                    var str = e.toString();
                    var start = str.indexOf('{');
                    var over = str.indexOf('}');
                    var jsonstr = str.substr(start,over);
                    var jsonObject = JSON.parse(jsonstr)
                    resolve(utils.contractResult(false,jsonObject));
                }catch(e2){
                    resolve(utils.contractResult(false,e));
                }
            }
        })
    }
    async delegate(sender,delegatee) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.delegate(delegatee);
                let gasLimit = 40000
                gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address })
                

                return tx.send({
                    from: sender,
                    gasPrice: gasPrice,
                    gas: Math.round(gasLimit * 1.1)
                },(err, result) => {
                    if(err) {
                        resolve(utils.contractResult(false,err))
                    }else {
                        // this.transactions.push(result)
                        let timer = setInterval(()=>{
                            that.web3Reader.eth.getTransactionReceipt(result, (err, receipt)=>{
                            if(receipt) {
                                clearInterval(timer);
                                resolve(utils.contractResult(true,receipt))
                            }
                          })
                        }, 2000)
                    }
                })
            } catch (e) {
                try{
                    console.log(e);
                    var str = e.toString();
                    var start = str.indexOf('{');
                    var over = str.indexOf('}');
                    var jsonstr = str.substr(start,over);
                    var jsonObject = JSON.parse(jsonstr)
                    resolve(utils.contractResult(false,jsonObject));
                }catch(e2){
                    resolve(utils.contractResult(false,e));
                }
            }
        })
    }
}

export default JudgerOrg;
