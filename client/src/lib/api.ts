export type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  created_at: string;
  status: "pending" | "approved";
};

export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  before_image: string;
  after_image: string;
  created_at: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getReviews: () => request<Review[]>("/reviews"),
  submitReview: (data: { name: string; rating: number; text: string }) =>
    request<Review>("/reviews", { method: "POST", body: JSON.stringify(data) }),
  getGallery: () => request<GalleryItem[]>("/gallery"),
  submitContact: (data: ContactPayload) =>
    request<{ ok: boolean }>("/contact", { method: "POST", body: JSON.stringify(data) }),
};
