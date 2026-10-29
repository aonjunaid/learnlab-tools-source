import { TextbookChapterIndex } from './types';

export const TEXTBOOK_CHAPTERS_CATALOG: TextbookChapterIndex[] = [
  // =========================================================================
  // 9TH CLASS (MATRIC PART 1)
  // =========================================================================
  {
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی (نہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Matrices and Determinants', titleUr: 'قالب اور قالبوں کے مقطع', keyConcepts: ['Order of matrix', 'Types of matrices', 'Transpose', 'Adjoint & Inverse', 'Cramer Rule', 'Matrix Inversion Method'] },
      { unitNumber: 2, titleEn: 'Real and Complex Numbers', titleUr: 'حقیقی اور پیچیدہ اعداد', keyConcepts: ['Properties of real numbers', 'Radicals and Radicands', 'Laws of Exponents', 'Complex numbers', 'Basic operations on complex numbers'] },
      { unitNumber: 3, titleEn: 'Logarithms', titleUr: 'لوگارتھم', keyConcepts: ['Scientific notation', 'Common logarithm', 'Characteristic & Mantissa', 'Laws of logarithms', 'Applications using log tables'] },
      { unitNumber: 4, titleEn: 'Algebraic Expressions & Formulas', titleUr: 'الجبرائی جملے اور الجبرائی فارمولے', keyConcepts: ['Algebraic expressions', 'Polynomials', 'Rational expressions', 'Algebraic formulas (a+b)², (a+b)³', 'Surds and rationalization'] },
      { unitNumber: 5, titleEn: 'Factorization', titleUr: 'تجزی', keyConcepts: ['Factorization techniques', 'Remainder Theorem', 'Factor Theorem', 'Cubic polynomials factorization'] },
      { unitNumber: 6, titleEn: 'Algebraic Manipulation', titleUr: 'الجبرائی کثیر رقمیوں کا عاد اعظم اور ذواضعاف اقل', keyConcepts: ['Highest Common Factor (HCF)', 'Least Common Multiple (LCM)', 'Square root of algebraic expressions'] },
      { unitNumber: 7, titleEn: 'Linear Equations and Inequalities', titleUr: 'یک درجی مساواتیں اور غیر مساواتیں', keyConcepts: ['Linear equations in one variable', 'Equations involving absolute value', 'Linear inequalities'] },
      { unitNumber: 8, titleEn: 'Linear Graphs & their Applications', titleUr: 'یک درجی گراف اور ان کا اطلاق', keyConcepts: ['Cartesian plane and coordinates', 'Drawing linear graphs', 'Graphical solution of equations'] },
      { unitNumber: 9, titleEn: 'Introduction to Coordinate Geometry', titleUr: 'محدد جیومیٹری کا تعارف', keyConcepts: ['Distance formula between two points', 'Collinear points', 'Midpoint formula'] },
      { unitNumber: 10, titleEn: 'Congruent Triangles', titleUr: 'متماثل مثلثیں', keyConcepts: ['S.A.S postulate', 'S.S.S postulate', 'A.S.A postulate', 'R.H.S postulate'] },
      { unitNumber: 11, titleEn: 'Parallelograms and Triangles', titleUr: 'متوازی الاضلاع اور مثلثیں', keyConcepts: ['Properties of parallelograms', 'Medians of a triangle'] },
      { unitNumber: 12, titleEn: 'Line Bisectors and Angle Bisectors', titleUr: 'قطعات خط کے ناصف اور زاویوں کے ناصف', keyConcepts: ['Right bisector of a line segment theorem', 'Bisector of an angle theorem'] },
      { unitNumber: 13, titleEn: 'Sides and Angles of a Triangle', titleUr: 'مثلث کے اضلاع اور زاویے', keyConcepts: ['Inequalities in triangles', 'Sum of any two sides'] },
      { unitNumber: 14, titleEn: 'Ratio and Proportion', titleUr: 'نسبت اور تناسب', keyConcepts: ['Line parallel to one side of a triangle theorem', 'Similar triangles'] },
      { unitNumber: 15, titleEn: 'Pythagoras Theorem', titleUr: 'مسئلہ فیثا غورث', keyConcepts: ['Pythagoras theorem proof', 'Converse of Pythagoras theorem'] },
      { unitNumber: 16, titleEn: 'Theorems Related with Area', titleUr: 'رقبے سے متعلق مسائل', keyConcepts: ['Parallelograms on same base theorem', 'Triangles of equal area'] },
      { unitNumber: 17, titleEn: 'Practical Geometry - Triangles', titleUr: 'عملی جیومیٹری - مثلثیں', keyConcepts: ['Construction of triangles', 'Altitudes, medians and angle bisectors concurrency'] }
    ]
  },
  {
    grade: '9th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات (نہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Physical Quantities and Measurement', titleUr: 'طبیعی مقداریں اور پیمائش', keyConcepts: ['Base and derived quantities', 'SI Units and Prefixes', 'Scientific notation', 'Vernier Callipers & Screw Gauge', 'Significant figures'] },
      { unitNumber: 2, titleEn: 'Kinematics', titleUr: 'حرکیات', keyConcepts: ['Rest and motion', 'Types of motion', 'Scalars and vectors', 'Speed, velocity & acceleration', 'Equations of motion', 'Motion of freely falling bodies'] },
      { unitNumber: 3, titleEn: 'Dynamics', titleUr: 'قوت اور حرکت کے قوانین', keyConcepts: ['Force, inertia and momentum', 'Newton Three Laws of Motion', 'Mass and weight', 'Tension and acceleration in string', 'Friction and rolling friction', 'Centripetal force'] },
      { unitNumber: 4, titleEn: 'Turning Effect of Forces', titleUr: 'قوتوں کے گھماؤ کا اثر', keyConcepts: ['Like and unlike parallel forces', 'Resolution of forces', 'Torque (Moment of Force)', 'Principle of moments', 'Centre of mass/gravity', 'Conditions of equilibrium'] },
      { unitNumber: 5, titleEn: 'Gravitation', titleUr: 'گریویٹیشن', keyConcepts: ['Law of Universal Gravitation', 'Mass of Earth calculation', 'Variation of g with altitude', 'Artificial satellites and orbital velocity'] },
      { unitNumber: 6, titleEn: 'Work and Energy', titleUr: 'ورک اور انرجی', keyConcepts: ['Work done by force', 'Kinetic and Potential Energy', 'Forms and interconversion of energy', 'Major sources of energy', 'Efficiency and Power'] },
      { unitNumber: 7, titleEn: 'Properties of Matter', titleUr: 'مادے کی خصوصیات', keyConcepts: ['Kinetic molecular model', 'Density and pressure', 'Atmospheric pressure', 'Pascal Law and hydraulic press', 'Archimedes Principle and flotation', 'Elasticity and Hooke Law'] },
      { unitNumber: 8, titleEn: 'Thermal Properties of Matter', titleUr: 'مادے کی حرارتی خصوصیات', keyConcepts: ['Temperature and heat', 'Thermometer scales', 'Specific heat capacity', 'Latent heat of fusion & vaporization', 'Evaporation and factors'] },
      { unitNumber: 9, titleEn: 'Transfer of Heat', titleUr: 'حرارت کا انتقال', keyConcepts: ['Conduction and thermal conductivity', 'Convection and convection currents', 'Radiation and Leslie cube', 'Greenhouse effect', 'Thermal insulation'] }
    ]
  },
  {
    grade: '9th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری (نہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Fundamentals of Chemistry', titleUr: 'کیمیا کی بنیادی اصطلاحات', keyConcepts: ['Branches of chemistry', 'Elements, compounds & mixtures', 'Atomic number and mass number', 'Empirical and molecular formula', 'Avogadro Number and Mole'] },
      { unitNumber: 2, titleEn: 'Structure of Atoms', titleUr: 'ایٹم کی ساخت', keyConcepts: ['Rutherford Atomic Model', 'Bohr Atomic Theory', 'Electronic configuration', 'Isotopes and their applications'] },
      { unitNumber: 3, titleEn: 'Periodic Table and Periodicity', titleUr: 'پیریوڈک ٹیبل اور خصوصیات کی پیریوڈیسٹی', keyConcepts: ['Periods and groups', 'Periodic trends', 'Atomic radius and ionic radius', 'Ionization energy', 'Electron affinity', 'Electronegativity'] },
      { unitNumber: 4, titleEn: 'Structure of Molecules', titleUr: 'مالیکیولز کی ساخت اور کیمیائی بانڈز', keyConcepts: ['Octet rule and duplet rule', 'Ionic bond', 'Covalent bond (single, double, triple)', 'Coordinate covalent bond', 'Polar and non-polar bonds', 'Intermolecular forces & Hydrogen bonding'] },
      { unitNumber: 5, titleEn: 'Physical States of Matter', titleUr: 'مادے کی طبعی حالتیں', keyConcepts: ['Gaseous state properties', 'Boyle Law and Charles Law', 'Liquid state and evaporation', 'Vapour pressure and boiling point', 'Solid state, allotropy and crystals'] },
      { unitNumber: 6, titleEn: 'Solutions', titleUr: 'سولوشنز', keyConcepts: ['Solute, solvent and solution types', 'Saturated, unsaturated and supersaturated', 'Concentration units (% m/m, % m/v, Molarity)', 'Solubility and like dissolves like', 'Colloids and suspensions'] },
      { unitNumber: 7, titleEn: 'Electrochemistry', titleUr: 'الیکٹرو کیمسٹری', keyConcepts: ['Oxidation and reduction rules', 'Oxidizing and reducing agents', 'Electrolytes (strong, weak, non)', 'Galvanic (Daniell) cell', 'Electrolytic refining of copper', 'Corrosion and prevention (rusting of iron)'] },
      { unitNumber: 8, titleEn: 'Chemical Reactivity', titleUr: 'کیمیائی ردعمل اور دھاتیں', keyConcepts: ['Metals and electropositivity', 'Alkali metals and alkaline earth metals', 'Non-metals and electronegativity', 'Comparison of reactivity'] }
    ]
  },
  {
    grade: '9th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات (بائیولوجی نہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Introduction to Biology', titleUr: 'حیاتیات کا تعارف', keyConcepts: ['Divisions & branches of biology', 'Quranic verses on biology', 'Muslim scientists (Jabir, Bu Ali Sina)', 'Levels of biological organization'] },
      { unitNumber: 2, titleEn: 'Solving a Biological Problem', titleUr: 'حیاتیاتی مسئلہ کا حل', keyConcepts: ['Biological method steps', 'Observations, hypothesis & deductions', 'Experiments & theory', 'Malaria study case'] },
      { unitNumber: 3, titleEn: 'Biodiversity', titleUr: 'حیاتیاتی تنوع', keyConcepts: ['Aims and principles of classification', 'Five Kingdom system (Whittaker)', 'Binomial nomenclature', 'Deforestation and conservation in Pakistan'] },
      { unitNumber: 4, titleEn: 'Cells and Tissues', titleUr: 'خلیات اور بافتیں', keyConcepts: ['Microscopy and light/electron microscope', 'Cell theory', 'Cell organelles (Nucleus, Mitochondria, Ribosomes)', 'Plant and animal tissues'] },
      { unitNumber: 5, titleEn: 'Cell Cycle', titleUr: 'خلیاتی چکر', keyConcepts: ['Phases of cell cycle (Interphase & M-Phase)', 'Mitosis phases and significance', 'Meiosis phases and crossing over', 'Apoptosis and Necrosis'] },
      { unitNumber: 6, titleEn: 'Enzymes', titleUr: 'اینزائمز', keyConcepts: ['Characteristics of enzymes', 'Mechanism of enzyme action (Lock & Key Model, Induced Fit)', 'Factors affecting enzyme activity (Temp, pH, substrate conc)'] },
      { unitNumber: 7, titleEn: 'Bioenergetics', titleUr: 'حیاتیاتی توانائی', keyConcepts: ['Role of ATP as energy currency', 'Photosynthesis (Light and Dark reactions)', 'Cellular respiration (Aerobic & Anaerobic glycolysis, Krebs cycle)'] },
      { unitNumber: 8, titleEn: 'Nutrition', titleUr: 'غذائیت', keyConcepts: ['Mineral nutrition in plants (Nitrogen, Magnesium)', 'Components of human food (Carbs, Lipids, Proteins, Vitamins)', 'Human digestive system anatomy', 'Disorders of gut (Ulcer, Constipation)'] },
      { unitNumber: 9, titleEn: 'Transport', titleUr: 'نقل و حمل', keyConcepts: ['Transport in plants (Transpiration, Translocation in Phloem)', 'Human blood components & Blood groups (ABO, Rh)', 'Human heart structure & Cardiac cycle', 'Blood vessels (Arteries, Veins, Capillaries)'] }
    ]
  },
  {
    grade: '9th',
    subject: 'Computer Science',
    subjectUrdu: 'کمپیوٹر سائنس (نہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Problem Solving', titleUr: 'مسائل کا حل', keyConcepts: ['Problem solving steps', 'Flowcharts and standard symbols', 'Algorithms and efficiency', 'Trace tables and verification'] },
      { unitNumber: 2, titleEn: 'Binary System', titleUr: 'بائنری نظام (عددی نظام)', keyConcepts: ['Number systems (Decimal, Binary, Hexadecimal)', 'Conversions between bases', 'Binary addition and subtraction', 'Data representation (ASCII, Unicode)'] },
      { unitNumber: 3, titleEn: 'Networks', titleUr: 'کمپیوٹر نیٹ ورکس', keyConcepts: ['Computer network components', 'Client-Server and Peer-to-Peer', 'Network topologies (Bus, Star, Ring, Mesh)', 'TCP/IP model layers and IP addressing'] },
      { unitNumber: 4, titleEn: 'Data and Privacy', titleUr: 'ڈیٹا اور پرائیویسی', keyConcepts: ['Ethical issues and cybercrime', 'Confidentiality and copyright', 'Encryption and Caesar cipher', 'Password protection and phishing'] },
      { unitNumber: 5, titleEn: 'Designing Website (HTML)', titleUr: 'ویب سائٹ ڈیزائننگ (ایچ ٹی ایم ایل)', keyConcepts: ['HTML structure and tags', 'Text formatting and headings', 'Lists, hyperlinks and images in HTML', 'HTML tables and webpage creation'] }
    ]
  },
  {
    grade: '9th',
    subject: 'English',
    subjectUrdu: 'انگریزی (نہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'The Saviour of Mankind', titleUr: 'انسانیت کا نجات دہندہ', keyConcepts: ['Arabia context', 'Call to Prophethood', 'Teachings and universal message', 'Vocabulary, nouns & adjectives'] },
      { unitNumber: 2, titleEn: 'Patriotism', titleUr: 'حب الوطنی', keyConcepts: ['Meaning of patriotism', 'Quaid-e-Azam thoughts', 'Modal verbs and conditional sentences'] },
      { unitNumber: 3, titleEn: 'Media and Its Impact', titleUr: 'میڈیا اور اس کا اثر', keyConcepts: ['Role of electronic & print media', 'Constructive vs destructive role', 'Pronouns and prepositions'] },
      { unitNumber: 4, titleEn: 'Hazrat Asma (R.A)', titleUr: 'حضرت اسماء رضی اللہ عنہا', keyConcepts: ['Life and steadfastness', 'Migration to Madinah', 'Patience and generosity', 'Abstract nouns'] },
      { unitNumber: 5, titleEn: 'Daffodils (Poem)', titleUr: 'ڈافوڈلز (نظم)', keyConcepts: ['William Wordsworth', 'Imagery and personification', 'Rhyme scheme and theme'] },
      { unitNumber: 6, titleEn: 'The Quaid Vision and Pakistan', titleUr: 'قائداعظم کا وژن اور پاکستان', keyConcepts: ['Struggle for Pakistan', 'National unity and discipline', 'Adverb clauses'] },
      { unitNumber: 7, titleEn: 'Sultan Ahmad Mosque', titleUr: 'مسجد سلطان احمد (بلیو ماسک)', keyConcepts: ['Islamic architecture', 'Blue Mosque Istanbul history', 'Interior decoration and design'] },
      { unitNumber: 8, titleEn: 'Stopping by Woods on a Snowy Evening (Poem)', titleUr: 'برف پوش شام کو جنگل میں قیام (نظم)', keyConcepts: ['Robert Frost', 'Symbolism of woods and promises', 'Metaphors and alliteration'] },
      { unitNumber: 9, titleEn: 'All is Not Lost', titleUr: 'ابھی سب کچھ ختم نہیں ہوا', keyConcepts: ['ICU nurse empathy', 'Neurological recovery', 'Dedication to patient care'] },
      { unitNumber: 10, titleEn: 'Drug Addiction', titleUr: 'منشیات کی لعنت', keyConcepts: ['Causes of addiction', 'Rehabilitation centers in Pakistan', 'Prevention and family support'] },
      { unitNumber: 11, titleEn: 'Noise in the Environment', titleUr: 'ماحولیاتی شور', keyConcepts: ['Noise pollution sources', 'Effects on physical and mental health', 'Remedial steps and civic sense'] },
      { unitNumber: 12, titleEn: 'Three Days to See', titleUr: 'دیکھنے کے لیے تین دن', keyConcepts: ['Helen Keller essay', 'Appreciation of five senses', 'Living each day with fullness'] }
    ]
  },
  {
    grade: '9th',
    subject: 'Urdu',
    subjectUrdu: 'اردو لازمی (نہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Hijrat-e-Nabvi (S.A.W)', titleUr: 'ہجرت نبوی صلی اللہ علیہ وسلم (مولانا شبلی نعمانی)', keyConcepts: ['سیرت النبی، ہجرت کا پس منظر، مدینہ کی روانگی، حضرت علی کی شجاعت'] },
      { unitNumber: 2, titleEn: 'Mirza Ghalib ke Adaat-o-Khasail', titleUr: 'مرزا غالب کے عادات و خصائل (مولانا الطاف حسین حالی)', keyConcepts: ['غالب کا اخلاق، وسعت ظرف، مروت اور وضع داری، حس مزاح'] },
      { unitNumber: 3, titleEn: 'Kahili', titleUr: 'کاہلی (سر سید احمد خان)', keyConcepts: ['دلی قوی کو بیکار چھوڑنا، کاہلی کی وجوہات، محنت و حرکت کی اہمیت'] },
      { unitNumber: 4, titleEn: 'Shaeron ke Lateefay', titleUr: 'شاعروں کے لطیفے (مولانا محمد حسین آزاد)', keyConcepts: ['شعراء کی ظرافت، میر تقی میر اور مرزا سودا کے لطیفے، زبان و بیان'] },
      { unitNumber: 5, titleEn: 'Nasooh aur Saleem ki Guftgoo', titleUr: 'نصوح اور سلیم کی گفتگو (ڈپٹی نذیر احمد)', keyConcepts: ['تربیت اولاد، کھیل اور وقت کا ضیاع، اصلاحی مکالمہ'] },
      { unitNumber: 6, titleEn: 'Panchayat', titleUr: 'پنچایت (منشی پریم چند)', keyConcepts: ['الگو چودھری اور جمن شیخ، عدل و انصاف کی ذمہ داری، دوستی بمقابلہ سچائی'] },
      { unitNumber: 7, titleEn: 'Aaram-o-Sakoon', titleUr: 'آرام و سکون (سید امتیاز علی تاج)', keyConcepts: ['یک بابی ڈرامہ، بیمار میاں، گھر کا شور و غل، طنزیہ انداز'] },
      { unitNumber: 8, titleEn: 'Hamd (Nazam)', titleUr: 'حمد (مولانا الطاف حسین حالی)', keyConcepts: ['اللہ تعالیٰ کی صفات، ربوبیت، تشریح اشعار اور مفہوم'] },
      { unitNumber: 9, titleEn: 'Naat (Nazam)', titleUr: 'نعت (امیر مینائی)', keyConcepts: ['حضور اکرم صلی اللہ علیہ وسلم کی سیرت و شمائل، مدینہ منورہ کی یاد'] },
      { unitNumber: 10, titleEn: 'Ghazal - Mir Taqi Mir', titleUr: 'غزل: ہستی اپنی حباب کی سی ہے (میر تقی میر)', keyConcepts: ['نازکی اس کے لب کی کیا کہیے، سوز و گداز، صنعت تضاد'] },
      { unitNumber: 11, titleEn: 'Ghazal - Mirza Asadullah Khan Ghalib', titleUr: 'غزل: دل ناداں تجھے ہوا کیا ہے (مرزا غالب)', keyConcepts: ['فلسفیانہ انداز، تشکیک و استفسار، رموز غالب'] },
      { unitNumber: 12, titleEn: 'Qawaid-o-Insha (Grammar & Composition)', titleUr: 'قواعد و انشا، خطوط، درخواستیں اور کہانیاں', keyConcepts: ['اسم کی اقسام، ترکیب نحوی، تذکیر و تانیث، مضمون نویسی'] }
    ]
  },
  {
    grade: '9th',
    subject: 'Islamic Studies',
    subjectUrdu: 'اسلامیات لازمی (نہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Surah Al-Anfal (Ruku 1 to 5)', titleUr: 'سورۃ الانفال (رکوع 1 تا 5)', keyConcepts: ['غزوہ بدر کا پس منظر، تقویٰ، اطاعت الٰہی و رسول، مال غنیمت کے احکام'] },
      { unitNumber: 2, titleEn: 'Surah Al-Anfal (Ruku 6 to 10)', titleUr: 'سورۃ الانفال (رکوع 6 تا 10)', keyConcepts: ['حق و باطل کا معرکہ، نصرت الٰہی کے اسباب، مسلمانوں کے باہمی حقوق'] },
      { unitNumber: 3, titleEn: 'Ahadith-e-Nabvi (Hadith 1 to 10)', titleUr: 'احادیث نبویہ (حدیث 1 تا 10)', keyConcepts: ['طلب علم فرض ہے، حسن خلق، والدین کی اطاعت، امانت داری اور سچائی'] },
      { unitNumber: 4, titleEn: 'Quran Majeed ka Taaruf-o-Hifazat', titleUr: 'قرآن مجید کا تعارف، نزول اور حفاظت', keyConcepts: ['وحی کی حقیقت، جمع و تدوین قرآن، قرآن مجید کے اعجاز'] },
      { unitNumber: 5, titleEn: 'Allah Taala aur Rasool ki Mohabbat-o-Itaat', titleUr: 'اللہ تعالیٰ اور رسول کریم صلی اللہ علیہ وسلم کی محبت و اطاعت', keyConcepts: ['ایمان کی بنیادی شرط، اطاعت کے عملی تقاضے، اسوہ حسنہ'] },
      { unitNumber: 6, titleEn: 'Ilm ki Ahmiyat aur Fazilat', titleUr: 'علم کی اہمیت اور فضیلت', keyConcepts: ['علم نافع، علماء کا مقام، اسلام میں تعلیم نسواں'] },
      { unitNumber: 7, titleEn: 'Zakat aur Infaq fi Sabilillah', titleUr: 'زکوٰۃ اور انفاق فی سبیل اللہ', keyConcepts: ['زکوٰۃ کی فرضیت، مصارف زکوٰۃ، معاشی انصاف'] },
      { unitNumber: 8, titleEn: 'Haqooq-ul-Ibad (Parents & Neighbours)', titleUr: 'حقوق العباد (والدین، رشتہ دار اور پڑوسیوں کے حقوق)', keyConcepts: ['صلہ رحمی، حسن سلوک، سماجی ہم آہنگی'] }
    ]
  },
  {
    grade: '9th',
    subject: 'Pakistan Studies',
    subjectUrdu: 'مطالعہ پاکستان (نہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Ideological Basis of Pakistan', titleUr: 'نظریہ پاکستان کی اساس', keyConcepts: ['Definition of ideology', 'Sources of ideology of Pakistan', 'Two-Nation Theory', 'Statements of Quaid-e-Azam and Allama Iqbal on ideology'] },
      { unitNumber: 2, titleEn: 'Making of Pakistan (1857-1947)', titleUr: 'تحریک پاکستان اور قیام پاکستان', keyConcepts: ['War of Independence 1857', 'Aligarh Movement (Sir Syed Ahmad Khan)', 'Shimla Deputation 1906 & Muslim League formation', 'Fourteen Points of Quaid 1929', 'Lahore Resolution 1940', 'Independence 14 August 1947'] },
      { unitNumber: 3, titleEn: 'Land and Environment of Pakistan', titleUr: 'زمین اور ماحول', keyConcepts: ['Location, geography & boundaries of Pakistan', 'Major relief features (Mountains, Plateaus, Plains, Deserts)', 'Climate zones and seasons', 'Major rivers and canal irrigation system', 'Environmental hazards and conservation'] },
      { unitNumber: 4, titleEn: 'History of Pakistan (Part I: 1947-1971)', titleUr: 'تاریخ پاکستان (حصہ اول: 1947 تا 1971)', keyConcepts: ['Early problems of Pakistan (Refugees, Assets, Water issue)', 'Constitution making (Objectives Resolution 1949)', '1956 and 1962 Constitutions', '1965 Indo-Pak War', 'Causes of separation of East Pakistan 1971'] }
    ]
  },

  // =========================================================================
  // 10TH CLASS (MATRIC PART 2)
  // =========================================================================
  {
    grade: '10th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی (دہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Quadratic Equations', titleUr: 'دو درجی مساواتیں', keyConcepts: ['Standard quadratic form', 'Factorization method', 'Completing square method', 'Quadratic formula', 'Equations reducible to quadratic form'] },
      { unitNumber: 2, titleEn: 'Theory of Quadratic Equations', titleUr: 'دو درجی مساوات کا نظریہ', keyConcepts: ['Nature of roots (Discriminant)', 'Cube roots of unity and properties (ω, ω²)', 'Relations between roots and coefficients', 'Symmetric functions of roots', 'Synthetic division', 'Simultaneous equations'] },
      { unitNumber: 3, titleEn: 'Variations', titleUr: 'تغیرات (نسبت اور تناسب)', keyConcepts: ['Ratio, proportion and variations', 'Direct and inverse variation', 'Joint variation', 'Theorems on proportions (componendo-dividendo)', 'K-Method'] },
      { unitNumber: 4, titleEn: 'Partial Fractions', titleUr: 'جزوی کسریں', keyConcepts: ['Proper and improper rational fractions', 'Linear non-repeated factors', 'Linear repeated factors', 'Quadratic non-repeated factors'] },
      { unitNumber: 5, titleEn: 'Sets and Functions', titleUr: 'سیٹ اور تفاعل', keyConcepts: ['Operations on sets (union, intersection, difference)', 'Venn diagrams', 'De Morgan Laws', 'Binary relations', 'Functions (into, onto, bijective)'] },
      { unitNumber: 6, titleEn: 'Basic Statistics', titleUr: 'بنیادی شماریات', keyConcepts: ['Frequency distribution', 'Cumulative frequency', 'Measures of Central Tendency (Mean, Median, Mode)', 'Measures of Dispersion (Range, Standard Deviation, Variance)'] },
      { unitNumber: 7, titleEn: 'Introduction to Trigonometry', titleUr: 'مثلثیات کا تعارف', keyConcepts: ['Measurement of angles (degrees and radians)', 'Relationship between l, r, θ', 'Trigonometric ratios', 'Fundamental trigonometric identities (sin²θ+cos²θ=1)', 'Angle of elevation and depression'] },
      { unitNumber: 8, titleEn: 'Projection of a Side of a Triangle', titleUr: 'مثلث کے ضلع کا ظل', keyConcepts: ['Obtuse angled triangle theorem', 'Acute angled triangle theorem', 'Apollonius Theorem'] },
      { unitNumber: 9, titleEn: 'Chords of a Circle', titleUr: 'دائرے کے وتر', keyConcepts: ['Perpendicular bisector of chord passes through centre', 'Equal chords are equidistant from centre'] },
      { unitNumber: 10, titleEn: 'Tangent to a Circle', titleUr: 'دائرے کا مماس', keyConcepts: ['Tangent perpendicular to radius', 'Two tangents from external point are equal'] },
      { unitNumber: 11, titleEn: 'Chords and Arcs', titleUr: 'وتر اور قوسیں', keyConcepts: ['Congruent circles and arcs', 'Inscribed angles theorem'] },
      { unitNumber: 12, titleEn: 'Angle in a Segment of a Circle', titleUr: 'قطعات دائرہ میں زاویے', keyConcepts: ['Angle in semicircle is right angle', 'Opposite angles of cyclic quadrilateral sum to 180°'] },
      { unitNumber: 13, titleEn: 'Practical Geometry - Circles', titleUr: 'عملی جیومیٹری - دائرے', keyConcepts: ['Circumscribed circle', 'Inscribed circle', 'Escribed circle', 'Direct and transverse common tangents'] }
    ]
  },
  {
    grade: '10th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات (دہم)',
    chapters: [
      { unitNumber: 10, titleEn: 'Simple Harmonic Motion and Waves', titleUr: 'سمپل ہارمونک موشن اور ویوز', keyConcepts: ['SHM of mass attached to spring', 'Ball and bowl system', 'Simple pendulum', 'Damped oscillations', 'Wave motion (transverse & longitudinal)', 'Ripple tank (reflection, refraction, diffraction)'] },
      { unitNumber: 11, titleEn: 'Sound', titleUr: 'آواز', keyConcepts: ['Sound waves nature', 'Characteristics of sound (loudness, pitch, quality)', 'Sound intensity level and decibel scale', 'Reflection (Echo)', 'Speed of sound', 'Ultrasound applications'] },
      { unitNumber: 12, titleEn: 'Geometrical Optics', titleUr: 'جیومیٹریکل آپٹکس', keyConcepts: ['Reflection of light and spherical mirrors', 'Refraction of light and Snell Law', 'Total internal reflection and optical fibers', 'Refraction through prisms', 'Lenses and lens formula', 'Magnifying glass, compound microscope & telescope', 'Defects of vision'] },
      { unitNumber: 13, titleEn: 'Electrostatics', titleUr: 'الیکٹرو سٹیٹکس', keyConcepts: ['Electrostatic induction', 'Coulomb Law', 'Electric field and electric field intensity', 'Electrostatic potential', 'Capacitors and capacitance', 'Series and parallel combination of capacitors', 'Hazards and applications of static electricity'] },
      { unitNumber: 14, titleEn: 'Current Electricity', titleUr: 'کرنٹ الیکٹرسٹی', keyConcepts: ['Electric current and potential difference', 'Electromotive Force (EMF)', 'Ohm Law (Ohmic and non-ohmic)', 'Factors affecting resistance and resistivity', 'Series and parallel combinations of resistors', 'Joule Law and electrical power', 'Kilowatt-hour and safety measures'] },
      { unitNumber: 15, titleEn: 'Electromagnetism', titleUr: 'الیکٹرو میگنیٹزم', keyConcepts: ['Magnetic effect of steady current (Right Hand Grip Rule)', 'Force on current-carrying conductor in magnetic field (F=ILB)', 'Turning effect on current-carrying coil (DC motor)', 'Electromagnetic Induction and Faraday Law', 'Lenz Law and direction of induced current', 'Mutual induction and Transformer'] },
      { unitNumber: 16, titleEn: 'Basic Electronics', titleUr: 'بنیادی الیکٹرانکس', keyConcepts: ['Thermionic emission', 'Cathode Ray Oscilloscope (CRO)', 'Analogue and digital electronics', 'Logic gates (NOT, AND, OR, NAND, NOR) with truth tables', 'Security alarm applications'] },
      { unitNumber: 17, titleEn: 'Information and Communication Technology', titleUr: 'معلوماتی اور مواصلاتی ٹیکنالوجی', keyConcepts: ['Components of ICT', 'Transmission of electrical and light signals', 'Internet, email, and browsers', 'Primary and secondary storage devices', 'Risks of ICT to society and cybersecurity'] },
      { unitNumber: 18, titleEn: 'Atomic and Nuclear Physics', titleUr: 'ایٹمی اور نیوکلیائی طبیعیات', keyConcepts: ['Atom and atomic nucleus', 'Natural radioactivity (Alpha, Beta, Gamma rays)', 'Nuclear transmutations and half-life', 'Radioisotopes and uses', 'Nuclear Fission and Nuclear Fusion', 'Hazards of radiation and safety measures'] }
    ]
  },
  {
    grade: '10th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری (دہم)',
    chapters: [
      { unitNumber: 9, titleEn: 'Chemical Equilibrium', titleUr: 'کیمیائی توازن', keyConcepts: ['Reversible reactions and dynamic equilibrium', 'Law of Mass Action', 'Equilibrium Constant (Kc) and units', 'Importance of equilibrium constant'] },
      { unitNumber: 10, titleEn: 'Acids, Bases and Salts', titleUr: 'تیزاب، اساس اور نمکیات', keyConcepts: ['Arrhenius, Bronsted-Lowry & Lewis concepts of acids/bases', 'Self-ionization of water and pH scale', 'Indicators and pH measurement', 'Salts preparation and uses', 'Neutralization reaction'] },
      { unitNumber: 11, titleEn: 'Organic Chemistry', titleUr: 'نامیاتی کیمیا', keyConcepts: ['Organic compounds characteristics', 'Structural and condensed formula', 'Homologous series', 'Functional groups (Alcohols, Aldehydes, Ketones, Carboxylic acids)', 'Fossil fuels (Coal, Petroleum, Natural Gas)'] },
      { unitNumber: 12, titleEn: 'Hydrocarbons', titleUr: 'ہائیڈرو کاربنز', keyConcepts: ['Alkanes preparation and halogenation', 'Alkenes preparation and combustion', 'Alkynes preparation and oxidation with KMnO4', 'Uses of methane, ethene, and ethyne'] },
      { unitNumber: 13, titleEn: 'Biochemistry', titleUr: 'حیاتیاتی کیمیا', keyConcepts: ['Carbohydrates (Mono, Di, Polysaccharides)', 'Proteins and amino acids', 'Lipids and fatty acids', 'Nucleic acids (DNA and RNA)', 'Vitamins and their importance'] },
      { unitNumber: 14, titleEn: 'Environmental Chemistry I: Atmosphere', titleUr: 'ماحولیاتی کیمیا اول: کرہ ہوائی', keyConcepts: ['Atmosphere layers (Troposphere, Stratosphere)', 'Air pollutants (CO, SO2, NOx)', 'Greenhouse effect and global warming', 'Acid rain causes and effects', 'Ozone depletion'] },
      { unitNumber: 15, titleEn: 'Environmental Chemistry II: Water', titleUr: 'ماحولیاتی کیمیا دوم: پانی', keyConcepts: ['Properties of water as universal solvent', 'Soft and hard water', 'Causes of temporary and permanent hardness', 'Water softening methods (Clark method, washing soda, ion exchange)', 'Water pollution and water-borne diseases'] },
      { unitNumber: 16, titleEn: 'Chemical Industries', titleUr: 'کیمیائی صنعتیں', keyConcepts: ['Basic metallurgical operations (Roasting, Smelting, Bessemerization)', 'Solvay Process for manufacturing Sodium Carbonate', 'Urea manufacturing process', 'Petroleum refining and fractional distillation'] }
    ]
  },
  {
    grade: '10th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات (بائیولوجی دہم)',
    chapters: [
      { unitNumber: 10, titleEn: 'Gaseous Exchange', titleUr: 'گیسیوں کا تبادلہ', keyConcepts: ['Gaseous exchange in plants (Stomata & Lenticels)', 'Human respiratory system anatomy', 'Mechanism of breathing (Inhalation & Exhalation)', 'Respiratory disorders (Bronchitis, Emphysema, Pneumonia, Lung cancer)'] },
      { unitNumber: 11, titleEn: 'Homeostasis', titleUr: 'ہومیوسٹیسس', keyConcepts: ['Homeostasis in plants (Removal of extra water, O2, CO2)', 'Homeostasis in humans (Skin, Lungs, Kidneys)', 'Structure of human kidney & nephron', 'Osmoregulation and urine formation', 'Kidney stones & Dialysis'] },
      { unitNumber: 12, titleEn: 'Coordination and Control', titleUr: 'کوآرڈینیشن اور کنٹرول', keyConcepts: ['Nervous coordination (Neuron, Nerve impulse, Reflex arc)', 'Human Brain (Forebrain, Midbrain, Hindbrain) and Spinal cord', 'Endocrine system and major glands (Pituitary, Thyroid, Pancreas, Adrenal)', 'Disorders of nervous system (Paralysis, Epilepsy)'] },
      { unitNumber: 13, titleEn: 'Support and Movement', titleUr: 'سہارا اور حرکت', keyConcepts: ['Human Skeleton (Axial & Appendicular skeleton)', 'Bone and Cartilage types', 'Joints and their types (Hinge, Ball and Socket)', 'Muscles and movement (Antagonism - Biceps and Triceps)', 'Disorders of skeletal system (Osteoporosis, Arthritis)'] },
      { unitNumber: 14, titleEn: 'Reproduction', titleUr: 'تولید', keyConcepts: ['Asexual reproduction (Binary fission, Budding, Spore formation)', 'Vegetative propagation in plants (Natural & Artificial)', 'Sexual reproduction in flowering plants (Pollination & Fertilization)', 'Human reproductive system & AIDS awareness'] },
      { unitNumber: 15, titleEn: 'Inheritance', titleUr: 'وراثت', keyConcepts: ['Chromosomes and Genes structure', 'Mendel Laws of Inheritance (Segregation & Independent Assortment)', 'Co-dominance and Incomplete dominance', 'Variations and Natural Selection'] },
      { unitNumber: 16, titleEn: 'Man and His Environment', titleUr: 'انسان اور اس کا ماحول', keyConcepts: ['Ecosystem components (Biotic & Abiotic)', 'Food chains and Food webs', 'Symbiosis (Parasitism, Mutualism, Commensalism)', 'Nitrogen and Carbon biogeochemical cycles', 'Pollution and conservation of nature'] },
      { unitNumber: 17, titleEn: 'Biotechnology', titleUr: 'بائیو ٹیکنالوجی', keyConcepts: ['Definition and scope of biotechnology', 'Fermentation (Alcoholic & Lactic acid) and fermenters', 'Genetic engineering applications (Insulin, Vaccines)', 'Single cell protein (SCP)'] },
      { unitNumber: 18, titleEn: 'Pharmacology', titleUr: 'ادویات کا علم (فارماکولوجی)', keyConcepts: ['Medicinal drugs and sources (Plants, Animals, Minerals, Microorganisms)', 'Synthetic drugs and antibiotics (Penicillin, Cephalosporins)', 'Sedatives, Narcotics and Hallucinogens', 'Antibiotic resistance and drug addiction'] }
    ]
  },
  {
    grade: '10th',
    subject: 'Computer Science',
    subjectUrdu: 'کمپیوٹر سائنس (دہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Introduction to Programming (C Language)', titleUr: 'پروگرامنگ کا تعارف (سی لینگویج)', keyConcepts: ['Programming environment & IDE', 'Structure of C program (Preprocessor directives, main function)', 'Syntax and semantic errors', 'Comments in code'] },
      { unitNumber: 2, titleEn: 'User Interface & Input/Output in C', titleUr: 'سی لینگویج میں ان پٹ اور آؤٹ پٹ', keyConcepts: ['printf() and format specifiers (%d, %f, %c, %s)', 'scanf() function for user input', 'Escape sequences (\\n, \\t)', 'Operators (Arithmetic, Relational, Logical, Assignment)'] },
      { unitNumber: 3, titleEn: 'Conditional Logic in C', titleUr: 'کنٹرول اسٹرکچر اور کنڈیشنل لاجک', keyConcepts: ['Control flow statements', 'if, if-else statements', 'Nested if-else constructs', 'switch statement'] },
      { unitNumber: 4, titleEn: 'Data Structures: Arrays in C', titleUr: 'ڈیٹا اسٹرکچرز: ارریز', keyConcepts: ['Array concept and memory allocation', 'Array declaration and initialization', 'Accessing array elements using index', 'Loops and array traversals'] },
      { unitNumber: 5, titleEn: 'Functions in C', titleUr: 'فنکشنز (فنکشن کی تعریف اور کالنگ)', keyConcepts: ['Built-in vs User-defined functions', 'Function declaration, definition and calling', 'Parameters and return values', 'Benefits of modular programming'] }
    ]
  },
  {
    grade: '10th',
    subject: 'English',
    subjectUrdu: 'انگریزی (دہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Hazrat Muhammad (PBUH) An Embodiment of Justice', titleUr: 'حضرت محمد ﷺ عدل و انصاف کا پیکر', keyConcepts: ['Universal justice', 'Fair dealings with all people', 'Historical incidents of justice', 'Direct and indirect speech'] },
      { unitNumber: 2, titleEn: 'Chinese New Year', titleUr: 'چینی نیا سال', keyConcepts: ['Cultural celebration rituals', 'Spring Festival cleaning and food symbols', 'Red envelopes and fireworks'] },
      { unitNumber: 3, titleEn: 'Try Again (Poem)', titleUr: 'دوبارہ کوشش کرو (نظم)', keyConcepts: ['W.E. Hickson poem', 'Persistence and overcoming failure', 'Theme and rhythm'] },
      { unitNumber: 4, titleEn: 'First Aid', titleUr: 'ابتدائی طبی امداد', keyConcepts: ['Treating cuts, scrapes and burns', 'First aid kit essential components', 'Bandages and antibiotic ointments'] },
      { unitNumber: 5, titleEn: 'The Rain (Poem)', titleUr: 'بارش (نظم)', keyConcepts: ['W.H. Davies poem', 'Rich leaves drinking rain', 'Sunshine breaking through clouds', 'Symbolism of social classes'] },
      { unitNumber: 6, titleEn: 'Television vs Newspapers', titleUr: 'ٹیلی ویژن بمقابلہ اخبارات', keyConcepts: ['Comparative media merits', 'Convenience of TV vs depth of print', 'Habit of reading'] },
      { unitNumber: 7, titleEn: 'Little by Little One Walks Far', titleUr: 'آہستہ آہستہ سفر طے ہوتا ہے', keyConcepts: ['Student co-curricular achievements', 'Time management and leadership skills', 'Personal ambition and college prep'] },
      { unitNumber: 8, titleEn: 'Peace (Poem)', titleUr: 'امن (نظم)', keyConcepts: ['Dr. Hartmann poem', 'Wind as monster destroying nature', 'Wind as whisper carrying peace'] },
      { unitNumber: 9, titleEn: 'Selecting the Right Career', titleUr: 'درست کیریئر کا انتخاب', keyConcepts: ['Career guidance importance', 'Dynamic modern job fields (IT, Media, Engineering)', 'Aligning passion with aptitude'] },
      { unitNumber: 10, titleEn: 'A World Without Books', titleUr: 'کتابوں کے بغیر دنیا', keyConcepts: ['Significance of literature and books', 'Books as bridges across cultures', 'Ray Bradbury thoughts'] },
      { unitNumber: 11, titleEn: 'Great Expectations', titleUr: 'عظیم توقعات (ناول خلاصہ)', keyConcepts: ['Charles Dickens classic novel', 'Pip childhood and benefactor Magwitch', 'Themes of loyalty and true gentlemanhood'] },
      { unitNumber: 12, titleEn: 'Population Growth and World Food Supplies', titleUr: 'آبادی میں اضافہ اور خوراک کی ترسیل', keyConcepts: ['Malthusian food shortage concerns', 'Overpopulation impacts on developing nations', 'Agricultural tech and sustainability'] },
      { unitNumber: 13, titleEn: 'Faithfulness', titleUr: 'ایفائے عہد (وفاداری)', keyConcepts: ['Hazrat Umar (R.A) Caliphate trial incident', 'Abu Dhar Ghaffari bail guarantee', 'Islam teachings on keeping promises'] }
    ]
  },
  {
    grade: '10th',
    subject: 'Urdu',
    subjectUrdu: 'اردو لازمی (دہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Mirza Muhammad Saeed', titleUr: 'مرزا محمد سعید (شاہد احمد دہلوی)', keyConcepts: ['خاکہ نگاری، بے لوث علمی خدمت، دہلی کا ادیبانہ ماحول'] },
      { unitNumber: 2, titleEn: 'Nazaria-e-Pakistan', titleUr: 'نظریہ پاکستان (ڈاکٹر غلام مصطفیٰ خان)', keyConcepts: ['اسلامی تہذیب و تمدن، دو قومی نظریہ، پاکستان کے اغراض و مقاصد'] },
      { unitNumber: 3, titleEn: 'Paristan ki Shehzadi', titleUr: 'پرستان کی شہزادی (اشرف صبوحی)', keyConcepts: ['سیدانی بی کا قصہ، پرستان کی سیر، فینٹسی اور اصلاحی پہلو'] },
      { unitNumber: 4, titleEn: 'Urdu Adab mein Eid-ul-Fitr', titleUr: 'اردو ادب میں عید الفطر (ڈاکٹر وحید قریشی)', keyConcepts: ['عید کا موضوع شاعری میں، غالب اور حالی کی عیدیہ نظمیں'] },
      { unitNumber: 5, titleEn: 'Mujhe Mere Doston se Bachao', titleUr: 'مجھے میرے دوستوں سے بچاؤ (سجاد حیدر یلدرم)', keyConcepts: ['دوستوں کی بے جا مداخلت، وقت کا ضیاع، طنز و مزاح'] },
      { unitNumber: 6, titleEn: 'Namdev Mali', titleUr: 'نام دیو مالی (مولوی عبدالحق)', keyConcepts: ['محنت کی عظمت، مالی کا اپنے کام سے عشق، خلوص اور فرض شناسی'] },
      { unitNumber: 7, titleEn: 'Ali Bakhsh', titleUr: 'علی بخش (قدرت اللہ شہاب)', keyConcepts: ['علامہ اقبال کے خادم کی زبانی، اقبال کی ذاتی زندگی کے پہلو'] },
      { unitNumber: 8, titleEn: 'Hamd (Nazam)', titleUr: 'حمد (حفیظ جالندھری)', keyConcepts: ['خالق کائنات کی صناعی، قادر مطلق کی تعریف'] },
      { unitNumber: 9, titleEn: 'Naat (Nazam)', titleUr: 'نعت (احسان دانش)', keyConcepts: ['غمگسار دو جہاں، رحمت للعالمین کے اوصاف'] },
      { unitNumber: 10, titleEn: 'Ghazal - Hasrat Mohani', titleUr: 'غزل: بھلاتا لاکھ ہوں لیکن برابر یاد آتے ہیں', keyConcepts: ['حسرت موہانی کی عاشقی و آزادی، ترنم اور پاکیزگی'] },
      { unitNumber: 11, titleEn: 'Ghazal - Jigar Muradabadi', titleUr: 'غزل: آدمی آدمی سے ملتا ہے', keyConcepts: ['دل مگر کم کسی سے ملتا ہے، تغزل اور صوفیانہ رنگ'] },
      { unitNumber: 12, titleEn: 'Mazmoon Nawisi aur Darkhwast', titleUr: 'مضمون نویسی، خطوط اور مکالمہ نگاری', keyConcepts: ['قومی تہوار، سائنس کے کرشمے، وقت کی پابندی'] }
    ]
  },
  {
    grade: '10th',
    subject: 'Islamic Studies',
    subjectUrdu: 'اسلامیات لازمی (دہم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Surah Al-Ahzab (Ruku 1 to 4)', titleUr: 'سورۃ الاحزاب (رکوع 1 تا 4)', keyConcepts: ['غزوہ احزاب (خندق) کے واقعات، نفاق کے اسباب، اسوہ حسنہ'] },
      { unitNumber: 2, titleEn: 'Surah Al-Ahzab (Ruku 5 to 8)', titleUr: 'سورۃ الاحزاب (رکوع 5 تا 8)', keyConcepts: ['ازواج مطہرات کے احکام، پردہ اور حجاب، خاتم النبیین کا مقام'] },
      { unitNumber: 3, titleEn: 'Surah Al-Mumtahanah', titleUr: 'سورۃ الممتحنہ (مکمل)', keyConcepts: ['کفار سے تعلقات کے اصول، حضرت ابراہیم علیہ السلام کا نمونہ، ہجرت کے احکام'] },
      { unitNumber: 4, titleEn: 'Ahadith-e-Mubaraka (Hadith 11 to 20)', titleUr: 'احادیث نبویہ (حدیث 11 تا 20)', keyConcepts: ['سچائی میں نجات، غصہ پر قابو، مزدور کی اجرت، عفو و درگزر'] },
      { unitNumber: 5, titleEn: 'Jihad fi Sabilillah', titleUr: 'جہاد فی سبیل اللہ', keyConcepts: ['جہاد کے معانی، اقسام (جہاد بالنفس، بالمال، بالسیف)، اغراض و مقاصد'] },
      { unitNumber: 6, titleEn: 'Faraz-e-Hajj aur Is ki Barkaat', titleUr: 'فریضہ حج اور اس کی برکات', keyConcepts: ['حج کی فرضیت و فضیلت، ارکان حج، عالم اسلام کا اجتماع'] },
      { unitNumber: 7, titleEn: 'Akhlaq-e-Hasana (Patience & Honesty)', titleUr: 'اخلاق حسنہ (صبر و شکر، سچائی اور دیانت داری)', keyConcepts: ['اخلاق فاضلہ کے اثرات، معاشرتی امن'] },
      { unitNumber: 8, titleEn: 'Family Life in Islam', titleUr: 'اسلام میں خاندانی زندگی اور معاشرت', keyConcepts: ['نکاح کی اہمیت، بچوں کی تربیت، والدین کے حقوق'] }
    ]
  },
  {
    grade: '10th',
    subject: 'Pakistan Studies',
    subjectUrdu: 'مطالعہ پاکستان (دہم)',
    chapters: [
      { unitNumber: 5, titleEn: 'History of Pakistan (Part II: 1971 to Present)', titleUr: 'تاریخ پاکستان (حصہ دوم: 1971 تا حال)', keyConcepts: ['Zulfikar Ali Bhutto era reforms', '1973 Constitution features', 'General Zia-ul-Haq period', 'Benazir Bhutto & Nawaz Sharif governments', 'General Pervez Musharraf era', 'CPEC and contemporary Pakistan'] },
      { unitNumber: 6, titleEn: 'Foreign Policy and International Relations', titleUr: 'پاکستان کے خارجہ تعلقات', keyConcepts: ['Objectives and principles of Pakistan foreign policy', 'Pakistan relations with neighbors (China, India, Afghanistan, Iran)', 'Pakistan and the Muslim World (OIC)', 'Relations with USA, Russia and UK', 'Kashmir dispute origin and UN resolutions'] },
      { unitNumber: 7, titleEn: 'Economic Development of Pakistan', titleUr: 'معاشی ترقی', keyConcepts: ['Economic sectors (Agriculture, Industry, Services)', 'Major crops and agricultural issues', 'Major industries (Textiles, Cement, Sugar, Fertilizer)', 'Energy crises and power generation projects', 'International trade and balance of payments'] },
      { unitNumber: 8, titleEn: 'Society and Culture of Pakistan', titleUr: 'آبادی، معاشرہ اور ثقافت', keyConcepts: ['Salient features of Pakistani culture', 'Regional languages (Punjabi, Sindhi, Pashto, Balochi)', 'Educational structure and challenges in Pakistan', 'Healthcare system in Pakistan', 'Tourism and archaeological heritage'] }
    ]
  },

  // =========================================================================
  // 11TH CLASS (1ST YEAR / FSC / ICS PART 1)
  // =========================================================================
  {
    grade: '11th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی (گیارہویں جماعت / سال اول)',
    chapters: [
      { unitNumber: 1, titleEn: 'Number Systems', titleUr: 'عددی نظام', keyConcepts: ['Complex numbers algebra', 'Argand diagram', 'De Moivre Theorem', 'Binary operations and properties'] },
      { unitNumber: 2, titleEn: 'Sets, Functions and Groups', titleUr: 'سیٹ، تفاعل اور گروپس', keyConcepts: ['Truth tables and logic propositions', 'Equivalence relations', 'Group axioms and abelian groups'] },
      { unitNumber: 3, titleEn: 'Matrices and Determinants', titleUr: 'قالب اور مقطع', keyConcepts: ['Echelon and reduced echelon form', 'Rank of matrix', 'Properties of determinants', 'System of non-homogeneous linear equations'] },
      { unitNumber: 4, titleEn: 'Quadratic Equations', titleUr: 'دو درجی مساواتیں', keyConcepts: ['Roots of polynomial equations', 'Cube and four fourth roots of unity', 'Synthetic division', 'Systems of quadratic equations'] },
      { unitNumber: 5, titleEn: 'Partial Fractions', titleUr: 'جزوی کسریں', keyConcepts: ['Partial fractions of rational fractions with linear and irreducible quadratic factors'] },
      { unitNumber: 6, titleEn: 'Sequences and Series', titleUr: 'تسلسل اور سلسلہ (سیکوئنس اور سیریز)', keyConcepts: ['Arithmetic Progression (A.P)', 'Geometric Progression (G.P)', 'Harmonic Progression (H.P)', 'Infinite geometric series', 'Sigma notation sum of n, n², n³'] },
      { unitNumber: 7, titleEn: 'Permutation, Combination and Probability', titleUr: 'ترتیب، مجموعہ اور احتمال', keyConcepts: ['Fundamental principle of counting', 'Permutations nPr and Combinations nCr', 'Probability laws and conditional probability'] },
      { unitNumber: 8, titleEn: 'Mathematical Induction and Binomial Theorem', titleUr: 'ریاضیاتی استقراء اور دو رقمی مسئلہ', keyConcepts: ['Principle of mathematical induction', 'Binomial theorem for positive integers', 'Binomial series for rational index'] },
      { unitNumber: 9, titleEn: 'Fundamentals of Trigonometry', titleUr: 'مثلثیات کی بنیادیں', keyConcepts: ['Radian measure and sector arc length l=rθ', 'Trigonometric ratios in quadrant', 'Fundamental identities sin²θ+cos²θ=1'] },
      { unitNumber: 10, titleEn: 'Trigonometric Identities of Sum and Difference', titleUr: 'جمع اور تفریق کی مثلثیاتی مماثلتیں', keyConcepts: ['Fundamental law of trigonometry cos(α-β)', 'Deductions of law', 'Double angle and half angle identities'] },
      { unitNumber: 11, titleEn: 'Trigonometric Functions and their Graphs', titleUr: 'مثلثیاتی تفاعل اور ان کے گراف', keyConcepts: ['Periodicity of trigonometric functions', 'Graphs of sin x, cos x, tan x in standard intervals'] },
      { unitNumber: 12, titleEn: 'Applications of Trigonometry', titleUr: 'مثلثیات کا اطلاق اور مثلثوں کا حل', keyConcepts: ['Law of Sines, Law of Cosines, Law of Tangents', 'Circles connected with triangles (Incircle, Circumcircle, Escribed circles)'] },
      { unitNumber: 13, titleEn: 'Inverse Trigonometric Functions', titleUr: 'معکوس مثلثیاتی تفاعل', keyConcepts: ['Principal values and domains of inverse functions', 'Addition identities of inverse trigonometric ratios'] },
      { unitNumber: 14, titleEn: 'Solutions of Trigonometric Equations', titleUr: 'مثلثیاتی مساواتوں کا حل', keyConcepts: ['General solutions of trigonometric equations', 'Finding roots using standard reference angles'] }
    ]
  },
  {
    grade: '11th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات (گیارہویں جماعت / سال اول)',
    chapters: [
      { unitNumber: 1, titleEn: 'Measurements', titleUr: 'پیمائشیں', keyConcepts: ['Physical quantities & SI units', 'Errors and uncertainties (Absolute, Fractional, Percentage)', 'Significant figures rules', 'Dimensional analysis of physical equations'] },
      { unitNumber: 2, titleEn: 'Vectors and Equilibrium', titleUr: 'ویکٹرز اور توازن', keyConcepts: ['Addition of vectors by rectangular components', 'Scalar (Dot) product and Vector (Cross) product', 'Torque and equilibrium conditions'] },
      { unitNumber: 3, titleEn: 'Motion and Force', titleUr: 'حرکت اور قوت', keyConcepts: ['Displacement-time & velocity-time graphs', 'Newton Laws of motion', 'Elastic collisions in one dimension', 'Projectile motion (Range, Time of flight, Height)'] },
      { unitNumber: 4, titleEn: 'Work and Energy', titleUr: 'ورک اور توانائی', keyConcepts: ['Work done by constant and variable force', 'Gravitational field as conservative field', 'Absolute potential energy', 'Escape velocity'] },
      { unitNumber: 5, titleEn: 'Circular Motion', titleUr: 'دائرہ نما حرکت', keyConcepts: ['Angular displacement, velocity and acceleration', 'Centripetal force & acceleration', 'Moment of inertia and rotational kinetic energy', 'Geostationary satellites and orbital velocity'] },
      { unitNumber: 6, titleEn: 'Fluid Dynamics', titleUr: 'مائعات کی حرکیات', keyConcepts: ['Viscous drag and Stokes Law', 'Terminal velocity', 'Equation of continuity', 'Bernoulli Equation and applications'] },
      { unitNumber: 7, titleEn: 'Oscillations', titleUr: 'ارتعاشات (آسیلیشنز)', keyConcepts: ['Simple Harmonic Motion (SHM)', 'Mass-spring system and Simple Pendulum', 'Energy conservation in SHM', 'Resonance and damped oscillations'] },
      { unitNumber: 8, titleEn: 'Waves', titleUr: 'امواج (ویوز)', keyConcepts: ['Progressive waves', 'Speed of sound in air (Newton formula & Laplace correction)', 'Stationary waves in stretched strings and air columns', 'Doppler Effect'] },
      { unitNumber: 9, titleEn: 'Physical Optics', titleUr: 'طبیعی بصریات', keyConcepts: ['Wavefronts and Huygens Principle', 'Young Double Slit Experiment', 'Diffraction of light by grating', 'Polarization of light'] },
      { unitNumber: 10, titleEn: 'Optical Instruments', titleUr: 'بصری آلات', keyConcepts: ['Magnifying glass, Compound Microscope, Astronomical Telescope', 'Spectrometer components', 'Optical fibers and light transmission'] },
      { unitNumber: 11, titleEn: 'Heat and Thermodynamics', titleUr: 'حرارت اور تھرموڈائنامکس', keyConcepts: ['Kinetic theory of gases', 'Work and heat in thermodynamic systems', 'First Law of Thermodynamics (Isothermal, Adiabatic)', 'Molar specific heats Cp - Cv = R', 'Second Law of Thermodynamics and Carnot Engine', 'Entropy'] }
    ]
  },
  {
    grade: '11th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری (گیارہویں جماعت / سال اول)',
    chapters: [
      { unitNumber: 1, titleEn: 'Basic Concepts', titleUr: 'بنیادی تصورات', keyConcepts: ['Atom, molecule, ion and isotopes', 'Mass spectrometry', 'Empirical and molecular formula from combustion', 'Stoichiometry and limiting reactant', 'Yield calculations'] },
      { unitNumber: 2, titleEn: 'Experimental Techniques in Chemistry', titleUr: 'تجرباتی تکنیکیں', keyConcepts: ['Filtration and gooch crucible', 'Crystallization steps', 'Sublimation', 'Solvent extraction and distribution law', 'Chromatography (Paper and TLC)'] },
      { unitNumber: 3, titleEn: 'Gases', titleUr: 'گیسیں', keyConcepts: ['Gas laws (Boyle, Charles, Avogadro)', 'Ideal gas equation PV=nRT', 'Dalton Law of partial pressures', 'Graham Law of diffusion', 'Kinetic molecular theory and Van der Waals equation for real gases'] },
      { unitNumber: 4, titleEn: 'Liquids and Solids', titleUr: 'مائعات اور ٹھوس', keyConcepts: ['Intermolecular forces (Dipole, London dispersion, Hydrogen bond)', 'Vapour pressure and boiling point', 'Crystalline solids and lattice energy', 'Types of crystals (Ionic, Covalent, Molecular, Metallic)'] },
      { unitNumber: 5, titleEn: 'Atomic Structure', titleUr: 'ایٹم کی ساخت', keyConcepts: ['Discharge tube experiments and cathode rays', 'Plank Quantum Theory and Bohr Model', 'Spectrum (Continuous vs Line spectrum)', 'De Broglie hypothesis and Heisenberg Uncertainty Principle', 'Quantum numbers and electronic configuration'] },
      { unitNumber: 6, titleEn: 'Chemical Bonding', titleUr: 'کیمیائی بانڈنگ', keyConcepts: ['Energetics of chemical bonding', 'VSEPR Theory of molecular geometry', 'Valence Bond Theory (VBT) and hybridization (sp, sp², sp³)', 'Molecular Orbital Theory (MOT) of homonuclear diatomic molecules'] },
      { unitNumber: 7, titleEn: 'Thermochemistry', titleUr: 'تھرمو کیمسٹری', keyConcepts: ['System, surroundings and state functions', 'First Law of Thermodynamics and enthalpy (ΔH)', 'Hess Law of constant heat summation', 'Born-Haber Cycle'] },
      { unitNumber: 8, titleEn: 'Chemical Equilibrium', titleUr: 'کیمیائی توازن', keyConcepts: ['Reversible reactions and Kc expression', 'Le Chatelier Principle (Effect of conc, temp, pressure)', 'Solubility product (Ksp)', 'Common ion effect and buffer solutions'] },
      { unitNumber: 9, titleEn: 'Solutions', titleUr: 'سولوشنز', keyConcepts: ['Concentration units (Molarity, Molality, Mole fraction)', 'Raoult Law of ideal solutions', 'Colligative properties (Elevation of BP, Depression of FP)', 'Osmotic pressure'] },
      { unitNumber: 10, titleEn: 'Electrochemistry', titleUr: 'الیکٹرو کیمسٹری', keyConcepts: ['Oxidation states balancing by ion-electron method', 'Electrolytic conduction and Faraday laws', 'Galvanic cells and standard electrode potentials (SHE)', 'Electrochemical series and corrosion'] },
      { unitNumber: 11, titleEn: 'Reaction Kinetics', titleUr: 'ری ایکشن کائینیٹکس', keyConcepts: ['Rate of reaction and rate law', 'Order of reaction and molecularity', 'Half-life method of finding reaction order', 'Arrhenius equation and activation energy', 'Catalysis'] }
    ]
  },
  {
    grade: '11th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات (گیارہویں جماعت / سال اول)',
    chapters: [
      { unitNumber: 1, titleEn: 'Cell Structure and Function', titleUr: 'خلیہ کی ساخت اور افعال', keyConcepts: ['Plasma membrane fluid mosaic model', 'Endoplasmic reticulum, Golgi, Lysosomes', 'Plastids and Chloroplast ultrastructure', 'Prokaryotic vs Eukaryotic cells'] },
      { unitNumber: 2, titleEn: 'Biological Molecules', titleUr: 'حیاتیاتی مالیکیولز', keyConcepts: ['Biological importance of water', 'Carbohydrates structure', 'Proteins hierarchy (Primary, Secondary, Tertiary, Quaternary)', 'Lipids, Phospholipids and Steroids', 'DNA double helix and RNA types'] },
      { unitNumber: 3, titleEn: 'Enzymes', titleUr: 'اینزائمز', keyConcepts: ['Enzyme structure and active site', 'Co-factors, Co-enzymes and Prosthetic groups', 'Enzyme kinetics and Michaelis-Menten constant', 'Enzyme inhibitors (Competitive & Non-competitive)'] },
      { unitNumber: 4, titleEn: 'Bioenergetics', titleUr: 'حیاتیاتی توانائی', keyConcepts: ['Photosynthetic pigments and absorption spectra', 'Light reactions: Non-cyclic and Cyclic photophosphorylation', 'Calvin cycle (Dark reaction)', 'Cellular respiration: Glycolysis, Krebs cycle, Oxidative phosphorylation'] },
      { unitNumber: 5, titleEn: 'Acellular and Non-Cellular Life (Viruses)', titleUr: 'وائرسز کی ساخت اور لائف سائیکل', keyConcepts: ['Discovery and structure of viruses (Capsid, Genome)', 'Bacteriophage lytic and lysogenic cycles', 'HIV and AIDS pathology', 'Hepatitis viruses and Prions/Viroids'] },
      { unitNumber: 6, titleEn: 'Prokaryotes (Bacteria and Cyanobacteria)', titleUr: 'بیکٹیریا اور سائنو بیکٹیریا', keyConcepts: ['Bacterial cell wall (Gram positive vs Gram negative)', 'Bacterial nutrition and reproduction (Binary fission, Conjugation)', 'Economic importance and control of bacteria'] },
      { unitNumber: 7, titleEn: 'Protists and Fungi', titleUr: 'پروٹسٹا اور فنجائی', keyConcepts: ['Protozoa, Algae and slime molds', 'Fungal body (Hyphae, Mycelium)', 'Fungal reproduction and mycorrhizae', 'Economic importance of fungi'] },
      { unitNumber: 8, titleEn: 'Diversity Among Plants (Plantae)', titleUr: 'پودوں کا تنوع (برائیو فائیٹس تا انجیو سپرمز)', keyConcepts: ['Bryophytes (Mosses, Liverworts) alternation of generations', 'Tracheophytes: Pteridophytes (Ferns), Gymnosperms, Angiosperms', 'Evolution of seed and floral parts'] },
      { unitNumber: 9, titleEn: 'Diversity Among Animals (Animalia)', titleUr: 'جانوروں کا تنوع', keyConcepts: ['Criteria for animal classification (Symmetry, Coelom, Germ layers)', 'Invertebrate phyla (Porifera to Echinodermata)', 'Chordates and Vertebrate classes'] },
      { unitNumber: 10, titleEn: 'Forms and Functions in Plants', titleUr: 'پودوں کے اعضاء اور افعال', keyConcepts: ['Plant tissues (Meristematic, Permanent)', 'Water and mineral absorption in roots', 'Transpiration and Ascent of Sap', 'Phloem translocation'] },
      { unitNumber: 11, titleEn: 'Digestion and Nutrition', titleUr: 'ہاضمہ اور غذائیت', keyConcepts: ['Autotrophic vs Heterotrophic nutrition', 'Human digestive system histology', 'Enzymatic digestion in mouth, stomach, small intestine', 'Liver and Pancreas roles'] },
      { unitNumber: 12, titleEn: 'Circulation and Immunity', titleUr: 'گردش خون اور مدافعتی نظام', keyConcepts: ['Open vs Closed circulatory system', 'Human heart cycle and conducting system (SA node, AV node)', 'Blood pressure and lymphatic system', 'Immune response: Innate vs Adaptive immunity, T and B cells'] },
      { unitNumber: 13, titleEn: 'Respiration and Gas Exchange', titleUr: 'سانس اور گیسوں کا تبادلہ', keyConcepts: ['Respiratory surfaces in animals', 'Human respiratory mechanisms', 'Transport of oxygen and carbon dioxide in blood', 'Regulation of breathing'] },
      { unitNumber: 14, titleEn: 'Excretion and Osmoregulation', titleUr: 'اخراج اور اوسمو ریگولیشن', keyConcepts: ['Nitrogenous wastes in animals', 'Comparative excretory systems (Planaria, Earthworm, Cockroach)', 'Human kidney structure and counter-current multiplier', 'Kidney function hormones (ADH, Aldosterone)'] }
    ]
  },
  {
    grade: '11th',
    subject: 'Computer Science',
    subjectUrdu: 'کمپیوٹر سائنس (گیارہویں جماعت / سال اول)',
    chapters: [
      { unitNumber: 1, titleEn: 'Basics of Information Technology', titleUr: 'انفارمیشن ٹیکنالوجی کی بنیادیں', keyConcepts: ['Data vs Information', 'Hardware and Software components', 'Input and Output devices', 'System units and storage'] },
      { unitNumber: 2, titleEn: 'Information Networks', titleUr: 'انفارمیشن نیٹ ورکس', keyConcepts: ['LAN, WAN, MAN networks', 'Network topologies (Star, Bus, Ring, Mesh)', 'OSI 7 Layer Reference Model', 'Client-Server and P2P models'] },
      { unitNumber: 3, titleEn: 'Data Communications', titleUr: 'ڈیٹا مواصلات', keyConcepts: ['Data transmission modes (Simplex, Half duplex, Full duplex)', 'Transmission media (Guided vs Unguided)', 'Modulation and multiplexing'] },
      { unitNumber: 4, titleEn: 'Applications and Uses of Computers', titleUr: 'کمپیوٹر کا مختلف شعبوں میں استعمال', keyConcepts: ['Computers in business and e-commerce', 'Computers in education and medicine', 'Computer-aided design (CAD) and manufacturing (CAM)'] },
      { unitNumber: 5, titleEn: 'Computer Architecture', titleUr: 'کمپیوٹر آرکیٹیکچر', keyConcepts: ['CPU architecture (ALU, CU, Registers)', 'System bus (Data bus, Address bus, Control bus)', 'RAM, ROM and Cache memory', 'Instruction fetch-execute cycle', 'Interrupts'] },
      { unitNumber: 6, titleEn: 'Security, Copyright and the Law', titleUr: 'سیکیورٹی اور کمپیوٹر قوانین', keyConcepts: ['Viruses, worms, trojans and ransomware', 'Data protection and antivirus', 'Intellectual property and copyright acts', 'Data privacy and cybercrime'] },
      { unitNumber: 7, titleEn: 'Windows Operating System', titleUr: 'آپریٹنگ سسٹم کے بنیادی اصول', keyConcepts: ['Functions of operating system', 'Process management and memory management', 'GUI vs CLI', 'File management in Windows'] },
      { unitNumber: 8, titleEn: 'Word Processing (MS Word)', titleUr: 'ورڈ پروسیسنگ', keyConcepts: ['Text editing and formatting', 'Tables and headers/footers', 'Mail merge and print configuration'] },
      { unitNumber: 9, titleEn: 'Spreadsheets (MS Excel)', titleUr: 'اسپریڈ شیٹس (ایم ایس ایکسل)', keyConcepts: ['Formulas and functions (SUM, AVERAGE, IF)', 'Charts and graphs', 'Cell referencing (Relative vs Absolute)'] },
      { unitNumber: 10, titleEn: 'Fundamentals of the Internet', titleUr: 'انٹرنیٹ کے بنیادی تصورات', keyConcepts: ['Internet history and protocols (HTTP, FTP, SMTP, DNS)', 'Web browsers and search engines', 'Email and web security basics'] }
    ]
  },
  {
    grade: '11th',
    subject: 'English',
    subjectUrdu: 'انگریزی (گیارہویں جماعت / سال اول)',
    chapters: [
      { unitNumber: 1, titleEn: 'Button, Button (Short Story)', titleUr: 'بٹن بٹن (رچرڈ میتھیسن)', keyConcepts: ['Norma and Arthur moral dilemma', 'Greed vs human empathy', 'Theme and irony'] },
      { unitNumber: 2, titleEn: 'Clearing in the Sky', titleUr: 'آسمان میں کھیت', keyConcepts: ['Father resilience against heart disease', 'Farming the steep mountain top', 'Love for nature and nostalgia'] },
      { unitNumber: 3, titleEn: 'Dark they were, and Golden-Eyed', titleUr: 'وہ سیاہ فام اور سنہری آنکھوں والے تھے', keyConcepts: ['Mars colonization', 'Subtle alien transformation', 'Science fiction imagery'] },
      { unitNumber: 4, titleEn: 'Thank You, M’am', titleUr: 'شکریہ میڈم (لینگسٹن ہیوز)', keyConcepts: ['Mrs. Jones kindness to young thief Roger', 'Dignity, trust and reform', 'Compassion'] },
      { unitNumber: 5, titleEn: 'The Piece of String', titleUr: 'رسی کا ٹکڑا (گی ڈی موپاساں)', keyConcepts: ['False accusation against Maitre Hauchecorne', 'Destructive power of gossip and prejudice', 'Tragic irony'] },
      { unitNumber: 6, titleEn: 'The Reward', titleUr: 'انعام (لارڈ ڈنسانی)', keyConcepts: ['Jorkens determination story of Gorgios', 'Court acrobat ambition', 'Perseverance triumphs'] },
      { unitNumber: 7, titleEn: 'The Use of Force', titleUr: 'طاقت کا استعمال (ولیم کارلوس ولیمز)', keyConcepts: ['Doctor vs diphtheria patient girl', 'Professional ethics vs dark fury', 'Psychological conflict'] },
      { unitNumber: 8, titleEn: 'The Gulistan of Sa’di', titleUr: 'گلستان سعدی کے حکایات', keyConcepts: ['Parables of Sheikh Saadi', 'Ruler justice, patience and wisdom of life'] },
      { unitNumber: 9, titleEn: 'The Foolish Quack', titleUr: 'احمق نیم حکیم', keyConcepts: ['Camel throat cure imitation disaster', 'Folly of pretension without knowledge'] },
      { unitNumber: 10, titleEn: 'A Mild Attack of Locusts', titleUr: 'ٹڈی دل کا ہلکا حملہ (ڈورس لیسنگ)', keyConcepts: ['African farm fight against locust swarm', 'Resilience of farmers against natural disasters'] },
      { unitNumber: 11, titleEn: 'I Have a Dream', titleUr: 'میرا ایک خواب ہے (مارٹن لوتھر کنگ)', keyConcepts: ['Civil rights movement speech', 'Equality, racial brotherhood and freedom', 'Rhetorical devices'] },
      { unitNumber: 12, titleEn: 'The Gift of the Magi', titleUr: 'مجوسیوں کا تحفہ (او ہینری)', keyConcepts: ['Della and Jim Christmas gifts', 'Sacrifice of hair and watch', 'True meaning of sacrificial love'] },
      { unitNumber: 13, titleEn: 'God be Praised', titleUr: 'شکر خدا کا (مولوی ابوالبرکات)', keyConcepts: ['Maulvi Abul family struggles', 'Honor, daughters marriage and societal reality'] },
      { unitNumber: 14, titleEn: 'Overcoat', titleUr: 'اوور کوٹ (غلام عباس خلاصہ)', keyConcepts: ['Young man walking in Lahore mall road', 'Appearance vs reality of poverty', 'Sudden accident tragedy'] },
      { unitNumber: 15, titleEn: 'The Angel and the Author', titleUr: 'فرشتہ اور مصنف (جیروم کے جیروم)', keyConcepts: ['Good deeds ledger', 'Inner sincerity vs boastful charity'] }
    ]
  },
  {
    grade: '11th',
    subject: 'Urdu',
    subjectUrdu: 'اردو لازمی (گیارہویں جماعت / سال اول)',
    chapters: [
      { unitNumber: 1, titleEn: 'Uswa-e-Hasana (S.A.W)', titleUr: 'اسوہ حسنہ صلی اللہ علیہ وسلم (سید سلیمان ندوی)', keyConcepts: ['سیرت کی عالمگیریت، رحمت للعالمین، ہر طبقہ زندگی کے لیے کامل رہنمائی'] },
      { unitNumber: 2, titleEn: 'Apni Madad Aap', titleUr: 'اپنی مدد آپ (سر سید احمد خان)', keyConcepts: ['خود انحصاری، قومی ترقی کا راز، سستی اور نقالی کی مذمت'] },
      { unitNumber: 3, titleEn: 'Sir Syed ke Akhlaq-o-Khasail', titleUr: 'سر سید کے اخلاق و خصائل (مولانا الطاف حسین حالی)', keyConcepts: ['سر سید کی عالی ظرفی، قومی دردمندی، انتھک محنت'] },
      { unitNumber: 4, titleEn: 'Umeed ki Khushi', titleUr: 'امید کی خوشی (سر سید احمد خان)', keyConcepts: ['امید کی طاقت، انسان کی بقا اور رجائیت پسندی'] },
      { unitNumber: 5, titleEn: 'Adib ki Izzat', titleUr: 'ادیب کی عزت (منشی پریم چند)', keyConcepts: ['معاشرے میں ادیب کا مقام، غربت اور قلم کی خودداری'] },
      { unitNumber: 6, titleEn: 'Ovar Coat', titleUr: 'اوور کوٹ (غلام عباس)', keyConcepts: ['لاہور کی مال روڈ، بیرونی چمک دمک اور اندرونی عسرت'] },
      { unitNumber: 7, titleEn: 'Safarish', titleUr: 'سفارش (احمد ندیم قاسمی)', keyConcepts: ['سفارشی کلچر، دیہی ملازم کا دکھ، انسانی بے حسی'] },
      { unitNumber: 8, titleEn: 'Hamd (Nazam) - Khwaja Mir Dard', titleUr: 'حمد: جگ میں آ کر ادھر ادھر دیکھا (خواجہ میر درد)', keyConcepts: ['تصوف، حقیقت مطلقہ کا ادراک، معرفت الٰہی'] },
      { unitNumber: 9, titleEn: 'Naat (Nazam) - Mohsin Kakorwi', titleUr: 'نعت: سمت کاشی سے چلا جانب متھرا بادل', keyConcepts: ['رسول اکرم صلی اللہ علیہ وسلم کی آمد کی برکات، خوبصورت تمثیل'] },
      { unitNumber: 10, titleEn: 'Nazam - Hilal-e-Istaqlal', titleUr: 'ہلال استقلال (حفیظ جالندھری)', keyConcepts: ['شہر لاہور کے مجاہدین کا پرچم، 1965 کی جنگ کی شجاعت'] },
      { unitNumber: 11, titleEn: 'Ghazal - Khwaja Haider Ali Aatish', titleUr: 'غزل: یہ آرزو تھی تجھے گل کے روبرو کرتے', keyConcepts: ['لکھنوی دبستان، زبان کی مٹھاس، تشبیہات و استعارات'] },
      { unitNumber: 12, titleEn: 'Rudad Nawisi, Roznamcha aur Khatoot', titleUr: 'روداد نویسی، روزنامچہ، مکالمے اور خطوط', keyConcepts: ['ادبی و دفتری مراسلت، روداد نگاری کے فنی تقاضے'] }
    ]
  },
  {
    grade: '11th',
    subject: 'Islamic Studies',
    subjectUrdu: 'اسلامی تعلیم لازمی (سال اول)',
    chapters: [
      { unitNumber: 1, titleEn: 'Aqaid-e-Islam (Tauheed, Risalat, Akhirat)', titleUr: 'عقائد اسلام (توحید، رسالت اور آخرت)', keyConcepts: ['عقیدہ توحید کے تقاضے، ختم نبوت کا قرآنی و حدیثی ثبوت، عقیدہ آخرت کا انسانی کردار پر اثر'] },
      { unitNumber: 2, titleEn: 'Ibadat-e-Islamia (Namaz, Roza, Zakat, Hajj)', titleUr: 'عبادات اسلامیہ (نماز، روزہ، زکوٰۃ، حج)', keyConcepts: ['عبادات کے انفرادی و اجتماعی فوائد، تقویٰ کا حصول، اسلامی اخوت'] },
      { unitNumber: 3, titleEn: 'Uswa-e-Rasool (S.A.W) aur Khidmat-e-Khalq', titleUr: 'اسوہ رسول صلی اللہ علیہ وسلم اور خدمت خلق', keyConcepts: ['سیرت نبوی کے عملی درخشاں پہلو، عدل و انصاف، حقوق العباد'] },
      { unitNumber: 4, titleEn: 'Taaruf-e-Quran aur Ahadith-e-Nabviya', titleUr: 'تعارف قرآن اور منتخب احادیث نبویہ', keyConcepts: ['قرآن مجید کے خصوصیات و فضائل، منتخب 20 احادیث کا ترجمہ و تشریح'] }
    ]
  },

  // =========================================================================
  // 12TH CLASS (2ND YEAR / FSC / ICS PART 2)
  // =========================================================================
  {
    grade: '12th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی (بارہویں جماعت / سال دوم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Functions and Limits', titleUr: 'تفاعل اور حدود', keyConcepts: ['Domain and range of functions', 'Types of functions (Even, Odd, Composite, Inverse)', 'Evaluation of limits and algebraic techniques', 'Theorems on limits lim (x^n-a^n)/(x-a) & lim (sin θ/θ)', 'Continuity of functions'] },
      { unitNumber: 2, titleEn: 'Differentiation', titleUr: 'تفریق (مشتق)', keyConcepts: ['Derivative from first principles', 'Power rule, product rule, quotient rule', 'Chain rule and implicit differentiation', 'Derivatives of trigonometric, inverse trigonometric, exponential & log functions', 'Higher order derivatives', 'Maclaurin and Taylor Series', 'Maxima and Minima'] },
      { unitNumber: 3, titleEn: 'Integration', titleUr: 'انٹیگریشن', keyConcepts: ['Indefinite integrals and standard formulas', 'Integration by substitution', 'Integration by parts', 'Integration using partial fractions', 'Definite integrals and Fundamental Theorem of Calculus', 'Area between curve and x-axis', 'Differential equations of first order'] },
      { unitNumber: 4, titleEn: 'Introduction to Analytic Geometry', titleUr: 'تجزیاتی جیومیٹری کا تعارف', keyConcepts: ['Distance between two points and ratio formula', 'Slope/Gradient of a line', 'Equations of straight lines (Point-slope, Two-point, Slope-intercept, Intercept form)', 'Distance of a point from a line', 'Angle between two lines', 'Homogeneous equation of second degree'] },
      { unitNumber: 5, titleEn: 'Linear Inequalities and Linear Programming', titleUr: 'یک درجی غیر مساواتیں اور لینیئر پروگرامنگ', keyConcepts: ['Graphing linear inequalities in two variables', 'Feasible region and feasible solutions', 'Corner point method of optimizing objective functions'] },
      { unitNumber: 6, titleEn: 'Conic Sections', titleUr: 'مخروطی تراشے (کونک سیکشنز)', keyConcepts: ['Circle equation, tangent and normal', 'Parabola definition, standard form, focus, directrix & vertex', 'Ellipse definition, standard form, eccentricity & foci', 'Hyperbola definition, standard form & asymptotes'] },
      { unitNumber: 7, titleEn: 'Vectors', titleUr: 'ویکٹرز', keyConcepts: ['Vectors in 2D and 3D', 'Dot product and angle between vectors', 'Cross product and area of triangle/parallelogram', 'Scalar triple product and volume of parallelepiped', 'Vector triple product'] }
    ]
  },
  {
    grade: '12th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات (بارہویں جماعت / سال دوم)',
    chapters: [
      { unitNumber: 12, titleEn: 'Electrostatics', titleUr: 'الیکٹرو سٹیٹکس', keyConcepts: ['Coulomb Law in vector form', 'Electric field lines and intensity', 'Gauss Law and applications (Charged sphere, infinite sheet, two oppositely charged plates)', 'Electric potential and potential gradient', 'Capacitors, capacitance with dielectric & energy stored'] },
      { unitNumber: 13, titleEn: 'Current Electricity', titleUr: 'برقی رو', keyConcepts: ['Ohm Law and microscopic model of conduction', 'Temperature coefficient of resistance', 'Electromotive force (EMF) vs Terminal Potential Difference', 'Kirchhoff Rules (KCL & KVL)', 'Wheatstone Bridge and Potentiometer'] },
      { unitNumber: 14, titleEn: 'Electromagnetism', titleUr: 'الیکٹرو میگنیٹزم', keyConcepts: ['Magnetic field of a current-carrying wire', 'Force on moving charge in magnetic field (Lorentz force)', 'Charge to mass ratio (e/m) of an electron', 'Ampere Law and magnetic field of solenoid', 'Torque on a current loop and Galvanometer'] },
      { unitNumber: 15, titleEn: 'Electromagnetic Induction', titleUr: 'الیکٹرو میگنیٹک انڈکشن', keyConcepts: ['Induced EMF and Faraday Law', 'Lenz Law and direction of induced current', 'Motional EMF derivation', 'Mutual and Self-induction', 'Alternating Current Generator', 'Transformers efficiency and energy losses'] },
      { unitNumber: 16, titleEn: 'Alternating Current', titleUr: 'الٹرنیٹنگ کرنٹ', keyConcepts: ['AC sinusoidal waveform and RMS values', 'AC through resistor, capacitor and inductor', 'Impedance and phase lead/lag', 'RLC series and parallel resonance circuits', 'Electromagnetic wave generation'] },
      { unitNumber: 17, titleEn: 'Physics of Solids', titleUr: 'ٹھوس اشیاء کی طبیعیات', keyConcepts: ['Crystalline, amorphous and polymeric solids', 'Mechanical properties of solids (Stress, Strain, Modulus of elasticity)', 'Strain energy in deformed materials', 'Energy band theory (Conductors, Insulators, Semiconductors)', 'Superconductivity'] },
      { unitNumber: 18, titleEn: 'Electronics', titleUr: 'الیکٹرانکس', keyConcepts: ['p-n junction diode forward and reverse bias', 'Half wave and Full wave bridge rectification', 'Special diodes (LED, Photodiode, Solar cell)', 'Bipolar Junction Transistor (BJT) as an amplifier', 'Operational Amplifier (Inverting, Non-inverting, Comparator)'] },
      { unitNumber: 19, titleEn: 'Dawn of Modern Physics', titleUr: 'جدید طبیعیات کا آغاز', keyConcepts: ['Special Theory of Relativity postulates', 'Blackbody radiation and Planck radiation law', 'Photoelectric effect and Einstein equation', 'Compton effect and pair production', 'De Broglie hypothesis and electron microscope', 'Heisenberg Uncertainty Principle'] },
      { unitNumber: 20, titleEn: 'Atomic Spectra', titleUr: 'ایٹمی طیف', keyConcepts: ['Bohr Postulates for hydrogen atom', 'Hydrogen energy levels and spectral series (Lyman, Balmer, Paschen)', 'Inner shell transitions and characteristic X-rays', 'Laser fundamentals (Spontaneous & Stimulated emission, Population inversion)'] },
      { unitNumber: 21, titleEn: 'Nuclear Physics', titleUr: 'نیوکلیائی طبیعیات', keyConcepts: ['Atomic nucleus composition and mass defect', 'Binding energy per nucleon curve', 'Natural radioactivity (Alpha, Beta, Gamma emission)', 'Half-life and law of radioactive decay', 'Nuclear Fission and Nuclear Fusion in stars', 'Radiation detectors (Geiger-Muller tube, Solid state detector)'] }
    ]
  },
  {
    grade: '12th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری (بارہویں جماعت / سال دوم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Periodic Classification of Elements and Periodicity', titleUr: 'عناصر کی دوری درجہ بندی اور پیریوڈیسٹی', keyConcepts: ['Modern periodic table layout', 'Periodic trends in physical properties (Atomic size, IP, EA, EN)', 'Periodic trends in chemical properties (Hydrides, Halides, Oxides)'] },
      { unitNumber: 2, titleEn: 's-Block Elements (Alkali & Alkaline Earth Metals)', titleUr: 'ایس بلاک عناصر (الکلی اور الکلائن ارتھ میٹلز)', keyConcepts: ['Electronic configurations and flame colors', 'Peculiar behavior of Lithium and Beryllium', 'Commercial preparation of Sodium by Down Cell', 'Commercial preparation of NaOH by Nelson Cell', 'Role of Gypsum and Plaster of Paris'] },
      { unitNumber: 3, titleEn: 'Group IIIA and Group IVA Elements', titleUr: 'گروپ IIIA اور IVA کے عناصر', keyConcepts: ['Boron chemistry, Borax and Borax Bead Test', 'Boric acid properties', 'Aluminum extraction and Thermite process', 'Silicones, Silicates and Lead pigments'] },
      { unitNumber: 4, titleEn: 'Group VA and Group VIA Elements', titleUr: 'گروپ VA اور VIA کے عناصر', keyConcepts: ['Nitrogen oxides and oxyacids (HNO3 preparation by Birkeland-Eyde / Ostwald)', 'Phosphorus allotropes and P2O5', 'Sulfur allotropes and H2SO4 manufacturing by Contact Process'] },
      { unitNumber: 5, titleEn: 'The Halogens and the Noble Gases', titleUr: 'ہالوجنز اور نوبل گیسیں', keyConcepts: ['Electronic configurations and oxidizing power of halogens', 'Hydrohalic acids and bleaching powder', 'Noble gases discovery, properties and compounds of Xenon'] },
      { unitNumber: 6, titleEn: 'Transition Elements (d-Block Elements)', titleUr: 'ٹرانزیشن عناصر (ڈی بلاک)', keyConcepts: ['General characteristics of transition metals', 'Complex compounds naming and coordination number', 'Chelates and magnetic behavior', 'Manufacture of wrought iron and steel (Bessemer Converter)'] },
      { unitNumber: 7, titleEn: 'Fundamental Principles of Organic Chemistry', titleUr: 'نامیاتی کیمیا کے بنیادی اصول', keyConcepts: ['Vital force theory rejection by Wohler', 'Classification and homologous series', 'Isomerism (Structural and Cis-Trans Stereoisomerism)', 'Hybridization in carbon compounds'] },
      { unitNumber: 8, titleEn: 'Aliphatic Hydrocarbons', titleUr: 'ایلیفیٹک ہائیڈرو کاربنز (الکین، الکین، الکائن)', keyConcepts: ['Nomenclature (IUPAC rules)', 'Alkanes Kolbe electrolytic method & free radical chlorination', 'Alkenes dehydration of alcohols & addition reactions (Markovnikov Rule)', 'Alkynes acidity and ozonolysis'] },
      { unitNumber: 9, titleEn: 'Aromatic Hydrocarbons (Benzene)', titleUr: 'ایرومیٹک ہائیڈرو کاربنز (بینزین)', keyConcepts: ['Kekule structure and resonance theory of benzene', 'Aromaticity and stability of benzene ring', 'Electrophilic aromatic substitution (Nitration, Sulfonation, Halogenation, Friedel-Crafts)', 'Orientation in benzene (Ortho/Para vs Meta directing groups)'] },
      { unitNumber: 10, titleEn: 'Alkyl Halides and Organometallic Compounds', titleUr: 'الکائل ہیلائیڈز', keyConcepts: ['Classification (Primary, Secondary, Tertiary)', 'Nucleophilic Substitution Reactions (SN1 and SN2 mechanisms)', 'Elimination reactions (E1 and E2 mechanisms)', 'Grignard Reagents (RMgX) preparation and synthetic applications'] },
      { unitNumber: 11, titleEn: 'Alcohols, Phenols and Ethers', titleUr: 'الکوحل، فینول اور ایتھرز', keyConcepts: ['Industrial preparation of methanol and ethanol', 'Lucas test for distinguishing alcohols', 'Acidity of phenol vs alcohols', 'Reactions of phenol (Bakelite polymer formation)', 'Williamson ether synthesis'] },
      { unitNumber: 12, titleEn: 'Aldehydes and Ketones', titleUr: 'ایلڈیہائیڈز اور کیٹونز', keyConcepts: ['Preparation methods from alcohols', 'Nucleophilic addition reactions (HCN, NaHSO3, Grignard)', 'Aldol Condensation and Cannizzaro Reaction', 'Tests for aldehydes (Tollens test, Fehling solution, Benedict test)'] },
      { unitNumber: 13, titleEn: 'Carboxylic Acids and their Derivatives', titleUr: 'کاربوکسائلک ایسڈز', keyConcepts: ['Nomenclature and physical properties of carboxylic acids', 'Preparation and acidity', 'Derivatives: Acid halides, Acid anhydrides, Esters, Amides'] },
      { unitNumber: 14, titleEn: 'Macromolecules (Polymers)', titleUr: 'میکرو مالیکیولز (پولیمرز)', keyConcepts: ['Addition polymers (Polyethylene, PVC, Polystyrene)', 'Condensation polymers (Nylon 6,6, Terylene)', 'Carbohydrates and Proteins classification', 'Lipids and saponification of fats'] },
      { unitNumber: 15, titleEn: 'Common Chemical Industries in Pakistan', titleUr: 'پاکستان کی کیمیائی صنعتیں', keyConcepts: ['Fertilizers industry (Urea manufacturing)', 'Cement industry manufacturing process', 'Paper pulp industry raw materials and processing'] },
      { unitNumber: 16, titleEn: 'Environmental Chemistry', titleUr: 'ماحولیاتی کیمیا', keyConcepts: ['Components of environment', 'Water quality criteria (BOD, COD)', 'Industrial wastewater treatment', 'Air pollution control and catalytic converters', 'Solid waste management'] }
    ]
  },
  {
    grade: '12th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات (بارہویں جماعت / سال دوم)',
    chapters: [
      { unitNumber: 15, titleEn: 'Homeostasis', titleUr: 'ہومیوسٹیسس', keyConcepts: ['Osmoregulation in freshwater, marine & terrestrial animals', 'Excretion in plants and animals', 'Human urinary system and nephron physiology', 'Thermoregulation in endotherms and ectotherms'] },
      { unitNumber: 16, titleEn: 'Support and Movement', titleUr: 'سہارا اور حرکت', keyConcepts: ['Support in plants (Turgor pressure, Collenchyma, Sclerenchyma)', 'Human axial and appendicular skeleton', 'Joints types and sliding filament model of muscle contraction', 'Locomotion in protozoa, fish, birds, mammals'] },
      { unitNumber: 17, titleEn: 'Coordination and Control', titleUr: 'کوآرڈینیشن اور کنٹرول', keyConcepts: ['Plant movements (Tropic and Nastic) and plant hormones (Auxins, Gibberellins, Cytokinins)', 'Nerve impulse generation (Resting and Action potential)', 'Human brain and peripheral nervous system', 'Endocrine feedback loops'] },
      { unitNumber: 18, titleEn: 'Reproduction', titleUr: 'تولید', keyConcepts: ['Asexual vs sexual reproduction mechanisms', 'Photoperiodism and vernalization in plants', 'Human male and female reproductive systems', 'Menstrual cycle and hormonal regulation', 'Sexually transmitted diseases'] },
      { unitNumber: 19, titleEn: 'Growth and Development', titleUr: 'نشوونما اور بالیدگی', keyConcepts: ['Plant development (Apical meristem, Cambium)', 'Development of chick embryo (Cleavage, Morula, Blastula, Gastrula)', 'Neurulation and embryonic induction (Spemann organizer)', 'Aging, regeneration and abnormal development'] },
      { unitNumber: 20, titleEn: 'Chromosomes and DNA', titleUr: 'کروموسومز اور ڈی این اے', keyConcepts: ['Chromosome ultrastructure (Nucleosomes, Histones)', 'Hershey-Chase experiment proving DNA as genetic material', 'DNA replication semi-conservative mechanism (Meselson-Stahl)', 'Transcription and translation (Genetic code, tRNA, Ribosomes)'] },
      { unitNumber: 21, titleEn: 'Cell Cycle', titleUr: 'خلیاتی چکر', keyConcepts: ['Interphase checkpoints (G1, S, G2)', 'Mitosis and mitotic apparatus', 'Meiosis and genetic recombination', 'Non-disjunction (Down, Turner, Klinefelter syndromes)', 'Cancer and uncontrolled cell division'] },
      { unitNumber: 22, titleEn: 'Variation and Genetics', titleUr: 'تغیرات اور جینیٹکس', keyConcepts: ['Gene pool and allele frequencies', 'Mendel Laws and test cross', 'Multiple alleles (ABO blood groups)', 'Epistasis and polygenic inheritance', 'Sex-linked inheritance in Drosophila and humans (Hemophilia, Color blindness)'] },
      { unitNumber: 23, titleEn: 'Biotechnology', titleUr: 'بائیو ٹیکنالوجی', keyConcepts: ['Recombinant DNA technology (Restriction enzymes, Vectors, Plasmids)', 'Polymerase Chain Reaction (PCR)', 'Gel Electrophoresis and DNA fingerprinting', 'Transgenic plants and animals', 'Human Genome Project and Gene therapy'] },
      { unitNumber: 24, titleEn: 'Evolution', titleUr: 'ارتقاء', keyConcepts: ['Creationism vs Evolution', 'Lamarckism vs Darwinism', 'Evidences of evolution (Homologous organs, Vestigial structures, Molecular clock)', 'Hardy-Weinberg Principle and factors upsetting equilibrium'] },
      { unitNumber: 25, titleEn: 'Ecosystem', titleUr: 'ایکو سسٹم', keyConcepts: ['Ecosystem structure and trophic levels', 'Ecological pyramids (Numbers, Biomass, Energy)', 'Ecological succession (Hydrosere, Xerosere)', 'Biogeochemical cycles (Carbon, Nitrogen)'] },
      { unitNumber: 26, titleEn: 'Some Major Ecosystems', titleUr: 'بڑے ایکو سسٹمز', keyConcepts: ['Aquatic ecosystems (Freshwater, Marine, Estuaries)', 'Terrestrial biomes (Tundra, Taiga, Temperate deciduous, Grasslands, Deserts, Tropical rainforests)'] },
      { unitNumber: 27, titleEn: 'Man and His Environment', titleUr: 'انسان اور اس کا ماحول', keyConcepts: ['Renewable and non-renewable energy resources', 'Degradation of environment (Deforestation, Desertification)', 'Pollution types (Air, Water, Land) and acid rain', 'Conservation of biodiversity and wildlife in Pakistan'] }
    ]
  },
  {
    grade: '12th',
    subject: 'Computer Science',
    subjectUrdu: 'کمپیوٹر سائنس (بارہویں جماعت / سال دوم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Data Basics', titleUr: 'ڈیٹا بیس کے بنیادی اصول', keyConcepts: ['Traditional file-oriented system vs Database management system (DBMS)', 'Fields, records and files', 'Database system components'] },
      { unitNumber: 2, titleEn: 'Basic Concepts and Terminology of Databases', titleUr: 'ڈیٹا بیس کے بنیادی تصورات', keyConcepts: ['Entities, attributes and relationships', 'Keys (Primary key, Candidate key, Foreign key)', 'Relational database model'] },
      { unitNumber: 3, titleEn: 'Data Integrity and Normalization', titleUr: 'ڈیٹا نارملائزیشن', keyConcepts: ['Database anomalies (Insertion, Deletion, Update)', 'First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)'] },
      { unitNumber: 4, titleEn: 'Introduction to Microsoft Access', titleUr: 'مائیکروسافٹ ایکسیس کا تعارف', keyConcepts: ['MS Access IDE and tables design view', 'Data types in Access', 'Queries, forms and reports design'] },
      { unitNumber: 5, titleEn: 'Getting Started with C', titleUr: 'سی لینگویج کا آغاز', keyConcepts: ['History and features of C', 'C preprocessor directives (#include, #define)', 'Compiling, linking and executing C programs'] },
      { unitNumber: 6, titleEn: 'Elements of C', titleUr: 'سی لینگویج کے عناصر', keyConcepts: ['Keywords, identifiers and constants', 'Data types (int, float, char, double)', 'Variables declaration and scope', 'Operators (Arithmetic, Relational, Logical, Assignment, Bitwise)'] },
      { unitNumber: 7, titleEn: 'Input and Output in C', titleUr: 'سی لینگویج میں ان پٹ اور آؤٹ پٹ', keyConcepts: ['printf() with field width and flags', 'scanf() and address-of operator (&)', 'getch(), getche(), getchar(), putchar()'] },
      { unitNumber: 8, titleEn: 'Decision Constructs in C', titleUr: 'ڈیسیژن کنسٹرکٹس (کنٹرول اسٹرکچر)', keyConcepts: ['if, if-else, nested if-else statements', 'Conditional operator (?:)', 'switch statement and break keyword'] },
      { unitNumber: 9, titleEn: 'Loop Constructs in C', titleUr: 'لوپ کنسٹرکٹس', keyConcepts: ['while loop and condition check', 'do-while loop (post-test loop)', 'for loop syntax and execution order', 'Nested loops', 'break and continue statements'] },
      { unitNumber: 10, titleEn: 'Functions, Pointers and File Handling in C', titleUr: 'فنکشنز، پوائنٹرز اور فائل ہینڈلنگ', keyConcepts: ['Functions with parameters and return values', 'Pointers basics and dereference operator (*)', 'Opening, reading, writing and closing sequential files'] }
    ]
  },
  {
    grade: '12th',
    subject: 'Pakistan Studies',
    subjectUrdu: 'مطالعہ پاکستان (بارہویں جماعت / سال دوم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Islam and Pakistan', titleUr: 'اسلام اور پاکستان', keyConcepts: ['Significance of Islamic ideology', 'Sovereignty of Allah in Pakistani constitution', 'Promotion of Islamic way of life'] },
      { unitNumber: 2, titleEn: 'Political and Constitutional Development in Pakistan', titleUr: 'پاکستان میں آئینی اور سیاسی ارتقاء', keyConcepts: ['1973 Constitution fundamental rights and principles of policy', 'Islamic provisions of 1973 Constitution', 'Structure of parliament and federal government'] },
      { unitNumber: 3, titleEn: 'Administrative Structure and Good Governance', titleUr: 'انتظامی ڈھانچہ اور گڈ گورننس', keyConcepts: ['Federal, provincial and local government tiers', 'Role of bureaucracy and judiciary', 'Transparency and anti-corruption institutions'] },
      { unitNumber: 4, titleEn: 'Human Rights in Pakistan', titleUr: 'پاکستان میں انسانی حقوق', keyConcepts: ['Human rights in Islam (Khutba Hajjat-ul-Wida)', 'UN Universal Declaration of Human Rights', 'Constitutional safeguards for women and minorities'] },
      { unitNumber: 5, titleEn: 'Direction of Pakistan Foreign Policy', titleUr: 'پاکستان کی خارجہ پالیسی کے خدوخال', keyConcepts: ['Pakistan geo-strategic importance', 'Relations with brotherly Islamic states and SAARC', 'Nuclear non-proliferation and peace role'] },
      { unitNumber: 6, titleEn: 'Economic Challenges and Self-Reliance', titleUr: 'معاشی چیلنجز اور خود انحصاری', keyConcepts: ['Debt crisis and revenue collection', 'Industrial growth and SME promotion', 'Sustainable development goals (SDGs)'] }
    ]
  },
  {
    grade: '12th',
    subject: 'English',
    subjectUrdu: 'انگریزی (بارہویں جماعت / سال دوم)',
    chapters: [
      { unitNumber: 1, titleEn: 'The Dying Sun (Sir James Jeans)', titleUr: 'مرتا ہوا سورج (سر جیمز جینز)', keyConcepts: ['Immensity of universe, rare planetary collision, origin of life on Earth'] },
      { unitNumber: 2, titleEn: 'Using the Scientific Method', titleUr: 'سائنسی طریقہ کار کا استعمال', keyConcepts: ['Better control of disease, sanitation, food preservation and critical thinking'] },
      { unitNumber: 3, titleEn: 'Why Boys Fail in College', titleUr: 'طلباء کالج میں کیوں ناکام ہوتے ہیں', keyConcepts: ['Nervous habits, wrong career choice by parents, health issues, financial strain'] },
      { unitNumber: 4, titleEn: 'End of Term (David Daiches)', titleUr: 'تعلیمی سیشن کا اختتام', keyConcepts: ['School routine nostalgia, weekend anticipation, summer holiday ecstasy'] },
      { unitNumber: 5, titleEn: 'On Destroying Books (J.C. Squire)', titleUr: 'کتابوں کو تلف کرنا', keyConcepts: ['Problem of unwanted books, nocturnal midnight walk to river Thames, moral comedy'] },
      { unitNumber: 6, titleEn: 'The Man Who Was a Hospital (Jerome K. Jerome)', titleUr: 'وہ آدمی جو پورا ہسپتال تھا', keyConcepts: ['Medical dictionary hypochondria, humorous self-diagnosis of all ailments except housemaid knee'] },
      { unitNumber: 7, titleEn: 'My Financial Career (Stephen Leacock)', titleUr: 'میرا مالیاتی کیریئر', keyConcepts: ['Bank anxiety, intimidation by accountant and manager, deposit and immediate withdrawal comedy'] },
      { unitNumber: 8, titleEn: 'China’s Way to Progress', titleUr: 'چین کی ترقی کا راستہ', keyConcepts: ['Post-1949 Chinese social discipline, barefoot doctors, agriculture and self-reliance'] },
      { unitNumber: 9, titleEn: 'Hunger and Population Explosion', titleUr: 'بھوک اور آبادی کا دھماکہ', keyConcepts: ['Global famine history, unequal wealth distribution, birth control necessity'] },
      { unitNumber: 10, titleEn: 'The Jewel of the World (Moorish Spain)', titleUr: 'دنیا کا ہیرا (مسلم اندلس)', keyConcepts: ['Abdur Rahman I founding of Umayyad Caliphate in Cordoba, golden era of sciences and architecture'] },
      { unitNumber: 11, titleEn: 'First Year at Harrow (Winston Churchill)', titleUr: 'ہیرو میں پہلا سال (ونسٹن چرچل)', keyConcepts: ['Latin vs English exam struggles, Mr. Somervell English teaching mastery'] },
      { unitNumber: 12, titleEn: 'Good-bye, Mr. Chips (Novel by James Hilton)', titleUr: 'گڈ بائی مسٹر چپس (ناول خلاصہ)', keyConcepts: ['Brookfield School master Arthur Chipping, marriage to Katherine Bridges, World War I memories'] }
    ]
  },
  {
    grade: '12th',
    subject: 'Urdu',
    subjectUrdu: 'اردو لازمی (بارہویں جماعت / سال دوم)',
    chapters: [
      { unitNumber: 1, titleEn: 'Munafaqat aur Akhlaq', titleUr: 'منافقت اور اخلاق (ڈاکٹر سید عبداللہ)', keyConcepts: ['دوغلا پن، اسلامی تہذیب کی سادگی، اجتماعی منافقت کا علاج'] },
      { unitNumber: 2, titleEn: 'Hali ke Qalmi Khakay', titleUr: 'حالی کے قلمی خاکے (ڈاکٹر فرمان فتح پوری)', keyConcepts: ['غالب اور سر سید کے خاکے، سوانحی سچائی، بے باک اسلوب'] },
      { unitNumber: 3, titleEn: 'Khatoot-e-Ghalib', titleUr: 'خطوط غالب (مرزا اسد اللہ خان غالب)', keyConcepts: ['غالب کی مراسلہ نگاری، نواب ہرگوپال تفتہ اور میر مہدی مجروح کے نام خطوط'] },
      { unitNumber: 4, titleEn: 'Khatoot-e-Iqbal', titleUr: 'خطوط اقبال (علامہ محمد اقبال)', keyConcepts: ['اقبال کا فکری انداز، فلسفہ خودی کی وضاحت'] },
      { unitNumber: 5, titleEn: 'Qurtaba ka Qazi', titleUr: 'قرطبہ کا قاضی (سید امتیاز علی تاج)', keyConcepts: ['یک بابی المیہ ڈرامہ، عدل و انصاف بمقابلہ پدری محبت'] },
      { unitNumber: 6, titleEn: 'Ayyub Abbasi', titleUr: 'ایوب عباسی (رشید احمد صدیقی)', keyConcepts: ['خاکہ نگاری، علی گڑھ تحریک کا عکس، مروت و اخلاص'] },
      { unitNumber: 7, titleEn: 'Hamd (Nazam) - Zafar Ali Khan', titleUr: 'حمد: پہنچتا ہے ہر اک مے کش کے آگے دور جام اس کا (مولانا ظفر علی خان)', keyConcepts: ['شکوہ و جلال، ربوبیت کا پھیلاؤ، سحر البیان'] },
      { unitNumber: 8, titleEn: 'Naat (Nazam) - Hafeez Jalandhari', titleUr: 'نعت: سلام اس پر کہ جس نے بے کسوں کی دستگیری کی', keyConcepts: ['حضور کی رحمتیں، مظلوموں کی دستگیری، مساوات کا اعلان'] },
      { unitNumber: 9, titleEn: 'Nazam - Khitab ba Jawanan-e-Islam', titleUr: 'خطاب بہ جوانان اسلام (علامہ محمد اقبال)', keyConcepts: ['کبھی اے نوجواں مسلم تدبر بھی کیا تو نے، خودی، شاہین کی پرواز'] },
      { unitNumber: 10, titleEn: 'Ghazal - Khwaja Mir Dard', titleUr: 'غزل: تہمتی چند اپنے ذمے دھر چلے', keyConcepts: ['صوفیانہ سوز و گداز، فنا و بقا'] },
      { unitNumber: 11, titleEn: 'Ghazal - Nasir Kazmi', titleUr: 'غزل: دل میں اک لہر سی اٹھی ہے ابھی', keyConcepts: ['جدید غزل کا مزاج، تنہائی، ناسٹلجیا'] },
      { unitNumber: 12, titleEn: 'Murasila Nigari aur Mazmoon', titleUr: 'مراسلہ نگاری، اخباری کالم اور ادبی مضامین', keyConcepts: ['کالم نگاری کے اسلوب، عصری مسائل پر مضامین'] }
    ]
  }
];

export function getTextbookChapters(grade: string, subject: string): TextbookChapterIndex | undefined {
  const gNorm = grade.toLowerCase().replace(/th$/, '').replace(/st$/, '').replace(/nd$/, '');
  const sNorm = subject.toLowerCase().trim();

  return TEXTBOOK_CHAPTERS_CATALOG.find((cat) => {
    const cGrade = cat.grade.toLowerCase().replace(/th$/, '').replace(/st$/, '').replace(/nd$/, '');
    const cSub = cat.subject.toLowerCase().trim();
    return cGrade === gNorm && (cSub === sNorm || cSub.includes(sNorm) || sNorm.includes(cSub));
  });
}
