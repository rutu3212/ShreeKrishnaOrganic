import IntroAnimation from "../home/IntroAnimation";
import Hero from "../home/Hero";
import Categories from "../home/Categories";
import FeaturedProducts from "../home/FeaturedProduct";
import StorySection from "../home/StorySection";
import WhySrikrishn from "../home/whyShrikrishan";
import OffersSection from "../home/OfferSection";
import Testimonials from "../home/Testimonials";

export default function Home() {
  return (
    <>
      <IntroAnimation />

      <Hero />

      <Categories />

      <FeaturedProducts />

      <StorySection />

      <WhySrikrishn />

      <OffersSection />

      <Testimonials />
    </>
  );
}