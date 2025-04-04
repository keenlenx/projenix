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
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Fuse from 'fuse.js';
import { debounce } from 'lodash';

import projectData from '../../assets/projects.json';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const listRef = useRef<ScrollView>(null);

  useEffect(() => {
    const handler = debounce(() => setDebouncedQuery(searchQuery), 300);
    handler();
    return () => handler.cancel();
  }, [searchQuery]);

  const fuse = useMemo(() => {
    return new Fuse(projectData, {
      keys: ['title', 'location'],
      includeScore: true,
      threshold: 0.3,
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollViewRef.current?.scrollTo({
        x: (scrollX.__getValue() + screenWidth) % (screenWidth * 8),
        animated: true,
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, [scrollX]);

  const handleProjectSelect = (id: number) => {
    navigation.navigate('Details', { id });
  };

  const filteredProjects = useMemo(() => {
    const results = debouncedQuery ? fuse.search(debouncedQuery) : [];
    const searchResults = results.length > 0 ? results.map(r => r.item) : debouncedQuery ? [] : projectData;

    return searchResults.filter(project => {
      const matchCategory = !categoryFilter || project.category === categoryFilter;
      const matchStatus = !statusFilter || project.status === statusFilter;
      return matchCategory && matchStatus;
    });
  }, [debouncedQuery, categoryFilter, statusFilter, fuse]);

  const groupedProjects = useMemo(() => {
    const groups: Record<string, Record<string, typeof projectData>> = {};
    filteredProjects.forEach(project => {
      if (!groups[project.category]) groups[project.category] = {};
      if (!groups[project.category][project.status]) groups[project.category][project.status] = [];
      groups[project.category][project.status].push(project);
    });
    return groups;
  }, [filteredProjects]);

  const resetAll = () => {
    setSearchQuery('');
    setCategoryFilter(null);
    setStatusFilter(null);
    setFiltersVisible(false);
    listRef.current?.scrollTo({ y: 0, animated: true });
  };

  const featuredProjects = projectData.slice(0, 8);

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar (Fixed) */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchFilterBar}>
          <TextInput
            placeholder="Search by title or location"
            placeholderTextColor="#ddd"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
              <Ionicons name="close-circle" size={20} color="#ddd" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setFiltersVisible(prev => !prev)} style={styles.filterIcon}>
            <Ionicons name="filter" size={24} color="#ddd" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Slider */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroTitle}>Featured Projects</Text>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
            })}
            ref={scrollViewRef}
          >
            {featuredProjects.map((project) => (
              <TouchableOpacity key={project.id} onPress={() => handleProjectSelect(project.id)} style={styles.heroCard}>
                <Image source={{ uri: project.image }} style={styles.heroImage} />
                <View style={styles.heroOverlay}>
                  <Text style={styles.heroOverlayTitle}>{project.title}</Text>
                  <Text style={styles.heroOverlaySubtitle}>{project.location}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
        </View>

        {/* Filters */}
        {filtersVisible && (
          <View style={styles.filterContainer}>
            <Text style={styles.filterTitle}>Filters:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Category:</Text>
                {['All', 'Luxury', 'Affordable'].map((cat) => {
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
                {['All', 'Ongoing', 'Completed'].map((stat) => {
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
          </View>
        )}

        <Text style={styles.resultsText}>
          Showing {filteredProjects.length} of {projectData.length} projects
        </Text>

        {/* Main List / Empty State */}
        <View>
          {Object.keys(groupedProjects).length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyEmoji}>😕</Text>
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptyDescription}>
                We couldn't find any projects that match your search or filters.
              </Text>
              {searchQuery ? <Text style={styles.emptyBullet}>• Try a different keyword</Text> : null}
              {(categoryFilter || statusFilter) && (
                <Text style={styles.emptyBullet}>• Loosen your filter options</Text>
              )}
              <TouchableOpacity style={styles.resetAllButton} onPress={resetAll}>
                <Text style={styles.resetAllButtonText}>Reset Filters & Search</Text>
              </TouchableOpacity>
            </View>
          ) : (
            Object.entries(groupedProjects).map(([category, statuses]) => (
              <View key={category}>
                {Object.entries(statuses).map(([status, projects]) => (
                  <View key={`${category}-${status}`} style={styles.groupSection}>
                    <Text style={styles.groupTitle}>
                      {category} - {status}
                    </Text>
                    <FlatList
                      horizontal
                      data={projects}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleProjectSelect(item.id)} style={styles.projectCard}>
                          <Image source={{ uri: item.image }} style={styles.projectImage} />
                          <Text style={styles.projectTitle}>{item.title}</Text>
                          <Text style={styles.projectLocation}>{item.location}</Text>
                          <Text style={styles.projectDetail}>{item.status} • {item.category}</Text>
                          <Text style={styles.projectPrice}>${item.price.toLocaleString()}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 100, // to add extra space at the bottom
  },
  heroContainer: {
    width: screenWidth,
    height: 280,
    marginBottom: 20,
    position: 'relative',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  heroCard: {
    width: screenWidth,
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    borderRadius: 10,
  },
  heroOverlayTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heroOverlaySubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  searchWrapper: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 999,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchFilterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  clearIcon: {
    paddingLeft: 10,
  },
  filterIcon: {
    paddingLeft: 10,
  },
  filterContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingTop: 10,
  },
  filterTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  filterLabel: {
    color: '#fff',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#444',
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  activeFilter: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  resultsText: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  groupSection: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  groupTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  projectCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  projectTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  projectLocation: {
    color: '#bbb',
    fontSize: 12,
  },
  projectDetail: {
    color: '#bbb',
    fontSize: 12,
    marginVertical: 5,
  },
  projectPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 30,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    marginHorizontal: 20,
  },
  emptyEmoji: { fontSize: 48, marginBottom: 8 },
  emptyTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  emptyDescription: { color: '#aaa', fontSize: 14, textAlign: 'center', marginTop: 5 },
  emptyBullet: { color: '#888', fontSize: 13, marginTop: 4 },
  resetAllButton: {
    marginTop: 15,
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;
