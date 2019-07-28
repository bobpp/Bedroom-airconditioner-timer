import { Configure } from "./Configure";
import { Status } from "./Status";

function checkSchedule(): void {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const config = new Configure(spreadSheet.getSheetByName("configure"));
    const sheet = spreadSheet.getSheetByName("log");
    const lastRow = sheet.getLastRow();
    if (lastRow > 0) {
        const statusRange = sheet.getRange(lastRow, 1, 1, 3);
        const status = new Status(statusRange);
        if (status.isExecuteNow(new Date(Date.now()))) {
            if (config.isUseIfttt()) {
                UrlFetchApp.fetch(
                    config.iftttURL(),
                    {
                        method: "post",
                    },
                );
            }
            status.setExecuted();
        }
    }
}
