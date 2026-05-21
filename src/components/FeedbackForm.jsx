import { useMemo, useState } from 'react';
import { Send, User, Phone, MapPin, PencilLine, UsersRound } from 'lucide-react';
import places from '../data/places.json';
import { supabase } from '../lib/supabase.js';

export default function FeedbackForm({ defaultPlace }) {
  const initialPlaceId = defaultPlace?.id || '';
  const [form, setForm] = useState({ name: '', contact: '', placeId: initialPlaceId, message: '' });
  const [status, setStatus] = useState('');

  const selectedPlace = useMemo(() => places.find(p => p.id === form.placeId), [form.placeId]);

  function update(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus('');
    if (!form.message.trim()) {
      setStatus('Anh/chị vui lòng nhập nội dung góp ý.');
      return;
    }

    const payload = {
      place_id: form.placeId || null,
      sender_name: form.name.trim() || null,
      sender_phone: form.contact.trim() || null,
      sender_email: null,
      message: form.message.trim(),
      status: 'pending'
    };

    if (supabase) {
      const { error } = await supabase.from('community_submissions').insert(payload);
      if (error) {
        setStatus(`Chưa gửi được: ${error.message}`);
        return;
      }
      setStatus('Đã nhận góp ý. Ban quản trị sẽ kiểm tra trước khi cập nhật dữ liệu.');
      setForm({ name: '', contact: '', placeId: initialPlaceId, message: '' });
      return;
    }

    const saved = JSON.parse(localStorage.getItem('nata-community-feedback') || '[]');
    saved.unshift({ ...payload, localPlace: selectedPlace?.name, created_at: new Date().toISOString() });
    localStorage.setItem('nata-community-feedback', JSON.stringify(saved.slice(0, 100)));
    setStatus('Đã lưu góp ý tạm trên trình duyệt. Khi kết nối Supabase, dữ liệu sẽ gửi lên hệ thống.');
    setForm({ name: '', contact: '', placeId: initialPlaceId, message: '' });
  }

  return (
    <section id="gop-y" className="feedback-card">
      <div className="feedback-head">
        <span className="round-icon"><UsersRound size={24}/></span>
        <div>
          <h2>Góp ý bổ sung dữ liệu địa phương</h2>
          <p>Mỗi ý kiến của bạn giúp dữ liệu địa phương ngày càng đầy đủ, chính xác và hữu ích hơn.</p>
        </div>
      </div>
      <form className="feedback-form" onSubmit={submit}>
        <label><User size={18}/><input value={form.name} onChange={e=>update('name', e.target.value)} placeholder="Họ và tên" /></label>
        <label><Phone size={18}/><input value={form.contact} onChange={e=>update('contact', e.target.value)} placeholder="Số điện thoại hoặc email" /></label>
        <label className="full"><MapPin size={18}/><select value={form.placeId} onChange={e=>update('placeId', e.target.value)}><option value="">Chọn địa phương</option>{places.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
        <label className="full"><PencilLine size={18}/><textarea value={form.message} onChange={e=>update('message', e.target.value)} placeholder="Nội dung góp ý" rows={4} maxLength={1000} /></label>
        <button className="submit-btn" type="submit"><Send size={18}/> Gửi góp ý</button>
        {status && <p className="feedback-status">{status}</p>}
      </form>
    </section>
  );
}
