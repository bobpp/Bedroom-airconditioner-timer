import { IFTTTDateTime } from "./IFTTTDateTime";

export class Status {
    private sleepedAt: Date;
    private interval: number;
    private executed: boolean;
    private range: GoogleAppsScript.Spreadsheet.Range;

    constructor(range: GoogleAppsScript.Spreadsheet.Range) {
        this.range = range;
        const values = range.getValues()[0];
        this.sleepedAt = new IFTTTDateTime(values[0]).getDate();
        this.interval = values[1];
        this.executed = values[2] !== "";
    }

    public isExecuteNow(currentTime: Date): boolean {
        const differenceMs = currentTime.getTime() - this.sleepedAt.getTime();
        return !this.executed && (differenceMs >= this.interval * 1000); // is milliseconds
    }

    public setExecuted(): void {
        this.range.getSheet().getRange(
            this.range.getRow(), this.range.getLastColumn(),
        ).setValue("DONE");
    }
}
