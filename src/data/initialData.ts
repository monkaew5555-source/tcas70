import { UserProfile, TaskItem, VocabCard, QuizQuestion, PortfolioProject, InterviewQuestion, UniversityTarget } from '../types';

export const COMPANION_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBUF6gzLvDUp06Am0J5GZvrfLYajSHOaKUX7fhWeUgNlhqeXnowaGuGEoTGj7yApnjJE-As0v231PRT4Ii7v00ZN0qwW3y_QwUZz4E3NlV9FLbUJgqazxxRLhAGH-ulvDM_DWo0siCkEBRFP10vZsTC_hG-iEzEho_OociwtnDOIrs1sfJB1JZgQBt99NMFK8JWtnkDCEu5iZpAzX2gRv686p4ECCiEnDZwPnLs5zdmqNsOVWC1r6NTLPbpWC8ZXWFNe2k";
export const STUDENT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuB7yOpUyc74IhpAqyZsW7oEfpyWlabfGHHHiZ5neGkuNtAFNwAb7pls6M7w5oxz2Z1ZOZ_s4YzJm1_2Y9jy6g-vIKnHsw1RK1WzMFPAiuAiSD9gGXyVkAuTGeEmSrKcuPIVe4ciVN7OIXiZx7Dbwcy0TDsPKGVnpxsNar0OvkZfijKfa3j2hONejB1a9gbkjia10qTYvU73u6Sro9pwFRGKPa9Xvd-gtflTuJZTgFFe6mY8GAjkQQ1QdKMVhd3iyCsEZfk";

export const initialUser: UserProfile = {
  id: 'user-01',
  name: 'มิว (นักเรียน ม.6)',
  email: 'mew.tcas70@gmail.com',
  school: 'โรงเรียนขอนแก่นวิทยายน (แผนภาษา-เทคโนโลยีสร้างสรรค์)',
  educationPlan: 'สายศิลป์-ภาษา (เทคโนโลยีสื่อ)',
  gpax: 3.42,
  targetUniversity: 'มหาวิทยาลัยขอนแก่น (KKUIC)',
  targetFaculty: 'วิทยาลัยนานาชาติ',
  targetProgram: 'สาขาวิชาเทคโนโลยีสื่อสร้างสรรค์ (Creative Media Technology)',
  targetRound: 'รอบ 1 Portfolio',
  avatarUrl: STUDENT_AVATAR,
  energyMode: 'normal',
  streakDays: 7,
  exp: 3450,
  level: 14,
  theme: 'sweet-sky',
  focusDuration: 45,
  dndNight: true,
  googleSynced: true,
  registeredAt: '2026-09-01'
};

export const initialTasks: TaskItem[] = [
  {
    id: 't-1',
    title: 'ตรวจทาน Portfolio 10 หน้า ตาม Requirement KKUIC',
    description: 'เช็คความถูกต้องของไฟล์ PDF และการจัดระเบียบหน้าผลงานออกแบบกราฟิก 5 ชิ้น ให้ตรงสเปก < 10MB',
    category: 'พอร์ตโฟลิโอ',
    priority: 'high',
    status: 'completed',
    estimatedMinutes: 30,
    timeSpentMinutes: 28,
    deadline: '18:00 น.'
  },
  {
    id: 't-2',
    title: 'ร่างบทแนะนำตัวภาษาอังกฤษ 2 นาที สำหรับการสัมภาษณ์รอบ Portfolio',
    description: 'เน้นแนะนำ Passion ด้านการสื่อสารนานาชาติ และเหตุผลเจาะจงว่าทำไมถึงเลือกหลักสูตร KKUIC Creative Media',
    category: 'ภาษาอังกฤษ',
    priority: 'high',
    status: 'in-progress',
    estimatedMinutes: 25,
    deadline: '21:00 น.'
  },
  {
    id: 't-3',
    title: 'ฝึกทำข้อสอบ TGAT 1 การสื่อสารภาษาอังกฤษ พาร์ต Vocabulary 20 ข้อ',
    description: 'โฟกัสคำศัพท์ Context Clues และเฉลยจุดที่ทำผิดลงสมุด Vocabulary Log',
    category: 'ข้อสอบ TGAT',
    priority: 'medium',
    status: 'pending',
    estimatedMinutes: 20
  },
  {
    id: 't-4',
    title: 'ดาวน์โหลดและตรวจสอบเกณฑ์ TCAS70 ฉบับร่างของ KKUIC',
    description: 'ตรวจสอบคะแนนสอบภาษาอังกฤษขั้นต่ำ (IELTS / TOEFL / Duolingo / KKU-AEP)',
    category: 'มหาวิทยาลัย',
    priority: 'medium',
    status: 'pending',
    estimatedMinutes: 10
  },
  {
    id: 't-5',
    title: 'รวบรวมไฟล์ผลงานกราฟิกและ UI 5 ชิ้นใส่คลาวด์ไดรฟ์',
    description: 'เตรียมลิงก์แชร์และรูปภาพความละเอียดสูงสำหรับจัดเลย์เอาต์หน้า 7',
    category: 'พอร์ตโฟลิโอ',
    priority: 'low',
    status: 'completed',
    estimatedMinutes: 30,
    timeSpentMinutes: 30
  }
];

export const initialVocabCards: VocabCard[] = [
  {
    id: 'v-1',
    word: 'Perspective',
    phonetic: '/pəˈspek.tɪv/',
    partOfSpeech: 'noun / countable',
    difficulty: 'B2 - C1 (TGAT 1 & KKUIC Academic)',
    category: 'Media & Critical Thinking',
    meaningTh: 'มุมมอง, ทัศนคติ, แง่คิดในการมองประเด็น',
    synonyms: ['viewpoint', 'outlook', 'standpoint', 'angle'],
    exampleEn: 'Documentary filmmaking challenges directors to capture complex social phenomena from multiple diverse perspectives.',
    exampleTh: 'การสร้างภาพยนตร์สารคดีท้าทายให้ผู้กำกับต้องบันทึกปรากฏการณ์ทางสังคมที่ซับซ้อนผ่านมุมมองที่หลากหลาย',
    contextTag: 'Creative Media Context',
    reviewBox: 4
  },
  {
    id: 'v-2',
    word: 'Aesthetic',
    phonetic: '/esˈθet.ɪk/',
    partOfSpeech: 'adjective / noun',
    difficulty: 'B2 (Design & Visual Arts)',
    category: 'Visual & Media Design',
    meaningTh: 'เกี่ยวกับความงาม, สุนทรียภาพ, สไตล์ทางศิลปะ',
    synonyms: ['artistic', 'tasteful', 'visual appeal'],
    exampleEn: 'The film adopts a pastel cyberpunk aesthetic to evoke a nostalgic yet futuristic sensation.',
    exampleTh: 'ภาพยนตร์ใช้สุนทรียภาพแบบไซเบอร์พังก์โทนพาสเทลเพื่อปลุกเร้าความรู้สึกที่ชวนคิดถึงอดีตทว่าล้ำยุค',
    contextTag: 'Design & Visual Arts',
    reviewBox: 3
  },
  {
    id: 'v-3',
    word: 'Narrative',
    phonetic: '/ˈnær.ə.tɪv/',
    partOfSpeech: 'noun',
    difficulty: 'B2 (Storytelling & Media)',
    category: 'Creative Storytelling',
    meaningTh: 'การเล่าเรื่อง, โครงเรื่อง, เรื่องเล่า',
    synonyms: ['story', 'chronicle', 'tale', 'plot'],
    exampleEn: 'A compelling visual narrative engages the audience through emotional resonance rather than dialogue alone.',
    exampleTh: 'การเล่าเรื่องผ่านภาพที่ตรึงใจจะดึงดูดผู้ชมด้วยคลื่นอารมณ์มากกว่าการพึ่งพาเพียงบทสนทนา',
    contextTag: 'Creative Storytelling',
    reviewBox: 3
  },
  {
    id: 'v-4',
    word: 'Coherent',
    phonetic: '/kəʊˈhɪə.rənt/',
    partOfSpeech: 'adjective',
    difficulty: 'B2 - C1 (Academic Writing)',
    category: 'Communication',
    meaningTh: 'เชื่อมโยงกันอย่างสมเหตุสมผล, สอดคล้อง, เข้าใจง่าย',
    synonyms: ['consistent', 'logical', 'lucid', 'rational'],
    exampleEn: 'Her portfolio presented a coherent artistic vision across all graphic and video works.',
    exampleTh: 'แฟ้มผลงานของเธอนำเสนอวิสัยทัศน์ทางศิลปะที่เชื่อมโยงกลมกลืนกันในทุกชิ้นงานกราฟิกและวิดีโอ',
    contextTag: 'Portfolio Review',
    reviewBox: 2
  },
  {
    id: 'v-5',
    word: 'Ambivalent',
    phonetic: '/æmˈbɪv.ə.lənt/',
    partOfSpeech: 'adjective',
    difficulty: 'C1 (TGAT 1 Inference)',
    category: 'Psychology & Tone',
    meaningTh: 'มีความรู้สึกสองจิตสองใจ, ลังเล, ขัดแย้งในความรู้สึก',
    synonyms: ['conflicted', 'indecisive', 'uncertain'],
    exampleEn: 'The author was ambivalent about the impact of generative AI on creative industries.',
    exampleTh: 'ผู้เขียนมีความรู้สึกก้ำกึ่งสองจิตสองใจต่อผลกระทบของเจเนอเรทีฟเอไอในอุตสาหกรรมสร้างสรรค์',
    contextTag: 'Reading Comprehension',
    reviewBox: 1
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'Vocabulary in Context',
    difficulty: 'ปานกลาง (Medium)',
    questionText: 'The director wanted an actor with a truly _______ voice that could capture the solemn emotion of the historical monologue.',
    thaiTranslation: 'ผู้กำกับต้องการนักแสดงที่มีน้ำเสียง... อย่างแท้จริง ซึ่งสามารถถ่ายทอดอารมณ์อันสุขุมสงบของบทพูดคนเดียวเชิงประวัติศาสตร์ได้',
    options: [
      { key: 'A', text: 'ambitious', subText: 'ทะเยอทะยาน / เกินตัว' },
      { key: 'B', text: 'resonant', subText: 'ดังกังวาน / กึกก้องลึกซึ้ง' },
      { key: 'C', text: 'frugal', subText: 'ประหยัด / มัธยัสถ์' },
      { key: 'D', text: 'negligible', subText: 'เล็กน้อย / ไม่สำคัญพอจะใส่ใจ' }
    ],
    correctAnswer: 'B',
    explanation: 'คำว่า "resonant" หมายถึง เสียงที่ดังก้องกังวานและสะท้อนอารมณ์ได้ลึกซึ้ง เข้ากับบริบท solemn emotion ของบทโมโนล็อกที่สุด',
    hint: 'สังเกตคำว่า voice และ capture the solemn emotion'
  },
  {
    id: 2,
    category: 'Creative Media Context',
    difficulty: 'ปานกลาง (Medium)',
    questionText: 'The committee agreed that the proposed budget was overly _______; however, the creative team insisted that high-quality digital media production justifies the investment.',
    thaiTranslation: 'คณะกรรมการเห็นพ้องว่าข้อเสนองบประมาณนั้น... จนเกินไป; อย่างไรก็ตาม ทีมสร้างสรรค์ยืนกรานว่าการผลิตสื่อดิจิทัลคุณภาพสูงคู่ควรกับการลงทุนดังกล่าว',
    options: [
      { key: 'A', text: 'ambitious', subText: 'ทะเยอทะยาน / เกินตัว' },
      { key: 'B', text: 'extravagant', subText: 'ฟุ่มเฟือย / สิ้นเปลืองเกินจำเป็น' },
      { key: 'C', text: 'frugal', subText: 'ประหยัด / มัธยัสถ์' },
      { key: 'D', text: 'negligible', subText: 'เล็กน้อย / ไม่สำคัญพอจะใส่ใจ' }
    ],
    correctAnswer: 'B',
    explanation: 'คำว่า "extravagant" แปลว่าฟุ่มเฟือยหรือใช้จ่ายเกินสมควร ซึ่งขัดแย้งกับข้อแก้ต่างของทีมงานหลังคำว่า "however"',
    hint: 'ข้อนี้วัดเรื่อง Context Clue สังเกตคำว่า however ให้ดีนะ 🩵'
  },
  {
    id: 3,
    category: 'Collocation & Expression',
    difficulty: 'ง่าย (Easy)',
    questionText: 'High production standards ultimately _______ the substantial financial investment required for professional animation equipment.',
    thaiTranslation: 'มาตรฐานการผลิตระดับสูงช่วย... การลงทุนทางการเงินจำนวนมากที่จำเป็นสำหรับอุปกรณ์แอนิเมชันระดับมืออาชีพ',
    options: [
      { key: 'A', text: 'justify', subText: 'แสดงเหตุผลสนับสนุน / พิสูจน์ว่าคุ้มค่า' },
      { key: 'B', text: 'condemn', subText: 'ประณาม / ตำหนิ' },
      { key: 'C', text: 'evaporate', subText: 'ระเหย / สูญสิ้น' },
      { key: 'D', text: 'postpone', subText: 'เลื่อนเวลาออกไป' }
    ],
    correctAnswer: 'A',
    explanation: '"justify the investment" เป็น Collocation ยอดนิยม แปลว่า พิสูจน์ให้เห็นว่าการลงทุนนั้นคุ้มค่าและมีเหตุผลรองรับ',
    hint: 'คำคู่กับ investment ที่แปลว่าคุ้มค่า'
  },
  {
    id: 4,
    category: 'Idioms & Everyday Speech',
    difficulty: 'ยาก (Hard)',
    questionText: 'Before pitching her 2-minute personal statement to the KKUIC interviewers, Mew’s mentor told her to "_______" and believe in her preparation.',
    thaiTranslation: 'ก่อนการนำเสนอบทแนะนำตัว 2 นาทีต่อหน้าคณะกรรมการสัมภาษณ์ KKUIC รุ่นพี่ของมิวบอกเธอว่าให้... และเชื่อมั่นในการซ้อมของตัวเอง',
    options: [
      { key: 'A', text: 'bite the bullet', subText: 'กัดฟันกลืนความลำบาก' },
      { key: 'B', text: 'break a leg', subText: 'ขอให้โชคดีในการแสดง/พรีเซนต์' },
      { key: 'C', text: 'burn the bridges', subText: 'ตัดทางถอย / ตัดขาดความสัมพันธ์' },
      { key: 'D', text: 'bark up the wrong tree', subText: 'เข้าใจผิดทิศทาง' }
    ],
    correctAnswer: 'B',
    explanation: '"Break a leg" เป็นสำนวนให้กำลังใจที่ใช้ในวงการศิลปะการแสดงและการสัมภาษณ์ แปลว่า ขอให้โชคดีและทำได้ยอดเยี่ยม!',
    hint: 'สำนวนที่นิยมใช้อวยพรคนก่อนขึ้นเวทีหรือพรีเซนต์'
  },
  {
    id: 5,
    category: 'Grammar & Sentence Completion',
    difficulty: 'ปานกลาง (Medium)',
    questionText: 'The team encountered technical difficulties during live streaming; _______, the audience praised the content for its compelling visual effects.',
    thaiTranslation: 'ทีมงานประสบปัญหาทางเทคนิคระหว่างการสตรีมสด... ผู้ชมยังคงชื่นชมเนื้อหาเนื่องจากมีวิชวลเอฟเฟกต์ที่น่าประทับใจ',
    options: [
      { key: 'A', text: 'nevertheless', subText: 'แต่อย่างไรก็ตาม (แสดงความขัดแย้ง)' },
      { key: 'B', text: 'therefore', subText: 'ดังนั้น (แสดงผลลัพธ์)' },
      { key: 'C', text: 'furthermore', subText: 'ยิ่งไปกว่านั้น (เสริมข้อมูล)' },
      { key: 'D', text: 'similarly', subText: 'ในทำนองเดียวกัน' }
    ],
    correctAnswer: 'A',
    explanation: '"nevertheless" ใช้เชื่อมประโยคที่ขัดแย้งกัน แม้จะเจอปัญหาทางเทคนิค แต่ผู้ชมก็ยังประทับใจในงานเอฟเฟกต์',
    hint: 'เชื่อมโยง 2 ประโยคที่ขัดแย้งกันอย่างมีวุฒิภาวะ'
  }
];

export const samplePortfolioTemplates: PortfolioProject[] = [
  {
    id: 'p-1',
    pageSlots: 'หน้าที่ 3 - 4',
    title: 'Short Film: The Silent Echo',
    category: 'หนังสั้น / วิดีโอบรรยาย',
    role: 'ผู้กำกับ, เขียนบท และตัดต่อ',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'EN Script Included'],
    description: 'ภาพยนตร์สั้น 7 นาที สะท้อนปัญหาสุขภาพจิตวัยรุ่น ผ่านเทคนิคภาพโทนหม่นและการใช้เสียงเงียบ (Silent Design)',
    status: 'พร้อมใส่ Portfolio'
  },
  {
    id: 'p-2',
    pageSlots: 'หน้าที่ 5',
    title: 'Motion Graphic: Cyber Safety for Youth',
    category: 'แอนิเมชัน 2D',
    badge: '★ ชนะเลิศระดับจังหวัด',
    role: 'Illustrator & Motion Animator',
    tools: ['Adobe Illustrator', 'After Effects', 'Audition'],
    description: 'สื่อโมชันกราฟิกอินโฟกราฟิกความยาว 90 วินาที รณรงค์ความปลอดภัยทางไซเบอร์ ย่อยเรื่อง PDPA ให้เข้าใจง่าย',
    status: 'พร้อมใส่ Portfolio'
  },
  {
    id: 'p-3',
    pageSlots: 'หน้าที่ 6',
    title: 'TikTok Campaign: เล่าวิทย์ให้ติดเทรนด์',
    category: 'Social Media Content',
    badge: '185K Views ⚡',
    role: 'Content Creator & Video Editor',
    tools: ['CapCut Pro', 'Figma', 'Audience Retention Strategy'],
    description: 'ซีรีส์วิดีโอ 3 ตอน สรุปฟิสิกส์ในชีวิตประจำวัน พร้อมเคสศึกษาสถิติ Audience Retention & การทดสอบ 3-Second Hook',
    status: 'พร้อมใส่ Portfolio'
  },
  {
    id: 'p-4',
    pageSlots: 'หน้าที่ 7',
    title: 'Poster & Visual Identity: ค่ายเปิดบ้านนิเทศศิลป์',
    category: 'การออกแบบกราฟิก',
    role: 'Lead Graphic Designer',
    tools: ['Illustrator', 'Photoshop', 'Typography Design'],
    description: 'ออกแบบโปสเตอร์หลัก ป้ายไวนิล และกราฟิกโปรโมตกิจกรรม Open House โรงเรียน เน้น Mood & Tone ทันสมัย',
    status: 'กำลังตัดต่อ / ผลิต',
    statusDetail: 'กำลังตรวจไฟล์สี CMYK'
  },
  {
    id: 'p-5',
    pageSlots: 'หน้าที่ 8',
    title: 'Photo Series: เงียบสงบในเมืองขอนแก่น',
    category: 'ภาพถ่ายสารคดี',
    role: 'Street Photographer & Color Grader',
    tools: ['Sony A6400', 'Lightroom Classic', 'Visual Storytelling'],
    description: 'ชุดภาพถ่ายสตรีท 6 รูป เล่าเรื่องชีวิตชุมชนริมบึงแก่นนครช่วงรุ่งเช้า โทนแสงอบอุ่น สื่อถึงความผูกพันและวัฒนธรรมอีสาน',
    status: 'พร้อมใส่ Portfolio'
  },
  {
    id: 'p-6',
    pageSlots: 'หน้าที่ 9 - 10',
    title: 'English Personal Statement Video (2 Mins)',
    category: 'คลิปแนะนำตัวภาษาอังกฤษ',
    role: 'Presenter & Editor (100% English)',
    tools: ['Teleprompter', 'Premiere Pro', 'IELTS Target 6.5'],
    description: 'วิดีโอ Pitching ภาษาอังกฤษ 2 นาที เล่า Passion ด้าน Creative Media เหตุผลที่เลือก KKUIC และแผนโครงงานในอนาคต',
    status: 'กำลังตัดต่อ / ผลิต',
    statusDetail: 'กำลังอัดเสียงใหม่ / ซ้อมสคริปต์'
  }
];

// Clean empty slate for new users - start fresh
export const initialProjects: PortfolioProject[] = [];

export const initialInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'iq-1',
    number: 'Q1',
    questionEn: 'Tell me about yourself and why you chose Creative Media Technology at KKUIC?',
    contextTh: 'แนะนำตัวเองในฐานะนักสร้างคอนเทนต์ยุคใหม่ เชื่อมโยงความชอบด้านภาพยนตร์สั้น/3D และเหตุผลเฉพาะเจาะจงว่าหลักสูตร KKUIC มี Lab และบรรยากาศนานาชาติที่ตอบโจทย์เป้าหมายในชีวิต',
    category: 'Self & Passion',
    timeLimit: '2 นาที',
    status: 'ซ้อมคล่องแล้ว',
    scriptHook: 'Hello, my name is Mew. Since high school, I’ve been fascinated by how visual storytelling can bridge cultures...',
    scriptBody: 'I spent the last 2 years learning Blender and Premiere Pro. KKUIC’s CMT program is my top choice because of its cutting-edge production labs and international community.',
    keywords: ['Visual storytelling', 'Digital media', 'Cross-cultural', 'Cutting-edge lab'],
    practiceCount: 8,
    lastScore: 88
  },
  {
    id: 'iq-2',
    number: 'Q2',
    questionEn: 'Walk us through your favorite project in your portfolio. What was your biggest challenge?',
    contextTh: 'โปรเจกต์ที่เลือก: หนังสั้น "The Silent Echo" อธิบายปัญหาเสียงลมในกองถ่ายและการแก้ปัญหาด้วย Audio Scrubbing & Foley Art',
    category: 'Portfolio Deep-Dive',
    timeLimit: '2 นาที',
    status: 'ซ้อมคล่องแล้ว',
    scriptHook: 'In my short documentary "The Silent Echo", we faced sudden rain and heavy wind that degraded live audio...',
    scriptBody: 'Instead of panicking, I recorded ambient foley sounds inside a studio room and synced ADR, turning a potential disaster into an intimate atmospheric soundscape.',
    keywords: ['Problem-solving', 'Audio design', 'Foley art', 'Adaptability'],
    practiceCount: 6,
    lastScore: 85
  },
  {
    id: 'iq-3',
    number: 'Q3',
    questionEn: 'How do you handle creative burnout or conflict in team productions?',
    contextTh: 'แนวทางตอบ: แยกเรื่องงานออกจากอารมณ์ ใช้หลักการ Active Listening และตั้งเป้าหมายส่วนรวมของโปรดักชันเป็นที่ตั้ง',
    category: 'Situational & Teamwork',
    timeLimit: '1.5 นาที',
    status: 'กำลังฝึกตอบ',
    scriptHook: 'When conflicts occur, I believe empathy and open communication are fundamental...',
    scriptBody: 'During our school festival teaser, we had differing visions on the art direction. We held a structured voting session and combined elements into a cohesive moodboard.',
    keywords: ['Empathy', 'Open communication', 'Shared vision', 'Creative compromise'],
    practiceCount: 4,
    lastScore: 78
  },
  {
    id: 'iq-4',
    number: 'Q4',
    questionEn: 'Where do you see yourself in the digital media industry in the next 5 years?',
    contextTh: 'เป้าหมายอาชีพ: มุ่งสู่การเป็น Interactive Technical Director หรือ XR Storyteller ที่ผสมผสานงานศิลปะและเทคโนโลยี AI สื่อสตรีมมิ่งระดับสากล',
    category: 'Future Goals & Vision',
    timeLimit: '2 นาที',
    status: 'ร่างสคริปต์แล้ว',
    scriptHook: 'In five years, I envision myself as a digital media director specializing in interactive virtual production...',
    scriptBody: 'Graduating from KKUIC will equip me with the technical rigor and global mindset to lead cross-border digital campaigns in Southeast Asia.',
    keywords: ['Virtual production', 'Global mindset', 'Creative director', 'Industry impact'],
    practiceCount: 2,
    lastScore: 72
  }
];

export const initialUniversities: UniversityTarget[] = [
  {
    id: 'u-1',
    rank: 1,
    name: 'มหาวิทยาลัยขอนแก่น (KKUIC)',
    faculty: 'วิทยาลัยนานาชาติ',
    program: 'สาขาวิชาเทคโนโลยีสื่อสร้างสรรค์ (Creative Media Technology - B.A.)',
    code: 'KKU-INTL-042',
    round: 'รอบ 1 Portfolio',
    seats: 35,
    applicantRatio: '1:4 (สถิติปีก่อน)',
    gpaxRequired: 2.75,
    readinessPercentage: 82,
    chance: 'สูงมาก',
    highlights: [
      'การผลิตสื่อนานาชาติ & แอนิเมชัน: เน้น 2D/3D Animation, VFX, Digital Film และ Virtual Production',
      'ภาษาอังกฤษ 100%: จัดการเรียนการสอนโดยคณาจารย์ผู้เชี่ยวชาญจากอุตสาหกรรมสื่อนานาชาติ',
      'แล็บคอมพิวเตอร์มาตรฐานสากล: สตูดิโอบันทึกเสียง, ห้องตัดต่อ และอุปกรณ์กล้อง Cinema ระดับมืออาชีพ',
      'เครือข่ายแลกเปลี่ยนต่างประเทศ: โอกาสศึกษาแลกเปลี่ยน 1-2 ภาคการศึกษาในญี่ปุ่น เกาหลีใต้ ยุโรป'
    ],
    criteria: [
      { name: '1. ผลการเรียนสะสม (GPAX 5 ภาคเรียน)', weight: 'คุณสมบัติขั้นต่ำ 2.75', currentScore: '3.42 (ผ่าน)', status: 'ผ่านเกณฑ์ปลอดภัย' },
      { name: '2. แฟ้มสะสมผลงาน (Portfolio 10 หน้า)', weight: '40% ของคะแนนรวม', currentScore: 'เสร็จแล้ว 8/10 หน้า', status: 'พร้อมยื่น' },
      { name: '3. ทักษะภาษาอังกฤษ (TGAT 1)', weight: '20% (ขั้นต่ำ 60 คะแนน)', currentScore: '78 / 100 (ซ้อมล่าสุด)', status: 'ผ่านเกินเกณฑ์' },
      { name: '4. การสอบสัมภาษณ์ภาษาอังกฤษ 100%', weight: '40% ของคะแนนรวม', currentScore: 'ประเมินซ้อม 78%', status: 'พร้อมในเกณฑ์ดี' }
    ]
  },
  {
    id: 'u-2',
    rank: 2,
    name: 'มหาวิทยาลัยเชียงใหม่ (CMU)',
    faculty: 'คณะการสื่อสารมวลชน',
    program: 'สาขาวิชาภาพยนตร์และสื่อดิจิทัล (Digital Film & Media)',
    code: 'CMU-MASS-018',
    round: 'รอบ 1 Portfolio',
    seats: 25,
    applicantRatio: '1:6',
    gpaxRequired: 2.50,
    readinessPercentage: 75,
    chance: 'สูงมาก',
    highlights: [
      'เน้นการเขียนบทและกำกับภาพยนตร์อิสระในภูมิภาคภาคเหนือ',
      'มีศูนย์ปฏิบัติการด้านเสียงและสตูภาพยนตร์ขนาดใหญ่',
      'ใช้คะแนน Portfolio 50% + GPAX'
    ],
    criteria: [
      { name: 'GPAX ขั้นต่ำ 2.50', weight: 'ขั้นต่ำ', currentScore: '3.42 (ผ่าน)', status: 'ผ่านเกณฑ์ปลอดภัย' },
      { name: 'Portfolio สื่อสร้างสรรค์', weight: '50%', currentScore: 'พร้อมนำไปปรับใช้ 75%', status: 'พร้อมยื่น' }
    ]
  },
  {
    id: 'u-3',
    rank: 3,
    name: 'มหาวิทยาลัยศรีนครินทรวิโรฒ (SWU)',
    faculty: 'วิทยาลัยนวัตกรรมสื่อสารสังคม (COSCI)',
    program: 'สาขาวิชาภาพยนตร์และสื่อดิจิทัล (เอกการผลิตภาพยนตร์)',
    code: 'SWU-COSCI-003',
    round: 'รอบ 2 โควตา / สอบ',
    seats: 40,
    applicantRatio: '1:12',
    gpaxRequired: 2.75,
    readinessPercentage: 70,
    chance: 'ท้าทาย',
    highlights: [
      'พันธมิตรอุตสาหกรรมบันเทิงและภาพยนตร์ในกรุงเทพฯ สูงมาก',
      'ข้อสอบเฉพาะ COSCI เน้นการวิเคราะห์ภาพยนตร์และตรรกะความคิดสร้างสรรค์',
      'ใช้ TGAT 1-2-3 (50%) + วิชาเฉพาะ'
    ],
    criteria: [
      { name: 'คะแนน TGAT 1-2-3 รวม', weight: '50%', currentScore: '71.4% (เฉลี่ยซ้อม)', status: 'ผ่านเกินเกณฑ์' },
      { name: 'ข้อสอบเฉพาะ COSCI', weight: '50%', currentScore: 'กำลังเตรียมตัว', status: 'พร้อมยื่น' }
    ]
  }
];
