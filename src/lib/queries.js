/**
 * GROQ queries for fetching data from Sanity CMS.
 * Each query returns the fields expected by the frontend components.
 */

// ─── Courses ──────────────────────────────────────────────────
export const COURSES_QUERY = `*[_type == "course"] | order(sortOrder asc) {
  "id": _id,
  title,
  description,
  category,
  duration,
  eligibility,
  highlights,
  sortOrder
}`;

// ─── Events ───────────────────────────────────────────────────
export const EVENTS_QUERY = `*[_type == "event"] | order(date desc) {
  "id": _id,
  title,
  description,
  date,
  time,
  location,
  category,
  imageUrl,
  registrationLink
}`;

// ─── FAQs ─────────────────────────────────────────────────────
export const FAQS_QUERY = `*[_type == "faq"] | order(sortOrder asc) {
  "id": _id,
  question,
  answer,
  category,
  sortOrder
}`;

// ─── Testimonials ─────────────────────────────────────────────
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(sortOrder asc) {
  "id": _id,
  name,
  course,
  quote,
  rating,
  image,
  company,
  sortOrder
}`;

// ─── Partners ─────────────────────────────────────────────────
export const PARTNERS_QUERY = `*[_type == "partner"] | order(sortOrder asc) {
  "id": _id,
  name,
  logoUrl,
  sortOrder
}`;

// ─── Approvals ────────────────────────────────────────────────
export const APPROVALS_QUERY = `*[_type == "approval"] | order(sortOrder asc) {
  "id": _id,
  name,
  fullName,
  logo,
  sortOrder
}`;

// ─── Scholarships ─────────────────────────────────────────────
export const SCHOLARSHIPS_QUERY = `*[_type == "scholarship"] | order(sortOrder asc) {
  "id": _id,
  title,
  coverage,
  coverageLabel,
  criteria,
  benefits,
  sortOrder
}`;

// ─── Recruiters ───────────────────────────────────────────────
export const RECRUITERS_QUERY = `*[_type == "recruiter"] | order(sortOrder asc) {
  "id": _id,
  name,
  sortOrder
}`;

// ─── Gallery Images ───────────────────────────────────────────
export const GALLERY_QUERY = `*[_type == "galleryImage"] | order(sortOrder asc) {
  "id": _id,
  src,
  alt,
  caption,
  category,
  span,
  sortOrder
}`;

// ─── Site Settings (key-value) ─────────────────────────────────
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"] {
  key,
  value
}`;

/** Fetch a single site setting by key */
export const siteSettingByKey = (key) =>
    `*[_type == "siteSettings" && key == "${key}"][0].value`;
