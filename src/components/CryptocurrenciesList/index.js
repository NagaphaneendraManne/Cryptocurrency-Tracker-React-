// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import CryptocurrencyItem from '../CryptocurrencyItem'

import './index.css'

class CryptocurrenciesList extends Component {
  state = {cryptoDataList: [], isLoading: true}

  componentDidMount() {
    this.getCryptoData()
  }

  getCryptoData = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    console.log(data)
    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      currencyName: eachItem.currency_name,
      usdValue: eachItem.usd_value,
      euroValue: eachItem.euro_value,
      currencyLogo: eachItem.currency_logo,
    }))
    this.setState({cryptoDataList: updatedData, isLoading: false})
  }

  render() {
    const {cryptoDataList, isLoading} = this.state

    return (
      <div className="currencies-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <>
            <h1 className="crypto-heading">Cryptocurrency Tracker</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
              alt="cryptocurrency"
              className="crypto-image"
            />
            <div className="crypto-table">
              <div className="contents-container">
                <p className="table-heading">Coin Type</p>
                <div className="table-right-side-heading">
                  <p className="table-heading">USD</p>
                  <p className="table-heading">EURO</p>
                </div>
              </div>
              <div className="api-item">
                {cryptoDataList.map(eachCoin => (
                  <CryptocurrencyItem key={eachCoin.id} cryptoData={eachCoin} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
