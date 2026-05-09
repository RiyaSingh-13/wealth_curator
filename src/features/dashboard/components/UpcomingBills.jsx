import { Wifi, Zap, Calendar, CreditCard, Home, Smartphone, ShoppingCart } from 'lucide-react';
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

function getDaysLeftColor(daysLeft, colors) {
  if (daysLeft <= 3) return colors.negative;
  if (daysLeft <= 7) return colors.warning;
  return colors.textMuted;
}

function getBillIcon(category) {
  switch (category.toLowerCase()) {
    case 'internet':
    case 'fiber':
      return Wifi;
    case 'electricity':
    case 'utilities':
      return Zap;
    case 'rent':
    case 'mortgage':
      return Home;
    case 'phone':
    case 'mobile':
      return Smartphone;
    case 'subscription':
    case 'shopping':
      return ShoppingCart;
    default:
      return CreditCard;
  }
}

function BillCard({ colors, bill }) {
  const daysLeft = Math.max(0, Math.ceil((bill.dueDate - new Date()) / (1000 * 60 * 60 * 24)));
  const daysLeftColor = getDaysLeftColor(daysLeft, colors);
  const BillIcon = getBillIcon(bill.category);
  
  return (
    <View
      style={[
        styles.billCard,
        {
          borderColor: colors.border,
          backgroundColor: colors.bgElevated,
        },
        daysLeft <= 3 && { borderColor: `${colors.negative}33` },
      ]}
      accessibilityLabel={`${bill.name} bill due in ${daysLeft} days, amount ${formatCurrency(bill.amount)}`}
    >
      <View style={styles.billHeader}>
        <View style={styles.iconContainer}>
          <IconGlyph icon={BillIcon} size={20} color={colors.accent} strokeWidth={2} />
        </View>
        <View style={styles.billInfo}>
          <Text style={[styles.billName, { color: colors.text }]}>{bill.name}</Text>
          <Text style={[styles.billCategory, { color: colors.textMuted }]}>{bill.category}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.billAmount, { color: colors.text }]}>
            {formatCurrency(bill.amount)}
          </Text>
        </View>
      </View>

      <View style={styles.billFooter}>
        <View style={styles.dueDateContainer}>
          <IconGlyph icon={Calendar} size={14} color={daysLeftColor} strokeWidth={2} />
          <Text style={[styles.dueDateText, { color: daysLeftColor }]}>
            {daysLeft === 0 ? 'DUE TODAY' : daysLeft === 1 ? '1 DAY' : `${daysLeft} DAYS`}
          </Text>
        </View>
        
        {bill.autopay && (
          <View style={styles.autopayBadge}>
            <Text style={[styles.autopayText, { color: colors.positive }]}>AUTOPAY</Text>
          </View>
        )}
        
        {daysLeft <= 3 && (
          <View style={styles.urgentBadge}>
            <Text style={[styles.urgentText, { color: colors.negative }]}>URGENT</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export const UpcomingBills = memo(function UpcomingBills({ colors, bills }) {
  const totalBills = useMemo(() => 
    bills.reduce((sum, bill) => sum + bill.amount, 0),
    [bills]
  );

  const urgentBills = useMemo(() => 
    bills.filter(bill => {
      const daysLeft = Math.ceil((bill.dueDate - new Date()) / (1000 * 60 * 60 * 24));
      return daysLeft <= 3;
    }),
    [bills]
  );

  const nextWeekBills = useMemo(() => 
    bills.filter(bill => {
      const daysLeft = Math.ceil((bill.dueDate - new Date()) / (1000 * 60 * 60 * 24));
      return daysLeft <= 7 && daysLeft > 3;
    }),
    [bills]
  );

  return (
    <View nativeID="section-upcoming-bills" style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Upcoming Bills</Text>
        {urgentBills.length > 0 && (
          <View style={styles.alertBadge}>
            <Text style={[styles.alertText, { color: colors.negative }]}>
              {urgentBills.length} Urgent
            </Text>
          </View>
        )}
      </View>
      
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Track your upcoming bills and payment deadlines to avoid late fees.
      </Text>

      <View style={styles.summaryCards}>
        <View style={[styles.summaryCard, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
          <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Total this month</Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {formatCurrency(totalBills)}
          </Text>
        </View>
        
        <View style={[styles.summaryCard, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
          <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Next 7 days</Text>
          <Text style={[styles.summaryValue, { color: colors.warning }]}>
            {formatCurrency(nextWeekBills.reduce((sum, bill) => sum + bill.amount, 0))}
          </Text>
        </View>
      </View>

      <View style={styles.billsList}>
        {bills.map((bill) => (
          <BillCard key={bill.id} colors={colors} bill={bill} />
        ))}
      </View>

      {bills.length === 0 && (
        <View style={[styles.emptyState, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No upcoming bills scheduled. Add your recurring bills to track them here.
          </Text>
        </View>
      )}
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
    paddingHorizontal: space.sm,
    paddingVertical: 4,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
  },
  alertText: {
    fontFamily: font.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  summaryCards: {
    flexDirection: 'row',
    gap: space.md,
    marginTop: space.sm,
  },
  summaryCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: space.md,
    gap: space.xs,
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: font.sans,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  summaryValue: {
    fontFamily: font.sans,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
    fontVariant: ['tabular-nums'],
  },
  billsList: {
    gap: space.md,
    marginTop: space.sm,
  },
  billCard: {
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: space.md,
    gap: space.sm,
  },
  billHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(0, 102, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  billInfo: {
    flex: 1,
    gap: 2,
  },
  billName: {
    fontFamily: font.sans,
    fontSize: 16,
    fontWeight: '700',
  },
  billCategory: {
    fontFamily: font.sans,
    fontSize: 12,
    fontWeight: '500',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  billAmount: {
    fontFamily: font.sans,
    fontSize: 18,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  billFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm,
    flexWrap: 'wrap',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },
  dueDateText: {
    fontFamily: font.sans,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  autopayBadge: {
    paddingHorizontal: space.sm,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
  },
  autopayText: {
    fontFamily: font.sans,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  urgentBadge: {
    paddingHorizontal: space.sm,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
  },
  urgentText: {
    fontFamily: font.sans,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  emptyState: {
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: space.xl,
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: font.sans,
    fontSize: 14,
    lineHeight: 20,
  },
});
