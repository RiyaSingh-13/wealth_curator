import { LineChart, TrendingUp, TrendingDown, BarChart3, DollarSign, Activity } from 'lucide-react';
import { memo } from 'react';
import { StyleSheet as RNStyleSheet, Text, View, useWindowDimensions } from 'react-native-web';
import { IconGlyph } from '../../../components/icons/IconGlyph.jsx';
import { font, radii, space } from '../../../theme';

// Import the modern dashboard components
import { AccountSummaryCard } from './AccountSummaryCard.jsx';
import { AccountPerformance } from './AccountPerformance.jsx';
import { AccountAllocation } from './AccountAllocation.jsx';
import { AccountSummary } from './AccountSummary.jsx';
import { AccountOverview } from './AccountOverview.jsx';

export const PortfolioSection = memo(function PortfolioSection({ colors, holdings }) {
  const { width } = useWindowDimensions();
  const wide = width > 900;
  const compact = width < 640;

  return (
    <View nativeID="section-portfolio" style={styles.page}>
      {/* Portfolio Header */}
      <View style={styles.pageHead}>
        <View style={styles.headingRow} accessibilityRole="header">
          <IconGlyph icon={LineChart} size={24} color={colors.accent} strokeWidth={2} />
          <Text style={[styles.pageTitle, { color: colors.text }]} accessibilityRole="text">
            Portfolio
          </Text>
        </View>
        <Text style={[styles.pageSub, { color: colors.textMuted }]}>
          Track your investment performance and allocation across all accounts
        </Text>
      </View>

      {/* Top Row - Summary Cards */}
      <View style={styles.gridTop}>
        <AccountSummaryCard
          colors={colors}
          title="Total Portfolio Value"
          value="$1,284,750"
          change="+$24,750.45"
          changePercent="+1.96%"
          changeLabel="today"
          icon={LineChart}
          iconColor="#8b5cf6"
          trend="up"
        />
        <AccountSummaryCard
          colors={colors}
          title="Total Invested"
          value="$1,042,350"
          change="+$12,350.00"
          changePercent="+1.20%"
          changeLabel="total invested"
          icon={DollarSign}
          iconColor="#3b82f6"
          trend="up"
        />
        <AccountSummaryCard
          colors={colors}
          title="Total Gain / Loss"
          value="+$242,400"
          change="+23.27%"
          changePercent=""
          changeLabel="total return"
          icon={LineChart}
          iconColor="#10b981"
          trend="up"
        />
        <AccountSummaryCard
          colors={colors}
          title="Today's Gain"
          value="+$24,750"
          change="+1.96%"
          changePercent=""
          changeLabel=""
          icon={Activity}
          iconColor="#f59e0b"
          trend="up"
        />
      </View>

      {/* Middle Row - Account Performance (Full Width) */}
      <View style={styles.performanceRow}>
        <AccountPerformance colors={colors} />
      </View>

      {/* Next Row - Account Allocation and Account Summary */}
      <View style={wide ? styles.gridMid : styles.col}>
        <View style={styles.allocationColumn}>
          <AccountAllocation colors={colors} />
        </View>
        <View style={styles.summaryColumn}>
          <AccountSummary colors={colors} />
        </View>
      </View>

      {/* Bottom Row - Holdings Overview */}
      <View style={styles.holdingsColumn}>
        <AccountOverview colors={colors} />
      </View>
    </View>
  );
});

const styles = RNStyleSheet.create({
  page: { gap: space.lg },
  pageHead: { gap: space.xs, maxWidth: 900 },
  pageTitle: { fontFamily: font.sans, fontSize: 32, fontWeight: '800', letterSpacing: -0.8 },
  pageSub: { fontFamily: font.sans, fontSize: 15, lineHeight: 22 },
  gridTop: { flexDirection: 'row', gap: space.md, alignItems: 'stretch' },
  gridMid: { flexDirection: 'row', gap: space.md, alignItems: 'stretch' },
  col: { gap: space.md },
  performanceRow: { width: '100%' },
  allocationColumn: { flex: 1 },
  summaryColumn: { flex: 1 },
  holdingsColumn: { flex: 1, minWidth: 0 },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    flexWrap: 'wrap',
  },
  // Responsive breakpoints
  '@media (max-width: 768px)': {
    page: { gap: space.xl, padding: space.md },
    pageHead: { gap: space.md, maxWidth: '100%' },
    pageTitle: { fontSize: 32, fontWeight: '900', letterSpacing: -0.8 },
    pageSub: { fontSize: 16, lineHeight: 24 },
    gridTop: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md, justifyContent: 'space-between' },
    gridMid: { flexDirection: 'column', gap: space.lg },
    col: { gap: space.lg },
    performanceRow: { width: '100%' },
    allocationColumn: { flex: '1 1 100%' },
    summaryColumn: { flex: '1 1 100%' },
    holdingsColumn: { flex: '1 1 100%' },
    headingRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  },
  '@media (max-width: 480px)': {
    page: { gap: space.lg, padding: space.sm },
    pageHead: { gap: space.sm, maxWidth: '100%' },
    pageTitle: { fontSize: 28, fontWeight: '900', letterSpacing: -0.6 },
    pageSub: { fontSize: 15, lineHeight: 22 },
    gridTop: { flexDirection: 'column', gap: space.md },
    gridMid: { flexDirection: 'column', gap: space.lg },
    col: { gap: space.lg },
    performanceRow: { width: '100%' },
    allocationColumn: { flex: '1 1 100%' },
    summaryColumn: { flex: '1 1 100%' },
    holdingsColumn: { flex: '1 1 100%' },
    headingRow: { flexDirection: 'column', alignItems: 'flex-start', gap: space.sm },
  },
});
