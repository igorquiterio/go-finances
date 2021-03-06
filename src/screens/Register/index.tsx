import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form';

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

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
})

export function Register() {

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);


  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema)
  });


  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleModalCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  function handleModalOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FromData) {

    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if (category.key === 'category')
      return Alert.alert('Selecione o tipo da categoria');


    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoCapitalize='characters'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              placeholder="Preço"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
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
            <CategorySelectButton title={category.name} onPress={handleModalOpenSelectCategory} />
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
    </TouchableWithoutFeedback>
  );

}