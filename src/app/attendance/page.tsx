'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebaseClient';
import { collection, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore';
import Modal from '../_components/molecule/modal/modal';

interface Student {
  studentId: string;
  name: string;
  parentPhone: string;
  grade: string;
}

export default function Attendance() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getTodayInWIB = () => {
    const now = new Date();
    const offsetInMs = 7 * 60 * 60 * 1000; // 7 jam dalam milidetik
    const wibDate = new Date(now.getTime() + offsetInMs);
    return wibDate.toISOString().split('T')[0]; // yyyy-mm-dd
  };

  const formattedDate = getTodayInWIB();

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, 'students'));
      const data = snapshot.docs.map((doc) => doc.data() as Student);
      setStudents(data);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedGrade) {
      const filtered = students.filter((s) => s.grade === selectedGrade);
      setFilteredStudents(filtered);
      setSelectedId(''); // reset selected student
    } else {
      setFilteredStudents([]);
    }
  }, [selectedGrade, students]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const student = students.find((s) => s.studentId === selectedId);
    if (!student) {
      setError('Siswa tidak ditemukan');
      setLoading(false);
      return;
    }

    const phone = student.parentPhone.startsWith('0')
      ? '62' + student.parentPhone.slice(1)
      : student.parentPhone;

    try {
      const attendanceRef = doc(db, 'attendance', `${selectedId}_${formattedDate}`);

      await setDoc(attendanceRef, {
        ...student,
        status: attendanceStatus,
        date: formattedDate,
        timestamp: Timestamp.now(),
      });

      await fetch('/api/sendto-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          name: student.name,
          grade: student.grade,
          date: formattedDate,
          status: attendanceStatus,
        }),
      });

      setShowModal(true);
      setSelectedGrade('');
      setSelectedId('');
      setAttendanceStatus('');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message ?? 'Gagal menyimpan kehadiran');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <form onSubmit={handleSubmit} className="p-10 space-y-4 max-w-md">
          <h1 className="text-xl font-bold text-primary">Input Kehadiran</h1>

          {/* Pilih Kelas */}
          <div className="flex flex-col gap-2">
            <label htmlFor="grade">Kelas</label>
            <select
              required
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="border px-2 w-full py-3 font-normal border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm">
              <option value="" disabled>
                Pilih Kelas
              </option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n.toString()}>
                  Kelas {n}
                </option>
              ))}
            </select>
          </div>

          {/* Pilih Siswa */}
          <div className="flex flex-col gap-2">
            <label htmlFor="student">Nama</label>
            <select
              required
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              disabled={!selectedGrade}
              className="border px-2 w-full py-3 font-normal border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm">
              <option value="" disabled>
                {selectedGrade ? 'Pilih Siswa' : 'Pilih Kelas Terlebih Dahulu'}
              </option>
              {filteredStudents.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  {s.name} - {s.studentId}
                </option>
              ))}
            </select>
          </div>

          {/* Pilih Status */}
          <div className="flex flex-col gap-2">
            <label htmlFor="status">Status Kehadiran</label>
            <select
              required
              value={attendanceStatus}
              onChange={(e) => setAttendanceStatus(e.target.value)}
              disabled={!selectedId}
              className="border px-2 w-full py-3 font-normal border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm">
              <option value="" disabled>
                {selectedId ? 'Pilih Status Kehadiran' : 'Pilih Siswa Terlebih Dahulu'}
              </option>
              {['Hadir', 'Sakit', 'Ijin Keperluan Pribadi', 'Alpha'].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <div className="mt-12">
            <button
              type="submit"
              disabled={loading}
              className="bg-duniakoding-primary w-full text-white px-4 py-3 rounded-2xl">
              {loading ? 'Menyimpan...' : 'Simpan Kehadiran'}
            </button>
          </div>
        </form>
      </div>
      <Modal
        title="Sukses"
        content="Kehadiran berhasil disimpan. Notifikasi telah dikirim ke orang tua siswa."
        type="success"
        isOpen={showModal}
        buttonText1="OK"
        buttonType1="primary"
        onConfirm={() => setShowModal(false)}
      />
    </>
  );
}
