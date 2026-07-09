import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.algoquest.app',
  appName: 'AlgoQuest',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
