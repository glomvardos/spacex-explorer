'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

type LaunchesBackButtonProps = {
  fallbackHref: string;
};

export function LaunchesBackButton({ fallbackHref }: LaunchesBackButtonProps) {
  const router = useRouter();

  function goBackToLaunches() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="-ml-3 self-start"
      onClick={goBackToLaunches}
    >
      <ArrowLeft aria-hidden="true" />
      Launches
    </Button>
  );
}
