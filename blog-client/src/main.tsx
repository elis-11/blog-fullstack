import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { DataProvider } from './context/DataProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <DataProvider>
      <App />
    </DataProvider>
  </Router>
)
