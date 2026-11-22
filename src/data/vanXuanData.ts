export interface ConsultationTopic {
  id: string;
  index: string;
  title: string;
  question: string;
  summary: string;
  points: string[];
  outcome: string;
  ctaLabel: string;
}

export interface OutcomeCard {
  index: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface TaxObligation {
  title: string;
  cadence: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BranchInfo {
  label: string;
  address: string;
}

export type PolicyKey = 'privacy' | 'terms' | 'fee';

export interface PolicyDocument {
  title: string;
  sections: { heading: string; body: string }[];
}

export const COMPANY_INFO = {
  shortName: 'Kế toán Vạn Xuân',
  legalName: 'CÔNG TY TNHH DỊCH VỤ DOANH NGHIỆP VẠN XUÂN',
  slogan: 'Luôn đồng hành cùng Doanh nghiệp',
  hotlineDisplay: '09 3333 7683',
  hotlineTel: '0933337683',
  zaloUrl: 'https://zalo.me/0933337683',
  email: 'kttvanxuan@gmail.com',
  website: 'https://ketoanvanxuan.vn/',
  portalUrl: 'https://dangkykinhdoanh.gov.vn',
  advisoryPrice: '1.500.000đ',
  workingHours: 'Thứ 2 – Thứ 6: 07:50 – 17:00 · Thứ 7: 07:50 – 12:00',
  logoUrl: 'https://ketoanvanxuan.vn/upload/hinhanh/logomobiketoanvanxuan-2306.png',
};

export const MEDIA_ASSETS = {
  team: 'https://ketoanvanxuan.vn/upload/landing/doi-ngu-van-xuan.jpg',
  photo1: 'https://ketoanvanxuan.vn/upload/landing/chung-nhan-attp-quan-do-uong.jpg',
  photo2: 'https://ketoanvanxuan.vn/upload/landing/ho-so-tiem-banh.jpg',
  video: 'https://ketoanvanxuan.vn/upload/landing/van-xuan-video.mp4',
};

export const HERO_CHECKLIST = [
  { label: 'Tên công ty', detail: 'Tránh trùng, gây nhầm lẫn', topicIndex: 1 },
  { label: 'Ngành nghề', detail: 'Đúng nhu cầu & điều kiện', topicIndex: 3 },
  { label: 'Vốn điều lệ', detail: 'Phù hợp khả năng góp vốn', topicIndex: 4 },
  { label: 'Loại hình', detail: 'TNHH hay Cổ phần', topicIndex: 0 },
];

export const CONSULTATION_TOPICS: ConsultationTopic[] = [
  {
    id: 'loai-hinh',
    index: '01',
    title: 'Lựa chọn loại hình',
    question: 'Công ty TNHH hay công ty cổ phần?',
    summary: 'Chọn theo số người góp vốn, cách quản lý và kế hoạch phát triển.',
    points: [
      'So sánh công ty TNHH một thành viên, hai thành viên trở lên và công ty cổ phần.',
      'Phân tích quyền quyết định, trách nhiệm tài sản và cơ cấu quản lý của từng loại hình.',
      'Cân nhắc nhu cầu gọi vốn, thêm người góp vốn và chuyển nhượng về sau.',
    ],
    outcome: 'Hiểu loại hình nào phù hợp và vì sao nên chọn.',
    ctaLabel: 'Trao đổi về lựa chọn loại hình',
  },
  {
    id: 'ten-cong-ty',
    index: '02',
    title: 'Tên công ty',
    question: 'Tên dự kiến có trùng hoặc gây nhầm lẫn không?',
    summary: 'Chọn tên đúng quy định, dễ nhớ và thống nhất trong hồ sơ, giao dịch.',
    points: [
      'Rà soát tên dự kiến so với tên doanh nghiệp đã đăng ký trên toàn quốc.',
      'Kiểm tra cấu trúc tên: loại hình doanh nghiệp và tên riêng; từ ngữ, ký hiệu không được sử dụng.',
      'Cân nhắc tên tiếng Việt, tên tiếng nước ngoài, tên viết tắt và nhu cầu bảo hộ nhãn hiệu về sau.',
    ],
    outcome: 'Biết tên nào có thể sử dụng và điểm cần điều chỉnh.',
    ctaLabel: 'Trao đổi về tên công ty',
  },
  {
    id: 'dia-chi-tru-so',
    index: '03',
    title: 'Địa chỉ trụ sở',
    question: 'Địa chỉ dự kiến có được đặt trụ sở không?',
    summary: 'Kiểm tra chức năng sử dụng của địa điểm trước khi đăng ký.',
    points: [
      'Phân biệt chung cư để ở và công trình hỗn hợp có chức năng thương mại, văn phòng.',
      'Rà soát giấy tờ về quyền sử dụng địa điểm: nhà riêng, nhà thuê, văn phòng.',
      'Lưu ý về cơ quan thuế quản lý và việc thay đổi địa chỉ sau này.',
    ],
    outcome: 'Rõ địa chỉ có phù hợp để đặt trụ sở và giấy tờ cần chuẩn bị.',
    ctaLabel: 'Trao đổi về địa chỉ trụ sở',
  },
  {
    id: 'nganh-nghe',
    index: '04',
    title: 'Ngành nghề kinh doanh',
    question: 'Đăng ký ngành nghề nào cho đúng nhu cầu?',
    summary: 'Chọn mã ngành theo hoạt động thực tế và kế hoạch mở rộng.',
    points: [
      'Đối chiếu hoạt động dự kiến với hệ thống ngành kinh tế hiện hành.',
      'Xác định ngành nghề kinh doanh có điều kiện và giấy phép cần có trước khi hoạt động.',
      'Cân nhắc ngành nghề chính, ngành nghề bổ sung cho giai đoạn tiếp theo.',
    ],
    outcome: 'Danh sách ngành nghề phù hợp và điều kiện kèm theo.',
    ctaLabel: 'Trao đổi về ngành nghề',
  },
  {
    id: 'von-dieu-le',
    index: '05',
    title: 'Vốn điều lệ',
    question: 'Đăng ký mức vốn bao nhiêu là phù hợp?',
    summary: 'Chọn theo khả năng góp vốn thực tế, yêu cầu ngành nghề và nhu cầu giao dịch.',
    points: [
      'Làm rõ ý nghĩa của vốn điều lệ đối với trách nhiệm tài sản của người góp vốn.',
      'Kiểm tra ngành nghề có yêu cầu vốn pháp định, ký quỹ hay không.',
      'Rà soát thời hạn góp vốn, hình thức góp vốn và việc cần làm khi không góp đủ.',
    ],
    outcome: 'Hiểu mức vốn phù hợp và nghĩa vụ góp vốn phải thực hiện.',
    ctaLabel: 'Trao đổi về vốn điều lệ',
  },
  {
    id: 'nguoi-dai-dien',
    index: '06',
    title: 'Người đại diện theo pháp luật',
    question: 'Ai nên là người đại diện theo pháp luật?',
    summary: 'Xác định đúng người, đúng chức danh và phạm vi quyền hạn.',
    points: [
      'Rà soát điều kiện, tư cách của người dự kiến làm đại diện.',
      'Phân tích quyền, nghĩa vụ và trách nhiệm cá nhân của người đại diện.',
      'Cân nhắc chức danh, số lượng người đại diện và việc ủy quyền khi vắng mặt.',
    ],
    outcome: 'Rõ ai đại diện, quyền quyết định và trách nhiệm đi kèm.',
    ctaLabel: 'Trao đổi về người đại diện',
  },
  {
    id: 'nguoi-gop-von',
    index: '07',
    title: 'Người góp vốn',
    question: 'Phân chia tỷ lệ góp vốn thế nào?',
    summary: 'Thống nhất tỷ lệ, quyền biểu quyết và cách xử lý khi có thay đổi.',
    points: [
      'Rà soát tư cách của cá nhân, tổ chức tham gia góp vốn.',
      'Phân tích tỷ lệ góp vốn gắn với quyền biểu quyết và quyền quyết định các vấn đề quan trọng.',
      'Lưu ý các nội dung nên thỏa thuận trước: phân chia lợi nhuận, chuyển nhượng, rút vốn.',
    ],
    outcome: 'Hiểu quyền và nghĩa vụ của từng người góp vốn.',
    ctaLabel: 'Trao đổi về người góp vốn',
  },
];

export const CONSULTATION_OUTCOMES: OutcomeCard[] = [
  {
    index: '01',
    title: 'Thông tin lựa chọn',
    description: 'Loại hình, tên, địa chỉ, ngành nghề và vốn phù hợp kế hoạch kinh doanh.',
  },
  {
    index: '02',
    title: 'Điều kiện phải đáp ứng',
    description: 'Điểm cần kiểm tra về trụ sở, ngành nghề và tư cách người tham gia.',
  },
  {
    index: '03',
    title: 'Trách nhiệm của từng người',
    description: 'Ai góp vốn, ai đại diện, ai có quyền quyết định và nghĩa vụ gì.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Bạn cung cấp dự định',
    description: 'Hoạt động kinh doanh, địa chỉ dự kiến, người cùng góp vốn và những việc bạn còn phân vân.',
  },
  {
    index: '02',
    title: 'Vạn Xuân phân tích phương án',
    description: 'So sánh lựa chọn, rà soát điều kiện, chỉ rõ điểm cần điều chỉnh và trách nhiệm liên quan.',
  },
  {
    index: '03',
    title: 'Bạn lựa chọn phương án',
    description: 'Quyết định sau khi đã hiểu ưu điểm, giới hạn và những việc cần chuẩn bị.',
  },
];

export const SELF_REGISTRATION_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Chọn thông tin doanh nghiệp',
    description: 'Thống nhất loại hình, tên, địa chỉ, ngành nghề, vốn, người đại diện và người góp vốn.',
  },
  {
    index: '02',
    title: 'Đối chiếu hồ sơ cần chuẩn bị',
    description: 'Xem thủ tục và biểu mẫu hiện hành tương ứng với loại hình trên cổng chính thức.',
  },
  {
    index: '03',
    title: 'Tự kê khai và nộp hồ sơ',
    description: 'Chuẩn bị tài liệu, kê khai, xác thực và nộp theo hướng dẫn trên hệ thống chính thức.',
  },
  {
    index: '04',
    title: 'Theo dõi phản hồi của cơ quan đăng ký',
    description: 'Kiểm tra tình trạng hồ sơ, bổ sung theo yêu cầu và đối chiếu thông tin trên kết quả.',
  },
];

export const TAX_OBLIGATIONS: TaxObligation[] = [
  {
    title: 'Thuế giá trị gia tăng — GTGT',
    cadence: 'Trong năm · theo tháng hoặc quý',
    description:
      'Xác định phương pháp tính và kỳ khai ngay từ đầu. Doanh nghiệp mới bắt đầu hoạt động được lựa chọn khai theo quý; vẫn cần kiểm tra nghĩa vụ kê khai khi chưa có doanh thu.',
  },
  {
    title: 'Thuế thu nhập cá nhân — TNCN',
    cadence: 'Tiền lương, tiền công · khai quý và quyết toán năm',
    description:
      'Theo dõi khoản chi trả, số thuế khấu trừ và hồ sơ khai theo quý. Rà soát quyết toán năm và các trường hợp không phải nộp hồ sơ theo quy định.',
  },
  {
    title: 'Thuế thu nhập doanh nghiệp — TNDN',
    cadence: 'Tạm nộp theo quý · quyết toán năm',
    description:
      'Tính số thuế tạm nộp, quyết toán theo nghĩa vụ thực tế và kiểm tra điều kiện miễn, giảm nếu có. Tạm nộp theo quý không đồng nghĩa với việc phải lập tờ khai TNDN quý.',
  },
  {
    title: 'Báo cáo tài chính cuối năm',
    cadence: 'Công việc kế toán cần theo dõi riêng',
    description:
      'Rà soát sổ sách và lập báo cáo tài chính theo chế độ kế toán áp dụng. Đây là báo cáo kế toán, không phải một loại tờ khai thuế.',
  },
];

export const TAX_FIRST_YEAR_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Xác định việc thuế phải làm',
    description: 'Rà soát hoạt động, xác định tờ khai áp dụng và lập lịch kê khai, nộp thuế cho từng kỳ.',
  },
  {
    index: '02',
    title: 'Hướng dẫn chứng từ cần cung cấp',
    description: 'Lập danh sách hóa đơn, chứng từ, bảng lương và dữ liệu doanh nghiệp cần bàn giao.',
  },
  {
    index: '03',
    title: 'Kiểm tra số liệu, lập tờ khai',
    description: 'Đối chiếu dữ liệu nhận được; thông báo điểm thiếu, chưa hợp lý trước khi lập hồ sơ.',
  },
  {
    index: '04',
    title: 'Gửi hồ sơ và số thuế để bạn kiểm tra',
    description: 'Làm rõ số liệu kê khai, số thuế dự kiến phải nộp và nội dung cần xác nhận.',
  },
  {
    index: '05',
    title: 'Theo dõi nộp hồ sơ và bàn giao kết quả',
    description: 'Phối hợp ký, nộp theo thẩm quyền hợp lệ; lưu và bàn giao hồ sơ, thông báo của hệ thống.',
  },
  {
    index: '06',
    title: 'Thực hiện phần việc cuối năm',
    description: 'Lập quyết toán thuế, báo cáo tài chính khi thuộc phạm vi hợp đồng và có đủ dữ liệu cần thiết.',
  },
];

export const LEGAL_REFERENCES = [
  'Thông tư 89/2026/TT-BTC — Điều 19, 21, 22',
  'Hướng dẫn xác định nghĩa vụ khai, nộp thuế',
  'Chế độ kế toán doanh nghiệp — TT 99/2025',
  'Hướng dẫn về lệ phí môn bài từ năm 2026',
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Chưa chọn được loại hình hoặc mức vốn, tôi nên chuẩn bị gì?',
    answer:
      'Bạn chỉ cần mô tả hoạt động dự kiến, số người cùng góp vốn, nguồn vốn và kế hoạch phát triển. Vạn Xuân dựa trên các thông tin đó để so sánh phương án và làm rõ trách nhiệm của từng lựa chọn.',
  },
  {
    question: 'Được tư vấn rồi, tôi có thể tự đăng ký doanh nghiệp không?',
    answer:
      'Có. Sau khi lựa chọn thông tin phù hợp, bạn có thể tự tìm hiểu thủ tục, biểu mẫu và nộp hồ sơ trên hệ thống chính thức. Cơ quan đăng ký kinh doanh xem xét, quyết định kết quả; tư vấn không đồng nghĩa với bảo đảm hồ sơ được chấp thuận.',
  },
  {
    question: 'Công ty chưa có doanh thu có phải khai thuế không?',
    answer:
      'Chưa có doanh thu không đồng nghĩa được bỏ toàn bộ hồ sơ thuế. Cần kiểm tra tình trạng hoạt động, từng loại thuế và các trường hợp được miễn nộp hồ sơ. Vạn Xuân xác định nghĩa vụ cụ thể trước khi lập lịch khai thuế cho doanh nghiệp.',
  },
  {
    question: 'Vạn Xuân có làm quyết toán thuế và báo cáo tài chính cuối năm không?',
    answer:
      'Có thể đưa vào phạm vi dịch vụ. Vạn Xuân rà soát dữ liệu kế toán, tình trạng hồ sơ và nhu cầu để thống nhất công việc, trách nhiệm cung cấp chứng từ và mức phí. Bạn cần xác định rõ phần cuối năm có trong hợp đồng trước khi sử dụng dịch vụ.',
  },
  {
    question: 'Phí tư vấn và khai thuế được tính thế nào?',
    answer:
      'Phí tư vấn phụ thuộc vấn đề và mức độ phức tạp. Phí khai thuế phụ thuộc hoạt động, khối lượng chứng từ, kỳ cần xử lý và phạm vi công việc. Vạn Xuân thống nhất nội dung và mức phí trước khi thực hiện; phần phát sinh được trao đổi riêng.',
  },
  {
    question: 'Tôi cần gửi giấy tờ gì khi liên hệ lần đầu?',
    answer:
      'Bạn chỉ cần cung cấp tên, số liên hệ và nhu cầu. Vạn Xuân sẽ hướng dẫn hồ sơ cần thiết sau khi trao đổi. Không gửi giấy tờ định danh, mật khẩu hoặc thông tin đăng nhập qua biểu mẫu này.',
  },
];

export const BRANCHES: BranchInfo[] = [
  {
    label: 'Trụ sở chính',
    address: 'Số 01, Đường số 05, KDC Lê Thành, P. An Lạc, TP.HCM',
  },
  {
    label: 'CN Quận 10',
    address: '459 Sư Vạn Hạnh, Phường Hòa Hưng, TP.HCM',
  },
  {
    label: 'CN Bình Thạnh',
    address: 'Số 205A Đường Nguyễn Xí, Phường Bình Thạnh, TP.HCM',
  },
  {
    label: 'CN Thủ Đức',
    address: 'Tòa A Masteri Centre Point, Số 6 đường D1, KĐT Vinhomes Grand Park, P. Long Bình, TP.HCM',
  },
];

export const POLICIES: Record<PolicyKey, PolicyDocument> = {
  privacy: {
    title: 'Chính sách bảo mật',
    sections: [
      {
        heading: '1. Thông tin thu thập',
        body: 'Họ tên, số điện thoại, nhu cầu và nội dung bạn tự nguyện cung cấp qua biểu mẫu, điện thoại hoặc Zalo.',
      },
      {
        heading: '2. Mục đích sử dụng',
        body: 'Liên hệ tư vấn theo yêu cầu của bạn và thống nhất nội dung, phí dịch vụ. Vạn Xuân không bán hoặc chia sẻ thông tin cho bên thứ ba vì mục đích quảng cáo.',
      },
      {
        heading: '3. Lưu trữ và bảo vệ',
        body: 'Thông tin được lưu trữ nội bộ, giới hạn người truy cập và chỉ giữ trong thời gian cần thiết hoặc theo quy định pháp luật.',
      },
      {
        heading: '4. Quyền của bạn',
        body: 'Bạn có quyền yêu cầu xem, chỉnh sửa, xóa thông tin hoặc rút lại sự đồng ý qua email kttvanxuan@gmail.com hoặc số 09 3333 7683.',
      },
      {
        heading: '5. Cookie và công cụ đo lường',
        body: 'Trang có thể sử dụng cookie và công cụ đo lường (ví dụ Google Analytics, Google Ads) để thống kê lượt truy cập và hiệu quả quảng cáo. Bạn có thể tắt cookie trong trình duyệt.',
      },
    ],
  },
  terms: {
    title: 'Điều khoản sử dụng',
    sections: [
      {
        heading: '1. Về Vạn Xuân',
        body: 'Công ty TNHH Dịch vụ Doanh nghiệp Vạn Xuân là đơn vị tư vấn pháp lý tư nhân, không phải là cơ quan nhà nước hay cổng dịch vụ công của chính phủ.',
      },
      {
        heading: '2. Tính chất thông tin',
        body: 'Nội dung trên trang mang tính tham khảo chung, không thay thế tư vấn cho từng trường hợp cụ thể. Quy định có thể thay đổi theo thời điểm thực hiện.',
      },
      {
        heading: '3. Kết quả thủ tục',
        body: 'Cơ quan đăng ký kinh doanh và cơ quan thuế tiếp nhận, xem xét và quyết định kết quả. Tư vấn không đồng nghĩa với bảo đảm hồ sơ được chấp thuận.',
      },
      {
        heading: '4. Tự thực hiện',
        body: 'Bạn có thể tự thực hiện thủ tục trên hệ thống chính thức của cơ quan nhà nước mà không cần sử dụng dịch vụ của Vạn Xuân.',
      },
    ],
  },
  fee: {
    title: 'Chính sách phí & hoàn phí',
    sections: [
      {
        heading: '1. Phí dịch vụ',
        body: 'Mức phí nêu trên trang là phí dịch vụ tư vấn của Vạn Xuân, không bao gồm lệ phí nhà nước (nếu có). Nội dung và phí được thống nhất trước khi thực hiện; phần phát sinh được trao đổi riêng.',
      },
      {
        heading: '2. Thanh toán',
        body: 'Thanh toán theo thỏa thuận hoặc hợp đồng dịch vụ giữa hai bên; Vạn Xuân xuất hóa đơn theo quy định.',
      },
      {
        heading: '3. Hủy và hoàn phí',
        body: 'Trường hợp bạn hủy trước khi Vạn Xuân bắt đầu thực hiện, hoặc Vạn Xuân không thực hiện được công việc đã thống nhất, việc hoàn phí được giải quyết theo thỏa thuận, hợp đồng đã ký. Vui lòng liên hệ 09 3333 7683 để được hỗ trợ.',
      },
    ],
  },
};
