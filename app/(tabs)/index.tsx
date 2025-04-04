import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, RefreshControl, Modal, Dimensions, Platform, FlatList } from 'react-native';
import { debounce } from "lodash";
import { useNavigation } from '@react-navigation/native';

// Sample JSON file data
import projectData from "../../assets/projects.json";

export default function RealEstateLanding() {
  const navigation = useNavigation();
  const [selectedProject, setSelectedProject] = useState(projectData[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const isMobile = Dimensions.get("window").width <= 768;
  const isWeb = Platform.OS === "web";

  // Debounced search input handler
  const handleSearchChange = (query) => {
    setSearchQuery(query || ''); 
    setDebouncedSearchQuery(query || ''); 
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = filterProjects(query || ''); 
      setFilteredProjects(filtered.slice(0, 4)); 
    }, 300),
    []
  );

  const filterProjects = (query) => {
    return projectData.filter((project) => {
      const title = project.title || ''; 
      const description = project.description || ''; 

      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        description.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  useEffect(() => {
    debouncedSearch(debouncedSearchQuery || ''); 
  }, [debouncedSearchQuery]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearchQuery(""); 
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setModalVisible(true); 
  };

  const clearSearch = () => setSearchQuery("");

  const navigateToDetails = () => {
    navigation.navigate('Details', { id: selectedProject.id });
    setModalVisible(false); 
  };

  // Group projects by both category and status
  const categorizedAndStatusGroupedProjects = projectData.reduce((acc, project) => {
    const { category, status } = project;

    if (!acc[category]) acc[category] = {};
    if (!acc[category][status]) acc[category][status] = [];
    acc[category][status].push(project);
    
    return acc;
  }, {});

  return (
    <FlatList
      style={styles.list}
      data={[1]} // Dummy data just to render the list
      keyExtractor={(item) => item.toString()} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={() => (
        <>
          <View style={[styles.searchContainer, isWeb && styles.searchContainerWeb]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search projects..."
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearSearchButton}>
                <Text style={styles.clearSearchText}>clear</Text>
              </TouchableOpacity>
            )}
          </View>

          {searchQuery.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <FlatList
                data={filteredProjects}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.suggestionCard} onPress={() => handleProjectSelect(item)}>
                    <Text style={styles.suggestionText}>{item.title}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          )}

          <View style={[styles.heroSection, isWeb && styles.heroSectionWeb]}>
            <Image source={{ uri: selectedProject.image }} style={[styles.heroImage, isWeb && styles.heroImageWeb]} />
            <Text style={styles.heroTitle}>{selectedProject.title}</Text>
            <TouchableOpacity
              style={[styles.moreDetailsButton, isWeb && styles.moreDetailsButtonWeb]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.moreDetailsText}>More Details</Text>
            </TouchableOpacity>
          </View>

          {Object.keys(categorizedAndStatusGroupedProjects).map((category) => (
            Object.keys(categorizedAndStatusGroupedProjects[category]).map((status) => (
              categorizedAndStatusGroupedProjects[category][status].length > 0 && (
                <View key={`${category}-${status}`}>
                  <Text style={styles.sectionTitle}>{`${category} - ${status}`}</Text>
                  <FlatList
                    horizontal
                    data={categorizedAndStatusGroupedProjects[category][status]}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleProjectSelect(item)}>
                        <Image source={{ uri: item.image }} style={styles.projectImage} />
                        <Text style={styles.projectTitle}>{item.title}</Text>
                      </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                    style={styles.projectScrollView}
                  />
                </View>
              )
            ))
          ))}

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Image source={{ uri: selectedProject.image }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedProject.title}</Text>
                <Text style={styles.modalDescription}>{selectedProject.description}</Text>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCloseText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewDetailsButton} onPress={navigateToDetails}>
                  <Text style={styles.viewDetailsText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#111",
    marginTop: 30
  },
  searchContainer: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    zIndex: 100,
    marginTop: 20,
  },
  searchContainerWeb: {
    width: "40%",
    top: "15%",
  },
  searchInput: {
    flex: 1,
    color: "black",
    fontSize: 16,
  },
  clearSearchButton: {
    margin: 10,
    padding: 5,
  },
  clearSearchText: {
    color: "orange",
    fontWeight: "normal",
  },
  suggestionsContainer: {
    position: "absolute",
    top: 80,
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    zIndex: 999,
    maxHeight: 200,
  },
  suggestionCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
  heroSection: {
    padding: 20,
    alignItems: "center",
  },
  heroSectionWeb: {
    padding: 40,
  },
  heroImage: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  heroImageWeb: {
    height: 500,
  },
  heroTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  moreDetailsButton: {
    backgroundColor: "green",
    padding: 10,
    marginTop: 10,
  },
  moreDetailsButtonWeb: {
    padding: 15,
  },
  moreDetailsText: {
    color: "white",
    fontSize: 16,
  },
  sectionTitle: {
    color: "white",
    fontSize: 22,
    marginLeft: 20,
    marginBottom: 10,
  },
  projectScrollView: {
    paddingLeft: 20,
  },
  projectImage: {
    width: 120,
    height: 180,
    marginRight: 10,
    borderRadius: 10,
  },
  projectTitle: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  modalTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalDescription: {
    color: "black",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  modalCloseButton: {
    backgroundColor: "red",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  modalCloseText: {
    color: "white",
    fontSize: 16,
  },
  viewDetailsButton: {
    backgroundColor: "green",
    padding: 10,
    marginTop: 10,
  },
  viewDetailsText: {
    color: "white",
    fontSize: 16,
  },
});
