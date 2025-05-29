const ImagesList = () => {
  return (
    <div className="mt-[calc(42.5px+24px)] ml-6 flex flex-col gap-4">
      <img
        src="/test.png"
        alt=""
        className="aspect-[3/2] w-[118px] rounded-lg object-cover"
      />
      <img
        src="/test.png"
        alt=""
        className="aspect-[3/2] w-[118px] rounded-lg object-cover"
      />
      <img
        src="/test.png"
        alt=""
        className="aspect-[3/2] w-[118px] rounded-lg object-cover"
      />
      <img
        src="/test.png"
        alt=""
        className="aspect-[3/2] w-[118px] rounded-lg object-cover"
      />
    </div>
  );
}

export default ImagesList