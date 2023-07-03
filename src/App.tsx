/* CONTEXTS */
import { Web3ContextProvider } from "./contexts/Web3Context";

/* COMPONENTS */
import Header from "./components/Header";
import Main from "./components/Main";

/* STYLES */
import "./App.css";

function App() {
  return (
    <Web3ContextProvider>
      <Header />
      <Main />
    </Web3ContextProvider>
  );
}

export default App;
