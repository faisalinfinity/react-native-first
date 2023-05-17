import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const [reminderText, setReminderText] = useState('');

  useEffect(() => {
    if(PushNotification){
      PushNotification.createChannel(
        {
          channelId: 'reminder-channel', // Unique channel ID
          channelName: 'Reminders', // Channel name
          channelDescription: 'Channel for reminders', // Channel description
          soundName: 'default', // Sound to play for notifications
          importance: 4, // Notification importance (default value: 4)
          vibrate: true, // Vibrate on notification
        },
        (created) => console.log(`Channel creation ${created ? 'success' : 'failed'}`)
      );
    }
   
  }, []);

  const handleSaveReminder = async () => {
    if (reminderText.trim() === '') {
      Alert.alert('Error', 'Please enter a reminder text');
      return;
    }

    try {
      const reminders = await AsyncStorage.getItem('reminders');
      let parsedReminders = reminders ? JSON.parse(reminders) : [];
      parsedReminders.push(reminderText);

      await AsyncStorage.setItem('reminders', JSON.stringify(parsedReminders));
      setReminderText('');

      // Schedule local notification
      PushNotification.localNotification({
        channelId: 'reminder-channel', // Channel ID for the notification
        message: `Reminder: ${reminderText}`,
      });

      Alert.alert('Success', 'Reminder saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save the reminder');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter Reminder:</Text>
      <TextInput
        style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, padding: 5 }}
        onChangeText={(text) => setReminderText(text)}
        value={reminderText}
        placeholder="Enter your reminder text"
      />
      <Button title="Save Reminder" onPress={handleSaveReminder} />
    </View>
  );
};

export default App;
