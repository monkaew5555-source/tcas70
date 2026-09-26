export interface ExamQuestion67 {
  id: number;
  subjectCode: string;
  subjectName: string;
  category: string;
  yearLabel: string; // e.g. "(ข้อสอบชุด ปี 67)"
  difficulty: 'easy' | 'medium' | 'hard';
  difficultyLabel: 'ง่าย' | 'ปานกลาง' | 'ท้าทาย';
  questionText: string;
  contextText?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    subText?: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  hint: string;
}

export const examDatabase67: ExamQuestion67[] = [
  // ==================== TPAT 1: ความถนัดทางแพทยศาสตร์ (กสพท) ปี 67 ====================
  {
    id: 1,
    subjectCode: 'TPAT1',
    subjectName: 'TPAT 1 ความถนัดทางแพทยศาสตร์',
    category: 'จริยธรรมทางการแพทย์',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'ผู้ป่วยวัยรุ่นอายุ 17 ปี มาพบแพทย์เพื่อขอตรวจการตั้งครรภ์และขอคำปรึกษา โดยขอร้องแพทย์เด็ดขาดว่าห้ามบอกผู้ปกครองเพราะกลัวถูกทำโทษ ในฐานะแพทย์ ข้อใดเป็นการปฏิบัติตามหลักจริยธรรมทางการแพทย์ที่เหมาะสมที่สุด?',
    options: [
      { key: 'A', text: 'ปฏิเสธการตรวจจนกว่าผู้ปกครองจะมารับรองความยินยอม' },
      { key: 'B', text: 'ตรวจรักษาและเก็บข้อมูลเป็นความลับตามสิทธิผู้ป่วย พร้อมประเมินความปลอดภัยและแนะแนวทางสนับสนุนอย่างรอบคอบ' },
      { key: 'C', text: 'โทรศัพท์แจ้งผู้ปกครองทันทีหลังจากผู้ป่วยตรวจเสร็จเพื่อป้องกันปัญหาฟ้องร้อง' },
      { key: 'D', text: 'ให้ผู้ป่วยลงชื่อสละสิทธิ์การรักษาและแนะนำให้ไปสถานพยาบาลเอกชน' }
    ],
    correctAnswer: 'B',
    explanation: 'ตามหลักสิทธิผู้ป่วยและการรักษาความลับ (Confidentiality) ผู้ป่วยอายุ 17 ปีมีความสามารถในการตัดสินใจเบื้องต้นเกี่ยวกับการตรวจสุขภาพ แพทย์ต้องรักษาความลับ ประเมินความเสี่ยงต่อชีวิต และช่วยเหลือสนับสนุน',
    hint: 'พิจารณาหลัก Autonomy (การเคารพการตัดสินใจ) และ Confidentiality (ความลับทางการแพทย์)'
  },
  {
    id: 2,
    subjectCode: 'TPAT1',
    subjectName: 'TPAT 1 ความถนัดทางแพทยศาสตร์',
    category: 'จริยธรรมทางการแพทย์',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'แพทย์ท่านหนึ่งสังเกตเห็นว่าแพทย์รุ่นพี่ที่มีชื่อเสียงในแผนก สั่งจ่ายยานอกบัญชียาหลักที่ราคาสูงโดยไม่มีข้อบ่งชี้ทางคลินิกที่จำเป็นบ่อยครั้ง แพทย์ท่านนี้ควรดำเนินการอย่างไรเป็นลำดับแรก?',
    options: [
      { key: 'A', text: 'โพสต์ลงโซเชียลมีเดียเพื่อสร้างกระแสตรวจสอบความโปร่งใส' },
      { key: 'B', text: 'ปรึกษาแพทย์รุ่นพี่โดยตรงด้วยความเคารพเพื่อขอความรู้และสอบถามข้อบ่งชี้ทางวิชาการ' },
      { key: 'C', text: 'ยื่นคำร้องต่อแพทยสภาทันทีโดยไม่ต้องปรึกษาใคร' },
      { key: 'D', text: 'เพิกเฉยเพราะไม่ใช่หน้าที่ของตนเองและอาจกระทบต่อหน้าที่การงาน' }
    ],
    correctAnswer: 'B',
    explanation: 'การสอบถามข้อมูลทางคลินิกโดยตรงอย่างสุภาพและมีหลักวิชาการ เป็นก้าวแรกในการตรวจสอบข้อเท็จจริงก่อนยกระดับตามกระบวนการองค์กร',
    hint: 'เริ่มจากการสื่อสารเชิงบวกเพื่อแสวงหาข้อเท็จจริงทางคลินิกก่อนเสมอ'
  },
  {
    id: 3,
    subjectCode: 'TPAT1',
    subjectName: 'TPAT 1 ความถนัดทางแพทยศาสตร์',
    category: 'เชาวน์ปัญญาและการคิดวิเคราะห์',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'พิจารณาข้อความ: "หากคนไข้ติดเชื้อไวรัส X คนไข้จะมีไข้สูงและเกล็ดเลือดต่ำเสมอ แต่คนไข้รายนี้ตรวจพบว่าเกล็ดเลือดอยู่ในเกณฑ์ปกติ" ข้อสรุปใดสมเหตุสมผลที่สุดตามหลักตรรกศาสตร์?',
    options: [
      { key: 'A', text: 'คนไข้รายนี้ไม่ได้ติดเชื้อไวรัส X' },
      { key: 'B', text: 'คนไข้รายนี้ไม่มีไข้สูงแน่นอน' },
      { key: 'C', text: 'คนไข้รายนี้ติดเชื้อแบคทีเรียแทน' },
      { key: 'D', text: 'ผลตรวจเลือดอาจผิดพลาด' }
    ],
    correctAnswer: 'A',
    explanation: 'ตาม Modus Tollens: ถ้า P -> (Q and R) แล้ว ~R ย่อมได้ ~P ดังนั้นเมื่อเกล็ดเลือดปกติ ย่อมสรุปได้แน่นอนว่าไม่ได้ติดเชื้อไวรัส X',
    hint: 'ใช้กฎตรรกศาสตร์ Modus Tollens: ถ้า P แล้วเกิด Q และ R เมื่อ R ไม่เกิด P ย่อมไม่เกิด'
  },
  {
    id: 4,
    subjectCode: 'TPAT1',
    subjectName: 'TPAT 1 ความถนัดทางแพทยศาสตร์',
    category: 'การเชื่อมโยงเหตุและผล',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ภาวะโลกร้อน (Global Warming) ส่งผลให้อุณหภูมิน้ำทะเลสูงขึ้น ซึ่งเป็นสาเหตุให้แนวปะการังเกิดการฟอกขาวและสูญเสียความหลากหลายทางชีวภาพ ข้อใดจัดเป็น "ผลกระทบทางอ้อม (Indirect Effect)" ของภาวะโลกร้อน?',
    options: [
      { key: 'A', text: 'อุณหภูมิน้ำทะเลที่สูงขึ้น' },
      { key: 'B', text: 'การละลายของแผ่นน้ำแข็งขั้วโลก' },
      { key: 'C', text: 'การสูญเสียความหลากหลายทางชีวภาพของสิ่งมีชีวิตใต้ทะเล' },
      { key: 'D', text: 'ความเข้มข้นของก๊าซคาร์บอนไดออกไซด์ในชั้นบรรยากาศ' }
    ],
    correctAnswer: 'C',
    explanation: 'การสูญเสียความหลากหลายทางชีวภาพเกิดจากแนวปะการังฟอกขาว ซึ่งเป็นผลพวงต่ออีกชั้นหนึ่ง จึงเป็นผลกระทบทางอ้อม',
    hint: 'วิเคราะห์ลำดับสายเหตุผล: โลกร้อน -> น้ำทะเลอุ่น -> ปะการังฟอกขาว -> สูญเสียความหลากหลาย'
  },
  {
    id: 5,
    subjectCode: 'TPAT1',
    subjectName: 'TPAT 1 ความถนัดทางแพทยศาสตร์',
    category: 'จริยธรรมทางการแพทย์',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'หลักความยุติธรรม (Justice) ในการจัดสรรทรัพยากรทางการแพทย์เมื่อเกิดวิกฤตเตียง ICU ไม่เพียงพอ ควรยึดเกณฑ์ใดเป็นสำคัญที่สุด?',
    options: [
      { key: 'A', text: 'ฐานะทางเศรษฐกิจและความสามารถในการจ่ายค่ารักษา' },
      { key: 'B', text: 'ตำแหน่งทางสังคมและความมีชื่อเสียง' },
      { key: 'C', text: 'เกณฑ์ความเร่งด่วนทางการแพทย์และโอกาสรอดชีวิตตามหลักการคัดแยก (Triage)' },
      { key: 'D', text: 'ความสนิทสนมส่วนตัวกับบุคลากรในโรงพยาบาล' }
    ],
    correctAnswer: 'C',
    explanation: 'หลัก Justice ในทางการแพทย์ต้องอาศัยเกณฑ์การแพทย์ (Medical Indication & Prognosis) โดยปราศจากอคติด้านฐานะหรือสังคม',
    hint: 'ความยุติธรรมทางการแพทย์ต้องยึดประโยชน์สูงสุดของผู้ป่วยและโอกาสรอดชีวิต'
  },

  // ==================== TPAT 2: ความถนัดทางศิลปกรรมศาสตร์ ปี 67 ====================
  {
    id: 6,
    subjectCode: 'TPAT2',
    subjectName: 'TPAT 2 ความถนัดทางศิลปกรรมศาสตร์',
    category: 'ทัศนศิลป์และการออกแบบ',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'คู่สีใดจัดเป็น "สีตรงข้าม (Complementary Colors)" ในวงล้อสีสากล?',
    options: [
      { key: 'A', text: 'สีแดง กับ สีเขียว' },
      { key: 'B', text: 'สีน้ำเงิน กับ สีม่วง' },
      { key: 'C', text: 'สีเหลือง กับ สีส้ม' },
      { key: 'D', text: 'สีเขียว กับ สีน้ำเงิน' }
    ],
    correctAnswer: 'A',
    explanation: 'สีตรงข้าม (Complementary Colors) ในวงล้อสี คือคู่สีที่อยู่ตรงข้ามกัน 180 องศา เช่น แดง-เขียว, เหลือง-ม่วง, น้ำเงิน-ส้ม',
    hint: 'คู่สีที่ตัดกันอย่างรุนแรงและอยู่ตรงข้ามกันในวงล้อสี'
  },
  {
    id: 7,
    subjectCode: 'TPAT2',
    subjectName: 'TPAT 2 ความถนัดทางศิลปกรรมศาสตร์',
    category: 'ทฤษฎีองค์ประกอบศิลป์',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'กฎสามส่วน (Rule of Thirds) ในการจัดองค์ประกอบภาพ ถ่ายภาพ หรือภาพยนตร์ มีวัตถุประสงค์หลักเพื่อสิ่งใด?',
    options: [
      { key: 'A', text: 'ให้วัตถุอยู่กึ่งกลางภาพพอดีเพื่อความสมมาตรแบบเป๊ะ' },
      { key: 'B', text: 'สร้างจุดสนใจ (Focal Point) ที่ดูเป็นธรรมชาติและน่าดึงดูดสายตามากกว่าการวางตรงกลาง' },
      { key: 'C', text: 'ทำให้ภาพมีความสว่างเท่ากันทั้ง 3 ส่วน' },
      { key: 'D', text: 'ลดขนาดไฟล์ภาพลงหนึ่งในสาม' }
    ],
    correctAnswer: 'B',
    explanation: 'กฎสามส่วนแบ่งภาพเป็น 9 ช่อง จุดตัด 4 จุดเรียกว่า Power Points นิยมใช้วางวัตถุเพื่อสร้างความน่าสนใจและพลวัตแก่ภาพ',
    hint: 'จุดตัด 4 จุดช่วยให้สายตามนุษย์มองภาพได้อย่างมีมิติ'
  },
  {
    id: 8,
    subjectCode: 'TPAT2',
    subjectName: 'TPAT 2 ความถนัดทางศิลปกรรมศาสตร์',
    category: 'ดนตรีและการแสดง',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'ในด้านการกำกับและออกแบบเวที (Stagecraft) คำว่า "Proscenium Stage" มีลักษณะเด่นอย่างไร?',
    options: [
      { key: 'A', text: 'เวทีที่ผู้ชมล้อมรอบ 360 องศา (Arena Stage)' },
      { key: 'B', text: 'เวทียื่นออกไปในกลุ่มผู้ชม ผู้ชมนั่งดู 3 ด้าน (Thrust Stage)' },
      { key: 'C', text: 'เวทีที่มีกรอบโค้งหรือกรอบสี่เหลี่ยมคล้ายกรอบรูปกั้นระหว่างเวทีกับผู้ชม' },
      { key: 'D', text: 'เวทีกลางแจ้งที่ไม่มีฉากหลัง' }
    ],
    correctAnswer: 'C',
    explanation: 'Proscenium Stage คือโรงละครแบบกรอบภาพ (Picture Frame Stage) มีผนังและกรอบ Proscenium Arch แบ่งแยกเวทีและที่นั่งผู้ชมชัดเจน',
    hint: 'นึกถึงโรงละครที่มีม่านเปิดปิดและมีกรอบเวทีด้านหน้า'
  },
  {
    id: 9,
    subjectCode: 'TPAT2',
    subjectName: 'TPAT 2 ความถนัดทางศิลปกรรมศาสตร์',
    category: 'การสื่อสารทางสายตา (Visual Storytelling)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ในการตัดต่อวิดีโอ การใช้เทคนิค "J-Cut" หมายถึงลักษณะใด?',
    options: [
      { key: 'A', text: 'ภาพตัดไปก่อน แล้วเสียงของช็อตถัดไปค่อยตามมา' },
      { key: 'B', text: 'เสียงของช็อตถัดไปดังขึ้นมาก่อนที่ภาพจะตัดเปลี่ยน' },
      { key: 'C', text: 'การตัดภาพแบบกระตุก (Jump Cut)' },
      { key: 'D', text: 'การหมุนกล้องเป็นรูปตัว J' }
    ],
    correctAnswer: 'B',
    explanation: 'J-Cut (Audio Lead) คือเทคนิคที่เสียงของฉากถัดไปเริ่มเข้ามาก่อนที่ภาพของฉากใหม่จะปรากฏขึ้น ทำให้รอยต่อดูลื่นไหล',
    hint: 'เสียงมาก่อนภาพ คล้ายหางตัว J ที่ยื่นไปข้างหน้า'
  },
  {
    id: 10,
    subjectCode: 'TPAT2',
    subjectName: 'TPAT 2 ความถนัดทางศิลปกรรมศาสตร์',
    category: 'ประวัติศาสตร์ศิลป์',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'ศิลปิน Vincent van Gogh เป็นตัวแทนคนสำคัญของกระแสศิลปะรูปแบบใด?',
    options: [
      { key: 'A', text: 'Post-Impressionism (โพสต์อิมเพรสชันนิสม์)' },
      { key: 'B', text: 'Cubism (บาศกนิยม)' },
      { key: 'C', text: 'Surrealism (เหนือจริง)' },
      { key: 'D', text: 'Pop Art (ป๊อปอาร์ต)' }
    ],
    correctAnswer: 'A',
    explanation: 'Vincent van Gogh เป็นจิตรกรชาวดัตช์ในยุค Post-Impressionism ผู้มีผลงานชื่อดังระดับโลกอย่าง The Starry Night และ Sunflowers',
    hint: 'ภาพ The Starry Night และฝีแปรงอันทรงพลัง'
  },

  // ==================== TPAT 3: ความถนัดด้านวิทยาศาสตร์ เทคโนโลยี และวิศวกรรมศาสตร์ ปี 67 ====================
  {
    id: 11,
    subjectCode: 'TPAT3',
    subjectName: 'TPAT 3 วิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์',
    category: 'การคิดเชิงคำนวณและโปรแกรมมิ่ง',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'ในขั้นตอนวิธี (Algorithm) การวนซ้ำที่กำหนดเงื่อนไขให้ทำไปเรื่อยๆ จนกว่าเงื่อนไขจะเป็นเท็จ เรียกว่าโครงสร้างแบบใด?',
    options: [
      { key: 'A', text: 'Sequence (ลำดับขั้นตอน)' },
      { key: 'B', text: 'Loop / Iteration (การวนซ้ำแบบ While/For)' },
      { key: 'C', text: 'Selection (การเลือกเงื่อนไข If-Else)' },
      { key: 'D', text: 'Recursion Error' }
    ],
    correctAnswer: 'B',
    explanation: 'Loop หรือ Iteration คือโครงสร้างคำสั่งที่วนทำงานซ้ำตราบใดที่เงื่อนไขยังคงเป็นจริง',
    hint: 'คำสั่งวนซ้ำ เช่น while, for'
  },
  {
    id: 12,
    subjectCode: 'TPAT3',
    subjectName: 'TPAT 3 วิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์',
    category: 'กลศาสตร์และหลักวิศวกรรม',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'คานเบาอันหนึ่งมีความยาว 4 เมตร มีจุดหมุนอยู่ที่ระยะ 1 เมตรจากปลายด้านซ้าย หากวางวัตถุมวล 60 kg ไว้ที่ปลายซ้ายสุด จะต้องวางวัตถุมวลกี่ kg ไว้ที่ปลายขวาสุด คานจึงจะอยู่ในภาวะสมดุลต่อการหมุน?',
    options: [
      { key: 'A', text: '20 kg' },
      { key: 'B', text: '30 kg' },
      { key: 'C', text: '15 kg' },
      { key: 'D', text: '180 kg' }
    ],
    correctAnswer: 'A',
    explanation: 'โมเมนต์ตาม = โมเมนต์ทวน: W1 * L1 = W2 * L2 -> 60 * 1 = m * (4 - 1) -> 60 = 3m -> m = 20 kg',
    hint: 'ผลรวมโมเมนต์ทวน = ผลรวมโมเมนต์ตาม (M = F * d)'
  },
  {
    id: 13,
    subjectCode: 'TPAT3',
    subjectName: 'TPAT 3 วิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์',
    category: 'ระบบไฟฟ้าและพลังงาน',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'หลอดไฟขนาด 100 วัตต์ ใช้งานกับแรงดันไฟฟ้าบ้าน 220 โวลต์ หากเปิดทิ้งไว้วันละ 10 ชั่วโมง เป็นเวลา 30 วัน จะสิ้นเปลืองพลังงานไฟฟ้ากี่หน่วย (kWh)?',
    options: [
      { key: 'A', text: '30 หน่วย' },
      { key: 'B', text: '300 หน่วย' },
      { key: 'C', text: '3 หน่วย' },
      { key: 'D', text: '66 หน่วย' }
    ],
    correctAnswer: 'A',
    explanation: 'พลังงานไฟฟ้า (หน่วย) = (วัตต์ / 1000) * ชั่วโมง = (100 / 1000) * 10 * 30 = 0.1 * 300 = 30 หน่วย',
    hint: '1 หน่วย = 1 กิโลวัตต์-ชั่วโมง (kW·h) นำวัตต์หาร 1,000 ก่อนคูณจำนวนชั่วโมง'
  },
  {
    id: 14,
    subjectCode: 'TPAT3',
    subjectName: 'TPAT 3 วิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์',
    category: 'มิติสัมพันธ์และภาพฉาย (Orthographic Projection)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'เมื่อมองภาพฉายมุมที่ 1 (First-Angle Projection) ภาพด้านบน (Top View) จะอยู่ ณ ตำแหน่งใดเมื่อเทียบกับภาพด้านหน้า (Front View)?',
    options: [
      { key: 'A', text: 'อยู่ด้านล่างของภาพด้านหน้า' },
      { key: 'B', text: 'อยู่ด้านบนของภาพด้านหน้า' },
      { key: 'C', text: 'อยู่ด้านขวาของภาพด้านหน้า' },
      { key: 'D', text: 'อยู่ซ้อนทับภาพด้านหน้า' }
    ],
    correctAnswer: 'A',
    explanation: 'ในระบบภาพฉายมุมที่ 1 (First Angle) แสงส่องจากบนลงล่าง ภาพด้านบนจะถูกฉายลงมาอยู่ "ใต้" ภาพด้านหน้า',
    hint: 'ระวังความแตกต่างระหว่างมุมที่ 1 (Top อยู่ล่าง Front) กับมุมที่ 3 (Top อยู่บน Front)'
  },
  {
    id: 15,
    subjectCode: 'TPAT3',
    subjectName: 'TPAT 3 วิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์',
    category: 'การคิดเชิงวิศวกรรมและความปลอดภัย',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'ถังดับเพลิงชนิดก๊าซคาร์บอนไดออกไซด์ (CO2 - ถังสีแดงมีกรวยฉีดใหญ่) เหมาะสำหรับการดับเพลิงประเภทใดมากที่สุด?',
    options: [
      { key: 'A', text: 'เพลิงไหม้อุปกรณ์ไฟฟ้า (Class C) และของเหลวติดไฟ (Class B) โดยไม่ทิ้งคราบผงเคมี' },
      { key: 'B', text: 'เพลิงไหม้เศษไม้ กระดาษ ผ้าทั่วไป (Class A) เท่านั้น' },
      { key: 'C', text: 'เพลิงไหม้โลหะกัมมันตรังสี' },
      { key: 'D', text: 'ใช้ได้กับไฟป่าขนาดใหญ่เท่านั้น' }
    ],
    correctAnswer: 'A',
    explanation: 'ถัง CO2 ดับไฟโดยการแทนที่ออกซิเจนและลดอุณหภูมิ ไม่เป็นสื่อนำไฟฟ้าและไม่ทิ้งสารตกค้าง จึงเหมาะมากกับห้องเซิร์ฟเวอร์และอุปกรณ์ไฟฟ้า',
    hint: 'CO2 ไม่นำไฟฟ้า ไม่ทิ้งผงตกค้างบนแผงวงจร'
  },

  // ==================== TGAT 1: การสื่อสารภาษาอังกฤษ ปี 67 ====================
  {
    id: 16,
    subjectCode: 'TGAT1',
    subjectName: 'TGAT 1 การสื่อสารภาษาอังกฤษ',
    category: 'Situational Dialogue',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'Situation: At a university international admission booth.\nStudent: "Excuse me, could you tell me where I can submit my portfolio for the first round?"\nOfficer: "_______"',
    options: [
      { key: 'A', text: 'Certainly! Please head to Room 302 on the third floor; the submission desk is right there.' },
      { key: 'B', text: 'I don’t care about your portfolio today.' },
      { key: 'C', text: 'You should have known that already.' },
      { key: 'D', text: 'No problem, my name is officer John.' }
    ],
    correctAnswer: 'A',
    explanation: 'ตัวเลือก A ตอบคำถามอย่างสุภาพและบอกตำแหน่งสถานที่ชัดเจน ตรงตามบริบทการสอบถามข้อมูล',
    hint: 'เลือกคำตอบที่สุภาพและให้ข้อมูลทิศทางสถานที่ถูกต้อง'
  },
  {
    id: 17,
    subjectCode: 'TGAT1',
    subjectName: 'TGAT 1 การสื่อสารภาษาอังกฤษ',
    category: 'Vocabulary in Context',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'Despite rigorous preparation, the applicants found the interview questions exceptionally _______, requiring deep critical reflection rather than memorized responses.',
    options: [
      { key: 'A', text: 'demanding', subText: 'เรียกร้องทักษะสูง / ท้าทายยาก' },
      { key: 'B', text: 'superficial', subText: 'ผิวเผิน' },
      { key: 'C', text: 'negligible', subText: 'เล็กน้อยไม่สำคัญ' },
      { key: 'D', text: 'monotonous', subText: 'น่าเบื่อซ้ำซาก' }
    ],
    correctAnswer: 'A',
    explanation: '"demanding" แปลว่ายากและท้าทาย ต้องใช้ทักษะความพยายามสูง สอดคล้องกับข้อความที่ว่าต้องใช้การคิดวิเคราะห์เชิงลึก',
    hint: 'สังเกตบริบท requiring deep critical reflection'
  },
  {
    id: 18,
    subjectCode: 'TGAT1',
    subjectName: 'TGAT 1 การสื่อสารภาษาอังกฤษ',
    category: 'Reading Comprehension',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    contextText: '"Generative artificial intelligence has rapidly permeated higher education. While educators praise its efficiency in brainstorming and personalized tutoring, concerns regarding academic integrity, hallucinated citations, and diminished analytical endurance among undergraduates remain acute."',
    questionText: 'According to the passage, which of the following is considered a primary drawback of AI in academia?',
    options: [
      { key: 'A', text: 'Excessive electricity cost for running laptops' },
      { key: 'B', text: 'Potential fabrication of references and reduced student critical stamina' },
      { key: 'C', text: 'Complete ban of computers in lecture halls' },
      { key: 'D', text: 'Accelerated grading speed by teaching assistants' }
    ],
    correctAnswer: 'B',
    explanation: 'เนื้อหาระบุว่าข้อกังวลคือ "hallucinated citations" (การอ้างอิงที่แต่งขึ้น) และ "diminished analytical endurance" ซึ่งตรงกับตัวเลือก B',
    hint: 'จับคู่คำที่มีความหมายเดียวกับ hallucinated citations และ diminished analytical endurance'
  },
  {
    id: 19,
    subjectCode: 'TGAT1',
    subjectName: 'TGAT 1 การสื่อสารภาษาอังกฤษ',
    category: 'Sentence Completion & Grammar',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'Hardly _______ the examination room when the chief invigilator announced that the test session had concluded.',
    options: [
      { key: 'A', text: 'had she entered' },
      { key: 'B', text: 'she had entered' },
      { key: 'C', text: 'she entered' },
      { key: 'D', text: 'did she entered' }
    ],
    correctAnswer: 'A',
    explanation: 'เมื่อขึ้นต้นประโยคด้วยคำปฏิเสธเชิงลบ เช่น Hardly, Scarcely, Seldom ต้องใช้ Inversion: Hardly + had + Subject + V.3 ... when ...',
    hint: 'Negative Inversion: เมื่อ Hardly ขึ้นต้นประโยค ต้องสลับกริยาช่วย had มาไว้หน้าประธาน'
  },
  {
    id: 20,
    subjectCode: 'TGAT1',
    subjectName: 'TGAT 1 การสื่อสารภาษาอังกฤษ',
    category: 'Idiomatic Expressions',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'When the coach told the nervous student to "keep her chin up," he meant that she should _______ in the face of difficulties.',
    options: [
      { key: 'A', text: 'stay optimistic and resilient' },
      { key: 'B', text: 'look straight up at the ceiling' },
      { key: 'C', text: 'surrender immediately' },
      { key: 'D', text: 'refuse to speak to anyone' }
    ],
    correctAnswer: 'A',
    explanation: 'สำนวน "Keep your chin up" แปลว่า เชิดหน้าสู้ต่อไป ให้กำลังใจให้มองโลกในแง่ดีและไม่ย่อท้อ',
    hint: 'สำนวนให้กำลังใจเวลาเพื่อนกำลังท้อ'
  },

  // ==================== TGAT 2: การคิดอย่างมีเหตุผล ปี 67 ====================
  {
    id: 21,
    subjectCode: 'TGAT2',
    subjectName: 'TGAT 2 การคิดอย่างมีเหตุผล',
    category: 'ความสามารถทางตัวเลขและอนุกรม',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'จงหาพจน์ถัดไปของอนุกรม: 3, 7, 15, 31, 63, ... ?',
    options: [
      { key: 'A', text: '127' },
      { key: 'B', text: '126' },
      { key: 'C', text: '95' },
      { key: 'D', text: '125' }
    ],
    correctAnswer: 'A',
    explanation: 'ผลต่างคือ +4, +8, +16, +32 ดังนั้นตัวถัดไปคือ +64 -> 63 + 64 = 127 (หรือสูตร *2 + 1)',
    hint: 'มองผลต่างที่เพิ่มขึ้นเป็นสองเท่า: 4, 8, 16, 32, ...'
  },
  {
    id: 22,
    subjectCode: 'TGAT2',
    subjectName: 'TGAT 2 การคิดอย่างมีเหตุผล',
    category: 'การวิเคราะห์ความพอเพียงของข้อมูล',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'ต้องการทราบว่านาย ก มีอายุมากกว่านาย ข กี่ปี?\nข้อมูล (1): ผลรวมอายุของ ก และ ข เท่ากับ 38 ปี\nข้อมูล (2): 4 ปีที่แล้ว นาย ก มีอายุเป็นสองเท่าของนาย ข\nข้อใดสรุปถูกต้องเกี่ยวกับการตอบคำถามนี้?',
    options: [
      { key: 'A', text: 'ข้อมูล (1) ข้อเดียวเพียงพอ' },
      { key: 'B', text: 'ข้อมูล (2) ข้อเดียวเพียงพอ' },
      { key: 'C', text: 'ต้องใช้ข้อมูล (1) และ (2) ร่วมกันจึงจะเพียงพอ' },
      { key: 'D', text: 'แม้ใช้ข้อมูลทั้งสองข้อร่วมกันก็ยังไม่เพียงพอ' }
    ],
    correctAnswer: 'C',
    explanation: 'มี 2 ตัวแปร ก และ ข: จาก (1) ก+ข = 38 และจาก (2) ก-4 = 2(ข-4) สามารถแก้ระบบสมการหาค่าอายุของทั้งสองคนและหาผลต่างอายุได้แน่นอน',
    hint: 'ระบบสมการ 2 ตัวแปร จำเป็นต้องใช้ 2 สมการที่เป็นอิสระต่อกัน'
  },
  {
    id: 23,
    subjectCode: 'TGAT2',
    subjectName: 'TGAT 2 การคิดอย่างมีเหตุผล',
    category: 'มิติสัมพันธ์และการหมุนรูป',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ลูกเต๋ามาตรฐาน หน้าตรงข้ามกันจะบวกกันได้ 7 เสมอ หากหน้าบนสุดคือเลข 2 และหน้าหน้าสุดคือเลข 4 หน้าที่อยู่ด้านล่างสุดและด้านหลังสุดคือเลขใดตามลำดับ?',
    options: [
      { key: 'A', text: '5 และ 3' },
      { key: 'B', text: '3 และ 5' },
      { key: 'C', text: '6 และ 1' },
      { key: 'D', text: '1 และ 6' }
    ],
    correctAnswer: 'A',
    explanation: 'หน้าบนตรงข้ามกับหน้าล่าง: 7 - 2 = 5 / หน้าหน้าตรงข้ามกับหน้าหลัง: 7 - 4 = 3 ดังนั้นคือ 5 และ 3',
    hint: 'กฎผลรวมหน้าตรงข้ามของลูกเต๋ามาตรฐาน = 7'
  },
  {
    id: 24,
    subjectCode: 'TGAT2',
    subjectName: 'TGAT 2 การคิดอย่างมีเหตุผล',
    category: 'การคิดเชิงตรรกะและเงื่อนไขภาษา',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ในการแข่งขันวิ่ง 5 คน: ธันวา เข้าเส้นชัยก่อน เมษา แต่วิ่งช้ากว่า มีนา ส่วน กุมภา เข้าเส้นชัยเป็นคนสุดท้าย และ สิงหา วิ่งเร็วกว่า มีนา ใครคือผู้ชนะเลิศอันดับที่ 1?',
    options: [
      { key: 'A', text: 'สิงหา' },
      { key: 'B', text: 'มีนา' },
      { key: 'C', text: 'ธันวา' },
      { key: 'D', text: 'เมษา' }
    ],
    correctAnswer: 'A',
    explanation: 'เรียงลำดับจากเร็วไปช้า: สิงหา > มีนา > ธันวา > เมษา > กุมภา ดังนั้น สิงหา วิ่งเข้าอันดับที่ 1',
    hint: 'เขียนแผนภาพเครื่องหมายมากกว่า (>) ทีละประโยค'
  },
  {
    id: 25,
    subjectCode: 'TGAT2',
    subjectName: 'TGAT 2 การคิดอย่างมีเหตุผล',
    category: 'อุปมาอุปไมย (Analogy)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'เข็มทิศ : ทิศทาง มีความสัมพันธ์เหมือนกับคู่ใดมากที่สุด?',
    options: [
      { key: 'A', text: 'นาฬิกา : เวลา' },
      { key: 'B', text: 'แผนที่ : ดินสอ' },
      { key: 'C', text: 'ปรอท : แก้ว' },
      { key: 'D', text: 'ไม้บรรทัด : ยางลบ' }
    ],
    correctAnswer: 'A',
    explanation: 'เข็มทิศเป็นเครื่องมือสำหรับบอกทิศทาง เหมือนกับ นาฬิกา เป็นเครื่องมือสำหรับบอกเวลา',
    hint: 'ความสัมพันธ์แบบ "เครื่องมือ : สิ่งที่ใช้วัดหรือบอกค่า"'
  },

  // ==================== TGAT 3: สมรรถนะการทำงาน ปี 67 ====================
  {
    id: 26,
    subjectCode: 'TGAT3',
    subjectName: 'TGAT 3 สมรรถนะการทำงาน',
    category: 'การแก้ไขปัญหาที่ซับซ้อน (Complex Problem Solving)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'เมื่อคุณได้รับมอบหมายงานกลุ่มและพบว่าข้อมูลที่ได้มามีความขัดแย้งกันอย่างมีนัยสำคัญจากสองแหล่ง ขั้นตอนแรกที่ดีที่สุดคือข้อใด?',
    options: [
      { key: 'A', text: 'เลือกใช้ข้อมูลจากแหล่งที่ค้นเจอก่อนเพื่อประหยัดเวลา' },
      { key: 'B', text: 'ตรวจสอบระเบียบวิธีวิจัย ความน่าเชื่อถือของทั้งสองแหล่ง และค้นหาแหล่งอ้างอิงปฐมภูมิเพิ่มเติมเพื่อเทียบเคียง' },
      { key: 'C', text: 'ตัดข้อมูลส่วนที่มีความขัดแย้งทิ้งไปทั้งหมด' },
      { key: 'D', text: 'โหวตเสียงในกลุ่มว่าอยากเชื่อแหล่งไหนมากกว่ากัน' }
    ],
    correctAnswer: 'B',
    explanation: 'การสืบค้นแหล่งปฐมภูมิและตรวจสอบความน่าเชื่อถือของระเบียบวิธี เป็นพื้นฐานสำคัญของการแก้ปัญหาและคิดอย่างมีวิจารณญาณ',
    hint: 'เน้นการตรวจสอบความเที่ยงตรงของข้อมูลด้วยหลักวิชาการ'
  },
  {
    id: 27,
    subjectCode: 'TGAT3',
    subjectName: 'TGAT 3 สมรรถนะการทำงาน',
    category: 'การบริหารจัดการอารมณ์และความฉลาดทางอารมณ์ (EQ)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ระหว่างนำเสนองาน มีเพื่อนร่วมชั้นพูดแทรกขึ้นมาด้วยน้ำเสียงประชดประชันว่าผลงานของคุณไม่เห็นมีอะไรน่าสนใจ การตอบสนองข้อใดสะท้อนวุฒิภาวะทางอารมณ์สูงที่สุด?',
    options: [
      { key: 'A', text: 'หยุดนำเสนอแล้วตอกกลับเพื่อนทันทีเพื่อให้เขารู้สึกอับอาย' },
      { key: 'B', text: 'หายใจเข้าลึกๆ ตอบรับอย่างสงบว่ายินดีรับฟังข้อเสนอแนะ และขอให้เพื่อนช่วยระบุจุดที่ควรปรับปรุงเพิ่มเติมหลังจบการนำเสนอ' },
      { key: 'C', text: 'เดินออกจากห้องเรียนทันทีเพราะรู้สึกถูกดูหมิ่น' },
      { key: 'D', text: 'แกล้งทำเป็นไม่ได้ยินแล้วรีบพูดข้ามไปโดยไม่สบตาใคร' }
    ],
    correctAnswer: 'B',
    explanation: 'การควบคุมสติ ไม่โต้ตอบด้วยอารมณ์ และเปลี่ยนคำวิจารณ์เป็นการเปิดรับมุมมองอย่างสร้างสรรค์ คือทักษะ Emotional Intelligence',
    hint: 'ตอบสนองอย่างสงบ นิ่ง และเปลี่ยนพลังลบเป็นบทสนทนาเชิงสร้างสรรค์'
  },
  {
    id: 28,
    subjectCode: 'TGAT3',
    subjectName: 'TGAT 3 สมรรถนะการทำงาน',
    category: 'การสร้างคุณค่าและนวัตกรรม (Value Creation)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'ทีมโครงงานของคุณต้องการแก้ปัญหาขยะพลาสติกในโรงเรียน แต่ได้รับงบประมาณสนับสนุนจำกัดมาก กลยุทธ์ใดสอดคล้องกับแนวคิด "Design Thinking & Lean Innovation" มากที่สุด?',
    options: [
      { key: 'A', text: 'รอจนกว่าโรงเรียนจะจัดสรรงบประมาณขนาดใหญ่มาให้ก่อนจึงเริ่มทำ' },
      { key: 'B', text: 'สร้างต้นแบบขั้นต่ำ (MVP) เช่น แคมเปญแยกขยะเฉพาะจุดเพื่อทดสอบพฤติกรรมนักเรียนก่อน แล้วนำฟีดแบ็กมาขยายผล' },
      { key: 'C', text: 'จัดซื้อเครื่องรีไซเคิลราคาสูงโดยกู้ยืมเงินนอกระบบ' },
      { key: 'D', text: 'เปลี่ยนไปทำหัวข้ออื่นที่ไม่ต้องลงมือทำจริง' }
    ],
    correctAnswer: 'B',
    explanation: 'แนวคิด Lean & Design Thinking เน้นการสร้าง Minimum Viable Product (MVP) เพื่อทดสอบสมมติฐานและเรียนรู้จากผู้ใช้จริงด้วยทรัพยากรจำกัด',
    hint: 'คำสำคัญ: Minimum Viable Product (MVP) ทดลองเล็กเพื่อเรียนรู้ไว'
  },
  {
    id: 29,
    subjectCode: 'TGAT3',
    subjectName: 'TGAT 3 สมรรถนะการทำงาน',
    category: 'การเป็นพลเมืองที่มีส่วนร่วม (Active Citizenship)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'การแสดงออกถึงความเป็น "Active Citizen" ในระดับโรงเรียนที่สร้างผลกระทบเชิงบวกอย่างยั่งยืนที่สุดคือข้อใด?',
    options: [
      { key: 'A', text: 'วิพากษ์วิจารณ์ปัญหาในกลุ่มสนทนาลับโดยไม่เสนอแนวทางแก้ไข' },
      { key: 'B', text: 'ร่วมมือกับสภานักเรียนจัดกิจกรรมรับฟังความคิดเห็นและนำเสนอแนวทางแก้ไขอย่างสร้างสรรค์ต่อฝ่ายบริหาร' },
      { key: 'C', text: 'ปล่อยให้เป็นหน้าที่ของครูเพียงฝ่ายเดียวเพราะนักเรียนมีหน้าที่แค่เรียน' },
      { key: 'D', text: 'จัดกิจกรรมประท้วงที่ส่งผลกระทบต่อการเรียนการสอนของผู้อื่น' }
    ],
    correctAnswer: 'B',
    explanation: 'Active Citizen คือการมีส่วนร่วมอย่างรับผิดชอบ สร้างสรรค์ และใช้กระบวนการทางประชาธิปไตยเพื่อพัฒนาส่วนรวม',
    hint: 'การมีส่วนร่วมอย่างสร้างสรรค์ผ่านกระบวนการที่เป็นระบบ'
  },
  {
    id: 30,
    subjectCode: 'TGAT3',
    subjectName: 'TGAT 3 สมรรถนะการทำงาน',
    category: 'การทำงานร่วมกับผู้อื่น (Collaboration)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'เมื่อสมาชิกคนหนึ่งในทีมไม่สามารถส่งงานตามกำหนดได้เนื่องจากมีปัญหาส่วนตัวที่บ้าน หัวหน้าทีมที่ดีควรจัดการอย่างไร?',
    options: [
      { key: 'A', text: 'ตัดชื่อเพื่อนคนนั้นออกจากกลุ่มทันทีเพื่อความยุติธรรม' },
      { key: 'B', text: 'พูดคุยส่วนตัวด้วยความเข้าใจ ช่วยปรับแบ่งงานใหม่ตามความเหมาะสม และกำหนดเดดไลน์สำรองร่วมกัน' },
      { key: 'C', text: 'ประจานลงในแชตกลุ่มใหญ่เพื่อให้เพื่อนรู้สึกผิด' },
      { key: 'D', text: 'ทำงานแทนทั้งหมดโดยไม่พูดคุยกับเพื่อน' }
    ],
    correctAnswer: 'B',
    explanation: 'ภาวะผู้นำต้องมีความเห็นอกเห็นใจ (Empathy) ควบคู่กับความรับผิดชอบในการบริหารโครงการให้สำเร็จตามเป้าหมาย',
    hint: 'Empathy (ความเข้าใจ) ผสมผสานกับการแก้ปัญหาของทีม'
  },

  // ==================== A-Level: คณิตศาสตร์ประยุกต์ 1 ปี 67 ====================
  {
    id: 31,
    subjectCode: 'MATH1',
    subjectName: 'A-Level คณิตศาสตร์ประยุกต์ 1',
    category: 'แคลคูลัส (Calculus)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'กำหนดให้ f(x) = 3x^2 - 4x + 5 จงหาค่าของอนุพันธ์ f\'(2)',
    options: [
      { key: 'A', text: '8' },
      { key: 'B', text: '12' },
      { key: 'C', text: '6' },
      { key: 'D', text: '16' }
    ],
    correctAnswer: 'A',
    explanation: 'ดิฟ f(x): f\'(x) = 6x - 4 -> แทน x = 2: f\'(2) = 6(2) - 4 = 12 - 4 = 8',
    hint: 'สูตรดิฟ d/dx (ax^n) = a*n*x^(n-1)'
  },
  {
    id: 32,
    subjectCode: 'MATH1',
    subjectName: 'A-Level คณิตศาสตร์ประยุกต์ 1',
    category: 'ลำดับและอนุกรม (Sequences & Series)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ลำดับเรขาคณิตชุดหนึ่งมีพจน์แรก a1 = 3 และอัตราส่วนร่วม r = 2 จงหาผลรวม 5 พจน์แรก (S5)',
    options: [
      { key: 'A', text: '93' },
      { key: 'B', text: '96' },
      { key: 'C', text: '89' },
      { key: 'D', text: '186' }
    ],
    correctAnswer: 'A',
    explanation: 'สูตร Sn = a1(r^n - 1) / (r - 1) -> S5 = 3(2^5 - 1) / (2 - 1) = 3(32 - 1) = 3 * 31 = 93',
    hint: 'สูตรผลรวมอนุกรมเรขาคณิต: Sn = a1*(r^n - 1) / (r - 1)'
  },
  {
    id: 33,
    subjectCode: 'MATH1',
    subjectName: 'A-Level คณิตศาสตร์ประยุกต์ 1',
    category: 'สถิติและการแจกแจงความน่าจะเป็น',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'คะแนนสอบมีการแจกแจงปกติ ค่าเฉลี่ยเลขคณิตเท่ากับ 60 คะแนน และส่วนเบี่ยงเบนมาตรฐานเท่ากับ 10 คะแนน ถ้านักเรียนคนหนึ่งสอบได้ 75 คะแนน ค่ามาตรฐาน (Z-score) ของนักเรียนคนนี้มีค่าเท่าใด?',
    options: [
      { key: 'A', text: '+1.5' },
      { key: 'B', text: '+1.2' },
      { key: 'C', text: '-1.5' },
      { key: 'D', text: '+2.0' }
    ],
    correctAnswer: 'A',
    explanation: 'Z = (X - μ) / σ = (75 - 60) / 10 = 15 / 10 = +1.5',
    hint: 'Z = (คะแนนดิบ - ค่าเฉลี่ย) / ส่วนเบี่ยงเบนมาตรฐาน'
  },
  {
    id: 34,
    subjectCode: 'MATH1',
    subjectName: 'A-Level คณิตศาสตร์ประยุกต์ 1',
    category: 'เอกซ์โพเนนเชียลและลอการิทึม',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ถ้า log2(x - 1) = 3 แล้วค่าของ x มีค่าเท่ากับเท่าใด?',
    options: [
      { key: 'A', text: '9' },
      { key: 'B', text: '7' },
      { key: 'C', text: '8' },
      { key: 'D', text: '10' }
    ],
    correctAnswer: 'A',
    explanation: 'ปลดล็อก: x - 1 = 2^3 -> x - 1 = 8 -> x = 9',
    hint: 'เปลี่ยนรูปจาก logb(A) = C เป็น A = b^C'
  },
  {
    id: 35,
    subjectCode: 'MATH1',
    subjectName: 'A-Level คณิตศาสตร์ประยุกต์ 1',
    category: 'ความน่าจะเป็นและการนับ',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'โยนเหรียญเที่ยงตรง 3 เหรียญพร้อมกัน 1 ครั้ง ความน่าจะเป็นที่เหรียญจะออก "หัวอย่างน้อย 2 เหรียญ" มีค่าเท่าใด?',
    options: [
      { key: 'A', text: '1/2 (4 ใน 8)' },
      { key: 'B', text: '3/8' },
      { key: 'C', text: '1/4' },
      { key: 'D', text: '7/8' }
    ],
    correctAnswer: 'A',
    explanation: 'Sample space ทั้งหมด 2^3 = 8 กรณี / เหตุการณ์ออกหัวอย่างน้อย 2 ครั้ง: HHH, HHT, HTH, THH มี 4 กรณี -> 4/8 = 1/2',
    hint: 'นับกรณีที่ออกหัว 2 เหรียญ (3 แบบ) และหัว 3 เหรียญ (1 แบบ) รวมเป็น 4 แบบ'
  },

  // ==================== A-Level: ฟิสิกส์ ปี 67 ====================
  {
    id: 36,
    subjectCode: 'PHYS',
    subjectName: 'A-Level ฟิสิกส์',
    category: 'การเคลื่อนที่และแรง (Kinematics & Newton Laws)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'วัตถุมวล 2 kg ถูกแรงคงที่ 10 N กระทำในแนวราบ ถ้าพื้นผิวไม่มีแรงเสียดทาน วัตถุจะเคลื่อนที่ด้วยความเร่งกี่ m/s^2?',
    options: [
      { key: 'A', text: '5 m/s^2' },
      { key: 'B', text: '20 m/s^2' },
      { key: 'C', text: '2 m/s^2' },
      { key: 'D', text: '0.2 m/s^2' }
    ],
    correctAnswer: 'A',
    explanation: 'จากกฎข้อ 2 ของนิวตัน: ΣF = ma -> 10 = 2 * a -> a = 5 m/s^2',
    hint: 'สูตรพื้นฐานของนิวตัน: F = m * a'
  },
  {
    id: 37,
    subjectCode: 'PHYS',
    subjectName: 'A-Level ฟิสิกส์',
    category: 'งานและพลังงาน (Work & Energy)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ปล่อยวัตถุมวล 1 kg ตกอย่างอิสระจากความสูง 20 เมตรเหนือพื้นดิน (กำหนด g = 10 m/s^2 และไม่มีแรงต้านอากาศ) เมื่อวัตถุตกลงมาถึงพื้นดินจะมีอัตราเร็วเท่าใด?',
    options: [
      { key: 'A', text: '20 m/s' },
      { key: 'B', text: '400 m/s' },
      { key: 'C', text: '14.14 m/s' },
      { key: 'D', text: '10 m/s' }
    ],
    correctAnswer: 'A',
    explanation: 'อนุรักษ์พลังงาน: mgh = (1/2)mv^2 -> v = sqrt(2gh) = sqrt(2 * 10 * 20) = sqrt(400) = 20 m/s',
    hint: 'v = sqrt(2gh)'
  },
  {
    id: 38,
    subjectCode: 'PHYS',
    subjectName: 'A-Level ฟิสิกส์',
    category: 'คลื่นและเสียง (Waves & Sound)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'คลื่นผิวน้ำเคลื่อนที่จากบริเวณน้ำลึกเข้าสู่บริเวณน้ำตื้น ข้อใดกล่าวถูกต้องที่สุดเกี่ยวกับการเปลี่ยนแปลงของสมบัติคลื่น?',
    options: [
      { key: 'A', text: 'ความถี่คงที่ ความเร็วลดลง และความยาวคลื่นลดลง' },
      { key: 'B', text: 'ความถี่เพิ่มขึ้น ความเร็วคงที่' },
      { key: 'C', text: 'ความเร็วเพิ่มขึ้น ความยาวคลื่นเพิ่มขึ้น' },
      { key: 'D', text: 'ความถี่ลดลง ความเร็วเพิ่มขึ้น' }
    ],
    correctAnswer: 'A',
    explanation: 'เมื่อคลื่นเกิดการหักเห ความถี่ (f) ถูกกำหนดจากแหล่งกำเนิดจึงคงที่เสมอ ในน้ำตื้นความเร็ว (v) ลดลง ส่งผลให้ความยาวคลื่น (λ) ลดลงตามสมการ v = fλ',
    hint: 'ความถี่ของคลื่นจะคงที่เสมอเมื่อเปลี่ยนตัวกลาง'
  },
  {
    id: 39,
    subjectCode: 'PHYS',
    subjectName: 'A-Level ฟิสิกส์',
    category: 'ไฟฟ้ากระแสสลับและแม่เหล็ก',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'หม้อแปลงไฟฟ้าในอุดมคติ (Ideal Transformer) มีจำนวนรอบของขดลวดปฐมภูมิ 500 รอบ และขดลวดทุติยภูมิ 100 รอบ หากจ่ายแรงดันไฟฟ้ากระแสสลับ 220 V เข้าขดลวดปฐมภูมิ จะได้แรงดันไฟฟ้าขาออกกี่โวลต์?',
    options: [
      { key: 'A', text: '44 V' },
      { key: 'B', text: '1,100 V' },
      { key: 'C', text: '22 V' },
      { key: 'D', text: '88 V' }
    ],
    correctAnswer: 'A',
    explanation: 'V1 / V2 = N1 / N2 -> 220 / V2 = 500 / 100 = 5 -> V2 = 220 / 5 = 44 V (หม้อแปลงลง)',
    hint: 'อัตราส่วนแรงดันไฟฟ้าเท่ากับอัตราส่วนจำนวนรอบ: V1/V2 = N1/N2'
  },
  {
    id: 40,
    subjectCode: 'PHYS',
    subjectName: 'A-Level ฟิสิกส์',
    category: 'ฟิสิกส์นิวเคลียร์และอนุภาค',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'รังสีชนิดใดมีประจุเป็นบวก (+2e) และมีอำนาจทะลุทะลวงต่ำที่สุด ถูกกั้นได้ด้วยกระดาษเพียงแผ่นเดียว?',
    options: [
      { key: 'A', text: 'รังสีแอลฟา (Alpha)' },
      { key: 'B', text: 'รังสีบีตา (Beta)' },
      { key: 'C', text: 'รังสีแกมมา (Gamma)' },
      { key: 'D', text: 'รังสีเอกซ์ (X-ray)' }
    ],
    correctAnswer: 'A',
    explanation: 'รังสีแอลฟาคือนิวเคลียสของฮีเลียม (He-4) มีมวลมาก ประจุ +2 อำนาจทะลุทะลวงต่ำที่สุด',
    hint: 'นิวเคลียสของฮีเลียม ประจุบวกสอง'
  },

  // ==================== A-Level: เคมี ปี 67 ====================
  {
    id: 41,
    subjectCode: 'CHEM',
    subjectName: 'A-Level เคมี',
    category: 'โครงสร้างอะตอมและพันธะเคมี',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'ธาตุโซเดียม (11Na) ทำปฏิกิริยากับก๊าซคลอรีน (17Cl) จะเกิดสารประกอบที่ยึดเหนี่ยวกันด้วยพันธะประเภทใด?',
    options: [
      { key: 'A', text: 'พันธะไอออนิก (Ionic Bond)' },
      { key: 'B', text: 'พันธะโคเวเลนต์ไม่มีขั้ว' },
      { key: 'C', text: 'พันธะโลหะ' },
      { key: 'D', text: 'พันธะไฮโดรเจน' }
    ],
    correctAnswer: 'A',
    explanation: 'โลหะหมู่ 1 (Na) ให้อิเล็กตรอนกลายเป็น Na+ ส่วนอโลหะหมู่ 7 (Cl) รับอิเล็กตรอนกลายเป็น Cl- แรงดึงดูดทางไฟฟ้าสถิตคือพันธะไอออนิก',
    hint: 'โลหะรวมกับอโลหะ เกิดการให้และรับอิเล็กตรอน'
  },
  {
    id: 42,
    subjectCode: 'CHEM',
    subjectName: 'A-Level เคมี',
    category: 'กรด-เบส (Acids and Bases)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'สารละลายกรดแก่ HCl เข้มข้น 0.001 mol/L จะมีค่า pH เท่าใด?',
    options: [
      { key: 'A', text: '3' },
      { key: 'B', text: '11' },
      { key: 'C', text: '1' },
      { key: 'D', text: '7' }
    ],
    correctAnswer: 'A',
    explanation: 'HCl แตกตัว 100%: [H+] = 0.001 = 10^-3 mol/L -> pH = -log[H+] = -log(10^-3) = 3',
    hint: 'pH = -log[H3O+]'
  },
  {
    id: 43,
    subjectCode: 'CHEM',
    subjectName: 'A-Level เคมี',
    category: 'ปริมาณสารสัมพันธ์ (Stoichiometry)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'แก๊สมีเทน (CH4) 16 กรัม ทำปฏิกิริยาเผาไหม้อย่างสมบูรณ์กับแก๊สออกซิเจน (O2) ที่มากเกินพอ จะเกิดแก๊สคาร์บอนไดออกไซด์ (CO2) กี่กรัม? (C=12, H=1, O=16)',
    options: [
      { key: 'A', text: '44 กรัม' },
      { key: 'B', text: '22 กรัม' },
      { key: 'C', text: '88 กรัม' },
      { key: 'D', text: '32 กรัม' }
    ],
    correctAnswer: 'A',
    explanation: 'สมการ: CH4 + 2O2 -> CO2 + 2H2O / มวลโมเลกุล CH4 = 16 g/mol (มี 1 mol) จะเกิด CO2 1 mol (มวลโมเลกุล CO2 = 12 + 32 = 44 g)',
    hint: 'CH4 1 mol ให้ CO2 1 mol เสมอในการเผาไหม้สมบูรณ์'
  },
  {
    id: 44,
    subjectCode: 'CHEM',
    subjectName: 'A-Level เคมี',
    category: 'เคมีอินทรีย์ (Organic Chemistry)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'หมู่ฟังก์ชัน -COOH จัดเป็นหมู่ฟังก์ชันของสารประกอบอินทรีย์ประเภทใด?',
    options: [
      { key: 'A', text: 'กรดคาร์บอกซิลิก (Carboxylic Acid)' },
      { key: 'B', text: 'แอลกอฮอล์ (Alcohol)' },
      { key: 'C', text: 'เอสเทอร์ (Ester)' },
      { key: 'D', text: 'คีโตน (Ketone)' }
    ],
    correctAnswer: 'A',
    explanation: '-COOH คือหมู่คาร์บอกซิล (Carboxyl group) เป็นเอกลักษณ์ของกรดคาร์บอกซิลิก เช่น กรดแอซีติกในน้ำส้มสายชู',
    hint: 'สารที่มีคุณสมบัติเป็นกรดในเคมีอินทรีย์'
  },
  {
    id: 45,
    subjectCode: 'CHEM',
    subjectName: 'A-Level เคมี',
    category: 'อัตราการเกิดปฏิกิริยาเคมี',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'ปัจจัยใดต่อไปนี้มีผลทำให้ "พลังงานก่อกัมมันต์ (Activation Energy - Ea)" ของปฏิกิริยาลดลง?',
    options: [
      { key: 'A', text: 'การเติมตัวเร่งปฏิกิริยา (Catalyst)' },
      { key: 'B', text: 'การเพิ่มความเข้มข้นของสารตั้งต้น' },
      { key: 'C', text: 'การเพิ่มอุณหภูมิ' },
      { key: 'D', text: 'การบดสารตั้งต้นให้เป็นผงละเอียด' }
    ],
    correctAnswer: 'A',
    explanation: 'ตัวเร่งปฏิกิริยา (Catalyst) ทำหน้าที่เปลี่ยนกลไกของปฏิกิริยาให้ดำเนินไปในเส้นทางที่มีค่าพลังงานก่อกัมมันต์ (Ea) ต่ำลง',
    hint: 'สิ่งเดียวที่เปลี่ยนค่า Ea ของระบบได้คือตัวเร่งปฏิกิริยา'
  },

  // ==================== A-Level: ชีววิทยา ปี 67 ====================
  {
    id: 46,
    subjectCode: 'BIO',
    subjectName: 'A-Level ชีววิทยา',
    category: 'เซลล์และออร์แกเนลล์',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'ออร์แกเนลล์ใดทำหน้าที่เปรียบเสมือน "โรงงานผลิตพลังงาน (Powerhouse)" สร้าง ATP ผ่านกระบวนการหายใจระดับเซลล์?',
    options: [
      { key: 'A', text: 'ไมโทคอนเดรีย (Mitochondria)' },
      { key: 'B', text: 'ไรโบโซม (Ribosome)' },
      { key: 'C', text: 'กอลจิคอมเพล็กซ์ (Golgi Complex)' },
      { key: 'D', text: 'ไลโซโซม (Lysosome)' }
    ],
    correctAnswer: 'A',
    explanation: 'ไมโทคอนเดรียทำหน้าที่สร้าง ATP ส่วนใหญ่ของเซลล์ผ่านวัฏจักรเครบส์และการถ่ายทอดอิเล็กตรอน',
    hint: 'Powerhouse of the cell'
  },
  {
    id: 47,
    subjectCode: 'BIO',
    subjectName: 'A-Level ชีววิทยา',
    category: 'พันธุศาสตร์และดีเอ็นเอ',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ในการจำลองตัวเองของ DNA (DNA Replication) เอนไซม์ชนิดใดทำหน้าที่คลายเกลียวคู่ของสายดีเอ็นเอ?',
    options: [
      { key: 'A', text: 'เฮลิเคส (Helicase)' },
      { key: 'B', text: 'ดีเอ็นเอ พอลิเมอเรส (DNA Polymerase)' },
      { key: 'C', text: 'ไลเกส (Ligase)' },
      { key: 'D', text: 'ไพรเมส (Primase)' }
    ],
    correctAnswer: 'A',
    explanation: 'Helicase สลายพันธะไฮโดรเจนระหว่างเบสคู่สมเพื่อแยกสายคู่ของดีเอ็นเอออกจากกัน',
    hint: 'เอนไซม์รูดซิปคลายเกลียว'
  },
  {
    id: 48,
    subjectCode: 'BIO',
    subjectName: 'A-Level ชีววิทยา',
    category: 'ระบบร่างกายมนุษย์',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'ฮอร์โมนอินซูลิน (Insulin) ผลิตจากเซลล์ชนิดใดในตับอ่อน และมีบทบาทหน้าที่อย่างไร?',
    options: [
      { key: 'A', text: 'บีตาเซลล์ (Beta cells) ทำหน้าที่ลดระดับน้ำตาลในเลือดโดยกระตุ้นการนำกลูโคสเข้าสู่เซลล์' },
      { key: 'B', text: 'แอลฟาเซลล์ (Alpha cells) ทำหน้าที่สลายไกลโคเจนให้เป็นกลูโคส' },
      { key: 'C', text: 'เซลล์ตับ ทำหน้าที่ย่อยไขมัน' },
      { key: 'D', text: 'เดลตาเซลล์ ทำหน้าที่สร้างน้ำย่อยอะไมเลส' }
    ],
    correctAnswer: 'A',
    explanation: 'Beta cells ของ Islets of Langerhans ผลิตอินซูลินเพื่อนำน้ำตาลเข้าสู่เซลล์และเปลี่ยนเป็นไกลโคเจน ลดน้ำตาลในกระแสเลือด',
    hint: 'Beta cells สร้างอินซูลินลดน้ำตาล'
  },
  {
    id: 49,
    subjectCode: 'BIO',
    subjectName: 'A-Level ชีววิทยา',
    category: 'พืชและกระบวนการสังเคราะห์ด้วยแสง',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'แก๊สออกซิเจน (O2) ที่ถูกปล่อยออกมาจากกระบวนการสังเคราะห์ด้วยแสงของพืช เกิดจากการแตกตัวของโมเลกุลสารใด?',
    options: [
      { key: 'A', text: 'น้ำ (H2O) ในปฏิกิริยาแสง (Photolysis)' },
      { key: 'B', text: 'แก๊สคาร์บอนไดออกไซด์ (CO2)' },
      { key: 'C', text: 'กลูโคส (C6H12O6)' },
      { key: 'D', text: 'คลอโรฟิลล์' }
    ],
    correctAnswer: 'A',
    explanation: 'การสลายน้ำด้วยแสง (Photolysis of water) ที่ระบบแสง II ปล่อยอิเล็กตรอน โปรตอน และแก๊ส O2 ออกมา',
    hint: 'Photolysis: แสงทำให้โมเลกุลน้ำแตกตัว'
  },
  {
    id: 50,
    subjectCode: 'BIO',
    subjectName: 'A-Level ชีววิทยา',
    category: 'นิเวศวิทยาและความหลากหลาย',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'ความสัมพันธ์ระหว่าง "ผึ้งกับดอกไม้" จัดเป็นความสัมพันธ์ของสิ่งมีชีวิตในรูปแบบใด?',
    options: [
      { key: 'A', text: 'ภาวะพึ่งพากัน / ได้ประโยชน์ร่วมกัน (+/+)' },
      { key: 'B', text: 'ภาวะอิงอาศัย (+/0)' },
      { key: 'C', text: 'ภาวะปรสิต (+/-)' },
      { key: 'D', text: 'ภาวะล่าเหยื่อ (+/-)' }
    ],
    correctAnswer: 'A',
    explanation: 'ผึ้งได้น้ำหวานเป็นอาหาร ดอกไม้ได้รับการถ่ายละอองเรณูเพื่อสืบพันธุ์ ต่างฝ่ายต่างได้ประโยชน์ (+/+)',
    hint: 'ทั้งสองฝ่ายได้ประโยชน์ซึ่งกันและกัน'
  },

  // ==================== A-Level: ภาษาไทย ปี 67 ====================
  {
    id: 51,
    subjectCode: 'THAI',
    subjectName: 'A-Level ภาษาไทย',
    category: 'การใช้ภาษาและการสะกดคำ',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'คำในข้อใดสะกดถูกต้องตามพจนานุกรมฉบับราชบัณฑิตยสถานทุกคำ?',
    options: [
      { key: 'A', text: 'อนุญาต, กะเพรา, ผูกพัน' },
      { key: 'B', text: 'อนุญาติ, กะเพรา, ผูกพันธ์' },
      { key: 'C', text: 'อนุญาต, กระเพรา, ผูกพันธ์' },
      { key: 'D', text: 'อนุญาติ, กระเพรา, ผูกพัน' }
    ],
    correctAnswer: 'A',
    explanation: '"อนุญาต" ไม่มีสระอิ / "กะเพรา" ไม่มี ร ควบกล้ำ / "ผูกพัน" ไม่มี ธ์ สะกด',
    hint: 'อนุญาตไม่มีสระอิ, กะเพราไม่มี ร, ผูกพันไม่มี ธ์'
  },
  {
    id: 52,
    subjectCode: 'THAI',
    subjectName: 'A-Level ภาษาไทย',
    category: 'การอ่านจับใจความสำคัญ',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    contextText: '"ความผิดพลาดไม่ใช่สิ่งที่น่าอับอาย หากเรามีสติที่จะถอดบทเรียนจากมัน คนที่ไม่เคยทำอะไรผิดพลาดเลย คือคนที่ไม่เคยริเริ่มลงมือทำสิ่งใหม่ๆ ในชีวิต"',
    questionText: 'ใจความสำคัญของข้อความนี้ตรงกับข้อใดมากที่สุด?',
    options: [
      { key: 'A', text: 'ความผิดพลาดเป็นโอกาสในการเรียนรู้สำหรับผู้ที่กล้าเริ่มต้น' },
      { key: 'B', text: 'เราควรหลีกเลี่ยงความผิดพลาดให้ได้มากที่สุด' },
      { key: 'C', text: 'คนที่ทำผิดบ่อยๆ คือคนที่มีความคิดสร้างสรรค์' },
      { key: 'D', text: 'การไม่ทำอะไรเลยเป็นวิธีป้องกันความล้มเหลวที่ดี' }
    ],
    correctAnswer: 'A',
    explanation: 'ข้อความเน้นย้ำเรื่องการถอดบทเรียนจากความผิดพลาด และการกล้าก้าวออกจากกรอบเดิม',
    hint: 'จับประเด็นเรื่องการเรียนรู้จากความล้มเหลว'
  },
  {
    id: 53,
    subjectCode: 'THAI',
    subjectName: 'A-Level ภาษาไทย',
    category: 'สำนวนไทยและความหมาย',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'สำนวนใดมีความหมายว่า "ทำลายสิ่งสำคัญของตนเองเพื่อประโยชน์เล็กน้อย"?',
    options: [
      { key: 'A', text: 'ฆ่าควายเสียดายพริก' },
      { key: 'B', text: 'ขี่ช้างจับตั๊กแตน' },
      { key: 'C', text: 'ชุบมือเปิบ' },
      { key: 'D', text: 'จับปลาสองมือ' }
    ],
    correctAnswer: 'A',
    explanation: '"ฆ่าควายเสียดายพริก" หมายถึง การทำการใหญ่แต่ตระหนี่สิ่งเล็กน้อยจนทำให้เสียการใหญ่',
    hint: 'ลงทุนของใหญ่แต่เสียดายเครื่องปรุงเล็กน้อย'
  },
  {
    id: 54,
    subjectCode: 'THAI',
    subjectName: 'A-Level ภาษาไทย',
    category: 'ระดับภาษาและกาลเทศะ',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'ข้อความใดใช้ "ภาษาระดับทางการ" อย่างถูกต้องและเหมาะสมที่สุดในการเขียนหนังสือขอความอนุเคราะห์?',
    options: [
      { key: 'A', text: 'จึงเรียนมาเพื่อโปรดพิจารณาให้ความอนุเคราะห์ และขอขอบพระคุณเป็นอย่างยิ่งมา ณ โอกาสนี้' },
      { key: 'B', text: 'ช่วยหน่อยนะครับ ทางเราเดือดร้อนมากจริงๆ' },
      { key: 'C', text: 'เรียนมาเพื่อให้ท่านช่วยตามความสะดวก' },
      { key: 'D', text: 'ถ้าว่างก็รบกวนช่วยดูเอกสารนี้ให้หน่อยครับ' }
    ],
    correctAnswer: 'A',
    explanation: 'ตัวเลือก A ใช้โครงสร้างและคำลงท้ายตามระเบียบสารบรรณภาษาราชการและทางการอย่างถูกต้อง',
    hint: 'คำลงท้ายมาตรฐานของหนังสือราชการและหนังสือขอความอนุเคราะห์'
  },
  {
    id: 55,
    subjectCode: 'THAI',
    subjectName: 'A-Level ภาษาไทย',
    category: 'การใช้คำให้ตรงความหมาย',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'ประโยคในข้อใดใช้คำว่า "กระชับ" ได้ถูกต้องตามความหมายและบริบท?',
    options: [
      { key: 'A', text: 'วิทยากรบรรยายสรุปเนื้อหาได้อย่างกระชับและเข้าใจง่าย' },
      { key: 'B', text: 'เขาสวมรองเท้าที่กระชับจนเดินไม่ไหวเพราะคับเกินไป' },
      { key: 'C', text: 'ถนนสายนี้สร้างอย่างกระชับเพื่อรองรับรถบรรทุก' },
      { key: 'D', text: 'ฝนตกลงมาอย่างกระชับตลอดทั้งคืน' }
    ],
    correctAnswer: 'A',
    explanation: '"กระชับ" ใช้กับเนื้อหา ข้อความ หรือการพูดที่รัดกุม สั้น ได้ใจความ ไม่เวิ่นเว้อ',
    hint: 'กระชับ = สั้น รัดกุม ชัดเจน'
  },

  // ==================== A-Level: สังคมศึกษา ปี 67 ====================
  {
    id: 56,
    subjectCode: 'SOC',
    subjectName: 'A-Level สังคมศึกษา',
    category: 'หน้าที่พลเมืองและกฎหมาย',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'ตามรัฐธรรมนูญแห่งราชอาณาจักรไทย ประชาชนชาวไทยมีหน้าที่ไปใช้สิทธิเลือกตั้ง หากไม่ไปใช้สิทธิและไม่ได้แจ้งเหตุผลอันสมควร จะมีผลตามกฎหมายอย่างไร?',
    options: [
      { key: 'A', text: 'ถูกจำกัดสิทธิทางการเมืองบางประการตามที่กฎหมายกำหนด' },
      { key: 'B', text: 'ถูกเพิกถอนสัญชาติไทยทันที' },
      { key: 'C', text: 'ต้องโทษจำคุกไม่เกิน 1 ปี' },
      { key: 'D', text: 'ถูกยึดทรัพย์สินเข้าเป็นของรัฐ' }
    ],
    correctAnswer: 'A',
    explanation: 'ผู้ไม่ไปใช้สิทธิเลือกตั้งและไม่แจ้งเหตุผลจะถูกจำกัดสิทธิทางการเมือง เช่น สิทธิสมัครรับเลือกตั้ง หรือสิทธิยื่นคำร้องคัดค้าน',
    hint: 'ถูกจำกัดสิทธิทางการเมืองบางประการ เช่น การดำรงตำแหน่งทางการเมือง'
  },
  {
    id: 57,
    subjectCode: 'SOC',
    subjectName: 'A-Level สังคมศึกษา',
    category: 'เศรษฐศาสตร์ (Economics)',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'เมื่อเกิด "ภาวะเงินเฟ้อ (Inflation)" รุนแรงในระบบเศรษฐกิจ ธนาคารแห่งประเทศไทย (แบงก์ชาติ) มักดำเนินนโยบายการเงินแบบใดเพื่อรักษาเสถียรภาพราคา?',
    options: [
      { key: 'A', text: 'ปรับขึ้นอัตราดอกเบี้ยนโยบายเพื่อชะลอการใช้จ่ายและการกู้ยืม' },
      { key: 'B', text: 'พิมพ์ธนบัตรเพิ่มเข้าสู่ระบบเป็นจำนวนมาก' },
      { key: 'C', text: 'ลดอัตราดอกเบี้ยเงินฝากให้เหลือศูนย์' },
      { key: 'D', text: 'สั่งปิดธนาคารพาณิชย์ชั่วคราว' }
    ],
    correctAnswer: 'A',
    explanation: 'นโยบายการเงินแบบเข้มงวด (Contractionary Monetary Policy) โดยการขึ้นดอกเบี้ยนโยบาย จะช่วยดูดซับสภาพคล่องและลดแรงกดดันเงินเฟ้อ',
    hint: 'เงินเฟ้อ = เงินล้นระบบ ต้องขึ้นดอกเบี้ยเพื่อลดการใช้จ่าย'
  },
  {
    id: 58,
    subjectCode: 'SOC',
    subjectName: 'A-Level สังคมศึกษา',
    category: 'ประวัติศาสตร์สากลและไทย',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'การปฏิวัติอุตสาหกรรม (Industrial Revolution) ครั้งที่ 1 เริ่มต้นขึ้นที่ประเทศใด และใช้พลังงานขับเคลื่อนหลักจากสิ่งใด?',
    options: [
      { key: 'A', text: 'ประเทศอังกฤษ โดยใช้พลังงานจากเครื่องจักรไอน้ำและถ่านหิน' },
      { key: 'B', text: 'ประเทศสหรัฐอเมริกา โดยใช้พลังงานนิวเคลียร์' },
      { key: 'C', text: 'ประเทศเยอรมนี โดยใช้พลังงานโซลาร์เซลล์' },
      { key: 'D', text: 'ประเทศฝรั่งเศส โดยใช้กังหันลมโบราณ' }
    ],
    correctAnswer: 'A',
    explanation: 'การปฏิวัติอุตสาหกรรมระยะที่ 1 เริ่มที่เกาะบริเตนใหญ่ (อังกฤษ) ในศตวรรษที่ 18 ด้วยการประดิษฐ์เครื่องจักรไอน้ำของ James Watt โดยใช้ถ่านหินเป็นเชื้อเพลิง',
    hint: 'อังกฤษ เครื่องจักรไอน้ำ และเหมืองถ่านหิน'
  },
  {
    id: 59,
    subjectCode: 'SOC',
    subjectName: 'A-Level สังคมศึกษา',
    category: 'ภูมิศาสตร์และสิ่งแวดล้อม',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'ปรากฏการณ์ "ลานีญา (La Niña)" ส่งผลกระทบต่อภูมิอากาศของประเทศไทยในลักษณะใดเป็นหลัก?',
    options: [
      { key: 'A', text: 'ปริมาณฝนมากกว่าปกติและเสี่ยงต่อน้ำท่วม' },
      { key: 'B', text: 'เกิดภัยแล้งรุนแรงและฝนทิ้งช่วงยาวนาน' },
      { key: 'C', text: 'อุณหภูมิอากาศร้อนจัดผิดปกติ' },
      { key: 'D', text: 'เกิดพายุหิมะตกในภาคเหนือ' }
    ],
    correctAnswer: 'A',
    explanation: 'ลานีญาทำให้น่านน้ำแปซิฟิกตะวันตกอุ่นขึ้น ส่งผลให้เอเชียตะวันออกเฉียงใต้และไทยมีฝนตกชุกมากกว่าค่าเฉลี่ยปกติ',
    hint: 'เอลนีโญ = แห้งแล้ง / ลานีญา = ฝนตกชุก น้ำมาก'
  },
  {
    id: 60,
    subjectCode: 'SOC',
    subjectName: 'A-Level สังคมศึกษา',
    category: 'ศาสนาและจริยธรรม',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'easy',
    difficultyLabel: 'ง่าย',
    questionText: 'หลักธรรมในอริยสัจ 4 ข้อใดเปรียบเสมือน "สาเหตุที่แท้จริงของการเกิดทุกข์"?',
    options: [
      { key: 'A', text: 'สมุทัย (ตัณหาความอยาก)' },
      { key: 'B', text: 'ทุกข์ (สภาพทนได้ยาก)' },
      { key: 'C', text: 'นิโรธ (ความดับทุกข์)' },
      { key: 'D', text: 'มรรค (หนทางปฏิบัติ)' }
    ],
    correctAnswer: 'A',
    explanation: 'สมุทัย คือเหตุเกิดแห่งทุกข์ ได้แก่ กามตัณหา ภวตัณหา และวิภวตัณหา',
    hint: 'สมุทัย = แหล่งกำเนิดสาเหตุของความทุกข์'
  },
  {
    id: 61,
    subjectCode: 'TPAT3',
    subjectName: 'TPAT 3 วิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์',
    category: 'เทคโนโลยีและคอมพิวเตอร์',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'medium',
    difficultyLabel: 'ปานกลาง',
    questionText: 'โปรโตคอลความปลอดภัย "HTTPS" มีความแตกต่างจาก "HTTP" ธรรมดาอย่างไรในแง่ของระบบเครือข่าย?',
    options: [
      { key: 'A', text: 'มีการเข้ารหัสลับข้อมูลผ่าน SSL/TLS เพื่อป้องกันการดักจับข้อมูลระหว่างทาง' },
      { key: 'B', text: 'ทำให้ดาวน์โหลดไฟล์วิดีโอได้เร็วขึ้น 10 เท่า' },
      { key: 'C', text: 'ใช้กับเฉพาะระบบปฏิบัติการมือถือเท่านั้น' },
      { key: 'D', text: 'ไม่ต้องเชื่อมต่อกับเซิร์ฟเวอร์ปลายทาง' }
    ],
    correctAnswer: 'A',
    explanation: 'HTTPS ย่อมาจาก Hypertext Transfer Protocol Secure มีการเข้ารหัสผ่าน SSL/TLS เพื่อความปลอดภัยและความลับของข้อมูล',
    hint: 'ตัว S ย่อมาจาก Secure มีการเข้ารหัสความปลอดภัย'
  },
  {
    id: 62,
    subjectCode: 'TGAT1',
    subjectName: 'TGAT 1 การสื่อสารภาษาอังกฤษ',
    category: 'Error Identification & Structure',
    yearLabel: '(ข้อสอบชุด ปี 67)',
    difficulty: 'hard',
    difficultyLabel: 'ท้าทาย',
    questionText: 'Identify the grammatically incorrect part:\n"Neither the faculty dean (A) nor the department professors (B) was able to attend (C) the international media symposium yesterday (D)."',
    options: [
      { key: 'A', text: 'Neither the faculty dean' },
      { key: 'B', text: 'nor the department professors' },
      { key: 'C', text: 'was able to attend' },
      { key: 'D', text: 'the international media symposium yesterday' }
    ],
    correctAnswer: 'C',
    explanation: 'ในโครงสร้าง Neither A nor B กริยาต้องผันตามประธานตัวหลัง (B) ซึ่งในที่นี้คือ professors (พหูพจน์) จึงต้องแก้ "was able to" เป็น "were able to attend"',
    hint: 'กฎ Neither A nor B: ผันกริยาตามคำนามที่อยู่ใกล้ที่สุด (professors)'
  }
];
