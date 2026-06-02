export function getCountryName(country: string) {
    try {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        return regionNames.of(country);
    } catch (error) {
        return "";
    }
}
