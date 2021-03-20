import React, {Component} from 'react';
import {View, Text, Button, ToastAndroid, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import userController from '../controllers/userController';
import {Styles} from '../styles/Style';

const _userController = new userController();

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      authToken: '',
      id: '',
      user: [],
      favourites: [],
    };
  }

  componentDidMount = async () => {
    await this.getData();
    await this.getUser();
    await this.getFavourites();
    await this.getReviews();

    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getData();
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  //TODO: review controller class may not be implemented
  //      due to time constraints
  //TODO: data should also be stored in Storage component
  //      , again may not be implemented
  getData = async () => {
    const route = this.props.route;
    console.log(route);
    try {
      const resp = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });

      let respData = await resp.json();
      console.log(JSON.stringify(respData));
      this.setState({ items: respData });
      this.setState({ authToken: route.params.authToken });
      this.setState({ id: route.params.id });
    } catch (error) {
      console.log(`getdata error: ${error}`);
      ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  };

  getUser = async () => {
    return await _userController.getUser(this.state.id, this.state.authToken);
  };

  getFavourites() {
    const locations = this.state.user.favourite_locations;
    const favourites = [];
    locations.forEach((location) => {
      favourites.push(location.location_id);
    });
    this.setState({ favourites });
  }

  postFavourite = async (id) => {
    const route = this.props.route;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${id}/favourite`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      this.onMount();
      ToastAndroid.show(
        'Favourite Added',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } catch (error) {
      console.log(`postfavourite error: ${error}`);
      ToastAndroid.show(
        `error: ${error}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  deleteFavourite = async (id) => {
    const route = this.props.route;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${id}/favourite`;
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      this.onMount();
      ToastAndroid.show(
        'Favourite Removed',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } catch (error) {
      console.log(`deletefavourite error: ${error}`);
      ToastAndroid.show(
        `error: ${error}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  getReviews() {
    const reviews = this.state.user.liked_reviews;
    const likedReviewed = [];
    reviews.forEach((review) => {
      likedReviewed.push(review.review.review_id);
    });
    this.setState({ likedReviewed });
  }

  render() {
    const { authToken, favourites, likedReviewed, id, items } = this.state;

    const favouriteIcon = (
      <Image source={require('../assets/heart_icon.png')} />
    );

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={Styles.item}
        onPress={() =>
          this.props.navigation.navigate('Item', {
            itemId: item.location_id,
            authToken,
            favourites,
            likedReviewed,
          })
        }
        onLongPress={
          favourites.includes(item.location_id)
            ? () => this.postFavourite(item.location_id)
            : () => this.deleteFavourite(item.location_id)
        }>
        <View style={Styles.itemContainer}>
          <View>
            <Text>{item.location_name}</Text>
            <Text>Locations; {item.location_town}</Text>
            <Text>Rating: {item.avg_overall_rating}</Text>
            <Text>Price: {item.avg_price_rating}</Text>
          </View>
          <View>
            {favourites.includes(item.location_id) ? favouriteIcon : null}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style={Styles.container}>
        <Text>Coffee Shops</Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </SafeAreaView>
    );
  }
}
