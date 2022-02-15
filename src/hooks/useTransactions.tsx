import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transactions {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createAt: string
}

type TransactionCreate = Omit<Transactions, 'id' | 'createAt'>


interface TransactionsProviderProps {
  children: ReactNode
}

interface CreateContextProps {
  transactions: Transactions[],
  createTransactionAndSendApi: (props: TransactionCreate) => Promise<void>
}





const TransactionsContext = createContext<CreateContextProps>(
  {} as CreateContextProps
)




export function TransactionsProvider({ children }: TransactionsProviderProps) {

  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])


  const createTransactionAndSendApi = async({ title, amount, type, category }: TransactionCreate) => {
    const data = {
      title,
      amount,
      type,
      category
    }

    const response = await api.post('/transactions', {... data, createAt: new Date()})

    const { transaction } = response.data

    setTransactions([
      ... transactions,
      transaction
    ])
  }


  return (
    <TransactionsContext.Provider value={{transactions, createTransactionAndSendApi}}>
      {children}
    </TransactionsContext.Provider>
  )

}

export function useTransactions() {
  const context = useContext(TransactionsContext) 

  return context
}