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

export default function ({ route }) {
  const [list, SetList] = useState(route.params.list);
  const [clickedItems, setClickedItems] = useState([]);

  const handleDeleteItem = (item) => {
    const index = list.items.indexOf(item);
    if (index !== -1) {
      const newList = [...list.items];
      newList.splice(index, 1);
      const updatedList = { ...list, items: newList };

      axios
        .put(`https://pantrypirate.onrender.com/list/${list._id}`, updatedList)
        .then(() => {
          SetList(updatedList);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleItemClick = (item) => {
    if (clickedItems.includes(item)) {
      setClickedItems(
        clickedItems.filter((clickedItem) => clickedItem !== item)
      );
    } else {
      setClickedItems([...clickedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFE7" />
      <ScrollView>
        {list.items.map((item, idx) => {
          const isClicked = clickedItems.includes(item);
          return (
            <View key={`item-${idx}`} style={styles.itemContainer}>
              <Text
                style={[styles.itemText, isClicked && styles.clickedText]}
                onPress={() => handleItemClick(item)}
              >
                {item}
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.deleteButton,
                  {
                    backgroundColor: pressed ? "gray" : "#bb0a1e",
                  },
                ]}
                onPress={() => handleDeleteItem(item)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
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
  clickedText: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
  deleteButton: {
    backgroundColor: "#bb0a1e",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
});
