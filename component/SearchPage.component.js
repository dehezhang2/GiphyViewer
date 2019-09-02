import React , {Component} from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Header, Item,Content,Input, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
const months=['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            keyword: '',
            gifs: [],
            offset: 0,
        };
        this.onChangeKeyword = this.onChangeKeyword.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.renderFooter =  this.renderFooter.bind(this);
    }
    getData(){
        setTimeout(()=>{
            axios.get("https://api.giphy.com/v1/gifs/search?api_key=4HU1mT6iJEHyUpoFkM38YNSYblVX3F0n&q="+this.state.keyword+"&limit=25&offset="+this.state.offset+"&rating=G&lang=en")
            .then(response=>{
                this.setState({
                    gifs: response.data.data,
                    refreshing: false,
                });
            })
            .catch(error=>{
                console.log(error);
            })
        }, 1000);
        
    }
    componentDidMount(){
        this.setState({
            refreshing:true,
        },this.getData());

    }
    onChangeKeyword = search => {
        this.setState({
            keyword: search,
        }, () => {
            this.getData();
        });
    };
    loadMore = () => {
        this.setState({
            offset: this.state.offset+1,
            refreshing: true,
        }, () => {
            this.getData();
        });
    }
    renderFooter = () => {
        if (!this.state.refreshing) return null;
        return (
            <ActivityIndicator size="large" color="#000" />
        )
    }
    render(){
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                    <Icon name="ios-search" />
                    <Input 
                        placeholder="Search"
                        value={this.state.keyword}
                        onChangeText={this.onChangeKeyword} />
                    <Icon name="ios-images" />
                    </Item>

                </Header> 
                <ScrollView>
                    <Container>
                        <FlatGrid
                            itemDimension={130}
                            items={this.state.gifs}
                            style={styles.gridView}
                            onEndReached = {this.loadMore}
                            onEndReachedThreshold = {0}
                            ListFooterComponent={this.renderFooter}
                            renderItem={({ item, index }) => (
                                <Card>
                                <CardItem>
                                    <Text>{item.title.length<15
                                            ?item.title.toUpperCase()
                                            :item.title.toUpperCase().substring(0,15)
                                        }
                                    </Text>
                                </CardItem>   
                                <CardItem cardBody>
                                    <Image source={{uri: item.images.preview_gif.url}} style={{height: 200, width: null, flex: 1}}/>
                                </CardItem>   
                                <CardItem>
                                    <Left>
                                    <Button transparent>
                                        <Icon active name="ios-heart-empty" />
                                    </Button>
                                    </Left>
                                    <Right>
                                        <Text
                                            style={{color:'blue'}}
                                        >
                                            { 
                                                item.import_datetime.substring(8, 10)+', '+months[parseInt(item.import_datetime.substring(5, 7))]
                                            }
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
  gridView: {
    marginTop: 20,
    flex: 1,
  },
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
