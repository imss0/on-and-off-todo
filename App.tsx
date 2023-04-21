import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { useState } from "react";
import theme from "./colors";

export default function App() {
  const [working, setWorking] = useState(true);
  const toggleSwitch = () => setWorking((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text
          style={{
            ...styles.btnText,
            color: !working ? theme.blue : theme.inactive,
          }}
        >
          OFF
        </Text>
        <Switch
          trackColor={{ false: "#f4f3f4", true: "#81b0ff" }}
          thumbColor={working ? "#f5dd4b" : "#81b0ff"}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          ios_backgroundColor="#f5dd4b"
          onValueChange={toggleSwitch}
          value={working}
        />
        <Text
          style={{
            ...styles.btnText,
            color: working ? theme.yellow : theme.inactive,
          }}
        >
          ON
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={
            working ? "Add your task" : "What do you want to do for yourself?"
          }
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },

  btnText: {
    color: theme.inactive,
    fontSize: 36,
    fontWeight: "700",
  },

  input: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    fontSize: 14,
  },
});
