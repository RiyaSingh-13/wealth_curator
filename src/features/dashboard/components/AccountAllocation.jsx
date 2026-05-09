import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { memo } from 'react';
import { StyleSheet as RNStyleSheet, Text, View } from 'react-native-web';
import { font, radii, space } from '../../../theme';

const allocationData = [
  { name: 'Checking', value: 35.2, amount: 369600, color: '#8b5cf6' },
  { name: 'Savings', value: 28.5, amount: 299250, color: '#3b82f6' },
  { name: 'Investment', value: 22.8, amount: 239400, color: '#10b981' },
  { name: 'Retirement', value: 13.5, amount: 141750, color: '#f59e0b' },
];

export const AccountAllocation = memo(function AccountAllocation({ colors }) {
  const totalValue = allocationData.reduce((sum, item) => sum + item.amount, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <View style={[styles.tooltip, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
          <Text style={[styles.tooltipTitle, { color: colors.text }]}>{data.name}</Text>
          <Text style={[styles.tooltipValue, { color: colors.text }]}>
            {data.value}% • ${data.amount.toLocaleString()}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Account Allocation</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {allocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </View>
      
      <View style={styles.totalValue}>
        <Text style={[styles.totalLabel, { color: colors.textMuted }]}>Total Balance</Text>
        <Text style={[styles.totalAmount, { color: colors.text }]}>
          ${(totalValue / 1000000).toFixed(2)}M
        </Text>
      </View>
      
      <View style={styles.breakdown}>
        {allocationData.map((item, index) => (
          <View key={item.name} style={styles.allocationItem}>
            <View style={styles.allocationRow}>
              <View style={[styles.colorDot, { backgroundColor: item.color }]} />
              <Text style={[styles.allocationName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.allocationPercent, { color: colors.text }]}>
                {item.value}%
              </Text>
            </View>
            <Text style={[styles.allocationAmount, { color: colors.textSecondary }]}>
              ${item.amount.toLocaleString()}
            </Text>
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
      padding: space.xl,
      gap: space.lg,
    },
  },
  '@media (max-width: 480px)': {
    card: {
      padding: space.lg,
      gap: space.md,
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
  chartContainer: {
    height: 220,
  },
  tooltip: {
    borderWidth: 1,
    borderRadius: radii.md,
    padding: space.sm,
  },
  tooltipTitle: {
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  tooltipValue: {
    fontFamily: font.sans,
    fontSize: 12,
    fontWeight: '500',
  },
  totalValue: {
    alignItems: 'center',
    gap: space.sm,
  },
  totalLabel: {
    fontFamily: font.sans,
    fontSize: 14,
    fontWeight: '600',
  },
  totalAmount: {
    fontFamily: font.sans,
    fontSize: 28,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  breakdown: {
    gap: space.md,
  },
  allocationItem: {
    gap: space.sm,
  },
  allocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: radii.pill,
  },
  allocationName: {
    fontFamily: font.sans,
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  allocationPercent: {
    fontFamily: font.sans,
    fontSize: 14,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  allocationAmount: {
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
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
