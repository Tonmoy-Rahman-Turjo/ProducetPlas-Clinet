

const Testimonials = () => {
    const testimonials = [
        {
          id: 1,
          name: 'John Doe',
          testimonial: 'Exceptional design skills! Their creativity and attention to detail transformed our project.',
          avatar: 'https://i.postimg.cc/4x8NMc26/download-5.jpg',
        },
        {
          id: 2,
          name: 'Jane Smith',
          testimonial: 'Great service! They exceeded my expectations with prompt responses and top-notch quality',
          avatar: 'https://i.postimg.cc/5t6NMtDZ/download.jpg',
        },
        {
          id: 3,
          name: 'Michael Johnson',
          testimonial: 'Efficient and professional. They delivered exactly what we needed on time and within budget',
          avatar: 'https://i.postimg.cc/xjH8CcqQ/download-1.jpg',
        },
        {
          id: 4,
          name: 'Maical',
          testimonial: 'Outstanding support! Their team went above and beyond to ensure our satisfaction.',
          avatar: 'https://i.postimg.cc/7Yk6TwT2/download-2.jpg',
        },
        {
          id: 5,
          name: 'Helyle',
          testimonial: 'Highly recommended! Their technical expertise and commitment made our project a success.',
          avatar: 'https://i.postimg.cc/DyPzrHqY/download-3.jpg',
        },
        {
          id: 6,
          name: 'Ptarhas',
          testimonial: 'Impressive results! They understood our vision and delivered results that surpassed our expectations. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.',
          avatar: 'https://i.postimg.cc/SxQxDddQ/download-4.jpg',
        },
      ];
    
    return (
        <div>
        <section className="bg-[#33c7d183] py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-[#41babe] hover:bg-red-700 hover:text-white rounded-lg shadow-md overflow-hidden p-4">
              <div className="flex items-center mb-4">
                <img className="w-12 h-12 rounded-full object-cover object-center mr-4" src={testimonial.avatar} alt={testimonial.name} />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                </div>
              </div>
              <p className="text-white hover:text-white">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
        </div>
    );
};

export default Testimonials;
