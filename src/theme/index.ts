import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundImage: 'radial-gradient(#C9D4EA, #F0D9CC)',
      }
    }
  },
  fonts: {
    heading: `Gilroy, ${base.fonts?.heading}`,
    body: `Gilroy, ${base.fonts?.body}`,
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
          fontSize: '2em',
          bg: 'rgba(86, 86, 86)',
        },
        header: {
          fontSize: '1,5em',
          bg: 'rgba(201, 212, 234, 0.4)'
        },
        body: {
          padding: '0px'
        }
      },
      variants: {
        auth: (props: any) => ({
          dialog: {
            bg: 'rgba(86, 86, 86, 0.9)',
          }
        }),
        movie: (props: any) => ({
          dialog: {
            minWidth: '30vw',
            maxWidth: '35em',
          },
          body: {
            minWidth: '30vw',
            maxWidth: '35em'
          }
        })
      }
    },
    Text: {
      variants: {
        button: (props: any) => ({
          _hover: {
            cursor: 'pointer',
          }
        }),
      }
    }
  },
});

export default theme;