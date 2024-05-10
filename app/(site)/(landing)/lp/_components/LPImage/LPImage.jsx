import { Image } from "@nextui-org/image";


export default function LPImage({ src, width, alt, isZoomed, priority, className }) {
  return (
    <Image
      src={`https://ik.imagekit.io/a01bjbmceb/${src}`}
      alt={alt}
      width={width}
      isZoomed={isZoomed}
      className={className || "w-full h-full"}
    />
  )
}