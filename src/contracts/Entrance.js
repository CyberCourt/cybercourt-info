import {toBN, BN, isBN} from 'web3-utils'
import {MAX_UINT256} from './Constants'
import {BigNumber} from 'bignumber.js'
import config from '@/config'
import utils from "@/utils/utils";
import GraphClient from "./GraphClient.js";
import Web3 from "web3";
import { gql } from '@apollo/client';

BigNumber.set({ROUNDING_MODE: 1})
const {abi, bytecode} = require('./abis/Entrance.json');

export class Entrance {
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

    async getTeamsByJudger(addr,status,first,skip) {
        const tokensQuery = `
            query($addr:Bytes,$status:BigInt,$first:Int,$skip:Int) {
                judger(id:$addr) {
                    id
                    judgerOrgs(where:{status:$status},first: $first,skip:$skip){
                        status
                        idleStatus
                        judgerOrg{
                            id
                            url
                            contact
                            rateMantissa
                            name
                            governorAlphaAddr
                        }
                    }
                }
                
                countQuery:judger(id:$addr){
                    fields:judgerOrgs(where:{status:$status}){
                        id
                    }
                }
            }
        `;
        let result = await GraphClient.query({
            query: gql(tokensQuery),
            
            variables: {
                addr: addr,
                status:status,
                first:first,
                skip:skip
            }
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }
    async getJudgerOrgs(first,skip) {
        const tokensQuery = `
            query($first:Int,$skip:Int) {
                judgerOrgs(first: $first,skip:$skip) {
                    id
                    url
                    contact
                    rateMantissa
                    limitJudgePeriodTime
                    exitWaitPeriodTime
                    name
                    governorAlphaAddr
                }
                
                countQuery:judgerOrgs {
                    id
                }
            }
        `;
        let result = await GraphClient.query({
        query: gql(tokensQuery)
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }
    async getProposalsByJudger(addr,signStatus) {
        const tokensQuery = `
            query($addr:Bytes,$signStatus:[Int!]) {
                judger(id: $addr) {
                    id
                    proposals(where:{signStatus_in:$signStatus}){
                      signStatus
                      proposal{
                        judgerOrgAddr
                        mainContractOrder
                        proposalOrder
                        mainContract{
                            mainContractAddr
                            mainContractOrder
                            judgerOrgAddr
                            status
                            token
                            totalStake
                            contracts{
                                contentOrIpfsHash
                            }
                            persons{
                                person{
                                id
                                }
                            }
                            judgers{
                                judger{
                                    id
                                }
                            }
                            proposals{
                                proposalOrder
                            }
                            judgeProposals{
                                proposalOrder
                            }
                        }
                      }
                    }
                }
                
                countQuery:judger(id:$addr) {
                    fields:proposals(where:{signStatus_in:$signStatus}){
                        id
                    }
                }
            }
        `;
        let result = await GraphClient.query({
            query: gql(tokensQuery),
            variables: {
                addr: addr,
                signStatus:signStatus
            }
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }
    async getProposalsByPerson(addr,signStatus) {
        const tokensQuery = `
            query($addr:Bytes,$signStatus:[Int!]) {
                person(id: $addr) {
                    id
                    proposals(where:{signStatus_in:$signStatus}){
                      proposal{
                        judgerOrgAddr
                        mainContractOrder
                        proposalOrder
                        mainContract{
                            mainContractAddr
                            mainContractOrder
                            judgerOrgAddr
                            status
                            token
                            totalStake
                            contracts{
                                contentOrIpfsHash
                            }
                            persons{
                                person{
                                id
                                }
                            }
                            judgers{
                                judger{
                                    id
                                }
                            }
                            proposals{
                                proposalOrder
                            }
                            judgeProposals{
                                proposalOrder
                            }
                        }
                      }
                    }
                }
                
                countQuery:person(id:$addr) {
                    fields:proposals(where:{signStatus_in:$signStatus}){
                        id
                    }
                }
            }
        `;
        let result = await GraphClient.query({
            query: gql(tokensQuery),
            variables: {
                addr: addr,
                signStatus:signStatus
            }
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }

    async getContractsByPerson(addr,signStatus) {
        const tokensQuery = `
            query($addr:Bytes,$signStatus:Int) {
                person(id:$addr) {
                    id
                    contracts(where:{signStatus:$signStatus}){
                      contract{
                        startBlockTime
                        contentOrIpfsHash
                        contractOrder
                        mainContract{
                            mainContractAddr
                            mainContractOrder
                            applyExitBlockTime
                            exitWaitPeriodTime
                            judgerOrgAddr
                            status
                            token
                            totalStake
                            contracts{
                                contentOrIpfsHash
                            }
                            persons{
                                person{
                                id
                                }
                            }
                            judgers{
                                judger{
                                    id
                                }
                            }
                            proposals{
                                proposalOrder
                            }
                            judgeProposals{
                                proposalOrder
                            }
                        }
                      }
                    }
                    
                }
                
                countQuery:person(id:$addr) {
                    fields:contracts(where:{signStatus:$signStatus}){
                        id
                    }
                }
            }
        `;
        let result = await GraphClient.query({
            query: gql(tokensQuery),
            variables: {
                addr: addr,
                signStatus:signStatus
            }
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }
    async getMainContractsByPerson(addr,status,first,skip) {
        const tokensQuery = `
            query($addr:Bytes,$status:[Int!],$first:Int,$skip:Int) {
                person(id:$addr) {
                    id
                    mainContracts(first:$first,skip:$skip){
                        balance
                      mainContract(where:{status_in:$status}){
                        mainContractAddr
                        mainContractOrder
                        applyExitBlockTime
                        exitWaitPeriodTime
                        judgerOrgAddr
                        status
                        token
                        totalStake
                        contracts{
                            contentOrIpfsHash
                        }
                        persons{
                            person{
                              id
                            }
                        }
                        judgers{
                            judger{
                                id
                            }
                        }
                        proposals{
                            proposalOrder
                        }
                        judgeProposals{
                            proposalOrder
                        }
                      }
                    }
                }
                
                countQuery:person(id:$addr) {
                    fields:mainContracts{
                        id
                    }
                }
            }
        `;
        let result = await GraphClient.query({
            query: gql(tokensQuery),
            variables: {
                addr: addr,
                status: status,
                first: first,
                skip: skip
            }
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }
    async getMainContractsByJudger(addr,status,first,skip) {
        const tokensQuery = `
            query($addr:Bytes,$first:Int,$skip:Int,$status:Int) {
                judger(id:$addr) {
                    id
                    mainContracts(first:$first,skip:$skip,where:{status:$status}){
                      mainContract{
                        mainContractAddr
                        mainContractOrder
                        applyExitBlockTime
                        exitWaitPeriodTime
                        judgerOrgAddr
                        status
                        token
                        totalStake
                        contracts{
                            contentOrIpfsHash
                        }
                        persons{
                            person{
                              id
                            }
                        }
                        judgers{
                            judger{
                                id
                            }
                        }
                        proposals{
                            proposalOrder
                        }
                        judgeProposals{
                            proposalOrder
                        }
                      }
                    }
                }
                
                countQuery:judger(id:$addr) {
                    fields:mainContracts(where:{status:$status}){
                            id
                    }
                }
            }
        `;
        let result = await GraphClient.query({
            query: gql(tokensQuery),
            variables: {
                addr: addr,
                first: first,
                skip: skip,
                status:status
            }
        })
        // .then(data => console.log("Subgraph data: ", data))
        // .catch(err => { console.log("Error fetching data: ", err) });
        console.log("Subgraph data: ", result)
        return result;
    }
    async launchJudgerProposal(sender,judgerOrgAddr,mainContractOrder,persons, balances,decimals) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                let weiAmounts  = [];
                for (let i=0;i<balances.length;i++){
                    let weiAmount = BigNumber(balances[i]).times(BigNumber(10).pow(BigNumber(decimals)));
                    weiAmounts[i]  = toBN(weiAmount);
                }
                var tx = that.contract.methods.launchJudgerProposal(judgerOrgAddr,mainContractOrder,persons, weiAmounts);
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
    async launchProposal(sender,judgerOrgAddr,mainContractOrder,persons, balances,decimals) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                let weiAmounts  = [];
                for (let i=0;i<balances.length;i++){
                    let weiAmount = BigNumber(balances[i]).times(BigNumber(10).pow(BigNumber(decimals)));
                    weiAmounts[i]  = toBN(weiAmount);
                }
                var tx = that.contract.methods.launchProposal(judgerOrgAddr,mainContractOrder,persons, weiAmounts);
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
    async addContract(sender,judgerOrgAddr,mainContractOrder,contentOrIpfsHash, stakeBalance,decimals) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                
                let weiAmount = BigNumber(stakeBalance).times(BigNumber(10).pow(BigNumber(decimals)));
                let weiAmountBN  = toBN(weiAmount);
                var tx = that.contract.methods.addContract(judgerOrgAddr,mainContractOrder,contentOrIpfsHash, weiAmountBN);
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
    async createMainContract(sender,persons,kindle,contentOrIpfsHash, amount,erc20Address,decimals) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = that.defaultGasPrice
                let weiAmount = BigNumber(amount).times(BigNumber(10).pow(BigNumber(decimals)));
                let weiAmountBN  = toBN(weiAmount);
                // debugger;
                var tx = that.contract.methods.createMainContract(persons,kindle,contentOrIpfsHash, weiAmountBN,erc20Address);
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
    async signContract(sender,judgerOrgAddr,mainContractOrder,contractOrder, signStatus,stakeBalance,decimals) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                // debugger;
                var gasPrice = that.defaultGasPrice
                let weiAmount = BigNumber(stakeBalance).times(BigNumber(10).pow(BigNumber(decimals)));
                let weiAmountBN  = toBN(weiAmount);
                var tx = that.contract.methods.signContract(judgerOrgAddr,mainContractOrder,contractOrder, signStatus,0);
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
    async signProposal(sender,judgerOrgAddr,mainContractOrder,proposalOrder, signStatus) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                // debugger;
                var gasPrice = that.defaultGasPrice
                // let weiAmount = BigNumber(stakeBalance).times(BigNumber(10).pow(BigNumber(18)));
                var tx = that.contract.methods.signProposal(judgerOrgAddr,mainContractOrder,proposalOrder, signStatus);
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
    async signJudgerProposal(sender,judgerOrgAddr,mainContractOrder,proposalOrder, signStatus) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                // debugger;
                var gasPrice = that.defaultGasPrice
                // let weiAmount = BigNumber(stakeBalance).times(BigNumber(10).pow(BigNumber(18)));
                var tx = that.contract.methods.signJudgerProposal(judgerOrgAddr,mainContractOrder,proposalOrder, signStatus);
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
    async applyJudge(sender,judgerOrgAddr,mainContractOrder) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                // debugger;
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.applyJudge(judgerOrgAddr,mainContractOrder);
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
    async applyExit(sender,judgerOrgAddr,mainContractOrder) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                // debugger;
                var gasPrice = that.defaultGasPrice
                var tx = that.contract.methods.applyExit(judgerOrgAddr,mainContractOrder);
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
    async exitStakeBalance(sender,judgerOrgAddr,mainContractOrder,amount,decimals) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                // debugger;
                var gasPrice = that.defaultGasPrice
                let weiAmount = BigNumber(amount).times(BigNumber(10).pow(BigNumber(decimals)));
                let weiAmountBN  = toBN(weiAmount);

                var tx = that.contract.methods.exitStakeBalance(judgerOrgAddr,mainContractOrder,weiAmountBN);
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
    async createKindle(sender) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                // debugger;
                var gasPrice = that.defaultGasPrice
                // let weiAmount = BigNumber(amount).times(BigNumber(10).pow(BigNumber(18)));

                var tx = that.contract.methods.createKindle();
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
    
    async tokenFaucetMap(token) {
        let tokenFaucet = await this.contractReader.methods.tokenFaucetMap(token).call();
        return tokenFaucet;
    }
}

export default Entrance;
