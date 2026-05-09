import { Plane, TrendingUp, TrendingDown, AlertCircle, ShoppingCart, Utensils } from 'lucide-react';
import { memo, useMemo } from 'react';
import { StyleSheet as RNStyleSheet, Text, View } from 'react-native-web';
import { IconGlyph } from '../../../components/icons/IconGlyph.jsx';
import { font, radii, space } from '../../../theme';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getBudgetIcon(category) {
  switch (category.toLowerCase()) {
    case 'travel':
      return Plane;
    case 'dining':
      return Utensils;
    case 'shopping':
      return ShoppingCart;
    default:
      return null;
  }
}

function getStatusColor(status, colors) {
  switch (status.toLowerCase()) {
    case 'on track':
      return colors.positive;
    case 'over budget':
      return colors.negative;
    case 'at risk':
      return colors.warning;
    default:
      return colors.textMuted;
  }
}

function BudgetCard({ colors, budget }) {
  const percentage = Math.min(100, Math.round((budget.spent / budget.allocated) * 100));
  const remaining = Math.max(0, budget.allocated - budget.spent);
  const statusColor = getStatusColor(budget.status, colors);
  
  const trendIcon = budget.trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = budget.trend === 'up' ? colors.positive : colors.negative;

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: colors.border,
          backgroundColor: colors.bgElevated,
        },
      ]}
      accessibilityLabel={`${budget.category} budget: ${formatCurrency(budget.spent)} of ${formatCurrency(budget.allocated)}`}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <IconGlyph icon={getBudgetIcon(budget.category)} size={24} color={colors.accent} strokeWidth={2} />
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.categoryName, { color: colors.text }]}>{budget.category}</Text>
          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, { color: statusColor }]}>{budget.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.amountSection}>
        <Text style={[styles.spentAmount, { color: colors.text }]}>
          {formatCurrency(budget.spent)}
        </Text>
        <Text style={[styles.totalAmount, { color: colors.textMuted }]}>
          of {formatCurrency(budget.allocated)}
        </Text>
      </View>

      <View style={styles.progressSection}>
        <View style={[styles.progressBar, { backgroundColor: colors.bgMuted }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${percentage}%`,
                backgroundColor: percentage > 90 ? colors.negative : percentage > 75 ? colors.warning : colors.accent,
              },
            ]}
          />
        </View>
        <Text style={[styles.percentageText, { color: colors.textSecondary }]}>
          {percentage}% used
        </Text>
      </View>

      <View style={styles.footerSection}>
        <View style={styles.remainingInfo}>
          <Text style={[styles.remainingLabel, { color: colors.textMuted }]}>Remaining</Text>
          <Text style={[styles.remainingAmount, { color: colors.text }]}>
            {formatCurrency(remaining)}
          </Text>
        </View>
        
        {budget.trend && (
          <View style={styles.trendInfo}>
            <IconGlyph icon={trendIcon} size={16} color={trendColor} strokeWidth={2} />
            <Text style={[styles.trendText, { color: trendColor }]}>
              {budget.trendAmount > 0 ? '+' : ''}{formatCurrency(budget.trendAmount)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export const BudgetTracker = memo(function BudgetTracker({ colors, budgets }) {
  const hasAlerts = useMemo(() => 
    budgets.some(budget => budget.status.toLowerCase() === 'over budget' || budget.status.toLowerCase() === 'at risk'),
    [budgets]
  );

  return (
    <View nativeID="section-budget" style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Budget Tracker</Text>
        {hasAlerts && (
          <View style={styles.alertBadge}>
            <IconGlyph icon={AlertCircle} size={16} color={colors.warning} strokeWidth={2} />
            <Text style={[styles.alertText, { color: colors.warning }]}>Alert</Text>
          </View>
        )}
      </View>
      
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Track your monthly spending across different categories and stay within your budget limits.
      </Text>

      <View style={styles.budgetList}>
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} colors={colors} budget={budget} />
        ))}
      </View>
    </View>
  );
});

const styles = RNStyleSheet.create({
  container: {
    gap: space.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm,
  },
  title: {
    fontFamily: font.sans,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: font.sans,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 720,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    paddingHorizontal: space.sm,
    paddingVertical: 4,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  alertText: {
    fontFamily: font.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  budgetList: {
    gap: space.md,
    marginTop: space.sm,
  },
  card: {
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: space.lg,
    gap: space.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: 'rgba(0, 102, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    gap: space.xs,
  },
  categoryName: {
    fontFamily: font.sans,
    fontSize: 18,
    fontWeight: '700',
  },
  statusBadge: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontFamily: font.sans,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  amountSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space.xs,
  },
  spentAmount: {
    fontFamily: font.sans,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
    fontVariant: ['tabular-nums'],
  },
  totalAmount: {
    fontFamily: font.sans,
    fontSize: 14,
    fontWeight: '500',
  },
  progressSection: {
    gap: space.xs,
  },
  progressBar: {
    height: 8,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radii.pill,
    transition: 'width 0.3s ease',
  },
  percentageText: {
    fontFamily: font.sans,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: space.xs,
  },
  remainingInfo: {
    gap: 2,
  },
  remainingLabel: {
    fontFamily: font.sans,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  remainingAmount: {
    fontFamily: font.sans,
    fontSize: 16,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  trendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },
  trendText: {
    fontFamily: font.sans,
    fontSize: 12,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});
