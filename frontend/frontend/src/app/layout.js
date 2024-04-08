import NavBar from './components/NavBar'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    {
      <NavBar />
    }
    <head></head>
    <body>{children}</body>
    </html>
  );

}