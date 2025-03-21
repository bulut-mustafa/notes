'use client';

import { HeroUIProvider } from '@heroui/react';
import { memo } from 'react';

export const Providers = memo(({ children }: { children: React.ReactNode }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
});

Providers.displayName = 'Providers';
