import React from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

class App extends React.Component {
	// Change the App component to a stateful component
	// Import contacts package
	// Access contacts and select some\

	// Import SMS package
	// Check is SMS is available

	// Cmd+D (Ctrl+D) toggles menu

	// Make a components folder for the ...components
	// Create a 'ContactCard' component
	state = {
		contacts: []
	};

	componentDidMount() {
		this.getContacts();
	}

	getContacts = async () => {
		const { data } = await Contacts.getContactsAsync({
			fields: [Contacts.Fields.PhoneNumbers]
		});

		// TODO: Choose top contacts from available contacts.
		// TODO: Save those to the device using AsyncStorage and load them when re-opening.

		console.log('Contacts: ', data);
		this.setState({ contacts: data });
	};

	// Function to handle when contact is pressed
	handleContactPressed = async contact => {
		console.log('you pressed on:', contact.name, contact.phoneNumbers[0].digits);
		// Check if SMS is available
		const isAvailable = await SMS.isAvailableAsync();
		if (isAvailable) {
			// We can send a text!
			const result = await SMS.sendSMSAsync(
				[contact.phoneNumbers[0].digits],
				// TODO: change the message.
				"DING DONG - I'm on the way!!"
			);
		} else {
			// Unlux
		}
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					style={{ flex: 1, width: '80%' }}
					data={this.state.contacts}
					renderItem={({ item }) => (
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
		justifyContent: 'center'
	}
});
