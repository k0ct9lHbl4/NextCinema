import cn from "classnames";
import { forwardRef } from "react";

import { IField } from "./form.interface";
import styles from "./form.module.scss";

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, type = "text", style, ...rest }, ref) => {
    return (
      <div className={cn(styles.common, styles.field)} style={style}>
        <label>
          <span>{placeholder}</span>
          <input ref={ref} type={type} {...rest} autoComplete="off" />
        </label>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
);

export default Field;
