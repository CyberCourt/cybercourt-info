import {toBN, BN, isBN} from 'web3-utils'
import {MAX_UINT256} from './Constants'
import {BigNumber} from 'bignumber.js'
import config from '@/config'
import utils from "@/utils/utils";
import GraphClient from "./GraphClient.js";
import Web3 from "web3";
import { gql } from '@apollo/client';
import Multicall2 from "./Multicall2";


BigNumber.set({ROUNDING_MODE: 1})
const {abi, bytecode} = require('./abis/GovernorAlpha.json');

export class GovernorAlpha {
    constructor(address) {
        
        this.web3 = new Web3(Web3.givenProvider);
        this.web3Reader = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
        this.ethWeb3Reader = new Web3(new Web3.providers.HttpProvider(config.ethWeb3Provider));
        this.address = address;
        if (this.web3 != null)
            this.contract = new this.web3.eth.Contract(abi, address);
        this.contractReader = new this.web3Reader.eth.Contract(abi, address);

        this.defaultGasPrice = 30000000000;
        this.decimals = 18;
    }
    

    async getExecutableProposals(addr,first,skip) {
        let blockNum = await this.web3.eth.getBlockNumber();
        const tokensQuery = `
            query($addr:Bytes,$curBlockNum:BigInt,$first:Int,$skip:Int) {
                judgerOrg(id:$addr){
                    governorProposals(where:{votesDiff_gte:1,canceled:false,executed:false,endBlock_lt:$curBlockNum}){
                        id
                        order
                        description
                        judgerOrg
                        proposer
                        targets
                        values
                        signatures
                        calldatas
                        startBlock
                        endBlock
                        canceled
                        executed
                      forVotes
                      againstVotes
                      votesDiff
                      startBlockTime
                      endBlockTime
                    }
                }
                
                countQuery:judgerOrg(id:$addr){
                    fields:governorProposals(where:{votesDiff_gte:1,canceled:false,executed:false,endBlock_lt:$curBlockNum}){
                        id
                    }
                }
            }
        `;
        let result = await GraphClient.query({
            query: gql(tokensQuery),
            
            variables: {
                addr: addr,
                curBlockNum:blockNum,
                first:first,
                skip:skip
            }
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }
    async getActiveProposals(addr,first,skip) {
        let blockNum = await this.web3.eth.getBlockNumber();
        const tokensQuery = `
            query($addr:Bytes,$curBlockNum:BigInt,$first:Int,$skip:Int) {
                judgerOrg(id:$addr) {
                    id
                    governorProposals(where:{endBlock_gte:$curBlockNum}){
                        id
                        order
                        description
                        judgerOrg
                        proposer
                        targets
                        values
                        signatures
                        calldatas
                        startBlock
                        endBlock
                        canceled
                        executed
                        forVotes
                        againstVotes
                        votesDiff
                        startBlockTime
                        endBlockTime
                      }
                }
                
                countQuery:judgerOrg(id:$addr){
                    fields:governorProposals(where:{endBlock_gt:$curBlockNum}){
                        id
                    }
                }
            }
        `;
        let result = await GraphClient.query({
            query: gql(tokensQuery),
            
            variables: {
                addr: addr,
                curBlockNum:blockNum,
                first:first,
                skip:skip
            }
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }
    async getAllProposals(addr,first,skip) {
        const tokensQuery = `
            query($addr:Bytes,$first:Int,$skip:Int) {
                judgerOrg(id:$addr) {
                    id
                    governorProposals{
                        id
                        order
                        description
                        judgerOrg
                        proposer
                        targets
                        values
                        signatures
                        calldatas
                        startBlock
                        endBlock
                        canceled
                        executed
                        forVotes
                        againstVotes
                        votesDiff
                        startBlockTime
                        endBlockTime
                      }
                }
                
                countQuery:judgerOrg(id:$addr){
                    fields:governorProposals{
                        id
                    }
                }
            }
        `;
        let result = await GraphClient.query({
            query: gql(tokensQuery),
            
            variables: {
                addr: addr,
                first:first,
                skip:skip
            }
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }
    async contactMap(addr) {
        let result = await this.contractReader.methods.contactMap(addr).call();
        return result ;
    }
    async propose(sender,targets,values,signatures,calldatas,description) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.propose(targets,values,signatures,calldatas,description);
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
    
    async castVote(sender,proposalId,support) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.castVote(proposalId,support);
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
    async execute(sender,proposalId) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.execute(proposalId);
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
    async queue(sender,proposalId) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.queue(proposalId);
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
    async cancel(sender,proposalId) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.cancel(proposalId);
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

export default GovernorAlpha;
