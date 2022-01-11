import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

const fallbackLoader = (
  <div className='loading'
    style={{
      width: "100vw",
      maxWidth: "100%",
      height: "100vh",
      backgroundColor: "#f0f0f0",
      display: "grid",
      placeItems: "center",
      zIndex: "999"
    }}>

    <div style={{
      width: "5vmax",
      height: "5vmax",
      borderBottom: "3px solid #a139cab4",
      borderRadius: "100%"
    }}
    ></div>

  </div>
)

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={fallbackLoader}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </Suspense>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
