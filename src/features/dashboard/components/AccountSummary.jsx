import { TrendingUp, Shield, AlertTriangle, ChevronRight } from 'lucide-react';
import { memo } from 'react';
import { StyleSheet as RNStyleSheet, Text, View } from 'react-native-web';
import { IconGlyph } from '../../../components/icons/IconGlyph.jsx';
import { font, radii, space } from '../../../theme';

export const AccountSummary = memo(function AccountSummary({ colors }) {
  const metrics = [
    {
      label: 'Total Accounts',
      value: '8',
      icon: null,
      valueColor: colors.text,
    },
    {
      label: 'Primary Account',
      value: 'Checking',
      icon: TrendingUp,
      valueColor: colors.text,
    },
    {
      label: 'Account Health',
      value: 'Excellent',
      icon: Shield,
      valueColor: colors.positive,
    },
    {
      label: 'Risk Level',
      value: 'Low',
      icon: AlertTriangle,
      valueColor: colors.warning,
    },
  ];

  return (
    <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Account Summary</Text>
      </View>
      
      <View style={styles.metrics}>
        {metrics.map((metric, index) => (
          <View key={metric.label} style={styles.metric}>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>
              {metric.label}
            </Text>
            <View style={styles.metricValue}>
              {metric.icon && (
                <IconGlyph icon={metric.icon} size={16} color={metric.valueColor} strokeWidth={2} />
              )}
              <Text style={[styles.metricText, { color: metric.valueColor }]}>
                {metric.value}
              </Text>
            </View>
          </View>
        ))}
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
    height: '100%',
    flex: 1,
  },
  // Mobile responsive
  '@media (max-width: 768px)': {
    card: {
      padding: space.md,
      gap: space.sm,
    },
  },
  '@media (max-width: 480px)': {
    card: {
      padding: space.sm,
      gap: space.xs,
    },
  },
  header: {
    marginBottom: space.md,
  },
  title: {
    fontFamily: font.sans,
    fontSize: 20,
    fontWeight: '800',
  },
  metrics: {
    gap: space.lg,
  },
  metric: {
    gap: space.sm,
  },
  metricLabel: {
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  metricValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  metricText: {
    fontFamily: font.sans,
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    paddingTop: space.md,
  },
  viewLink: {
    fontFamily: font.sans,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
