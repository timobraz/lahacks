import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import Link from "next/link";
type BackProps = {
  after: string;
};
export function Next({ after }: BackProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Next</span>
      <Link href={after}>
        <Button size="icon" variant="outline">
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </Link>
    </div>
  );
}

function ArrowRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
