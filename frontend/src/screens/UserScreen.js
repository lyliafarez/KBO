import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const UserScreen = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          fetchFavorites(parsedUser._id); // Utilisation de _id ici
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchFavorites = async (idUser) => {
    try {
      const response = await axios.get('http://localhost:5000/api/favorites');
      const userFavorites = response.data.filter(favorite => favorite.idUser === idUser);

      const updatedFavorites = await Promise.all(userFavorites.map(async (favorite) => {
        try {
          const entrepriseResponse = await axios.get(`http://localhost:5000/api/enterprises/id/${favorite.idEntreprise}`);
          return {
            ...favorite,
            enterpriseNumber: entrepriseResponse.data.EnterpriseNumber,
          };
        } catch (error) {
          console.error(`Erreur lors de la récupération du numéro d'entreprise pour ${favorite.idEntreprise} :`, error);
          return favorite;
        }
      }));

      setFavorites(updatedFavorites); // Mise à jour des favoris
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris :', error);
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${favoriteId}`);
      // Mise à jour des favoris après suppression
      setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite._id !== favoriteId));
    } catch (error) {
      console.error('Erreur lors de la suppression du favori :', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Utilisateur non connecté.</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Se connecter</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://www.example.com/default-profile-pic.jpg' }} 
          style={styles.profilePic}
        />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Text style={styles.favoritesTitle}>Mes Favoris</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item._id} 
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Text style={styles.enterpriseNumberText}>{item.enterpriseNumber ? item.enterpriseNumber : item.idEntreprise}</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.voirButton}
                onPress={() => navigation.navigate('EnterpriseDetails', {
                  enterpriseNumber: item.enterpriseNumber 
                })}
              >
                <Text style={styles.voirButtonText}>View Details</Text>
              </Pressable>
              <Pressable
                style={styles.favoriteButton}
                onPress={() => removeFavorite(item._id)}
              >
                <Text style={styles.favoriteButtonText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  loginLink: {
    fontSize: 18,
    color: '#007BFF', 
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  favoritesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textAlign: 'center',
  },
  favoriteItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voirButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  voirButtonText: {
    color: '#fff',
  },
  favoriteButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
  },
  favoriteButtonText: {
    color: '#fff',
  },
  enterpriseNumberText: {
    fontSize: 16,
    color: '#333',
  },
});

export default UserScreen;
