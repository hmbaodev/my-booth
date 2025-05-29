interface FrameProps {
  images: string[];
  stripStyle: string;
  imageStyle: string;
  frameColor?: string;
  sticker?: string;
}

const Frame = ({ images, stripStyle, imageStyle, frameColor }: FrameProps) => {
  return (
    <div
      className={stripStyle}
      style={{ backgroundColor: frameColor, position: "relative" }}
    >
      {images.map((image) => (
        <img src={image} key={image} className={imageStyle} />
      ))}
      <div className="w-full h-full absolute top-0 left-0">
        <img src="/sticker.png" className="object-contain" />
      </div>
    </div>
  );
};

export default Frame;
