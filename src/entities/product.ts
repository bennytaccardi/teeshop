export interface Product {
  id: number;
  crated_at: Date;
  title: string;
  price: number;
  stripe_id: string;
  description?: string;
  image_url?: string;
}
