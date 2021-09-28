import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main>
      <section className="not-found">
        <h1 className="not-found__error">404</h1>
        <p className="not-found__message">Страница не найдена</p>
        <Link to="/" className="app__link not-found__return">Назад</Link>
      </section>
    </main>
  );
}

export default NotFound;