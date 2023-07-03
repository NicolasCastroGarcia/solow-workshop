import { useContext } from "react";

/* CONTEXTS */
import { Web3Context } from "../../contexts/Web3Context";

/* COMPONENTS */
import Button from "../common/Button";

function Header() {
  const { connect } = useContext(Web3Context);

  return (
    <header>
      <Button text="Conectar" onClick={connect} />
    </header>
  );
}

export default Header;
