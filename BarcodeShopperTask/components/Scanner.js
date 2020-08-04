import React, { useState, useEffect } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

//couldnt get full screen in android but many report the same issue however iOS works fien in full screen it seems
const { width } = Dimensions.get("screen");
const qrSize = width * 0.5;

const Scanner = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setID] = useState([props.id]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //i think shopify blocks client side requests so i tried a nodejs, then i got the same CORS preflight error.
  //I used headers for cors and the cors error was gone but still didnt make requests

  // const fetchData = (data) => {
  //   //shopifys graphql 
  //   const urlGraphQL = "http://192.168.1.224:4000/graphql";
  //   //shopifys Rest API
  //   const urlAPI =
  //     "https://<>:<>@<>.myshopify.com/admin/api/2020-01/orders.json";
  //   //my server
  //   const urlBackend = "http://192.168.1.224:4000/graphql";
  //   return axios
  //     .get(urlBackend)
  //     .then((response) => response.json())
  //     .then((listData) => {
  //       setListData({ listData });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };


  //once scanned this passes data to the parent 
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    //alert(`id: ${data}  scanned!`);
    props.setItem({
      id: data,
      name: "Flowers",
      price: 999,
      img:
        "https://images.pexels.com/photos/70330/pexels-photo-70330.jpeg?cs=srgb&dl=pexels-unchalee-srirugsar-70330.jpg&fm=jpg",
    });
    //this would have called the backend or apollo client would have 
    //  fetchData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.cameraContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
        onChange={scanned ? undefined : handleBarCodeScanned}
      />
      <Image
        style={styles.barcode}
        source={require("../assets/images/barcode2.png")}
      />
      <Text style={styles.txt}>{id.id}</Text>
      {scanned && (
        <Button
          style={styles.btn}
          color="#0091ff"
          title={"Scan Again?"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  barcode: {
    marginBottom: "90%",
    width: qrSize * 1.5,
    height: qrSize,
  },
  btn: {},
});

AppRegistry.registerComponent("Scanner", () => Scanner);

export default Scanner;
