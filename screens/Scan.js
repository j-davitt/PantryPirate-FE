import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, StatusBar } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scan({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { validUser } = route.params;
  console.log("validUser coming into scan ------->>", validUser);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("Item", { data, validUser });
  };
  const handleHome = () => {
    console.log("validUser coming into handleHome ------->>", validUser);
    navigation.reset({
      index: 0,
      routes: [{ name: "Home", params: { username: validUser } }],
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.boxButton,
            {
              backgroundColor: pressed ? "gray" : "black",
            },
          ]}
          onPress={handleHome}
        >
          <Text style={styles.text}>Back To Home</Text>
        </Pressable>
      </View>
      <View style={[styles.container, styles.barcodeContainer]}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFE7",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  text: {
    color: "white",
  },
  boxButton: {
    backgroundColor: "black",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    color: "black",
  },
  barcodeContainer: {
    marginTop: 100,
    marginBottom: 100,
  },
});
