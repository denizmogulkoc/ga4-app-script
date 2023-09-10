var propertyId = '261656317';
var sourceSheetName = "Sheet1"; // Example -> Sheet1
var targetSheetId = ''; // Example -> 1iYBvGyZeMT7oJOtuSVELVcCc5Xy0vj87zWb_1sga

var query = {
  "dimensions": [
    { "name": "date" },
    { "name": "sessionSource" }
  ],
  "metrics": [
    { "name": "sessions" }
  ],
  "dateRanges": [
    {
      "startDate": "2023-06-01",
      "endDate": "today"
    },
    //   {
    //   "startDate": "2022-06-01",
    //   "endDate": "2022-06-30"
    // }
    // ---> compare multiple data ranges
  ],
  "orderBys": [
    { "dimension": { "orderType": "ALPHANUMERIC", "dimensionName": "date" }, "desc": true }
  ],
  "limit": 1000,
  // "dimensionFilter": {
  //   "filter": {
  //     "fieldName": "sessionSource",
  //     "inListFilter": {
  //       "value": "organic"
  //     }
  //   }
  // },
};

function runReportGA() {
  try {
    var requestData = query;
    const request = AnalyticsData.newRunReportRequest();
    request.dimensions = requestData.dimensions;
    request.metrics = requestData.metrics;
    request.dateRanges = requestData.dateRanges;
    request.metricFilter = requestData.metricFilter;
    request.dimensionFilter = requestData.dimensionFilter;
    request.orderBys = requestData.orderBys;
    request.limit = requestData.limit;
    request.metricAggregations = requestData.metricAggregations;

    const report = AnalyticsData.Properties.runReport(request, 'properties/' + propertyId);
    if (!report.rows) {
      Logger.log('No rows returned.');
      return;
    }

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(sourceSheetName);
    if (sheet == null) {
      sheet = spreadsheet.insertSheet(sourceSheetName);
    } else {
      sheet.clearContents();
    }

    const dimensionHeaders = report.dimensionHeaders.map((dimensionHeader) => {
      return dimensionHeader.name;
    });
    const metricHeaders = report.metricHeaders.map((metricHeader) => {
      return metricHeader.name;
    });
    const headers = [...dimensionHeaders, ...metricHeaders];

    sheet.appendRow(headers);
    const rows = report.rows.map((row) => {
      const dimensionValues = row.dimensionValues.map((dimensionValue) => {
        return dimensionValue.value;
      });
      const metricValues = row.metricValues.map((metricValue) => {
        return metricValue.value;
      });
      return [...dimensionValues, ...metricValues];
    });

    sheet.getRange(2, 1, report.rows.length, headers.length)
      .setValues(rows);

    // Get the target spreadsheet by ID
    var targetSpreadsheet = SpreadsheetApp.openById(targetSheetId);
    var targetSheet = targetSpreadsheet.getSheetByName(sourceSheetName);
    if (targetSheet == null) {
      targetSheet = targetSpreadsheet.insertSheet(sourceSheetName);
    } else {
      targetSheet.clearContents();
    }

    // Write the data to the target sheet
    targetSheet.appendRow(headers);
    targetSheet.getRange(2, 1, report.rows.length, headers.length)
      .setValues(rows);

    Logger.log('Data has been written to the target sheet: %s', targetSpreadsheet.getUrl());
  } catch (e) {
    Logger.log('Failed with error: %s', e.error);
  }
}
