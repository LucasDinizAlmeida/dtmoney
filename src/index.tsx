import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';


import { createServer, Model } from 'miragejs'

createServer({

  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createAt: new Date('2022-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'churrasco',
          type: 'withdraw',
          category: 'Recreação',
          amount: 150,
          createAt: new Date('2022-03-12 09:00:00')
        },
      ]
    })
  },


  routes() {
    this.namespace = 'api'


    this.get('transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })

  }
})



/*
createServer({
  routes() {
    this.namespace = 'api'

    this.get('transactions', () => {
      return [
        {
          id: 1,
          title: 'Transaction01',
          type: 'deposit',
          amount: 400,
          category: 'Food',
          createAt: new Date
        },
        {
          id: 2,
          title: 'Transaction02',
          type: 'withdraw',
          amount: -100,
          category: 'Gasolina',
          createAt: new Date
        }
      ]
    })
  }
})
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
