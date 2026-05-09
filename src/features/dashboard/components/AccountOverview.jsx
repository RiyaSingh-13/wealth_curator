import { ChevronRight } from 'lucide-react';
import { memo, useState } from 'react';
import { Pressable, StyleSheet as RNStyleSheet, Text, View } from 'react-native-web';
import { IconGlyph } from '../../../components/icons/IconGlyph.jsx';
import { font, radii, space } from '../../../theme';

const holdingsData = [
  {
    name: 'Apple Inc.',
    symbol: 'AAPL',
    type: 'Equity',
    invested: 228450,
    currentValue: 262450,
    allocation: 20.4,
  },
  {
    name: 'Microsoft Corp.',
    symbol: 'MSFT',
    type: 'Equity',
    invested: 180250,
    currentValue: 204350,
    allocation: 15.9,
  },
  {
    name: 'Alphabet Inc.',
    symbol: 'GOOGL',
    type: 'Equity',
    invested: 155300,
    currentValue: 186120,
    allocation: 14.4,
  },
  {
    name: 'Amazon.com Inc.',
    symbol: 'AMZN',
    type: 'Equity',
    invested: 142000,
    currentValue: 178900,
    allocation: 13.9,
  },
  {
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    type: 'Equity',
    invested: 98500,
    currentValue: 115200,
    allocation: 9.0,
  },
  {
    name: 'NVIDIA Corp.',
    symbol: 'NVDA',
    type: 'Equity',
    invested: 87600,
    currentValue: 145800,
    allocation: 11.3,
  },
  {
    name: 'Meta Platforms Inc.',
    symbol: 'META',
    type: 'Equity',
    invested: 76500,
    currentValue: 89400,
    allocation: 6.9,
  },
  {
    name: 'Berkshire Hathaway',
    symbol: 'BRK.B',
    type: 'Equity',
    invested: 65400,
    currentValue: 71200,
    allocation: 5.5,
  },
  {
    name: 'ICICI Prudential Bluechip Fund',
    symbol: 'ICICIBLUE',
    type: 'Mutual Fund',
    invested: 100000,
    currentValue: 128450,
    allocation: 10.0,
  },
  {
    name: 'HDFC Top 100 Fund',
    symbol: 'HDFCTOP100',
    type: 'Mutual Fund',
    invested: 75000,
    currentValue: 91200,
    allocation: 7.5,
  },
  {
    name: 'SBI Bluechip Fund',
    symbol: 'SBIBLUE',
    type: 'Mutual Fund',
    invested: 50000,
    currentValue: 61300,
    allocation: 5.0,
  },
  {
    name: 'Axis Bluechip Fund',
    symbol: 'AXISBLUE',
    type: 'Mutual Fund',
    invested: 45000,
    currentValue: 54800,
    allocation: 4.5,
  },
  {
    name: 'US Treasury Bonds',
    symbol: 'USBOND',
    type: 'Bond',
    invested: 80000,
    currentValue: 82400,
    allocation: 6.4,
  },
  {
    name: 'Corporate Bond ETF',
    symbol: 'CORPBOND',
    type: 'Bond',
    invested: 60000,
    currentValue: 61800,
    allocation: 4.8,
  },
  {
    name: 'Gold ETF',
    symbol: 'GOLDETF',
    type: 'Others',
    invested: 35000,
    currentValue: 38500,
    allocation: 2.8,
  },
  {
    name: 'Real Estate ETF',
    symbol: 'REETF',
    type: 'Others',
    invested: 25000,
    currentValue: 26750,
    allocation: 2.0,
  },
];

export const AccountOverview = memo(function AccountOverview({ colors }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const [showAllHoldings, setShowAllHoldings] = useState(false);
  
  const displayHoldings = showAllHoldings ? holdingsData : holdingsData.slice(0, 5);

  return (
    <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Holdings Overview</Text>
      </View>
      
      <View style={styles.table}>
        <View style={[styles.tableHeader, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerCell, styles.nameCell, { color: colors.textMuted }]}>Name</Text>
          <Text style={[styles.headerCell, styles.typeCell, { color: colors.textMuted }]}>Type</Text>
          <Text style={[styles.headerCell, styles.numberCell, { color: colors.textMuted }]}>Invested</Text>
          <Text style={[styles.headerCell, styles.numberCell, { color: colors.textMuted }]}>Current Value</Text>
          <Text style={[styles.headerCell, styles.numberCell, { color: colors.textMuted }]}>Gain/Loss</Text>
          <Text style={[styles.headerCell, styles.numberCell, { color: colors.textMuted }]}>Gain %</Text>
          <Text style={[styles.headerCell, styles.allocationCell, { color: colors.textMuted }]}>Allocation</Text>
        </View>
        
        {displayHoldings.map((holding, index) => {
          const gain = holding.currentValue - holding.invested;
          const gainPercent = ((gain / holding.invested) * 100).toFixed(2);
          const isPositive = gain >= 0;
          
          return (
            <View key={holding.symbol} style={[styles.row, { borderTopColor: colors.border }]}>
              <View style={styles.nameCell}>
                <View>
                  <Text style={[styles.stockName, { color: colors.text }]}>{holding.name}</Text>
                  <Text style={[styles.stockSymbol, { color: colors.textSecondary }]}>{holding.symbol}</Text>
                </View>
              </View>
              <Text style={[styles.typeCell, { color: colors.textSecondary }]}>{holding.type}</Text>
              <Text style={[styles.numberCell, { color: colors.text }]}>{formatCurrency(holding.invested)}</Text>
              <Text style={[styles.numberCell, { color: colors.text }]}>{formatCurrency(holding.currentValue)}</Text>
              <Text style={[styles.numberCell, { color: isPositive ? colors.positive : colors.negative }]}>
                {isPositive ? '+' : ''}{formatCurrency(gain)}
              </Text>
              <Text style={[styles.numberCell, { color: isPositive ? colors.positive : colors.negative }]}>
                {isPositive ? '+' : ''}{gainPercent}%
              </Text>
              <View style={styles.allocationCell}>
                <View style={styles.allocationBar}>
                  <View 
                    style={[
                      styles.allocationFill,
                      { 
                        backgroundColor: colors.accent,
                        width: `${holding.allocation * 5}%` // Scale for visualization
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.allocationText, { color: colors.text }]}>{holding.allocation}%</Text>
              </View>
            </View>
          );
        })}
      </View>
      
      <View style={styles.footer}>
        <Pressable
          onPress={() => setShowAllHoldings(!showAllHoldings)}
          style={({ pressed }) => [
            styles.viewLinkButton,
            pressed && styles.viewLinkPressed,
          ]}
        >
          <Text style={[styles.viewLink, { color: colors.accent }]}>
            {showAllHoldings ? 'Show less holdings' : 'View all holdings'} {'>'}
          </Text>
        </Pressable>
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
    flex: '1 1 100%',
    width: '100%',
  },
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
  tabs: {
    flexDirection: 'row',
    gap: space.sm,
    marginBottom: space.lg,
    flexWrap: 'wrap',
  },
  tab: {
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radii.md,
    transition: 'all 0.2s ease',
  },
  tabPressed: {
    opacity: 0.8,
  },
  tabText: {
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  table: {
    gap: space.md,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: space.md,
    borderBottomWidth: 1,
  },
  headerCell: {
    fontFamily: font.sans,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: space.md,
    borderTopWidth: 1,
    gap: space.md,
  },
  nameCell: {
    flex: 2,
    minWidth: 140,
  },
  stockName: {
    fontFamily: font.sans,
    fontSize: 14,
    fontWeight: '700',
  },
  stockSymbol: {
    fontFamily: font.sans,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  typeCell: {
    flex: 1,
    minWidth: 90,
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  numberCell: {
    flex: 1,
    minWidth: 90,
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
  },
  allocationCell: {
    flex: 1,
    minWidth: 90,
    alignItems: 'flex-end',
    gap: space.sm,
  },
  allocationBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  allocationFill: {
    height: '100%',
    borderRadius: radii.pill,
  },
  allocationText: {
    fontFamily: font.sans,
    fontSize: 12,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  footer: {
    paddingTop: space.lg,
  },
  viewLink: {
    fontFamily: font.sans,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  viewLinkButton: {
    alignSelf: 'center',
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: radii.md,
    transition: 'all 0.2s ease',
  },
  viewLinkPressed: {
    opacity: 0.8,
  },
});
