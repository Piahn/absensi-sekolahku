"use client";
import { useState } from "react";
import { db } from "@/lib/firebaseClient";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Modal from "../_components/molecule/modal/modal";

export default function RegisterStudentPage() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith("0")) {
      return "62" + phone.slice(1);
    }
    return phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const ref = doc(db, "students", studentId);
      const existing = await getDoc(ref);

      if (existing.exists()) {
        setError("Nomor Induk sudah terdaftar.");
        return;
      }

      await setDoc(ref, {
        name,
        studentId,
        grade,
        parentPhone: formatPhoneNumber(parentPhone),
      });

      setShowModal(true);
      setName("");
      setStudentId("");
      setGrade("");
      setParentPhone("");
    } catch (err: unknown) {
      if (err instanceof Error)
        setError(err.message ?? "Gagal mendaftarkan siswa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <form onSubmit={handleSubmit} className="p-10 space-y-4 max-w-md">
          <h1 className="text-xl font-bold text-primary">Tambah Siswa</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nama Siswa</label>
            <input
              name="name"
              type="text"
              placeholder="Masukkan Nama Siswa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="studentId">Nomor Induk Siswa</label>
            <input
              name="studentId"
              type="number"
              placeholder="Masukkan 5 digit Nomor Induk Siswa"
              maxLength={5}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="grade">Kelas</label>
            <select
              name="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
            >
              <option value="" disabled>
                Pilih Kelas
              </option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  Kelas {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="parentPhone">No. Telp Orang Tua</label>
            <input
              name="parentPhone"
              type="number"
              placeholder="Max 13 digit, awali dengan 0"
              maxLength={13}
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              required
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}
          <div className="mt-12">
            <button
              type="submit"
              disabled={loading}
              className="bg-duniakoding-primary w-full text-white px-4 py-3 rounded-2xl"
            >
              {loading ? "Menyimpan..." : "Simpan Siswa"}
            </button>
          </div>
        </form>
      </div>
      <Modal
        title="Sukses"
        content="Berhasil mendaftarkan siswa baru."
        type="success"
        isOpen={showModal}
        buttonText1="OK"
        buttonType1="primary"
        onConfirm={() => setShowModal(false)}
      />
    </>
  );
}
