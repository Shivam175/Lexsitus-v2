import { useEffect, useState, type FC } from "react";
import { type FieldProps } from "react-forms-lite/dist/lib/ml-form-builder";
import GlobalAutoComplete from "Components/GlobalAutoComplete";
import useAsyncTask from "Hooks/useAsyncTask";
import CliccModel from "Models/Tabs/Clicc";
import { type CommentarySearchListItem, type CliccItem } from "Models/Tabs/Clicc/@types";
import { logger } from "utils/logger";

interface CommentariesTagItemProps {
    tag: Pick<CliccItem, "header" | "id">;
    handleClose: (id: string) => void;
}

interface CommentariesTagsProps extends FieldProps {
    fieldProps?: {
        getCommentaries: () => Promise<Array<Pick<CliccItem, "header" | "id">>>;
        getCommentaryIds: (tags: Array<Pick<CliccItem, "id" | "header">>) => void;
    };
}

const CommentariesTagItem: FC<CommentariesTagItemProps> = ({ tag, handleClose }) =>
    <div className={"inline-block h-8 text-[13px] leading-8 text-black text-opacity-60 bg-lxsGrey14 bg-opacity-40 rounded-2xl mb-1 mr-1 px-3 font-medium "}>
        {tag.header}
        <i className={"material-icons cursor-pointer text-base leaading-8 pl-2 pt-1 float-right"}
            onClick={() => {
                handleClose(tag.id);
            }}>close</i>
    </div>;


const CommentariesTags: FC<CommentariesTagsProps> = (props) => {
    const { fieldProps, formikProps } = props;
    const getCommentaries = fieldProps?.getCommentaries;
    const [commentaryTags, setCommentaryTags] = useState<Array<Pick<CliccItem, "id" | "header">>>([]);

    const handleClose = (id: string) => {
        const newArrayOfTags = commentaryTags.filter(tags => tags.id !== id);
        setCommentaryTags(newArrayOfTags);
    };

    const handleChange = useAsyncTask<string[], CommentarySearchListItem>(
        async (value) => {
            try {
                if (value.length <= 2) return;
                const res = await CliccModel.searchCommentaryList({
                    doc_type: "Commentary",
                    fields: "title,id,item_slug",
                    limit: 15,
                    skip: 0,
                    term: value
                });
                return res;

            } catch (error: unknown) {
                logger.error(error);
            }
        }
    );

    const handleOnSelect = (tag: Pick<CliccItem, "id" | "header">) => {
        setCommentaryTags([...commentaryTags, tag]);
    };

    useEffect(() => {
        formikProps?.setFieldValue("commentaryIds", commentaryTags.map(tag => tag.id));
    }, [commentaryTags]);


    useEffect(() => {
        getCommentaries?.().then((res) => {
            setCommentaryTags(res);
        }).catch((err: unknown) => {
            logger.error(err);
        });

    }, []);


    return (
        <div className="w-full">
            <GlobalAutoComplete placeholder="Search Commentaries" handleChange={handleChange} onSelect={handleOnSelect} />
            <div className="mt-4">
                {
                    commentaryTags?.map(tag => <CommentariesTagItem key={tag.id} tag={tag} handleClose={handleClose} />)
                }
            </div>
        </div>
    );

};

export default CommentariesTags;