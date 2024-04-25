import NavBar from './components/NavBar'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head></head>
    <body>
      <NavBar />
      {children}
    </body>
    </html>


  );

}