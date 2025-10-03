export interface Contact {
  id: string; // sempre string (converta número para string ao carregar)
  name: string;
  avatar: string;
  message?: string; // opcional (nem sempre precisa existir)
  time?: string;    // opcional (nem sempre precisa existir)
}
