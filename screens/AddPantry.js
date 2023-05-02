import {
  TextInput,
  View,
  Pressable,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { useState } from "react";

import axios from "axios";

export default function AddPantry({ navigation, route }) {
  const [pantryName, setPantryName] = useState("");
  const [members, setMembers] = useState("");
  const { validUser } = route.params;

  const handlePantrySubmit = () => {
    let membersArr = members.split(" ");
    const pantry = {
      creator: validUser,
      name: pantryName,
      members: [...membersArr, validUser],
    };
    console.log("pantry ------->>", pantry);
    axios.post("https://pantrypirate.onrender.com/pantry", pantry);

    navigation.reset({
      index: 0,
      routes: [
        { name: "Home", params: { username: validUser } },
        { name: "MyPantry", params: { validUser } },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
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
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Pressable
          onPress={handlePantrySubmit}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? "gray" : "black",
            },
          ]}
        >
          <Text style={styles.buttonText}>Create Pantry</Text>
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
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
