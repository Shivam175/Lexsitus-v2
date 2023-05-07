import { attachField } from "react-forms-lite";
import CommentariesTags from "Feature/ReactFormField/CommentariesTags";

export default (): void => {
    attachField("commentaries", <CommentariesTags />);

};