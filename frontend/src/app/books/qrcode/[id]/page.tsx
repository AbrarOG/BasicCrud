"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBookQRCode } from "../../../../services/bookServices";

export default function BookDetailPage() {
  const { id } = useParams();
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (!id) return;
    async function loadQRCode() {
      try {
        const data = await fetchBookQRCode(id as string);
        setQrCode(data.qrCode);
      } catch (error) {
        console.error("Error loading QR code", error);
      }
    }
    loadQRCode();
  }, [id]);

  return (
    <div>
      <h1>Book QR Code</h1>
      {qrCode && <img src={qrCode} alt="Book QR" />}
    </div>
  );
}
