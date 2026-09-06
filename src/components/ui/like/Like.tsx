import { useState } from "react";
import styles from "./like.module.css";
import like from "../../../shared/icon/assets/like.svg";
import likeActive from "../../../shared/icon/assets/State=Active.svg";

interface LikeProps {
  likesCount?: number;
  onClick: () => void;
  active: boolean;
}
export function Like({ likesCount, onClick, active }: LikeProps) {
  return (
    <>
      <div className={styles.wraps}>
        {likesCount !== undefined && (
          <span className={styles.numberLikes}>{likesCount}</span>
        )}
        <button onClick={onClick}>
          <img
            src={active ? like : likeActive}
            alt=""
            className={styles.like}
          />
        </button>
      </div>
    </>
  );
}
