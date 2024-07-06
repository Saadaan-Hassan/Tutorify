# Tutorify

Tutorify is a mobile application designed to connect students and tutors. This app allows students to find tutors based on their subjects of interest and facilitates communication between students and tutors.

## Features

- **User Profiles:** Students and tutors can create and manage their profiles.
- **Search Functionality:** Students can search for tutors based on subjects.
- **Map Integration:** Tutors and students can view each other's locations on a map.
- **Push Notifications:** Get notified about new messages and user activities.
- **Onboarding Experience:** Users get a guided tour of the app features on their first visit.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **React Native:** For building the mobile app.
- **Expo:** For development and build tools.
- **Firebase:** For backend services including authentication and storage.
- **Mapbox:** For map and location services.
- **Yarn:** For dependency management.
- **EAS (Expo Application Services):** For building and deploying the app.

## Installation

To get started with Tutorify, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Saadaan-Hassan/Tutorify.git
   cd tutorify
   ```

2. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed. Then, run:

   ```bash
   yarn install
   ```

## Configuration

### 1. Set Up Firebase

Create a Firebase project and obtain the configuration details from the Firebase Console. Follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project, select the platform as "Web," and register the app.
3. Navigate to "Project Settings" and find your Firebase configuration details.
4. Add the following environment variables to your `.env` file in the project root directory:

   ```env
   FIREBASE_API_KEY=your-firebase-api-key
   FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   FIREBASE_APP_ID=your-firebase-app-id
   ```

### 2. Set Up Mapbox

Create a Mapbox account and obtain your Mapbox API access token:

1. Go to the [Mapbox website](https://www.mapbox.com/).
2. Sign up for an account or log in to your existing account.
3. Go to the "Tokens" section and create a new access token.
4. Copy the access token and add it to your `.env` file:

   ```env
   RN_MAPBOX_ACCESS_TOKEN=your-rn-mapbox-access-token
   ```

5. Copy the public token and add it to your `.env` file:

   ```env
   RN_MAPBOX_MAPS_DOWNLOAD_TOKEN=your-rn-mapbox-maps-public-token
   ```

### 3. Set Up Expo Updates

1. Go to the [Expo website](https://expo.dev/).
2. Log in to your Expo account, click the Profile icon, and go to the "Projects" section.
3. Create a new project.
4. Obtain your EAS project ID and add it to your `.env` file:

   ```env
   EAS_PROJECT_ID=your-eas-project-id
   ```

5. Run the following commands in your project root directory:

   ```bash
   npm install --global eas-cli
   eas login
   eas init --id your-eas-project-id
   ```

6. Run the following command to upload the .env file to EAS:

   ```bash
   eas secret:push --scope project --env-file ./.env
   ```

## Running the App

Before running the app, you need to create a development build. Follow these steps:

1. **Build a Development Client**

   ```bash
   eas build --profile development --platform android
   eas build --profile development --platform ios
   ```

   Install the resulting development build on your device or emulator.

2. **Start the Development Server**

   ```bash
   yarn start
   ```

3. **Run on Android Emulator**

   ```bash
   yarn android
   ```

4. **Run on iOS Simulator**

   ```bash
   yarn ios
   ```

## Building the App

To create a production build of the app:

1. **Build for Android**

   ```bash
   eas build --platform android
   ```

2. **Build for iOS**

   ```bash
   eas build --platform ios
   ```

## Contributing

We welcome contributions to Tutorify! If you have suggestions or want to help improve the project, please follow these guidelines:

1. **Fork the Repository** and create a new branch for your changes.
2. **Make Your Changes** and ensure that your code follows the existing style and guidelines.
3. **Write Tests** for your changes if applicable.
4. **Submit a Pull Request** with a clear description of your changes.

For more details, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [GPL-3.0 License](LICENSE).
