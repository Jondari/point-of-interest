import { useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage, supportedLanguages } from '../locales';
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from '../constants/theme';

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const anchorRef = useRef<View>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    right: 0,
  });

  const languageCode = (i18n.resolvedLanguage ?? i18n.language).split('-')[0];
  const currentLanguage =
    supportedLanguages.find(({ code }) => code === languageCode) ??
    supportedLanguages[0];

  const selectLanguage = async (language: string) => {
    await changeLanguage(language);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    anchorRef.current?.measureInWindow((x, y, width, height) => {
      setMenuPosition({
        top: y + height + spacing.xs,
        right: Math.max(
          spacing.sm,
          Dimensions.get('window').width - x - width
        ),
      });
      setIsOpen(true);
    });
  };

  return (
    <>
      <View ref={anchorRef} collapsable={false}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleMenu}
          accessibilityRole="button"
          accessibilityLabel={`${t('settings.changeLanguage')}: ${t(
            currentLanguage.label
          )}`}
          accessibilityState={{ expanded: isOpen }}
        >
          <Text style={styles.buttonText}>{currentLanguage.shortLabel}</Text>
          <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.overlay}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setIsOpen(false)}
          />
          <View
            style={[
              styles.menu,
              {
                top: menuPosition.top,
                right: menuPosition.right,
              },
            ]}
          >
            {supportedLanguages.map((language) => {
              const isSelected = language.code === currentLanguage.code;

              return (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.option,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => selectLanguage(language.code)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {t(language.label)}
                  </Text>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  buttonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  chevron: {
    color: colors.primary,
    fontSize: fontSize.xs,
  },
  menu: {
    position: 'absolute',
    minWidth: 180,
    paddingVertical: spacing.xs,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 1,
  },
  option: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  selectedOption: {
    backgroundColor: colors.surface,
  },
  optionText: {
    color: colors.text,
    fontSize: fontSize.sm,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
  checkmark: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
});
