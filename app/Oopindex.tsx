// src/screens/RealEstateLanding/index.tsx
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Image,
  RefreshControl,
  Modal,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { debounce } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Components
import { Search } from '@/components/Search/Search';
import { Filters } from '@/components/Filters/Filters';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';

// Data and Styles
import projectData from '@/assets/projects.json';
import { GlobalStyles } from './styles/global.styles';
import { styles } from './styles/frontpage';
import { Colors } from '@/constants/theme';

export default function RealEstateLanding() {
  const navigation = useNavigation();
  const [selectedProject, setSelectedProject] = useState(projectData[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const isMobile = Dimensions.get('window').width <= 768;
  const isWeb = Platform.OS === 'web';

  // Memoized filtered projects
  const { categorizedProjects, featuredProjects } = useMemo(() => {
    const featured = projectData.filter(project => project.featured);
    const categorized = projectData.reduce((acc, project) => {
      const { category, status } = project;
      
      if (!acc[category]) acc[category] = {};
      if (!acc[category][status]) acc[category][status] = [];
      acc[category][status].push(project);
      
      return acc;
    }, {});
    
    return { categorizedProjects: categorized, featuredProjects: featured };
  }, [projectData]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = projectData.filter((project) => {
        const matchesSearch = 
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.location.toLowerCase().includes(query.toLowerCase());
        
        const matchesFilter = 
          activeFilter === 'all' || 
          project.category.toLowerCase() === activeFilter ||
          project.status.toLowerCase() === activeFilter;
        
        return matchesSearch && matchesFilter;
      });
      setFilteredProjects(query ? filtered.slice(0, 4) : []);
    }, 300),
    [activeFilter]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery, activeFilter]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearchQuery('');
    setActiveFilter('all');
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setModalVisible(true);
  };

  const navigateToDetails = () => {
    navigation.navigate('Details', { id: selectedProject.id });
    setModalVisible(false);
  };

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity 
      style={[GlobalStyles.card, styles.projectCard]}
      onPress={() => handleProjectSelect(item)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.projectImage} 
        resizeMode="cover"
      />
      <View style={styles.projectInfo}>
        <Text variant="subtitle" style={styles.projectTitle}>{item.title}</Text>
        <Text variant="caption" style={styles.projectLocation}>{item.location}</Text>
        <View style={[GlobalStyles.rowSpaceBetween, styles.projectMeta]}>
          <Text style={styles.projectPrice}>${item.price.toLocaleString()}</Text>
          <View style={[
            styles.statusBadge,
            item.status === 'Ongoing' ? styles.statusOngoing : styles.statusCompleted
          ]}>
            <Text variant="caption">{item.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (category, status, projects) => (
    <View key={`${category}-${status}`} style={styles.sectionContainer}>
      <Text variant="title" style={styles.sectionTitle}>{`${category} • ${status}`}</Text>
      <FlatList
        horizontal
        data={projects}
        renderItem={renderProjectItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.projectList}
      />
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView
        style={GlobalStyles.container}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={Colors.text}
          />
        }
      >
        <Search 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredProjects={filteredProjects}
          handleProjectSelect={handleProjectSelect}
          isWeb={isWeb}
        />

        <Filters 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Featured Project */}
        {!searchQuery && featuredProjects.length > 0 && (
          <TouchableOpacity 
            style={styles.heroContainer}
            onPress={() => handleProjectSelect(featuredProjects[0])}
          >
            <Image 
              source={{ uri: featuredProjects[0].image }} 
              style={styles.heroImage} 
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <Text variant="caption" style={styles.heroTitle}>FEATURED PROJECT</Text>
              <Text variant="title" style={styles.heroProjectTitle}>
                {featuredProjects[0].title}
              </Text>
              <Text variant="caption" style={styles.heroLocation}>
                {featuredProjects[0].location}
              </Text>
              <Text variant="subtitle" style={styles.heroPrice}>
                ${featuredProjects[0].price.toLocaleString()}
              </Text>
              <Button 
                title="View Details" 
                variant="primary"
                style={styles.heroButton}
              />
            </View>
          </TouchableOpacity>
        )}

        {/* Project Sections */}
        {!searchQuery && Object.keys(categorizedProjects).map((category) =>
          Object.keys(categorizedProjects[category]).map((status) =>
            categorizedProjects[category][status].length > 0 &&
            renderSection(category, status, categorizedProjects[category][status])
          )
        )}

        {/* Search Results */}
        {searchQuery && filteredProjects.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text variant="title" style={styles.resultsTitle}>Search Results</Text>
            <FlatList
              data={filteredProjects}
              renderItem={renderProjectItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.resultsList}
            />
          </View>
        )}

        {/* Empty State */}
        {searchQuery && filteredProjects.length === 0 && (
          <View style={[GlobalStyles.centeredContainer, styles.emptyState]}>
            <Ionicons name="search-off" size={48} color={Colors.textSecondary} />
            <Text variant="subtitle" style={styles.emptyText}>No projects found</Text>
            <Text variant="caption" style={styles.emptySubtext}>
              Try different search terms or filters
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Project Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[GlobalStyles.card, styles.modalContainer]}>
            <Image 
              source={{ uri: selectedProject.image }} 
              style={styles.modalImage} 
              resizeMode="cover"
            />
            <View style={styles.modalContent}>
              <Text variant="title" style={styles.modalTitle}>{selectedProject.title}</Text>
              <Text variant="caption" style={styles.modalLocation}>
                {selectedProject.location}
              </Text>
              
              <View style={[GlobalStyles.rowSpaceBetween, styles.modalMeta]}>
                <View style={GlobalStyles.row}>
                  <Ionicons name="pricetag" size={16} color={Colors.textSecondary} />
                  <Text variant="caption" style={styles.metaText}>
                    ${selectedProject.price.toLocaleString()}
                  </Text>
                </View>
                <View style={GlobalStyles.row}>
                  <Ionicons 
                    name={selectedProject.status === 'Ongoing' ? 'timer' : 'checkmark-circle'} 
                    size={16} 
                    color={Colors.textSecondary} 
                  />
                  <Text variant="caption" style={styles.metaText}>
                    {selectedProject.status}
                  </Text>
                </View>
                <View style={GlobalStyles.row}>
                  <Ionicons 
                    name={selectedProject.category === 'Luxury' ? 'diamond' : 'home'} 
                    size={16} 
                    color={Colors.textSecondary} 
                  />
                  <Text variant="caption" style={styles.metaText}>
                    {selectedProject.category}
                  </Text>
                </View>
              </View>

              <Text variant="body" style={styles.modalDescription}>
                {selectedProject.description}
              </Text>
              
              <View style={[GlobalStyles.row, styles.modalButtons]}>
                <Button 
                  title="Close" 
                  variant="outline"
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                />
                <Button 
                  title="View Details" 
                  variant="primary"
                  style={styles.modalButton}
                  onPress={navigateToDetails}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}