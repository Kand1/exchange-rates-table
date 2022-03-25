import './App.css';
import {ExchangeRateTable} from "./Components/ExchangeRateTable";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <div>
            header
          </div>
        </header>
        <aside className="App-sidebar">
          <div>
            sidebar
          </div>
        </aside>
        <ExchangeRateTable/>
        <footer className="App-footer">
          <div>
            footer
          </div>
        </footer>
      </div>
  );
}

export default App;
