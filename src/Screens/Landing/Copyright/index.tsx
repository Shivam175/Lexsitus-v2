import { type FC } from "react";
import styles from "./index.module.scss";
import BackButton from "Components/BackButton";
import Typography from "Components/Typography";


const Copyright: FC = () => (
        
    <div className={styles.CopyrightPage}>
        <div className={styles.heading}>
            <BackButton />
            <Typography variant="h3">Copyright</Typography>
        </div>
        <Typography variant="h5">
                Lexsitus is a service of the Centre for International Law
                Research and Policy (CILRAP). CILRAP has developed Lexsitus in
                order to make it available on this web site to individuals for
                their free personal use and to institutions and organisations
                for their free internal use. CILRAP reserves all rights to the
                contents of Lexsitus, including its conceptualisation, taxonomy,
                menus, metadata, text, and audio-visual materials. The URLs used
                by this web site are the original, persistent URLs of Lexsitus
                and the resources available in Lexsitus. If you use the
                resources of Lexsitus, you must attribute the material by
                mentioning Lexsitus, the specific resource in Lexsitus, its
                persistent URL in Lexsitus, and other information provided by
                the relevant citation available in Lexsitus. You may not use
                Lexsitus or its resources for commercial purposes, including to
                raise funds or other contributions for related or similar
                projects or services. If you build upon a Lexsitus resource, you
                must state that you have done so (without suggesting that
                Lexsitus or CILRAP endorses you or your use), and you must
                distribute your contributions on the same terms as stated on
                this page. Other restrictions on the use of Lexsitus and its
                resources that flow from{" "}
            <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode"
                target="_blank"
                rel="noreferrer"
            >
                    CC-BY-NC-SA
            </a>{" "}
                apply.
        </Typography>
    </div>
        
);

export default Copyright;