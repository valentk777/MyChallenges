# ChallengeTracker
This is a mobile app with ReactNative for creating and tracing your challenges

## Tech stack:

- Node.Js v18.14.0
- npm 9.5.1
- Java 19.0.2

## Setting up environment:

- `git lfs install` (used for large files)
- Install Node.Js v18.14.0
- Install Android studio

## Start an app

`npx react-native start`
`npm run android`

## Rename bundle
`npm install react-native-rename -g`
`npx react-native-rename@latest "Challenge Tracker" -b com.baitupasaulis.challengetracker`

## Versioning
`npm install -g react-native-version`
change version in packages.json. then run command
`react-native-version --never-amend`

## Release

### Andoid Play Store
To release an application run this command under androind folder
`./gradlew bundleRelease`
Bundle appear in ...\ChallengeTracker\android\app\build\outputs\bundle\release
https://play.google.com/console/u/0/developers/6969098457648081136/app-list
