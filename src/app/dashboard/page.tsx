"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseClient";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

interface Student {
  name: string;
  studentId: string;
  grade: string;
}

interface Attendance {
  name: string;
  studentId: string;
  grade: string;
  status: string;
  date: string;
}

export default function AttendanceTablePage() {
  const [grades, setGrades] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getTodayInWIB = () => {
    const now = new Date();
    const offsetInMs = 7 * 60 * 60 * 1000; // UTC+7
    const wibDate = new Date(now.getTime() + offsetInMs);
    return wibDate.toISOString().split("T")[0];
  };

  const today = getTodayInWIB();

  useEffect(() => {
    const fetchGrades = async () => {
      const snapshot = await getDocs(collection(db, "students"));
      const uniqueGrades = Array.from(
        new Set(snapshot.docs.map((doc) => doc.data().grade))
      );
      setGrades(uniqueGrades.sort());
    };
    fetchGrades();
  }, []);

  const handleFetchAttendance = async () => {
    if (!selectedDate || !selectedGrade) return;

    setLoading(true);
    setDataLoaded(false);
    const snapshot = await getDocs(collection(db, "students"));
    const filteredStudents = snapshot.docs
      .map((doc) => doc.data() as Student)
      .filter((student) => student.grade === selectedGrade);

    const attendanceResults: Attendance[] = [];

    for (const student of filteredStudents) {
      const attendanceDoc = await getDoc(
        doc(db, "attendance", `${student.studentId}_${selectedDate}`)
      );
      if (attendanceDoc.exists()) {
        attendanceResults.push(attendanceDoc.data() as Attendance);
      } else {
        setAttendances([]);
      }
    }

    setAttendances(attendanceResults);
    setLoading(false);
    setDataLoaded(true);
  };

  return (
    <div className="p-10 max-w-3xl space-y-6">
      <h1 className="text-xl font-bold text-primary">Rekap Kehadiran Siswa</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="date"
          placeholder="Pilih Tanggal"
          max={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-3 w-40 border-disable font-normal rounded-lg placeholder:text-disable placeholder:font-light text-sm"
        />

        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="border p-3 w-40 border-disable font-normal rounded-lg placeholder:text-disable placeholder:font-light text-sm"
        >
          <option className="text-disable" value="">
            Pilih Kelas
          </option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              Kelas {grade}
            </option>
          ))}
        </select>
        <div className="w-40">
          <button
            onClick={handleFetchAttendance}
            className="bg-duniakoding-primary w-full text-white px-4 py-3 rounded-2xl font-regular"
            disabled={!selectedDate || !selectedGrade || loading}
          >
            {loading ? "Memuat..." : "Tampilkan"}
          </button>
        </div>
      </div>

      {dataLoaded && (
        <>
          {attendances.length === 0 ? (
            <p className="text-gray-500 mt-4">Data Belum Tersedia</p>
          ) : (
            <table className="w-full mt-6 border text-left">
              <thead className="bg-duniakoding-primary text-white">
                <tr>
                  <th className="p-2">Nama</th>
                  <th className="p-2">Nomor Induk</th>
                  <th className="p-2">Kelas</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((a) => (
                  <tr key={a.studentId}>
                    <td className="p-2 border">{a.name}</td>
                    <td className="p-2 border">{a.studentId}</td>
                    <td className="p-2 border">{a.grade}</td>
                    <td className="p-2 border">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
