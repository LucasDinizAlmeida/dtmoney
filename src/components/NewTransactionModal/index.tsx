import { FormEvent, useState } from 'react'

import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox} from './styles'
import closeImg from '../../assets/close.svg'

import incomeImg from '../../assets/income.svg'

import outCome from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions'






interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

  const { createTransactionAndSendApi } = useTransactions()


  const [type, setType] = useState('deposit')

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  
  const handleSendNewTransaction = async(event: FormEvent) => {
    
    event.preventDefault()

    await createTransactionAndSendApi({
      title,
      amount,
      type,
      category
    })

    onRequestClose()

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('')
  }


  return(
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button 
        className='react-modal-close'
        onClick={onRequestClose}
        >
        <img src={closeImg} alt="botão fechar" />
      </button>


      <Container onSubmit={handleSendNewTransaction}>
        <h2>Cadastrar nova transação</h2>

        <input
         placeholder='Título'
         value={title}
         onChange={event => setTitle(event.target.value)}
        />

        <input 
          placeholder='Valor' 
          type='number'
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
          
        />

        <TransactionTypeContainer>
          <RadioBox 
            type='button'
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            colorActive='green'
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            type='button'
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            colorActive='red'
          >
            <img src={outCome} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder='Categoria'
          value={category}
          onChange={event => setCategory(event.target.value)}
          
        />

        <button type="submit">Cadastrar</button>
      </Container>
      

    </Modal>
  )
}