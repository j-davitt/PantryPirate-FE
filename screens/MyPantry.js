import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MyPantry({ navigation, route }) {
  const [message, setMessage] = useState(null);
  const [showPantries, setShowPantries] = useState(true);
  const [userPantry, setUserPantry] = useState(null);
  const { validUser } = route.params;

  const getUserPantries = async () => {
    try {
      const userPantryFromDB = await axios.get(
        `https://pantrypirate.onrender.com/pantry/${validUser}`
      );
      setUserPantry(userPantryFromDB.data);
    } catch (error) {
      console.log("Pantry Screen error----->>>", error);
    }
  };
  useEffect(() => {
    getUserPantries();
  }, []);

  const handleSelectPantry = async (pantry, item) => {
    try {
      const url = `https://pantrypirate.onrender.com/pantry/${pantry._id}`;
      // console.log('url ------->>', url);
      const itemToUpdate = { items: [...pantry.items, item] };
      // console.log('itemToUpdate ------->>', itemToUpdate);

      await axios.put(url, itemToUpdate);

      setMessage(`Added \n\n${item} \n\nto ${pantry.name}`);
      setShowPantries(false);
      setTimeout(() => {
        setMessage(null);
        setShowPantries(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "Scan", params: { validUser } }],
        });
      }, 3000);
    } catch (error) {
      console.log("handleSelectPantry error----->>>", error);
    }
  };

  const handleEdit = (pantry) => {
    navigation.navigate("EditPantry", { pantry, validUser });
  };

  const handleViewPantry = async (pantry) => {
    navigation.navigate("PantryDetails", { pantry, validUser });
  };

  const handleAddPantry = () => {
    navigation.navigate("AddPantry", { validUser });
  };

  if (route.params.response) {
    const { response } = route.params;
    const item = response.SearchResult.Items[0].ItemInfo.Title.DisplayValue;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
        <Text style={styles.title}>Select Pantry</Text>

        {message && (
          <View style={styles.pantryContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
        )}

        <ScrollView>
          {showPantries &&
            userPantry &&
            userPantry.map((pantry, idx) => {
              return (
                <Pressable
                  key={`pantry-${idx}`}
                  style={({ pressed }) => [
                    styles.button,
                    {
                      backgroundColor: pressed ? "gray" : "black",
                    },
                  ]}
                  onPress={() => handleSelectPantry(pantry, item)}
                >
                  <Text style={styles.text}>{pantry.name}</Text>
                </Pressable>
              );
            })}
        </ScrollView>
      </View>
    );
  }
  if (!route.params.response) {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.boxButton,
                {
                  backgroundColor: pressed ? "gray" : "black",
                },
              ]}
              onPress={handleAddPantry}
            >
              <Text style={styles.text}>Create New Pantry</Text>
            </Pressable>
          </View>
          {userPantry &&
            userPantry.map((pantry, idx) => {
              return (
                <View key={`edit-${idx}`} style={styles.pantryContainer}>
                  <Text style={styles.pantryTitle}>{pantry.name}</Text>
                  <View style={styles.buttonContainer}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.boxButton,
                        {
                          backgroundColor: pressed ? "gray" : "black",
                        },
                      ]}
                      onPress={() => handleViewPantry(pantry)}
                    >
                      <Text style={styles.text}>View Items</Text>
                    </Pressable>
                    {pantry.creator === validUser && (
                      <Pressable
                        style={({ pressed }) => [
                          styles.boxButton,
                          {
                            backgroundColor: pressed ? "gray" : "black",
                          },
                        ]}
                        onPress={() => handleEdit(pantry)}
                      >
                        <Text style={styles.text}>Settings</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFE7",
    flex: 1,
  },
  pantryContainer: {
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 70,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  pantryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    color: "black",
  },
  text: {
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  message: {
    fontSize: 28,
    textAlign: "center",
  },
  boxButton: {
    backgroundColor: "black",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
});
