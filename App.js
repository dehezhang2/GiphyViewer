import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import SearchPage from "./component/SearchPage.component";
import FavoritePage from "./component/FavoritePage.component";
export default class App extends Component {
  render(){
    
    return (
      <Container>
        <Tabs tabBarPosition="bottom">
          <Tab heading={ <TabHeading><Icon name="ios-search" /><Text>Search</Text></TabHeading>}>
            <SearchPage />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="ios-heart" /><Text>My Favorite</Text></TabHeading>}>
            <FavoritePage />
          </Tab>
        </Tabs>
    </Container>
    );
  }
}