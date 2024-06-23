import {
  Keyboard,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText?: (val: string) => void;
  onClear?: () => void;
  onCancel?: () => void;
  value: string;
};

const SearchBar: React.FC<Props> = ({
  placeholder,
  onChangeText,
  value,
  onClear,
  onCancel,
  containerStyle,
}) => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    setSearchPhrase(value);
  }, [value]);

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder ?? "Search"}
          onChangeText={onChangeText}
          value={searchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Pressable
            onPress={() => {
              setSearchPhrase("");
              onClear?.();
            }}
          >
            <Ionicons name="close-circle" size={24} color="black" />
          </Pressable>
        )}
      </View>
      {clicked && (
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
          }}
          onPress={() => {
            Keyboard.dismiss();
            setClicked(false);
            onCancel?.();
          }}
        >
          <Text>Cancel</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "85%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
