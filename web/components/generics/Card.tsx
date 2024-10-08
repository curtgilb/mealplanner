import React, { ReactNode } from "react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  loading?: boolean;
  image: {
    images: { url: string | null | undefined; altText: string }[];
    placeholder: string;
    grid: boolean;
  };
  vertical: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  props,
  forwardedRef
) {
  const { children, loading, image, vertical, ...rest } = props;
  const { className, ...additionalProps } = rest;

  return (
    <div
      {...additionalProps}
      ref={forwardedRef}
      className={cn(className, "border rounded-md overflow-hidden bg-card", {
        vertical: "w-60",
      })}
    >
      {loading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <CardImage images={image} />
      )}

      <div className={cn("p-2 text-left", { "px-4 py-2.5": vertical })}>
        {loading ? (
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
});

interface CardImageProps {
  images: CardProps["image"];
}

function CardImage({ images }: CardImageProps) {
  const showGrid = images.grid && images.images.length > 1;

  return (
    <div className="overflow-hidden">
      <Image
        className="group-hover:scale-105 transition-transform"
        src="/pancakes.jpg"
        alt="recipe image"
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
        width={200}
        height={200}
      />
    </div>
  );
}
