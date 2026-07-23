import '@/app/globals.css';
import AdminClientLayout from './AdminClientLayout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AdminClientLayout>{children}</AdminClientLayout>
      </body>
    </html>
  );
}
