import './App.css';
import {ExchangeRateTable} from "./Components/ExchangeRateTable";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";

function App() {
    const navigate = useNavigate();

    return (
        <div className="App">
          <header className="App-header">
            <div>
                <a onClick={() => navigate("/home")}>home</a>
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
