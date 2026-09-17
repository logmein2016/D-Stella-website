"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { galleryRooms } from "@/lib/data/gallery";
import styles from "./page.module.css";

type PhotoRow = {
  id: string;
  room_slug: string;
  src: string;
  alt: string;
  sort_order: number;
};

const BUCKET = "gallery";

export default function AdminPhotosPage() {
  const [activeRoom, setActiveRoom] = useState(galleryRooms[0]?.slug ?? "");
  const [photos, setPhotos] = useState<PhotoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPhotos = useCallback(async (roomSlug: string) => {
    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabaseBrowser
      .from("gallery_photos")
      .select("*")
      .eq("room_slug", roomSlug)
      .order("sort_order", { ascending: true });
    setLoading(false);
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setPhotos((data as PhotoRow[]) ?? []);
  }, []);

  useEffect(() => {
    if (activeRoom) loadPhotos(activeRoom);
  }, [activeRoom, loadPhotos]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");

    let nextOrder = photos.length ? Math.max(...photos.map((p) => p.sort_order)) + 1 : 0;

    for (const file of Array.from(files)) {
      const path = `${activeRoom}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error: uploadError } = await supabaseBrowser.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (uploadError) {
        setError(uploadError.message);
        continue;
      }
      const { data: publicUrlData } = supabaseBrowser.storage.from(BUCKET).getPublicUrl(path);
      const { error: insertError } = await supabaseBrowser.from("gallery_photos").insert({
        room_slug: activeRoom,
        src: publicUrlData.publicUrl,
        alt: "",
        sort_order: nextOrder,
      });
      if (insertError) setError(insertError.message);
      nextOrder += 1;
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadPhotos(activeRoom);
  }

  async function deletePhoto(photo: PhotoRow) {
    if (!confirm("Delete this photo? This can't be undone.")) return;
    // Storage path is everything after the bucket's public URL prefix.
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const idx = photo.src.indexOf(marker);
    if (idx !== -1) {
      const path = photo.src.slice(idx + marker.length);
      await supabaseBrowser.storage.from(BUCKET).remove([path]);
    }
    const { error: deleteError } = await supabaseBrowser.from("gallery_photos").delete().eq("id", photo.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= photos.length) return;
    const a = photos[index];
    const b = photos[target];
    if (!a || !b) return;

    const reordered = [...photos];
    reordered[index] = b;
    reordered[target] = a;
    setPhotos(reordered);

    await Promise.all([
      supabaseBrowser.from("gallery_photos").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabaseBrowser.from("gallery_photos").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
  }

  return (
    <div>
      <h1 className={styles.heading}>Portfolio photos</h1>
      <p className={styles.note}>
        Photos you add here appear on the site immediately, replacing that room&rsquo;s built-in
        set. A room with nothing uploaded yet keeps showing its original photos.
      </p>

      <div className={styles.tabs} role="tablist">
        {galleryRooms.map((room) => (
          <button
            key={room.slug}
            type="button"
            role="tab"
            aria-selected={activeRoom === room.slug}
            className={`${styles.tab} ${activeRoom === room.slug ? styles.tabActive : ""}`}
            onClick={() => setActiveRoom(room.slug)}
          >
            {room.name}
          </button>
        ))}
      </div>

      <div className={styles.uploadRow}>
        <label className={`btn btn-primary ${styles.uploadBtn}`}>
          <Upload size={16} strokeWidth={2} />
          {uploading ? "Uploading…" : "Upload photos"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            disabled={uploading}
            onChange={(e) => handleUpload(e.target.files)}
          />
        </label>
        {error ? <span className={styles.error}>{error}</span> : null}
      </div>

      {loading ? (
        <p className={styles.empty}>Loading…</p>
      ) : photos.length === 0 ? (
        <p className={styles.empty}>No uploaded photos for this room yet.</p>
      ) : (
        <div className={styles.grid}>
          {photos.map((photo, i) => (
            <div key={photo.id} className={styles.photoCard}>
              <div className={styles.photoWrap}>
                <Image src={photo.src} alt={photo.alt || ""} fill sizes="200px" className={styles.image} />
              </div>
              <div className={styles.photoActions}>
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                  <ArrowUp size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === photos.length - 1}
                  aria-label="Move down"
                >
                  <ArrowDown size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => deletePhoto(photo)}
                  aria-label="Delete photo"
                >
                  <Trash2 size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
