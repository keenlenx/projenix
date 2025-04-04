// HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SectionList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample data (replace with actual data fetching if needed)
import projectData from '../../assets/projects.json';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Handle selecting a project and navigating to its details
  const handleProjectSelect = (id) => {
    navigation.navigate('Details', { id });
  };

  // Filter projects based on selected filters
  const filteredProjects = projectData.filter(project => {
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  // Reset all filters
  const resetFilters = () => {
    setCategoryFilter(null);
    setStatusFilter(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Projects</Text>
      
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filters:</Text>
        
        {/* Category Filter */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Category:</Text>
          <Pressable 
            style={[styles.filterButton, categoryFilter === null && styles.activeFilter]}
            onPress={() => setCategoryFilter(null)}
          >
            <Text style={styles.filterButtonText}>All</Text>
          </Pressable>
          <Pressable 
            style={[styles.filterButton, categoryFilter === 'Luxury' && styles.activeFilter]}
            onPress={() => setCategoryFilter('Luxury')}
          >
            <Text style={styles.filterButtonText}>Luxury</Text>
          </Pressable>
          <Pressable 
            style={[styles.filterButton, categoryFilter === 'Affordable' && styles.activeFilter]}
            onPress={() => setCategoryFilter('Affordable')}
          >
            <Text style={styles.filterButtonText}>Affordable</Text>
          </Pressable>
        </View>
        
        {/* Status Filter */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Status:</Text>
          <Pressable 
            style={[styles.filterButton, statusFilter === null && styles.activeFilter]}
            onPress={() => setStatusFilter(null)}
          >
            <Text style={styles.filterButtonText}>All</Text>
          </Pressable>
          <Pressable 
            style={[styles.filterButton, statusFilter === 'Ongoing' && styles.activeFilter]}
            onPress={() => setStatusFilter('Ongoing')}
          >
            <Text style={styles.filterButtonText}>Ongoing</Text>
          </Pressable>
          <Pressable 
            style={[styles.filterButton, statusFilter === 'Completed' && styles.activeFilter]}
            onPress={() => setStatusFilter('Completed')}
          >
            <Text style={styles.filterButtonText}>Completed</Text>
          </Pressable>
        </View>
        
        {/* Reset Button */}
        {(categoryFilter || statusFilter) && (
          <Pressable style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </Pressable>
        )}
      </View>
      
      {/* Projects Count */}
      <Text style={styles.resultsText}>
        Showing {filteredProjects.length} of {projectData.length} projects
      </Text>
      
      {/* Projects List */}
      <FlatList
        data={filteredProjects}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => handleProjectSelect(item.id)} 
            style={styles.projectCard}
          >
            <Text style={styles.projectTitle}>{item.title}</Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectDetail}>{item.location}</Text>
              <Text style={[styles.projectDetail, styles.projectStatus]}>
                {item.status} • {item.category}
              </Text>
            </View>
            <Text style={styles.projectPrice}>${item.price.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No projects match your filters</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default HomeScreen;