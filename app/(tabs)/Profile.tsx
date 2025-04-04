import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfilePage = () => {
  // Sample project data - replace with your actual data
  const projects = [
    {
      id: '1',
      title: 'Luxury Waterfront Condos',
      location: 'Miami, FL',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      status: 'Completed',
      price: '$2.5M',
      date: 'Jun 2023'
    },
    {
      id: '2',
      title: 'Urban Loft Apartments',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
      status: 'In Progress',
      price: '$1.8M',
      date: 'Expected Dec 2024'
    },
    {
      id: '3',
      title: 'Suburban Family Homes',
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      status: 'Planning',
      price: '$950K',
      date: 'Expected Mar 2025'
    },
  ];

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity style={styles.projectCard}>
      <Image source={{ uri: item.image }} style={styles.projectImage} />
      <View style={styles.projectInfo}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <View style={styles.projectMeta}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.projectLocation}>{item.location}</Text>
        </View>
        <View style={styles.projectDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={[
              styles.detailValue,
              item.status === 'Completed' ? styles.completedStatus : 
              item.status === 'In Progress' ? styles.inProgressStatus : styles.planningStatus
            ]}>
              {item.status}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>{item.price}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{item.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Developer</Text>
        <Text style={styles.profileTitle}>Real Estate Developer</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{projects.length}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>$5.25M</Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Projects</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={projects}
          renderItem={renderProjectItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.projectsList}
        />
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="document-text-outline" size={20} color="#4CAF50" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Added new project "Urban Loft Apartments"</Text>
            <Text style={styles.activityDate}>2 days ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="checkmark-done-outline" size={20} color="#2196F3" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Completed "Luxury Waterfront Condos"</Text>
            <Text style={styles.activityDate}>1 month ago</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  projectsList: {
    paddingBottom: 10,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  projectInfo: {
    padding: 15,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  projectLocation: {
    marginLeft: 5,
    color: '#666',
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  completedStatus: {
    color: '#4CAF50',
  },
  inProgressStatus: {
    color: '#FFC107',
  },
  planningStatus: {
    color: '#2196F3',
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 15,
    marginBottom: 3,
  },
  activityDate: {
    fontSize: 13,
    color: '#999',
  },
});

export default ProfilePage; 