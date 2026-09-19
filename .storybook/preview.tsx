import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from '@mui/material/styles'
import { createLostpointerTheme, type ThemeName } from '../packages/mui/src/index.js'
import '../packages/styles/src/index.css'
import '../packages/react/src/styles.css'

const preview: Preview = {
  parameters: {
    viewport: {
      options: {
        mobile: { name: 'Mobile (390px)', styles: { width: '390px', height: '844px' }, type: 'mobile' },
        tablet: { name: 'Tablet (1024px)', styles: { width: '1024px', height: '768px' }, type: 'tablet' },
        desktop: { name: 'Desktop (1440px)', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
      },
    },
  },
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
      // React primitives must also render independently of MUI context.
      if (context.title.startsWith('React/')) return <Story />
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
