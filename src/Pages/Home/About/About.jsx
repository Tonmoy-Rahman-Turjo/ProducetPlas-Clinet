
import AOS from 'aos';
import 'aos/dist/aos.css'; 
const About = () => {
    return (
        <div>
            <section id="about" className="py-20 bg-gradient-to-r bg-[#4dd7e95e] text-white">
      <div className=" mx-auto px-4">
        <div  className=" ">
          <h2 data-aos="fade-up"  className="text-4xl font-bold text-center mb-8">Welcome to Our Journey</h2>
          <div data-aos="fade-up"  className="flex md:flex-row  flex-col w-10/12 rounded-lg shadow-2xl shadow-black bg-[#3778c242] py-10 items-center m-auto gap-20 justify-center">
            <div>
                <img className="h-80 w-96" src="https://i.postimg.cc/wTvYbjZJ/company.avif" alt="" />
            </div>



            <div className="md:w-[800px] w-full px-3">
            <p className="text-lg leading-relaxed mb-8">
            Founded with a vision to redefine possibilities, our journey began in 2010. Since
            then, we've been dedicated to crafting exceptional digital experiences that inspire
            and innovate. At the heart of everything we do lies a passion for technology and a
            commitment to excellence.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            Our team of visionary creators and problem solvers strives to push boundaries and
            deliver solutions that make a lasting impact. Whether it's designing intuitive user
            interfaces or building robust backend systems, we're here to turn ideas into reality.
          </p>
          <p className="text-lg leading-relaxed">
            Join us on this journey of transformation and discovery. Together, we can build a
            future where innovation knows no bounds.
          </p>
            </div>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
};

export default About;
