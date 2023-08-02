export default function Footer() {
  return (
    <footer className="center mt-5 flex justify-center p-4 text-xs">
      <p>Copyrights ©️ {new Date().getFullYear()}</p>
      <span className="mx-1"> | </span>
      <p className="font-medium text-green-500">SmoothySense</p>
    </footer>
  );
}
