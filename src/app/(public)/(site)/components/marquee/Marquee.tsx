import clsx from "clsx";
import styles from "./Marquee.module.scss";

export default function Marquee() {
  return (
    <section className={clsx(styles.Marquee)}>
      <ul className={styles.textWrapper}>
        <li className={styles.textContext}>miễn phí tất cả các khoá học dành cho đối tượng học sinh cấp 3</li>
        <li className={styles.textContext}>miễn phí tất cả các khoá học dành cho đối tượng học sinh cấp 3</li>
        <li className={styles.textContext}>miễn phí tất cả các khoá học dành cho đối tượng học sinh cấp 3</li>
        <li className={styles.textContext}>miễn phí tất cả các khoá học dành cho đối tượng học sinh cấp 3</li>
      </ul>
    </section>
  );
}
