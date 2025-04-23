interface ImageQueueProps {
  images: string[];
}

const ImageQueue = ({ images }: ImageQueueProps) => {
  return <div className="flex flex-col h-full gap-3 items-center">
    {images?.map(image => (
      <img key={image} src={image} alt="" className="w-full rounded-md" />
    ))}
  </div>;
};

export default ImageQueue;
