import { createContext, useContext, useState, ReactNode } from "react";

type FrameOption = {
  id: string;
  text: string;
  image: string;
  numOfImages: number;
};

type PhotoBoothContextType = {
  frame: FrameOption;
  setFrame: (frame: FrameOption) => void;
  delay: number;
  setDelay: (delay: number) => void;
  images: string[];
  addImage: (img: string) => void;
  clearImages: () => void;
};

const defaultFrame: FrameOption = {
  id: "4-v",
  text: "4 Vertical",
  image: "/4_1.4d611fe7.png",
  numOfImages: 4,
};

const PhotoBoothContext = createContext<PhotoBoothContextType | null>(null);

export const PhotoBoothProvider = ({ children }: { children: ReactNode }) => {
  const [frame, setFrame] = useState<FrameOption>(defaultFrame);
  const [delay, setDelay] = useState<number>(3);
  const [images, setImages] = useState<string[]>([]);

  const addImage = (img: string) => setImages((prev) => [...prev, img]);
  const clearImages = () => setImages([]);

  return (
    <PhotoBoothContext.Provider
      value={{
        frame,
        setFrame,
        delay,
        setDelay,
        images,
        addImage,
        clearImages,
      }}
    >
      {children}
    </PhotoBoothContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePhotoBooth = () => {
  const ctx = useContext(PhotoBoothContext);
  if (!ctx)
    throw new Error("usePhotoBooth must be used inside PhotoBoothProvider");
  return ctx;
};
