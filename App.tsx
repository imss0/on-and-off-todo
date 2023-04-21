import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";
import { useState } from "react";
import theme from "./colors";

interface Todo {
  text: string;
  work: boolean;
}

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<{ [key: string]: Todo }>({});
  const toggleSwitch = () => setWorking((previousState) => !previousState);
  const onChangeText = (payload: string) => setText(payload);
  const addTodo = () => {
    if (text === "") {
      return;
    }
    const newTodos = { ...todos, [Date.now()]: { text, work: working } };
    setTodos(newTodos);
    setText("");
  };

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
          returnKeyType="done"
          placeholder={
            working ? "Add your task" : "What do you want to do for yourself?"
          }
          onChangeText={onChangeText}
          onSubmitEditing={addTodo}
          value={text}
        ></TextInput>
      </View>
      <ScrollView>
        {Object.keys(todos).map((key) => (
          <View key={key} style={styles.todo}>
            <Text style={styles.todoText}>{todos[key].text}</Text>
          </View>
        ))}
      </ScrollView>
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

  todo: {
    backgroundColor: theme.inactive,
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  todoText: {
    color: "white",
    fontSize: 16,
  },
});
