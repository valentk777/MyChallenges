# ChallengeTracker
[![Build Android app](https://github.com/valentk777/ChallengeTracker/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/valentk777/ChallengeTracker/actions/workflows/main.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=valentk777_ChallengeTracker&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=valentk777_ChallengeTracker)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=valentk777_ChallengeTracker&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=valentk777_ChallengeTracker)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=valentk777_ChallengeTracker&metric=bugs)](https://sonarcloud.io/summary/new_code?id=valentk777_ChallengeTracker)

This is a mobile app with ReactNative for creating and tracing your challenges.

## Tech stack:

- Node.Js v18.14.0
- npm 9.5.1
- Java 19.0.2

## Setting up environment:
- `npx react-native info`
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
https://github.com/gustarus/react-native-version-up
npm run version:up -- --patch
`git tag -a v1.0.X -m 'release 1.0.X: increase versions and build numbers'`
`git commit -m 'release 1.0.X: increase versions and build numbers'`
<!-- `npm install -g react-native-version`
change version in packages.json. then run command
`react-native-version --never-amend` -->

## Release

### Andoid Play Store
To release an application run this command under androind folder
`./gradlew bundleRelease`
Bundle appear in ...\ChallengeTracker\android\app\build\outputs\bundle\release
https://play.google.com/console/u/0/developers/6969098457648081136/app-list

