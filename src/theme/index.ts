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
    },
    Modal: {
      baseStyle: {
        dialog: {
          maxWidth: '50vw',
          minWidth: '50vw',
          fontSize: '2em',
          bg: 'rgba(86, 86, 86, 0.7)',
        },
        header: {
          fontSize: '1,5em',
          bg: 'rgba(201, 212, 234, 0.4)'
        },
        body: {
          padding: '0px'
        }
      }
    }
  },
});

export default theme;