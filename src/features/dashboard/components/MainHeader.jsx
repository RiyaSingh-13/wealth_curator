import { Moon, PanelLeftClose, PanelLeftOpen, Search, Sun } from 'lucide-react';
import { memo } from 'react';
import { Pressable, StyleSheet as RNStyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native-web';
import { IconGlyph } from '../../../components/icons/IconGlyph.jsx';
import { font, radii, space } from '../../../theme';

export const MainHeader = memo(function MainHeader({
  colors,
  mode,
  query,
  onQueryChange,
  onSearchFocus,
  onToggleTheme,
  user,
  onProfileAvatarPress,
  sidebarOpen,
  onToggleSidebar,
}) {
  const { width } = useWindowDimensions();
  const compact = width < 720;
  const narrow = width < 400;

  const clientSubtitle = (user.planTier || 'Private client').split('·')[0]?.trim() || 'Private client';

  return (
    <View
      style={[
        styles.shell,
        narrow && styles.shellNarrow,
        { backgroundColor: colors.bg, borderBottomColor: colors.border },
      ]}
      accessibilityRole="header"
    >
      <View style={[styles.topRow, compact && styles.topRowStack]}>
        <View style={[styles.leadActions, compact && { width: '100%' }]}>
          {onToggleSidebar ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              onPress={onToggleSidebar}
              style={({ hovered, pressed }) => [
                styles.iconBtn,
                { borderColor: colors.border, backgroundColor: colors.bgElevated },
                hovered && styles.hover,
                pressed && styles.pressed,
              ]}
            >
              <IconGlyph icon={sidebarOpen ? PanelLeftClose : PanelLeftOpen} size={22} color={colors.text} />
            </Pressable>
          ) : null}
          {/* <View style={[styles.searchWrap, compact && styles.searchGrow]}>
            <View style={styles.searchIconSlot} pointerEvents="none">
              <IconGlyph icon={Search} size={18} color={colors.textMuted} />
            </View>
            <TextInput
              value={query}
              onChangeText={onQueryChange}
              onFocus={() => onSearchFocus?.()}
              placeholder="Search portfolios…"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.search,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.bgElevated,
                },
              ]}
              accessibilityLabel="Search"
              returnKeyType="search"
            />
          </View> */}
          <view> 
            <text style={{color: colors.text, fontSize: 20, fontWeight: '700', textTransform: 'uppercase', fontStyle: 'BOLD'}}>
            WELCOME BACK ALAXANDRA!
            </text>
            <br />
          {/* <Text  style={{color: colors.text, fontSize: 14, fontWeight: '400' ,fontStyle: 'italic'}}>It is the best time to manage you finance</Text> */}
          </view>
          
        </View>

        <View style={[styles.rightCluster, compact && styles.rightClusterWide]}>
         
         
          <Pressable
            onPress={onToggleTheme}
            accessibilityRole="button"
            accessibilityLabel={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={({ hovered, pressed }) => [
              styles.iconBtn,
              { borderColor: colors.border, backgroundColor: colors.bgElevated },
              hovered && styles.hover,
              pressed && styles.pressed,
            ]}
          >
            <IconGlyph icon={mode === 'dark' ? Sun : Moon} size={20} color={colors.text} strokeWidth={2.25} />
          </Pressable>
          <Pressable
            onPress={onProfileAvatarPress}
            accessibilityRole="button"
            accessibilityLabel={`Profile: ${user.name}`}
            style={({ hovered, pressed }) => [styles.userBlock, hovered && styles.hover, pressed && styles.pressed]}
          >
            <View style={[styles.avatar, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
              <Text style={[styles.avatarText, { color: colors.text }]}>{user.initials}</Text>
            </View>
            {!compact ? (
              <View style={styles.userText}>
                <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
                  {user.name}
                </Text>
                <Text style={[styles.userSub, { color: colors.textMuted }]} numberOfLines={1}>
                  {clientSubtitle.toUpperCase()}
                </Text>
              </View>
            ) : null}
          </Pressable>
        </View>
      </View>
    </View>
  );
});

const styles = RNStyleSheet.create({
  shell: {
    borderBottomWidth: 1,
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: 0,
  },
  shellNarrow: {
    paddingHorizontal: space.md,
    paddingTop: space.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
    marginBottom: space.sm,
    flexWrap: 'wrap',
  },
  topRowStack: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  leadActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    flexGrow: 1,
    minWidth: 200,
    maxWidth: 560,
  },
  searchGrow: {
    flex: 1,
    maxWidth: '100%',
    minWidth: 0,
  },
  searchWrap: {
    position: 'relative',
    flexGrow: 1,
    minWidth: 160,
    justifyContent: 'center',
  },
  searchIconSlot: {
    position: 'absolute',
    left: 14,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
  },
  search: {
    width: '100%',
    borderWidth: 1,
    borderRadius: radii.md,
    paddingLeft: 44,
    paddingRight: space.md,
    paddingVertical: 12,
    fontFamily: font.sans,
    /* 16px avoids iOS Safari zooming focused inputs */
    fontSize: 16,
    outlineStyle: 'none',
  },
  rightCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  rightClusterWide: {
    width: '100%',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: radii.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBlock: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: font.sans, fontSize: 14, fontWeight: '700' },
  userText: { maxWidth: 160 },
  userName: { fontFamily: font.sans, fontSize: 14, fontWeight: '800' },
  userSub: { fontFamily: font.sans, fontSize: 10, fontWeight: '700', letterSpacing: 1.4, marginTop: 2 },
  hover: { opacity: 0.95 },
  pressed: { opacity: 0.88 },
});
