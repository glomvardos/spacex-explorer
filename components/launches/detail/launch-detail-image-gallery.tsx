'use client';

import { type KeyboardEvent, useState } from 'react';

import Image from 'next/image';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type LaunchDetailImageGalleryProps = {
  images: string[];
  launchName: string;
};

function getPreviousImageIndex(index: number, imagesCount: number) {
  return index === 0 ? imagesCount - 1 : index - 1;
}

function getNextImageIndex(index: number, imagesCount: number) {
  return index === imagesCount - 1 ? 0 : index + 1;
}

export function LaunchDetailImageGallery({
  images,
  launchName,
}: LaunchDetailImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const selectedImage =
    selectedImageIndex === null ? null : images[selectedImageIndex];
  const selectedImageNumber =
    selectedImageIndex === null ? null : selectedImageIndex + 1;
  const hasMultipleImages = images.length > 1;

  function closeGallery() {
    setSelectedImageIndex(null);
  }

  function showPreviousImage() {
    setSelectedImageIndex((index) =>
      index === null ? index : getPreviousImageIndex(index, images.length),
    );
  }

  function showNextImage() {
    setSelectedImageIndex((index) =>
      index === null ? index : getNextImageIndex(index, images.length),
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!hasMultipleImages) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPreviousImage();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNextImage();
    }
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className="bg-card focus-visible:ring-ring/30 hover:border-foreground/30 relative aspect-[4/3] overflow-hidden rounded-md border transition-colors focus-visible:ring-3 focus-visible:outline-none"
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              src={image}
              alt={`${launchName} image ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog
        open={selectedImage !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeGallery();
          }
        }}
      >
        <DialogContent className="p-3 sm:p-4" onKeyDown={handleKeyDown}>
          <DialogHeader className="pr-10">
            <DialogTitle>{launchName}</DialogTitle>
            {selectedImageNumber !== null ? (
              <DialogDescription>
                Image {selectedImageNumber} of {images.length}
              </DialogDescription>
            ) : null}
          </DialogHeader>

          <div className="relative grid min-h-[18rem] place-items-center overflow-hidden rounded-md bg-black sm:min-h-[30rem]">
            {selectedImage && selectedImageNumber !== null ? (
              <Image
                src={selectedImage}
                alt={`${launchName} image ${selectedImageNumber}`}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-contain"
                priority
              />
            ) : null}

            {hasMultipleImages ? (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute left-3"
                  onClick={showPreviousImage}
                >
                  <ChevronLeft aria-hidden="true" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute right-3"
                  onClick={showNextImage}
                >
                  <ChevronRight aria-hidden="true" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
