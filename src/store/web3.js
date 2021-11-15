import Vue from 'vue'
import Connector from '@/utils/connector'
import {BigNumber} from 'bignumber.js'
import { Erc20,  Entrance} from "@/contracts";
import config from "@/config";
import Web3 from "web3";

let auth

const web3 = {
    state: {
        account: null,
        balance: 0,
        chainId: 0,

        tokens:[],
        entranceContract:null,
    },
    mutations: {
        UPDATE_CHAIN_ID: (state, chainId) => {
            state.chainId = chainId
        },
        HANDLE_ACCOUNTS_CHANGED: (state, account) => {
            state.account = account
        },
        UPDATE_BALANCE: (state, balance) => {
            state.balance = balance
        },
        INIT_CONFLUX_READER:(state,confluxReader)=>{
            state.confluxReader = confluxReader
        },
        UPDATE_IS_PORTAL_INSTALLED:(state,isPortalInstalled)=>{
            state.isPortalInstalled = isPortalInstalled
        },

        
        INIT_TOKENS:(state,tokens)=>{
            state.tokens = tokens
        },
        INIT_ENTRANCE_CONTRACT:(state,entranceContract)=>{
            state.entranceContract = entranceContract
        },
    },
    actions: {
        async init({commit, dispatch}) {
            let tokens = config.tokens;
            for (let i=0;i<tokens.length;i++){
                tokens[i].contract = new Erc20(
                    tokens[i].address,tokens[i].decimals
                );
            }
            commit('INIT_TOKENS', tokens);
            let entranceContract = new Entrance(
                config.entranceAddress
            );
            commit('INIT_ENTRANCE_CONTRACT', entranceContract);

            
        },
        async ethLogin({commit, dispatch}) {
            await dispatch('login', 'ETH');
        },
        async logout({commit, dispatch}) {

            commit('UPDATE_BALANCE', 0)
            commit('HANDLE_ACCOUNTS_CHANGED', null)
        },
        async login({commit, dispatch}, connectorType) {
            const connector = new Connector(connectorType)
            if (connector.isLoggedIn()) {
                commit('UPDATE_IS_PORTAL_INSTALLED', true)
                auth = await connector.connect()
                if (connectorType == 'ETH') {
                    auth.web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
                } else {
                    auth.conflux = window.confluxJS;

                }

                await dispatch('loadProvider', connectorType)
            }else{
                commit('UPDATE_IS_PORTAL_INSTALLED', false)

            }
        },
        async loadProvider({commit, dispatch}, connectorType) {
            try {
                if (auth.removeAllListeners) {
                    auth.removeAllListeners()
                }

                if (auth.on) {
                    auth.on('chainChanged', async chainId => {
                        commit('UPDATE_CHAIN_ID', parseInt(chainId))
                    })

                    auth.on('accountsChanged', async accounts => {
                        if (accounts.length !== 0) {
                            commit('HANDLE_ACCOUNTS_CHANGED', accounts[0]);
                            await dispatch('loadProvider',connectorType)
                        }else{
                            commit('HANDLE_ACCOUNTS_CHANGED', null);
                        }
                    })

                    auth.on('disconnect', async () => {
                        commit('HANDLE_ACCOUNTS_CHANGED', null);
                        commit('HANDLE_CLOSE')
                    })
                }

                let accounts
                if (connectorType == 'ETH') {
                    accounts = await auth.request({method: "eth_requestAccounts"})
                    var account = accounts.length > 0 ? accounts[0] : null
                    commit('HANDLE_ACCOUNTS_CHANGED', account)

                    var chainId = parseInt(auth.chainId)
                    commit('UPDATE_CHAIN_ID', chainId)
                    var balance = await auth.web3.eth.getBalance(account)
                    commit('UPDATE_BALANCE', balance / 10 ** 18)
                } 

            } catch (e) {
                console.log(e);
            }
        }
    }
}

export default web3