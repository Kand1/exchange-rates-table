import './App.css';
import {ExchangeRateTable} from "./Components/ExchangeRateTable";
import {Route, Routes, Navigate} from "react-router-dom";

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
          <Routes>
              <Route path='/:id' element={<ExchangeRateTable/>}/>
              <Route
                  path="*"
                  element={<Navigate to="/home" replace />}
              />
          </Routes>
          <footer className="App-footer">
            <div>
              footer
            </div>
          </footer>
        </div>
  );
}

export default App;
