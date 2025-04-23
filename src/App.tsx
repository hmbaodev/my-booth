import Camera from "./components/Camera";
import ImageQueue from "./components/ImageQueue";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center gap-4">
      <Camera />
      <ImageQueue />
    </div>
  );
};

export default App;
