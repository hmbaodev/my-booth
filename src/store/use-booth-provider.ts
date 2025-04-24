import { create } from "zustand";

interface BoothProps {
  images: string[];
  // activeFilter: "none" | "gray" | "invert";
  // setActiveFilter: (filter: "none" | "gray" | "invert") => void;
  setImages: (imageUrls: string[]) => void;
  addImage: (imageUrl: string) => void;
  isMirrored: boolean;
  toggleMirror: () => void;
  videoRef: React.RefObject<HTMLVideoElement> | null;
  setVideoRef: (ref: React.RefObject<HTMLVideoElement>) => void;
}

export const useBoothProvider = create<BoothProps>((set) => ({
  images: [],
  // activeFilter: "none",
  // setActiveFilter: (filter) => set({ activeFilter: filter }),
  setImages: (imageUrls) => set({ images: imageUrls }),
  addImage: (imageUrl) =>
    set((state) => ({ images: [imageUrl, ...state.images] })),
  isMirrored: true,
  toggleMirror: () => set((state) => ({ isMirrored: !state.isMirrored })),
  videoRef: null,
  setVideoRef: (ref) => set({ videoRef: ref }),
}));
