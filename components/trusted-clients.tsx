import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Grâce à Magnific Digital, notre service client a gagné 3h/jour d'automatisation.",
    author: 'Directeur des Opérations',
    company: 'PME Industrielle',
  },
  {
    quote: "Excellente maîtrise technique et accompagnement pédagogique top niveau.",
    author: 'Responsable Formation',
    company: 'Groupe Retail',
  },
];

const TrustedClients = () => {
  return (
    <section className="py-20 bg-[#F8FAFC] dark:bg-[#0F172A]/80">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-blue-400 mb-4">
            Ils nous font déjà confiance
          </h2>
          <p className="text-muted-foreground text-lg">
            Des entreprises de toutes tailles transforment leur business avec nous.
          </p>
        </motion.div>

        {/* Client logos placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-8 md:gap-12 flex-wrap mb-16"
        >
          {['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5'].map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="w-32 h-16 bg-white dark:bg-[#1E293B] rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground font-medium text-sm hover:border-[#F97316]/30 hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-all cursor-pointer shadow-sm"
            >
              {client}
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#1E293B] rounded-2xl p-8 shadow-sm border border-border/50 relative"
            >
              <Quote className="size-8 text-[#F97316]/30 absolute top-6 right-6" />
              <p className="text-foreground italic mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-[#1E3A8A] dark:text-blue-400 text-sm">{t.author}</p>
                <p className="text-muted-foreground text-sm">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedClients;
