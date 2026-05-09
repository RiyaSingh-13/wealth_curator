import { ChevronRight, Flag } from 'lucide-react';
import { memo, useId, useMemo } from 'react';
import { Pressable, StyleSheet as RNStyleSheet, Text, View } from 'react-native-web';
import { IconGlyph } from '../../../components/icons/IconGlyph.jsx';
import { font, radii, space } from '../../../theme';

const GOALS = [
  {
    id: 'emergency',
    name: 'Emergency Fund',
    target: 200000,
    current: 120000,
    monthsLeft: 8,
    monthlyContrib: [12000, 11000, 14000, 15000, 16000, 15500],
  },
  {
    id: 'car',
    name: 'Car Upgrade',
    target: 600000,
    current: 180000,
    monthsLeft: 18,
    monthlyContrib: [8000, 9000, 10000, 9500, 11000, 12000],
  },
  {
    id: 'vacation',
    name: 'Europe Trip',
    target: 300000,
    current: 90000,
    monthsLeft: 12,
    monthlyContrib: [5000, 7000, 6500, 8000, 9000, 9500],
  },
];

function formatInr(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function CircleProgress({ pct, size = 56, stroke = 8, color, trackColor, textColor }) {
  const uid = useId().replace(/:/g, '');
  const r = (size - stroke) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, pct));
  const dash = (clamped / 100) * circ;
  const dashOffset = circ - dash;
  return (
    <View style={styles.circleWrap} accessibilityLabel={`Progress ${clamped} percent`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`g-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.7} />
            <stop offset="100%" stopColor={color} stopOpacity={1} />
          </linearGradient>
        </defs>
        <circle cx={c} cy={c} r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle
          cx={c}
          cy={c}
          r={r}
          stroke={`url(#g-${uid})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${c} ${c})`}
        />
      </svg>
      <View style={styles.circleCenter} pointerEvents="none">
        <Text style={[styles.circlePct, { color: textColor }]}>{clamped}%</Text>
      </View>
    </View>
  );
}

function MonthlyTrend({ values, colors }) {
  const max = useMemo(() => Math.max(...values, 1), [values]);
  const avg = useMemo(() => values.reduce((a, b) => a + b, 0) / Math.max(1, values.length), [values]);
  const last = values[values.length - 1] ?? 0;
  const prev = values[values.length - 2] ?? last;
  const deltaPct = prev === 0 ? 0 : ((last - prev) / prev) * 100;
  const deltaStr = `${deltaPct >= 0 ? '+' : ''}${deltaPct.toFixed(0)}%`;
  return (
    <View style={styles.trendWrap} accessibilityLabel="Monthly contribution trend">
      <View style={styles.trendHeader}>
        <Text style={[styles.trendLabel, { color: colors.textMuted }]}>Monthly contribution trend</Text>
        <Text style={[styles.trendDelta, { color: deltaPct >= 0 ? colors.positive : colors.negative }]}>
          {deltaStr}
        </Text>
      </View>
      <View style={[styles.trendBars, { borderColor: colors.border, backgroundColor: colors.bgMuted }]}>
        {values.map((v, i) => (
          <View key={`${i}-${v}`} style={styles.trendBarSlot}>
            <View
              style={[
                styles.trendBar,
                {
                  height: `${Math.max(12, Math.round((v / max) * 100))}%`,
                  backgroundColor: colors.accent,
                  opacity: i === values.length - 1 ? 1 : 0.55,
                },
              ]}
            />
          </View>
        ))}
      </View>
      <Text style={[styles.trendMeta, { color: colors.textSecondary }]}>
        Avg: {formatInr(Math.round(avg))} · Latest: {formatInr(last)}
      </Text>
    </View>
  );
}

export const DocumentsSection = memo(function GoalsSection({ colors }) {
  return (
    <View nativeID="section-goals" style={styles.wrap}>
      <View style={styles.headingRow} accessibilityRole="header">
        <IconGlyph icon={Flag} size={24} color={colors.accent} strokeWidth={2} />
        <Text style={[styles.title, { color: colors.text }]} accessibilityRole="text">
          Goals
        </Text>
      </View>
      <Text style={[styles.sub, { color: colors.textMuted }]}>
        Track each financial goal with clear progress, deadlines, and how much is left to reach your target.
      </Text>
      <View style={[styles.list, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
        {GOALS.map((goal) => {
          const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const remaining = Math.max(0, goal.target - goal.current);
          return (
            <Pressable
              key={goal.id}
              accessibilityRole="button"
              accessibilityLabel={`${goal.name} goal details`}
              style={({ pressed, hovered }) => [
                styles.row,
                { borderBottomColor: colors.border, backgroundColor: colors.bgElevated },
                hovered && { backgroundColor: colors.bgMuted },
                pressed && { opacity: 0.92 },
              ]}
            >
              <View style={styles.rowMain}>
                <View style={styles.goalTopRow}>
                  <View style={styles.goalTitleBlock}>
                    <Text style={[styles.goalTitle, { color: colors.text }]} numberOfLines={2}>
                      {goal.name}
                    </Text>
                    <Text style={[styles.meta, { color: colors.textMuted }]}>
                      {formatInr(goal.current)} / {formatInr(goal.target)}
                    </Text>
                  </View>
                  <CircleProgress
                    pct={pct}
                    color={colors.accent}
                    trackColor={colors.border}
                    textColor={colors.text}
                  />
                </View>

                <View style={[styles.progressTrack, { backgroundColor: colors.bgMuted }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${pct}%`,
                        backgroundColor: colors.accent,
                      },
                    ]}
                  />
                </View>

                <View style={styles.goalMetaRow}>
                  <Text style={[styles.metaStrong, { color: colors.text }]}>
                    {pct}% completed
                  </Text>
                  <Text style={[styles.metaStrong, { color: colors.textSecondary }]}>
                    Remaining: {formatInr(remaining)}
                  </Text>
                  <Text style={[styles.metaStrong, { color: colors.textSecondary }]}>
                    {goal.monthsLeft} months left
                  </Text>
                </View>

                {/* <MonthlyTrend values={goal.monthlyContrib} colors={colors} /> */}
              </View>
              <View style={styles.rowRight}>
                <IconGlyph icon={ChevronRight} size={18} color={colors.textMuted} />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});

const styles = RNStyleSheet.create({
  wrap: { gap: space.sm },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm, flexWrap: 'wrap' },
  title: { fontFamily: font.serif, fontSize: 26 },
  sub: { fontFamily: font.sans, fontSize: 14, lineHeight: 20, maxWidth: 720 },
  list: { borderWidth: 1, borderRadius: radii.lg, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    borderBottomWidth: RNStyleSheet.hairlineWidth,
  },
  rowMain: { flex: 1, gap: 4, minWidth: 0 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: space.sm, flexShrink: 0 },
  goalTitle: { fontFamily: font.sans, fontSize: 14, fontWeight: '700' },
  meta: { fontFamily: font.sans, fontSize: 12 },
  metaStrong: { fontFamily: font.sans, fontSize: 12, fontWeight: '700' },
  goalTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.md },
  goalTitleBlock: { flex: 1, minWidth: 0, gap: 2 },
  circleWrap: { width: 56, height: 56, position: 'relative', flexShrink: 0 },
  circleCenter: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  circlePct: { fontFamily: font.sans, fontSize: 12, fontWeight: '900', letterSpacing: 0.2, fontVariant: ['tabular-nums'] },
  progressTrack: {
    height: 8,
    borderRadius: radii.pill,
    overflow: 'hidden',
    marginTop: space.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: radii.pill,
  },
  goalMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginTop: 2 },
  trendWrap: { gap: space.xs, marginTop: space.sm },
  trendHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: space.md },
  trendLabel: { fontFamily: font.sans, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase' },
  trendDelta: { fontFamily: font.sans, fontSize: 12, fontWeight: '900', fontVariant: ['tabular-nums'] },
  trendBars: {
    height: 56,
    borderRadius: radii.md,
    borderWidth: 1,
    paddingHorizontal: space.sm,
    paddingVertical: space.sm,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    overflow: 'hidden',
  },
  trendBarSlot: { flex: 1, height: '100%', justifyContent: 'flex-end' },
  trendBar: { width: '100%', borderRadius: 6 },
  trendMeta: { fontFamily: font.sans, fontSize: 12 },
});
