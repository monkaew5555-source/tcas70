import { UniversityTarget } from '../types';

export interface UniversityOption {
  id: string;
  name: string;
  shortName: string;
  logoText: string;
  faculties: {
    facultyName: string;
    programs: {
      programName: string;
      code: string;
      round: string;
      seats: number;
      applicantRatio: string;
      gpaxRequired: number;
      chance: 'สูงมาก' | 'ปานกลาง' | 'ท้าทาย';
      tuitionEstimate: number;
      requiredExams: string[];
      portfolioTips: string[];
      priorityOrderAdvice: string[];
      officialUrl: string;
      officialSearchQuery: string;
      highlights: string[];
      criteria: {
        name: string;
        weight: string;
        currentScore: string;
        status: 'ผ่านเกณฑ์ปลอดภัย' | 'พร้อมยื่น' | 'ผ่านเกินเกณฑ์' | 'พร้อมในเกณฑ์ดี';
      }[];
    }[];
  }[];
}

export const UNIVERSITY_DATABASE: UniversityOption[] = [
  {
    id: 'kku',
    name: 'มหาวิทยาลัยขอนแก่น (KKU)',
    shortName: 'มข.',
    logoText: 'KKU',
    faculties: [
      {
        facultyName: 'วิทยาลัยนานาชาติ (KKUIC)',
        programs: [
          {
            programName: 'สาขาวิชาเทคโนโลยีสื่อสร้างสรรค์ (Creative Media Technology - B.A.)',
            code: 'KKU-INTL-042',
            round: 'รอบ 1 Portfolio',
            seats: 35,
            applicantRatio: '1:4',
            gpaxRequired: 2.75,
            chance: 'สูงมาก',
            tuitionEstimate: 48000,
            requiredExams: ['TGAT 1 การสื่อสารภาษาอังกฤษ (ขั้นต่ำ 60 คะแนน)', 'การสอบสัมภาษณ์ภาษาอังกฤษ 100%'],
            portfolioTips: [
              'ผลงานด้าน Creative Media, วิดีโอสั้น หรือแอนิเมชัน 3-5 ชิ้น พร้อมแนบลิงก์รับชมออนไลน์',
              'โปสเตอร์/กราฟิกดีไซน์ที่แสดงสไตล์และอัตลักษณ์ของตนเอง',
              'เขียนอธิบายเบื้องหลังและแนวคิด (Concept & Reflection) เป็นภาษาอังกฤษ',
              'คลิป Personal Statement ภาษาอังกฤษความยาว 2 นาที',
              'เกียรติบัตรการแข่งขันด้านสื่อ นวัตกรรม หรือทักษะภาษาอังกฤษ'
            ],
            priorityOrderAdvice: [
              'ขั้นตอนที่ 1: ตรวจเช็ค GPAX 5 ภาคเรียนให้ผ่านเกณฑ์ 2.75',
              'ขั้นตอนที่ 2: ร่างบทสัมภาษณ์ภาษาอังกฤษ 2 นาที และฝึกซ้อมการออกเสียง',
              'ขั้นตอนที่ 3: จัดหน้า Portfolio 10 หน้าให้มีผลงานหลัก 5 ชิ้น และคำอธิบายภาษาอังกฤษ',
              'ขั้นตอนที่ 4: ติวและเก็งคำศัพท์ TGAT 1 พาร์ต Reading & Context Clues'
            ],
            officialUrl: 'https://www.ic.kku.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยขอนแก่น+วิทยาลัยนานาชาติ',
            highlights: [
              'หลักสูตรนานาชาติภาษาอังกฤษ 100% พร้อมอุปกรณ์สตูดิโอดิจิทัลระดับสากล',
              'โอกาสแลกเปลี่ยนกับมหาวิทยาลัยในญี่ปุ่นและเกาหลีใต้ 1 ภาคการศึกษา',
              'เครือข่ายศิษย์เก่าในวงการโปรดักชันและดิจิทัลมีเดียชั้นนำ'
            ],
            criteria: [
              { name: '1. เกรดเฉลี่ยสะสม (GPAX 5 ภาคเรียน)', weight: 'คุณสมบัติขั้นต่ำ 2.75', currentScore: 'กำลังประเมิน', status: 'พร้อมยื่น' },
              { name: '2. แฟ้มสะสมผลงาน (Portfolio 10 หน้า)', weight: '40% ของคะแนนรวม', currentScore: 'กำลังจัดทำ', status: 'พร้อมยื่น' },
              { name: '3. ทักษะภาษาอังกฤษ (TGAT 1 หรือคะแนนเทียบเท่า)', weight: '20% ของคะแนนรวม', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: '4. สอบสัมภาษณ์ภาษาอังกฤษ', weight: '40% ของคะแนนรวม', currentScore: 'เตรียมซ้อม', status: 'พร้อมในเกณฑ์ดี' }
            ]
          },
          {
            programName: 'สาขาวิชาธุรกิจระหว่างประเทศ (International Business)',
            code: 'KKU-INTL-011',
            round: 'รอบ 1 Portfolio',
            seats: 40,
            applicantRatio: '1:5',
            gpaxRequired: 2.75,
            chance: 'ปานกลาง',
            tuitionEstimate: 45000,
            requiredExams: ['TGAT 1 ภาษาอังกฤษ', 'TGAT 2 การคิดอย่างมีเหตุผล', 'สัมภาษณ์ภาษาอังกฤษ'],
            portfolioTips: [
              'โครงงานธุรกิจหรือแผนการตลาดจำลองในโรงเรียน',
              'ผลงานการเข้าร่วมค่ายบริหารธุรกิจหรือประกวดสตาร์ทอัป',
              'กิจกรรมอาสาและทักษะภาวะผู้นำ (Leadership Activities)'
            ],
            priorityOrderAdvice: [
              '1. รักษาเกรดเฉลี่ยวิชาคณิตศาสตร์และภาษาอังกฤษให้สูงกว่า 3.00',
              '2. จัดเตรียมหลักฐานการทำกิจกรรมและใบรับรองความเป็นผู้นำ',
              '3. ซ้อมการนำเสนอไอเดียธุรกิจเป็นภาษาอังกฤษเบื้องต้น'
            ],
            officialUrl: 'https://www.ic.kku.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยขอนแก่น+International+Business',
            highlights: ['เน้นการค้าระหว่างประเทศในภูมิภาคอาเซียนและจีน', 'มีวิชาสหกิจศึกษาฝึกงานต่างประเทศ'],
            criteria: [
              { name: 'GPAX 5 เทอม', weight: 'ขั้นต่ำ 2.75', currentScore: 'กำลังประเมิน', status: 'พร้อมยื่น' },
              { name: 'Portfolio ด้านธุรกิจและกิจกรรม', weight: '50%', currentScore: 'กำลังจัดทำ', status: 'พร้อมยื่น' }
            ]
          }
        ]
      },
      {
        facultyName: 'คณะวิศวกรรมศาสตร์',
        programs: [
          {
            programName: 'สาขาวิชาวิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์ (Computer & AI Engineering)',
            code: 'KKU-ENG-007',
            round: 'รอบ 2 โควตา / รอบ 3 Admission',
            seats: 45,
            applicantRatio: '1:8',
            gpaxRequired: 3.00,
            chance: 'ท้าทาย',
            tuitionEstimate: 21000,
            requiredExams: ['TGAT รวม 20%', 'TPAT 3 ความถนัดวิทยาศาสตร์และวิศวกรรม 30%', 'A-Level คณิต 1 (25%)', 'A-Level ฟิสิกส์ (25%)'],
            portfolioTips: [
              'ผลงานโครงงานวิทยาศาสตร์ นวัตกรรม หุ่นยนต์ หรือ IoT',
              'คลังโค้ด GitHub แสดงผลงานการเขียนโปรแกรม (Python, C++, JavaScript)',
              'เกียรติบัตรการแข่งขันโอลิมปิกวิชาการ สอวน. คอมพิวเตอร์ หรือ Hackathon',
              'เกรดเฉลี่ยกลุ่มสาระคณิตศาสตร์และวิทยาศาสตร์ไม่ต่ำกว่า 3.00'
            ],
            priorityOrderAdvice: [
              'ขั้นตอนที่ 1: ตะลุยโจทย์ TPAT 3 พาร์ตความถนัดเชิงกล มิติสัมพันธ์ และฟิสิกส์ประยุกต์',
              'ขั้นตอนที่ 2: เก็บคะแนน A-Level คณิต 1 และฟิสิกส์ให้เกิน 60+',
              'ขั้นตอนที่ 3: ฝึกทำ Mock Exam เสมือนจริงจับเวลา 3 ชั่วโมง',
              'ขั้นตอนที่ 4: สำหรับรอบพอร์ตเตรียมลิงก์ Demo โปรเจกต์ให้เปิดดูง่าย'
            ],
            officialUrl: 'https://en.kku.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยขอนแก่น+วิศวกรรมคอมพิวเตอร์',
            highlights: ['หลักสูตรรับรองมาตรฐานสากล ABET', 'มีศูนย์วิจัยปัญญาประดิษฐ์ AI Lab ร่วมกับภาคอุตสาหกรรม'],
            criteria: [
              { name: 'TGAT 1-2-3 รวม', weight: '20%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'TPAT 3 ความถนัดวิศวกรรม', weight: '30%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'A-Level คณิต 1 + ฟิสิกส์', weight: '50%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'buu',
    name: 'มหาวิทยาลัยบูรพา (BUU)',
    shortName: 'ม.บูรพา',
    logoText: 'BUU',
    faculties: [
      {
        facultyName: 'คณะวิศวกรรมศาสตร์',
        programs: [
          {
            programName: 'สาขาวิชาวิศวกรรมเครื่องกลและการผลิต (Mechanical & Manufacturing Engineering)',
            code: 'BUU-ENG-012',
            round: 'รอบ 1 Portfolio / รอบ 2 โควตาภาคตะวันออก',
            seats: 50,
            applicantRatio: '1:3.5',
            gpaxRequired: 2.75,
            chance: 'สูงมาก',
            tuitionEstimate: 19500,
            requiredExams: ['TPAT 3 ความถนัดด้านวิทยาศาสตร์ เทคโนโลยี และวิศวกรรมศาสตร์', 'TGAT รวม', 'A-Level คณิต 1', 'A-Level ฟิสิกส์'],
            portfolioTips: [
              'โครงงานสิ่งประดิษฐ์ งานกลไก เครื่องยนต์ หรืองานประดิษฐ์ทางวิทยาศาสตร์',
              'เกียรติบัตรการประกวดโครงงานสะเต็มศึกษา (STEM Project)',
              'หลักฐานการเข้าร่วมค่ายวิศวกรรมศาสตร์ หรือฝึกทักษะโรงงานช่าง',
              'GPAX 5 ภาคเรียนไม่ต่ำกว่า 2.75 โดยเฉพาะหมวดวิทย์-คณิต'
            ],
            priorityOrderAdvice: [
              'ขั้นตอนที่ 1: ตรวจสอบโควตา 12 จังหวัดภาคตะวันออก (ถ้าอยู่ในเขตมีสิทธิพิเศษ)',
              'ขั้นตอนที่ 2: ฟิตทำโจทย์ TPAT 3 หมวดการคิดเชิงตรรกะและฟิสิกส์',
              'ขั้นตอนที่ 3: สรุปเล่มโครงงานที่เคยทำลง Portfolio ไม่เกิน 10 หน้า',
              'ขั้นตอนที่ 4: ซ้อมสัมภาษณ์อธิบายกลไกการทำงานของสิ่งประดิษฐ์ที่ใส่ในพอร์ต'
            ],
            officialUrl: 'https://eng.buu.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยบูรพา+วิศวกรรมศาสตร์',
            highlights: [
              'ตั้งอยู่ในทำเลทองระเบียงเศรษฐกิจภาคตะวันออก (EEC) โอกาสงานสูงมาก',
              'ร่วมมือกับนิคมอุตสาหกรรมแหลมฉบังและมาบตาพุด ฝึกงานจริง'
            ],
            criteria: [
              { name: 'GPAX ขั้นต่ำ 2.75', weight: 'คุณสมบัติ', currentScore: 'กำลังประเมิน', status: 'พร้อมยื่น' },
              { name: 'TPAT 3 วิศวกรรมศาสตร์', weight: '40%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'A-Level คณิต 1 + ฟิสิกส์', weight: '40%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'TGAT', weight: '20%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' }
            ]
          },
          {
            programName: 'สาขาวิชาวิศวกรรมเคมี (Chemical Engineering)',
            code: 'BUU-ENG-015',
            round: 'รอบ 2 โควตา / รอบ 3 Admission',
            seats: 40,
            applicantRatio: '1:4',
            gpaxRequired: 2.75,
            chance: 'ปานกลาง',
            tuitionEstimate: 20000,
            requiredExams: ['TPAT 3', 'TGAT', 'A-Level เคมี', 'A-Level คณิต 1', 'A-Level ฟิสิกส์'],
            portfolioTips: ['โครงงานวิทยาศาสตร์เคมีหรือสิ่งแวดล้อม', 'ผลการทดลองในห้องปฏิบัติการและสะท้อนผลการเรียนรู้'],
            priorityOrderAdvice: ['1. เน้นเก็บคะแนนเคมีและฟิสิกส์ A-Level', '2. ทำแบบฝึกหัด TPAT 3 ให้คล่อง'],
            officialUrl: 'https://eng.buu.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยบูรพา+วิศวกรรมเคมี',
            highlights: ['สอดรับกับอุตสาหกรรมปิโตรเคมีและพลังงานในภาคตะวันออก'],
            criteria: [
              { name: 'TPAT 3', weight: '35%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'A-Level เคมี + คณิต + ฟิสิกส์', weight: '45%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' }
            ]
          }
        ]
      },
      {
        facultyName: 'คณะวิทยาการสารสนเทศ',
        programs: [
          {
            programName: 'สาขาวิชาวิทยาการคอมพิวเตอร์และเทคโนโลยีดิจิทัล',
            code: 'BUU-IF-002',
            round: 'รอบ 1 Portfolio / รอบ 2 โควตา',
            seats: 60,
            applicantRatio: '1:4.5',
            gpaxRequired: 2.50,
            chance: 'สูงมาก',
            tuitionEstimate: 18000,
            requiredExams: ['TGAT รวม', 'TPAT 3 หรือ A-Level คณิต 1'],
            portfolioTips: [
              'ผลงานการเขียนโปรแกรม เว็บไซต์ โมบายแอปพลิเคชัน หรือเกม',
              'โครงงานแก้ปัญหาชุมชนหรือโรงเรียนด้วยเทคโนโลยี'
            ],
            priorityOrderAdvice: [
              '1. บันทึกผลงานโค้ดลง GitHub หรือทำเป็นคลิปสาธิตสั้นๆ',
              '2. เตรียมสอบ TGAT2 (การคิดเชิงเหตุผล) และ TGAT3'
            ],
            officialUrl: 'https://www.informatics.buu.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยบูรพา+วิทยาการสารสนเทศ',
            highlights: ['ศูนย์บ่มเพาะนักพัฒนาระบบซอฟต์แวร์สู่ภาคอุตสาหกรรมดิจิทัล EEC'],
            criteria: [
              { name: 'Portfolio ผลงานโค้ด', weight: '50%', currentScore: 'กำลังจัดทำ', status: 'พร้อมยื่น' },
              { name: 'GPAX 2.50+', weight: 'คุณสมบัติ', currentScore: 'กำลังประเมิน', status: 'ผ่านเกณฑ์ปลอดภัย' }
            ]
          }
        ]
      },
      {
        facultyName: 'คณะมนุษยศาสตร์และสังคมศาสตร์',
        programs: [
          {
            programName: 'สาขาวิชานิเทศศาสตร์ (Communication Arts)',
            code: 'BUU-HUM-009',
            round: 'รอบ 1 Portfolio / รอบ 3 Admission',
            seats: 45,
            applicantRatio: '1:5.2',
            gpaxRequired: 2.50,
            chance: 'สูงมาก',
            tuitionEstimate: 16000,
            requiredExams: ['TGAT 1 การสื่อสารภาษาอังกฤษ', 'TGAT 2 การคิดอย่างมีเหตุผล', 'TGAT 3 สมรรถนะการทำงาน'],
            portfolioTips: [
              'ผลงานการผลิตสื่อ คลิปสั้น หนังสั้น การเขียนบท หรือพอดแคสต์',
              'ภาพถ่ายสารคดีหรือโฟโต้เซตเล่าเรื่อง (Visual Storytelling)',
              'ผลงานออกแบบกราฟิก ประชาสัมพันธ์ หรือแคมเปญโซเชียลมีเดีย'
            ],
            priorityOrderAdvice: [
              '1. รวบรวมคอนเทนต์ที่มีผู้เข้าชมจริง หรือผลงานที่สะท้อนมุมมองความคิดสร้างสรรค์',
              '2. ตะลุยโจทย์ TGAT 1-2-3 ให้ได้เฉลี่ย 65+ เพื่อยื่นรอบ Admission เป็นแผนสำรอง'
            ],
            officialUrl: 'https://huso.buu.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยบูรพา+นิเทศศาสตร์',
            highlights: ['สตูดิโอดิจิทัลและวิทยุกระจายเสียงของคณะ ติดชายหาดบางแสน บรรยากาศสร้างสรรค์'],
            criteria: [
              { name: 'Portfolio สื่อสร้างสรรค์', weight: '50%', currentScore: 'กำลังจัดทำ', status: 'พร้อมยื่น' },
              { name: 'TGAT รวม', weight: '50%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cu',
    name: 'จุฬาลงกรณ์มหาวิทยาลัย (CU)',
    shortName: 'จุฬาฯ',
    logoText: 'CU',
    faculties: [
      {
        facultyName: 'คณะนิเทศศาสตร์',
        programs: [
          {
            programName: 'หลักสูตรนิเทศศาสตรบัณฑิต (การภาพยนตร์และภาพนิ่ง / วารสารสนเทศ)',
            code: 'CU-COMM-001',
            round: 'รอบ 1 Portfolio / รอบ 3 Admission',
            seats: 30,
            applicantRatio: '1:15',
            gpaxRequired: 3.25,
            chance: 'ท้าทาย',
            tuitionEstimate: 21000,
            requiredExams: ['TGAT 1 การสื่อสารภาษาอังกฤษ (30%)', 'TGAT 2 การคิดเชิงเหตุผล (20%)', 'A-Level สังคมศึกษา (25%)', 'A-Level ภาษาไทย (25%)'],
            portfolioTips: [
              'ผลงานภาพยนตร์สั้นระดับรางวัลหรือคัดเลือกฉายในเทศกาลภาพยนตร์',
              'บทความวิจารณ์สื่อ การเขียนเชิงสืบสวน หรือสารคดีเชิงลึก',
              'เรียงความภาษาอังกฤษแสดงทัศนคติที่มีต่อสังคมและสื่อมวลชน'
            ],
            priorityOrderAdvice: [
              'ขั้นตอนที่ 1: ตรวจเช็คคุณสมบัติ GPAX ขั้นต่ำ 3.25+',
              'ขั้นตอนที่ 2: ฟิตทำคะแนน TGAT 1 ให้แตะ 75+ เพื่อสร้างความได้เปรียบ',
              'ขั้นตอนที่ 3: ฝึกเขียนเรียงความและเตรียมตอบคำถามสัมภาษณ์เชิงวิพากษ์'
            ],
            officialUrl: 'https://www.commarts.chula.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=จุฬาลงกรณ์มหาวิทยาลัย+นิเทศศาสตร์',
            highlights: ['สถาบันชั้นนำด้านนิเทศศาสตร์ของไทย ผลิตผู้กำกับและนักสื่อสารมวลชนระดับประเทศ'],
            criteria: [
              { name: 'GPAX 5 ภาคเรียน 3.25+', weight: 'คุณสมบัติ', currentScore: 'กำลังประเมิน', status: 'พร้อมยื่น' },
              { name: 'TGAT รวม', weight: '50%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'A-Level ภาษาไทย + สังคม', weight: '50%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' }
            ]
          }
        ]
      },
      {
        facultyName: 'คณะวิศวกรรมศาสตร์',
        programs: [
          {
            programName: 'วิศวกรรมศาสตร์ (รวม)',
            code: 'CU-ENG-001',
            round: 'รอบ 3 Admission',
            seats: 350,
            applicantRatio: '1:9',
            gpaxRequired: 3.00,
            chance: 'ท้าทาย',
            tuitionEstimate: 21000,
            requiredExams: ['TGAT รวม 20%', 'TPAT 3 ความถนัดวิศวกรรม 30%', 'A-Level คณิต 1 (20%)', 'A-Level ฟิสิกส์ (20%)', 'A-Level เคมี (10%)'],
            portfolioTips: ['โครงงานนวัตกรรม เหรียญรางวัลระดับชาติ สอวน. ค่าย 2 ขึ้นไป'],
            priorityOrderAdvice: ['1. เน้นทำโจทย์ A-Level คณิตและฟิสิกส์ย้อนหลัง 5 ปี', '2. ฝึก Speed Test TPAT 3 ให้ทันเวลา'],
            officialUrl: 'https://www.eng.chula.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=จุฬาลงกรณ์มหาวิทยาลัย+วิศวกรรมศาสตร์',
            highlights: ['คณะวิศวะอันดับ 1 ของประเทศ ศิษย์เก่าและเครือข่ายอุตสาหกรรมเข้มแข็ง'],
            criteria: [
              { name: 'TPAT 3', weight: '30%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'A-Level คณิต 1 + ฟิสิกส์ + เคมี', weight: '50%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'TGAT รวม', weight: '20%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tu',
    name: 'มหาวิทยาลัยธรรมศาสตร์ (TU)',
    shortName: 'มธ.',
    logoText: 'TU',
    faculties: [
      {
        facultyName: 'คณะวารสารศาสตร์และสื่อสารมวลชน',
        programs: [
          {
            programName: 'สาขาวิชาวิทยุกระจายเสียงและวิทยุโทรทัศน์ / ภาพยนตร์',
            code: 'TU-JC-003',
            round: 'รอบ 1 Portfolio / รอบ 3 Admission',
            seats: 60,
            applicantRatio: '1:10',
            gpaxRequired: 3.00,
            chance: 'ปานกลาง',
            tuitionEstimate: 19000,
            requiredExams: ['TGAT 1-2-3 รวม 50%', 'A-Level สังคม + ภาษาไทย 50%'],
            portfolioTips: ['ผลงานสื่อที่สะท้อนประเด็นสังคม สิทธิ เสรีภาพ และความคิดสร้างสรรค์'],
            priorityOrderAdvice: ['1. เตรียมแฟ้มผลงานด้านสื่อและการทำกิจกรรมเพื่อสังคม', '2. ฝึกทำข้อสอบ TGAT ให้แตะ 70+'],
            officialUrl: 'https://jc.tu.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยธรรมศาสตร์+วารสารศาสตร์',
            highlights: ['มุ่งเน้นเสรีภาพทางวิชาการและบทบาทของสื่อมวลชนต่อการเปลี่ยนแปลงสังคม'],
            criteria: [
              { name: 'TGAT 1-2-3', weight: '50%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'A-Level สังคม/ไทย', weight: '50%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' }
            ]
          }
        ]
      },
      {
        facultyName: 'คณะวิศวกรรมศาสตร์',
        programs: [
          {
            programName: 'วิศวกรรมคอมพิวเตอร์และซอฟต์แวร์ (TSE)',
            code: 'TU-ENG-005',
            round: 'รอบ 1 Portfolio / รอบ 3 Admission',
            seats: 40,
            applicantRatio: '1:6',
            gpaxRequired: 2.75,
            chance: 'ปานกลาง',
            tuitionEstimate: 23500,
            requiredExams: ['TPAT 3 (30%)', 'TGAT (20%)', 'A-Level คณิต 1 (25%)', 'A-Level ฟิสิกส์ (25%)'],
            portfolioTips: ['ผลงานการพัฒนาแอปพลิเคชัน โค้ดโปรเจกต์ หรือการแข่งขันวิทยาการคอมพิวเตอร์'],
            priorityOrderAdvice: ['1. ติวเจาะลึก TPAT 3 เชิงตรรกะและฟิสิกส์', '2. เก็บคะแนน A-Level คณิต 1'],
            officialUrl: 'https://engr.tu.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยธรรมศาสตร์+วิศวกรรมคอมพิวเตอร์',
            highlights: ['ศูนย์รังสิต ห้องแล็บทันสมัย เชื่อมโยงกับนวัตกรรมและผู้ประกอบการยุคใหม่'],
            criteria: [
              { name: 'TPAT 3', weight: '30%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'A-Level คณิต 1 + ฟิสิกส์', weight: '50%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cmu',
    name: 'มหาวิทยาลัยเชียงใหม่ (CMU)',
    shortName: 'มช.',
    logoText: 'CMU',
    faculties: [
      {
        facultyName: 'คณะการสื่อสารมวลชน',
        programs: [
          {
            programName: 'สาขาวิชาภาพยนตร์และสื่อดิจิทัล (Digital Film & Media)',
            code: 'CMU-MASS-018',
            round: 'รอบ 1 Portfolio / รอบ 2 โควตาภาคเหนือ',
            seats: 35,
            applicantRatio: '1:6',
            gpaxRequired: 2.50,
            chance: 'สูงมาก',
            tuitionEstimate: 18000,
            requiredExams: ['TGAT รวม 50%', 'การประเมิน Portfolio และสัมภาษณ์ 50%'],
            portfolioTips: [
              'ผลงานภาพยนตร์สั้น สารคดีท้องถิ่น หรือภาพถ่ายเชิงศิลปวัฒนธรรม',
              'บทความวิจารณ์ภาพยนตร์หรือโครงเรื่องที่อยากผลิตในอนาคต'
            ],
            priorityOrderAdvice: ['1. ปรับ Portfolio 10 หน้าให้มีชิ้นงานเด่น 3-5 ชิ้น', '2. ติว TGAT1 และ TGAT2'],
            officialUrl: 'https://masscomm.cmu.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=มหาวิทยาลัยเชียงใหม่+การสื่อสารมวลชน',
            highlights: ['มีศูนย์ปฏิบัติการด้านเสียงและสตูดิโอภาพยนตร์ขนาดใหญ่ในภาคเหนือ'],
            criteria: [
              { name: 'Portfolio สื่อสร้างสรรค์', weight: '50%', currentScore: 'กำลังจัดทำ', status: 'พร้อมยื่น' },
              { name: 'GPAX 2.50+', weight: 'คุณสมบัติ', currentScore: 'กำลังประเมิน', status: 'ผ่านเกณฑ์ปลอดภัย' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'kmitl',
    name: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL)',
    shortName: 'สจล.',
    logoText: 'KMITL',
    faculties: [
      {
        facultyName: 'คณะวิศวกรรมศาสตร์',
        programs: [
          {
            programName: 'วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (Robotics & AI Engineering)',
            code: 'KMITL-RAI-001',
            round: 'รอบ 1 Portfolio / รอบ 3 Admission',
            seats: 40,
            applicantRatio: '1:7.5',
            gpaxRequired: 3.00,
            chance: 'ท้าทาย',
            tuitionEstimate: 35000,
            requiredExams: ['TPAT 3 (40%)', 'TGAT (20%)', 'A-Level คณิต 1 (20%)', 'A-Level ฟิสิกส์ (20%)'],
            portfolioTips: ['โครงงานสร้างหุ่นยนต์ แขนกล การเขียนโค้ด ROS/Python หรือการแข่งขันประกวดนวัตกรรม'],
            priorityOrderAdvice: ['1. ถ่ายคลิปสาธิตการทำงานของหุ่นยนต์หรือโปรเจกต์', '2. ลุยข้อสอบ TPAT 3 อย่างหนัก'],
            officialUrl: 'https://www.kmitl.ac.th',
            officialSearchQuery: 'https://www.mytcas.com/search?q=ลาดกระบัง+Robotics+and+AI',
            highlights: ['แล็บหุ่นยนต์ระดับสากล ทำงานร่วมกับอุตสาหกรรม Automation ชั้นนำ'],
            criteria: [
              { name: 'TPAT 3', weight: '40%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' },
              { name: 'A-Level คณิต 1 + ฟิสิกส์', weight: '40%', currentScore: 'รอสอบ/กรอกคะแนน', status: 'พร้อมยื่น' }
            ]
          }
        ]
      }
    ]
  }
];

// Helper to convert an option to UniversityTarget
export function convertProgramToTarget(
  uniOption: UniversityOption,
  facultyName: string,
  prog: UniversityOption['faculties'][0]['programs'][0]
): UniversityTarget {
  return {
    id: `${uniOption.id}-${prog.code}`,
    rank: 1,
    name: uniOption.name,
    faculty: facultyName,
    program: prog.programName,
    code: prog.code,
    round: prog.round,
    seats: prog.seats,
    applicantRatio: prog.applicantRatio,
    gpaxRequired: prog.gpaxRequired,
    readinessPercentage: 45, // starts clean
    chance: prog.chance,
    highlights: prog.highlights,
    criteria: prog.criteria,
    requiredExams: prog.requiredExams,
    portfolioTips: prog.portfolioTips,
    priorityOrderAdvice: prog.priorityOrderAdvice,
    officialUrl: prog.officialUrl,
    officialSearchQuery: prog.officialSearchQuery,
    tuitionEstimate: prog.tuitionEstimate,
  };
}
