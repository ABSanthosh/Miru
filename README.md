# Miru👀

A simple interface to explore Ethereum blockchain logs and analyze the interconnections of transactions.

Uses Web3.js to connect to Ethereum mainnet and query the blockchain.


## To Run it locally

1) `yarn` || `npm install`
2) Go to [Tatum](https://dashboard.tatum.io/) and get an API key
3) Go to [Infura](https://infura.io/) and create a project and get ProjectId

- 3.1) Create a new .env file in root directory
- 3.2) Add:
    - `REACT_APP_API_KEY=<your_tatum_api_key>`
    - `REACT_APP_PROJECT_ID=<your_infura_project_id>`

3) `yarn start` || `npm run start`

Alternatively, you can try out the site at [miru-chain.netlify.app](https://miru-chain.netlify.app/eth) without setting up any of the above.

<i>Note: API keys are not supposed to be in public repos. Mail me if you want to run the project locally so I can provide sample keys</i>

<br/>
<hr />

## Dev Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/12bbffcd-054e-457c-a2af-9ce8af8da0ef/deploy-status)](https://miru-chain.netlify.app/eth)