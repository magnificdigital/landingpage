import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Legal Notice | Magnific Digital' : 'Mentions Légales | Magnific Digital',
    description: locale === 'en' ? 'Legal notice for Magnific Digital website.' : 'Mentions légales du site Magnific Digital.',
  };
}

export default async function MentionsLegales({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-white dark:bg-[#0F172A]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" className="fill-[#1E3A8A] dark:fill-blue-600" />
              <path d="M8 24V12L13 20L18 12L23 20L28 12V24" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="28" cy="12" r="2" fill="#F97316"/>
            </svg>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#1E3A8A] dark:text-blue-400">MAGNIFIC</span>
              <span className="text-[#F97316]"> DIGITAL</span>
            </span>
          </Link>
          <Link href={`/${locale}`} className="text-sm text-muted-foreground hover:text-[#F97316] transition-colors">
            &larr; {isEn ? 'Back to site' : 'Retour au site'}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-blue-400 mb-8">
          {isEn ? 'Legal Notice' : 'Mentions Légales'}
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '1. Site Publisher' : '1. Éditeur du site'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn ? (
                <>The website <strong>magnificdigital.net</strong> is published by:<br /><br />
                <strong>Magnific Digital</strong><br />
                Legal form: Sole proprietorship / SAS (to be specified)<br />
                Head office: Montreal, Quebec, Canada<br />
                Phone: +1 (438) 350-2445<br />
                Email: contact@magnificdigital.net<br />
                Business number: (to be completed)<br />
                Publication director: (Director&apos;s name)</>
              ) : (
                <>Le site <strong>magnificdigital.net</strong> est édité par :<br /><br />
                <strong>Magnific Digital</strong><br />
                Forme juridique : Entreprise individuelle / SAS (à préciser)<br />
                Siège social : Montréal, Québec, Canada<br />
                Téléphone : +1 (438) 350-2445<br />
                Email : contact@magnificdigital.net<br />
                Numéro d&apos;entreprise : (à compléter)<br />
                Directeur de la publication : (Nom du dirigeant)</>
              )}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '2. Hosting' : '2. Hébergement'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn ? (
                <>The website is hosted by:<br /><br />
                <strong>Vercel Inc.</strong><br />
                340 S Lemon Ave #4133, Walnut, CA 91789, United States<br />
                Website: vercel.com</>
              ) : (
                <>Le site est hébergé par :<br /><br />
                <strong>Vercel Inc.</strong><br />
                340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
                Site web : vercel.com</>
              )}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '3. Intellectual Property' : '3. Propriété intellectuelle'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'All content on the magnificdigital.net website (text, images, graphics, logo, icons, etc.) is the exclusive property of Magnific Digital, unless otherwise stated. Any reproduction, representation, modification, publication, or adaptation of all or part of the site\'s elements, by any means or process, is prohibited without the prior written consent of Magnific Digital.'
                : 'L\'ensemble du contenu du site magnificdigital.net (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de Magnific Digital, sauf mention contraire. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l\'autorisation écrite préalable de Magnific Digital.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '4. Limitation of Liability' : '4. Limitation de responsabilité'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'Magnific Digital strives to ensure the accuracy and timeliness of information published on this website. However, Magnific Digital cannot guarantee the accuracy, precision, or completeness of the information made available on this website. Magnific Digital disclaims all liability for any inaccuracy, error, or omission in the information available on this website.'
                : 'Magnific Digital s\'efforce d\'assurer l\'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Magnific Digital ne peut garantir l\'exactitude, la précision ou l\'exhaustivité des informations mises à disposition sur ce site. Magnific Digital décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '5. Hyperlinks' : '5. Liens hypertextes'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'The magnificdigital.net website may contain hyperlinks to other websites. Magnific Digital has no control over these websites and disclaims all liability regarding their content or privacy practices.'
                : 'Le site magnificdigital.net peut contenir des liens hypertextes vers d\'autres sites internet. Magnific Digital n\'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou aux pratiques de confidentialité de ces sites tiers.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '6. Applicable Law' : '6. Droit applicable'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'These legal notices are governed by Canadian law and the Province of Quebec. In the event of a dispute, the courts of Montreal shall have exclusive jurisdiction.'
                : 'Les présentes mentions légales sont régies par le droit canadien et la province du Québec. En cas de litige, les tribunaux de Montréal seront seuls compétents.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn ? 'For any questions regarding these legal notices, you can contact us at:' : 'Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à :'}<br />
              <a href="mailto:contact@magnificdigital.net" className="text-[#F97316] hover:underline">
                contact@magnificdigital.net
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            {isEn ? 'Last updated: ' : 'Dernière mise à jour : '}
            {new Date().toLocaleDateString(isEn ? 'en-CA' : 'fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </main>
    </div>
  );
}
