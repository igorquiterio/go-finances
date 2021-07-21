import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native'
import { useForm } from 'react-hook-form'

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Container, Header, Title, Form, Fields, TransactionsTypes } from './styles';

import { CategorySelect } from '../CategorySelect';

interface FromData {
  name: string;
  amount: string;
}

export function Register(){

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);


  const [category,setCategory] = useState({
    key: 'category',
    name:'Categoria'
  })

  const {
    control,
    handleSubmit
  } = useForm();

  
  function handleTransactionsTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  function handleModalCloseSelectCategory(){
    setCategoryModalOpen(false);
  }

  function handleModalOpenSelectCategory(){
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FromData){

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
    
  }

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name="name"
            placeholder="Nome" 
            control={control}
          />
          <InputForm
            name="amount"
            placeholder="Preço"
            control={control}
          />
          <TransactionsTypes>
            <TransactionTypeButton 
              type="up"
              title="Income"
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton 
              type="down"
              title="Outcome"
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>
          <CategorySelectButton title={category.name} onPress={handleModalOpenSelectCategory}/>
        </Fields>

        <Button 
          title="enviar"
          onPress={handleSubmit(handleRegister)}
        />

      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleModalCloseSelectCategory}
        />
      </Modal>

    </Container>
  );

}