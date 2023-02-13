import '../css/Footer.css';

function Footer() {
  return (
    <div className="container-fluid">
      <div className="footer">
        <a className="footer-brand" href="/">
          CG-Hire
        </a>
        <div className="footer-items-container">
          <ul className="footer-items">
            <li className="footer-item">
              <a
                className="footer-link active"
                aria-current="page"
                href="/home"
              >
                SignUp
              </a>
            </li>
            <li className="footer-item">
              <a className="footer-link" href="/Profile">
                Login
              </a>
            </li>
            <li className="footer-item">
              <a className="footer-link" href="/list">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
