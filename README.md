# Ecologi Developer Challenge

This project is a small React app that contains a chart which displays the number of trees planted per day since launch. There is additional functionality to allow the user to filter the data based on the inputted date range via the date picker.

## The approach

### Retrieving data from API and converting it to a user-friendly format

The first step of the challenge was to call the API and see what kind of data was returned. Upon doing this, I received an array of arrays containing two elements which was a single number (assumed as number of trees planted) and a long number (assumed to be a timestamp after running this in a unix timestamp converter).

With this in mind, I remapped the response from the API into an array of objects to increase speed of readability and more user friendly which contained a object consisting of two properties numOfTree and date.

Once this was done, this was returned within a component (Treechart.js) so that it can be easily manipulated when needed. In this case, a new array was created to convert the date property into a more readable format for processing which was dd/mm/yyyy and then sorted from earliest to latest.

### Calculating how many trees were planted per day

Once the response data was sorted, I proceeded to work out how to create a sum of trees planted per day in the data. This was done using the .reduce function to go through every occurance of a certain date and extract the numOfTree value from it, and add it to a sum. This was done throughout the entire response data until I had a new array containing these summed values.

After this, two initial states previously declared are updated with the values of the dates and the values of the summed number of trees planted.

### Plotting this data onto a graph

To display this newly formatted data, I used the package react-chartjs-2 so I could utilise the Chart JS package but in a more React component friendly way. From this, I used the component Line and used the date array for the label and the number of trees planted data as the dataset.

### Filtering the data based on inputted date range

To improve the functionality and visualisation of this data, a date picker was added to allow the user to select a specific date range. This involved taking the initial data and manipulating it against the values entered in the date picker. Once this was done, the chart would be updated with the filtered dates and the y axis would be altered based on the length of the number of trees planted for the date range.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test:unit`

Runs the unit tests that have a .spec.js suffix to them.
