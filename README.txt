DAYBOOK - how to put it online for your own use
================================================

What is in this folder (upload ALL of it, keep the names as they are):
  index.html, sw.js, manifest.webmanifest, icon.svg, icon-v2-192.png, icon-v2-512.png,
  icon-v2-maskable-512.png, apple-touch-icon-v2.png

There is no server, no database and nothing to renew. It is plain files, so it keeps working for years.
Your notes stay on your own device (in the browser). Nothing is sent anywhere unless you turn on Google Drive sync.

OPTION A - GitHub Pages (free, stays online for years)   [recommended]
  1. Sign in at github.com (free account).
  2. Click + (top right) > New repository. Name it "daybook". Make it Public. Tick "Add a README file". Create.
  3. In the repository click Add file > Upload files. Drag ALL the files from this folder in. Click Commit changes.
  4. Settings > Pages. Under "Build and deployment" choose "Deploy from a branch", branch "main", folder "/ (root)". Save.
  5. After about a minute the page shows your address: https://YOURNAME.github.io/daybook/
  Public means anyone who guesses the address can open the empty app. They cannot see your notes: those never leave your device.

OPTION B - Cloudflare Pages (free)
  Workers & Pages > Create > Pages > Upload assets. Name it, drag this folder in, Deploy. You get https://NAME.pages.dev

INSTALL ON YOUR PHONE / PC
  Android (Chrome): open the address > menu (three dots) > Install app / Add to Home screen.
  iPhone (Safari): open the address > Share > Add to Home Screen.
  PC (Chrome or Edge): open the address > install icon at the right end of the address bar.
  After the first open it also works with no internet.

IMPORTANT, notes live per device
  A note written on your phone is not on your PC unless you turn on Google Drive sync in Settings (see SYNC-SETUP.txt, sent with this package).
  Always open the app from the same address on a device (the installed app and the browser tab share notes
  only when they use the same address).

UPDATING LATER
  Upload the new index.html (and the other files if they changed) the same way: Add file > Upload files, same names. Commit.
  Devices pick up the new version by themselves the next time they open the app with internet.
