import React from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import * as SMS from 'expo-sms';

class App extends React.Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    const { status, permissions } = await Permissions.askAsync(Permissions.CONTACTS);
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    this.setState({ contacts: data })
  };

  handleContactPressed = async contact => {
    console.log('you pressed on: ', contact.name, contact.phoneNumbers[0].digits);
    // Check if SMS is available
    const isAvailable  = await SMS.isAvailableAsync();
    if (isAvailable) {
      // We can send a text!
      const result = await SMS.sendSMSAsync(
          [contact.phoneNumbers[0].digits],
          "DING DONG - I'm here!"
      );
    } else {

    }
  };

  render() {
    return (
        <SafeAreaView style={styles.container}>
          <FlatList
            style={{ flex: 1 }}
            data={this.state.contacts}
            renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.handleContactPressed(item)}
                  style={styles.button}
                  >
              <Text key={item.key} style={styles.text}>
                {item.name}
              </Text>
                </TouchableOpacity>
            )}
          />
        </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'black',
    width: '100%'
  },
  text: {
    height: 40,
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
