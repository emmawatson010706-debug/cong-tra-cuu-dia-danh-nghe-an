import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, CloudRain, Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import '../styles/weather-panel.css';

const WEATHER_TEXT = {
  0: 'Trời quang',
  1: 'Ít mây',
  2: 'Có mây',
  3: 'Nhiều mây',
  45: 'Sương mù',
  48: 'Sương mù đóng băng',
  51: 'Mưa phùn nhẹ',
  53: 'Mưa phùn',
  55: 'Mưa phùn dày',
  61: 'Mưa nhỏ',
  63: 'Mưa vừa',
  65: 'Mưa to',
  66: 'Mưa lạnh nhẹ',
  67: 'Mưa lạnh mạnh',
  71: 'Tuyết nhẹ',
  73: 'Tuyết vừa',
  75: 'Tuyết dày',
  80: 'Mưa rào nhẹ',
  81: 'Mưa rào',
  82: 'Mưa rào mạnh',
  95: 'Dông',
  96: 'Dông kèm mưa đá',
  99: 'Dông mạnh'
};

function round(value, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return Number(value).toFixed(digits).replace(/\.0$/, '');
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' });
}

function getAdvisories(current, today) {
  const alerts = [];
  const maxTemp = Number(today?.temperature_2m_max ?? current?.temperature_2m);
  const minTemp = Number(today?.temperature_2m_min ?? current?.temperature_2m);
  const rain = Number(today?.precipitation_sum ?? current?.precipitation ?? 0);
  const wind = Number(today?.wind_speed_10m_max ?? current?.wind_speed_10m ?? 0);
  const uv = Number(today?.uv_index_max ?? 0);

  if (maxTemp >= 37) alerts.push({ level: 'hot', text: 'Nắng nóng gay gắt, hạn chế làm việc ngoài trời giữa trưa.' });
  else if (maxTemp >= 34) alerts.push({ level: 'warn', text: 'Nắng nóng, cần chú ý khi làm đồng, xây dựng, di chuyển xa.' });

  if (uv >= 9) alerts.push({ level: 'hot', text: 'UV rất cao, nên che chắn kỹ khi ra ngoài.' });
  else if (uv >= 7) alerts.push({ level: 'warn', text: 'UV cao, tránh nắng từ 11h–14h.' });

  if (rain >= 50) alerts.push({ level: 'rain', text: 'Có nguy cơ mưa lớn, chú ý ngập cục bộ và đường trơn.' });
  else if (rain >= 20) alerts.push({ level: 'rain', text: 'Có mưa đáng kể, cân nhắc phơi nông sản, phun thuốc, đi biển.' });

  if (wind >= 39) alerts.push({ level: 'wind', text: 'Gió mạnh, cần chú ý mái tôn, cây cối và hoạt động ven biển.' });
  else if (wind >= 28) alerts.push({ level: 'wind', text: 'Gió khá mạnh, nên theo dõi trước khi ra khơi hoặc làm việc trên cao.' });

  if (minTemp <= 13) alerts.push({ level: 'cold', text: 'Trời rét, chú ý giữ ấm cho người già, trẻ nhỏ và vật nuôi.' });
  else if (minTemp <= 16) alerts.push({ level: 'cold', text: 'Nhiệt độ thấp, cần giữ ấm vào đêm và sáng sớm.' });

  if (!alerts.length) alerts.push({ level: 'ok', text: 'Chưa có cảnh báo thời tiết đáng chú ý trong hôm nay.' });
  return alerts.slice(0, 3);
}

export default function WeatherPanel({ placeName = 'Nghệ An', latitude, longitude }) {
  const [state, setState] = useState({ loading: Boolean(latitude && longitude), error: '', data: null });

  useEffect(() => {
    if (!latitude || !longitude) {
      setState({ loading: false, error: '', data: null });
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      timezone: 'Asia/Bangkok',
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_gusts_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max',
      forecast_days: '7'
    });

    setState({ loading: true, error: '', data: null });
    fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Không tải được dữ liệu thời tiết.');
        return res.json();
      })
      .then((data) => setState({ loading: false, error: '', data }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ loading: false, error: error.message || 'Lỗi tải thời tiết.', data: null });
      });

    return () => controller.abort();
  }, [latitude, longitude]);

  const dailyRows = useMemo(() => {
    const d = state.data?.daily;
    if (!d?.time) return [];
    return d.time.map((time, index) => ({
      time,
      code: d.weather_code?.[index],
      max: d.temperature_2m_max?.[index],
      min: d.temperature_2m_min?.[index],
      rain: d.precipitation_sum?.[index],
      rainChance: d.precipitation_probability_max?.[index],
      wind: d.wind_speed_10m_max?.[index],
      uv: d.uv_index_max?.[index]
    }));
  }, [state.data]);

  const current = state.data?.current;
  const today = dailyRows[0];
  const advisories = getAdvisories(current, today);
  const updatedAt = current?.time
    ? new Date(current.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', weekday: 'short', day: '2-digit', month: '2-digit' })
    : '';

  const isGeneralWeatherGuide = !latitude || !longitude;
  const guideTitle = placeName && placeName !== 'Nghệ An'
    ? `Thời tiết tại ${placeName}`
    : 'Thời tiết theo từng xã/phường';

  const scrollToPlaces = () => {
    document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="weather-panel" id="thoi-tiet">
      <div className="weather-head">
        <div>
          <p className="weather-kicker"><CalendarDays size={16}/> Thời tiết địa phương</p>
          <h2>{isGeneralWeatherGuide ? guideTitle : `Thời tiết tại ${placeName}`}</h2>
          <p>Dự báo phục vụ sản xuất, đi lại, làm nông, đi biển và phòng tránh thời tiết bất lợi.</p>
        </div>
        {updatedAt && <span className="weather-updated">Cập nhật {updatedAt}</span>}
      </div>

      {isGeneralWeatherGuide && (
        <div className="weather-guide-box">
          <strong>Chọn xã/phường để xem dự báo sát địa phương</strong>
          <p>
            Bà con nhập tên địa phương vào ô tra cứu hoặc mở danh mục xã/phường bên dưới.
            Tại từng trang địa phương sẽ có dự báo hôm nay, 3 ngày tới, 7 ngày tới, mưa,
            gió, nắng nóng, rét và các cảnh báo thời tiết bất lợi.
          </p>
          <button type="button" onClick={scrollToPlaces}>Chọn xã/phường để xem thời tiết</button>
        </div>
      )}

      {!isGeneralWeatherGuide && state.loading && <div className="weather-box">Đang tải dự báo thời tiết...</div>}
      {!isGeneralWeatherGuide && state.error && <div className="weather-box weather-error">Chưa tải được dữ liệu thời tiết. Anh/chị vui lòng thử lại sau.</div>}

      {!isGeneralWeatherGuide && !state.loading && !state.error && current && (
        <>
          <div className="weather-current-grid">
            <article className="weather-main-card">
              <span className="weather-icon"><Thermometer size={22}/></span>
              <strong>{round(current.temperature_2m)}°C</strong>
              <span>{WEATHER_TEXT[current.weather_code] || 'Đang cập nhật'}</span>
              <small>Cảm giác {round(current.apparent_temperature)}°C</small>
            </article>
            <article><CloudRain size={20}/><span>Mưa</span><strong>{round(current.precipitation, 1)} mm</strong></article>
            <article><Wind size={20}/><span>Gió</span><strong>{round(current.wind_speed_10m)} km/h</strong></article>
            <article><Droplets size={20}/><span>Độ ẩm</span><strong>{round(current.relative_humidity_2m)}%</strong></article>
            <article><Sun size={20}/><span>UV hôm nay</span><strong>{round(today?.uv, 1)}</strong></article>
          </div>

          <div className="weather-advisories">
            {advisories.map((item, index) => <span className={`weather-advice ${item.level}`} key={`${item.text}-${index}`}>{item.text}</span>)}
          </div>

          <div className="weather-forecast">
            <h3>Dự báo 7 ngày tới</h3>
            <div className="weather-days">
              {dailyRows.map((day) => (
                <article key={day.time}>
                  <strong>{formatDate(day.time)}</strong>
                  <span>{WEATHER_TEXT[day.code] || '—'}</span>
                  <small>{round(day.min)}–{round(day.max)}°C · Mưa {round(day.rain, 1)}mm</small>
                  <small>Gió {round(day.wind)}km/h · UV {round(day.uv, 1)}</small>
                </article>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
