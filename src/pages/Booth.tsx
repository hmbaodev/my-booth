import Options from "../components/Options";
import Capture from "../components/Capture";

const Booth = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Options />
      <Capture />
    </div>
  );
};

export default Booth;
