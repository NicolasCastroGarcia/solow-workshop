import { useContext, useState } from "react";
import { Contract, formatUnits, parseUnits } from "ethers";

/* CONTEXTS */
import { Web3Context } from "../../contexts/Web3Context";

/* ABIS */
import USDC from "../../abis/usdc.json";

function Main() {
  const { user } = useContext(Web3Context);
  const [balance, setBalance] = useState<number>();

  async function escritura() {
    // Conectamos el SIGNER con el contrato ya que vamos a escribir. Si fuera solo lectura, con el PROVIDER es suficiente.
    const usdcContract = new Contract(USDC.address, USDC.abi, user?.signer);

    // Ejecutamos la funcion approve, que recibe 2 parámetros: el address del contrato al que queremos dar permisos
    // y la cantidad de tokens que queremos darle.
    // La cantidad es 1, pero como el contrato usa 6 decimales, tenemos que pasarle 1^6 = 1000000 y para eso utilizamos parseUnits de ethers.
    // Utilizamos 6 decimales porque USDC tiene 6 decimales. Si fuera ETH, serían 18 decimales.
    // Hay que verificar la cantidad de decimales que utiliza cada token y contrato.

    await usdcContract.approve(
      "0x4B0f016D3Ff4a25BE4D02594B701C7edFF11Fe79",
      parseUnits("1", 6)
    );
  }

  async function lectura() {
    // Conectamos el PROVIDER con el contrato. Podemos utilizar el SIGNER también, pero como es solo lectura, no es necesario.
    const usdcContract = new Contract(USDC.address, USDC.abi, user?.provider);

    // Ejecutamos la funcion balanceOf, que recibe 1 parámetro: el address del usuario del que queremos obtener el balance.
    const balance = await usdcContract.balanceOf(user?.address);

    // El balance que nos devuelve es un BigNumber
    setBalance(balance);
  }

  async function getUsdc() {
    // Conectamos el SIGNER con el contrato ya que vamos a escribir. Si fuera solo lectura, con el PROVIDER es suficiente.
    const usdcContract = new Contract(USDC.address, USDC.abi, user?.signer);

    // Ejecutamos la funcion claim, que no recibe parámetros. Esto nos va a dar USDC a nuestra billetera.
    await usdcContract.claim();
  }

  return (
    <main>
      {!user && <p>Conecta tu billetera para empezar</p>}
      {user && (
        <>
          <p>Tu balance es: {user.balance}</p>
        </>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {user && <button onClick={escritura}>Escribir</button>}
        {user && <button onClick={getUsdc}>Conseguir USDC</button>}
      </div>
      <br />

      <div>
        {user && <button onClick={lectura}>Leer</button>}
        {balance && <p>Balance de USDC: {formatUnits(balance, 6)}</p>}
      </div>
    </main>
  );
}

export default Main;
