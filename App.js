import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList,Button } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [todo, setTodo] = React.useState([]);
  const [value, setValue] = React.useState('');

  const toggleStatus = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: !item.status,
          };
        }
        return item;
      })
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cont2}>
      <Text style={{ color: 'blue', fontSize: 20 }}>
        {item.text}{' '}
        <TouchableOpacity
          style={[
            styles.toggleButton,
            item.status ? styles.toggleButtonActive : styles.toggleButtonInactive,
          ]}
          onPress={() => toggleStatus(item.id)}
        >
          <View style={item.status ? styles.toggleButtonInnerActive : styles.toggleButtonInnerInactive} />
        </TouchableOpacity>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Todo App</Text>
      <TextInput
        onChangeText={(text) => setValue(text)}
        style={styles.input}
        placeholder="Type here to add a task"
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => setTodo([...todo, { id: Date.now(), text: value, status: false }])}
          title="Submit"
        />
      </View>
      <FlatList
        data={todo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    marginVertical: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  buttonContainer: {
    width: '50%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cont2: {
    margin: 24,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'yellow',
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    textAlign: 'center',
    padding: 10,
  },
  toggleButton: {
    width: 40,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 8,
    position: 'relative',
  },
  toggleButtonActive: {
    backgroundColor: 'green',
  },
  toggleButtonInactive: {
    borderWidth: 2,
    borderColor: 'gray',
  },
  toggleButtonInnerInactive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'white',
    marginLeft: 2,
  },
  toggleButtonInnerActive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'white',
    marginLeft: 2,
    position: 'absolute',
    right: 2,
  },
});
