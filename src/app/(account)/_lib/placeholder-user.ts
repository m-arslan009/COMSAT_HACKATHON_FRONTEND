/** The account fields the profile and settings pages display. */
export type AccountUser = {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  createdAt: string;
};

/**
 * Sample data so the account pages render before the backend exists.
 * TODO(backend): load the signed-in user from the backend instead.
 */
export const placeholderUser: AccountUser = {
  name: "Ayesha Khan",
  email: "ayesha@example.com",
  phone: "",
  location: "",
  bio: "",
  createdAt: "2026-11-01T00:00:00.000Z",
};
