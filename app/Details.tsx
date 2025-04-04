import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import projectData from '../assets/projects.json';

const ProjectDetails = () => {
  const route = useRoute();
  const { id } = route.params || {}; // ✅ safe fallback

  const project = projectData.find((p) => p.id === id);

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Project not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: project.image }} style={styles.image} />
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.description}>{project.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#111', padding: 20 },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 20 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  description: { color: '#ccc', fontSize: 16, marginTop: 10 },
  error: { color: 'red', fontSize: 18, textAlign: 'center' },
});

export default ProjectDetails;
