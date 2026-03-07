import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.yourcompany.patientcompanion',
  appName: 'Patient Companion',
  webDir: 'out',
  server: {
    url: 'https://patient-companion-app-delta.vercel.app',
    cleartext: false,
  },
}

export default config
