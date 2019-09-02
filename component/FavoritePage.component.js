import React , {Component} from 'react';
import { StyleSheet, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { Container, Header, Item, Input, Card, CardItem, Text, Button, Icon, Left, Right } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export default class FavoritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
        };
    }
    _loadFavoriteList = async()=>{
        const list = await AsyncStorage.getItem('favorite');
        console.log(JSON.parse(list));
        if (list != null) {
            // console.log('set list');
            this.setState({
                gifs: JSON.parse(list)
            })
        }
    }
    componentDidMount(){
        this._loadFavoriteList();
    }
    render(){
        return (
            <Container>
                <ScrollView>
                    <Container>
                        <FlatList
                            data={this.state.gifs}
                            renderItem={({ item, index }) => (

                                <Card>
                                    <CardItem>
                                        <Text>{item.title}</Text>
                                    </CardItem>   
                                    <CardItem cardBody>
                                        <Image source={{uri: item.key}} style={{height: 200, width: null, flex: 1}}/>
                                    </CardItem>   
                                    <CardItem>
                                        <Left>
                                        <Button transparent>
                                            <Icon active name="ios-heart-empty" />
                                        </Button>
                                        </Left>
                                        <Right>
                                            <Text style={{color:'blue'}}>
                                                {item.date}
                                            </Text>
                                        </Right>
                                    </CardItem>
                                </Card> 

                            )}
                        />
                    </Container>
                </ScrollView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  loader: {
      marginTop: 10,
      alignItems: 'center'
  },
});
