// src/components/ui/Text.tsx
import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { Colors, FontSizes } from '../../constants/theme';

type TextVariants = 'title' | 'subtitle' | 'body' | 'caption' | 'button';

interface TextProps extends RNTextProps {
  variant?: TextVariants;
  color?: string;
  centered?: boolean;
  bold?: boolean;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  centered,
  bold,
  style,
  children,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'body':
        return styles.body;
      case 'caption':
        return styles.caption;
      case 'button':
        return styles.button;
      default:
        return styles.body;
    }
  };

  return (
    <RNText
      style={[
        getVariantStyle(),
        color ? { color } : {},
        centered ? styles.centered : {},
        bold ? styles.bold : {},
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.xxxlarge,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSizes.xxlarge,
    fontWeight: '600',
    color: Colors.text,
  },
  body: {
    fontSize: FontSizes.medium,
    color: Colors.text,
    lineHeight: FontSizes.medium * 1.5,
  },
  caption: {
    fontSize: FontSizes.small,
    color: Colors.textSecondary,
  },
  button: {
    fontSize: FontSizes.medium,
    fontWeight: '600',
    color: Colors.text,
  },
  centered: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});