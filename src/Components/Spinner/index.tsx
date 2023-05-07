import { type FC } from "react";
import styles from "./index.module.scss";

const Spinner: FC = () => (
    <div className="text-black absolute top-[50%] left-[50%]">
        <div className={styles.loader} />
        Loading...
    </div>
);
export default Spinner;