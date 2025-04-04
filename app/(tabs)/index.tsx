import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import projectData from '../../assets/projects.json';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // For featured projects slider
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  
  // Auto-scroll the slider every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollViewRef.current?.scrollTo({
        x: (scrollX.__getValue() + screenWidth) % (screenWidth * 8),
        animated: true,
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [scrollX]);

  const handleProjectSelect = (id: number) => {
    navigation.navigate('Details', { id });
  };

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return projectData.filter(project => {
      const matchesCategory = !categoryFilter || project.category === categoryFilter;
      const matchesStatus = !statusFilter || project.status === statusFilter;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [categoryFilter, statusFilter, searchQuery]);

  // Group by category > status
  const groupedProjects = useMemo(() => {
    const groups: Record<string, Record<string, typeof projectData>> = {};
    filteredProjects.forEach(project => {
      if (!groups[project.category]) groups[project.category] = {};
      if (!groups[project.category][project.status]) groups[project.category][project.status] = [];
      groups[project.category][project.status].push(project);
    });
    return groups;
  }, [filteredProjects]);

  const resetFilters = () => {
    setCategoryFilter(null);
    setStatusFilter(null);
  };

  // Featured projects (first 8 items)
  const featuredProjects = projectData.slice(0, 8);

  return (
    <View style={styles.container}>
      {/* Hero / Featured Projects Slider */}
      <View style={styles.heroContainer}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          ref={scrollViewRef}
        >
          {featuredProjects.map((project, index) => (
            <TouchableOpacity
              key={project.id}
              onPress={() => handleProjectSelect(project.id)}
              style={styles.heroCard}
            >
              <Image source={{ uri: project.image }} style={styles.heroImage} />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroTitle}>{project.title}</Text>
                <Text style={styles.heroSubtitle}>{project.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>

      {/* Search bar floating on top */}
      <View style={styles.searchFilterBar}>
        <TextInput
          placeholder="Search by title or location"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
            <Ionicons name="close-circle" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setFiltersVisible(prev => !prev)} style={styles.filterIcon}>
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filters Panel */}
      {filtersVisible && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Filters:</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Category:</Text>
              {['All', 'Luxury', 'Affordable'].map(cat => {
                const value = cat === 'All' ? null : cat;
                return (
                  <Pressable
                    key={cat}
                    style={[styles.filterButton, categoryFilter === value && styles.activeFilter]}
                    onPress={() => setCategoryFilter(value)}
                  >
                    <Text style={styles.filterButtonText}>{cat}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Status:</Text>
              {['All', 'Ongoing', 'Completed'].map(stat => {
                const value = stat === 'All' ? null : stat;
                return (
                  <Pressable
                    key={stat}
                    style={[styles.filterButton, statusFilter === value && styles.activeFilter]}
                    onPress={() => setStatusFilter(value)}
                  >
                    <Text style={styles.filterButtonText}>{stat}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          {(categoryFilter || statusFilter) && (
            <Pressable style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Results Count */}
      <Text style={styles.resultsText}>
        Showing {filteredProjects.length} of {projectData.length} projects
      </Text>

      {/* Grouped List */}
      <ScrollView>
        {Object.entries(groupedProjects).map(([category, statuses]) => (
          <View key={category}>
            {Object.entries(statuses).map(([status, projects]) => (
              <View key={`${category}-${status}`} style={styles.groupSection}>
                <Text style={styles.groupTitle}>{category} - {status}</Text>
                <FlatList
                  horizontal
                  data={projects}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleProjectSelect(item.id)}
                      style={styles.projectCard}
                    >
                      <Image source={{ uri: item.image }} style={styles.projectImage} />
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
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  heroContainer: {
    width: screenWidth,
    height: 250,
    marginBottom: 20,
    position: 'relative',
  },
  heroCard: {
    width: screenWidth,
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 10,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    color: '#ccc',
    fontSize: 14,
  },
  searchFilterBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
  },
  clearIcon: {
    padding: 8,
  },
  filterIcon: {
    padding: 8,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    color: '#ccc',
    marginRight: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#333',
    borderRadius: 15,
    marginRight: 8,
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
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  groupSection: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  groupTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  projectCard: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
    width: 150,  // Smaller card width
  },
  projectImage: {
    width: '100%',
    height: 100, // Smaller image size
    borderRadius: 10,
    marginBottom: 10,
  },
  projectTitle: {
    color: '#fff',
    fontSize: 14,
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
    fontSize: 12,
  },
  projectStatus: {
    color: '#4CAF50',
  },
  projectPrice: {
    color: '#FFC107',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
