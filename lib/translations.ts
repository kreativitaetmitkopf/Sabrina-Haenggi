export type Language = 'de' | 'es' | 'en';

export const SUPPORTED_LANGUAGES: Language[] = ['de', 'es', 'en'];
export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_LABELS: Record<Language, string> = {
  de: 'Deutsch',
  es: 'Español',
  en: 'English',
};

export const TRANSLATIONS = {
  de: {
    meta: {
      home: {
        title: "Mobile Pflege & 24/7 Betreuung Lanzarote",
        description: "Ihr deutscher Pflegedienst auf Lanzarote. Mobile Pflege, medizinische Versorgung und 24h Pflege-WG. Jetzt beraten lassen.",
      },
      downloads: {
        title: "Wissenswertes & Checklisten für Pflege auf Lanzarote",
        description: "Laden Sie kostenlose Checklisten, Notfallmappen und E-Books zur Pflege auf den Kanaren herunter. Hilfreiche Vorlagen für Angehörige.",
      },
      downloadDetail: {
        title: "Kostenloser Download: {title}",
        description: "Kostenloser Download: {description} Sichern Sie sich jetzt das PDF von Sabrina Hänggi.",
      },
      waitlist: {
        title: "Warteliste & Broschüre Pflege-WG",
        description: "Melden Sie sich für die Warteliste unserer exklusiven Pflege-WG auf Lanzarote an und erhalten Sie sofort unser Whitepaper.",
      },
      notFound: {
        title: "Download nicht gefunden",
        description: "Fehlerseite",
      },
    },
    nav: {
      services: "Leistungen",
      about: "Über Sabrina",
      families: "Für Angehörige",
      news: "Aktuelles",
      downloads: "Downloads",
      contact: "Kontakt",
      emergency: "Notfall: 112",
      callNow: "Jetzt anrufen",
      brandSub: "Pflege auf Lanzarote",
    },
    footer: {
      brandDesc: "Professionelle Pflege unter Palmen auf Lanzarote. Sicherheit und Lebensqualität für Sie und Ihre Angehörigen. Rund um die Uhr erreichbar.",
      navTitle: "Navigation",
      startpage: "Startseite",
      downloadsAndChecklists: "Downloads & Checklisten",
      impressum: "Impressum",
      privacy: "Datenschutz",
      contactTitle: "Kontakt",
      mobileCare: "Mobile Pflege auf Lanzarote",
      wholeIsland: "Ganze Insel Lanzarote",
      tel: "Tel:",
      email: "E-Mail:",
      copyright: "© {year} Sabrina Hänggi. Alle Rechte vorbehalten.",
      notLegalAdvice: "Dies ist keine Rechtsberatung. Für medizinische Notfälle wählen Sie immer die 112.",
      createdWithLove: "Erstellt mit 🩷 von Marion Hänggi... beim Kaffee ☕",
    },
    home: {
      badge: "Ihr Pflegedienst auf Lanzarote",
      heroTitle: "Pflege unter Palmen. {br} {spanStart}Sicherheit{spanEnd} für Ihre Liebsten.",
      heroDesc: "Ob mobile Pflege vor Ort oder 24/7 Betreuung in unserer Pflege-WG: Wir schaffen Lebensqualität. Deutschsprachig, professionell und herzlich.",
      ctaChecklist: "Kostenlose Checkliste",
      ctaConsultation: "Erstgespräch vereinbaren",
      experienceBadge: "Über 20 Jahre Erfahrung in der Pflege",
      floatingBadgeText: "Herzlich",
      floatingBadgeDesc: "Individuelle Betreuung nach Maß",
      
      servicesTitle: "Unser Angebot für Sie",
      servicesSubtitle: "Pflege, die sich Ihrer Situation anpasst",
      servicesDesc: "Jeder Mensch hat eigene Bedürfnisse. Deswegen bieten wir flexible Modelle, die zu Ihrem Alltag, Ihrer Familie und Ihrer aktuellen Lage passen.",
      
      mobileTitle: "Mobile Pflege in Ihrem Zuhause",
      mobileDesc: "Wir kommen direkt zu Ihnen ins Feriendomizil oder in Ihre Wohnung auf Lanzarote. Sie erhalten professionelle Pflege in vertrauter Umgebung – ruhig, respektvoll, zuverlässig.",
      typicalServices: "Typische Leistungen:",
      mobileServices: [
        "Medikamentengabe & Wundversorgung",
        "Unterstützung bei Körperpflege & Alltag",
        "Vitalzeichenkontrolle",
        "Pflegebescheinigung für Kostenträger"
      ],
      ctaInquire: "Unverbindlich anfragen",
      
      wgTitle: "24/7 Private Pflege-WG",
      wgDesc: "Rund um die Uhr Betreuung in familiärer Atmosphäre in Tahíche. Ideal als dauerhafte Lösung oder als temporäre Entlastung für Angehörige.",
      wgStatus: "Warteliste offen",
      wgServices: [
        "24 Stunden Anwesenheit",
        "Urlaubs- & Verhinderungspflege",
        "Gemeinsame Mahlzeiten & Aktivitäten",
        "Barrierefreies Wohnen nach CH-Standard"
      ],
      ctaWg: "Zur Warteliste & Broschüre",
      
      familiesHeading: "Für Angehörige aus D A CH:",
      familiesSubheading: "(D A CH = Deutschland (D), Österreich (A) & Schweiz (CH))",
      familiesTitle: "Sorgenfrei aus der {spanStart}Ferne.{spanEnd}",
      familiesDesc: "Es ist belastend, wenn Eltern oder Partner weit weg leben. Deswegen sind wir Ihr verlängerter Arm vor Ort: transparent, erreichbar, strukturiert. Sie wissen jederzeit, wie es Ihrem Herzensmenschen geht – ohne Druck, ohne Rätselraten.",
      ctaCallback: "Jetzt Rückruf anfordern",
      steps: [
        { title: "Kostenloses Erstgespräch", desc: "Wir klären den Bedarf per Video-Call oder Telefon." },
        { title: "Individueller Pflegeplan", desc: "Sie erhalten klare Leistungen und transparente Kosten passend zur Situation." },
        { title: "Start der Betreuung", desc: "Sie bekommen regelmäßige Updates per WhatsApp oder E-Mail." }
      ],
      
      aboutTitle: "Über Sabrina Hänggi",
      aboutMotto: "\"Schweizer Qualität mit kanarischer Herzlichkeit.\"",
      aboutDesc: "Nach über 20 Jahren Erfahrung in der Notfallmedizin in der Schweiz habe ich meinen Lebensmittelpunkt nach Lanzarote verlegt. Hier verbinde ich höchste medizinische Standards mit der Ruhe und Lebensfreude der Insel. Mein Ziel ist es, Menschen ein würdevolles und sicheres Leben in ihrer Wahlheimat zu ermöglichen.",
      stats: [
        { value: "20+", label: "Jahre Erfahrung" },
        { value: "CH/DE/ES", label: "Sprachen" },
        { value: "24/7", label: "Erreichbar" },
        { value: "100%", label: "Zuverlässigkeit" }
      ],
      
      newsTitle: "Aktuelles",
      newsSubtitle: "Einblicke in unsere tägliche Arbeit direkt aus Lanzarote.",
      newsDesc1: "Folgen Sie mir auf Social Media für praktische Pflege-Tipps auf den Kanaren, Updates aus dem Alltag und echte Einblicke hinter die Kulissen.",
      newsDesc2: "Hier teilen wir auch Kundenfeedback und Erfahrungsberichte, damit Sie ein Gefühl bekommen, wie sich die Zusammenarbeit wirklich anfühlt.",
      fbFollow: "Auf Facebook folgen",
      whatsappMessage: "Nachricht via WhatsApp",
      
      fbCardPostText: "Auf Facebook gepostet",
      fbCardReadText: "Beitrag lesen",
      fbCardCurrentText: "Aktueller Beitrag",
      fbPosts: [
        "Einblicke in den Alltag auf Lanzarote: Heute beschäftigen wir uns mit der individuellen Betreuung in unserer Pflege-WG...",
        "Warum die Entscheidung für eine Begleitung im Ausland oft die richtige ist – Transparenz und Vertrauen sind die Basis...",
        "Wussten Sie schon? Wir bieten auch temporäre Entlastung für pflegende Angehörige an. Machen Sie Urlaub, während wir uns kümmern..."
      ],
      
      contactTitle: "Wir sind für Sie da.",
      contactDesc: "Haben Sie Fragen zur Pflegefinanzierung auf Lanzarote oder zur Warteliste der Pflege-WG? Melden Sie sich einfach direkt per WhatsApp oder Telefon.",
      contactTelLabel: "Telefon",
      contactWaLabel: "WhatsApp Kontakt",
      contactWaStatus: "Anruf oder Nachricht",
      contactLocationLabel: "Standort",
      contactFormTitle: "Rückruf anfordern",
      contactFormSubtitle: "Kostenlos und absolut unverbindlich.",
      contactFormName: "Ihr Name",
      contactFormPhone: "Ihre Telefonnummer",
      contactFormMsg: "Wie können wir Ihnen helfen?",
      contactFormSubmit: "Anfrage absenden",
      contactFormOr: "— oder —",
      contactFormWaCall: "Über WhatsApp anrufen",
      contactSuccessMsg: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden.",
    },
    faq: {
      title: "FAQ",
      subtitle: "Ihre häufigsten Fragen zur Pflege auf Lanzarote beantwortet.",
      items: [
        {
          question: "Für wen ist die Pflege geeignet?",
          answer: "Für Menschen, die auf Lanzarote leben oder hier Urlaub machen und Unterstützung brauchen – sowie für Angehörige aus dem DACH-Raum, die Klarheit und Entlastung möchten."
        },
        {
          question: "Welche Leistungen sind möglich?",
          answer: "Mobile Pflege im Zuhause (z. B. Körperpflege, Vitalzeichen, Medikamentengabe, Wundversorgung) sowie 24/7 Betreuung in unserer privaten pflege-WG (Warteliste)."
        },
        {
          question: "Wie schnell kann die Betreuung starten?",
          answer: "Nach dem Erstgespräch klären wir Bedarf und Dringlichkeit. Deswegen bekommst du sehr schnell eine klare Einschätzung, was kurzfristig möglich ist."
        },
        {
          question: "Wie funktioniert die Warteliste für die Pflege-WG?",
          answer: "Du erhältst Infos zur Verfügbarkeit, zum Ablauf und zu den nächsten Schritten. Deswegen weißt du frühzeitig, was realistisch ist und wie du planen kannst."
        },
        {
          question: "Was kostet Pflege auf Lanzarote?",
          answer: "Kosten hängen vom Bedarf, Umfang und Zeitfenster ab. Deswegen erstellen wir nach dem Erstgespräch einen transparenten Pflegeplan mit klaren Leistungen und Kosten."
        },
        {
          question: "Wie werde ich als Angehöriger informiert?",
          answer: "Du bekommst regelmäßige Updates per WhatsApp oder E-Mail – verständlich, strukturiert und zuverlässig. Deswegen fühlst du dich auch aus der Ferne sicher."
        },
        {
          question: "In welchen Sprachen findet die Kommunikation statt?",
          answer: "Deutsch und Spanisch. Deswegen klappt die Abstimmung mit Ärzten, Apotheken und Stellen vor Ort reibungsloser."
        },
        {
          question: "Was passiert im Notfall?",
          answer: "Bei medizinischen Notfällen gilt immer: 112. Deswegen sprechen wir im Pflegeplan auch über Notfallwege, Kontaktketten und wichtige Unterlagen."
        }
      ]
    },
    downloads: {
      title: "Wissenswertes & Checklisten",
      desc: "Nutzen Sie unsere kostenlosen Vorlagen, um Sicherheit und Klarheit zu gewinnen. Speziell für die Pflege-Situation auf den Kanaren entwickelt.",
      ctaDownload: "Jetzt herunterladen",
      missingInfoTitle: "Fehlt Ihnen eine Information?",
      missingInfoDesc: "Wir erweitern unsere Bibliothek ständig. Wenn Sie eine spezifische Frage haben, schreiben Sie uns direkt.",
      askQuestion: "Frage stellen",
      magnets: [
        {
          slug: 'pflege-checkliste',
          title: 'Pflege auf Lanzarote organisieren: 12-Schritte-Checkliste',
          description: 'Vermeiden Sie die häufigsten Fehler bei der Organisation. Eine klare Schritt-für-Schritt Anleitung für einen sicheren Start.',
        },
        {
          slug: 'notfallmappe',
          title: 'Notfallmappe: Kontakte, Medikamente, Dokumente',
          description: 'Im Ernstfall zählt jede Sekunde. Diese Vorlage bündelt alle lebenswichtigen Informationen für Ärzte und Sanitäter.',
        },
        {
          slug: 'ebook-entlastung',
          title: 'E-Book: Entlastung für Angehörige',
          description: 'Abläufe verstehen, Fragen klären, nächste Schritte planen. Ein Leitfaden für Familien aus dem DACH-Raum.',
        }
      ]
    },
    downloadDetail: {
      backButton: "Zurück zur Übersicht",
      freeBadge: "Kostenloser Download",
      whatToExpect: "Was Sie in diesem PDF erwartet:",
      expectList: [
        "Kompaktes Wissen auf einen Blick",
        "Druckfreundliches Format (A4)",
        "Sofort umsetzbare Tipps",
        "Aktualisiert für das aktuelle Jahr"
      ],
      formTitle: "Jetzt kostenlos anfordern",
      formSubtitle: "Sicherer Download via SSL.",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail-Adresse",
      phone: "Handynummer",
      consent: "Ich stimme der Datenverarbeitung zu. {linkStart}Datenschutz{linkEnd}",
      orderBtn: "Kostenpflichtig bestellen (0€)",
      subtext: "Der Download startet automatisch nach dem Klick. Zusätzlich erhalten Sie den Link per E-Mail.",
      validation: {
        firstName: "Bitte geben Sie Ihren Vornamen an.",
        lastName: "Bitte geben Sie Ihren Nachnamen an.",
        email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        phone: "Bitte geben Sie eine gültige Handynummer an.",
        consent: "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.",
        emailReal: "Bitte geben Sie eine echte E-Mail-Adresse ein."
      },
      notFound: "Download nicht gefunden",
      backToOverview: "Zurück zur Übersicht"
    },
    waitlist: {
      backButton: "Zurück zur Startseite",
      title: "Warteliste & Broschüre",
      desc: "Tragen Sie sich unverbindlich ein. Sie erhalten unsere Informations-Broschüre sofort per E-Mail und wir melden uns persönlich bei Ihnen.",
      features: [
        "Exklusive Einblicke in die Pflege-WG",
        "Bevorzugte Benachrichtigung bei freien Plätzen",
        "Detaillierte Kostenübersicht"
      ],
      sslBadge: "Ihre Daten sind sicher (SSL)",
      successTitle: "Fast geschafft!",
      successDesc: "Wir leiten Sie zur Bestätigung weiter...",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail-Adresse",
      phone: "Telefonnummer (optional)",
      interestLabel: "Interesse",
      interestOptions: [
        { value: "pflege-wg", label: "24/7 Pflege-WG (Warteliste)" },
        { value: "mobile-pflege", label: "Mobile Pflege & Hausbesuche" },
        { value: "checklisten", label: "Nur Whitepaper & Checklisten" },
        { value: "beratung", label: "Allgemeine Beratung für Angehörige" }
      ],
      consent: "Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für die Warteliste gespeichert werden. {linkStart}Datenschutzerklärung{linkEnd}.",
      submitButton: "Eintragen & Whitepaper erhalten",
      sending: "Wird gesendet...",
      errorConnection: "Verbindung fehlgeschlagen."
    },
    waitlistSuccess: {
      thanks: "Vielen Dank!",
      desc: "Wir haben Sie erfolgreich auf die Warteliste gesetzt. Wir melden uns persönlich bei Ihnen, sobald sich eine Möglichkeit ergibt.",
      infoBoxTitle: "Ihr Info-Paket liegt bereit",
      infoBoxDesc: "Hier finden Sie erste Informationen zur Pflege-WG und unseren Abläufen.",
      btnDownload: "Broschüre herunterladen",
      alertMsg: "Download für {file} startet...",
      subtext: "Wir haben Ihnen diese Informationen zusätzlich an Ihre angegebene E-Mail-Adresse gesendet.",
      btnHome: "Zurück zur Startseite"
    },
    thankYou: {
      title: "Nur noch ein Schritt!",
      optInTitle: "Double Opt-In Erforderlich",
      optInDesc: "Um Missbrauch zu vermeiden und Ihre Daten zu schützen, haben wir Ihnen soeben eine Bestätigungs-E-Mail gesendet.",
      msg: "Bitte öffnen Sie Ihr E-Mail-Postfach und klicken Sie auf den Link in der E-Mail. {br} {strongStart}Erst danach startet Ihr Download automatisch.{strongEnd}",
      noEmail: "Keine E-Mail erhalten? Bitte prüfen Sie auch den Spam-Ordner.",
      btnHome: "Zurück zur Startseite"
    },
    confirmSubscription: {
      verifying: "E-Mail wird bestätigt...",
      verifyingDesc: "Wir prüfen Ihre Anfrage.",
      errorTitle: "Link ungültig oder abgelaufen",
      errorDesc: "Wir konnten den Download nicht finden. Bitte starten Sie den Vorgang erneut.",
      btnError: "Zurück zu den Downloads",
      thanks: "Vielen Dank!",
      confirmed: "Ihre E-Mail wurde bestätigt.",
      ready: "Ihr Download ist bereit:",
      btnDownload: "Jetzt PDF herunterladen",
      popupAlert: "Sollte der Download nicht starten, prüfen Sie bitte, ob Sie einen Pop-up Blocker aktiviert haben.",
      btnHome: "Zurück zur Startseite"
    },
    legal: {
      privacyTitle: "Datenschutzerklärung",
      lastUpdated: "Stand: {year}",
      p1Title: "1. Datenschutz auf einen Blick",
      p1Desc: "Der Schutz Ihrer Daten ist uns wichtig. Nachfolgend informieren wir Sie über den Umgang mit Ihren personenbezogenen Daten. Dies ist eine vereinfachte Darstellung.",
      p2Title: "2. Verantwortliche Stelle",
      p2Desc: "Sabrina Hänggi<br/>Calle la Rosa 14<br/>35508 Tahíche, Lanzarote (Spanien)<br/>E-Mail: {email}",
      p3Title: "3. Datenerfassung auf dieser Website",
      p3Sub1: "Kontaktformular & Downloads",
      p3Desc1: "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen oder einen Download anfordern, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
      p3Desc2: "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.",
      p3Sub2: "Hosting",
      p3Desc3: "Wir hosten unsere Website bei Vercel Inc. Der Provider erhebt automatisch Informationen in sogenannten Server-Log-Dateien (z.B. Browser, IP-Adresse). Dies dient der technischen Stabilität.",
      impressumTitle: "Impressum",
      impSub1: "Angaben gemäß § 5 TMG / Spanischem Recht",
      impDesc1: "Sabrina Hänggi<br/>Dipl. Pflegefachfrau HF / Expertin Notfallpflege<br/>Calle la Rosa 14<br/>35508 Tahíche<br/>Lanzarote / Spanien",
      impSub2: "Kontakt",
      impDesc2: "Telefon: {phone}<br/>E-Mail: {email}",
      impSub3: "Berufsbezeichnung",
      impDesc3: "Dipl. Pflegefachfrau HF (verliehen in der Schweiz)",
      impSub4: "Steuer-ID / NIE",
      impDesc4: "NIE: Y8444975X",
      impSub5: "EU-Streitschlichtung",
      impDesc5: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum."
    }
  },
  es: {
    meta: {
      home: {
        title: "Asistencia Domiciliaria y Colectiva 24/7 Lanzarote",
        description: "Su servicio de asistencia de habla alemana en Lanzarote. Cuidado móvil, atención médica y comunidad de convivencia de 24 horas. Pida asesoramiento.",
      },
      downloads: {
        title: "Información Útil y Listas de Control para Cuidados en Lanzarote",
        description: "Descargue listas de control, carpetas de emergencia y libros electrónicos gratuitos para la asistencia en las Islas Canarias. Plantillas útiles para familiares.",
      },
      downloadDetail: {
        title: "Descarga Gratuita: {title}",
        description: "Descarga gratuita: {description} Obtenga ahora su documento PDF de la mano de Sabrina Hänggi.",
      },
      waitlist: {
        title: "Lista de Espera y Folleto del Piso Tutelado",
        description: "Regístrese en la lista de espera de nuestro exclusivo piso tutelado en Lanzarote y reciba de inmediato nuestro dossier informativo.",
      },
      notFound: {
        title: "Descarga no encontrada",
        description: "Página de error",
      },
    },
    nav: {
      services: "Servicios",
      about: "Sobre Sabrina",
      families: "Para Familiares",
      news: "Actualidad",
      downloads: "Descargas",
      contact: "Contacto",
      emergency: "Urgencias: 112",
      callNow: "Llamar ahora",
      brandSub: "Asistencia en Lanzarote",
    },
    footer: {
      brandDesc: "Atención profesional bajo las palmeras de Lanzarote. Seguridad y calidad de vida para usted y sus seres queridos. Disponibles las 24 horas.",
      navTitle: "Navegación",
      startpage: "Inicio",
      downloadsAndChecklists: "Descargas y Listas",
      impressum: "Aviso Legal",
      privacy: "Protección de Datos",
      contactTitle: "Contacto",
      mobileCare: "Cuidado móvil en Lanzarote",
      wholeIsland: "Toda la isla de Lanzarote",
      tel: "Tel:",
      email: "E-mail:",
      copyright: "© {year} Sabrina Hänggi. Todos los derechos reservados.",
      notLegalAdvice: "Esto no constituye asesoramiento legal. En caso de emergencias médicas, marque siempre el 112.",
      createdWithLove: "Creado con 🩷 por Marion Hänggi... tomando un café ☕",
    },
    home: {
      badge: "Su servicio de asistencia en Lanzarote",
      heroTitle: "Cuidado bajo las palmeras. {br} {spanStart}Seguridad{spanEnd} para sus seres queridos.",
      heroDesc: "Ya sea asistencia móvil a domicilio o atención 24/7 en nuestra vivienda compartida: creamos calidad de vida. Servicio profesional, cercano y en su idioma.",
      ctaChecklist: "Lista de control gratuita",
      ctaConsultation: "Reservar primera consulta",
      experienceBadge: "Más de 20 años de experiencia en enfermería",
      floatingBadgeText: "Cercano",
      floatingBadgeDesc: "Atención individualizada y a medida",
      
      servicesTitle: "Nuestros servicios para usted",
      servicesSubtitle: "Asistencia adaptada a su situación",
      servicesDesc: "Cada persona tiene necesidades únicas. Por ello, ofrecemos modelos flexibles que se adaptan a su día a día, a su familia y a su situación actual.",
      
      mobileTitle: "Cuidado móvil en su hogar",
      mobileDesc: "Nos desplazamos directamente a su alojamiento de vacaciones o a su residencia habitual en Lanzarote. Reciba una atención profesional en un entorno familiar: con calma, respeto y total fiabilidad.",
      typicalServices: "Servicios habituales:",
      mobileServices: [
        "Administración de medicamentos y cura de heridas",
        "Apoyo en el cuidado corporal y tareas diarias",
        "Control de constantes vitales",
        "Certificados de asistencia para aseguradoras"
      ],
      ctaInquire: "Solicitar información",
      
      wgTitle: "Vivienda Tutelada Privada 24/7",
      wgDesc: "Asistencia las 24 horas en un ambiente familiar en Tahíche. Ideal como solución permanente o como relevo temporal para familiares cuidadores.",
      wgStatus: "Lista de espera abierta",
      wgServices: [
        "Presencia y atención las 24 horas",
        "Cuidados de respiro familiar y vacacionales",
        "Comidas compartidas y actividades",
        "Vivienda accesible según estándares suizos (CH)"
      ],
      ctaWg: "Ver lista de espera y folleto",
      
      familiesHeading: "Para familiares desde el extranjero:",
      familiesSubheading: "(Especializados en familias residentes en Alemania, Austria y Suiza)",
      familiesTitle: "Tranquilidad desde la {spanStart}distancia.{spanEnd}",
      familiesDesc: "Es difícil cuando los padres o la pareja viven lejos. Por eso somos su apoyo sobre el terreno: de forma transparente, accesible y estructurada. Sabrá en todo momento cómo está su ser querido, sin presiones ni dudas.",
      ctaCallback: "Solicitar llamada de vuelta",
      steps: [
        { title: "Primera consulta gratuita", desc: "Aclaramos las necesidades por videollamada o teléfono." },
        { title: "Plan de asistencia a medida", desc: "Recibirá una propuesta clara de servicios y costes adaptada a su situación." },
        { title: "Inicio de la atención", desc: "Le mantendremos al tanto con actualizaciones periódicas por WhatsApp o e-mail." }
      ],
      
      aboutTitle: "Sobre Sabrina Hänggi",
      aboutMotto: "\"Calidad suiza con calidez canaria.\"",
      aboutDesc: "Tras más de 20 años de experiencia en medicina de urgencias en Suiza, decidí trasladar mi residencia a Lanzarote. Aquí combino los más altos estándares médicos con la tranquilidad y la alegría de vivir de la isla. Mi objetivo es permitir que las personas tengan una vida digna y segura en el lugar que han elegido para vivir.",
      stats: [
        { value: "20+", label: "Años de experiencia" },
        { value: "CH/DE/ES", label: "Idiomas" },
        { value: "24/7", label: "Disponibilidad" },
        { value: "100%", label: "Fiabilidad" }
      ],
      
      newsTitle: "Actualidad",
      newsSubtitle: "Un vistazo a nuestro trabajo diario directamente desde Lanzarote.",
      newsDesc1: "Sígame en redes sociales para obtener consejos prácticos de asistencia en Canarias, novedades de nuestro día a día e imágenes reales tras las cámaras.",
      newsDesc2: "Aquí también compartimos las opiniones de nuestros clientes para que descubra de primera mano cómo es trabajar con nosotros.",
      fbFollow: "Seguir en Facebook",
      whatsappMessage: "Mensaje por WhatsApp",
      
      fbCardPostText: "Publicado en Facebook",
      fbCardReadText: "Leer publicación",
      fbCardCurrentText: "Última publicación",
      fbPosts: [
        "Un día cualquiera en Lanzarote: Hoy nos centramos en la atención personalizada en nuestra vivienda tutelada...",
        "Por qué contar con apoyo profesional en el extranjero suele ser la mejor decisión. La confianza y la transparencia son la clave...",
        "¿Lo sabía? Ofrecemos servicios de respiro temporal para familiares cuidadores. Disfrute de sus vacaciones mientras nosotros nos ocupamos..."
      ],
      
      contactTitle: "Estamos a su disposición.",
      contactDesc: "¿Tiene preguntas sobre la financiación de la asistencia en Lanzarote o sobre la lista de espera del piso tutelado? Póngase en contacto directamente por WhatsApp o por teléfono.",
      contactTelLabel: "Teléfono",
      contactWaLabel: "Contacto por WhatsApp",
      contactWaStatus: "Llamada o mensaje",
      contactLocationLabel: "Ubicación",
      contactFormTitle: "Solicitar llamada",
      contactFormSubtitle: "Gratuito y sin ningún tipo de compromiso.",
      contactFormName: "Su nombre",
      contactFormPhone: "Su número de teléfono",
      contactFormMsg: "¿Cómo podemos ayudarle?",
      contactFormSubmit: "Enviar solicitud",
      contactFormOr: "— o —",
      contactFormWaCall: "Llamar por WhatsApp",
      contactSuccessMsg: "¡Muchas gracias! Nos pondremos en contacto con usted en un plazo de 24 horas.",
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Resolvemos sus dudas más habituales sobre la asistencia en Lanzarote.",
      items: [
        {
          question: "¿Para quién está pensado este servicio?",
          answer: "Para personas que residen en Lanzarote o pasan sus vacaciones aquí y necesitan asistencia, así como para familiares en el extranjero que buscan tranquilidad y apoyo profesional."
        },
        {
          question: "¿Qué servicios están disponibles?",
          answer: "Atención domiciliaria móvil (p. ej., higiene personal, control de constantes, administración de medicamentos, curas) y atención 24/7 en nuestro piso tutelado privado (bajo lista de espera)."
        },
        {
          question: "¿Con qué rapidez puede comenzar la asistencia?",
          answer: "Tras la primera consulta, evaluamos las necesidades y la urgencia. De este modo, obtendrá rápidamente una valoración clara de la viabilidad a corto plazo."
        },
        {
          question: "¿Cómo funciona la lista de espera para el piso tutelado?",
          answer: "Le facilitamos información sobre la disponibilidad, el proceso y los siguientes pasos. Así sabrá con antelación las opciones reales para poder planificar."
        },
        {
          question: "¿Cuánto cuesta la asistencia en Lanzarote?",
          answer: "Los costes varían según las necesidades, la duración y el horario. Por ello, tras la primera consulta elaboramos un plan de cuidados transparente con servicios y costes detallados."
        },
        {
          question: "¿Cómo se mantiene informados a los familiares?",
          answer: "Recibirá informes periódicos por WhatsApp o correo electrónico de manera clara, estructurada y de confianza. Para que se sienta tranquilo incluso en la distancia."
        },
        {
          question: "¿En qué idiomas se realiza la comunicación?",
          answer: "En alemán y español. De esta manera, la coordinación con médicos, farmacias y administraciones locales resulta ágil y sin barreras."
        },
        {
          question: "¿Qué ocurre en caso de emergencia?",
          answer: "Ante emergencias médicas, el protocolo es siempre llamar al 112. No obstante, en el plan de cuidados definimos las vías de actuación, contactos clave y documentos importantes."
        }
      ]
    },
    downloads: {
      title: "Información Útil y Guías",
      desc: "Utilice nuestras plantillas gratuitas para ganar tranquilidad y claridad. Diseñadas especialmente para las situaciones de asistencia en las Islas Canarias.",
      ctaDownload: "Descargar ahora",
      missingInfoTitle: "¿Echa en falta alguna información?",
      missingInfoDesc: "Ampliamos constantemente nuestros recursos. Si tiene alguna pregunta específica, escríbanos directamente.",
      askQuestion: "Hacer una pregunta",
      magnets: [
        {
          slug: 'pflege-checkliste',
          title: 'Organizar la asistencia en Lanzarote: Lista de control en 12 pasos',
          description: 'Evite los errores más comunes en la planificación. Una guía paso a paso muy clara para un comienzo seguro.',
        },
        {
          slug: 'notfallmappe',
          title: 'Carpeta de emergencia: Contactos, medicamentos, documentos',
          description: 'En caso de urgencia, cada segundo cuenta. Esta plantilla reúne toda la información vital para médicos y sanitarios.',
        },
        {
          slug: 'ebook-entlastung',
          title: 'E-Book: Respiro y apoyo para familiares',
          description: 'Comprender los procesos, resolver dudas y planificar los próximos pasos. Una guía para familias con seres queridos en el extranjero.',
        }
      ]
    },
    downloadDetail: {
      backButton: "Volver a la vista general",
      freeBadge: "Descarga Gratuita",
      whatToExpect: "Qué encontrará en este PDF:",
      expectList: [
        "Información clara y concisa de un vistazo",
        "Formato optimizado para imprimir (A4)",
        "Consejos de aplicación inmediata",
        "Contenido actualizado para el año en curso"
      ],
      formTitle: "Solicítelo gratis ahora",
      formSubtitle: "Descarga segura mediante SSL.",
      firstName: "Nombre",
      lastName: "Apellidos",
      email: "Correo electrónico",
      phone: "Teléfono móvil",
      consent: "Acepto el tratamiento de mis datos. {linkStart}Privacidad{linkEnd}",
      orderBtn: "Solicitar gratis (0 €)",
      subtext: "La descarga comenzará automáticamente tras hacer clic. Además, recibirá el enlace por correo electrónico.",
      validation: {
        firstName: "Por favor, indique su nombre.",
        lastName: "Por favor, indique sus apellidos.",
        email: "Por favor, introduzca un correo electrónico válido.",
        phone: "Por favor, indique un número de móvil válido.",
        consent: "Por favor, acepte el tratamiento de sus datos.",
        emailReal: "Por favor, introduzca una dirección de correo real."
      },
      notFound: "Descarga no encontrada",
      backToOverview: "Volver a la vista general"
    },
    waitlist: {
      backButton: "Volver al inicio",
      title: "Lista de Espera y Folleto",
      desc: "Regístrese de manera gratuita y sin compromiso. Recibirá nuestro folleto informativo de inmediato por correo electrónico y nos pondremos en contacto con usted.",
      features: [
        "Información exclusiva sobre nuestro piso tutelado",
        "Notificación prioritaria en caso de plazas libres",
        "Desglose detallado de costes"
      ],
      sslBadge: "Sus datos están protegidos (SSL)",
      successTitle: "¡Casi listo!",
      successDesc: "Le estamos redirigiendo para la confirmación...",
      firstName: "Nombre",
      lastName: "Apellidos",
      email: "Correo electrónico",
      phone: "Número de teléfono (opcional)",
      interestLabel: "Interés en",
      interestOptions: [
        { value: "pflege-wg", label: "Piso tutelado 24/7 (Lista de espera)" },
        { value: "mobile-pflege", label: "Cuidado móvil y visitas a domicilio" },
        { value: "checklisten", label: "Solo dossier informativo y guías" },
        { value: "beratung", label: "Asesoramiento general para familiares" }
      ],
      consent: "Acepto que mis datos se almacenen para ponernos en contacto y gestionar la lista de espera. {linkStart}Política de Privacidad{linkEnd}.",
      submitButton: "Registrarse y recibir folleto",
      sending: "Enviando...",
      errorConnection: "Error en la conexión."
    },
    waitlistSuccess: {
      thanks: "¡Muchas gracias!",
      desc: "Le hemos inscrito correctamente en la lista de espera. Nos pondremos en contacto con usted personalmente tan pronto como haya una vacante.",
      infoBoxTitle: "Su dossier informativo está listo",
      infoBoxDesc: "Aquí encontrará los detalles iniciales sobre el piso tutelado y nuestra forma de trabajar.",
      btnDownload: "Descargar dossier",
      alertMsg: "Iniciando la descarga de {file}...",
      subtext: "Le hemos enviado esta misma información a la dirección de correo electrónico que nos ha facilitado.",
      btnHome: "Volver al inicio"
    },
    thankYou: {
      title: "¡Solo un paso más!",
      optInTitle: "Confirmación requerida (Double Opt-In)",
      optInDesc: "Para evitar registros falsos y proteger sus datos, le acabamos de enviar un correo electrónico de confirmación.",
      msg: "Abra su bandeja de entrada y haga clic en el enlace del correo. {br} {strongStart}La descarga comenzará automáticamente una vez confirmado.{strongEnd}",
      noEmail: "¿No ha recibido el correo? Revise también su carpeta de correo no deseado (Spam).",
      btnHome: "Volver al inicio"
    },
    confirmSubscription: {
      verifying: "Confirmando correo electrónico...",
      verifyingDesc: "Estamos procesando su solicitud.",
      errorTitle: "Enlace no válido o caducado",
      errorDesc: "No hemos podido encontrar la descarga seleccionada. Por favor, vuelva a iniciar el proceso.",
      btnError: "Volver a Descargas",
      thanks: "¡Muchas gracias!",
      confirmed: "Su correo electrónico ha sido confirmado correctamente.",
      ready: "Su descarga ya está disponible:",
      btnDownload: "Descargar PDF ahora",
      popupAlert: "Si la descarga no comienza automáticamente, compruebe si tiene activado algún bloqueador de ventanas emergentes.",
      btnHome: "Volver al inicio"
    },
    legal: {
      privacyTitle: "Política de Privacidad",
      lastUpdated: "Actualizado: {year}",
      p1Title: "1. Información general sobre privacidad",
      p1Desc: "La protección de sus datos es de suma importancia para nosotros. A continuación le detallamos de forma sencilla cómo tratamos su información personal.",
      p2Title: "2. Responsable del tratamiento",
      p2Desc: "Sabrina Hänggi<br/>Calle la Rosa 14<br/>35508 Tahíche, Lanzarote (España)<br/>E-mail: {email}",
      p3Title: "3. Recogida de datos en este sitio web",
      p3Sub1: "Formularios de contacto y descargas",
      p3Desc1: "Al enviarnos una solicitud mediante el formulario o solicitar un documento, guardamos los datos facilitados con el fin de procesar su solicitud y resolver posibles dudas de seguimiento. No compartiremos estos datos sin su consentimiento explícito.",
      p3Desc2: "El tratamiento de estos datos se basa en el Art. 6, apdo. 1, letra b del RGPD, siempre que su solicitud esté vinculada al cumplimiento de un acuerdo o sea necesaria para llevar a cabo medidas precontractuales.",
      p3Sub2: "Alojamiento web",
      p3Desc3: "Alojamientos de nuestra web a través de Vercel Inc. El proveedor recopila automáticamente información técnica de diagnóstico en archivos de registro (como el navegador e IP) para garantizar la estabilidad del servicio.",
      impressumTitle: "Aviso Legal",
      impSub1: "Información conforme a la legislación española y la Directiva TMG",
      impDesc1: "Sabrina Hänggi<br/>Enfermera titulada (HF) / Especialista en cuidados de urgencia<br/>Calle la Rosa 14<br/>35508 Tahíche<br/>Lanzarote / España",
      impSub2: "Contacto",
      impDesc2: "Teléfono: {phone}<br/>E-mail: {email}",
      impSub3: "Titulación profesional",
      impDesc3: "Dipl. Pflegefachfrau HF (Enfermera diplomada de grado superior, expedido en Suiza)",
      impSub4: "Identificación fiscal / NIE",
      impDesc4: "NIE: Y8444975X",
      impSub5: "Resolución de litigios en línea",
      impDesc5: "La Comisión Europea facilita una plataforma de resolución de litigios en línea (ODR): https://ec.europa.eu/consumers/odr/. Encontrará nuestro correo electrónico arriba indicado."
    }
  },
  en: {
    meta: {
      home: {
        title: "Mobile Care & 24/7 Assisted Living Lanzarote",
        description: "Your German-speaking care service in Lanzarote. Mobile care, medical services, and 24h shared senior flat. Get a free consultation.",
      },
      downloads: {
        title: "Guides & Checklists for Care in Lanzarote",
        description: "Download free checklists, emergency folders, and e-books on nursing care in the Canary Islands. Helpful resources for families.",
      },
      downloadDetail: {
        title: "Free Download: {title}",
        description: "Free download: {description} Secure your PDF guide by Sabrina Hänggi now.",
      },
      waitlist: {
        title: "Waitlist & Brochure Assisted Living",
        description: "Sign up for the waitlist of our exclusive shared care home in Lanzarote and receive our information pack instantly.",
      },
      notFound: {
        title: "Download Not Found",
        description: "Error page",
      },
    },
    nav: {
      services: "Services",
      about: "About Sabrina",
      families: "For Families",
      news: "News",
      downloads: "Downloads",
      contact: "Contact",
      emergency: "Emergency: 112",
      callNow: "Call Now",
      brandSub: "Care in Lanzarote",
    },
    footer: {
      brandDesc: "Professional care under the palm trees of Lanzarote. Safety and quality of life for you and your loved ones. Available around the clock.",
      navTitle: "Navigation",
      startpage: "Home",
      downloadsAndChecklists: "Downloads & Checklists",
      impressum: "Legal Notice",
      privacy: "Privacy Policy",
      contactTitle: "Contact",
      mobileCare: "Mobile Care in Lanzarote",
      wholeIsland: "Entire Island of Lanzarote",
      tel: "Tel:",
      email: "Email:",
      copyright: "© {year} Sabrina Hänggi. All rights reserved.",
      notLegalAdvice: "This is not legal advice. In case of medical emergencies, always dial 112.",
      createdWithLove: "Created with 🩷 by Marion Hänggi... over coffee ☕",
    },
    home: {
      badge: "Your Care Service in Lanzarote",
      heroTitle: "Care under palm trees. {br} {spanStart}Security{spanEnd} for your loved ones.",
      heroDesc: "Whether mobile care at home or 24/7 support in our shared care flat: we create quality of life. German-speaking, professional, and heartfelt.",
      ctaChecklist: "Free Checklist",
      ctaConsultation: "Arrange Initial Consultation",
      experienceBadge: "Over 20 years of experience in nursing care",
      floatingBadgeText: "Heartfelt",
      floatingBadgeDesc: "Tailored and individual support",
      
      servicesTitle: "Our Offer for You",
      servicesSubtitle: "Care that adapts to your situation",
      servicesDesc: "Every person has different needs. That is why we offer flexible models that fit your everyday life, your family, and your current situation.",
      
      mobileTitle: "Mobile Care in Your Home",
      mobileDesc: "We come directly to your holiday accommodation or apartment in Lanzarote. Receive professional care in familiar surroundings – quiet, respectful, reliable.",
      typicalServices: "Typical Services:",
      mobileServices: [
        "Medication administration & wound care",
        "Support with personal hygiene & daily routine",
        "Monitoring vital signs",
        "Care certificate for insurance providers"
      ],
      ctaInquire: "Inquire without Obligation",
      
      wgTitle: "24/7 Private Shared Care Flat",
      wgDesc: "Around-the-clock support in a family atmosphere in Tahíche. Ideal as a permanent solution or as temporary relief for caring relatives.",
      wgStatus: "Waitlist open",
      wgServices: [
        "24-hour presence and care",
        "Holiday & respite care",
        "Shared meals & activities",
        "Barrier-free living according to Swiss standards"
      ],
      ctaWg: "To Waitlist & Brochure",
      
      familiesHeading: "For Relatives from Abroad:",
      familiesSubheading: "(Specialized in supporting families based in Germany, Austria & Switzerland)",
      familiesTitle: "Peace of mind from a {spanStart}distance.{spanEnd}",
      familiesDesc: "It is stressful when parents or partners live far away. That is why we are your local extension: transparent, reachable, and structured. You know how your loved one is doing at any time – no pressure, no guesswork.",
      ctaCallback: "Request Call Back",
      steps: [
        { title: "Free Initial Consultation", desc: "We clarify the needs via video call or telephone." },
        { title: "Individual Care Plan", desc: "You receive a clear overview of services and transparent costs matching your situation." },
        { title: "Start of Care", desc: "You receive regular updates via WhatsApp or email." }
      ],
      
      aboutTitle: "About Sabrina Hänggi",
      aboutMotto: "\"Swiss quality with Canary warmth.\"",
      aboutDesc: "After more than 20 years of experience in emergency medicine in Switzerland, I relocated my life to Lanzarote. Here I combine the highest medical standards with the peace and joy of the island. My goal is to enable people to live a dignified and safe life in their chosen home.",
      stats: [
        { value: "20+", label: "Years of Experience" },
        { value: "CH/DE/ES", label: "Languages" },
        { value: "24/7", label: "Reachable" },
        { value: "100%", label: "Reliability" }
      ],
      
      newsTitle: "News",
      newsSubtitle: "Insights into our daily work straight from Lanzarote.",
      newsDesc1: "Follow me on social media for practical care tips in the Canaries, daily updates, and real behind-the-scenes insights.",
      newsDesc2: "Here we also share client feedback and testimonials, so you can get a real sense of what working together feels like.",
      fbFollow: "Follow on Facebook",
      whatsappMessage: "Message via WhatsApp",
      
      fbCardPostText: "Posted on Facebook",
      fbCardReadText: "Read post",
      fbCardCurrentText: "Current Post",
      fbPosts: [
        "Insights into daily life in Lanzarote: Today we focus on individual care in our shared senior flat...",
        "Why choosing care abroad is often the right choice – trust and transparency are the key foundation...",
        "Did you know? We also offer temporary respite care for relatives. Go on holiday while we take care of everything..."
      ],
      
      contactTitle: "We are here for you.",
      contactDesc: "Do you have questions about care financing in Lanzarote or about our flat-share waitlist? Get in touch directly via WhatsApp or phone.",
      contactTelLabel: "Phone",
      contactWaLabel: "WhatsApp Contact",
      contactWaStatus: "Call or Message",
      contactLocationLabel: "Location",
      contactFormTitle: "Request Call Back",
      contactFormSubtitle: "Free and completely without obligation.",
      contactFormName: "Your Name",
      contactFormPhone: "Your Phone Number",
      contactFormMsg: "How can we help you?",
      contactFormSubmit: "Send Request",
      contactFormOr: "— or —",
      contactFormWaCall: "Call via WhatsApp",
      contactSuccessMsg: "Thank you! We will get back to you within 24 hours.",
    },
    faq: {
      title: "FAQ",
      subtitle: "Your most common questions about care in Lanzarote answered.",
      items: [
        {
          question: "Who is this care service suitable for?",
          answer: "For people living in Lanzarote or holidaying here who need support – as well as for family members abroad who want clarity and relief."
        },
        {
          question: "What services are possible?",
          answer: "Mobile home care (e.g., body care, vital signs, medication, wound dressing) and 24/7 care in our private shared care flat (waitlist)."
        },
        {
          question: "How quickly can the care begin?",
          answer: "After the initial consultation, we clarify the needs and urgency. This is why you get a clear assessment of what is possible on short notice very quickly."
        },
        {
          question: "How does the waitlist for the care flat work?",
          answer: "You receive details on availability, the process, and next steps. Therefore, you know early on what is realistic and how to plan."
        },
        {
          question: "What does nursing care cost in Lanzarote?",
          answer: "Costs depend on individual needs, scope, and schedule. After the initial consultation, we create a transparent care plan with clear services and costs."
        },
        {
          question: "How am I kept informed as a relative?",
          answer: "You receive regular updates via WhatsApp or email – clear, structured, and reliable. That's why you feel safe even from a distance."
        },
        {
          question: "In which languages does communication take place?",
          answer: "German and Spanish. Therefore, coordination with doctors, pharmacies, and local offices runs smoothly."
        },
        {
          question: "What happens in an emergency?",
          answer: "In medical emergencies, always call 112. We also discuss emergency pathways, contact chains, and important documents in the care plan."
        }
      ]
    },
    downloads: {
      title: "Guides & Checklists",
      desc: "Use our free templates to gain security and clarity. Specifically developed for the care situation in the Canary Islands.",
      ctaDownload: "Download Now",
      missingInfoTitle: "Are you missing any information?",
      missingInfoDesc: "We are constantly expanding our library. If you have a specific question, write to us directly.",
      askQuestion: "Ask a Question",
      magnets: [
        {
          slug: 'pflege-checkliste',
          title: 'Organizing Care in Lanzarote: 12-Step Checklist',
          description: 'Avoid the most common organizational mistakes. A clear step-by-step guide for a safe start.',
        },
        {
          slug: 'notfallmappe',
          title: 'Emergency Folder: Contacts, Medication, Documents',
          description: 'In an emergency, every second counts. This template bundles all vital information for doctors and paramedics.',
        },
        {
          slug: 'ebook-entlastung',
          title: 'E-Book: Relief for Caring Relatives',
          description: 'Understand procedures, clarify questions, and plan next steps. A guide for families with relatives abroad.',
        }
      ]
    },
    downloadDetail: {
      backButton: "Back to Overview",
      freeBadge: "Free Download",
      whatToExpect: "What to expect in this PDF:",
      expectList: [
        "Compact knowledge at a glance",
        "Printer-friendly format (A4)",
        "Immediately actionable tips",
        "Updated for the current year"
      ],
      formTitle: "Request Free Copy",
      formSubtitle: "Secure download via SSL.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Mobile Number",
      consent: "I agree to the data processing. {linkStart}Privacy Policy{linkEnd}",
      orderBtn: "Order for free (0€)",
      subtext: "The download will start automatically. You will also receive the link via email.",
      validation: {
        firstName: "Please enter your first name.",
        lastName: "Please enter your last name.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid mobile number.",
        consent: "Please agree to the data processing.",
        emailReal: "Please enter a real email address."
      },
      notFound: "Download not found",
      backToOverview: "Back to overview"
    },
    waitlist: {
      backButton: "Back to Home",
      title: "Waitlist & Brochure",
      desc: "Register without obligation. You will receive our information brochure by email immediately, and we will get in touch with you personally.",
      features: [
        "Exclusive insights into the shared care home",
        "Priority notification when spaces become available",
        "Detailed cost overview"
      ],
      sslBadge: "Your data is secure (SSL)",
      successTitle: "Almost done!",
      successDesc: "Redirecting you to the confirmation...",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number (optional)",
      interestLabel: "Interest in",
      interestOptions: [
        { value: "pflege-wg", label: "24/7 Shared Care Home (Waitlist)" },
        { value: "mobile-pflege", label: "Mobile Care & Home Visits" },
        { value: "checklisten", label: "Only Whitepaper & Checklists" },
        { value: "beratung", label: "General Counseling for Relatives" }
      ],
      consent: "I agree that my details will be stored for contact and waitlist management. {linkStart}Privacy Policy{linkEnd}.",
      submitButton: "Register & Get Brochure",
      sending: "Sending...",
      errorConnection: "Connection failed."
    },
    waitlistSuccess: {
      thanks: "Thank You!",
      desc: "We have successfully registered you on our waitlist. We will contact you personally as soon as an opportunity arises.",
      infoBoxTitle: "Your info pack is ready",
      infoBoxDesc: "Here you will find initial details about our shared care flat and procedures.",
      btnDownload: "Download Brochure",
      alertMsg: "Starting download for {file}...",
      subtext: "We have also sent this information to your specified email address.",
      btnHome: "Back to Home"
    },
    thankYou: {
      title: "Only one more step!",
      optInTitle: "Double Opt-In Required",
      optInDesc: "To avoid spam and protect your data, we have sent you a confirmation email.",
      msg: "Please check your inbox and click the confirmation link in the email. {br} {strongStart}Only then will your download start automatically.{strongEnd}",
      noEmail: "Didn't receive the email? Please also check your spam folder.",
      btnHome: "Back to Home"
    },
    confirmSubscription: {
      verifying: "Confirming email...",
      verifyingDesc: "We are validating your request.",
      errorTitle: "Link invalid or expired",
      errorDesc: "We couldn't find the requested download. Please start the process again.",
      btnError: "Back to Downloads",
      thanks: "Thank You!",
      confirmed: "Your email has been successfully confirmed.",
      ready: "Your download is ready:",
      btnDownload: "Download PDF now",
      popupAlert: "If the download does not start, please check if a pop-up blocker is active.",
      btnHome: "Back to Home"
    },
    legal: {
      privacyTitle: "Privacy Policy",
      lastUpdated: "As of: {year}",
      p1Title: "1. Privacy at a glance",
      p1Desc: "The protection of your data is important to us. Below we inform you about the handling of your personal data.",
      p2Title: "2. Controller",
      p2Desc: "Sabrina Hänggi<br/>Calle la Rosa 14<br/>35508 Tahíche, Lanzarote (Spain)<br/>Email: {email}",
      p3Title: "3. Data collection on this website",
      p3Sub1: "Contact form & downloads",
      p3Desc1: "If you send us inquiries or request a download, your details including contact information will be stored for processing and potential follow-up questions. We do not share this data without your consent.",
      p3Desc2: "Processing is based on Art. 6 Para. 1 lit. b GDPR, if the request relates to a contract or pre-contractual measures.",
      p3Sub2: "Hosting",
      p3Desc3: "We host our website with Vercel Inc. The provider automatically collects technical diagnostic data in server log files (e.g., browser, IP address) for stability.",
      impressumTitle: "Legal Notice",
      impSub1: "Information according to Section 5 TMG / Spanish Law",
      impDesc1: "Sabrina Hänggi<br/>Registered Nurse (HF) / Emergency Care Expert<br/>Calle la Rosa 14<br/>35508 Tahíche<br/>Lanzarote / Spain",
      impSub2: "Contact",
      impDesc2: "Phone: {phone}<br/>Email: {email}",
      impSub3: "Professional Title",
      impDesc3: "Dipl. Pflegefachfrau HF (Registered Nurse, awarded in Switzerland)",
      impSub4: "Tax ID / NIE",
      impDesc4: "NIE: Y8444975X",
      impSub5: "EU Dispute Resolution",
      impDesc5: "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. You can find our email address above."
    }
  }
};
