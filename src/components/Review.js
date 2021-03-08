import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Styles} from '../styles/Style';

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authToken: '',
      overall: '',
      price: '',
      clean: '',
      quality: '',
      body: '',
      editReview: false,
      hasPhoto: false,
    };
  }

  onMount() {
    const {route} = this.props;
    this.setState({authToken: route.params.authToken});
    this.setState({editReview: route.params.editReview});

    route.params.editReview ? this.setPageStateEdit(route.params.review) : null;
    this.checkPhoto();
  }
  overallChange = (overall) => {
    this.setState({overall});
  };

  priceChange = (price) => {
    this.setState({price});
  };

  qualityChange = (quality) => {
    this.setState({quality});
  };

  cleanlinessChange = (cleanliness) => {
    this.setState({cleanliness});
  };

  bodyChange = (body) => {
    this.setState({body});
  };

  setPageStateEdit = (review) => {
    this.setState({overall: String(review.overall_rating)});
    this.setState({price: String(review.price_rating)});
    this.setState({cleanliness: String(review.clenliness_rating)});
    this.setState({quality: String(review.quality_rating)});
    this.setState({body: String(review.review_body)});
  };

  postReview = async () => {
    const {route} = this.props;
    const {overall, price, quality, clean, body} = this.state;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review`;

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
        body: JSON.stringify({
          overall_rating: Number(overall),
          price_rating: Number(price),
          quality_rating: Number(quality),
          clenliness_rating: Number(clean),
          review_body: body,
        }),
      });
      this.props.navigation.goBack();
    } catch (error) {
      console.log(`error: ${error}`);
      ToastAndroid.show(
        `error: ${error}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  patchReview = async () => {
    const {overall, price, quality, clean, body} = this.state;
    const {route} = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review/${route.params.review_id}`;

    try {
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
        body: JSON.stringify({
          overall_rating: Number(overall),
          price_rating: Number(price),
          quality_rating: Number(quality),
          clenliness_rating: Number(clean),
          review_body: body,
        }),
      });
      this.props.navigation.goBack();
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
      this.props.navigation.goBack();
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
        this.setState({hasPhoto: true});
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

  deletePhoto = async () => {
    const {route} = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review/${route.params.review_id}/photo`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      if (response.ok) {
        this.setState({hasPhoto: false});
      }
      this.props.navigation.goBack();
      ToastAndroid.show(
        'Photo Deleted',
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

  render() {
    const {overall, price, quality, cleanliness, body, editReview} = this.state;

    const {route} = this.props;

    const btnPost = (
      <TouchableOpacity onPress={this.postReview}>
        <Text>Post Review</Text>
      </TouchableOpacity>
    );

    const btnEdit = (
      <TouchableOpacity onPress={this.patchReview}>
        <Text>Edit Review</Text>
      </TouchableOpacity>
    );

    const btnDeleteReview = (
      <TouchableOpacity onPress={this.deleteReview}>
        <Text>Delete Review</Text>
      </TouchableOpacity>
    );

    const editControls = (
      <View>
        {btnEdit}
        {btnDeleteReview}
      </View>
    );

    return (
      <View style={Styles.container}>
        <View>
          <Text>Review Page</Text>
          <View>
            <TextInput
              placeholder="Rating"
              onChangeText={this.overallChange}
              value={overall}
            />
          </View>
          <View>
            <TextInput
              placeholder="Price"
              onChangeText={this.priceChange}
              value={price}
            />
          </View>
          <View>
            <TextInput
              placeholder="Quality"
              onChangeText={this.qualityChange}
              value={quality}
            />
          </View>
          <View>
            <TextInput
              placeholder="Cleanliness"
              onChangeText={this.cleanlinessChange}
              value={cleanliness}
            />
          </View>
          <View>
            <TextInput
              placeholder="Comments"
              onChangeText={this.bodyChange}
              value={body}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
        {editReview === true ? editControls : btnPost}
      </View>
    );
  }
}
