export interface Option {
  key: 'A' | 'B' | 'C' | 'D';
  textEs: string;
  textHy: string;
}

export interface Question {
  id: number;
  part: 1 | 2 | 3 | 4;
  partTitleEs: string;
  partTitleHy: string;
  questionEs: string;
  questionHy: string;
  options: Option[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  tense: 'Pretérito Indefinido' | 'Pretérito Imperfecto' | 'Pretérito Perfecto' | 'Pretérito Pluscuamperfecto';
  tenseArmenian: string;
  explanationHy: string;
  explanationEs: string;
  hint: string;
  prizeAmount: number;
}

// 20-step Money Ladder (Who Wants to Be a Millionaire)
export const MONEY_LADDER: number[] = [
  1000, 2000, 3000, 5000, 10000, // Parte 1 Milestone: 10,000 ֏
  15000, 25000, 40000, 60000, 100000, // Parte 2 Milestone: 100,000 ֏
  150000, 200000, 300000, 400000, 500000, // Parte 3 Milestone: 500,000 ֏
  600000, 700000, 800000, 900000, 1000000 // Parte 4 Grand Prize: 1,000,000 ֏
];

export const QUESTIONS: Question[] = [
  // ================= PARTE 1. VIDA COTIDIANA (1 - 5) =================
  {
    id: 1,
    part: 1,
    partTitleEs: "PARTE 1. VIDA COTIDIANA",
    partTitleHy: "ՄԱՍ 1. ԱՌՕՐՅԱ ԿՅԱՆՔ",
    questionEs: "Ayer mis amigos me ___ a pasar el fin de semana con ellos.",
    questionHy: "Երեկ ընկերներս ինձ հրավիրեցին հանգստյան օրերն իրենց հետ անցկացնելու։",
    options: [
      { key: 'A', textEs: "invitaban", textHy: "հրավիրում էին" },
      { key: 'B', textEs: "invitaron", textHy: "հրավիրեցին" },
      { key: 'C', textEs: "han invitado", textHy: "հրավիրել են" },
      { key: 'D', textEs: "habían invitado", textHy: "հրավիրել էին" }
    ],
    correctAnswer: 'B',
    tense: 'Pretérito Indefinido',
    tenseArmenian: 'Պրետերիտո Ինդեֆինիդո (Ավարտված անցյալ)',
    explanationHy: "«Ayer» (երեկ) ցույց է տալիս անցյալում տեղի ունեցած և ավարտված կոնկրետ գործողություն, ուստի ընտրում ենք Pretérito Indefinido՝ «invitaron»։",
    explanationEs: "'Ayer' marca una acción puntual y terminada en el pasado: Pretérito Indefinido (invitaron).",
    hint: "«Ayer» (երեկ) ժամանակային ցուցիչը պահանջում է կոնկրետ ավարտված անցյալ՝ Indefinido (invitaron)։",
    prizeAmount: MONEY_LADDER[0]
  },
  {
    id: 2,
    part: 1,
    partTitleEs: "PARTE 1. VIDA COTIDIANA",
    partTitleHy: "ՄԱՍ 1. ԱՌՕՐՅԱ ԿՅԱՆՔ",
    questionEs: "Cuando vivía en Madrid, siempre ___ el metro para ir al trabajo.",
    questionHy: "Երբ Մադրիդում էի ապրում, աշխատանքի գնալու համար միշտ մետրոյից էի օգտվում։",
    options: [
      { key: 'A', textEs: "cogí", textHy: "օգտվեցի / նստեցի" },
      { key: 'B', textEs: "he cogido", textHy: "օգտվել եմ" },
      { key: 'C', textEs: "cogía", textHy: "օգտվում էի" },
      { key: 'D', textEs: "había cogido", textHy: "օգտվել էի" }
    ],
    correctAnswer: 'C',
    tense: 'Pretérito Imperfecto',
    tenseArmenian: 'Պրետերիտո Իմպերֆեկտո (Անկատար անցյալ)',
    explanationHy: "«Cuando vivía...» և «siempre» (միշտ) արտահայտում են անցյալի կրկնվող սովորություն (Pretérito Imperfecto՝ «cogía»)։",
    explanationEs: "'Cuando vivía...' y 'siempre' expresan una acción habitual y recurrente en el pasado: Pretérito Imperfecto (cogía).",
    hint: "«siempre» (միշտ) բառը մատնանշում է անցյալի մշտական սովորություն (cogía)։",
    prizeAmount: MONEY_LADDER[1]
  },
  {
    id: 3,
    part: 1,
    partTitleEs: "PARTE 1. VIDA COTIDIANA",
    partTitleHy: "ՄԱՍ 1. ԱՌՕՐՅԱ ԿՅԱՆՔ",
    questionEs: "Cuando llegamos al hotel, descubrimos que alguien ya ___ nuestra habitación.",
    questionHy: "Երբ հասանք հյուրանոց, պարզեցինք, որ ինչ-որ մեկն արդեն զբաղեցրել էր մեր սենյակը։",
    options: [
      { key: 'A', textEs: "había ocupado", textHy: "զբաղեցրել էր" },
      { key: 'B', textEs: "ocupaba", textHy: "զբաղեցնում էր" },
      { key: 'C', textEs: "ocupó", textHy: "զբաղեցրեց" },
      { key: 'D', textEs: "ha ocupado", textHy: "զբաղեցրել է" }
    ],
    correctAnswer: 'A',
    tense: 'Pretérito Pluscuamperfecto',
    tenseArmenian: 'Պրետերիտո Պլյուսկվամպերֆեկտո (Նախորդ անցյալ)',
    explanationHy: "«ya» (արդեն) ցույց է տալիս, որ սենյակը զբաղեցնելը տեղի էր ունեցել հյուրանոց հասնելուց («llegamos») առաջ՝ «había ocupado»։",
    explanationEs: "Acción anterior a otro momento del pasado ('llegamos', 'descubrimos'): Pretérito Pluscuamperfecto (había ocupado).",
    hint: "«ya» (արդեն) ցուցիչը հուշում է, որ գործողությունն ավելի վաղ էր ավարտվել (había + participio)։",
    prizeAmount: MONEY_LADDER[2]
  },
  {
    id: 4,
    part: 1,
    partTitleEs: "PARTE 1. VIDA COTIDIANA",
    partTitleHy: "ՄԱՍ 1. ԱՌՕՐՅԱ ԿՅԱՆՔ",
    questionEs: "Esta semana, que todavía no ha terminado, ___ varias decisiones importantes.",
    questionHy: "Այս շաբաթ մի քանի կարևոր որոշում եմ կայացրել։",
    options: [
      { key: 'A', textEs: "tomaba", textHy: "կայացնում էի" },
      { key: 'B', textEs: "tomé", textHy: "կայացրի" },
      { key: 'C', textEs: "había tomado", textHy: "կայացրել էի" },
      { key: 'D', textEs: "he tomado", textHy: "կայացրել եմ" }
    ],
    correctAnswer: 'D',
    tense: 'Pretérito Perfecto',
    tenseArmenian: 'Պրետերիտո Պերֆեկտո (Վաղակատար ներկա)',
    explanationHy: "«Esta semana, que todavía no ha terminado» նշանակում է դեռ չավարտված, ներկայի հետ կապված ժամանակահատված (Pretérito Perfecto՝ «he tomado»)։",
    explanationEs: "'Esta semana' es un período de tiempo temporalmente no concluido: Pretérito Perfecto (he tomado).",
    hint: "«Esta semana» (այս շաբաթ) ցուցիչը պահանջում է Pretérito Perfecto (he + participio)։",
    prizeAmount: MONEY_LADDER[3]
  },
  {
    id: 5,
    part: 1,
    partTitleEs: "PARTE 1. VIDA COTIDIANA",
    partTitleHy: "ՄԱՍ 1. ԱՌՕՐՅԱ ԿՅԱՆՔ",
    questionEs: "El año pasado mi familia ___ una casa cerca del mar.",
    questionHy: "Անցյալ տարի ընտանիքս տուն գնեց ծովի մոտ։",
    options: [
      { key: 'A', textEs: "compraba", textHy: "գնում էր" },
      { key: 'B', textEs: "compró", textHy: "գնեց" },
      { key: 'C', textEs: "ha comprado", textHy: "գնել է" },
      { key: 'D', textEs: "había comprado", textHy: "գնել էր" }
    ],
    correctAnswer: 'B',
    tense: 'Pretérito Indefinido',
    tenseArmenian: 'Պրետերիտո Ինդեֆինիդո (Ավարտված անցյալ)',
    explanationHy: "«El año pasado» (անցյալ տարի) ավարտված ժամանակային հատված է, իսկ «mi familia»-ն եզակի 3-րդ դեմք է (Pretérito Indefinido՝ «compró»)։",
    explanationEs: "'El año pasado' define un período temporal totalmente cerrado: Pretérito Indefinido (compró).",
    hint: "«El año pasado» ավարտված անցյալ է, իսկ «mi familia»-ի համար ձևն է՝ «compró»։",
    prizeAmount: MONEY_LADDER[4] // Milestone 1 (10,000 ֏)
  },

  // ================= PARTE 2. AMIGOS Y FAMILIA (6 - 10) =================
  {
    id: 6,
    part: 2,
    partTitleEs: "PARTE 2. AMIGOS Y FAMILIA",
    partTitleHy: "ՄԱՍ 2. ԸՆԿԵՐՆԵՐ ԵՎ ԸՆՏԱՆԻՔ",
    questionEs: "Antes, mi mejor amigo y yo ___ juntos todos los fines de semana.",
    questionHy: "Նախկինում լավագույն ընկերս և ես ամեն հանգստյան օր միասին զբոսնում էինք։",
    options: [
      { key: 'A', textEs: "salimos", textHy: "դուրս եկանք" },
      { key: 'B', textEs: "hemos salido", textHy: "դուրս ենք եկել" },
      { key: 'C', textEs: "salíamos", textHy: "զբոսնում էինք / դուրս էինք գալիս" },
      { key: 'D', textEs: "habíamos salido", textHy: "դուրս էինք եկել" }
    ],
    correctAnswer: 'C',
    tense: 'Pretérito Imperfecto',
    tenseArmenian: 'Պրետերիտո Իմպերֆեկտո (Անկատար անցյալ)',
    explanationHy: "«Antes» (նախկինում) և «todos los fines de semana» (ամեն հանգստյան օր) ցույց են տալիս անցյալի կրկնվող սովորություն (Pretérito Imperfecto՝ «salíamos»)։",
    explanationEs: "'Antes' y 'todos los fines de semana' expresan una costumbre habitual en el pasado: Pretérito Imperfecto (salíamos).",
    hint: "«Antes» և «todos los fines de semana» ցույց են տալիս սովորություն, ուստի՝ «salíamos»։",
    prizeAmount: MONEY_LADDER[5]
  },
  {
    id: 7,
    part: 2,
    partTitleEs: "PARTE 2. AMIGOS Y FAMILIA",
    partTitleHy: "ՄԱՍ 2. ԸՆԿԵՐՆԵՐ ԵՎ ԸՆՏԱՆԻՔ",
    questionEs: "Ayer mi hermana me ___ que quería estudiar en otro país.",
    questionHy: "Երեկ քույրս ինձ ասաց, որ ուզում է սովորել ուրիշ երկրում։",
    options: [
      { key: 'A', textEs: "dijo", textHy: "ասաց" },
      { key: 'B', textEs: "decía", textHy: "ասում էր" },
      { key: 'C', textEs: "ha dicho", textHy: "ասել է" },
      { key: 'D', textEs: "había dicho", textHy: "ասել էր" }
    ],
    correctAnswer: 'A',
    tense: 'Pretérito Indefinido',
    tenseArmenian: 'Պրետերիտո Ինդեֆինիդո (Ավարտված անցյալ)',
    explanationHy: "«Ayer» (երեկ) մեկ կոնկրետ ավարտված գործողություն է, «decir» բայի Indefinido անկանոն ձևն է՝ «dijo»։",
    explanationEs: "'Ayer' expresa un hecho puntual concluido en el pasado: Pretérito Indefinido irregular (dijo).",
    hint: "«Ayer» (երեկ) ցուցիչով «decir» բայի Indefinido ձևն է «dijo»։",
    prizeAmount: MONEY_LADDER[6]
  },
  {
    id: 8,
    part: 2,
    partTitleEs: "PARTE 2. AMIGOS Y FAMILIA",
    partTitleHy: "ՄԱՍ 2. ԸՆԿԵՐՆԵՐ ԵՎ ԸՆՏԱՆԻՔ",
    questionEs: "Cuando empezó la cena, todos los invitados ya ___ a casa de Elena.",
    questionHy: "Երբ ընթրիքը սկսվեց, բոլոր հյուրերն արդեն եկել էին Էլենայի տուն։",
    options: [
      { key: 'A', textEs: "llegaban", textHy: "գալիս էին" },
      { key: 'B', textEs: "llegaron", textHy: "եկան" },
      { key: 'C', textEs: "han llegado", textHy: "եկել են" },
      { key: 'D', textEs: "habían llegado", textHy: "արդեն եկել էին" }
    ],
    correctAnswer: 'D',
    tense: 'Pretérito Pluscuamperfecto',
    tenseArmenian: 'Պրետերիտո Պլյուսկվամպերֆեկտո (Նախորդ անցյալ)',
    explanationHy: "«ya» (արդեն) հուշում է, որ հյուրերը եկել էին ընթրիքի սկսվելուց («empezó») առաջ՝ «habían llegado» (Pluscuamperfecto)։",
    explanationEs: "Acción anterior al inicio de la cena: Pretérito Pluscuamperfecto (habían llegado).",
    hint: "«ya» բառը նշում է, որ գործողությունը նախորդել էր ընթրիքի սկսվելուն՝ «habían llegado»։",
    prizeAmount: MONEY_LADDER[7]
  },
  {
    id: 9,
    part: 2,
    partTitleEs: "PARTE 2. AMIGOS Y FAMILIA",
    partTitleHy: "ՄԱՍ 2. ԸՆԿԵՐՆԵՐ ԵՎ ԸՆՏԱՆԻՔ",
    questionEs: "Cuando éramos pequeños, nuestros padres nos ___ historias antes de dormir.",
    questionHy: "Երբ փոքր էինք, ծնողներս քնելուց առաջ մեզ պատմություններ էին պատմում։",
    options: [
      { key: 'A', textEs: "contaron", textHy: "պատմեցին" },
      { key: 'B', textEs: "contaban", textHy: "պատմում էին" },
      { key: 'C', textEs: "han contado", textHy: "պատմել են" },
      { key: 'D', textEs: "habían contado", textHy: "պատմել էին" }
    ],
    correctAnswer: 'B',
    tense: 'Pretérito Imperfecto',
    tenseArmenian: 'Պրետերիտո Իմպերֆեկտո (Անկատար անցյալ)',
    explanationHy: "«Cuando éramos pequeños» (երբ փոքր էինք) արտահայտում է մանկության սովորություն (Pretérito Imperfecto՝ «contaban»)։",
    explanationEs: "Hábito repetitivo en la infancia: Pretérito Imperfecto (contaban).",
    hint: "Մանկության սովորական գործողության նկարագրության համար օգտագործվում է Imperfecto (contaban)։",
    prizeAmount: MONEY_LADDER[8]
  },
  {
    id: 10,
    part: 2,
    partTitleEs: "PARTE 2. AMIGOS Y FAMILIA",
    partTitleHy: "ՄԱՍ 2. ԸՆԿԵՐՆԵՐ ԵՎ ԸՆՏԱՆԻՔ",
    questionEs: "La semana pasada mi amigo ___ un nuevo trabajo.",
    questionHy: "Անցյալ շաբաթ ընկերս նոր աշխատանք գտավ։",
    options: [
      { key: 'A', textEs: "encontraba", textHy: "գտնում էր" },
      { key: 'B', textEs: "ha encontrado", textHy: "գտել է" },
      { key: 'C', textEs: "encontró", textHy: "գտավ" },
      { key: 'D', textEs: "había encontrado", textHy: "գտել էր" }
    ],
    correctAnswer: 'C',
    tense: 'Pretérito Indefinido',
    tenseArmenian: 'Պրետերիտո Ինդեֆինիդո (Ավարտված անցյալ)',
    explanationHy: "«La semana pasada» (անցյալ շաբաթ) ավարտված ժամանակային հատված է՝ «encontró» (Pretérito Indefinido)։",
    explanationEs: "'La semana pasada' sitúa el hecho en un tiempo cerrado: Pretérito Indefinido (encontró).",
    hint: "«La semana pasada» ավարտված անցյալ է, ուստի պահանջվում է Indefinido (encontró)։",
    prizeAmount: MONEY_LADDER[9] // Milestone 2 (100,000 ֏)
  },

  // ================= PARTE 3. VIAJES Y EXPERIENCIAS (11 - 15) =================
  {
    id: 11,
    part: 3,
    partTitleEs: "PARTE 3. VIAJES Y EXPERIENCIAS",
    partTitleHy: "ՄԱՍ 3. ՃԱՆԱՊԱՐՀՈՐԴՈՒԹՅՈՒՆ ԵՎ ՓՈՐՁԱՌՈՒԹՅՈՒՆ",
    questionEs: "Cuando llegué al aeropuerto, el avión ya ___.",
    questionHy: "Երբ հասա օդանավակայան, ինքնաթիռն արդեն թռել էր։",
    options: [
      { key: 'A', textEs: "había despegado", textHy: "արդեն թռել էր" },
      { key: 'B', textEs: "despegaba", textHy: "թռչում էր" },
      { key: 'C', textEs: "despegó", textHy: "թռավ" },
      { key: 'D', textEs: "ha despegado", textHy: "թռել է" }
    ],
    correctAnswer: 'A',
    tense: 'Pretérito Pluscuamperfecto',
    tenseArmenian: 'Պրետերիտո Պլյուսկվամպերֆեկտո (Նախորդ անցյալ)',
    explanationHy: "«ya» (արդեն) նշանակում է, որ թռիչքն ավարտվել էր օդանավակայան հասնելուց («llegué») առաջ՝ «había despegado»։",
    explanationEs: "Acción completada con anterioridad a la llegada al aeropuerto: Pretérito Pluscuamperfecto (había despegado).",
    hint: "«ya»-ն ցույց է տալիս, որ գործողությունն ավելի վաղ էր կատարվել՝ «había despegado»։",
    prizeAmount: MONEY_LADDER[10]
  },
  {
    id: 12,
    part: 3,
    partTitleEs: "PARTE 3. VIAJES Y EXPERIENCIAS",
    partTitleHy: "ՄԱՍ 3. ՃԱՆԱՊԱՐՀՈՐԴՈՒԹՅՈՒՆ ԵՎ ՓՈՐՁԱՌՈՒԹՅՈՒՆ",
    questionEs: "Durante nuestras vacaciones de 2022, nosotros ___ tres ciudades diferentes.",
    questionHy: "2022 թվականի արձակուրդի ընթացքում մենք այցելեցինք երեք տարբեր քաղաք։",
    options: [
      { key: 'A', textEs: "visitábamos", textHy: "այցելում էինք" },
      { key: 'B', textEs: "hemos visitado", textHy: "այցելել ենք" },
      { key: 'C', textEs: "habíamos visitado", textHy: "այցելել էինք" },
      { key: 'D', textEs: "visitamos", textHy: "այցելեցինք" }
    ],
    correctAnswer: 'D',
    tense: 'Pretérito Indefinido',
    tenseArmenian: 'Պրետերիտո Ինդեֆինիդո (Ավարտված անցյալ)',
    explanationHy: "«de 2022»-ը նշում է կոնկրետ ավարտված տարի, ուստի «nosotros»-ի համար Indefinido ձևն է՝ «visitamos»։",
    explanationEs: "Período temporal finalizado y concreto ('de 2022'): Pretérito Indefinido (visitamos).",
    hint: "2022 թվականի ավարտված փաստի համար կիրառվում է Pretérito Indefinido (visitamos)։",
    prizeAmount: MONEY_LADDER[11]
  },
  {
    id: 13,
    part: 3,
    partTitleEs: "PARTE 3. VIAJES Y EXPERIENCIAS",
    partTitleHy: "ՄԱՍ 3. ՃԱՆԱՊԱՐՀՈՐԴՈՒԹՅՈՒՆ ԵՎ ՓՈՐՁԱՌՈՒԹՅՈՒՆ",
    questionEs: "De niño, siempre ___ viajar por el mundo.",
    questionHy: "Մանկության տարիներին միշտ երազում էի աշխարհով մեկ ճանապարհորդել։",
    options: [
      { key: 'A', textEs: "soñé con", textHy: "երազեցի" },
      { key: 'B', textEs: "soñaba con", textHy: "երազում էի" },
      { key: 'C', textEs: "he soñado con", textHy: "երազել եմ" },
      { key: 'D', textEs: "había soñado con", textHy: "երազել էի" }
    ],
    correctAnswer: 'B',
    tense: 'Pretérito Imperfecto',
    tenseArmenian: 'Պրետերիտո Իմպերֆեկտո (Անկատար անցյալ)',
    explanationHy: "«De niño, siempre» (մանկության տարիներին միշտ) նկարագրում է անցյալի տևական ցանկություն (Pretérito Imperfecto՝ «soñaba con»)։",
    explanationEs: "'De niño, siempre' expresa un deseo continuo y prolongado en el pasado: Pretérito Imperfecto (soñaba con).",
    hint: "«De niño» և «siempre» միշտ պահանջում են Imperfecto (soñaba)։",
    prizeAmount: MONEY_LADDER[12]
  },
  {
    id: 14,
    part: 3,
    partTitleEs: "PARTE 3. VIAJES Y EXPERIENCIAS",
    partTitleHy: "ՄԱՍ 3. ՃԱՆԱՊԱՐՀՈՐԴՈՒԹՅՈՒՆ ԵՎ ՓՈՐՁԱՌՈՒԹՅՈՒՆ",
    questionEs: "Hoy, que todavía no ha terminado, yo ya ___ todos los billetes para nuestro viaje.",
    questionHy: "Այսօր ես արդեն գնել եմ մեր ճանապարհորդության բոլոր տոմսերը։",
    options: [
      { key: 'A', textEs: "compraba", textHy: "գնում էի" },
      { key: 'B', textEs: "compré", textHy: "գնեցի" },
      { key: 'C', textEs: "he comprado", textHy: "արդեն գնել եմ" },
      { key: 'D', textEs: "había comprado", textHy: "գնել էի" }
    ],
    correctAnswer: 'C',
    tense: 'Pretérito Perfecto',
    tenseArmenian: 'Պրետերիտո Պերֆեկտո (Վաղակատար ներկա)',
    explanationHy: "«Hoy» (այսօր) վերաբերում է դեռ ընթացող օրվան (ներկայի հետ կապված)՝ Pretérito Perfecto («he comprado»)։",
    explanationEs: "'Hoy' señala un período de tiempo aún vigente hoy: Pretérito Perfecto (he comprado).",
    hint: "«Hoy» (այսօր) ցուցիչով օգտագործվում է Pretérito Perfecto (he comprado)։",
    prizeAmount: MONEY_LADDER[13]
  },
  {
    id: 15,
    part: 3,
    partTitleEs: "PARTE 3. VIAJES Y EXPERIENCIAS",
    partTitleHy: "ՄԱՍ 3. ՃԱՆԱՊԱՐՀՈՐԴՈՒԹՅՈՒՆ ԵՎ ՓՈՐՁԱՌՈՒԹՅՈՒՆ",
    questionEs: "Cuando entramos en el restaurante, nuestros amigos ya ___ la comida.",
    questionHy: "Երբ մտանք ռեստորան, ընկերներս արդեն պատվիրել էին ուտելիքը։",
    options: [
      { key: 'A', textEs: "habían pedido", textHy: "արդեն պատվիրել էին" },
      { key: 'B', textEs: "pedían", textHy: "պատվիրում էին" },
      { key: 'C', textEs: "pidieron", textHy: "պատվիրեցին" },
      { key: 'D', textEs: "han pedido", textHy: "պատվիրել են" }
    ],
    correctAnswer: 'A',
    tense: 'Pretérito Pluscuamperfecto',
    tenseArmenian: 'Պրետերիտո Պլյուսկվամպերֆեկտո (Նախորդ անցյալ)',
    explanationHy: "«ya» (արդեն) ցույց է տալիս, որ ընկերները պատվիրել էին նախքան մեր մտնելը («entramos»)՝ «habían pedido»։",
    explanationEs: "Acción previa a la entrada al restaurante: Pretérito Pluscuamperfecto (habían pedido).",
    hint: "«ya» ցուցիչով ընտրեք Pluscuamperfecto (habían pedido)։",
    prizeAmount: MONEY_LADDER[14] // Milestone 3 (500,000 ֏)
  },

  // ================= PARTE 4. DECISIONES Y SITUACIONES (16 - 20) =================
  {
    id: 16,
    part: 4,
    partTitleEs: "PARTE 4. DECISIONES Y SITUACIONES",
    partTitleHy: "ՄԱՍ 4. ՈՐՈՇՈՒՄՆԵՐ ԵՎ ԻՐԱՎԻՃԱԿՆԵՐ",
    questionEs: "Ayer no ___ salir porque tenía mucho trabajo.",
    questionHy: "Երեկ չկարողացա դուրս գալ, որովհետև շատ աշխատանք ունեի։",
    options: [
      { key: 'A', textEs: "podía", textHy: "կարողանում էի" },
      { key: 'B', textEs: "he podido", textHy: "կարողացել եմ" },
      { key: 'C', textEs: "había podido", textHy: "կարողացել էի" },
      { key: 'D', textEs: "pude", textHy: "չկարողացա" }
    ],
    correctAnswer: 'D',
    tense: 'Pretérito Indefinido',
    tenseArmenian: 'Պրետերիտո Ինդեֆինիդո (Ավարտված անցյալ)',
    explanationHy: "«Ayer» (երեկ) կոնկրետ ավարտված փաստ է, որ մարդը չկարողացավ դուրս գալ, «poder» բայի Indefinido անկանոն ձևն է՝ «pude»։",
    explanationEs: "'Ayer' denota un resultado puntual concreto en el pasado: Pretérito Indefinido irregular (pude).",
    hint: "«Ayer» ցույց է տալիս կոնկրետ անցյալ փաստ («poder» բայի ձևն է՝ «pude»)։",
    prizeAmount: MONEY_LADDER[15]
  },
  {
    id: 17,
    part: 4,
    partTitleEs: "PARTE 4. DECISIONES Y SITUACIONES",
    partTitleHy: "ՄԱՍ 4. ՈՐՈՇՈՒՄՆԵՐ ԵՎ ԻՐԱՎԻՃԱԿՆԵՐ",
    questionEs: "Cuando tenía quince años, no ___ qué profesión elegir.",
    questionHy: "Երբ տասնհինգ տարեկան էի, չգիտեի՝ ինչ մասնագիտություն ընտրել։",
    options: [
      { key: 'A', textEs: "supe", textHy: "իմացա" },
      { key: 'B', textEs: "sabía", textHy: "գիտեի / չգիտեի" },
      { key: 'C', textEs: "he sabido", textHy: "իմացել եմ" },
      { key: 'D', textEs: "había sabido", textHy: "իմացել էի" }
    ],
    correctAnswer: 'B',
    tense: 'Pretérito Imperfecto',
    tenseArmenian: 'Պրետերիտո Իմպերֆեկտո (Անկատար անցյալ)',
    explanationHy: "«Cuando tenía quince años» նկարագրում է անցյալի տևական հոգեվիճակ կամ չիմանալը (Pretérito Imperfecto՝ «sabía»)։",
    explanationEs: "Describe un estado mental continuo en una etapa del pasado: Pretérito Imperfecto (sabía).",
    hint: "Անցյալի տարիքը և ներքին վիճակը նկարագրելիս օգտագործվում է Imperfecto (sabía)։",
    prizeAmount: MONEY_LADDER[16]
  },
  {
    id: 18,
    part: 4,
    partTitleEs: "PARTE 4. DECISIONES Y SITUACIONES",
    partTitleHy: "ՄԱՍ 4. ՈՐՈՇՈՒՄՆԵՐ ԵՎ ԻՐԱՎԻՃԱԿՆԵՐ",
    questionEs: "El lunes pasado, después de pensarlo mucho, María ___ cambiar de universidad.",
    questionHy: "Անցյալ երկուշաբթի երկար մտածելուց հետո Մարիան որոշեց փոխել համալսարանը։",
    options: [
      { key: 'A', textEs: "decidía", textHy: "որոշում էր" },
      { key: 'B', textEs: "ha decidido", textHy: "որոշել է" },
      { key: 'C', textEs: "decidió", textHy: "որոշեց" },
      { key: 'D', textEs: "había decidido", textHy: "որոշել էր" }
    ],
    correctAnswer: 'C',
    tense: 'Pretérito Indefinido',
    tenseArmenian: 'Պրետերիտո Ինդեֆինիդո (Ավարտված անցյալ)',
    explanationHy: "«El lunes pasado» (անցյալ երկուշաբթի) կոնկրետ ավարտված որոշում է՝ «decidió» (Pretérito Indefinido)։",
    explanationEs: "'El lunes pasado' marca el momento exacto en que se tomó la decisión: Pretérito Indefinido (decidió).",
    hint: "«El lunes pasado» ցույց է տալիս կոնկրետ օրը կայացված որոշում (decidió)։",
    prizeAmount: MONEY_LADDER[17]
  },
  {
    id: 19,
    part: 4,
    partTitleEs: "PARTE 4. DECISIONES Y SITUACIONES",
    partTitleHy: "ՄԱՍ 4. ՈՐՈՇՈՒՄՆԵՐ ԵՎ ԻՐԱՎԻՃԱԿՆԵՐ",
    questionEs: "Cuando el jefe pidió el informe, nosotros ya lo ___.",
    questionHy: "Երբ ղեկավարը հաշվետվությունը պահանջեց, մենք այն արդեն ավարտել էինք։",
    options: [
      { key: 'A', textEs: "habíamos terminado", textHy: "արդեն ավարտել էինք" },
      { key: 'B', textEs: "terminábamos", textHy: "ավարտում էինք" },
      { key: 'C', textEs: "terminamos", textHy: "ավարտեցինք" },
      { key: 'D', textEs: "hemos terminado", textHy: "ավարտել ենք" }
    ],
    correctAnswer: 'A',
    tense: 'Pretérito Pluscuamperfecto',
    tenseArmenian: 'Պրետերիտո Պլյուսկվամպերֆեկտո (Նախորդ անցյալ)',
    explanationHy: "«ya» (արդեն) ցույց է տալիս, որ հաշվետվությունն ավարտվել էր մինչև ղեկավարի պահանջելը («pidió»)՝ «habíamos terminado»։",
    explanationEs: "Acción anterior a la petición del jefe: Pretérito Pluscuamperfecto (habíamos terminado).",
    hint: "«ya» ցուցիչով նախորդող գործողության ձևն է՝ «habíamos terminado»։",
    prizeAmount: MONEY_LADDER[18]
  },
  {
    id: 20,
    part: 4,
    partTitleEs: "PARTE 4. DECISIONES Y SITUACIONES",
    partTitleHy: "ՄԱՍ 4. ՈՐՈՇՈՒՄՆԵՐ ԵՎ ԻՐԱՎԻՃԱԿՆԵՐ",
    questionEs: "Antes de cambiar de ciudad, Pedro nunca ___ solo.",
    questionHy: "Մինչ ուրիշ քաղաք տեղափոխվելը Պեդրոն երբեք միայնակ չէր ապրել։",
    options: [
      { key: 'A', textEs: "vivía", textHy: "ապրում էր" },
      { key: 'B', textEs: "vivió", textHy: "ապրեց" },
      { key: 'C', textEs: "ha vivido", textHy: "ապրել է" },
      { key: 'D', textEs: "había vivido", textHy: "երբեք չէր ապրել" }
    ],
    correctAnswer: 'D',
    tense: 'Pretérito Pluscuamperfecto',
    tenseArmenian: 'Պրետերիտո Պլյուսկվամպերֆեկտո (Նախորդ անցյալ)',
    explanationHy: "«Antes de cambiar de ciudad» (մինչ քաղաքը փոխելը) նշում է նախորդող ժամանակահատվածում կատարված/չկատարված փորձ (Pretérito Pluscuamperfecto՝ «había vivido»)։",
    explanationEs: "Experiencia anterior a un punto pasado delimitado por 'antes de cambiar': Pretérito Pluscuamperfecto (había vivido).",
    hint: "«Antes de...» նշում է անցյալից էլ առաջ եղած փորձառություն (había vivido)։",
    prizeAmount: MONEY_LADDER[19] // Grand Prize (1,000,000 ֏)
  }
];

export interface TenseGuide {
  name: string;
  nameHy: string;
  formula: string;
  usageHy: string;
  keyMarkers: string[];
  exampleEs: string;
  exampleHy: string;
}

export const TENSE_GUIDES: TenseGuide[] = [
  {
    name: "Pretérito Indefinido",
    nameHy: "Ավարտված անցյալ (Պրետերիտո Ինդեֆինիդո)",
    formula: "ar -> é, aste, ó, amos, asteis, aron | er/ir -> í, iste, ió, imos, isteis, ieron",
    usageHy: "Անցյալում տեղի ունեցած և ամբողջությամբ ավարտված կոնկրետ գործողություն կամ փաստ։",
    keyMarkers: ["ayer (երեկ)", "anoche (երեկ գիշեր)", "el año pasado (անցյալ տարի)", "la semana pasada (անցյալ շաբաթ)", "en 2022"],
    exampleEs: "Ayer mis amigos me invitaron a salir.",
    exampleHy: "Երեկ ընկերներս ինձ հրավիրեցին զբոսնելու։"
  },
  {
    name: "Pretérito Imperfecto",
    nameHy: "Անկատար անցյալ (Պրետերիտո Իմպերֆեկտո)",
    formula: "ar -> aba, abas, aba, ábamos, abais, aban | er/ir -> ía, ías, ía, íamos, íais, ían",
    usageHy: "Անցյալում կրկնվող սովորություններ, անավարտ/տևական իրավիճակներ, նկարագրություններ (տարիք, եղանակ, մանկության սովորություն)։",
    keyMarkers: ["siempre (միշտ)", "todos los días (ամեն օր)", "cuando vivía... (երբ ապրում էի)", "antes (նախկինում)", "de niño (մանկության տարիներին)"],
    exampleEs: "Cuando vivía en Madrid, siempre cogía el metro.",
    exampleHy: "Երբ Մադրիդում էի ապրում, միշտ մետրոյից էի օգտվում։"
  },
  {
    name: "Pretérito Perfecto",
    nameHy: "Վաղակատար ներկա (Պրետերիտո Պերֆեկտո)",
    formula: "haber (he, has, ha, hemos, habéis, han) + participio (-ado / -ido)",
    usageHy: "Գործողություն, որը տեղի է ունեցել դեռևս չավարտված ժամանակահատվածում (այսօր, այս շաբաթ) կամ անմիջական կապ ունի ներկայի հետ։",
    keyMarkers: ["hoy (այսօր)", "esta semana (այս շաբաթ)", "este año", "todavía no (դեռ ոչ)", "ya (արդեն)"],
    exampleEs: "Esta semana he tomado varias decisiones importantes.",
    exampleHy: "Այս շաբաթ մի քանի կարևոր որոշում եմ կայացրել։"
  },
  {
    name: "Pretérito Pluscuamperfecto",
    nameHy: "Նախորդ անցյալ (Պրետերիտո Պլյուսկվամպերֆեկտո)",
    formula: "haber (había, habías, había, habíamos, habíais, habían) + participio (-ado / -ido)",
    usageHy: "Անցյալում մեկ այլ անցյալ գործողությունից ավելի վաղ կատարված գործողություն (անցյալի անցյալ)։",
    keyMarkers: ["ya (արդեն)", "antes de... (մինչև որ)", "cuando llegamos, ya... (երբ հասանք, արդեն...)"],
    exampleEs: "Cuando llegamos al hotel, alguien ya había ocupado la habitación.",
    exampleHy: "Երբ հասանք հյուրանոց, ինչ-որ մեկն արդեն զբաղեցրել էր սենյակը։"
  }
];

export function getEvaluation(score: number): {
  emoji: string;
  titleEs: string;
  titleHy: string;
  textHy: string;
  color: string;
} {
  if (score >= 18) {
    return {
      emoji: "🏆",
      titleEs: "¡Excelente!",
      titleHy: "Գերազանց",
      textHy: "Դուք իսկական իսպաներենի վարպետ եք։ Ամբողջությամբ տիրապետում եք անցյալ ժամանակներին։",
      color: "from-amber-400 to-yellow-600"
    };
  } else if (score >= 15) {
    return {
      emoji: "⭐",
      titleEs: "¡Muy bien!",
      titleHy: "Շատ լավ",
      textHy: "Հիանալի արդյունք։ Ունեք շատ ամուր գիտելիքներ և գրեթե չեք սխալվել։",
      color: "from-emerald-400 to-teal-600"
    };
  } else if (score >= 11) {
    return {
      emoji: "👍",
      titleEs: "¡Bien!",
      titleHy: "Լավ",
      textHy: "Լավ արդյունք։ Հիմնական կանոնները հասկացված են, մի փոքր էլ պրակտիկա և կհասնեք գերազանցի։",
      color: "from-sky-400 to-blue-600"
    };
  } else {
    return {
      emoji: "📚",
      titleEs: "¡Sigue practicando!",
      titleHy: "Շարունակիր մարզվել",
      textHy: "Մի հուսահատվեք։ Վերանայեք 4 անցյալ ժամանակների քերականական ցուցիչները և կրկին փորձեք։",
      color: "from-rose-400 to-orange-600"
    };
  }
}
