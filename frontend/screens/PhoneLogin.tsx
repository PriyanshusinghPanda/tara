import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import Button from '../components/Button';
import Card from '../components/Card';

export default function PhoneLogin() {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  const handleNumberPress = (num: string) => {
    if (phone.length < 10) {
      setPhone(phone + num);
    }
  };

  const handleBackspace = () => {
    setPhone(phone.slice(0, -1));
  };

  const handleSubmit = () => {
    if (phone.length === 10) {
      navigation.navigate('OTPScreen' as never);
    }
  };

  const renderNumber = (num: string) => (
    <TouchableOpacity
      key={num}
      style={styles.numberButton}
      onPress={() => handleNumberPress(num)}
      activeOpacity={0.8}
    >
      <Text style={styles.numberText}>{num}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <LinearGradient
            colors={colors.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}
          >
            <Text style={styles.logoEmoji}>💰</Text>
          </LinearGradient>
          <Text style={styles.welcomeTitle}>Welcome to Paiso!</Text>
          <Text style={styles.welcomeSubtitle}>Apna mobile number daalo</Text>
        </View>

        <Card style={styles.phoneCard}>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <Text style={styles.phoneNumber}>
              {phone || '_ _ _ _ _ _ _ _ _ _'}
            </Text>
          </View>
        </Card>

        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => renderNumber(num.toString()))}
          <View style={styles.numberButton} />
          {renderNumber('0')}
          <TouchableOpacity
            style={styles.numberButton}
            onPress={handleBackspace}
            activeOpacity={0.8}
          >
            <Icon name="delete" size={28} color={colors.text} />
          </TouchableOpacity>
        </View>

        <Button
          title="OTP bhejo"
          onPress={handleSubmit}
          disabled={phone.length !== 10}
          gradient
          icon={<Icon name="arrow-right" size={24} color={colors.surface} />}
        />
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
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  logoEmoji: {
    fontSize: 40,
  },
  welcomeTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  welcomeSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  phoneCard: {
    marginBottom: spacing.xl,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  countryCode: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
  },
  phoneNumber: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
    letterSpacing: 2,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  numberButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  numberText: {
    ...typography.h3,
    color: colors.text,
  },
});
