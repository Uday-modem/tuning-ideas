import React from 'react';
import type { SideContent } from '../content';
import HeroSection from '../components/sections/HeroSection';
import AboutTeaser from '../components/sections/AboutTeaser';
import ProblemCards from '../components/sections/ProblemCards';
import ServicesGrid from '../components/sections/ServicesGrid';
import WhoWeServe from '../components/sections/WhoWeServe';
import StackMarquee from '../components/sections/StackMarquee';
import ProgressArc from '../components/sections/ProgressArc';
import SelectedWork from '../components/sections/SelectedWork';
import ReviewsCarousel from '../components/sections/ReviewsCarousel';
import GetInTouch from '../components/sections/GetInTouch';

interface Props {
  side: SideContent;
}

/**
 * Main page of a pillar.
 *  Digital Solutions: short About / Services / Work / Reviews, each with a Load more / Learn more.
 *  Student Lab: hero → problem → services → who we serve → stack → progress → selected work → reviews → contact.
 */
const SideHome: React.FC<Props> = ({ side }) => {
  const isDigital = side.key === 'digital';
  return (
    <>
      <HeroSection side={side} />
      {isDigital && <AboutTeaser side={side} />}
      <ProblemCards side={side} />
      <ServicesGrid side={side} limit={4} />
      <WhoWeServe side={side} />
      <StackMarquee />
      <ProgressArc side={side} />
      <SelectedWork side={side} initial={3} expandable={isDigital} />
      <ReviewsCarousel side={side} expandable={isDigital} />
      <GetInTouch side={side} />
    </>
  );
};

export default SideHome;
