import { getCurrentDate } from "Feature/Library/Tabs/utils";
import { useStoreState } from "Stores";
import { logger } from "utils/logger";

export const getCitationText = (
    currUrl: string,
    data?: Record<string, string>
) => {
    if (data) {
        const text = `${data["Lexsitus Lecturer"]}, ${
            data.Topic
        }, available at ${currUrl}, last accessed at ${getCurrentDate()}`;
        return text;
    }

    return "";
};

export const useAddReadingList = () => {
    const { User } = useStoreState(({ UserStore: { User } }) => ({
        User,
    }));

    logger.log(User, "User");
};
