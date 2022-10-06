import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import MultiTransfer from './views/multitransfer/MultiTransfer';

function App() {
  return (
    <AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MultiTransfer />} />
        </Routes>
      </BrowserRouter>
    </AppLayout>
  );
}

export default App;
