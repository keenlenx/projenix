import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { styles } from './Filters.styles';

interface FiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ activeFilter, setActiveFilter }) => {
  const filters = ['all', 'luxury', 'affordable', 'ongoing', 'completed'];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterChip,
            activeFilter === filter && styles.activeFilterChip
          ]}
          onPress={() => setActiveFilter(filter)}
        >
          <Text style={[
            styles.filterText,
            activeFilter === filter && styles.activeFilterText
          ]}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};