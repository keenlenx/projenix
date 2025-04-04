// src/components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { Text } from './Text';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  fullWidth = false,
  style,
  ...props
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      default:
        return styles.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        getButtonStyle(),
        fullWidth ? styles.fullWidth : {},
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <Text variant="button" style={getTextStyle(variant)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getTextStyle = (variant: string) => {
  switch (variant) {
    case 'outline':
      return { color: Colors.primary };
    default:
      return { color: Colors.text };
  }
};

const styles = StyleSheet.create({
  base: {
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  fullWidth: {
    width: '100%',
  },
});