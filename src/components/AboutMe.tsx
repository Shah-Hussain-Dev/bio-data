import { Sparkles, Book, Code, Heart, Plane, Moon } from 'lucide-react';
import SectionCard from './SectionCard';
import SectionTitle from './SectionTitle';

const traits = [
  'Kind-hearted',
  'Ambitious',
  'Family-oriented',
  'Punctual',
  'Honest',
  'God-fearing',
];

const hobbies = [
  { icon: Book, label: 'Reading Islamic Literature' },
  { icon: Code, label: 'Learning New Technologies' },
  { icon: Moon, label: 'Community Involvement' },
  { icon: Plane, label: 'Traveling' },
];

const AboutMe = () => {
  return (
    <section className="py-20 islamic-pattern">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="About Me"
          subtitle="Personality, interests, and life aspirations"
        />

        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          {/* Personality Traits */}
          <SectionCard delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center text-secondary-foreground">
                <Sparkles size={22} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Personality Traits
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-gradient-emerald text-primary-foreground rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {trait}
                </span>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-xl">
              <p className="text-muted-foreground leading-relaxed">
                A practicing Muslim who believes in maintaining a balance between 
                professional ambitions and religious duties. Values honesty, 
                respect, and kindness in all relationships.
              </p>
            </div>
          </SectionCard>

          {/* Hobbies & Interests */}
          <SectionCard delay={100}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-emerald flex items-center justify-center text-primary-foreground">
                <Heart size={22} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Hobbies & Interests
              </h3>
            </div>

            <div className="space-y-3">
              {hobbies.map((hobby) => (
                <div
                  key={hobby.label}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    <hobby.icon size={18} />
                  </div>
                  <span className="font-medium text-foreground">{hobby.label}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
