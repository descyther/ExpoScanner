import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import {
  AppRegistry,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

const client = new ApolloClient({
  //uri: "http://swapi.dev/api/planets/1/",
  //uri: "https://48p1r2roz4.sse.codesandbox.io",
  //uri: `https://fuse-dev.myshopify.com/api/2020-01/graphql.json`,
  async: true,
  crossDomain: true,
  fetchOptions: {
    mode: "no-cors",
  },
  //still blocked by something which i think is because of it being a client side request rather than from a server.
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "http://192.168.1.224:19006/",
    "Content-Type": "application/graphql",
    "X-Shopify-Storefront-Access-Token": "",
    "X-Shopify-Access-Token:": "",
    Host: "bar.other",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-us,en;q=0.5",
    "Accept-Encoding": "gzip,deflate",
    "Accept-Charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.7",
    Connection: "keep-alive",
    Origin: "http://192.168.1.224:19006/",
    "Access-Control-Request-Method": "POST",
    "Access-Control-Request-Headers": "X-PINGOTHER, Content-Type",
  },
  cache: new InMemoryCache(),
});

const APIData = () => {
  //I tested this query in GraphiQL but didnt get
  //the ability to test and find the information i needed unfortunately
  const SHOP_DETAILS = gql`
    query GetItemDetails {
      shop {
        products(first: 5) {
          edges {
            node {
              id
              handle
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(SHOP_DETAILS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  console.log(data);
  return data.shop.map(({ id, name, price }) => (
    <Text key={id}>
      {name}: {price}
    </Text>
  ));
};

const Client = () => {
  return (
    <ApolloProvider client={client}>
      <View style={styles.scroll}>
        <ScrollView>
          <Text>Product Retreived 🚀</Text>
        </ScrollView>
        <APIData />
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  scroll: {},
});

AppRegistry.registerComponent("Client", () => Client);

export default Client;
