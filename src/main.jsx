
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  GraduationCap,
  Users,
  Clock3,
  Search,
  Mail,
  MapPin,
  Phone,
  CalendarDays,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './style.css';

// 15 Data Dummy Mahasiswa
const initialStudents = [
  { nim: '2301001', name: 'Andi Saputra', phone: '081234567801', email: 'andi@mail.com', address: 'Surabaya', studyProgram: 'Informatika', year: 2023 },
  { nim: '2301002', name: 'Budi Santoso', phone: '081234567802', email: 'budi@mail.com', address: 'Malang', studyProgram: 'Sistem Informasi', year: 2023 },
  { nim: '2301003', name: 'Citra Amelia', phone: '081234567803', email: 'citra@mail.com', address: 'Lumajang', studyProgram: 'Informatika', year: 2023 },
  { nim: '2401001', name: 'Dinda Putri', phone: '081234567804', email: 'dinda@mail.com', address: 'Jember', studyProgram: 'Manajemen', year: 2024 },
  { nim: '2401002', name: 'Eko Pratama', phone: '081234567805', email: 'eko@mail.com', address: 'Kediri', studyProgram: 'Informatika', year: 2024 },

  { nim: '2401003', name: 'Fajar Ramadhan', phone: '081234567806', email: 'fajar@mail.com', address: 'Gresik', studyProgram: 'Sistem Informasi', year: 2024 },
  { nim: '2401004', name: 'Gita Permata', phone: '081234567807', email: 'gita@mail.com', address: 'Sidoarjo', studyProgram: 'Manajemen', year: 2024 },
  { nim: '2401005', name: 'Hendra Wijaya', phone: '081234567808', email: 'hendra@mail.com', address: 'Mojokerto', studyProgram: 'Informatika', year: 2024 },
  { nim: '2501001', name: 'Intan Maharani', phone: '081234567809', email: 'intan@mail.com', address: 'Pasuruan', studyProgram: 'Sistem Informasi', year: 2025 },
  { nim: '2501002', name: 'Joko Prasetyo', phone: '081234567810', email: 'joko@mail.com', address: 'Banyuwangi', studyProgram: 'Manajemen', year: 2025 },

  { nim: '2501003', name: 'Kartika Sari', phone: '081234567811', email: 'kartika@mail.com', address: 'Blitar', studyProgram: 'Informatika', year: 2025 },
  { nim: '2501004', name: 'Lukman Hakim', phone: '081234567812', email: 'lukman@mail.com', address: 'Madiun', studyProgram: 'Sistem Informasi', year: 2025 },
  { nim: '2501005', name: 'Maya Anggraini', phone: '081234567813', email: 'maya@mail.com', address: 'Tuban', studyProgram: 'Manajemen', year: 2025 },
  { nim: '2501006', name: 'Naufal Akbar', phone: '081234567814', email: 'naufal@mail.com', address: 'Bojonegoro', studyProgram: 'Informatika', year: 2025 },
  { nim: '2501007', name: 'Olivia Safitri', phone: '081234567815', email: 'olivia@mail.com', address: 'Probolinggo', studyProgram: 'Sistem Informasi', year: 2025 },
];

function App() {
  const [students] = useState(initialStudents);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Live Clock
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Search
  const filteredStudents = students.filter((student) =>
    [student.nim, student.name, student.studyProgram, student.email]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination Calculation
  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Mengatur halaman saat pencarian berubah
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Format Waktu
  const formattedTime = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).replace(/\./g, ':');

  const formattedDate = currentTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><GraduationCap size={23} /></div>
          <span>FrontEnd<span className="brand-light">Challenge</span></span>
        </div>
        <div className="topbar-label">STUDENT MANAGEMENT SYSTEM</div>
        {/* <div className="profile"><div className="avatar">A</div><span>Administrator</span></div> */}
      </header>
      <main className="main-content">

        {/* Page Heading */}
        <section className="page-heading">
          <div>
            <h1>Manajemen Mahasiswa</h1>
            <p className="subtitle">
              Kelola dan pantau informasi data mahasiswa.
            </p>
          </div>

          <div className="date-chip">
            <CalendarDays size={16} />
            <span>{formattedDate}</span>
          </div>
        </section>

        {/* Overview */}
        <section className="overview-grid">
          <article className="stat-card">
            <div className="stat-icon purple">
              <Users size={22} />
            </div>
            <div>
              <p className="stat-label">Total Mahasiswa</p>
              <h2>{students.length}</h2>
              <p className="stat-note">
                Data mahasiswa terdaftar
              </p>
            </div>
          </article>

          <article className="clock-card">
            <div className="clock-icon">
              <Clock3 size={22} />
            </div>
            <div>
              <p className="stat-label">Waktu Saat Ini</p>
              <div className="clock-time">{formattedTime}</div>
              <p className="stat-note">
                Waktu lokal perangkat
              </p>
            </div>
          </article>
        </section>

        {/* Student Table */}
        <section className="table-card">
          <div className="table-heading">
            <div>
              <h2>Daftar Data Mahasiswa</h2>

              <div className="search-box">
                <Search size={17} />
                <input
                  aria-label="Cari mahasiswa"
                  placeholder="Cari nama, NIM, prodi..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="table-meta">
            <span>
              <span className="meta-dot" />
              Menampilkan <b>{currentStudents.length}</b> dari{' '}
              <b>{filteredStudents.length}</b> mahasiswa
            </span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th>No. HP</th>
                  <th>Email</th>
                  <th>Alamat</th>
                  <th>Program Studi</th>
                  <th>Tahun Masuk</th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student) => (
                    <tr key={student.nim}>
                      <td>
                        <span className="nim">{student.nim}</span>
                      </td>

                      <td>
                        <div className="student-name">
                          <span className="student-avatar">
                            {student.name.charAt(0)}
                          </span>
                          <strong>{student.name}</strong>
                        </div>
                      </td>

                      <td>
                        <span className="cell-with-icon">
                          <Phone size={13} />
                          {student.phone}
                        </span>
                      </td>

                      <td>
                        <a
                          className="email-link"
                          href={`mailto:${student.email}`}
                        >
                          <Mail size={13} />
                          {student.email}
                        </a>
                      </td>

                      <td>
                        <span className="cell-with-icon">
                          <MapPin size={13} />
                          {student.address}
                        </span>
                      </td>

                      <td>
                        <span className="program-pill">
                          {student.studyProgram}
                        </span>
                      </td>

                      <td>
                        <span className="year">
                          {student.year}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="empty-state" colSpan="7">
                      Data mahasiswa tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="pagination">
              <p className="pagination-info">
                Halaman {currentPage} dari {totalPages}
              </p>

              <div className="pagination-controls">
                <button
                  className="page-button"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft size={17} />
                  <span>Sebelumnya</span>
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={`page-number ${
                      currentPage === page ? 'active' : ''
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="page-button"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Halaman selanjutnya"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </section>

        <footer className="page-footer">
          Hanifa Jauza Apsari - WDUIUX - Kelompok 5 - 24051214093
        </footer>

      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
