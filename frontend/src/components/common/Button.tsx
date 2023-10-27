import styles from "./Button.module.scss";

interface ButtonProps {
  content: JSX.Element | string;
  callback?: () => void;
  customClass?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${props.customClass}`}
      onClick={props.callback}
    >
      {props.content}
    </button>
  );
};

export default Button;
