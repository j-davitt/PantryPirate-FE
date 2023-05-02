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

export default function MyLists({ navigation, route }) {
  const [userList, setUserList] = useState(null);
  const [message, setMessage] = useState(null);
  const [showLists, setShowLists] = useState(true);

  const { validUser } = route.params;
  console.log("validUser coming into my list ------->>", validUser);

  const getUserLists = async () => {
    try {
      const userListFromDB = await axios.get(
        `https://pantrypirate.onrender.com/list/${validUser}`
      );
      setUserList(userListFromDB.data);
      // console.log('userList ------->>', userListFromDB);
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
        console.log("validUser ------->>", validUser);
        navigation.reset({
          index: 0,
          routes: [{ name: "Scan", params: { validUser } }],
        });
      }, 3000);
    } catch (error) {
      console.log("handleSelectList error----->>>", error);
    }
  };

  const handleEdit = (list) => {
    navigation.navigate("EditList", { list, validUser });
  };

  const handleViewList = async (list) => {
    navigation.navigate("ListDetails", { list, validUser });
  };

  const handleAddList = () => {
    navigation.navigate("AddList", { validUser });
  };

  if (route.params.response) {
    const { response } = route.params;
    const item = response.SearchResult.Items[0].ItemInfo.Title.DisplayValue;
    return (
      <View style={styles.container}>
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
  if (!route.params.response) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
        <ScrollView>
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.boxButton,
                {
                  backgroundColor: pressed ? "gray" : "black",
                },
              ]}
              onPress={handleAddList}
            >
              <Text style={styles.text}>Create New List</Text>
            </Pressable>
          </View>
          {userList &&
            userList.map((list, idx) => {
              return (
                <View key={`edit-${idx}`} style={styles.listContainer}>
                  <Text style={styles.listTitle}>{list.name}</Text>
                  <View style={styles.buttonContainer}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.boxButton,
                        {
                          backgroundColor: pressed ? "gray" : "black",
                        },
                      ]}
                      onPress={() => handleViewList(list)}
                    >
                      <Text style={styles.text}>View Items</Text>
                    </Pressable>
                    {list.creator === validUser && (
                      <Pressable
                        style={({ pressed }) => [
                          styles.boxButton,
                          {
                            backgroundColor: pressed ? "gray" : "black",
                          },
                        ]}
                        onPress={() => handleEdit(list)}
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
  listContainer: {
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
  listTitle: {
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
