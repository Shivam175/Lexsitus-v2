import { type LectureVideo } from "./@types";
import { request } from "AxiosUtils";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class LecturesModel {
    static getVideo = async (id: string) =>
        request<LectureVideo>({
            url: `/videos/${id}`,
            method: "GET",
        });

    static getVideoList = async (id: string) =>
        request<LectureVideo[]>({
            url: "/videos",
            method: "GET",
            params: {
                filter: {
                    where: { menuItemId: id },
                    order: "publish_date DESC",
                },
            },
        });
}

export default LecturesModel;
