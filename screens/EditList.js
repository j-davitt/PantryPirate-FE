import React, { useState } from "react";
import {
  View,
  Pressable,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import axios from "axios";

export default function EditList({ navigation, route }) {
  const [listName, setListName] = useState(route.params.list.name);
  const [members, setMembers] = useState(
    route.params.list.members.join(" ").replace(route.params.validUser, "")
  );

  const handleUpdateSubmit = async () => {
    try {
      let membersArr = members.split(" ").filter((member) => member !== "");
      const updatedList = {
        ...route.params.list,
        name: listName,
        members: [...membersArr, route.params.validUser],
      };
      await axios.put(
        `https://pantrypirate.onrender.com/list/${updatedList._id}`,
        updatedList
      );
      navigation.reset({
        index: 0,
        routes: [
          { name: "Home", params: { username: route.params.validUser } },
          { name: "MyLists", params: { validUser: route.params.validUser } },
        ],
      });
    } catch (error) {
      console.log("handleUpdateSubmit error----->>>", error);
    }
  };

  const handleDeleteSubmit = async () => {
    await axios.delete(
      `https://pantrypirate.onrender.com/list/${route.params.list._id}`
    );

    navigation.reset({
      index: 0,
      routes: [
        { name: "Home", params: { username: route.params.validUser } },
        { name: "MyLists", params: { validUser: route.params.validUser } },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
      <View style={styles.delete}>
        {route.params.list.creator === route.params.validUser && (
          <Pressable
            onPress={handleDeleteSubmit}
            style={({ pressed }) => [
              styles.deleteButton,
              {
                backgroundColor: pressed ? "gray" : "#bb0a1e",
              },
            ]}
          >
            <Text style={styles.buttonText}>Delete List</Text>
          </Pressable>
        )}
      </View>
      <View style={{ marginTop: 50 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>List Name</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="List Name"
              value={listName}
              onChangeText={setListName}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>Members</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Add Members"
              value={members}
              onChangeText={setMembers}
              style={styles.input}
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Pressable
          onPress={handleUpdateSubmit}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? "gray" : "black",
            },
          ]}
        >
          <Text style={styles.buttonText}>Update List</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFE7",
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    padding: 10,
  },
  delete: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  inputContainer: {
    backgroundColor: "black",
    margin: 15,
    borderRadius: 15,
    borderWidth: 1,
  },
  inputHeader: {
    marginLeft: 30,
    marginTop: 30,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#EFEFE7",
    padding: 5,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#bb0a1e",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
