import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zenchess.app',
  appName: 'Zen Chess',
  webDir: 'dist',
  server: {
    // Use this for local development - comment out for production
    // url: 'http://192.168.1.X:5173',
    // cleartext: true,
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    backgroundColor: '#161512'
  },
  android: {
    backgroundColor: '#161512',
    allowMixedContent: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#161512',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#161512'
    }
  }
};

export default config;
