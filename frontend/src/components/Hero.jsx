import { ScrollAnimation } from './ScrollAnimation';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-dark-primary to-dark-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center overflow-hidden">
          <ScrollAnimation>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500">
              Crafting Digital Excellence
            </h1>
          </ScrollAnimation>
          {/* todo: fix glow */}
          <ScrollAnimation>
            <p className="text-base sm:text-lg text-gray-300 mb-8">
              From concept to deployment, we're your partners in building remarkable digital experiences. Let's turn your vision into reality.
            </p>
          </ScrollAnimation>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center gap-4"
          >
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all duration-300 text-sm sm:text-base sm:px-8 sm:py-3">
              Explore Work
            </button>
            <button className="border border-gray-600 text-white px-6 py-2.5 rounded-lg hover:border-purple-500 transition-all duration-300 text-sm sm:text-base sm:px-8 sm:py-3">
              Get in Touch
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 