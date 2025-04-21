import Image from "next/image";
import React from "react";

interface ImageProps extends React.ComponentProps<"img"> {
  size: number;
  width?: number;
  height?: number;
  name: string;
}

const Icons = ({ name, size = 16, width, height, ...props }: ImageProps) => {
  return <Image alt={name} src={`/icons/${name}.svg`} width={size || width} height={size || height} {...props} />;
};

export default Icons;
