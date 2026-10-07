import { Search, Heart, Star, GraduationCap, Users } from 'lucide-react';
import SectionCard from './SectionCard';
import SectionTitle from './SectionTitle';

const expectations = [
  {
    icon: Star,
    title: 'Religious Values',
    description: 'A practicing Muslimah who prays regularly and values Islamic principles',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Well-educated with a minimum of graduate degree',
  },
  {
    icon: Heart,
    title: 'Character',
    description: 'Caring, understanding, and supportive nature with good moral values',
  },
  {
    icon: Users,
    title: 'Family-Oriented',
    description: 'Someone who values family bonds and respects elders',
  },
];

const LookingFor = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Looking For"
          subtitle="Expectations from a life partner"
        />

        <div className="max-w-3xl mx-auto">
          <SectionCard>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold text-secondary-foreground mb-4">
                <Search size={28} />
              </div>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Seeking a pious life partner who can be a companion in this world 
                and the hereafter, InshaAllah.
              </p>
            </div>

            {/* Expectations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expectations.map((item, index) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-secondary/20 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-gradient-emerald group-hover:text-primary-foreground transition-all">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="mt-8 p-4 rounded-xl bg-secondary/10 border border-secondary/20 text-center">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Note:</span> Looking for someone from a 
                <span className="text-primary font-medium"> respectable Muslim family</span> 
                {' '}who shares similar values and life goals.
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
};

export default LookingFor;
