---
layout: default
title: Adding a Crashlytics Beta tester
description: A modern guide to adding a beta tester to Fabric's Crashlytics.
redirect_from: 
  - /fabric/
  - /crashlytics/
  - /beta/
---

### Notes

* This guide was created in 2018 for Xcode 9.
* It was created because the [official](https://docs.fabric.io/apple/beta/beta-walkthrough.html#inviting-testers) Crashlytics guide is for outdated versions of Xcode.
* It is *not* possible to let a new user test an existing beta build.
* You must first invite a new tester, then create a new beta build.
* There are multiple ways to do some of the steps below.
* Some steps may change over time. If you find something broken, please [let me know](https://uihex.com).

### Step 1: Invite a user (for the developer)

1. Go to [fabric.io](https://fabric.io/).
2. Click on your app.
3. Select `Beta` in the sidebar.
4. Click on `Add Testers` and enter the email address of the new tester.

### Step 2: Accept the invitation (for the tester)

1. Open the invitation email you received *with the iOS you will use for testing*.
2. Tap on the button and follow all of the instructions.

### Step 3: Download the UDID of the new tester's device (for the developer)

1. Go back to the `Beta` tab in [fabric.io](https://fabric.io/) and click the new tester.
2. Click on the devices tab, and copy the UDID of the device. (It is 40 characters long and should look something like `81e23cxf5v4t6bmj890k0mjn89zne372rcjiffa8`).

### Step 4: Adding the UUID in Apple Developer

1. Go to [developer.apple.com](https://developer.apple.com/), click on Account, and log in.
2. Click on `Certificates, IDs & Profiles` in the sidebar.
3. Under `Devices`, click on `All` in the sidebar.
4. Click on the new device button.
5. Enter the name of the device (such as `Eugene's iPhone 8`) and paste the UUID from the previous step.
6. Follow the remaining steps and click `Register`.

### Step 5: Refreshing your Xcode Provisioning Profiles

This is the tricky step that has changed in Xcode 9.

1. Go to the system folder `~/Library/MobileDevice/Provisioning\ Profiles/`.
    1. You can do this by opening a terminal window and typing `open ~/Library/MobileDevice/Provisioning\ Profiles/`.
2. Delete everything in this folder.
3. Open Xcode, and open to Xcode preferences.
5. Click on the Accounts tab.
6. Select the Apple ID you are using for the development of the app.
7. Click on "Download Manual Profiles".
