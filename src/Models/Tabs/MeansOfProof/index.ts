import { type MeansOfProofDigest } from "./@types";
import { request } from "AxiosUtils";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class MeansOfProofModel {
    static findById = async (id: string) =>
        request<MeansOfProofDigest>({
            url: "/means-proof-digest/findOne",
            method: "GET",
            params: { filter: { where: { id } } },
        });
}

export default MeansOfProofModel;
