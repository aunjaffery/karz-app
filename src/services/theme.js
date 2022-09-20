export const customColors = {
  bg: {
    100: "#f5f5f7",
    200: "#0f1319",
  },
  dark: {
    100: "#161c2c", //bg
    200: "#252a41", //fg
    300: "#3f69ff", //blue btn
    400: "#2d3751",
  },
};

export const customComponents = {
  Button: {
    variants: {
      base: {},
      addition: {
        bg: "dark.200",
        color: "green.400",
        _hover: {
          bg: "green.500",
          color: "white",
        },
        _active: {
          bg: "green.600",
          color: "white",
        },
      },
      danger: {
        bg: "red.500",
        color: "white",
        _hover: {
          bg: "red.600",
        },
        _active: {
          bg: "red.700",
        },
      },
      success: {
        bg: "dark.300",
        color: "white",
        _hover: {
          bg: "#264fe1",
        },
        _active: {
          bg: "#2042bb",
        },
      },
      grass: {
        bg: "green.500",
        color: "white",
        _hover: {
          bg: "green.600",
        },
        _active: {
          bg: "green.700",
        },
      },
    },
  },
};

export const customFonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Rubik'`,
};

export const customConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
