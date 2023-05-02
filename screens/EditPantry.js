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

export default function EditPantry({ navigation, route }) {
  const [pantryName, setPantryName] = useState(route.params.pantry.name);
  const [members, setMembers] = useState(
    route.params.pantry.members.join(" ").replace(route.params.validUser, "")
  );

  const handleUpdateSubmit = async () => {
    try {
      let membersArr = members.split(" ").filter((member) => member !== "");
      const updatedPantry = {
        ...route.params.pantry,
        name: pantryName,
        members: [...membersArr, route.params.validUser],
      };
      await axios.put(
        `https://pantrypirate.onrender.com/pantry/${updatedPantry._id}`,
        updatedPantry
      );
      navigation.reset({
        index: 0,
        routes: [
          { name: "Home", params: { username: route.params.validUser } },
          { name: "MyPantry", params: { validUser: route.params.validUser } },
        ],
      });
    } catch (error) {
      console.log("handleUpdateSubmit error----->>>", error);
    }
  };

  const handleDeleteSubmit = async () => {
    await axios.delete(
      `https://pantrypirate.onrender.com/pantry/${route.params.pantry._id}`
    );

    navigation.reset({
      index: 0,
      routes: [
        { name: "Home", params: { username: route.params.validUser } },
        { name: "MyPantry", params: { validUser: route.params.validUser } },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
      <View style={styles.delete}>
        {route.params.pantry.creator === route.params.validUser && (
          <Pressable
            onPress={handleDeleteSubmit}
            style={({ pressed }) => [
              styles.deleteButton,
              {
                backgroundColor: pressed ? "gray" : "#bb0a1e",
              },
            ]}
          >
            <Text style={styles.buttonText}>Delete Pantry</Text>
          </Pressable>
        )}
      </View>
      <View style={{ marginTop: 50 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>Pantry Name</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Pantry Name"
              value={pantryName}
              onChangeText={setPantryName}
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
          <Text style={styles.buttonText}>Update Pantry</Text>
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
