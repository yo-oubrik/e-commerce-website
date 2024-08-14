import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
interface IAvatar {
  src?: string | undefined | null;
  alt?: string;
}
const Avatar: React.FC<IAvatar> = ({ src, alt }) => {
  return src ? (
    <Image
      src={src}
      alt={alt ? alt : ""}
      width={32}
      height={32}
      className="rounded-full"
    />
  ) : (
    <FaUserCircle size={28} />
  );
};

export default Avatar;
