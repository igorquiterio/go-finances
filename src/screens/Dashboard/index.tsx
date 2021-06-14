import React from 'react';
import { Feather } from '@expo/vector-icons'
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards
} from './styles';
import { HighlightCard } from '../../components/HighlightCArd';


export function Dashboard(){
  return (
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
          <Photo source={{uri: 'https://avatars.githubusercontent.com/u/18239699?v=4'}}/>
          <User>
            <UserGreeting>
              Olá, 
            </UserGreeting>
            <UserName>
              Igor
            </UserName>
          </User>
        </UserInfo>
        <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>
    </Container>
  )
}
