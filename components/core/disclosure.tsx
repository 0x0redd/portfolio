'use client';

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { motion, Variants, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

const Disclosure = CollapsiblePrimitive.Root;

const DisclosureTrigger = CollapsiblePrimitive.Trigger;

interface DisclosureContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {
  variants?: Variants;
  transition?: Transition;
}

const DisclosureContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  DisclosureContentProps
>(({ className, children, variants, transition, ...props }, ref) => {
  const defaultVariants: Variants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { opacity: 1, height: 'auto' },
  };

  const defaultTransition: Transition = {
    type: 'spring' as const,
    stiffness: 26.7,
    damping: 4.1,
    mass: 0.2,
  };

  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      <motion.div
        initial="collapsed"
        animate="expanded"
        exit="collapsed"
        variants={variants || defaultVariants}
        transition={transition || defaultTransition}
      >
        {children}
      </motion.div>
    </CollapsiblePrimitive.Content>
  );
});

DisclosureContent.displayName = 'DisclosureContent';

export { Disclosure, DisclosureTrigger, DisclosureContent };
