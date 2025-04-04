import React from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './Search.styles';

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProjects: any[];
  handleProjectSelect: (project: any) => void;
  isWeb?: boolean;
}

export const Search: React.FC<SearchProps> = ({
  searchQuery,
  setSearchQuery,
  filteredProjects,
  handleProjectSelect,
  isWeb = false,
}) => {
  return (
    <>
      <View style={[styles.searchContainer, isWeb && styles.searchContainerWeb]}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search projects..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {searchQuery.length > 0 && filteredProjects.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {filteredProjects.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.suggestionItem}
              onPress={() => handleProjectSelect(item)}
            >
              <Text style={styles.suggestionText}>{item.title}</Text>
              <Text style={styles.suggestionSubtext}>{item.location}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};