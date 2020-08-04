import React, { useState, useEffect } from "react";
import { Animated, Text, View, TouchableOpacity } from "react-native";
import Scanner from "./Scanner.js";

const FadeInView = (props) => {
  const opacity = useState(new Animated.Value(0))[0].current; // Initial value for opacity: 0

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: 0, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  const opacity = useState(new Animated.Value(0))[0].current; // Initial value for opacity: 0

  const fadeInBR = () => {
    React.useEffect(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
      }).start();
    });
  };
  function fadeOutBR() {
    React.useEffect(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
      }).start();
    });
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FadeInView
        style={{
          position: "absolute",
          height: "100%",
          backgroundColor: "powderblue",
        }}
      >
        <Scanner />
      </FadeInView>
      <TouchableOpacity onPress={fadeInBR}>
        <Text>Fade In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={fadeOutBR}>
        <Text>Fade Out</Text>
      </TouchableOpacity>
    </View>
  );
};
