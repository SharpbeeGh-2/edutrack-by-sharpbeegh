# Termux + Acode Setup

This project is developed on Android using Termux (terminal) and Acode (editor). This file replaces any assumption of a desktop dev machine elsewhere in the docs.

## One-time Termux setup

1. Update packages
   pkg update && pkg upgrade -y

2. Install git and Node.js (use the LTS build, it is more stable on Android than the latest)
   pkg install git nodejs-lts openssh -y

3. Give Termux access to shared Android storage, so Acode can see the same files
   termux-setup-storage
   This creates ~/storage/shared, ~/storage/downloads, etc.

4. Set your git identity
   git config --global user.name "your name"
   git config --global user.email "your email"

## Where to put the project

Termux's home folder (~) is private to Termux and Acode cannot open it directly unless Acode's Termux plugin is installed. The simplest setup is to keep the working copy inside shared storage so both apps can reach it:

   mkdir -p ~/storage/shared/projects
   cd ~/storage/shared/projects

Then git clone or unzip the project there. Acode can open that same folder through its file picker (Storage Access Framework).

## GitHub authentication from Termux

Termux has no browser-based GitHub login. Use one of:

### Option A - Personal Access Token (simplest)
   Create a classic token at github.com under Settings > Developer settings > Personal access tokens, with repo scope.
   When you git push over https and it asks for a password, paste the token instead of your GitHub password.

### Option B - SSH key
   ssh-keygen -t ed25519 -C "your email"
   cat ~/.ssh/id_ed25519.pub
   Copy that output and add it under GitHub Settings > SSH and GPG keys.
   Then use the git@github.com:... remote URL instead of https.

## Running installs and dev servers on a phone

- npm install can be slow and memory-heavy on Android. Run termux-wake-lock first so Android does not kill the process while the screen is off:
   termux-wake-lock
   npm install
   termux-wake-unlock

- When Vite exists (Task 3), run the dev server with --host so it is reachable from the phone's browser:
   npm run dev -- --host
   Then open the printed local address in Chrome/Firefox on the same device.

- If the phone has limited RAM, close other apps before running installs or builds, and expect slower first-time dependency installs.

## Editing in Acode

- Open the project folder from ~/storage/shared/projects/edutrack-by-sharpbeegh using Acode's folder picker.
- Changes made in Acode save directly to the same files Termux's git sees, since they are the same shared-storage path - no syncing step needed.
- Run all git and npm commands from Termux; use Acode purely as the editor.