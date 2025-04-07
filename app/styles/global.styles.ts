// src/styles/global.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  /* In your global CSS file */
 
 
  safeArea: {
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
    // Hero
    heroContainer: {
      width: screenWidth,
      height: 280,
      marginBottom: 20,
      position: 'relative',
    },
    heroTitle: {
          fontSize: FontSizes.xxxlarge,
          fontWeight: 'bold',
          color: Colors.text,
          marginBottom: Spacing.medium,
        },
    
    heroCard: {
      width: screenWidth,
      height: 280,
      position: 'relative',
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
  screenContainer: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Text
  title: {
    fontSize: FontSizes.xxxlarge,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.medium,
  },
  subtitle: {
    fontSize: FontSizes.xxlarge,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.small,
  },
  bodyText: {
    fontSize: FontSizes.medium,
    color: Colors.text,
    lineHeight: FontSizes.medium * 1.5,
  },
  caption: {
    fontSize: FontSizes.small,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: FontSizes.small,
    color: Colors.error,
    marginTop: Spacing.tiny,
  },

  // Buttons
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  buttonText: {
    color: Colors.text,
    fontSize: FontSizes.medium,
    fontWeight: '600',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutlineText: {
    color: Colors.primary,
    fontSize: FontSizes.medium,
    fontWeight: '600',
  },

  // Inputs
  input: {
    backgroundColor: Colors.surface,
    color: Colors.text,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    fontSize: FontSizes.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputLabel: {
    fontSize: FontSizes.medium,
    color: Colors.text,
    marginBottom: Spacing.small,
  },

  // Cards
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.medium,
    padding: Spacing.medium,
    ...Shadows.small,
  },
  cardTitle: {
    fontSize: FontSizes.large,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.small,
  },

  // Utility
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.medium,
  },
  shadow: {
    ...Shadows.medium,
  },
  fullWidth: {
    width: '100%',
  },
  textCenter: {
    textAlign: 'center',
  },
  mbSmall: {
    marginBottom: Spacing.small,
  },
  mbMedium: {
    marginBottom: Spacing.medium,
  },
  mbLarge: {
    marginBottom: Spacing.large,
  },
  mtSmall: {
    marginTop: Spacing.small,
  },
  mtMedium: {
    marginTop: Spacing.medium,
  },
  mtLarge: {
    marginTop: Spacing.large,
  },
  projectCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  projectTitle: {
    color: '#fff',
    fontSize: 18,
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
    fontSize: 14,
  },
  projectStatus: {
    color: '#4CAF50',
  },
  projectPrice: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  // Filters
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
    marginBottom: 10,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filterLabel: {
    color: '#fff',
    marginRight: 10,
    fontSize: 16,
    width: 70,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#444',
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilter: {
    backgroundColor: '#007bff',
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

  // Results
  resultsText: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  noResultsText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },


  // Search
  searchWrapper: {
    position: 'sticky',
    alignItems: 'center',
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

  // Group Section
  groupSection: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  groupTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Empty State
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

  // Scroll content padding
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },
});

export default styles;
