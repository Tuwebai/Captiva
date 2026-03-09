import { siteConfig } from '../config/site';

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: 'terms-of-service' | 'privacy-policy';
  path: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

const serviceDefinition = `${siteConfig.productName} es un servicio de ${siteConfig.companyName} orientado al diseño, implementación y publicación de landing pages optimizadas para captación de clientes.`;

export const termsOfServiceDocument: LegalDocument = {
  slug: 'terms-of-service',
  path: siteConfig.routes.termsOfService,
  title: 'Términos de Servicio',
  description:
    'Consulta las condiciones de contratación, uso, entrega y responsabilidad aplicables al servicio Captiva de Tuwebai.',
  updatedAt: '8 de marzo de 2026',
  sections: [
    {
      id: 'introduccion',
      title: '1. Introducción',
      paragraphs: [
        `Estos Términos de Servicio regulan el acceso, la contratación y el uso del servicio ${siteConfig.productName}. Al solicitar información, contratar o utilizar el servicio, el cliente acepta las condiciones aquí descriptas.`,
        `${serviceDefinition} El servicio está orientado a negocios, profesionales y organizaciones que desean mejorar su presencia comercial y recibir consultas mediante una landing page profesional.`,
        'El presente documento debe leerse junto con la propuesta comercial, el alcance aprobado, el brief del cliente y cualquier orden de servicio específica. En caso de conflicto entre estos términos generales y un documento comercial particular firmado o aceptado por las partes, prevalecerá este último respecto del alcance concreto contratado.',
      ],
    },
    {
      id: 'definiciones',
      title: '2. Definiciones',
      paragraphs: [
        'A los efectos de este documento, “Captiva” refiere al servicio comercial ofrecido bajo esa marca; “Tuwebai” refiere a la entidad prestadora; “cliente” refiere a la persona humana o jurídica que solicita o contrata el servicio; y “entregable” refiere a la landing page y los activos expresamente incluidos en la propuesta aceptada.',
      ],
      bullets: [
        'Servicio: landing page optimizada para captación de clientes.',
        'Propuesta comercial: documento que detalla alcance, tiempos, precio y condiciones particulares.',
        'Lanzamiento: publicación técnica de la landing en el entorno acordado.',
      ],
    },
    {
      id: 'uso-del-servicio',
      title: '3. Uso del servicio',
      paragraphs: [
        'El cliente se compromete a utilizar el servicio de buena fe, con fines legítimos y en cumplimiento de la normativa aplicable a su actividad. No podrá utilizar la landing entregada para actividades ilícitas, engañosas o que vulneren derechos de terceros.',
        'La contratación de Captiva no supone asesoramiento legal, contable, impositivo ni publicitario, salvo que ello se incluya expresamente en la propuesta comercial.',
        'El uso del servicio no habilita al cliente a representar a Tuwebai como socio, agente, empleado o representante comercial. La relación entre las partes es la de prestación independiente de servicios.',
      ],
    },
    {
      id: 'proceso-de-contratacion',
      title: '4. Proceso de contratación',
      paragraphs: [
        'La contratación se formaliza mediante aceptación de propuesta comercial, orden de servicio, presupuesto aprobado o cualquier otro medio escrito equivalente que detalle alcance y condiciones.',
        'Tuwebai podrá solicitar información comercial, textos, imágenes, datos de contacto, identidad de marca y cualquier material necesario para ejecutar la landing en tiempo y forma.',
        'La falta de entrega de materiales, validaciones o aprobaciones podrá desplazar los plazos comprometidos sin generar incumplimiento por parte de Tuwebai. Cualquier nueva fecha estimada se informará por el canal habitual de seguimiento.',
      ],
      bullets: [
        'El cliente debe proveer información veraz y actualizada.',
        'Los plazos estimados comienzan a computarse una vez recibido el material mínimo requerido.',
        'Los cambios fuera del alcance originalmente aprobado podrán presupuestarse por separado.',
      ],
    },
    {
      id: 'pagos-y-facturacion',
      title: '5. Pagos y facturación',
      paragraphs: [
        'Los precios, moneda, forma de pago, vencimientos y condiciones de facturación se detallan en la propuesta comercial o documento equivalente.',
        'La falta de pago faculta a Tuwebai a pausar tareas, posponer la entrega o suspender servicios asociados hasta la regularización del saldo pendiente.',
        'Cuando el servicio incluya costos de terceros, tales como dominio, hosting u otras herramientas expresamente previstas, dichos conceptos se considerarán incluidos únicamente por el plazo informado en la propuesta o en la página comercial del servicio.',
      ],
      bullets: [
        'Los impuestos, comisiones bancarias o cargos de terceros no incluidos expresamente serán a cargo del cliente.',
        'Toda reserva, anticipo o seña podrá ser no reembolsable una vez iniciadas las tareas de implementación.',
      ],
    },
    {
      id: 'entrega-y-ajustes',
      title: '6. Entrega y ajustes',
      paragraphs: [
        'Tuwebai entregará la landing conforme al alcance aprobado y dentro del plazo estimado, sujeto a la recepción oportuna del material requerido y a la colaboración del cliente.',
        'Salvo que la propuesta indique lo contrario, el servicio incluye una ronda razonable de ajustes posteriores al lanzamiento orientada a alinear el entregable con el negocio y su objetivo comercial.',
        'La aprobación expresa o tácita del entregable, incluyendo la falta de observaciones dentro del plazo razonable informado al cliente, habilitará a Tuwebai a considerar cumplida la instancia de entrega correspondiente.',
      ],
    },
    {
      id: 'responsabilidades-del-cliente',
      title: '7. Responsabilidades del cliente',
      paragraphs: [
        'El cliente es responsable por la exactitud, licitud y titularidad de los materiales, marcas, textos, imágenes, bases de datos y cualquier contenido suministrado para la landing.',
        'También es responsable por las prácticas comerciales, promociones, servicios o productos ofrecidos a través de la landing publicada.',
        'El cliente deberá revisar y aprobar los textos, claims, promociones, medios de contacto y demás elementos comerciales antes del lanzamiento. Tuwebai no responde por inexactitudes derivadas de información suministrada o aprobada por el cliente.',
      ],
    },
    {
      id: 'propiedad-intelectual',
      title: '8. Propiedad intelectual',
      paragraphs: [
        'La titularidad de la marca, contenido aportado por el cliente y demás activos preexistentes permanece en cabeza de su titular original.',
        'Los componentes, estructuras, copies, layouts, sistemas de conversión y materiales desarrollados por Tuwebai podrán estar sujetos a licencias, reservas de uso o cesiones parciales según lo estipulado en la propuesta comercial.',
        'Las metodologías, criterios de estructura comercial, patrones de conversión y frameworks internos empleados para prestar el servicio constituyen conocimiento propio de Tuwebai y no se entienden transferidos salvo pacto expreso por escrito.',
      ],
      bullets: [
        'No se ceden derechos más allá de lo expresamente acordado.',
        'El cliente no podrá revender ni sublicenciar materiales de Tuwebai sin autorización escrita.',
      ],
    },
    {
      id: 'limitacion-de-responsabilidad',
      title: '9. Limitación de responsabilidad',
      paragraphs: [
        'Captiva es un servicio orientado a mejorar la capacidad de captar consultas, pero no garantiza un volumen determinado de ventas, leads o resultados comerciales futuros.',
        'Tuwebai no será responsable por daños indirectos, lucro cesante, pérdida de oportunidad, interrupciones ocasionadas por terceros, caídas de proveedores externos o decisiones comerciales adoptadas por el cliente.',
        'Tampoco será responsable por la performance de campañas publicitarias, la calidad del tráfico recibido, la atención comercial del cliente, el cierre efectivo de ventas ni otras variables ajenas al alcance directo del servicio contratado.',
      ],
    },
    {
      id: 'modificaciones',
      title: '10. Modificaciones del servicio y de estos términos',
      paragraphs: [
        'Tuwebai podrá actualizar estos términos para reflejar cambios operativos, legales o comerciales. La versión vigente será la publicada en este sitio.',
        'Las condiciones particulares ya aceptadas en una propuesta comercial mantendrán prioridad respecto de estos términos generales en caso de contradicción.',
      ],
    },
    {
      id: 'legislacion-aplicable',
      title: '11. Legislación aplicable',
      paragraphs: [
        'Estos términos se interpretarán de acuerdo con la legislación aplicable al domicilio operativo informado por Tuwebai, salvo que una norma imperativa disponga otra cosa.',
        'Las partes procurarán resolver cualquier diferencia de buena fe antes de recurrir a vías judiciales o administrativas.',
        'Toda notificación relevante vinculada al servicio podrá realizarse por correo electrónico, mensajería escrita o documento comercial aceptado, siempre que quede constancia razonable de su envío.',
      ],
    },
    {
      id: 'contacto',
      title: '12. Contacto legal',
      paragraphs: [
        `Para consultas legales, contractuales o administrativas relacionadas con ${siteConfig.productName}, podés escribir a ${siteConfig.contact.primaryEmail} o ${siteConfig.contact.productEmail}.`,
      ],
    },
  ],
};

export const privacyPolicyDocument: LegalDocument = {
  slug: 'privacy-policy',
  path: siteConfig.routes.privacyPolicy,
  title: 'Política de Privacidad y Tratamiento de Datos',
  description:
    'Conoce cómo Captiva recopila, utiliza, protege y trata los datos personales vinculados a formularios, contacto y navegación.',
  updatedAt: '8 de marzo de 2026',
  sections: [
    {
      id: 'introduccion',
      title: '1. Introducción',
      paragraphs: [
        `${siteConfig.companyName} valora la privacidad de las personas que visitan este sitio y utilizan ${siteConfig.productName}. Esta política describe qué datos se recopilan, con qué finalidad se utilizan y cómo podés ejercer tus derechos.`,
        'El tratamiento de datos se realiza bajo criterios de necesidad, proporcionalidad, seguridad y confidencialidad.',
        'Esta política aplica a la navegación del sitio, a las páginas públicas del producto, a los formularios comerciales y a los intercambios que se generen a partir de solicitudes de información o contratación.',
      ],
    },
    {
      id: 'informacion-recopilada',
      title: '2. Información que recopilamos',
      paragraphs: [
        'Podemos recopilar información que el usuario brinda de manera directa y datos técnicos derivados de la navegación.',
      ],
      bullets: [
        'Datos de contacto enviados por formularios: nombre, empresa, rubro, objetivo comercial, teléfono, WhatsApp o email.',
        'Información compartida al iniciar una conversación por WhatsApp o correo electrónico.',
        'Datos técnicos y de uso: páginas visitadas, interacciones con CTA, scroll, clics y eventos básicos de navegación.',
        'Cookies o tecnologías similares necesarias para medir uso, experiencia y funcionamiento del sitio.',
      ],
    },
    {
      id: 'uso-de-la-informacion',
      title: '3. Uso de la información',
      paragraphs: [
        'La información recopilada se utiliza para responder consultas, preparar propuestas comerciales, coordinar la prestación del servicio, mejorar la experiencia del sitio y analizar el rendimiento comercial de Captiva.',
        'No utilizamos la información para finalidades incompatibles con la relación comercial o informativa iniciada por el usuario. Cualquier uso adicional sustancial será comunicado por los canales correspondientes cuando resulte aplicable.',
      ],
      bullets: [
        'Atender solicitudes comerciales y de contacto.',
        'Gestionar presupuestos, propuestas y procesos de contratación.',
        'Analizar el desempeño de páginas, demos, formularios y CTA.',
        'Detectar incidencias, prevenir abusos y mejorar la seguridad operativa.',
      ],
    },
    {
      id: 'bases-y-conservacion',
      title: '4. Base de tratamiento y conservación',
      paragraphs: [
        'Tratamos datos personales cuando existe consentimiento del usuario, necesidad para responder una consulta o interés legítimo para operar y mejorar el servicio.',
        'Los datos se conservarán durante el tiempo necesario para cumplir la finalidad que motivó su recolección, atender obligaciones legales o mantener trazabilidad comercial razonable.',
        'Cuando los datos formen parte de un proceso de contratación o prestación efectiva del servicio, podrán conservarse durante el plazo razonable necesario para documentación, soporte, cumplimiento contractual y gestión administrativa.',
      ],
    },
    {
      id: 'whatsapp-y-comunicaciones',
      title: '5. WhatsApp, correo y comunicaciones',
      paragraphs: [
        'Cuando un usuario decide contactarse por WhatsApp o email, el intercambio puede quedar registrado en los sistemas propios del canal utilizado y emplearse para seguimiento comercial, soporte o formalización del servicio.',
        'El usuario es responsable de no compartir por esos medios información sensible que no resulte necesaria para la consulta.',
        'Las conversaciones podrán utilizarse internamente para dar continuidad al proceso comercial, responder requerimientos, documentar acuerdos y mejorar la calidad de atención.',
      ],
    },
    {
      id: 'analytics-y-cookies',
      title: '6. Analytics y cookies',
      paragraphs: [
        'Este sitio utiliza herramientas de medición y analítica para comprender cómo se navega, qué secciones generan interés y qué recorridos derivan en contacto comercial.',
        'Las cookies y tecnologías equivalentes ayudan a mantener funcionalidades, recordar preferencias y medir interacción con páginas, formularios, demos y llamados a la acción.',
        'El usuario puede configurar su navegador para restringir o eliminar cookies, aunque ello podría afectar parte de la experiencia o determinadas funcionalidades del sitio.',
      ],
    },
    {
      id: 'comparticion-de-datos',
      title: '7. Compartición de datos',
      paragraphs: [
        'No vendemos datos personales. La información puede compartirse únicamente con proveedores que participen en la operación técnica, comunicaciones o analítica del servicio, siempre bajo estándares razonables de confidencialidad y seguridad.',
        'También podremos divulgar información cuando exista obligación legal, requerimiento de autoridad competente o necesidad de proteger derechos propios o de terceros.',
        'En ningún caso se comparte información con terceros ajenos a la operación, comercialización, soporte o cumplimiento legal del servicio sin una base legítima que lo justifique.',
      ],
    },
    {
      id: 'seguridad',
      title: '8. Seguridad y protección de datos',
      paragraphs: [
        'Aplicamos medidas técnicas y organizativas razonables para proteger la información contra acceso no autorizado, pérdida, uso indebido o alteración.',
        'Ningún sistema es absolutamente infalible, por lo que no puede garantizarse seguridad total, aunque sí un estándar diligente y profesional de resguardo.',
        'El acceso a la información se limita, en la medida de lo posible, a las personas, proveedores o áreas que necesitan intervenir para operar el servicio o atender un requerimiento legítimo.',
      ],
    },
    {
      id: 'derechos-del-usuario',
      title: '9. Derechos del usuario',
      paragraphs: [
        'El usuario podrá solicitar acceso, rectificación, actualización o supresión de sus datos personales, así como oponerse a determinados tratamientos cuando corresponda.',
        `Para ejercer estos derechos, podrá escribir a ${siteConfig.contact.primaryEmail} indicando nombre, medio de contacto y detalle de la solicitud.`,
        'Podremos requerir información razonable para verificar identidad antes de responder solicitudes relacionadas con datos personales, con el fin de proteger al titular y evitar accesos indebidos.',
      ],
    },
    {
      id: 'terceros-y-enlaces',
      title: '10. Enlaces a terceros',
      paragraphs: [
        'El sitio puede contener enlaces a servicios o sitios de terceros. Esta política no regula las prácticas de privacidad de esos terceros, por lo que se recomienda revisar sus propios documentos legales.',
      ],
    },
    {
      id: 'actualizaciones',
      title: '11. Cambios a esta política',
      paragraphs: [
        'Podemos actualizar esta política cuando cambien las prácticas operativas, requisitos legales o herramientas vinculadas al servicio. La versión vigente será la publicada en este sitio.',
      ],
    },
    {
      id: 'contacto',
      title: '12. Contacto',
      paragraphs: [
        `Para consultas sobre privacidad, tratamiento de datos o ejercicio de derechos, podés escribir a ${siteConfig.contact.primaryEmail} o ${siteConfig.contact.productEmail}.`,
      ],
    },
  ],
};
