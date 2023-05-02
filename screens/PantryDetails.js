import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import axios from "axios";
import { useState } from "react";

export default function ({ navigation, route }) {
  const [pantry, setPantry] = useState(route.params.pantry);

  const handleDeleteItem = (item) => {
    const index = pantry.items.indexOf(item);
    if (index !== -1) {
      const newPantry = [...pantry.items];
      newPantry.splice(index, 1);
      const updatedPantry = { ...pantry, items: newPantry };

      axios
        .put(
          `https://pantrypirate.onrender.com/pantry/${pantry._id}`,
          updatedPantry
        )

        .then(() => {
          setPantry(updatedPantry);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAddItem = (item) => {
    navigation.navigate("PantryToList", {
      validUser: route.params.validUser,
      item,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
      <ScrollView>
        {pantry.items.map((item, idx) => {
          return (
            <View key={`item-${idx}`} style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? "gray" : "black",
                  },
                ]}
                onPress={() => handleAddItem(item)}
              >
                <Text style={styles.text}>Add to List</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.deleteButton,
                  {
                    backgroundColor: pressed ? "gray" : "#bb0a1e",
                  },
                ]}
                onPress={() => handleDeleteItem(item)}
              >
                <Text style={styles.text}>Delete</Text>
              </Pressable>
            </View>
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
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  itemText: {
    width: "60%",
  },
  deleteButton: {
    backgroundColor: "#bb0a1e",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
});
