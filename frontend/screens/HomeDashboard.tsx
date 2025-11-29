import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import BottomNav from '../components/BottomNav';
import Card from '../components/Card';

export default function HomeDashboard() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with balance */}
        <LinearGradient
          colors={colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Namaste,</Text>
              <Text style={styles.name}>Ravi bhai! 👋</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="bell" size={24} color={colors.surface} />
            </TouchableOpacity>
          </View>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Aaj ka balance</Text>
            <Text style={styles.balanceAmount}>₹18,400</Text>
            <View style={styles.balanceStats}>
              <View style={styles.stat}>
                <Icon name="trending-up" size={20} color={colors.success} />
                <Text style={styles.statText}>+₹3,200</Text>
              </View>
              <View style={styles.stat}>
                <Icon name="trending-down" size={20} color="#FF5449" />
                <Text style={styles.statText}>-₹1,850</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Weekly Challenge */}
          <Card
            gradient
            gradientColors={colors.gradients.warning}
            style={styles.challengeCard}
            onPress={() => navigation.navigate('WeeklyChallenge' as never)}
          >
            <View style={styles.challengeContent}>
              <View style={styles.challengeIcon}>
                <Text style={styles.challengeEmoji}>✨</Text>
              </View>
              <View style={styles.challengeText}>
                <Text style={styles.challengeTitle}>Weekly Challenge</Text>
                <Text style={styles.challengeSubtitle}>Save ₹50 this week!</Text>
              </View>
            </View>
            <View style={styles.challengeButton}>
              <Text style={styles.challengeButtonText}>Start Challenge</Text>
            </View>
          </Card>

          {/* Quick Stats */}
          <View style={styles.statsGrid}>
            <Card
              style={styles.statCard}
              onPress={() => navigation.navigate('EmergencyCushion' as never)}
            >
              <View style={[styles.statIcon, { backgroundColor: colors.success + '10' }]}>
                <Icon name="shield" size={24} color={colors.success} />
              </View>
              <Text style={styles.statTitle}>Emergency Fund</Text>
              <Text style={styles.statValue}>₹1,250 / ₹5,000</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: '25%', backgroundColor: colors.success }]} />
              </View>
            </Card>

            <Card
              style={styles.statCard}
              onPress={() => navigation.navigate('GoalDetail' as never)}
            >
              <View style={[styles.statIcon, { backgroundColor: colors.primary + '10' }]}>
                <Icon name="target" size={24} color={colors.primary} />
              </View>
              <Text style={styles.statTitle}>Bike Goal</Text>
              <Text style={styles.statValue}>₹32,000 / ₹1.2L</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: '27%', backgroundColor: colors.primary }]} />
              </View>
            </Card>
          </View>

          {/* Spending Overview */}
          <Card
            style={styles.spendingCard}
            onPress={() => navigation.navigate('SpendingBreakdown' as never)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Is mahine ka spending</Text>
              <Icon name="chevron-right" size={24} color={colors.primary} />
            </View>
            <View style={styles.spendingGrid}>
              {[
                { emoji: '🍽️', label: 'Food', amount: '4,200', color: colors.primary },
                { emoji: '⛽', label: 'Fuel', amount: '2,800', color: colors.warning },
                { emoji: '🎬', label: 'Fun', amount: '1,500', color: colors.purple },
              ].map((item, index) => (
                <View key={index} style={styles.spendingItem}>
                  <View style={[styles.spendingIcon, { backgroundColor: item.color + '10' }]}>
                    <Text style={styles.spendingEmoji}>{item.emoji}</Text>
                  </View>
                  <Text style={styles.spendingLabel}>{item.label}</Text>
                  <Text style={styles.spendingAmount}>₹{item.amount}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Today's Lesson */}
          <Card
            gradient
            gradientColors={colors.gradients.purple}
            style={styles.lessonCard}
            onPress={() => navigation.navigate('MiniLesson' as never)}
          >
            <View style={styles.lessonContent}>
              <View style={styles.lessonIcon}>
                <Text style={styles.lessonEmoji}>📚</Text>
              </View>
              <View style={styles.lessonText}>
                <Text style={styles.lessonTitle}>Aaj ka lesson</Text>
                <Text style={styles.lessonSubtitle}>Credit Score kya hota hai?</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.surface} />
            </View>
          </Card>

          {/* Tip Card */}
          <View style={styles.tipCard}>
            <Text style={styles.tipEmoji}>💡</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Aapke liye tip!</Text>
              <Text style={styles.tipText}>
                Ravi bhai, agar aap roz ₹20 save karo toh mahine ke end mein ₹600 extra ho jayega! Small savings = Big dreams 🚀
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Coach Button */}
      <TouchableOpacity
        style={styles.coachButton}
        onPress={() => navigation.navigate('AICoach' as never)}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.coachButtonGradient}
        >
          <Icon name="message-circle" size={28} color={colors.surface} />
        </LinearGradient>
      </TouchableOpacity>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
    borderBottomLeftRadius: borderRadius.xxl,
    borderBottomRightRadius: borderRadius.xxl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  greeting: {
    ...typography.body,
    color: colors.surface,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.h2,
    color: colors.surface,
  },
  notificationButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  balanceLabel: {
    ...typography.bodySmall,
    color: colors.surface,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    ...typography.h1,
    color: colors.surface,
    marginBottom: spacing.md,
  },
  balanceStats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statText: {
    ...typography.body,
    color: colors.surface,
  },
  content: {
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  challengeCard: {
    marginBottom: spacing.lg,
  },
  challengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  challengeIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  challengeEmoji: {
    fontSize: 24,
  },
  challengeText: {
    flex: 1,
  },
  challengeTitle: {
    ...typography.h4,
    color: colors.surface,
    marginBottom: spacing.xs,
  },
  challengeSubtitle: {
    ...typography.body,
    color: colors.surface,
    opacity: 0.9,
  },
  challengeButton: {
    height: 50,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: spacing.lg,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  spendingCard: {
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h4,
    color: colors.text,
  },
  spendingGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  spendingItem: {
    flex: 1,
    alignItems: 'center',
  },
  spendingIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  spendingEmoji: {
    fontSize: 20,
  },
  spendingLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  spendingAmount: {
    ...typography.bodySmall,
    color: colors.text,
  },
  lessonCard: {
    marginBottom: spacing.lg,
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  lessonEmoji: {
    fontSize: 24,
  },
  lessonText: {
    flex: 1,
  },
  lessonTitle: {
    ...typography.h4,
    color: colors.surface,
    marginBottom: spacing.xs,
  },
  lessonSubtitle: {
    ...typography.body,
    color: colors.surface,
    opacity: 0.9,
  },
  tipCard: {
    backgroundColor: colors.warning + '10',
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.warning + '30',
    padding: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
  },
  tipEmoji: {
    fontSize: 32,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  coachButton: {
    position: 'absolute',
    bottom: 90,
    right: spacing.lg,
    ...shadows.xl,
  },
  coachButtonGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
