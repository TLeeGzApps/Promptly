import type { SVGProps } from 'react';
import Image from 'next/image';

export const Logo = (props: SVGProps<SVGSVGElement> & {className?: string}) => (
  <Image
    src="https://ik.imagekit.io/ag5q0my3t/erasebg-transformed~2.png"
    alt="Logo"
    width={24}
    height={24}
    className={props.className}
  />
);
