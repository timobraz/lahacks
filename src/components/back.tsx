import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import Link from "next/link";

type BackProps = {
  before: string;
};
export function Back({ before }: BackProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href={before}>
        <Button size="icon" variant="outline">
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
      </Link>
      <span className="text-sm font-medium">Back</span>
    </div>
  );
}

function ArrowLeftIcon(
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
