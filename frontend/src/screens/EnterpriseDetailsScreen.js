import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';

const EnterpriseDetailsScreen = ({ route }) => {
  const { enterpriseNumber } = route.params;
  const [enterpriseDetails, setEnterpriseDetails] = useState(null);
  const [enterpriseData, setEnterpriseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsResponse, dataResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/enterprises/${enterpriseNumber}`),
          axios.get(`http://localhost:5000/api/scrapping/${enterpriseNumber}`)
        ]);
        setEnterpriseDetails(detailsResponse.data);
        setEnterpriseData(dataResponse.data.EntrepriseDataEntrepriseweb);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching enterprise data:', err);
        setError('Failed to load enterprise data');
        setLoading(false);
      }
    };

    fetchData();
  }, [enterpriseNumber]);

  const hasFinancialData = () => {
    if (!enterpriseData || !enterpriseData.financialYears || !enterpriseData.financialData) return false;
    
    const fields = ['Chiffre d\'affaires', 'Bénéfices/pertes', 'Capitaux propres', 'Marge brute', 'Personnel'];
    return enterpriseData.financialYears.some((year, index) => 
      fields.some(field => enterpriseData.financialData[field][index * 2])
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{enterpriseDetails.denominations[0]?.Denomination || 'Enterprise Details'}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Générales</Text>
          <DetailRow label="Numéro d'entreprise" value={enterpriseDetails.EnterpriseNumber} />
          <DetailRow label="Status" value={enterpriseDetails.Status} />
          <DetailRow label="Situation Juridique" value={enterpriseDetails.juridicalSituationDescription} />
          <DetailRow label="Type d'entreprise" value={enterpriseDetails.TypeOfEnterpriseDescription} />
          <DetailRow label="Forme Juridique" value={enterpriseDetails.juridicalFormDescription} />
          <DetailRow label="Date de lancement" value={new Date(enterpriseDetails.startDate).toLocaleDateString()} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Denominations</Text>
          {enterpriseDetails.denominations.map((denomination, index) => (
            <View key={index} style={styles.subSection}>
              <DetailRow label="Denomination" value={denomination.Denomination} />
              <DetailRow label="Type" value={denomination.TypeOfDenomination} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresses</Text>
          {enterpriseDetails.Addresses.map((address, index) => (
            <View key={index} style={styles.subSection}>
              <DetailRow label="Rue" value={`${address.StreetNL} ${address.HouseNumber}`} />
              <DetailRow label="Municipalité" value={`${address.Zipcode} ${address.MunicipalityNL}`} />
              <DetailRow label="Type" value={address.TypeOfAddress} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activités</Text>
          {enterpriseDetails.activities.map((activity, index) => (
            <View key={index} style={styles.subSection}>
              <DetailRow label="Activity Group" value={activity.ActivityGroup} />
              <DetailRow label="Description" value={activity.ActivityGroupDescription} />
              <DetailRow label="NACE Code" value={activity.NaceCode} />
              <DetailRow label="Classification" value={activity.Classification} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Données financières</Text>
          {hasFinancialData() ? (
            <ScrollView horizontal>
              <View>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}>Année</Text>
                  <Text style={styles.tableHeaderCell}>Chiffre d'affaires</Text>
                  <Text style={styles.tableHeaderCell}>Bénéfices/pertes</Text>
                  <Text style={styles.tableHeaderCell}>Capitaux propres</Text>
                  <Text style={styles.tableHeaderCell}>Marge brute</Text>
                  <Text style={styles.tableHeaderCell}>Personnel</Text>
                </View>
                {enterpriseData.financialYears.map((year, index) => (
                  <View key={year} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{year}</Text>
                    <Text style={styles.tableCell}>{enterpriseData.financialData['Chiffre d\'affaires'][index * 2] || '-'}</Text>
                    <Text style={styles.tableCell}>{enterpriseData.financialData['Bénéfices/pertes'][index * 2] || '-'}</Text>
                    <Text style={styles.tableCell}>{enterpriseData.financialData['Capitaux propres'][index * 2] || '-'}</Text>
                    <Text style={styles.tableCell}>{enterpriseData.financialData['Marge brute'][index * 2] || '-'}</Text>
                    <Text style={styles.tableCell}>{enterpriseData.financialData['Personnel'][index * 2] || '-'}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text style={styles.noDataText}>No data to show</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subSection: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default EnterpriseDetailsScreen;