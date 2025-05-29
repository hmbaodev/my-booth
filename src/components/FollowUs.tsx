import { BsQrCode } from 'react-icons/bs';

const FollowUs = () => {
  return (
    <div className="mt-4 lg:flex hidden w-36 flex-col items-center rounded-lg bg-white px-3 py-4">
      <p className="mb-3 text-sm">
        If you find our app interesting, scan the code below and follow us on
        IG.
      </p>
      <BsQrCode className="size-[90%]" />
    </div>
  );
}

export default FollowUs