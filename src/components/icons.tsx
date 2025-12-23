import type { SVGProps } from 'react';
import Image from 'next/image';

export const Logo = (props: SVGProps<SVGSVGElement> & {className?: string}) => (
  <Image
    src="https://ik.imagekit.io/ag5q0my3t/erasebg-transformed~3.png"
    alt="Logo"
    width={48}
    height={48}
    className={props.className}
  />
);
