import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {Styles} from '../styles/Style';

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      authToken: '',
      likedReviews: [],
      reviewIds: [],
      photoReviews: [],
    };
  }

  onMount = async () => {
    await this.getItem();
    await this.getReviews();
    await this.checkReviewPhoto();

    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getItem();
    });
  };

  onUnmount() {
    this.unsubscribe();
  }

  getItem = async () => {
    const {route} = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}`;
    this.setState({authToken: route.params.authToken});

    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const respData = await resp.json();
      this.setState({item: respData});
      this.setState({likedReviews: route.params.likedReviews});
    } catch (error) {
      console.log(`error: ${error}`);
      ToastAndroid.show(
        `error: ${error}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  getReviews() {
    const {item} = this.state;
    const reviews = item.location_reviews;
    const reviewIds = [];

    reviews.forEach((review) => {
      reviewIds.push(review.review_id);
    });
    this.setState({reviewIds});
  }

  postReview = async (id) => {
    const {route} = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}/review/${id}/like`;

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      const isLiked = this.state.likedReviews;
      isLiked.push(id);
      this.setState({likedReviews: isLiked});
      ToastAndroid.show(
        'Review Posted',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } catch (error) {
      console.log(`error: ${error}`);
      ToastAndroid.show(
        `error: ${error}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  deleteReview = async (id) => {
    const {route} = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}/review/${id}/like`;

    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      const isLiked = this.state.likedReviews;
      const index = isLiked.indexOf(id);
      isLiked.splice(index, 1);
      this.setState({likedReviews: isLiked});
      ToastAndroid.show(
        'Review Deleted',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } catch (error) {
      console.log(`error: ${error}`);
      ToastAndroid.show(
        `error: ${error}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  checkPhoto = async (reviewId) => {
    const {route} = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}/review/${reviewId}/photo`;

    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      if (resp.ok) {
        const {photoReviews} = this.state;
        photoReviews.push(reviewId);
        this.setState({photoReviews});
      }
    } catch (error) {
      console.log(`error: ${error}`);
      ToastAndroid.show(
        `error: ${error}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  checkReviewPhoto() {
    const {reviewIds} = this.state;

    reviewIds.forEach((review) => {
      this.checkPhoto(review);
    });
  }

  render() {
    const {item} = this.state;
    const {route} = this.props;
    const reviews = item.location_reviews;

    const loadReviewPhoto = (id) => (
      <image
        source={{
          uri: `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}/review/${id}/photo`,
        }}
      />
    );

    const favouriteIcon = (
      <Image source={require('../assets/heart_icon.png')} />
    );

    const renderReview = ({item}) => (
      <TouchableOpacity
        onPress={
          this.state.likedReviews.includes(item.review_id)
            ? () => this.postReview(item.review_id)
            : () => this.deleteReview(item.review_id)
        }>
        <View style={Styles.container}>
          <View>
            <Text>Rating: {item.overall_rating}</Text>
            <Text>Quality: {item.quality_rating}</Text>
            <Text>Price: {item.price_rating}</Text>
            <Text>Cleanliness: {item.clenliness_rating}</Text>
            <Text>{item.review_body}</Text>
            <View>
              {this.state.likedReviews.includes(item.review_id)
                ? favouriteIcon
                : null}
            </View>
          </View>
          <View>
            {this.state.photoReviews.includes(item.review_id)
              ? loadReviewPhoto(item.review_id)
              : null}
          </View>
        </View>
      </TouchableOpacity>
    );

    const reviewList = (
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(review) => review.review_id.toString()}
      />
    );

    return (
      <SafeAreaView style={Styles.container}>
        <Text>{item.location_name}</Text>
        {/* <Image source={loadReviewPhoto(this.props.id)} /> */}
        <Text>Location: {item.location_town}</Text>
        <Text>Rating: {item.avg_overall_rating}</Text>
        <Text>Price: {item.avg_price_rating}</Text>
        <Text>Quality: {item.avg_quality_rating}</Text>
        <Text>Cleanliness: {item.avg_clenliness_rating}</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Review', {
              authToken: this.state.authToken,
              location_id: item.location_id,
            });
          }}>
          <Text>Leave Review</Text>
        </TouchableOpacity>
        {reviewList}
      </SafeAreaView>
    );
  }
}
