import { Link } from 'react-router-dom';

export interface WebUiHeaderProps {}

export function WebUiHeader(props: WebUiHeaderProps) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/keypair">Page 2</Link>
        </li>
      </ul>
    </div>
  );
}

export default WebUiHeader;
