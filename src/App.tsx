import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Booth from "./pages/Booth";
import Export from "./pages/Export";
import { PhotoBoothProvider } from "./context/PhotoBoothContext";

const App = () => {
  return (
    <PhotoBoothProvider>
      <div
        style={{
          backgroundImage:
            "linear-gradient( 109.6deg,  #ffc4f7 11.2%, rgba(188,204,251,1) 100.6%)",
        }}
      >
        <Navbar />
        <div className="flex min-h-[calc(100vh-80px)] pt-24">
          <Routes>
            <Route path="/" element={<Booth />} />
            <Route path="/export" element={<Export />} />
          </Routes>
        </div>
      </div>
    </PhotoBoothProvider>
  );
};

export default App;
