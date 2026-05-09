import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { memo } from 'react';
import { StyleSheet as RNStyleSheet, Text, View } from 'react-native-web';
import { font, radii, space } from '../../../theme';

const mockData = [
  { month: 'Jan', value: 850000 },
  { month: 'Feb', value: 875000 },
  { month: 'Mar', value: 920000 },
  { month: 'Apr', value: 945000 },
  { month: 'May', value: 980000 },
  { month: 'Jun', value: 1025000 },
  { month: 'Jul', value: 1050000 },
];

export const AccountPerformance = memo(function AccountPerformance({ colors }) {
  const currentValue = mockData[mockData.length - 1].value;
  const firstValue = mockData[0].value;
  const totalReturn = ((currentValue - firstValue) / firstValue * 100).toFixed(2);

  return (
    <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Account Performance</Text>
        <View style={styles.periodSelector}>
          <Text style={[styles.periodText, { color: colors.textMuted }]}>This Year</Text>
        </View>
      </View>
      
      <View style={styles.performanceHeader}>
        <Text style={[styles.performanceValue, { color: colors.text }]}>
          +{totalReturn}%
        </Text>
        <Text style={[styles.performanceLabel, { color: colors.textSecondary }]}>
          Overall Performance
        </Text>
      </View>
      
      <View style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis 
              dataKey="month" 
              stroke={colors.textMuted}
              fontSize={12}
            />
            <YAxis 
              stroke={colors.textMuted}
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: colors.bgElevated,
                border: `1px solid ${colors.border}`,
                borderRadius: radii.md,
              }}
              labelStyle={{ color: colors.text }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Account Balance']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors.accent} 
              strokeWidth={3}
              dot={{ fill: colors.accent, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.peakValue, { color: colors.text }]}>
          ${currentValue.toLocaleString()}
        </Text>
        <Text style={[styles.peakDate, { color: colors.textSecondary }]}>
          Jul 16, 2024
        </Text>
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
    flex: '1 1 100%',
    width: '100%',
  },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: font.sans,
    fontSize: 20,
    fontWeight: '800',
  },
  periodSelector: {
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderWidth: 1,
    borderRadius: radii.md,
  },
  periodText: {
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  performanceHeader: {
    alignItems: 'center',
    gap: space.sm,
    marginVertical: space.md,
  },
  performanceValue: {
    fontFamily: font.sans,
    fontSize: 36,
    fontWeight: '800',
  },
  performanceLabel: {
    fontFamily: font.sans,
    fontSize: 16,
    fontWeight: '600',
  },
  chartContainer: {
    height: 220,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: space.md,
  },
  peakValue: {
    fontFamily: font.sans,
    fontSize: 18,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  peakDate: {
    fontFamily: font.sans,
    fontSize: 14,
    fontWeight: '600',
  },
});
