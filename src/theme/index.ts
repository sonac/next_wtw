import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        background: 'linear-gradient(169.34deg, #C9D4EA -1.32%, #F0D9CC 92.08%)',
      }
    }
  },
  fonts: {
    heading: `Marvel, ${base.fonts?.heading}`,
    body: `Marvel, ${base.fonts?.body}`,
  },
  components: {
    Drawer: {
      baseStyle: {
        dialog: {
          bg: 'linear-gradient(169.34deg, #C9D4EA -1.32%, #F0D9CC 92.08%)',
        }
      }
    }
  },
});

export default theme;