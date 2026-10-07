import { formatDate, formatTime } from "../../utils/formatDate";

export const fmtDateTime = (iso: string) => `${formatDate(iso)} · ${formatTime(iso)}`;
