import SectionCard from './SectionCard';
import SectionTitle from './SectionTitle';
import { Users, Heart, Baby } from 'lucide-react';
import { Parallax } from './Parallax';

const familyData = [
  { label: "Father's Name", value: 'Late Mr. Abrar Hussain' },
  { label: 'Occupation', value: 'Business' },
  { label: "Mother's Name", value: 'Mrs. Nasibun Nisha' },
  { label: 'Occupation', value: 'House Wife' },
  { label: 'Family Type', value: 'Joint Family' },
  { label: 'Native Place', value: 'Lucknow, Uttar Pradesh' },
];

const siblingsData = [
  {
    position: '1st',
    type: 'Elder Brother',
    status: 'Married',
    icon: Users,
    details: 'Wife & 2 Children',
    color: 'from-amber-500 to-yellow-400',
    isMe: false,
  },
  {
    position: '2nd',
    type: 'Elder Brother',
    status: 'Married',
    icon: Users,
    details: 'Wife & 1 Child',
    color: 'from-amber-500 to-yellow-400',
    isMe: false,
  },
  {
    position: '3rd',
    type: 'Elder Brother',
    status: 'Unmarried',
    icon: Users,
    details: '',
    color: 'from-amber-400 to-yellow-300',
    isMe: false,
  },
  {
    position: '4th',
    type: 'Shah Hussain',
    status: 'Unmarried',
    icon: Users,
    details: 'That\'s Me!',
    color: 'from-secondary to-amber-400',
    isMe: true,
  },
  {
    position: '5th',
    type: 'Younger Brother',
    status: 'Unmarried',
    icon: Users,
    details: '',
    color: 'from-amber-400 to-yellow-300',
    isMe: false,
  },
  {
    position: '',
    type: 'Sister',
    status: 'Married',
    icon: Heart,
    details: '',
    color: 'from-rose-400 to-pink-400',
    isMe: false,
  },
];

const Family = () => {
  return (
    <section id="family" className="py-16 sm:py-20 md:py-24 bg-section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute inset-0 islamic-pattern" />

      {/* Floating Parallax Atmosphere Orbs */}
      <Parallax speed={-0.2} className="absolute -top-28 -right-28 w-96 h-96 pointer-events-none">
        <div className="w-full h-full gold-glow-orb opacity-35" />
      </Parallax>
      <Parallax speed={0.2} className="absolute -bottom-28 -left-28 w-96 h-96 pointer-events-none">
        <div className="w-full h-full emerald-glow-orb opacity-45" />
      </Parallax>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="Family Details"
          subtitle="Honorable family heritage and siblings overview"
          arabic="الْبَيْتُ وَالْأُسْرَةُ"
        />

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
          {/* Parent Information */}
          <SectionCard speed={0.05}>
            <div className="space-y-0">
              {familyData.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
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

          {/* Siblings Section */}
          <SectionCard speed={0.08}>
            {/* Decorative Corner Elements */}
            <div className="hidden sm:block absolute top-4 left-4 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-t-2 border-secondary/40 rounded-tl-lg" />
            <div className="hidden sm:block absolute top-4 right-4 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-t-2 border-secondary/40 rounded-tr-lg" />
            <div className="hidden sm:block absolute bottom-4 left-4 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-b-2 border-secondary/40 rounded-bl-lg" />
            <div className="hidden sm:block absolute bottom-4 right-4 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-b-2 border-secondary/40 rounded-br-lg" />

            {/* Decorative Floral Icons */}
            <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 text-secondary/30 text-sm">❧</div>
            <div className="hidden sm:block absolute bottom-3 left-1/2 -translate-x-1/2 text-secondary/30 rotate-180 text-sm">❧</div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gold-gradient mb-1 sm:mb-2 text-center font-sans tracking-wide">
              Siblings Overview
            </h3>
            <p className="text-center text-secondary/80 mb-6 sm:mb-8 tracking-wider sm:tracking-widest text-xs sm:text-sm font-sans">
              5 Brothers & 1 Sister
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 auto-rows-fr">
              {siblingsData.map((sibling, index) => (
                <div
                  key={index}
                  className="relative group h-full"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Highlight glow for "Me" */}
                  {sibling.isMe && (
                    <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-br from-secondary/40 via-amber-500/30 to-secondary/40 rounded-2xl blur-md animate-pulse" />
                  )}

                  <div className={`relative overflow-hidden rounded-2xl p-3.5 sm:p-5 text-center transition-all duration-300 h-full flex flex-col active:scale-[0.98] ${
                    sibling.isMe
                      ? 'bg-gradient-to-br from-amber-950/70 via-secondary/20 to-amber-900/50 border-2 border-secondary/60 shadow-xl shadow-secondary/20 hover:scale-[1.02]'
                      : 'bg-gradient-to-br from-card/80 to-card/50 border border-secondary/20 hover:border-secondary/50 hover:bg-card/90'
                  }`}>
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-secondary/5 to-secondary/10 pointer-events-none" />

                    {/* Position Badge */}
                    {sibling.position && (
                      <span className={`absolute top-0 right-0 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1 rounded-bl-xl rounded-tr-2xl shadow-md ${
                        sibling.isMe
                          ? 'bg-gradient-to-r from-secondary to-amber-400 text-primary font-extrabold'
                          : 'bg-gradient-to-r from-secondary/80 to-amber-500/80 text-primary'
                      }`}>
                        {sibling.position}
                      </span>
                    )}

                    {/* Icon Container */}
                    <div className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                      sibling.isMe
                        ? 'bg-gradient-to-br from-secondary via-amber-400 to-secondary ring-2 sm:ring-4 ring-secondary/30 ring-offset-2 ring-offset-transparent'
                        : sibling.type === 'Sister'
                          ? 'bg-gradient-to-br from-rose-400 to-pink-500'
                          : 'bg-gradient-to-br from-secondary to-amber-500'
                    }`}>
                      <sibling.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${sibling.isMe ? 'text-primary' : 'text-white'}`} />
                    </div>

                    {/* Name/Type */}
                    <h4 className={`font-sans font-semibold mb-1 sm:mb-2 transition-colors text-xs sm:text-sm md:text-base ${
                      sibling.isMe
                        ? 'text-gold-gradient text-sm sm:text-base md:text-lg font-bold'
                        : 'text-foreground/90'
                    }`}>
                      {sibling.type}
                    </h4>

                    {/* Status Badge */}
                    <span className={`inline-block mx-auto px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium tracking-wide ${
                      sibling.status === 'Married'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                    }`}>
                      {sibling.status}
                    </span>

                    {/* Details */}
                    <div className="mt-auto pt-2 sm:pt-3">
                      <div className={`flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm min-h-[1.25rem] sm:min-h-[1.5rem] ${
                        sibling.isMe
                          ? 'text-secondary font-bold animate-pulse'
                          : 'text-foreground/60'
                      }`}>
                        {sibling.details ? (
                          <>
                            {!sibling.isMe && <Baby className="w-3 h-3 sm:w-4 sm:h-4 text-secondary/70" />}
                            <span>{sibling.details}</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Quranic Verse with Parallax */}
          <SectionCard speed={0.1}>
            <div className="text-center px-2 py-1">
              <p className="font-arabic text-xl sm:text-2xl md:text-3xl text-gold-luxury mb-2.5 drop-shadow-sm">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
              </p>
              <p className="text-foreground/80 italic text-xs sm:text-sm md:text-base font-sans">
                "And among His Signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them."
              </p>
              <p className="text-secondary text-xs sm:text-sm mt-1.5 font-sans font-medium">— Surah Ar-Rum (30:21)</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
};

export default Family;
