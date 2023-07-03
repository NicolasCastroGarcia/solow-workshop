type Props = {
  text: string;
  onClick: () => void;
};

function Button({ text, onClick }: Props) {
  return <button onClick={onClick}>{text}</button>;
}

export default Button;
