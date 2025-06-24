export interface UserProfile {
  id: string; // Remova o '?' para indicar que o ID é obrigatório
  userProfile: string;
  name: string;
  email: string;
  password?: string;
}
