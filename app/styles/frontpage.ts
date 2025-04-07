import { StyleSheet } from 'react-native';
  // src/screens/RealEstateLanding/RealEstateLanding.styles.ts
 import { Colors } from '@/constants/theme';
import HomeScreen from '../Projects';


export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    paddingTop: 20,
  },
  // Image handling styles
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  // Ensure your image dimensions are properly set
  projectImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  featuredContainer: {
    height: 350,
    marginBottom: 20,
  },
  featuredSlide: {
//  width: Dimensions.get('window').width || '80%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredImageContainer: {
    width: '90%',
    height: '90%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  featuredTitle: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 5,
  },
  featuredProjectTitle: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featuredButton: {
    alignSelf: 'flex-start',
  },

  // Pagination Styles
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textSecondary,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 12,
    backgroundColor: Colors.primary,
  },

  // ... rest of your styles ...
});
export default styles;