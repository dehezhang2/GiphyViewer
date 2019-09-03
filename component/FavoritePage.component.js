import React , {Component} from 'react';
import { StyleSheet, Image, ScrollView, FlatList, View,SafeAreaView } from 'react-native';
import { Container, Card, CardItem, Text, Button, Icon, Left, Right, Header } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export default class FavoritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
        };
        this.deleteItem = this.deleteItem.bind(this);
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
        this.onRefresh = this.onRefresh.bind(this);
    }
    deleteItem = (e)=>{
        var array = [...this.state.gifs];
        var index = array.indexOf(e);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ gifs: array }, () => {
                AsyncStorage.setItem('favorite', JSON.stringify(this.state.gifs));
            });
        }
    }
    onRefresh(){
        this._loadFavoriteList();
    }
    componentDidMount(){
        this._loadFavoriteList();
    }
    render(){
        if (this.state.gifs.length == 0) {
            return (
                <View style={styles.containerText}>
                    <SafeAreaView />
                    <Text style={styles.emptyText}>Favorite GIF List Empty</Text>
                </View>
            )

        } else {
            return (
                <Container>
                    <Header>
                        <Text style={styles.emptyText}>My Favorite GIF List</Text>
                        <Button 
                            transparent
                            onPress = {this.onRefresh()}
                        >
                            <Text>Refresh</Text>
                        </Button>
                    </Header>

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
                                            <Button 
                                                transparent
                                                onPress = {()=>{this.deleteItem(item)}}
                                            >
                                                <Icon active name="ios-trash" />
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
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        justifyContent: 'center',
        lineHeight: 30,
        fontSize: 30
    },

});
