import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  searchContainerWeb: {
    maxWidth: 500,
    alignSelf: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    paddingVertical: 5,
  },
  suggestionsContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  suggestionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  suggestionSubtext: {
    color: '#999',
    fontSize: 14,
    marginTop: 2,
  },
});