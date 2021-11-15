import {toBN, BN, isBN} from 'web3-utils'
import {MAX_UINT256} from './Constants'
import {BigNumber} from 'bignumber.js'
import config from '@/config'
import utils from "@/utils/utils";
import Web3 from "web3";

BigNumber.set({ROUNDING_MODE: 1})
const {abi, bytecode} = require('./abis/erc20.json');

export class Erc20 {
    constructor(address,decimals) {

        this.web3 = new Web3(Web3.givenProvider);
        this.web3Reader = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
        this.address = address;
        if (this.web3 != null)
            this.contract = new this.web3.eth.Contract(abi, address);
        this.contractReader = new this.web3Reader.eth.Contract(abi, address);

        this.decimals = decimals;
        this.defaultGasPrice = 30000000000;
    }

    async totalSupply() {
        let result = await this.contractReader.methods.totalSupply().call();

        return new BigNumber(result).div(
            BigNumber(10).pow(BigNumber(this.decimals)));
    }
    async balanceOf(user) {
        let balance = await this.contractReader.methods.balanceOf(user).call();
        let precision = await this.getPrecision()
        return new BigNumber(balance).div(precision);
    }

    async getPrecision() {
        let decimals = this.decimals || await this.contractReader.methods.decimals().cal();
        return BigNumber(10).pow(BigNumber(decimals));
    }

    async getSymbol() {
        return this.symbol || await this.contractReader.methods.symbol().call();
    }

    async allowance(owner, spender) {
        let allowedBalance = await this.contractReader.methods.allowance(owner, spender).call();
        let precision = await this.getPrecision()
        return BigNumber(allowedBalance).div(precision);
    }

    async approve(sender,spender,amount) {
        var that = this;
        return new Promise(async (resolve, reject) => {
            try {
                // debugger;
                var gasPrice = that.defaultGasPrice
                let weiAmount = BigNumber(amount).times(BigNumber(10).pow(BigNumber(18)));
                let weiAmountBN = toBN(weiAmount);
                var tx = that.contract.methods.approve(spender,weiAmountBN);
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
    async approveMax(sender, spender) {
        return new Promise(async (resolve, reject) => {
            try {
                var gasPrice = this.defaultGasPrice
                // let weiAmount = BigNumber(amount).times(BigNumber(10).pow(BigNumber(18)));
                var tx = this.contract.methods.approve(spender, MAX_UINT256);
                let gasLimit = 40000
                try {
                    gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address })
                } catch(err) {
                }

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
                            this.web3Reader.eth.getTransactionReceipt(result, (err, receipt)=>{
                            if(receipt) {
                                clearInterval(timer);
                                resolve(utils.contractResult(true,receipt))
                            }
                          })
                        }, 2000)
                    }
                })
            } catch (e) {
                // console.log(e);
                resolve(utils.contractResult(false,e))
            }
        })
       
    }

}

export default Erc20;
