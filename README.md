Google Analytics 4 AppScript

Before Starting
Access to a Google Analytics account with the desired property ID.
Access to a Google Sheet where the data will be stored.
The Google Analytics Data API enabled in the Google Sheet for your project.

Usage
In the Google Sheet, go to "Extensions" > "Apps Script" and click on the function dropdown.
Select the runReport function and click on the play button to run the script.
The script will retrieve the daily granular data from Google Analytics and populate the Sheet.

Here's a breakdown of the key properties you can adjust:
dimensions: An array of dimensions to include in the report. You can add or remove dimensions as needed.
metrics: An array of metrics to include in the report. You can add or remove metrics as needed.
dateRanges: Specify the desired start and end dates for the report.
orderBys: Define the order of the report rows based on a particular dimension.

For more information about the available dimensions, metrics, and other parameters, refer to the Google Analytics Data API documentation.
https://ga-dev-tools.google/ga4/query-explorer/
https://developers.google.com/analytics/devguides/reporting/data/v1/rest
