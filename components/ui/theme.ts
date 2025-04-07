import { StyleSheet, Dimensions } from 'react-native';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

export const themeStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.medium,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
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
});
export default themeStyles;