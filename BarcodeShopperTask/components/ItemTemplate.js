import React from "react";
import PropTypes from "prop-types";

import {
  AppRegistry,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  Card,
} from "react-native";

const ItemTemplate = (props) => {
  return (
    <View style={styles.itemTemplate}>
      <Text style={styles.text}>Item Retrieved: </Text>

      <Image source={{ uri: props.img }} style={{ width: 250, height: 250 }} />
      <Text>ID: {props.id}</Text>
      <Text>Name: {props.name}</Text>
      <Text>Price: {props.price} </Text>
      
      {/* <Text>Quantity: {props.quantity} </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  itemTemplate: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#0074cc",
    borderWidth: 5,
    width: 260,
    height: 355,
    borderColor: "#0091ff",
    marginTop: 400,
    marginLeft: 75,
    position: "absolute",
    color: "white",
  },
});

ItemTemplate.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
};

AppRegistry.registerComponent("ItemTemplate", () => ItemTemplate);

export default ItemTemplate;
