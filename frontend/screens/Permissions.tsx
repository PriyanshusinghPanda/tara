import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius, shadows } from '../theme/spacing';

const permissions = [
  {
    icon: 'message-square',
    title: 'SMS Access',
    subtitle: 'Transactions auto-track karenge',
    granted: false,
  },
  {
    icon: 'bell',
    title: 'Notifications',
    subtitle: 'Important alerts milenge',
    granted: false,
  },
  {
    icon: 'users',
    title: 'Contacts (Optional)',
    subtitle: 'Dost ko split bill bhejne ke liye',
    granted: false,
  },
];

export default function Permissions() {
  const navigation = useNavigation();
  const [permList, setPermList] = useState(permissions);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < permissions.length) {
      const timer = setTimeout(() => {
        setPermList((prev) =>
          prev.map((p, i) => (i === currentIndex ? { ...p, granted: true } : p))
        );
        setCurrentIndex(currentIndex + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        navigation.navigate('ProfilingIncome' as never);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Thoda access chahiye</Text>
          <Text style={styles.subtitle}>Smart features ke liye auto-granting...</Text>
        </View>

        <View style={styles.permissionsList}>
          {permList.map((perm, index) => (
            <View
              key={index}
              style={[
                styles.permissionCard,
                perm.granted && styles.permissionCardGranted,
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: perm.granted ? colors.success + '20' : colors.primary + '10' },
                ]}
              >
                <Icon
                  name={perm.icon}
                  size={28}
                  color={perm.granted ? colors.success : colors.primary}
                />
              </View>
              <View style={styles.permissionText}>
                <Text style={styles.permissionTitle}>{perm.title}</Text>
                <Text style={styles.permissionSubtitle}>{perm.subtitle}</Text>
              </View>
              {perm.granted && (
                <Icon name="check-circle" size={28} color={colors.success} />
              )}
            </View>
          ))}
        </View>

        {currentIndex >= permissions.length && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Sab set! Aage chalte hain 🎉</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  permissionsList: {
    gap: spacing.md,
  },
  permissionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.md,
  },
  permissionCardGranted: {
    borderWidth: 2,
    borderColor: colors.success,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  permissionText: {
    flex: 1,
  },
  permissionTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  permissionSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  successMessage: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  successText: {
    ...typography.h4,
    color: colors.success,
  },
});
