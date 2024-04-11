import NavBar from './component/NavBar'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    {
      <NavBar />
    }
    <head></head>
    <body className="body">{children}</body>
    </html>
  );

}