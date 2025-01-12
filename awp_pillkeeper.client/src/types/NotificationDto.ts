export interface NotificationDto {
  id?: number;
  userId: number;
  title: string;
  subtitle?: string | null;
  date: Date;
  taken: boolean;
  color: string;
}
