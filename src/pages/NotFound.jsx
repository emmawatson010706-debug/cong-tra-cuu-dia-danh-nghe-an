import Layout from '../components/Layout.jsx';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <Layout><div className="container section-card"><h1>Không tìm thấy trang</h1><Link to="/">Về trang chủ</Link></div></Layout>;
}
