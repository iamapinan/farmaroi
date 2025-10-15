export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sun=0 ... Sat=6

export type OpeningRule = {
  weekday: Weekday;
  open: string; // HH:mm
  close: string; // HH:mm
  closed?: boolean;
};

// ค่าเริ่มต้น: ปิดวันอังคาร เปิด 10:00-20:00
export const defaultOpeningRules: OpeningRule[] = [
  { weekday: 0, open: "10:00", close: "20:00" }, // Sun
  { weekday: 1, open: "10:00", close: "20:00" }, // Mon
  { weekday: 2, open: "00:00", close: "00:00", closed: true }, // Tue closed
  { weekday: 3, open: "10:00", close: "20:00" }, // Wed
  { weekday: 4, open: "10:00", close: "20:00" }, // Thu
  { weekday: 5, open: "10:00", close: "20:00" }, // Fri
  { weekday: 6, open: "10:00", close: "20:00" }, // Sat
];

export function isOpenNow(rules: OpeningRule[] = defaultOpeningRules, d = new Date()): boolean {
  const weekday = (d.getDay() as Weekday);
  const rule = rules.find(r => r.weekday === weekday);
  if (!rule) return false;
  if (rule.closed) return false;
  const [oh, om] = rule.open.split(":").map(Number);
  const [ch, cm] = rule.close.split(":").map(Number);
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  const nowMin = d.getHours() * 60 + d.getMinutes();
  return nowMin >= openMin && nowMin <= closeMin;
}

export function humanOpeningToday(rules: OpeningRule[] = defaultOpeningRules, d = new Date()): string {
  const weekday = (d.getDay() as Weekday);
  const rule = rules.find(r => r.weekday === weekday);
  if (!rule) return "-";
  if (rule.closed) return "ปิดวันนี้ (อังคาร)";
  return `${rule.open} - ${rule.close}`;
}


