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
  photo?: File | null;
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
  submitContact: async (data: ContactPayload) => {
    const form = new FormData();
    form.set("name", data.name);
    form.set("email", data.email);
    form.set("phone", data.phone);
    form.set("projectType", data.projectType);
    form.set("message", data.message);
    if (data.photo) form.set("photo", data.photo);

    const res = await fetch("/api/contact", { method: "POST", body: form });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Request failed: ${res.status}`);
    }
    return res.json() as Promise<{ ok: boolean }>;
  },
};
