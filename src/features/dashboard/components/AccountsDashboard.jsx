import { memo } from 'react';
import { StyleSheet as RNStyleSheet, View, useWindowDimensions } from 'react-native-web';
import { space } from '../../../theme';
import { AccountSummaryCard } from './AccountSummaryCard.jsx';
import { AccountPerformance } from './AccountPerformance.jsx';
import { AccountAllocation } from './AccountAllocation.jsx';
import { AccountSummary } from './AccountSummary.jsx';
import { AccountOverview } from './AccountOverview.jsx';
import { LineChart, DollarSign, Wallet, CreditCard, PiggyBank } from 'lucide-react';

export const AccountsDashboard = memo(function AccountsDashboard({ colors }) {
  const { width } = useWindowDimensions();
  const isCompact = width < 768;
  const isTablet = width < 1024;

  return (
    <View style={styles.container}>
      {/* Top Row - Summary Cards */}
      <View style={styles.summaryRow}>
        <AccountSummaryCard
          colors={colors}
          title="Total Balance"
          value="$1,050,000"
          change="+$45,000.00"
          changePercent="+4.5%"
          changeLabel="this month"
          icon={Wallet}
          iconColor="#8b5cf6"
          trend="up"
        />
        <AccountSummaryCard
          colors={colors}
          title="Available Funds"
          value="$987,500"
          change="+$12,350.00"
          changePercent="+1.3%"
          changeLabel="available"
          icon={CreditCard}
          iconColor="#3b82f6"
          trend="up"
        />
        <AccountSummaryCard
          colors={colors}
          title="Total Interest"
          value="+$24,400"
          change="+2.8%"
          changePercent=""
          changeLabel="annual"
          icon={LineChart}
          iconColor="#10b981"
          trend="up"
        />
        <AccountSummaryCard
          colors={colors}
          title="Monthly Savings"
          value="+$8,750"
          change="+15.2%"
          changePercent=""
          changeLabel="this month"
          icon={PiggyBank}
          iconColor="#f59e0b"
          trend="up"
        />
      </View>

      {/* Middle Row - Charts and Summary */}
      <View style={styles.middleRow}>
        <View style={styles.chartColumn}>
          <AccountPerformance colors={colors} />
        </View>
        <View style={styles.allocationColumn}>
          <AccountAllocation colors={colors} />
        </View>
        <View style={styles.summaryColumn}>
          <AccountSummary colors={colors} />
        </View>
      </View>

      {/* Bottom Row - Account Overview */}
      <View style={styles.bottomRow}>
        <View style={styles.overviewColumn}>
          <AccountOverview colors={colors} />
        </View>
      </View>
    </View>
  );
});

const styles = RNStyleSheet.create({
  container: {
    gap: space.lg,
    padding: space.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: space.md,
    flexWrap: 'wrap',
  },
  middleRow: {
    flexDirection: 'row',
    gap: space.md,
    flexWrap: 'wrap',
  },
  bottomRow: {
    flexDirection: 'row',
    gap: space.md,
    flexWrap: 'wrap',
  },
  // Summary cards take 1/4 each on desktop, 1/2 on tablet, full on mobile
  '@media (min-width: 1024px)': {
    summaryRow: {
      flexDirection: 'row',
    },
    chartColumn: {
      flex: 2,
    },
    allocationColumn: {
      flex: 1,
    },
    summaryColumn: {
      flex: 1,
    },
    overviewColumn: {
      flex: '1 1 100%',
    },
  },
  '@media (min-width: 768px) and (max-width: 1023px)': {
    summaryRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chartColumn: {
      flex: '1 1 100%',
    },
    allocationColumn: {
      flex: '1 1 50%',
    },
    summaryColumn: {
      flex: '1 1 50%',
    },
    overviewColumn: {
      flex: '1 1 100%',
    },
  },
  '@media (max-width: 767px)': {
    summaryRow: {
      flexDirection: 'column',
    },
    chartColumn: {
      flex: '1 1 100%',
    },
    allocationColumn: {
      flex: '1 1 100%',
    },
    summaryColumn: {
      flex: '1 1 100%',
    },
    overviewColumn: {
      flex: '1 1 100%',
    },
  },
});
