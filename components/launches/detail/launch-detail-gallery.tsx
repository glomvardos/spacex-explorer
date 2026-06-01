import { ImageOff } from 'lucide-react';

import { LaunchDetailImageGallery } from '@/components/launches/detail/launch-detail-image-gallery';

type LaunchDetailGalleryProps = {
  images: string[];
  launchName: string;
};

export function LaunchDetailGallery({
  images,
  launchName,
}: LaunchDetailGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="bg-card rounded-md border px-5 py-8 text-center">
        <ImageOff
          className="text-muted-foreground mx-auto size-8"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-lg font-semibold">No Flickr images</h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-6">
          SpaceX has not published Flickr images for this launch.
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-3" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="text-xl font-semibold">
        Flickr gallery
      </h2>
      <LaunchDetailImageGallery images={images} launchName={launchName} />
    </section>
  );
}
