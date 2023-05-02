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

export default function PantryToList({ navigation, route }) {
  const [userList, setUserList] = useState(null);
  const [message, setMessage] = useState(null);
  const [showLists, setShowLists] = useState(true);
  const { validUser, item } = route.params;

  const getUserLists = async () => {
    try {
      const userListFromDB = await axios.get(
        `https://pantrypirate.onrender.com/list/${validUser}`
      );
      setUserList(userListFromDB.data);
    } catch (error) {
      console.log("List Screen error----->>>", error);
    }
  };
  useEffect(() => {
    getUserLists();
  }, []);

  const handleSelectList = async (list, item) => {
    try {
      const url = `https://pantrypirate.onrender.com/list/${list._id}`;
      const itemToUpdate = { items: [...list.items, item] };

      await axios.put(url, itemToUpdate);

      setMessage(`Added \n\n${item} \n\nto ${list.name}`);
      setShowLists(false);
      setTimeout(() => {
        setMessage(null);
        setShowLists(true);
        navigation.goBack();
      }, 3000);
    } catch (error) {
      console.log("handleSelectList error----->>>", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
      <Text style={styles.title}>Select List</Text>

      {message && (
        <View style={styles.listContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      )}

      <ScrollView>
        {showLists &&
          userList &&
          userList.map((list, idx) => {
            return (
              <Pressable
                key={`list-${idx}`}
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? "gray" : "black",
                  },
                ]}
                onPress={() => handleSelectList(list, item)}
              >
                <Text style={styles.text}>{list.name}</Text>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFE7",
    flex: 1,
  },
  listContainer: {
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 70,
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
