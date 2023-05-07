import clsx from "clsx";
import React, { type FC } from "react";
import styles from "./index.module.scss";
import UserCard, { type UserCardProps } from "Components/Cards/UserCard/index";

export interface UserListProps {
    list: UserCardProps[];
    variant?: "large" | "small";
}

const UserListCards: FC<UserListProps> = ({ list, variant = "large" }) => (
    <div className={"mb-3"}>
        <ul className={styles["card-matrix-list"]}>
            {list.map((element: UserCardProps, idx: number) => (
                <li
                    key={`cardMatrixListItem_${idx}`}
                    className={clsx("mb-1", styles["card-matrix-list-item"], { [styles.small]: variant === "small" })}
                >
                    <UserCard {...element}/>
                </li>
            ))}
        </ul>
    </div>
);

export default UserListCards;
