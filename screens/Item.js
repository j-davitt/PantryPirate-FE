import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import image from "../assets/PantryPirateLogo.png";

export default function Item({ navigation, route }) {
  const { data, validUser } = route.params;
  const [response, setResponse] = useState({});

  const handleScanButton = () => {
    navigation.reset({
      index: 0,
      routes: [
        { name: "Home", params: { username: validUser } },
        { name: "Scan", params: { validUser } },
      ],
    });
  };

  const handleAmazonButton = () => {
    const url = response.SearchResult.Items[0].DetailPageURL;
    Linking.openURL(url);
  };

  const handleGoogleButton = () => {
    const url = `https://www.google.com/search?q=${data}&tbm=shop`;
    Linking.openURL(url);
  };

  const handleListButton = () => {
    navigation.navigate("MyLists", { response, validUser });
  };
  const handlePantryButton = () => {
    navigation.navigate("MyPantry", { response, validUser });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const axiosResponse = await axios.get(
          `https://pantrypirate.onrender.com/products/${data}`
        );
        setResponse(axiosResponse.data);
      } catch (error) {
        console.log("error----->>>", error);
      }
    };

    if (data) {
      getData();
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
      <Pressable style={styles.button} onPress={handleScanButton}>
        <Text style={styles.buttonText}>Rescan</Text>
      </Pressable>
      <View style={styles.center}>
        {response.SearchResult ? (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  response.SearchResult.Items[0].Images.Primary.Large.URL ||
                  image,
              }}
              style={styles.image}
            />
            <Text style={styles.text}>
              Item:{" "}
              {response.Errors === undefined
                ? response.SearchResult.Items[0].ItemInfo.Title.DisplayValue
                : "Not Found"}
            </Text>
          </View>
        ) : (
          <Text>Item not found</Text>
        )}
      </View>
      {validUser !== "" && (
        <View style={styles.buttonRowContainer}>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleListButton}>
              <Text style={styles.buttonText}>Add to List</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handlePantryButton}>
              <Text style={styles.buttonText}>Add to Pantry</Text>
            </Pressable>
          </View>
        </View>
      )}
      <View style={styles.buttonRowContainer}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleAmazonButton}>
            <Text style={styles.buttonText}>Find on Amazon</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleGoogleButton}>
            <Text style={styles.buttonText}>Find on Google</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFEFE7",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "center",
  },
  buttonRowContainer: {
    flexDirection: "row",
    paddingBottom: 32,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
