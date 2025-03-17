const About = () => {
  return (
    <section className="py-20 bg-dark-primary" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About Vinidra Technologies</h2>
              {/* <p></p> */}
              <p className="text-gray-400 mb-6">
                We specialize in creating innovative software and web solutions to shape the future of technology. 
                With a passion for excellence and a commitment to pushing boundaries, we deliver cutting-edge 
                solutions that help businesses thrive in the digital age.
              </p>
              <p className="text-gray-400 mb-6">
                Our team of expert developers, designers, and strategists work together to create seamless digital 
                experiences that drive results. We combine technical expertise with creative innovation to deliver 
                solutions that exceed expectations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-3xl font-bold text-blue-500 mb-2">150+</h3>
                  <p className="text-gray-400">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-500 mb-2">50+</h3>
                  <p className="text-gray-400">Happy clients</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800"
                  alt="team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg">
                <p className="text-lg font-semibold">10+ Years</p>
                <p className="text-sm opacity-75">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 