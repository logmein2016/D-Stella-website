import { galleryRooms as staticGalleryRooms, type GalleryRoom } from "@/lib/data/gallery";

export type GalleryPhotoRow = {
  id: string;
  room_slug: string;
  src: string;
  alt: string;
  sort_order: number;
};

/** Reads gallery_photos via Supabase's REST API directly (works in both
 * server and client contexts) using the public anon key — safe, since the
 * table's RLS policy allows anyone to read. Returns [] on any failure
 * (table not created yet, env vars unset, network error) so callers can
 * fall back to the static data instead of breaking. */
export async function fetchGalleryPhotoRows(): Promise<GalleryPhotoRow[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  try {
    const res = await fetch(
      `${url}/rest/v1/gallery_photos?select=*&order=room_slug.asc,sort_order.asc`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 30 },
      },
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

/** Merges live Supabase photos with the static fallback data, per room —
 * a room with no Supabase rows yet still shows its static photos, so
 * uploading photos for one room doesn't blank out the others. */
export async function getGalleryRooms(): Promise<GalleryRoom[]> {
  const rows = await fetchGalleryPhotoRows();
  const byRoom = new Map<string, GalleryPhotoRow[]>();
  for (const row of rows) {
    const list = byRoom.get(row.room_slug) ?? [];
    list.push(row);
    byRoom.set(row.room_slug, list);
  }

  return staticGalleryRooms.map((room) => {
    const live = byRoom.get(room.slug);
    if (!live || live.length === 0) return room;
    return {
      ...room,
      coverSrc: live[0]?.src ?? room.coverSrc,
      photos: live.map((r) => ({ src: r.src, alt: r.alt || room.name })),
    };
  });
}
