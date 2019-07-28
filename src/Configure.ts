export class Configure {
    private useIfttt: boolean;
    private iftttURLKey: string;
    private iftttURLEventName: string;

    constructor(configureSheet: GoogleAppsScript.Spreadsheet.Sheet) {
        const lastRow = configureSheet.getLastRow();
        const configureValues: string[][] = configureSheet.getRange(1, 1, lastRow, 2).getValues();
        for (const index in configureValues) {
            if (configureValues[index]) {
                const keyName = configureValues[index][0];
                const value = configureValues[index][1];
                if (keyName === "iftttURLKey") {
                    this.iftttURLKey = value;
                }
                if (keyName === "iftttURLEventName") {
                    this.iftttURLEventName = value;
                }
            }
        }

        this.useIfttt = (this.iftttURLKey !== "" && this.iftttURLEventName !== "");
    }

    public isUseIfttt(): boolean {
        return this.useIfttt;
    }

    public iftttURL(): string {
        return `https://maker.ifttt.com/trigger/${this.iftttURLEventName}/with/key/${this.iftttURLKey}`;
    }
}
