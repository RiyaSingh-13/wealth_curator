import { Receipt, Search } from 'lucide-react';
import { createElement, memo, useEffect, useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Pressable, StyleSheet as RNStyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native-web';
import { IconGlyph } from '../../../components/icons/IconGlyph.jsx';
import { font, radii, space } from '../../../theme';

const ROW_HEIGHT = 56;
const ROW_HEIGHT_COMPACT = 58;

const TXN_SEARCH_PLACEHOLDER = 'Filter merchants, categories, ticker tags, txn id…';

export const TransactionsList = memo(function TransactionsList({
  colors,
  rows,
  searchLabel,
  query,
  onQueryChange,
  selectedCategory,
  categories,
  onSelectCategory,
}) {
  const { width } = useWindowDimensions();
  const compact = width < 640;
  const rowHeight = compact ? ROW_HEIGHT_COMPACT : ROW_HEIGHT;
  const parentRef = useRef(null);

  /** After filter/search, TanStack Virtual keeps scroll offset — viewport can look “empty”; jump to top. */
  useEffect(() => {
    const el = parentRef.current;
    if (el) el.scrollTop = 0;
  }, [rows, searchLabel, selectedCategory]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 12,
  });

  const items = virtualizer.getVirtualItems();

  const header = useMemo(
    () =>
      compact ? (
        <View style={styles.tableHead} accessibilityRole="header">
          <Text style={[styles.hCell, styles.hMerchantGrow, { color: colors.textMuted }]}>Merchant / category</Text>
          <Text style={[styles.hCell, styles.hDateCompact, { color: colors.textMuted }]}>Date</Text>
          <Text style={[styles.hCell, styles.hAmtCompact, { color: colors.textMuted }]} accessibilityLabel="Amount">
            Amt
          </Text>
        </View>
      ) : (
        <View style={styles.tableHead} accessibilityRole="header">
          <Text style={[styles.hCell, styles.hMerchant, { color: colors.textMuted }]}>Merchant</Text>
          <Text style={[styles.hCell, styles.hCat, { color: colors.textMuted }]}>Category</Text>
          <Text style={[styles.hCell, styles.hDate, { color: colors.textMuted }]}>Date</Text>
          <Text style={[styles.hCell, styles.hAmt, { color: colors.textMuted }]} accessibilityLabel="Amount">
            Amount
          </Text>
        </View>
      ),
    [colors.textMuted, compact],
  );

  const virtualChunk = createElement(
    'div',
    {
      ref: parentRef,
      role: 'rowgroup',
      'aria-rowcount': rows.length,
      style: {
        maxHeight: compact ? 'min(480px, 50vh)' : 480,
        overflow: 'auto',
        width: '100%',
        WebkitOverflowScrolling: 'touch',
      },
    },
    createElement(
      'div',
      {
        style: {
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        },
      },
      rows.length === 0
        ? null
        : items.map((virtualRow) =>
            createElement(
              'div',
              {
                key: rows[virtualRow.index]?.id ?? virtualRow.key,
                role: 'row',
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                },
              },
              <TransactionRow compact={compact} colors={colors} tx={rows[virtualRow.index]} />,
            ),
          ),
    ),
  );

  return (
    <View style={styles.wrap} accessibilityLabel="Transactions section">
      <View style={[styles.toolbar, compact && styles.toolbarStack]}>
        <View style={styles.toolbarLead}>
          <IconGlyph icon={Receipt} size={22} color={colors.accent} strokeWidth={2} />
          <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
            Transactions
          </Text>
        </View>
        <Text style={[styles.sub, { color: colors.textMuted }]} accessibilityLabel="Transaction row count">
          {rows.length} visible · virtualized
          {searchLabel ? ` · “${searchLabel.slice(0, 40)}${searchLabel.length > 40 ? '…' : ''}”` : ''}
        </Text>
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchIconSlot} pointerEvents="none">
          <IconGlyph icon={Search} size={18} color={colors.textMuted} />
        </View>
        <TextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder={TXN_SEARCH_PLACEHOLDER}
          placeholderTextColor={colors.textMuted}
          style={[
            styles.search,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.bgMuted,
            },
          ]}
          accessibilityLabel="Search transactions in this list"
          returnKeyType="search"
        />
      </View>

      <View style={styles.filters} accessibilityRole="toolbar" accessibilityLabel="Transaction category filters">
        <Chip colors={colors} label="All" active={selectedCategory == null} onPress={() => onSelectCategory(null)} />
        {categories.map((c) => (
          <Chip
            key={c}
            colors={colors}
            label={c}
            active={selectedCategory === c}
            onPress={() => onSelectCategory(c)}
          />
        ))}
      </View>

      <View
        style={[styles.card, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}
        accessibilityLabel="Ledger transactions table"
      >
        {header}
        {virtualChunk}
        {rows.length === 0 ? (
          <Text style={[styles.emptyInline, { color: colors.textSecondary }]}>No rows to display in this cohort.</Text>
        ) : null}
      </View>
    </View>
  );
});

const Chip = memo(function Chip({ colors, label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`Filter ${label}`}
      style={({ hovered, pressed }) => [
        styles.chip,
        {
          borderColor: active ? colors.accent : colors.border,
          backgroundColor: active ? colors.accentMuted : colors.bgMuted,
        },
        hovered && { opacity: 0.95 },
        pressed && { opacity: 0.88 },
      ]}
    >
      <Text style={[styles.chipText, { color: active ? colors.text : colors.textSecondary }]}>{label}</Text>
    </Pressable>
  );
});

const TransactionRow = memo(function TransactionRow({ colors, tx, compact }) {
  const amt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tx.amount);
  if (compact) {
    return (
      <View
        style={[styles.rowCompactOuter, { borderTopColor: colors.border }]}
        accessibilityLabel={`${tx.merchant}, ${tx.category}, ${tx.date}, ${amt}`}
      >
        <View style={styles.merchantStack}>
          <Text style={[styles.cell, styles.merchantLine, { color: colors.text }]} numberOfLines={1}>
            {tx.merchant}
          </Text>
          <Text style={[styles.catSub, { color: colors.textSecondary }]} numberOfLines={1}>
            {tx.category}
          </Text>
        </View>
        <Text style={[styles.cell, styles.dateCompact, { color: colors.textMuted }]} numberOfLines={1}>
          {tx.date}
        </Text>
        <Text
          style={[styles.cell, styles.amtCompact, { color: tx.amount < 0 ? colors.negative : colors.positive }]}
          numberOfLines={1}
        >
          {amt}
        </Text>
      </View>
    );
  }
  return (
    <View style={[styles.row, { borderTopColor: colors.border }]} accessibilityLabel={`${tx.merchant}, ${amt}`}>
      <Text style={[styles.cell, styles.merchant, { color: colors.text }]} numberOfLines={1}>
        {tx.merchant}
      </Text>
      <Text style={[styles.cell, styles.cat, { color: colors.textSecondary }]} numberOfLines={1}>
        {tx.category}
      </Text>
      <Text style={[styles.cell, styles.date, { color: colors.textMuted }]} numberOfLines={1}>
        {tx.date}
      </Text>
      <Text style={[styles.cell, styles.amt, { color: tx.amount < 0 ? colors.negative : colors.positive }]} numberOfLines={1}>
        {amt}
      </Text>
    </View>
  );
});

const styles = RNStyleSheet.create({
  wrap: { gap: space.sm },
  toolbar: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: space.md },
  toolbarStack: { flexDirection: 'column', alignItems: 'stretch', gap: space.xs },
  toolbarLead: { flexDirection: 'row', alignItems: 'center', gap: space.sm, flexShrink: 0 },
  title: { fontFamily: font.serif, fontSize: 22 },
  sub: { fontFamily: font.sans, fontSize: 12, fontWeight: '600' },
  searchWrap: { position: 'relative', width: '100%', justifyContent: 'center' },
  searchIconSlot: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
  },
  search: {
    width: '100%',
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingLeft: 40,
    paddingRight: space.md,
    paddingVertical: 10,
    fontFamily: font.sans,
    fontSize: 16,
    outlineStyle: 'none',
  },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: space.xs },
  chip: {
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: space.md,
    paddingVertical: 8,
  },
  chipText: { fontFamily: font.sans, fontSize: 12, fontWeight: '800', letterSpacing: 0.2 },
  card: { borderWidth: 1, borderRadius: radii.lg, overflow: 'hidden' },
  tableHead: {
    flexDirection: 'row',
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    gap: space.sm,
  },
  hCell: { fontFamily: font.sans, fontSize: 11, fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  hMerchant: { flex: 1.4 },
  hMerchantGrow: { flex: 1, minWidth: 0 },
  hCat: { flex: 1 },
  hDate: { width: 104 },
  hDateCompact: { width: 76 },
  hAmt: { width: 104, textAlign: 'right' },
  hAmtCompact: { width: 80, textAlign: 'right' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.md,
    height: ROW_HEIGHT,
    borderTopWidth: RNStyleSheet.hairlineWidth,
    gap: space.sm,
  },
  rowCompactOuter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    minHeight: ROW_HEIGHT_COMPACT,
    borderTopWidth: RNStyleSheet.hairlineWidth,
    gap: space.sm,
  },
  merchantStack: { flex: 1, minWidth: 0, gap: 2, justifyContent: 'center' },
  merchantLine: { fontWeight: '800' },
  catSub: { fontFamily: font.sans, fontSize: 11, fontWeight: '600' },
  cell: { fontFamily: font.sans, fontSize: 13 },
  merchant: { flex: 1.4, fontWeight: '700' },
  cat: { flex: 1 },
  date: { width: 104 },
  dateCompact: { width: 76, fontSize: 12 },
  amt: { width: 104, textAlign: 'right', fontVariant: ['tabular-nums'] },
  amtCompact: { width: 80, textAlign: 'right', fontSize: 13, fontVariant: ['tabular-nums'] },
  emptyInline: { padding: space.lg, fontFamily: font.sans, fontSize: 14, textAlign: 'center' },
});
