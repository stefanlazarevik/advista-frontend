import { API_BASE_URL } from '~/environments';

function Root() {
  return (
    <div className="min-h-screen bg-gray-300 text-slate-900">
      <div id="sidebar" className="container mx-auto">
        <h1>React Router Contacts</h1>
        <div>API_BASE_URL</div>

        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite" />
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail" />
    </div>
  );
}

export default Root;
