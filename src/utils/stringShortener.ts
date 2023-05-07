export const stringShortener = (
    inputString: string,
    lowerCaseLimit: number,
    upperCaselimit?: number,
) => {
    upperCaselimit = upperCaselimit ?? lowerCaseLimit;
    const caseCheckString = inputString.substring(0, Math.min(inputString.length, 8));
    const isUpperCase = caseCheckString === caseCheckString.toUpperCase();
    const limit = isUpperCase ? upperCaselimit : lowerCaseLimit;
    return inputString.substring(0, limit) + "...";
};
