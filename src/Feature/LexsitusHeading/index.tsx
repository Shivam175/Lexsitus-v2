import clsx from "clsx";
import React, { type FC } from "react";
import styles from "./index.module.scss";
import Link from "Components/Link";
import Typography from "Components/Typography";
import Translate from "Feature/Translation";

export interface LexsitusHeadingProps {
    subHeadingKey?: string;
    subHeadingClass?: string;
}

const LexsitusHeading: FC<LexsitusHeadingProps> = (props) => {
    const { subHeadingKey = "", subHeadingClass } = props;
    const subHeadingExists = Boolean(subHeadingKey);
    return (
        <div id={styles.lexsitus_heading_root}>
            <Typography
                variant="h1"
                className={clsx({
                    [styles.lexsitus_big_heading]: subHeadingExists,
                    [styles.empty_styling]: !subHeadingExists,
                })}
            >
                <Link
                    to=""
                    className={clsx(styles.big_heading, styles.logo_heading)}
                >
                    <span
                        className={clsx(
                            styles.purple_span,
                            styles.logo_purple_text,
                        )}
                    >
                        LEX
                    </span>
                    <span
                        className={clsx(
                            styles.white_span,
                            styles.logo_white_text,
                        )}
                    >
                        SITUS
                    </span>
                </Link>
            </Typography>
            {subHeadingExists ? (
                <Typography
                    variant="h3"
                    className={clsx(
                        subHeadingClass,
                        styles.lexsitus_sub_heading,
                    )}
                >
                    <Translate keyLang={subHeadingKey} />
                </Typography>
            ) : null}
        </div>
    );
};

export default LexsitusHeading;
