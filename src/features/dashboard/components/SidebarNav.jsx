import { ArrowRightLeft, Building2, Flag, LayoutDashboard, Sparkles, Target } from 'lucide-react';
import { memo, useCallback, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet as RNStyleSheet, Text, View, useWindowDimensions } from 'react-native-web';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconGlyph } from '../../../components/icons/IconGlyph.jsx';
import { font, radii, space } from '../../../theme';
import { pathForSectionKey, sectionKeyFromParam } from '../routePaths.js';

const ITEMS = [
  { key: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'portfolio', label: 'Accounts', icon: Building2 },
  { key: 'cashflow', label: 'Transactions', icon: ArrowRightLeft },
  { key: 'budgets', label: 'Budgets', icon: Target },
  { key: 'insights', label: 'Insights', icon: Sparkles },
  { key: 'goals', label: 'Goals', icon: Flag },
];

export const SidebarNav = memo(function SidebarNav({ colors, onRequestClose }) {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const location = useLocation();
  const narrow = width < 1024;
  const wrapNav = narrow && width < 520;
  const isMobile = width < 768;

  const pathSegment = useMemo(
    () => location.pathname.replace(/^\//, '').split('/')[0] || 'dashboard',
    [location.pathname],
  );
  const activeNav = sectionKeyFromParam(pathSegment) ?? 'overview';

  const item = useCallback(
    ({ key, label, icon: NavIcon }) => {
      const active = activeNav === key;
      return (
        <Pressable
          key={key}
          onPress={() => {
            navigate(pathForSectionKey(key));
            onRequestClose?.();
          }}
          accessibilityRole="button"
          accessibilityState={{ selected: active }}
          accessibilityLabel={label}
          style={({ hovered, pressed }) => [
            styles.row,
            narrow ? styles.rowCompact : styles.rowWide,
            !narrow && { borderLeftColor: active ? colors.accent : 'transparent' },
            narrow && active && { borderBottomColor: colors.accent, borderBottomWidth: 2 },
            narrow && !active && { borderBottomColor: 'transparent', borderBottomWidth: 2 },
            !narrow && active && { backgroundColor: colors.navActiveBg },
            hovered && !active && { backgroundColor: colors.bgMuted },
            pressed && { opacity: 0.92 },
          ]}
        >
          <IconGlyph
            icon={NavIcon}
            size={20}
            color={active ? colors.accent : colors.textMuted}
            strokeWidth={2}
          />
          <Text style={[styles.label, { color: active ? colors.text : colors.textSecondary }]} numberOfLines={1}>
            {label}
          </Text>
        </Pressable>
      );
    },
    [activeNav, colors.accent, colors.navActiveBg, colors.bgMuted, colors.text, colors.textMuted, colors.textSecondary, narrow, navigate, onRequestClose],
  );

  const body = ITEMS.map((it) => item(it));

  return (
    <View
      style={[styles.shell, narrow ? styles.shellCompact : styles.shellWide, { backgroundColor: colors.sidebarBg, borderColor: colors.border }]}
      accessibilityRole="navigation"
      accessibilityLabel="Primary"
    >
      <Pressable
        onPress={() => navigate('/dashboard')}
        style={[styles.brand, narrow && styles.brandCompact]}
        accessibilityRole="link"
        accessibilityLabel="Wealth Curator home"
      >
        <View style={[styles.logoMark, { backgroundColor: colors.accent }]} />
        <View>
          <Text style={[styles.brandTitle, { color: colors.text }]}>Wealth Curator</Text>
          <Text style={[styles.brandTag, { color: colors.textMuted }]}>The wealth curator</Text>
        </View>
      </Pressable>

      {isMobile ? (
        <View style={styles.mobileNavContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mobileNavContent}
            style={styles.mobileNavScroll}
          >
            {body}
          </ScrollView>
        </View>
      ) : narrow ? (
        wrapNav ? (
          <View style={styles.navWrap}>{body}</View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalNav}>
            {body}
          </ScrollView>
        )
      ) : (
        <View style={styles.navStack}>{body}</View>
      )}

      {!narrow ? (
        <View style={styles.footer}>
          <Text style={[styles.footerLabel, { color: colors.textMuted }]}>Institutional grade</Text>
          <View style={[styles.secureBadge, { borderColor: colors.border }]}>
            <Text style={[styles.secureText, { color: colors.accent }]}>Proton secured</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
});

const styles = RNStyleSheet.create({
  shell: {
    flexShrink: 0,
    borderBottomWidth: RNStyleSheet.hairlineWidth,
  },
  shellWide: {
    width: 268,
    minHeight: '100vh',
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingTop: space.lg,
    paddingBottom: space.lg,
  },
  shellCompact: {
    width: '100%',
    paddingTop: space.md,
    paddingBottom: space.sm,
    paddingHorizontal: space.sm,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    marginBottom: space.lg,
    paddingHorizontal: space.lg,
  },
  brandCompact: {
    marginBottom: space.md,
    paddingHorizontal: space.sm,
    alignSelf: 'stretch',
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
  },
  brandTitle: {
    fontFamily: font.sans,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  brandTag: {
    fontFamily: font.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  navStack: {
    gap: space.xxs,
    paddingHorizontal: space.md,
    flex: 1,
  },
  horizontalNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    paddingBottom: space.sm,
    paddingHorizontal: space.xs,
    flexGrow: 0,
  },
  navWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space.xs,
    paddingBottom: space.sm,
    paddingHorizontal: space.xxs,
  },
  mobileNavContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent',
  },
  mobileNavContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
  },
  mobileNavScroll: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    borderLeftWidth: 3,
  },
  rowWide: {
    paddingVertical: space.sm + 2,
    paddingHorizontal: space.md,
    borderRadius: radii.md,
  },
  rowCompact: {
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radii.pill,
    minWidth: 100,
    maxWidth: 140,
  },
  label: { fontFamily: font.sans, fontSize: 14, fontWeight: '600' },
  footer: {
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    gap: space.sm,
  },
  footerLabel: {
    fontFamily: font.sans,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  secureBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: space.sm,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  secureText: {
    fontFamily: font.sans,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
