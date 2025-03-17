import { MagicCard } from './MagicCard';
import { ScrollAnimation } from './ScrollAnimation';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: "Full-Stack Development",
      description: "Building scalable web applications with React, Node.js, and modern cloud infrastructure. Specializing in real-time features and high-performance systems.",
      icon: "⚡"
    },
    {
      title: "Native Mobile Apps",
      description: "Crafting seamless iOS and Android experiences with Swift and Kotlin. Focus on offline-first architecture and smooth animations.",
      icon: "📱"
    },
    {
      title: "DevSecOps",
      description: "Implementing secure CI/CD pipelines, container orchestration, and automated security scanning. Expert in AWS and Azure environments.",
      icon: "🛡️"
    },
    {
      title: "Security Testing",
      description: "In-depth penetration testing, code audits, and security assessments. OWASP Top 10 compliance and custom security solutions.",
      icon: "🔐"
    },
    {
      title: "Product Design",
      description: "Creating intuitive interfaces with Figma and Adobe Suite. User research, wireframing, and pixel-perfect implementations.",
      icon: "✨"
    },
    {
      title: "Tech Strategy",
      description: "Guiding startups and enterprises in technology decisions. Architecture planning, team building, and digital transformation.",
      icon: "🎯"
    }
  ];

  return (
    <section className="py-20 bg-[#0a0a0a]" id="services">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                What We Do Best
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Leveraging cutting-edge tech to solve complex challenges. Each service is tailored to your specific needs and industry requirements.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.1,
                  ease: "easeOut" 
                }}
              >
                <MagicCard 
                  className="rounded-xl border border-gray-800 h-full"
                  gradientFrom="#9E7AFF"
                  gradientTo="#FE8BBB"
                  gradientSize={150}
                  gradientOpacity={0.5}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 