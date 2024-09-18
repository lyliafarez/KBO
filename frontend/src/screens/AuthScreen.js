import React from 'react';
import { SafeAreaView, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AuthScreen = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleValidation = () => {
        // Test for the input
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.outerContainer}>
                <Text style={styles.header}>Inscription/Connexion</Text>
                <View style={styles.container}>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Username:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setUsername}
                            value={username}
                            placeholder="Enter your username"
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Password:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Enter your password"
                            secureTextEntry
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleValidation}>
                        <Text style={styles.buttonText}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    container: {
        width: '80%',
        padding: 20,
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default AuthScreen;
