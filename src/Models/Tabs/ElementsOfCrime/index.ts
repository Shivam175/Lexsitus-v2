import { type ElementsCrimeItem } from "./@types";
import { request } from "AxiosUtils";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ElementsOfCrimeModel {
    static getById = async (id: string) =>
        request<ElementsCrimeItem>({
            url: "/elementsOfCrimes/findOne",
            method: "GET",
            params: { filter: { where: { id } } },
        });
}

export default ElementsOfCrimeModel;
