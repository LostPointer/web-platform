import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from '@mui/material/styles'
import { createLostpointerTheme, type ThemeName } from '../packages/mui/src/index.js'
import '../packages/styles/src/index.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Lostpointer theme mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.theme as ThemeName | undefined) ?? 'light'
      document.documentElement.setAttribute('data-lp-theme', mode)
      const theme = createLostpointerTheme({ mode })

      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      )
    },
  ],
}

export default preview
