# Student Management – React UI Implementation Practice

Landing Page sederhana untuk melihat data mahasiswa, menggunakan React + Vite + Vanilla CSS, tanpa backend atau database.

## Penjelasan Baris Kode

### useState untuk data mahasiswa

```jsx
const [students] = useState(initialStudents);
```

`students` menyimpan array data mahasiswa selama aplikasi berjalan.

### .map() untuk membuat baris tabel

```jsx
{students.map((student) => (
  <tr key={student.nim}>
    <td>{student.nim}</td>
    <td>{student.name}</td>
  </tr>
))}
```

`map()` menghasilkan satu baris tabel untuk setiap objek mahasiswa. NIM dipakai sebagai key unik.

### useEffect untuk live clock

```jsx
useEffect(() => {
  const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
  return () => clearInterval(timerId);
}, []);
```

Interval berjalan setiap 1.000 milidetik. Fungsi cleanup menghentikan interval ketika komponen dilepas agar tidak terjadi timer yang tertinggal.
