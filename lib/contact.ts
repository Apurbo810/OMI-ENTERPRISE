export type InquiryData = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

// Set this to a form service URL or your own API route later.
export const INQUIRY_ENDPOINT: string | null = null;

export async function submitInquiry(data: InquiryData) {
  if (!INQUIRY_ENDPOINT) throw new Error("NOT_CONFIGURED");
  const res = await fetch(INQUIRY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("FAILED");
}