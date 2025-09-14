import type { SVGProps } from 'react';

export function ShieldLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2L4.5 5v6.09c0 4.97 3.37 9.47 7.5 10.91 4.13-1.44 7.5-5.94 7.5-10.91V5L12 2zm0 18c-3.31 0-6-2.69-6-6V6.28l6-2.26 6 2.26V11c0 3.31-2.69 6-6 6z" />
    </svg>
  );
}
