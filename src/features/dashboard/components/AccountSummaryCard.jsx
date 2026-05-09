import { TrendingUp, TrendingDown, DollarSign, Wallet, CreditCard, PiggyBank } from 'lucide-react';
import { memo } from 'react';
import { StyleSheet as RNStyleSheet, Text, View } from 'react-native-web';
import { IconGlyph } from '../../../components/icons/IconGlyph.jsx';
import { font, radii, space } from '../../../theme';

export const AccountSummaryCard = memo(function AccountSummaryCard({ 
  colors, 
  title, 
  value, 
  change, 
  changePercent, 
  changeLabel,
  icon,
  iconColor,
  trend = 'up'
}) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend === 'up' ? colors.positive : colors.negative;

  return (
    <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
          <IconGlyph icon={icon} size={20} color={iconColor} strokeWidth={2} />
        </View>
        <Text style={[styles.title, { color: colors.textMuted }]}>{title}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        
        <View style={styles.changeRow}>
          <IconGlyph icon={TrendIcon} size={16} color={trendColor} strokeWidth={2} />
          <Text style={[styles.change, { color: trendColor }]}>
            {change} ({changePercent})
          </Text>
        </View>
        
        <Text style={[styles.changeLabel, { color: colors.textSecondary }]}>{changeLabel}</Text>
      </View>
    </View>
  );
});

const styles = RNStyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: space.lg,
    gap: space.md,
    flex: '1 1 calc(25% - 18px)',
    minWidth: 240,
    maxWidth: 'calc(25% - 18px)',
  },
  '@media (max-width: 768px)': {
    card: {
      flex: '1 1 calc(50% - 12px)',
      minWidth: 0,
      maxWidth: 'calc(50% - 12px)',
      padding: space.lg,
    },
  },
  '@media (max-width: 480px)': {
    card: {
      flex: '1 1 100%',
      minWidth: 0,
      maxWidth: '100%',
      padding: space.md,
      gap: space.md,
    },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: font.sans,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  content: {
    gap: space.sm,
  },
  value: {
    fontFamily: font.sans,
    fontSize: 32,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },
  change: {
    fontFamily: font.sans,
    fontSize: 15,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  changeLabel: {
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: '500',
  },
});
