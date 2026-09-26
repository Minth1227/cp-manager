import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

// 각 양식별 원본 PDF 경로 및 매핑 좌표 설정
const formConfig = {
  'L-01': { // 개별수출허가신청서 (별지 제1호)
    template: '/forms/form_1.pdf',
    fields: {
      'exporterCompany': { page: 0, x: 180, y: 720, size: 10 },
      'exporterCeo': { page: 0, x: 420, y: 720, size: 10 },
      'exporterRegNum': { page: 0, x: 180, y: 700, size: 10 },
      'exporterPhone': { page: 0, x: 420, y: 700, size: 10 },
      'exporterAddress': { page: 0, x: 180, y: 680, size: 10 },
      
      'buyerName': { page: 0, x: 180, y: 640, size: 10 },
      'buyerPhone': { page: 0, x: 420, y: 640, size: 10 },
      'buyerAddress': { page: 0, x: 180, y: 620, size: 10 },
      
      'endUserName': { page: 0, x: 180, y: 580, size: 10 },
      'endUserPhone': { page: 0, x: 420, y: 580, size: 10 },
      'endUserAddress': { page: 0, x: 180, y: 560, size: 10 },
      
      'destCountry': { page: 0, x: 180, y: 520, size: 10 },
      
      'paymentMethod': { page: 0, x: 180, y: 490, size: 10 },
      'expectedShipmentDate': { page: 0, x: 420, y: 490, size: 10 },
      'exportPurpose': { page: 0, x: 180, y: 470, size: 10 },
      
      'hsCode': { page: 0, x: 120, y: 420, size: 10 },
      'controlNo': { page: 0, x: 220, y: 420, size: 10 },
      'itemName': { page: 0, x: 300, y: 420, size: 10 },
      'quantity': { page: 0, x: 400, y: 420, size: 10 },
      'unitPrice': { page: 0, x: 450, y: 420, size: 10 },
      'amount': { page: 0, x: 500, y: 420, size: 10 }
    }
  },
  'L-02': { // 포괄수출허가신청서 (별지 제6호)
    template: '/forms/form_6.pdf',
    fields: {
      'exporterCompany': { page: 0, x: 180, y: 705, size: 10 },
      'exporterCeo': { page: 0, x: 420, y: 705, size: 10 },
      'exporterAddress': { page: 0, x: 180, y: 680, size: 10 },
      'cpGrade': { page: 0, x: 420, y: 680, size: 10 },
      
      'permitType': { page: 0, x: 180, y: 630, size: 10 },
      'hsCode': { page: 0, x: 180, y: 590, size: 10 },
      'controlNo': { page: 0, x: 420, y: 590, size: 10 },
      'duration': { page: 0, x: 180, y: 570, size: 10 },
      'endUsers': { page: 0, x: 180, y: 520, size: 10 }
    }
  },
  'L-03': { // 최종수하인 및 구매자 진술서 (별지 제2호)
    template: '/forms/form_2.pdf',
    fields: {
      'exporterName': { page: 0, x: 180, y: 720, size: 10 },
      'endUserName': { page: 0, x: 180, y: 690, size: 10 },
      'itemDetails': { page: 0, x: 180, y: 660, size: 10 },
      'quantity': { page: 0, x: 180, y: 630, size: 10 },
      'consigneeCompany': { page: 0, x: 180, y: 550, size: 10 },
      'consigneeRep': { page: 0, x: 420, y: 550, size: 10 },
      'consigneeAddress': { page: 0, x: 180, y: 530, size: 10 },
      'signYear': { page: 0, x: 300, y: 500, size: 10 },
      'signMonth': { page: 0, x: 340, y: 500, size: 10 },
      'signDay': { page: 0, x: 380, y: 500, size: 10 }
    }
  },
  'L-04': { // 최종사용자 서약서 (별지 제2호의2)
    template: '/forms/form_2_2.pdf',
    fields: {
      'exporterName': { page: 0, x: 180, y: 720, size: 10 },
      'itemDetails': { page: 0, x: 180, y: 690, size: 10 },
      'quantity': { page: 0, x: 180, y: 660, size: 10 },
      'endUse': { page: 0, x: 180, y: 630, size: 10 },
      'endUserCompany': { page: 0, x: 180, y: 550, size: 10 },
      'endUserRep': { page: 0, x: 420, y: 550, size: 10 },
      'endUserAddress': { page: 0, x: 180, y: 530, size: 10 },
      'signYear': { page: 0, x: 300, y: 500, size: 10 },
      'signMonth': { page: 0, x: 340, y: 500, size: 10 },
      'signDay': { page: 0, x: 380, y: 500, size: 10 }
    }
  },
  'E-05': { // 지정신청서 (별지 제13호)
    template: '/forms/form_13.pdf',
    fields: {
      'companyName': { page: 0, x: 180, y: 705, size: 10 },
      'ceoName': { page: 0, x: 420, y: 705, size: 10 },
      'regNumber': { page: 0, x: 180, y: 680, size: 10 },
      'address': { page: 0, x: 180, y: 655, size: 10 },
      'applyGrade': { page: 0, x: 180, y: 605, size: 10 },
    }
  },
  'E-03': { // 회사소개서 (별지 제15호)
    template: '/forms/form_15.pdf',
    fields: {
      'companyName': { page: 0, x: 180, y: 705, size: 10 },
      'regNumber': { page: 0, x: 180, y: 690, size: 10 },
      'ceoName': { page: 0, x: 420, y: 705, size: 10 },
      'establishDate': { page: 0, x: 420, y: 690, size: 10 },
      'address': { page: 0, x: 180, y: 680, size: 10 },
      'businessType': { page: 0, x: 180, y: 670, size: 10 },
      'tradeRegNumber': { page: 0, x: 180, y: 660, size: 10 },
      'employeeCount': { page: 0, x: 420, y: 660, size: 10 },
      'capital': { page: 0, x: 180, y: 650, size: 10 },
      'revenue': { page: 0, x: 420, y: 650, size: 10 },
      'website': { page: 0, x: 180, y: 640, size: 10 },
      'businessOverview': { page: 0, x: 180, y: 600, size: 10 },
    }
  },
  'F-01': { // 자가판정서 (별지 제5호)
    template: '/forms/form_5.pdf',
    fields: {
      'applicant_name': { page: 0, x: 180, y: 705, size: 10 },
      'applicant_ceo': { page: 0, x: 420, y: 705, size: 10 },
      'item_name': { page: 0, x: 180, y: 605, size: 10 },
      'item_hsk': { page: 0, x: 420, y: 605, size: 10 },
      'item_model': { page: 0, x: 180, y: 580, size: 10 },
    }
  },
  'F-02': { // 전문판정신청서 (별지 제4호)
    template: '/forms/form_4.pdf',
    fields: {
      'itemName': { page: 0, x: 180, y: 605, size: 10 },
      'hsCode': { page: 0, x: 420, y: 605, size: 10 },
      'modelNumber': { page: 0, x: 180, y: 580, size: 10 },
      'manufacturer': { page: 0, x: 420, y: 580, size: 10 },
    }
  },
  'J-01': { // 자진신고서 (별지 제24호)
    template: '/forms/form_24.pdf',
    fields: {
      'violation_type': { page: 0, x: 180, y: 700, size: 10 },
      'violation_date': { page: 0, x: 180, y: 680, size: 10 },
      'violation_desc': { page: 0, x: 180, y: 600, size: 10 },
    }
  },
  'J-02': { // 재발방지계획서 (별지 제25호)
    template: '/forms/form_25.pdf',
    fields: {
      'cause': { page: 0, x: 180, y: 500, size: 10 },
      'countermeasure': { page: 0, x: 180, y: 400, size: 10 }
    }
  }
};

let fontBytes = null;

export function hasPdfConfig(formId) {
  return !!formConfig[formId];
}

export async function generatePdf(formId, formData) {
  const config = formConfig[formId];
  if (!config) {
    throw new Error(`양식 ${formId}에 대한 PDF 템플릿 설정이 없습니다.`);
  }

  // 1. 템플릿 불러오기
  const templateRes = await fetch(config.template);
  if (!templateRes.ok) throw new Error('PDF 템플릿을 불러올 수 없습니다.');
  const templateBytes = await templateRes.arrayBuffer();

  const pdfDoc = await PDFDocument.load(templateBytes);
  
  // 2. 폰트 로드
  if (!fontBytes) {
    const fontRes = await fetch('/fonts/NanumGothic.ttf');
    fontBytes = await fontRes.arrayBuffer();
  }
  pdfDoc.registerFontkit(fontkit);
  const font = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();

  // 3. 필드 매핑
  for (const [key, fieldConfig] of Object.entries(config.fields)) {
    const value = formData[key];
    if (value) {
      const page = pages[fieldConfig.page];
      page.drawText(String(value), {
        x: fieldConfig.x,
        y: fieldConfig.y,
        size: fieldConfig.size || 10,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
  }

  // 4. 저장 및 URL 반환
  const pdfBytesOut = await pdfDoc.save();
  const blob = new Blob([pdfBytesOut], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}
