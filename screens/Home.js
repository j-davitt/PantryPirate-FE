import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import image from "../assets/PantryPirateLogo.png";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation, route }) {
  const [validUser, setValidUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (route.params) {
      const { username } = route.params;
      console.log("username coming into home screen ------->>", username);
      setValidUser(username);
      setIsLoggedIn(true);
    }
  }, [route.params]);

  // console.log('validUser ------->>', validUser);

  const handleLoginButton = () => {
    // setIsLoggedIn(true);
    navigation.navigate("Login");
  };
  const handleLogoutButton = () => {
    setIsLoggedIn(false);
    setValidUser("");
  };

  const handleMyListsButton = () => {
    navigation.navigate("MyLists", { validUser });
  };

  const handleMyPantryButton = () => {
    navigation.navigate("MyPantry", { validUser });
  };

  const handleScanButton = () => {
    navigation.navigate("Scan", { validUser });
  };

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth * 0.9;
  const screenHeight = Dimensions.get("window").height;
  const imageHeight = screenHeight * 0.3;

  if (!isLoggedIn) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#EFEFE7",
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
        <Pressable
          style={({ pressed }) => [
            styles.login,
            {
              backgroundColor: pressed ? "gray" : "black",
            },
          ]}
          title="Login"
          onPress={handleLoginButton}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </Pressable>
        <Image
          source={image}
          style={{
            width: imageWidth,
            height: imageHeight,
            position: "absolute",
            top: 70,
          }}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? "gray" : "black",
            },
          ]}
          title="Scan"
          onPress={handleScanButton}
        >
          <Text style={{ color: "white" }}>Scan</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
      <Pressable
        style={({ pressed }) => [
          styles.login,
          {
            backgroundColor: pressed ? "gray" : "black",
          },
        ]}
        title="Logout"
        onPress={handleLogoutButton}
      >
        <Text style={styles.loginText}>Logout</Text>
      </Pressable>
      <Image
        source={image}
        style={{
          width: imageWidth,
          height: imageHeight,
          position: "absolute",
          top: 70,
        }}
      />
      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? "gray" : "black",
            },
          ]}
          title="My Lists"
          onPress={handleMyListsButton}
        >
          <Text style={styles.buttonText}>My Lists</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? "gray" : "black",
            },
          ]}
          title="My Pantry"
          onPress={handleMyPantryButton}
        >
          <Text style={styles.buttonText}>My Pantry</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? "gray" : "black",
            },
          ]}
          title="Scan"
          onPress={handleScanButton}
        >
          <Text style={styles.buttonText}>Scan</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFE7",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  login: {
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "center",
    width: 120,
    height: 50,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    margin: 10,
  },
  loginText: {
    color: "white",
    
  },
});
