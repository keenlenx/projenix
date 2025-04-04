import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  activeFilterChip: {
    backgroundColor: '#3A3A3A',
  },
  filterText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFF',
  },
});