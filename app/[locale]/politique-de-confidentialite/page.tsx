import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Privacy Policy | Magnific Digital' : 'Politique de Confidentialité | Magnific Digital',
    description: locale === 'en'
      ? 'Privacy policy and personal data protection at Magnific Digital.'
      : 'Politique de confidentialité et protection des données personnelles de Magnific Digital.',
  };
}

export default async function PolitiqueConfidentialite({
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
          {isEn ? 'Privacy Policy' : 'Politique de Confidentialité'}
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'At Magnific Digital, we place the utmost importance on protecting your personal data. This privacy policy describes the types of data we collect, how we use, share, and protect them when you use our website magnificdigital.net and our services.'
                : 'Chez Magnific Digital, nous accordons une importance capitale à la protection de vos données personnelles. Cette politique de confidentialité décrit les types de données que nous collectons, comment nous les utilisons, les partageons et les protégeons lorsque vous utilisez notre site web magnificdigital.net et nos services.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '2. Data Collected' : '2. Données collectées'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              {isEn
                ? 'We collect the following data when you use our contact form:'
                : 'Nous collectons les données suivantes lorsque vous utilisez notre formulaire de contact :'}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              {isEn ? (
                <>
                  <li>First and last name</li>
                  <li>Company name</li>
                  <li>Email address</li>
                  <li>Phone number (optional)</li>
                  <li>Message content</li>
                </>
              ) : (
                <>
                  <li>Nom et prénom</li>
                  <li>Nom de l&apos;entreprise</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone (optionnel)</li>
                  <li>Contenu du message</li>
                </>
              )}
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              {isEn
                ? 'We also automatically collect certain technical data: IP address, browser type, pages visited, and visit duration (via analytics cookies).'
                : 'Nous collectons également automatiquement certaines données techniques : adresse IP, type de navigateur, pages visitées et durée de visite (via des cookies analytiques).'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '3. Processing Purposes' : '3. Finalités du traitement'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              {isEn ? 'Your personal data is processed for the following purposes:' : 'Vos données personnelles sont traitées pour les finalités suivantes :'}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              {isEn ? (
                <>
                  <li>Responding to your contact and consultation requests</li>
                  <li>Providing you with information about our services</li>
                  <li>Improving the user experience of our website</li>
                  <li>Generating anonymous traffic statistics</li>
                  <li>Complying with our legal and regulatory obligations</li>
                </>
              ) : (
                <>
                  <li>Répondre à vos demandes de contact et de consultation</li>
                  <li>Vous fournir des informations sur nos services</li>
                  <li>Améliorer l&apos;expérience utilisateur de notre site</li>
                  <li>Établir des statistiques de fréquentation anonymes</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                </>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '4. Legal Basis for Processing' : '4. Base légale du traitement'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'The processing of your data is based on your consent (submission of the contact form) and our legitimate interest (improving our services and traffic analysis).'
                : 'Le traitement de vos données repose sur votre consentement (envoi du formulaire de contact) et sur notre intérêt légitime (amélioration de nos services et analyse de fréquentation).'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '5. Data Sharing' : '5. Partage des données'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              {isEn
                ? 'Your personal data is never sold to third parties. It may be shared with:'
                : 'Vos données personnelles ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :'}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              {isEn ? (
                <>
                  <li><strong>Formspree</strong> — contact form processing (US servers)</li>
                  <li><strong>Vercel</strong> — website hosting (US and global servers)</li>
                  <li><strong>Google Analytics</strong> — traffic analysis (if enabled)</li>
                </>
              ) : (
                <>
                  <li><strong>Formspree</strong> — traitement des formulaires de contact (serveurs aux États-Unis)</li>
                  <li><strong>Vercel</strong> — hébergement du site web (serveurs aux États-Unis et dans le monde)</li>
                  <li><strong>Google Analytics</strong> — analyse de fréquentation (si activé)</li>
                </>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '6. Data Retention' : '6. Durée de conservation'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'Your contact data is kept for a maximum of 24 months from your last contact with us, unless a longer legal retention obligation applies. Anonymized analytics data may be kept longer.'
                : 'Vos données de contact sont conservées pendant une durée maximale de 24 mois à compter de votre dernier contact avec nous, sauf obligation légale de conservation plus longue. Les données analytiques anonymisées peuvent être conservées plus longtemps.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'Our website uses essential cookies for proper site functionality (theme preferences). Analytics cookies may be used to measure site traffic. You can manage your cookie preferences in your browser settings.'
                : 'Notre site utilise des cookies essentiels au bon fonctionnement du site (préférences de thème). Des cookies analytiques peuvent être utilisés pour mesurer l\'audience du site. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '8. Your Rights' : '8. Vos droits'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              {isEn
                ? 'In accordance with Quebec\'s Act Respecting the Protection of Personal Information in the Private Sector (Law 25) and the General Data Protection Regulation (GDPR), you have the following rights:'
                : 'Conformément à la Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25) et au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :'}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              {isEn ? (
                <>
                  <li><strong>Right of access</strong> — obtain a copy of your personal data</li>
                  <li><strong>Right to rectification</strong> — correct inaccurate data</li>
                  <li><strong>Right to erasure</strong> — request deletion of your data</li>
                  <li><strong>Right to portability</strong> — receive your data in a structured format</li>
                  <li><strong>Right to object</strong> — object to the processing of your data</li>
                  <li><strong>Right to withdraw consent</strong> — withdraw your consent at any time</li>
                </>
              ) : (
                <>
                  <li><strong>Droit d&apos;accès</strong> — obtenir une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification</strong> — corriger vos données inexactes</li>
                  <li><strong>Droit de suppression</strong> — demander l&apos;effacement de vos données</li>
                  <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
                  <li><strong>Droit d&apos;opposition</strong> — vous opposer au traitement de vos données</li>
                  <li><strong>Droit de retrait du consentement</strong> — retirer votre consentement à tout moment</li>
                </>
              )}
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              {isEn ? 'To exercise these rights, contact us at: ' : 'Pour exercer ces droits, contactez-nous à : '}
              <a href="mailto:contact@magnificdigital.net" className="text-[#F97316] hover:underline">
                contact@magnificdigital.net
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isEn ? '9. Security' : '9. Sécurité'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, destruction, or alteration. Our website uses the HTTPS protocol to secure data exchanges.'
                : 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou altération. Notre site utilise le protocole HTTPS pour sécuriser les échanges de données.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. {isEn ? 'Changes' : 'Modifications'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'We reserve the right to modify this privacy policy at any time. Changes will take effect upon publication on this page. We encourage you to check this page regularly.'
                : 'Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur cette page. Nous vous encourageons à consulter régulièrement cette page.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'For any questions regarding this privacy policy or your personal data:'
                : 'Pour toute question relative à cette politique de confidentialité ou à vos données personnelles :'}<br /><br />
              <strong>Magnific Digital</strong><br />
              Email :{' '}
              <a href="mailto:contact@magnificdigital.net" className="text-[#F97316] hover:underline">
                contact@magnificdigital.net
              </a><br />
              {isEn ? 'Phone' : 'Téléphone'} : +1 (438) 350-2445
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
