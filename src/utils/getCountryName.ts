export function getCountryName(regionCode: string) {
    try {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        return regionNames.of(regionCode) ?? "";
    } catch (error) {
        console.error(`Error getting country name: ${error}`);
        return "";
    }
}
