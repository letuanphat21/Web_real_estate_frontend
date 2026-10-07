import type { CvData, CvStyle } from "../../../types/cv.types";

/** Template chỉ nhận data + style và render */
export interface CvTemplateProps {
  data: CvData;
  style: CvStyle;
}
