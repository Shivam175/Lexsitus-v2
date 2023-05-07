/* eslint-disable @typescript-eslint/naming-convention */
export interface LectureVideo {
    created: string;
    edit_date: string;
    edited: boolean;
    header: string;
    id: string;
    item_slug: string;
    menuItemId: string[];
    metadata: VideoMetadata;
    title: string;
    updated: string;
    video: VideoType;
}

export interface VideoType {
    poster: string;
    src: string;
    type: string;
}

export type VideoMetadata = Record<string, string>;
