import React from "react";
import { v4 as uuid } from "uuid";
import styles from "./hero.module.css";
import Button from "../Button/Button";
import { types } from "./btnCateogories";

const Categories = () =>
{
  const animations = [
    "fade-up",
    "fade-down",
    "fade-left",
    "fade-up-right",
    "fade-down-left",
    "zoom-in",
    "zoom-in-up",
    "zoom-in-down",
    "zoom-in-left",
    "zoom-in-right",
    "zoom-out"
  ]
  function randAnimation() {
    // min and max included
    return Math.floor(Math.random() * ((animations.length-1) - 0 + 1) + 0);
  }

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.btnContainer}>
        {types.map(({ color, text }) => (
          <Button
            color={color}
            text={text}
            key={uuid()}
            dataAos={animations[randAnimation()]}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
