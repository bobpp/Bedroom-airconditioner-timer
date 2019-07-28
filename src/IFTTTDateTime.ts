export class IFTTTDateTime {
    private NormarizedDate: Date;
    constructor(iftttDateTime: string) {
        const removeAtPattern = / at /;
        const ampmPattern = /(AM|PM)$/;

        this.NormarizedDate = new Date(iftttDateTime.replace(removeAtPattern, " ").replace(ampmPattern, " $1"));
    }

    public getDate(): Date {
        return this.NormarizedDate;
    }
}
