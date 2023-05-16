import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";


export default function App() {
  const [state, setState] = useState(0);

  return (
    <View style={styles.container}>
      <View >
        <Text>Counter {state}</Text>
      </View>
      <View style={styles.button}>
        <Button
          color={"purple"}
          onPress={() => setState((prev) => prev + 1)}
          title="Increase Count"
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: "20px",
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    fontSize: "2px",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
});
