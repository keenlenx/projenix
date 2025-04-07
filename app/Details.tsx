import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import projectData from '../assets/projects.json';

const { width } = Dimensions.get('window');

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleThumbnailPress = (index) => {
    setCurrentIndex(index);
    sliderRef.current.scrollToIndex({ index, animated: true });
  };

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };

  return (
    <View style={styles.sliderContainer}>
      {/* Main Image Slider */}
      <FlatList
        ref={sliderRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.mainImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Pagination Indicators */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot
            ]}
          />
        ))}
      </View>

      {/* Thumbnail Navigation */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailContainer}
      >
        {images.map((image, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => handleThumbnailPress(index)}
            style={[
              styles.thumbnailWrapper,
              index === currentIndex && styles.activeThumbnail
            ]}
          >
            <Image source={{ uri: image }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const ProjectDetails = () => {
  const route = useRoute();
  const { id } = route.params || {};

  const project = projectData.find((p) => p.id === id);

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Project not found.</Text>
      </View>
    );
  }

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Combine main image with additional views
  const allImages = [project.image, ...(project.views || [])];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Slider */}
      {allImages.length > 0 && (
        <ImageSlider images={allImages} />
      )}

      {/* Basic Info */}
      <View style={styles.header}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.price}>{formatPrice(project.price)}</Text>
      </View>

      <View style={styles.locationContainer}>
        <Ionicons name="location" size={16} color="#777" />
        <Text style={styles.location}>{project.location}</Text>
      </View>

      {/* Status and Category */}
      <View style={styles.tagsContainer}>
        <View style={[styles.tag, project.status === 'Ongoing' ? styles.ongoingTag : styles.completedTag]}>
          <Text style={styles.tagText}>{project.status}</Text>
        </View>
        <View style={[styles.tag, styles.categoryTag]}>
          <Text style={styles.tagText}>{project.category}</Text>
        </View>
      </View>

      {/* Owner ID */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Owner ID:</Text>
        <Text style={styles.detailValue}>{project.ownerId}</Text>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{project.description}</Text>
      </View>

      {/* Additional Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Details</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Ionicons name="home" size={20} color="#777" />
            <Text style={styles.detailText}>Residential</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="square" size={20} color="#777" />
            <Text style={styles.detailText}>Varies by unit</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="bed" size={20} color="#777" />
            <Text style={styles.detailText}>2-5 Bedrooms</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water" size={20} color="#777" />
            <Text style={styles.detailText}>Pool Available</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#111',
    padding: 20,
    paddingBottom: 40,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  mainImage: {
    width: width - 40,
    height: 300,
    borderRadius: 10,
  },
  thumbnailContainer: {
    paddingVertical: 10,
  },
  thumbnailWrapper: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeThumbnail: {
    borderColor: '#FFD700',
  },
  thumbnail: {
    width: 60,
    height: 40,
    borderRadius: 4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFD700',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  location: {
    color: '#777',
    fontSize: 16,
    marginLeft: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  tagText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  ongoingTag: {
    backgroundColor: '#F9B023',
  },
  completedTag: {
    backgroundColor: '#27AE60',
  },
  categoryTag: {
    backgroundColor: '#2A4BA0',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailLabel: {
    color: '#777',
    fontSize: 16,
    marginRight: 10,
    width: 80,
  },
  detailValue: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ProjectDetails;