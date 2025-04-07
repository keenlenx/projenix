import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/projectstyles';
// Sample data (replace with actual data fetching if needed)
import projectData from '../assets/projects.json';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleProjectSelect = (id: number) => {
    navigation.navigate('Details', { id });
  };

  const filteredProjects = projectData.filter(project => {
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

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
            <Image
              source={{ uri: item.image }}
              style={styles.projectImage}
              resizeMode="cover"
            />
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
export default HomeScreen;