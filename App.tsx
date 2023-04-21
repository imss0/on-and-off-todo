import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";
import theme from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@todos";

interface Todo {
  text: string;
  working: boolean;
}

export default function App() {
  useEffect(() => {
    loadTodos();
  }, []);
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<{ [key: string]: Todo }>({});
  const toggleSwitch = () => setWorking((previousState) => !previousState);
  const onChangeText = (payload: string) => setText(payload);
  const saveTodos = async (toSave: { [key: string]: Todo }) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      alert(`Oops! There is a problem saving data`);
      console.error(e);
    }
  };
  const loadTodos = async () => {
    try {
      const str = await AsyncStorage.getItem(STORAGE_KEY);
      setTodos(JSON.parse(str as string));
    } catch (e) {
      alert(`Oops! There is a problem getting data`);
      console.error(e);
    }
  };
  const addTodo = async () => {
    if (text === "") {
      return;
    }
    const newTodos = { ...todos, [Date.now()]: { text, working } };
    setTodos(newTodos);
    await saveTodos(newTodos);
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
        {Object.keys(todos).map((key) =>
          todos[key].working === working ? (
            <View key={key} style={styles.todo}>
              <Text style={styles.todoText}>{todos[key].text}</Text>
            </View>
          ) : null
        )}
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
