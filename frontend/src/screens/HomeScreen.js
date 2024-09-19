import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { authState, logout } = useContext(AuthContext);

  useEffect(() => {
    console.log('Auth state changed:', authState);
  }, [authState]); // This ensures HomeScreen re-renders when authState changes

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>

      {authState.user ? (
        <>
          <Text>Welcome, {authState.user.username}!</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
          <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
