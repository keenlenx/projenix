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
import styles from '../styles/global.styles';
import cardstyles from '../styles/projectstyles';
import { Colors } from '@/constants/Colors';

import projectData from '../../assets/projects.json';
const projectstyles = styles;

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
          {/* <Text style={styles.heroTitle}>Featured Projects</Text> */}
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
                  <Text style={[styles.heroOverlayTitle,Colors.featureHead]}>{project.title}</Text>
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
                          <Text style={styles.projectTitle}>{item.location}</Text>
                          <Text style={[styles.projectDetail,styles.projectStatus]}>{item.status} • {item.category}</Text>
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

export default HomeScreen;
