import { StyleSheet, Dimensions } from 'react-native';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#111',
    },
    header: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    filterContainer: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#222',
      borderRadius: 10,
    },
    filterTitle: {
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    filterGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 10,
    },
    filterLabel: {
      color: '#ccc',
      marginRight: 10,
      width: 70,
    },
    filterButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: '#333',
      borderRadius: 15,
      marginRight: 8,
      marginBottom: 8,
    },
    activeFilter: {
      backgroundColor: '#555',
    },
    filterButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    resetButton: {
      alignSelf: 'flex-end',
      padding: 8,
    },
    resetButtonText: {
      color: '#4CAF50',
      fontSize: 14,
    },
    resultsText: {
      color: '#aaa',
      marginBottom: 15,
      fontSize: 14,
    },
    noResultsText: {
      color: '#aaa',
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
    },
    projectCard: {
      backgroundColor: '#222',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    projectImage: {
      width: '100%',
      height: 180,
      borderRadius: 10,
      marginBottom: 10,
    },
    projectTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    projectDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    projectDetail: {
      color: '#aaa',
      fontSize: 14,
    },
    projectStatus: {
      color: '#4CAF50',
    },
    projectPrice: {
      color: '#FFC107',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
export default styles;