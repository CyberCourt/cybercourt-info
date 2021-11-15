
export default class Connector {

	// coinType - BNB ETH CFX
	constructor(coinType) {
		this.coinType = coinType.toUpperCase()
	}

	async connect() {
		let provider
		if (this.coinType == 'ETH') {
			if (window['ethereum']) {
				window['detectProvider'] = window['ethereum']
				provider = window['detectProvider']
				try {
					await window['detectProvider'].enable()
				} catch (e) {
					console.error(e)
					return
				}
			} else if (window['web3']) {
				provider = window['web3'].currentProvider
			}
		} 
		return provider
	}

	isLoggedIn() {
		if (this.coinType == 'ETH') {
			return !!window['ethereum']
		} 
		return false
	}
}