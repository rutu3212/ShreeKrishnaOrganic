import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext(null);

// Srikrishn Organics Theme
const themes = {
  olive: {
    name: "Olive",
    colors: {
      primary: "#56663D",
      primaryDark: "#465532",
      primaryLight: "#E4EBD9",

      secondary: "#9A7B2F",
      secondaryLight: "#F3E8C8",

      brown: "#765A3A",
      brownLight: "#EEE4D7",

      background: "#F7F5EF",
      surface: "#FFFFFF",

      text: "#29321F",
      textMuted: "#777568",

      border: "#E6E1D8",

      success: "#56663D",
      danger: "#A6533D",
      dangerDark: "#8F4534",
    },
  },

  earthy: {
    name: "Earthy",
    colors: {
      primary: "#6B705C",
      primaryDark: "#525745",
      primaryLight: "#E5E6DD",

      secondary: "#A98467",
      secondaryLight: "#F1E5DA",

      brown: "#805B3D",
      brownLight: "#EDE1D6",

      background: "#F7F3EC",
      surface: "#FFFFFF",

      text: "#34352C",
      textMuted: "#78786D",

      border: "#E2DDD3",

      success: "#6B705C",
      danger: "#A6533D",
      dangerDark: "#8F4534",
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(
        "srikrishn_theme"
      );

      return savedTheme && themes[savedTheme]
        ? savedTheme
        : "olive";
    } catch (error) {
      console.error("Failed to load theme:", error);
      return "olive";
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem(
        "srikrishn_dark_mode"
      );

      return savedMode === "true";
    } catch (error) {
      return false;
    }
  });

  const currentTheme = themes[themeName];

  // Save theme
  useEffect(() => {
    localStorage.setItem(
      "srikrishn_theme",
      themeName
    );
  }, [themeName]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem(
      "srikrishn_dark_mode",
      String(isDarkMode)
    );
  }, [isDarkMode]);

  // Apply theme variables to root
  useEffect(() => {
    const root = document.documentElement;
    const colors = currentTheme.colors;

    root.style.setProperty(
      "--color-primary",
      colors.primary
    );

    root.style.setProperty(
      "--color-primary-dark",
      colors.primaryDark
    );

    root.style.setProperty(
      "--color-primary-light",
      colors.primaryLight
    );

    root.style.setProperty(
      "--color-secondary",
      colors.secondary
    );

    root.style.setProperty(
      "--color-secondary-light",
      colors.secondaryLight
    );

    root.style.setProperty(
      "--color-brown",
      colors.brown
    );

    root.style.setProperty(
      "--color-brown-light",
      colors.brownLight
    );

    root.style.setProperty(
      "--color-background",
      colors.background
    );

    root.style.setProperty(
      "--color-surface",
      colors.surface
    );

    root.style.setProperty(
      "--color-text",
      colors.text
    );

    root.style.setProperty(
      "--color-text-muted",
      colors.textMuted
    );

    root.style.setProperty(
      "--color-border",
      colors.border
    );

    root.style.setProperty(
      "--color-success",
      colors.success
    );

    root.style.setProperty(
      "--color-danger",
      colors.danger
    );

    root.style.setProperty(
      "--color-danger-dark",
      colors.dangerDark
    );

    root.setAttribute(
      "data-theme",
      themeName
    );

    root.setAttribute(
      "data-mode",
      isDarkMode ? "dark" : "light"
    );
  }, [currentTheme, themeName, isDarkMode]);

  // Change theme
  const changeTheme = (newTheme) => {
    if (!themes[newTheme]) {
      console.warn(
        `Theme "${newTheme}" does not exist.`
      );
      return;
    }

    setThemeName(newTheme);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Enable light mode
  const enableLightMode = () => {
    setIsDarkMode(false);
  };

  // Enable dark mode
  const enableDarkMode = () => {
    setIsDarkMode(true);
  };

  const value = useMemo(
    () => ({
      // Current theme
      themeName,
      currentTheme,

      // All available themes
      themes,

      // Mode
      isDarkMode,

      // Functions
      changeTheme,
      toggleDarkMode,
      enableLightMode,
      enableDarkMode,
    }),
    [
      themeName,
      currentTheme,
      isDarkMode,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};

export default ThemeContext;