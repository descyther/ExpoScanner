import React, { useState } from "react";

import {
  AppRegistry,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import Client from "./components/Client.js";
import Scanner from "./components/Scanner.js";
import ItemTemplate from "./components/ItemTemplate.js";
import FadeInView from "./components/FadeInOut.anim.js";

const App = () => {
  const [value, setValue] = useState("");
  const [item, setItem] = useState({
    id: "",
    name: "",
    price: 0,
    img:
      "https://images.pexels.com/photos/41951/solar-system-emergence-spitzer-telescope-telescope-41951.jpeg?cs=srgb&dl=pexels-pixabay-41951.jpg&fm=jpg",
  });

  return (
    <View style={styles.container}>
      {/* //<Client /> */}
      <Scanner id={item.id} setItem={setItem} />
      {/* <FadeInView> */}
      <ItemTemplate
        id={item.id}
        name={item.name}
        price={item.price}
        img={item.img}
      />
      {/* </FadeInView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    height: "100%",
  },
  text: {
    // position: 'absolute',
    // marginTop: 50
  },
  item: {},
});

AppRegistry.registerComponent("App", () => App);

export default App;
