import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Sections";
import { company, appUrl } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sui dati personali e sugli strumenti tecnici del sito pubblico OroActive.",
  alternates: { canonical: "/privacy-policy" }
};

export default function PrivacyPolicy() {
  return <>
    <Nav />
    <main className="mx-auto max-w-4xl px-5 py-12 [overflow-wrap:anywhere] sm:py-20">
      <p className="font-bold uppercase tracking-widest text-orange">OroActive</p>
      <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-warm/70">Informativa per www.oroactive.it · Aggiornata il 22 ottobre 2026</p>
      <div className="mt-10 space-y-8 leading-8 text-warm/80 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-warm [&_a]:underline [&_a]:underline-offset-4">
        <section>
          <h2>Titolare e contatti</h2>
          <p>{company.name}, P.I./C.F. {company.taxId}, con sede legale in {company.registeredOffice}.</p>
          <p>Per la protezione dei dati: <a href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</a>.
            PEC: <a href={`mailto:${company.pec}`}>{company.pec}</a>.</p>
        </section>
        <section>
          <h2>Dati di navigazione</h2>
          <p>L’erogazione del sito comporta il trattamento di dati tecnici, quali indirizzo IP, data e ora della richiesta,
            indirizzo della pagina, informazioni sul browser e risposte del server. Sono utilizzati per rendere disponibili
            i contenuti, diagnosticare errori e proteggere il servizio, sulla base del legittimo interesse alla sua sicurezza e al suo funzionamento.</p>
          <p>Le quotazioni pubbliche sono recuperate dal server: la relativa richiesta al fornitore delle quotazioni non richiede l’invio dei dati identificativi del visitatore.</p>
        </section>
        <section>
          <h2>Contatti volontari</h2>
          <p>Scrivendo ai recapiti indicati, comunichi il tuo indirizzo e il contenuto del messaggio. Questi dati servono a gestire
            la richiesta e, quando pertinente, attività precontrattuali richieste da te o obblighi di legge. Non inviare documenti
            d’identità, dati bancari o altri dati non necessari a una semplice richiesta di informazioni.</p>
          <p>La navigazione è libera; fornire i dati per contattarci è facoltativo, ma senza un recapito non potremo rispondere.</p>
        </section>
        <section>
          <h2>Memorizzazione tecnica sul dispositivo</h2>
          <p>Il sito usa una memoria temporanea di sessione per raggiungere le sezioni della pagina e un service worker
            con cache di pagine e risorse pubbliche per velocizzarne la consultazione. La memoria di sessione termina
            con la chiusura della sessione del browser; la cache viene aggiornata dal sito e può essere rimossa dalle
            impostazioni del browser cancellando i dati di www.oroactive.it.</p>
          <p>Il sito pubblico non attiva strumenti pubblicitari, analytics o di profilazione. Gli strumenti descritti hanno
            solo finalità tecniche. Le impostazioni del browser permettono di limitarne la memorizzazione, con possibili effetti sulle prestazioni.</p>
        </section>
        <section>
          <h2>Conservazione e destinatari</h2>
          <p>I dati sono conservati per il tempo necessario alle finalità indicate, tenendo conto della gestione delle richieste,
            delle esigenze di sicurezza, degli obblighi di legge e di eventuali contestazioni. Possono accedervi personale
            autorizzato, fornitori di hosting e assistenza tecnica per i servizi affidati e autorità nei casi previsti dalla legge.
            I dati non sono diffusi. Per informazioni sui fornitori e sulle eventuali garanzie applicabili a trasferimenti
            fuori dallo Spazio economico europeo puoi contattare il titolare.</p>
        </section>
        <section>
          <h2>I tuoi diritti</h2>
          <p>Nei casi previsti dal GDPR puoi chiedere accesso, rettifica, cancellazione, limitazione e portabilità dei dati,
            oppure opporti al trattamento basato sul legittimo interesse. Scrivi a <a href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</a>.
            Puoi presentare reclamo al <a href="https://www.garanteprivacy.it/i-miei-diritti">Garante per la protezione dei dati personali</a>.</p>
          <p>Il sito pubblico non prende decisioni automatizzate che producano effetti giuridici sui visitatori.</p>
        </section>
        <section>
          <h2>Area riservata e altri siti</h2>
          <p>Il collegamento «Area riservata» apre il gestionale su <a href={appUrl}>app.oroactive.it</a>,
            che presenta la propria informativa per i trattamenti svolti nell’app. Questa pagina riguarda il sito pubblico.
            I siti esterni collegati applicano le proprie informative.</p>
        </section>
      </div>
    </main>
    <SiteFooter />
  </>;
}
