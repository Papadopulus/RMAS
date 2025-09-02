# RMAS Project

RMAS (Problem Reporting and Mapping Application System) is a React Native mobile application that allows users to report and view community problems on an interactive map. Users can submit problems with photos, descriptions, and location data, while also viewing and filtering problems reported by others in their area.

## Features

- 🗺️ **Interactive Map View** - View all reported problems on a Google Maps interface
- 📍 **Location-Based Problem Reporting** - Add problems by selecting locations on the map
- 📷 **Photo Upload** - Attach images to problem reports using camera or gallery
- 🏷️ **Problem Categorization** - Organize problems by category for easy filtering
- 🔍 **Advanced Filtering** - Filter problems by category, date range, user, and radius
- 👤 **User Authentication** - Secure login/registration with Firebase Auth
- 📊 **User Rankings** - View user rankings based on problem reporting activity
- 📱 **My Problems** - Track and manage your own reported problems
- 🔧 **Account Management** - Manage user profile and settings

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI**: Install globally with `npm install -g @expo/cli`
- **Git**
- **Android Studio** (for Android development) or **Xcode** (for iOS development)
- **Expo Go app** on your mobile device (for testing)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Papadopulus/RMAS.git
   cd RMAS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Firebase Configuration

This project uses Firebase for authentication, database, and storage. You'll need to set up your own Firebase project:

1. **Create a Firebase project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication, Firestore Database, and Storage

2. **Configure Firebase for React Native**
   - Add an Android app to your Firebase project
   - Download the `google-services.json` file
   - Add an iOS app to your Firebase project  
   - Download the `GoogleService-Info.plist` file

3. **Update Firebase configuration**
   - Update the `firebaseConfig.js` file with your Firebase project credentials
   - Replace the existing configuration with your project's config object

4. **Enable Authentication providers**
   - In Firebase Console, go to Authentication > Sign-in method
   - Enable Email/Password authentication

5. **Set up Firestore rules**
   - Configure appropriate security rules for your Firestore database

## Google Maps Configuration

The app uses Google Maps for the map functionality:

1. **Get a Google Maps API key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps SDK for Android/iOS
   - Create an API key

2. **Update the API key**
   - Update `app.json` with your Google Maps API key in the `android.googleMapsApiKey` field

## How to Run the Project

### Development Mode

1. **Start the Expo development server**
   ```bash
   npm start
   # or
   expo start
   ```

2. **Run on different platforms**
   ```bash
   # Run on Android device/emulator
   npm run android
   # or
   expo start --android

   # Run on iOS device/simulator (macOS only)
   npm run ios
   # or
   expo start --ios

   # Run in web browser
   npm run web
   # or
   expo start --web
   ```

3. **Using Expo Go app**
   - Install Expo Go on your mobile device
   - Scan the QR code displayed in the terminal or Expo DevTools
   - The app will load on your device

### Production Build

For production builds, you'll need to use EAS Build or configure the project for standalone builds:

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure and build
eas build --platform android
eas build --platform ios
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator (macOS only)
- `npm run web` - Run in web browser

## Project Structure

```
RMAS/
├── App.js                 # Main app component
├── app.json              # Expo configuration
├── firebaseConfig.js     # Firebase configuration
├── package.json          # Dependencies and scripts
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React context providers
│   ├── global/           # Global styles and data
│   ├── navigation/       # Navigation configuration
│   ├── reducers/         # State management
│   └── screens/          # App screens
│       ├── AddProblemScreen.js
│       ├── HomeScreen.js
│       ├── MyAccountScreen.js
│       ├── MyProblemsScreen.js
│       ├── ProblemsMapScreen.js
│       ├── RankingListScreen.js
│       └── authScreens/  # Authentication screens
└── assets/               # Images and static assets
```

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **Firebase** - Backend services (Auth, Firestore, Storage)
- **React Navigation** - Navigation library
- **Google Maps** - Map functionality
- **React Native Elements** - UI component library
- **Expo Camera** - Camera functionality
- **Expo Image Picker** - Image selection
- **Expo Location** - Location services

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Expo CLI issues**
   ```bash
   npm install -g @expo/cli@latest
   ```

4. **Android build issues**
   - Make sure Android Studio is properly installed
   - Check that the Android SDK is configured correctly

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information about the problem