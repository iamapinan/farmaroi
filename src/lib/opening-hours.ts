export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sun=0 ... Sat=6

export type OpeningRule = {
  weekday: Weekday;
  open: string; // HH:mm
  close: string; // HH:mm
  closed?: boolean;
};

// ค่าเริ่มต้น: เปิดทุกวัน 09:00-19:00
export const defaultOpeningRules: OpeningRule[] = [
  { weekday: 0, open: "09:00", close: "19:00" }, // Sun
  { weekday: 1, open: "09:00", close: "19:00" }, // Mon
  { weekday: 2, open: "09:00", close: "19:00" }, // Tue
  { weekday: 3, open: "09:00", close: "19:00" }, // Wed
  { weekday: 4, open: "09:00", close: "19:00" }, // Thu
  { weekday: 5, open: "09:00", close: "19:00" }, // Fri
  { weekday: 6, open: "09:00", close: "19:00" }, // Sat
];

export function isOpenNow(rules: OpeningRule[] = defaultOpeningRules, d = new Date()): boolean {
  // Convert input date to Thailand time (Asia/Bangkok)
  // relying on the fact that Date constructor parses en-US format correctly in Node/Browsers
  const thDate = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
  
  const weekday = (thDate.getDay() as Weekday);
  const rule = rules.find(r => r.weekday === weekday);
  if (!rule) return false;
  if (rule.closed) return false;
  const [oh, om] = rule.open.split(":").map(Number);
  const [ch, cm] = rule.close.split(":").map(Number);
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  // Use the shifted thDate hours/minutes
  const nowMin = thDate.getHours() * 60 + thDate.getMinutes();
  return nowMin >= openMin && nowMin <= closeMin;
}

export function humanOpeningToday(rules: OpeningRule[] = defaultOpeningRules, d = new Date()): string {
  // Convert to Thailand time
  const thDate = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
  const weekday = (thDate.getDay() as Weekday);
  const rule = rules.find(r => r.weekday === weekday);
  if (!rule) return "-";
  if (rule.closed) return "ปิดวันนี้";
  return `${rule.open} - ${rule.close}`;
}

