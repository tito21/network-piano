
# Network Piano

This project is a visualization (or audition) of the network tab in Chrome DevTools. It takes the network data and turns
it into a musical composition, where each note corresponds to a network request. The pitch of the note is determined by
the type of request (e.g., image, script, etc.), and the duration of the note corresponds to the time taken for the
request to complete.

## Details

Each note is represented as rectangle coloured according to the type of request and its with is proportional to the time
taken for the request to complete. The notes are arranged in a piano-roll style, where the vertical position corresponds
to the type of request and the horizontal position corresponds to the timing of the requests.

The attack and release of the notes are determined by the timing of the requests, creating a dynamic and evolving
musical composition that reflects the network activity of the webpage.

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

There is a workflow that automatically deploys the project to GitHub Pages whenever you push to the `main` branch.
