import { Home } from './pages/Home';
import { CustomCursor } from './components/ui/CustomCursor';

function App() {
  return (
    <div className="font-body-md text-body-md selection:bg-electric-blue selection:text-white min-h-screen">
      <CustomCursor />
      <Home />
    </div>
  );
}

export default App;