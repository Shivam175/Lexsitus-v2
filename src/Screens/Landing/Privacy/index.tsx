import React, { type FC } from "react";
import styles from "./index.module.scss";
import BackButton from "Components/BackButton";
import Button from "Components/Button";
import Typography from "Components/Typography";




const Privacy: FC = () => (
    <div className={styles.PrivacyPage}>
        <div className={styles.heading}>
            <BackButton />
            <Typography variant="h3">Privacy Policy</Typography>
        </div>
        <Typography variant="h5">
                By accessing this web site, certain information about the user
                (such as Internet protocol (IP) addresses, navigation through
                the site, the software used, and the time spent, along with
                other similar information) will be stored on CILRAP servers
                inside the European Union. This data will not specifically
                identify the user. The information will only be used internally
                in CILRAP for web site traffic analysis. If the user provides
                unique identifying information (such as name and e-mail address)
                through the functions to{" "}
            <Button link="/register">
                    register a Lexsitus user-account
            </Button>{" "}
                or to report an issue with Lexsitus, such information will only
                be used by CILRAP to support the Lexsitus account that a user
                registers or to improve the Lexsitus service, and it will be
                stored exclusively on CILRAP servers inside the European Union
                and only be accessible to CILRAP. Users may seek access to,
                modify or delete their unique identifying information on CILRAP
                servers by contacting us at{" "}
            <a href="mailto:info@cilrap.org">info@cilrap.org</a>.
        </Typography>
    </div>
);

export default Privacy;