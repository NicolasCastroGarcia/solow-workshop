import { useContext } from "react";

/* CONTEXTS */
import { Web3Context } from "../../contexts/Web3Context";

/* COMPONENTS */
import Button from "../common/Button";

/* UTILS */
import formatAddress from "../../utils/formatWallet";

function Header() {
  const { connect, disconnect, user } = useContext(Web3Context);

  return (
    <header>
      {!user && <Button text="Conectar" onClick={connect} />}
      {user && <p>{formatAddress(user.address)}</p>}
      {user && <Button text="Desconectar" onClick={disconnect} />}
    </header>
  );
}

export default Header;
