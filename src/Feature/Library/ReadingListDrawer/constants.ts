export const SORT_KEYS_LIST = ["Name", "Kind", "Date Added"] as const;

export const GET_READING_LIST_PARAMS = {
    params: {
        filter: {
            include: [
                {
                    relation: "documents",
                    scope: {
                        include: [
                            {
                                relation: "document",
                                scope: { fields: ["title", "header"] },
                            },
                        ],
                        order: "created DESC",
                    },
                },
            ],
        },
    },
};

export const GET_USER_HISTORY_PARAMS = {
    where: { userId: "" },
    order: "date_access DESC",
    limit: 30,
    include: [
        {
            relation: "document",
            scope: { fields: ["id", "title", "header"] },
        },
    ],
};
