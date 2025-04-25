// import WebCam from "./components/WebCam";
// import ImageQueue from "./components/ImageQueue";
import Booth from "./pages/Booth";

const App = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200 p-8">
      {/* <div className="flex gap-4 flex-col md:flex-row">
        <WebCam />
        <ImageQueue />
      </div> */}
      <Booth />
    </div>
  );
};

export default App;
