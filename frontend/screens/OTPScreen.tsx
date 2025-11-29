import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const OTP_CODE = ['3', '9', '4', '8', '2', '1'];

export default function OTPScreen() {
  const navigation = useNavigation();
  const [verified, setVerified] = useState(false);
  const scaleAnim = new Animated.Value(0.8);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerified(true);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 10,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        navigation.navigate('Permissions' as never);
      }, 1500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>OTP Verify karo</Text>
          <Text style={styles.subtitle}>+91 98765 43210 par bheja gaya</Text>
        </View>

        <View style={styles.otpContainer}>
          {OTP_CODE.map((digit, index) => (
            <View
              key={index}
              style={[
                styles.otpBox,
                verified && styles.otpBoxVerified,
              ]}
            >
              <Text
                style={[
                  styles.otpDigit,
                  verified && styles.otpDigitVerified,
                ]}
              >
                {digit}
              </Text>
            </View>
          ))}
        </View>

        {verified && (
          <Animated.View
            style={[
              styles.successContainer,
              {
                transform: [{ scale: scaleAnim }],
                opacity: fadeAnim,
              },
            ]}
          >
            <Icon name="check-circle" size={64} color={colors.success} />
            <Text style={styles.successText}>Verified! ✓</Text>
          </Animated.View>
        )}

        {!verified && (
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive code?</Text>
            <Text style={styles.resendLink}>Resend OTP</Text>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  otpBox: {
    width: 56,
    height: 64,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  otpBoxVerified: {
    backgroundColor: colors.success + '20',
  },
  otpDigit: {
    ...typography.h3,
    color: colors.text,
  },
  otpDigitVerified: {
    color: colors.success,
  },
  successContainer: {
    alignItems: 'center',
  },
  successText: {
    ...typography.h3,
    color: colors.success,
    marginTop: spacing.md,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  resendLink: {
    ...typography.body,
    color: colors.primary,
  },
});
