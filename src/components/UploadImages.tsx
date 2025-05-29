import { MdInsertPhoto } from "react-icons/md";

const UploadImages = () => {
  return (
    <div className="flex items-center">
      <label
        htmlFor="upload-images"
        className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-[16px]"
        style={{
          background:
            "linear-gradient(-90deg, rgba(253,115,200,1) 0%, rgba(0,92,141,1) 100%)",
        }}
      >
        <input
          type="file"
          id="upload-images"
          accept="image/*"
          multiple
          className="hidden"
        />
        <MdInsertPhoto className="size-5 text-white" />
        <span className="text-white">Upload Photos</span>
      </label>
    </div>
  );
};

export default UploadImages;
