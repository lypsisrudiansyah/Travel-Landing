'use client';

import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import React from 'react';
import parse, { domToReact, Element, Text as HtmlText } from 'html-react-parser';

type StaggeredFadeTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  groupSize?: number;
  isHtml?: boolean;
};

export const StaggeredFadeText: React.FC<StaggeredFadeTextProps> = ({
  text,
  as = 'p',
  className = '',
  groupSize = 1,
  isHtml = false,
}) => {
  const variants = {
    hidden: { opacity: 0 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07 },
    }),
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const splitText = (str: string, size: number): string[] =>
    str.match(new RegExp(`.{1,${size}}`, 'g')) || [];


  const getMotionComponent = (tag: keyof JSX.IntrinsicElements) => {
    switch (tag) {
      case 'p':
        return motion.p;
      case 'h1':
        return motion.h1;
      case 'h2':
        return motion.h2;
      case 'span':
        return motion.span;
      case 'div':
        return motion.div;
      default:
        return motion.p;
    }
  };
  
  const MotionTag = getMotionComponent(as);
  let index = 0;

  const animateHtml = (htmlString: string) =>
    parse(htmlString, {
      replace: (domNode) => {
        if (domNode.type === 'text') {
          const textNode = domNode as HtmlText;
          const chunks = groupSize > 1 ? splitText(textNode.data, groupSize) : textNode.data.split('');

          return (
            <>
              {chunks.map((chunk, i) => {
                const currentIndex = index++;
                return (
                  <motion.span key={`${chunk}-${currentIndex}`} variants={variants} custom={currentIndex}>
                    {chunk}
                  </motion.span>
                );
              })}
            </>
          );
        }

        if (domNode.type === 'tag') {
          const el = domNode as Element;
          return React.createElement(
            el.name,
            el.attribs,
            domToReact(el.children, { replace: (child) => animateHtml(parse(child.data || '').toString()) })
          );
        }
      },
    });

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={variants}
      viewport={{ once: true }}
      className={cn(className)}
    >
      {isHtml ? animateHtml(text) : (
        (groupSize > 1 ? splitText(text, groupSize) : text.split('')).map((chunk, i) => (
          <motion.span key={`${chunk}-${i}`} variants={variants} custom={i}>
            {chunk}
          </motion.span>
        ))
      )}
    </MotionTag>
  );
};
