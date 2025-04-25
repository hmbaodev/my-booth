import { create } from "zustand";

interface BoothProps {
  images: string[];
  setImages: (imageUrls: string[]) => void;
  addImage: (imageUrl: string) => void;
  isMirrored: boolean;
  toggleMirror: () => void;
  videoRef: React.RefObject<HTMLVideoElement> | null;
  setVideoRef: (ref: React.RefObject<HTMLVideoElement>) => void;
  countdown: number;
  setCountdown: (value: number) => void;
  captureQueue: number;
  setCaptureQueue: (value: number) => void;
}

export const useBoothProvider = create<BoothProps>((set) => ({
  images: [],
  setImages: (imageUrls) => set({ images: imageUrls }),
  addImage: (imageUrl) =>
    set((state) => ({ images: [imageUrl, ...state.images] })),
  isMirrored: true,
  toggleMirror: () => set((state) => ({ isMirrored: !state.isMirrored })),
  videoRef: null,
  setVideoRef: (ref) => set({ videoRef: ref }),
  countdown: -1,
  setCountdown: (value) => set({ countdown: value }),
  captureQueue: 0,
  setCaptureQueue: (value: number) => set({ captureQueue: value }),
}));
