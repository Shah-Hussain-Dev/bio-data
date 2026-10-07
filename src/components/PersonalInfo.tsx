import SectionCard from './SectionCard';
import SectionTitle from './SectionTitle';
import { Parallax } from './Parallax';

const personalData = [
  { label: 'Full Name', value: 'Shah Hussain' },
  { label: 'Date of Birth', value: '13/02/1998' },
  { label: 'Place of Birth', value: 'Lucknow' },
  { label: 'Religion', value: 'Islam' },
  { label: 'Height', value: "5'4\"" },
  { label: 'Education', value: 'Masters + Advanced IT Diploma' },
  { label: 'Occupation', value: 'Software Engineer' },
];

const PersonalInfo = () => {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-section-light relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute inset-0 islamic-pattern" />

      {/* Floating Parallax Atmosphere Orbs */}
      <Parallax speed={0.2} className="absolute -top-20 -left-20 w-80 h-80 pointer-events-none">
        <div className="w-full h-full gold-glow-orb opacity-40" />
      </Parallax>
      <Parallax speed={-0.2} className="absolute -bottom-20 -right-20 w-80 h-80 pointer-events-none">
        <div className="w-full h-full emerald-glow-orb opacity-50" />
      </Parallax>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="Personal Details"
          subtitle="Essential biographical information about the groom"
          arabic="الْبَيَانَاتُ الشَّخْصِيَّةُ"
        />

        <div className="max-w-3xl mx-auto">
          <SectionCard speed={0.05}>
            <div className="space-y-0">
              {personalData.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-start sm:items-center py-3.5 sm:py-4 border-b border-secondary/10 last:border-0 hover:bg-secondary/5 active:bg-secondary/10 transition-colors rounded-xl px-2 sm:px-3 -mx-1 sm:-mx-2"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="w-28 sm:w-36 md:w-48 text-secondary font-medium text-xs sm:text-sm md:text-base shrink-0 font-sans">
                    {item.label}
                  </span>
                  <span className="text-secondary/60 mx-2 sm:mx-3">:</span>
                  <span className="flex-1 text-foreground font-medium text-sm sm:text-base font-sans">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
