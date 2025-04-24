import WebCam from "./components/WebCam";
import ImageQueue from "./components/ImageQueue";

const App = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200 p-8">
      <div className="flex gap-4 flex-col md:flex-row">
        <WebCam />
        <ImageQueue />
      </div>
    </div>
  );
};

export default App;
