import SectionCard from './SectionCard';
import SectionTitle from './SectionTitle';
import { Parallax } from './Parallax';

const educationData = [
  { degree: 'Master of Computer Application (MCA)', institution: 'Integral University, Lucknow', year: 'Completed', status: 'Completed' },
  { degree: 'IBM Advanced Diploma in IT, Networking & Cloud Computing', institution: 'IBM Authorized Training Center', year: '2022', status: 'All India Rank 1', highlight: true },
  { degree: 'Bachelor of Commerce (B.Com)', institution: 'Lucknow University', year: '2019', status: 'Completed' },
  { degree: 'ITI in Computer Operator and Programming', institution: 'Industrial Training Institute', year: '2017', status: 'Completed' },
];

const Education = () => {
  return (
    <section id="education" className="py-16 sm:py-20 md:py-24 bg-section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute inset-0 islamic-pattern" />

      {/* Floating Parallax Atmosphere Orbs */}
      <Parallax speed={-0.22} className="absolute -top-24 -right-24 w-80 h-80 pointer-events-none">
        <div className="w-full h-full gold-glow-orb opacity-35" />
      </Parallax>
      <Parallax speed={0.18} className="absolute -bottom-24 -left-24 w-80 h-80 pointer-events-none">
        <div className="w-full h-full emerald-glow-orb opacity-45" />
      </Parallax>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="Education"
          subtitle="Academic qualifications and distinguished accolades"
          arabic="التَّعْلِيمُ وَالْمُؤَهِّلَاتُ"
        />

        <div className="max-w-3xl mx-auto">
          <SectionCard speed={0.06}>
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {educationData.map((item, index) => (
                <div
                  key={index}
                  className={`p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 active:scale-[0.98] ${
                    item.highlight
                      ? 'border-secondary/60 bg-gradient-to-r from-secondary/15 via-secondary/10 to-transparent shadow-lg shadow-secondary/10'
                      : 'border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-secondary font-sans font-semibold text-sm sm:text-base md:text-lg leading-tight">
                      {item.degree}
                    </h3>
                    {item.highlight && (
                      <span className="self-start px-3 py-1 bg-gradient-to-r from-secondary to-amber-400 text-primary text-[10px] sm:text-xs font-bold rounded-full whitespace-nowrap shadow-md">
                        ★ {item.status}
                      </span>
                    )}
                  </div>
                  <p className="text-foreground/75 mb-1.5 text-xs sm:text-sm md:text-base font-sans">{item.institution}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <span className="text-secondary/80 font-medium font-sans">{item.year}</span>
                    {!item.highlight && (
                      <span className="px-2.5 py-0.5 bg-secondary/15 text-secondary rounded-md text-[10px] sm:text-xs font-medium font-sans">
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
};

export default Education;
