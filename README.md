
# Network Piano

This project is a visualization (or audition) of the network tab in Chrome DevTools. It takes the network data and turns
it into a musical composition, where each note corresponds to a network request. The pitch of the note is determined by
the type of request (e.g., image, script, etc.), and the duration of the note corresponds to the time taken for the
request to complete.

## Loading Network Data

To get the network data, you can export the HAR file from Chrome DevTools.

1. Open Chrome DevTools (F12 or right-click and select "Inspect").
2. Go to the "Network" tab.
3. Perform the actions you want to capture (e.g., refresh the page).
4. Click on the "Export HAR" button (usually a download icon) to save the HAR file.

## Building and Running

After cloning the repository, you can build the project using the following commands:

```bash
npm install
npm run build
```

This will create a `dist` folder with the compiled JavaScript and HTML files.
